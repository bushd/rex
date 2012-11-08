//
//  BBWebView.m
//  reX
//
//  Created by Bastian Brodbeck on 27.02.11.
//  Copyright 2011 dmc digital media center GmbH. All rights reserved.
//

#import "BBWebView.h"
#import "global.h"

@implementation BBWebView

- (id)initWithFrame:(NSRect)rect frameName:(NSString *)name groupName:(NSString *)group;
{
    self = [super initWithFrame:rect frameName:name groupName:group];
    playlistIndex = 0;
    
    [self setFrameLoadDelegate: self];
	[self setPolicyDelegate:self];
	[self setDownloadDelegate:self];
	[self setUIDelegate: self];
    
    [[self window] setIgnoresMouseEvents:NO];
    
    trackingArea = [[NSTrackingArea alloc] initWithRect:[self frame] options:(NSTrackingMouseEnteredAndExited | NSTrackingActiveAlways) owner:self userInfo:nil];
    [self addTrackingArea:trackingArea];

    return self;
}

- (void)setVideoView:aView {
    videoView = aView;
    
    mediaListPlayer = [[VLCMediaListPlayer alloc] init];
    [[mediaListPlayer mediaPlayer] setVideoView:videoView];
    [[mediaListPlayer mediaPlayer] setDelegate:self];
    player = [mediaListPlayer mediaPlayer];
    
    playlist = [[VLCMediaList alloc] init];
    [mediaListPlayer setMediaList:playlist];
    
    goneBack = NO;
    resources = [NSBundle mainBundle];
    resourcePath = [resources resourcePath];
    volume = 100;
    volumeStep = 10;
    [[player audio] setVolume:volume];
}

- (void)setWindow:(NSWindow *)w {
	window = w;
}

- (BOOL)acceptsFirstResponder {
    return YES;
}

- (BOOL)mouseDownCanMoveWindow
{
    return NO;
}

- (BOOL)acceptsFirstMouse:(NSEvent *)event
{
    return YES;
}

-(void)updateTrackingAreas {
    if(trackingArea != nil) {
        [self removeTrackingArea:trackingArea];
        [trackingArea release];
    }

    int opts = (NSTrackingMouseEnteredAndExited | NSTrackingActiveAlways);
    trackingArea = [ [NSTrackingArea alloc] initWithRect:[self bounds]
                                            options:opts
                                            owner:self
                                            userInfo:nil];
    [self addTrackingArea:trackingArea];
}

- (void)mouseEntered:(NSEvent *)theEvent
{
    [[self window] setIgnoresMouseEvents:NO];
    [[self windowScriptObject] evaluateWebScript:@"showTitlebar();"];
}

- (void)mouseExited:(NSEvent *)theEvent
{
    [[self window] setIgnoresMouseEvents:YES];
    [[self windowScriptObject] evaluateWebScript:@"hideTitlebar();"];
}

- (void)dealloc
{
    [super dealloc];
}

- (void)loadURL:(NSURL *)url {
    [[self mainFrame] loadRequest:[NSURLRequest requestWithURL:url]];
};

- (void)loadHome {
	[self loadURL:[NSURL URLWithString: [NSString stringWithFormat:@"%@/interface/reX.html", [bundle resourcePath]]]];
};

/*
 * WebView Delegates
 */

- (void)webView:(WebView *)webView windowScriptObjectAvailable:(WebScriptObject *)windowScriptObject {
    NSLog(@"js injected");
	scriptObject = windowScriptObject;
    [windowScriptObject setValue:self forKey:@"js2objcBridge"];
}

// intercept all messages to the consoel and print them to the ASL
- (void)webView:(WebView *)sender addMessageToConsole:(NSDictionary *)dictionary {
    /* directory keys:
        MessageLevel
        MessageSource
        MessageType
        lineNumber
        message
        sourceURL
    */
    
    NSString *msgLevel = [dictionary objectForKey:@"MessageLevel"];
    
    if ([msgLevel isEqualToString:@"ErrorMessageLevel"]) {
        NSString *msg = [NSString stringWithFormat:@"[JS]%@ (%@ @ %@)", 
            [dictionary objectForKey:@"message"], 
            [dictionary objectForKey:@"lineNumber"],
            [dictionary objectForKey:@"sourceURL"]];
        asl_log(_client, NULL, ASL_LEVEL_ERR, "%s", [msg UTF8String]);
    }
    else {
        NSString *msg = [NSString stringWithFormat:@"[JS]%@", [dictionary objectForKey:@"message"]];
        asl_log(_client, NULL, ASL_LEVEL_DEBUG, "%s", [msg UTF8String]);
    }
}

- (void)webView:(WebView *)sender didFinishLoadForFrame:(WebFrame *)frame {   
    if(goneBack) {
        [[self mainFrame ]reload];
        goneBack = NO;
    }
}

- (NSUInteger)webView:(WebView *)sender dragDestinationActionMaskForDraggingInfo:(id <NSDraggingInfo>)draggingInfo {
	return WebDragDestinationActionNone;
}

- (NSUInteger)webView:(WebView *)sender dragSourceActionMaskForPoint:(NSPoint)point {
	return WebDragDestinationActionNone;
}

- (NSArray *)webView:(WebView *)sender contextMenuItemsForElement:(NSDictionary *)element defaultMenuItems:(NSArray *)defaultMenuItems
{
	return nil;
}

- (NSResponder *)webViewFirstResponder:(WebView *)sender {
	return window;
}


/*
 * VLCKit Delegates
 */

- (void)mediaPlayerStateChanged:(NSNotification *)aNotification {
	VLCMediaPlayerState state = [player state];
     [[self windowScriptObject] evaluateWebScript:@"hideTitlebar()"];
     [globalRexView addSubview:self];
     [globalRexView setNeedsDisplay:YES];
        
	if (state == VLCMediaPlayerStatePlaying) {
		NSLog(@"PlayState: playing");
		[[self windowScriptObject] evaluateWebScript:@"stateChanged('beginPlaying')"];
	} 
	else if (state == VLCMediaPlayerStatePaused) {
		if([self getProgress] >= 97) {
			NSLog(@"PlayState: finished");
			[[self windowScriptObject] evaluateWebScript:@"stateChanged('finishedPlaying')"];
		}
		else {
			NSLog(@"PlayState: paused");
			[[self windowScriptObject] evaluateWebScript:@"stateChanged('pausedPlaying')"];
		}
	}
	else if (state == VLCMediaPlayerStateStopped) {	
		NSLog(@"PlayState: stopped");
		[[self windowScriptObject] evaluateWebScript:@"stateChanged('stoppedPlaying')"];
	}
	else if (state == VLCMediaPlayerStateEnded) {		
		NSLog(@"PlayState: ended");
		[[self windowScriptObject] evaluateWebScript:@"stateChanged('endedPlaying')"];
	}
	else if (state == VLCMediaPlayerStateError) {		
		NSLog(@"PlayState: error");
	}
	else if (state == VLCMediaPlayerStateBuffering) {		
		NSLog(@"PlayState: buffering");
        
        if([self getProgress] >= 97) {
			NSLog(@"PlayState: finished");
			[[self windowScriptObject] evaluateWebScript:@"stateChanged('finishedPlaying')"];
		}

	}
	else if (state == VLCMediaPlayerStateOpening) {		
		NSLog(@"PlayState: opening");
	}
	else {
		NSLog(@"PlayState: unknown");
	}
	/*
	VLCMediaPlayerStateStopped,        //< Player has stopped
    VLCMediaPlayerStateOpening,        //< Stream is opening
    VLCMediaPlayerStateBuffering,      //< Stream is buffering
    VLCMediaPlayerStateEnded,          //< Stream has ended
    VLCMediaPlayerStateError,          //< Player has generated an error
    VLCMediaPlayerStatePlaying,        //< Stream is playing
    VLCMediaPlayerStatePaused          //< Stream is paused
	*/
}

- (void)mediaPlayerTimeChanged:(NSNotification *)aNotification {}

/*
 * JavaScript
 */

- (void)back {
    if([self canGoBack]) {
        goneBack = YES;
        [self goBack];
    }
}

- (void)playVideo:(NSString *)aPath withKey:(NSString *)key {
	NSLog(@"Playing Video: %@", aPath);
	seekPosition = 0;
	[mediaListPlayer setRootMedia:[VLCMedia mediaWithPath:aPath]];

//	[self loadURL:[NSURL URLWithString:[NSString stringWithFormat: @"%@/interface/video.html?key=%@", resourcePath, key]]];
    [scriptObject evaluateWebScript:[NSString stringWithFormat:@"reX.load('video', '%@');", key]];
}

- (void)playAudio:(NSString *)aPath {
	NSLog(@"Playing Audio: %@", aPath);
	[player setMedia:[VLCMedia mediaWithPath:aPath]];
}

- (void)addFileToPlaylist:(NSString *)aPath {
    [playlist addMedia:[VLCMedia mediaWithPath:aPath]];
}

- (void)playNextInPlaylist {
    if (playlistIndex + 1 >= [playlist count]) return;
    else [player setMedia: [playlist mediaAtIndex:++playlistIndex]];
}

- (void)playPrevInPlaylist {
    if (playlistIndex - 1 <= 0) return;
    else [player setMedia: [playlist mediaAtIndex:--playlistIndex]];
}

- (void)play {
    [mediaListPlayer play];
}

- (void)togglePlaymode {
    if([player isPlaying]) {
        [player pause];
    }
    else {
        [mediaListPlayer play];
    }
}

- (void)stop {
    [mediaListPlayer stop];
}

-(void)jumpForward {
    [player mediumJumpForward];
}

-(void)jumpBackward {
    [player mediumJumpBackward];
}

-(void)volumeUp {
    if (volume <= 200 - volumeStep) {
        NSLog(@"old volume: %lu", volume);
        volume += volumeStep;
        NSLog(@"new volume: %lu", volume);
        [[player audio] setVolume:volume];
    }
}

-(void)volumeDown {
    if (volume >= volumeStep) {
        NSLog(@"old volume: %lu", volume);
        volume -= volumeStep;
        NSLog(@"new volume: %lu", volume);
        [[player audio] setVolume:volume];
    }
}

-(void)toggleMute {
    if ([[player audio] isMuted]) {
        [[player audio] setMute:NO];
    }
    else {
        [[player audio] setMute:YES];
    }
}

- (BOOL)isMuted {
    return [[player audio] isMuted];
}

- (void)setVolume:(NSUInteger)vol {
    [[player audio] setVolume:vol];
}

- (NSUInteger)getVolume {
    return [[player audio] volume];
}

- (BOOL)isPlaying {
	return [player isPlaying];
}

- (int)getProgress {
	float current = [player position];
	
	return (int)(current*100.0);
}

- (void)setProgress:(int)p {
	[player setTime:[VLCTime timeWithInt:p]];
}

- (NSString *)getSkins {
    return [skinManager skinDefinitionAsJSONString];
};

- (NSArray *)getSubtitles {
    if ([player state] == VLCMediaPlayerStatePlaying) {
        return [player videoSubTitles];
    }
    else {
        return nil;
    }
};

- (void)setSubtitle:(NSUInteger)index {
    NSLog(@"attempting to set Subtitle Index ...");
    if ([[player videoSubTitles] count] > 0) {
        if ([player state] == VLCMediaPlayerStatePlaying) {
            [player setCurrentVideoSubTitleIndex:index];
            NSLog(@"   ... Index set to %lu", index);
        }
        else {
            NSLog(@"   ... it seems there is no media playing. ABORT");
        }
    }
    else {
        NSLog(@"   ... no subtitles found. IGNORED");
    }
};

- (NSArray *)getAudiotracks {
    if ([player state] == VLCMediaPlayerStatePlaying) {
        return [player audioTracks];
    }
    else {
        return nil;
    }
};

- (void)setAudiotrack:(NSUInteger)index {
    if ([player state] == VLCMediaPlayerStatePlaying) {
        [player setCurrentAudioTrackIndex:index];
    }
};

- (void)getSeekPosition {
    float current = [player position];
	int progress = (int)(current*5000.0);

	if(seekPosition != progress) {
		seekPosition = progress;
		//NSLog(@"Time Changed Event. Progress: %i", progress);
		[scriptObject evaluateWebScript:[NSString stringWithFormat:@"updateSeekPosition(%i)", progress]];
	}
}

-(void)quitApp {
    [NSApp terminate: nil];
}

- (void)setPlayerFramePositionX:(float)x positionY:(float)y width:(float)w height:(float)h {
    [videoView setFrame:NSMakeRect(x, y, w, h)];
}

-(BOOL) changeDisplaySettingsWithRefreshRate:(int)refresh {
    CGDirectDisplayID mainScreen = (CGDirectDisplayID)[[[[NSScreen mainScreen] deviceDescription] objectForKey:@"NSScreenNumber"] intValue];
    	
    CGDisplayConfigRef newConfig;
	int i = 0;
    CGDisplayModeRef currentMode = CGDisplayCopyDisplayMode(mainScreen /*CGMainDisplayID()*/);
 
    unsigned long w = CGDisplayModeGetWidth(currentMode);
    unsigned long h = CGDisplayModeGetHeight(currentMode);
    CFStringRef e = CGDisplayModeCopyPixelEncoding(currentMode);

	NSLog(@"called change display settings with w:%lu h:%lu e:%@", w, h, e);
		
    CFArrayRef modes = CGDisplayCopyAllDisplayModes(mainScreen, NULL);
    
    for ( i = 0 ; i < CFArrayGetCount(modes) ; i++ )
    {
        CGDisplayModeRef m = (CGDisplayModeRef) CFArrayGetValueAtIndex(modes, i);
            
        //NSLog(@"Encoding: %@, %@", CGDisplayModeCopyPixelEncoding(m), (CFStringCompare(CGDisplayModeCopyPixelEncoding(m),e, 0) == kCFCompareEqualTo));
        if ( CGDisplayModeGetWidth(m) == w 
            && CGDisplayModeGetHeight(m) == h
            && CFStringCompare(CGDisplayModeCopyPixelEncoding(m),e, 0) == kCFCompareEqualTo
            && CGDisplayModeGetRefreshRate(m) == refresh )
        {
            CGDisplayFadeReservationToken token;
            CGError err = CGAcquireDisplayFadeReservation(4, &token);
            if ( kCGErrorSuccess == err )
            {
              //  CGDisplayFade(token, 1.0, kCGDisplayBlendNormal, kCGDisplayBlendSolidColor, 0.0, 0.0, 0.0, true);
                err = CGBeginDisplayConfiguration(&newConfig);
                if ( err )
                    goto fail;
                err = CGConfigureDisplayWithDisplayMode(newConfig, mainScreen, m, NULL);
                if ( err )
                    goto fail;
                err = CGCompleteDisplayConfiguration(newConfig, kCGConfigureForAppOnly);
                if ( err )
                    goto fail;
                
                return YES;
                              
            }
            else
                return NO;
        }
    }
	
	return YES;
	
fail:
	NSLog(@"Unable to set display to width: %lu height %lu refresh: %d", w, h, refresh);
	return NO;
    
}

- (void)savePreferences:(NSString *)prefs {
    [preferences setObject:prefs forKey:@"reXSettings"];
    [preferences synchronize];
}

- (NSString *)loadPreferences {
    return [preferences objectForKey:@"reXSettings"];
}

- (int)getPlaytime {
    return [[player time] intValue];
}


/*
 * Bind Javascript
 */ 

+ (BOOL)isSelectorExcludedFromWebScript:(SEL)sel
{
    if (sel == @selector(back)) return NO;
    else if (sel == @selector(playVideo:withKey:)) return NO;
    else if (sel == @selector(playAudio:)) return NO;
    else if (sel == @selector(togglePlaymode)) return NO;
    else if (sel == @selector(stop)) return NO;
    else if (sel == @selector(jumpForward)) return NO;
    else if (sel == @selector(jumpBackward)) return NO;
	else if (sel == @selector(isPlaying)) return NO;
	else if (sel == @selector(getProgress)) return NO;
    else if (sel == @selector(setProgress:)) return NO;
    else if (sel == @selector(getSeekPosition)) return NO;
	else if (sel == @selector(play)) return NO;
    else if (sel == @selector(getSkins)) return NO;
    else if (sel == @selector(getSubtitles)) return NO;
    else if (sel == @selector(setSubtitle:)) return NO;
    else if (sel == @selector(getAudiotracks)) return NO;
    else if (sel == @selector(setAudiotrack:)) return NO;
    else if (sel == @selector(volumeUp)) return NO;
    else if (sel == @selector(volumeDown)) return NO;
    else if (sel == @selector(toggleMute)) return NO;
    else if (sel == @selector(isMuted)) return NO;
    else if (sel == @selector(setVolume:)) return NO;
    else if (sel == @selector(getVolume)) return NO;
    else if (sel == @selector(getPlaytime)) return NO;
    else if (sel == @selector(setPlayerFramePositionX:positionY:width:height:)) return NO;
    else if (sel == @selector(changeDisplaySettingsWithRefreshRate:)) return NO;
    else if (sel == @selector(quitApp)) return NO;
    else if (sel == @selector(setPreferences:)) return NO;
    else if (sel == @selector(loadPreferences)) return NO;
    else return YES;
}

+ (NSString *) webScriptNameForSelector:(SEL)sel
{
    if (sel == @selector(back)) return @"goBack";
    else if (sel == @selector(playVideo:withKey:)) return @"playVideo";
    else if (sel == @selector(playAudio:)) return @"playAudio";
    else if (sel == @selector(togglePlaymode)) return @"togglePlaymode";
    else if (sel == @selector(stop)) return @"stop";
    else if (sel == @selector(jumpForward)) return @"jumpForward";
    else if (sel == @selector(jumpBackward)) return @"jumpBackward";
	else if (sel == @selector(isPlaying)) return @"isPlaying";
	else if (sel == @selector(getProgress)) return @"getProgress";
    else if (sel == @selector(setProgress:)) return @"setProgress";
    else if (sel == @selector(getSeekPosition)) return @"getSeekPosition";
	else if (sel == @selector(play)) return @"play";
    else if (sel == @selector(getSkins)) return @"getSkins";
    else if (sel == @selector(getSubtitles)) return @"getSubtitles";
    else if (sel == @selector(setSubtitle:)) return @"setSubtitle";
    else if (sel == @selector(getAudiotracks)) return @"getAudiotracks";
    else if (sel == @selector(setAudiotrack:)) return @"setAudiotrack";
    else if (sel == @selector(volumeUp)) return @"volumeUp";
    else if (sel == @selector(volumeDown)) return @"volumeDown";
    else if (sel == @selector(toggleMute)) return @"toggleMute";
    else if (sel == @selector(isMuted)) return @"isMuted";
    else if (sel == @selector(setVolume:)) return @"setVolume";
    else if (sel == @selector(getVolume)) return @"getVolume";
    else if (sel == @selector(getPlaytime)) return @"getPlaytime";
    else if (sel == @selector(setPlayerFramePositionX:positionY:width:height:)) return @"setFrame";
    else if (sel == @selector(changeDisplaySettingsWithRefreshRate:)) return @"setRefreshRate";
    else if (sel == @selector(quitApp)) return @"quitApp";
    else if (sel == @selector(setPreferences:)) return @"setPreferences";
    else if (sel == @selector(loadPreferences)) return @"loadPreferences";

    else return nil;
}

@end
