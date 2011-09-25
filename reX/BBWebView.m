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

- (id)init
{
    self = [super init];
    goneBack = NO;
    resources = [NSBundle mainBundle];
    resourcePath = [resources resourcePath];
	
    return self;
}

-(void)awakeFromNib {	
	[self setFrameLoadDelegate: self];
	[self setPolicyDelegate:self];
	[self setDownloadDelegate:self];
	[self setUIDelegate: self];
}

- (void)setVideoView:aView {
    videoView = aView;
    player = [[VLCMediaPlayer alloc] initWithVideoView:videoView];
	[player setDelegate:self];
}

- (void)setWindow:(NSWindow *)w {
	window = w;
	[window setAcceptsMouseMovedEvents:YES];
}

- (BOOL)acceptsFirstResponder {
    return YES;
}

- (void)dealloc
{
    [super dealloc];
}

- (void)loadURL:(NSURL *)url {
    [[self mainFrame] loadRequest:[NSURLRequest requestWithURL:url]];
};

- (void)loadHome {
    [[self mainFrame] loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:[resources pathForResource:@"interface/home" ofType:@"html"]]]];
};

/*
 * WebView Delegates
 */

- (void)webView:(WebView *)webView windowScriptObjectAvailable:(WebScriptObject *)windowScriptObject {
    NSLog(@"js injected");
	scriptObject = windowScriptObject;
    [windowScriptObject setValue:self forKey:@"Player"];
    //[windowScriptObject evaluateWebScript:@"console = { log: function(msg) { Player.debug(msg,5); }, error: function(msg) { Player.debug(msg,1); }}"];
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
    NSString *msg = [NSString stringWithFormat:@"[JS]%@ (%@ @ %@)", 
        [dictionary objectForKey:@"message"], 
        [dictionary objectForKey:@"lineNumber"],
        [dictionary objectForKey:@"sourceURL"]];
    
    if ([msgLevel isEqualToString:@"ErrorMessageLevel"]) {
        asl_log(_client, NULL, ASL_LEVEL_ERR, "%s", [msg UTF8String]);
    }
    else {
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
		
	if (state == VLCMediaPlayerStatePlaying) {
		NSLog(@"PlayState: playing");
		[[self windowScriptObject] evaluateWebScript:@"stateChanged('beginPlaying')"];
	} 
	else if (state == VLCMediaPlayerStatePaused) {
		if([self getProgress] >= 99) {
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

- (void)mediaPlayerTimeChanged:(NSNotification *)aNotification {
	float current = [player position];
	int progress = (int)(current*5000.0);

	if(seekPosition != progress) {
		seekPosition = progress;
		//NSLog(@"Time Changed Event. Progress: %i", progress);
		[scriptObject evaluateWebScript:[NSString stringWithFormat:@"updateSeekPosition(%i)", progress]];
	}
}

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
	[player setMedia:[VLCMedia mediaWithPath:aPath]];
//	[self loadURL:[NSURL URLWithString:[NSString stringWithFormat: @"%@/interface/video.html?key=%@", resourcePath, key]]];
    [scriptObject evaluateWebScript:[NSString stringWithFormat:@"reX.load('video.html', '%@');", key]];
}

- (void)playAudio:(NSString *)aPath {
	NSLog(@"Playing Audio: %@", aPath);
	[player setMedia:[VLCMedia mediaWithPath:aPath]];
}

- (void)addFileToPlaylist:(NSString *)aPath {}

- (BOOL)playNextInPlaylist {
    return false;
}

- (BOOL)playPrevInPlaylist {
    return false;
}

- (void)play {
    [player play];
}

- (void)togglePlaymode {
    if([player isPlaying]) {
        [player pause];
    }
    else {
        [player play];
    }
}

- (void)stop {
    [player stop];
}

-(void)jumpForward {
    [player mediumJumpForward];
}

-(void)jumpBackward {
    [player mediumJumpBackward];
}

- (BOOL)isPlaying {
	return [player isPlaying];
}

- (int)getProgress {
	float current = [player position];
	
	return (int)(current*100.0);
}

- (NSString *)getSkins {
    return [skinManager skinDefinitionAsJSONString];
};

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
	else if (sel == @selector(play)) return NO;
    else if (sel == @selector(getSkins)) return NO;
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
	else if (sel == @selector(play)) return @"play";
    else if (sel == @selector(getSkins)) return @"getSkins";
    else return nil;
}


- (BOOL)mouseDownCanMoveWindow
{
    return YES;
}

@end
