//
//  reXAppDelegate.m
//  reX
//
//  Created by Bastian Brodbeck on 27.02.11.
//  Copyright 2011 dmc digital media center GmbH. All rights reserved.
//

#import "reXAppDelegate.h"
#import "global.h"

@implementation reXAppDelegate

@synthesize window;
@synthesize overlayWindow;
@synthesize webView;
@synthesize videoView;

- (void)applicationDidFinishLaunching:(NSNotification *)aNotification {
	
    [overlayWindow attachToView:videoView];
    [webView setWindow:overlayWindow];
    
    // init windows
    [window setBackgroundColor:[NSColor blackColor]];
    [window setCollectionBehavior:[window collectionBehavior]+NSWindowCollectionBehaviorFullScreenPrimary];
    
    //init preferences
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    NSNumber *yes = [NSNumber numberWithBool:YES];
    NSNumber *no = [NSNumber numberWithBool:NO];
    [defaults registerDefaults:[NSDictionary dictionaryWithObjectsAndKeys:
                                no, @"", nil]];
    
    
    // init Resources
    bundle = [NSBundle mainBundle];
    
    // init webview
	[webView setApplicationNameForUserAgent:@"reX"];
	[webView setDrawsBackground:NO];
	[webView loadURL:[NSURL URLWithString: [NSString stringWithFormat:@"%@/interface/reX.html", [bundle resourcePath]]]];
	[[[webView mainFrame] frameView] setAllowsScrolling:NO];
	[webView setVideoView: videoView];
    
    CGDisplayHideCursor( kCGDirectMainDisplay );
    skinManager = [[BBSkinManager alloc] init];
	floatingOnTop = false;
	
    [window makeFirstResponder:window];     
	[window setNextResponder:overlayWindow];
    [window setDelegate:self];
    
    // Set up remote control
	[self setupRemote];
    [self startRemoteControl];
}

- (void)windowWillClose:(NSNotification *)aNotification {
	[NSApp terminate:self];
}
    

- (IBAction)toggleFullscreen:(id)sender {
    [window toggleFullScreen:nil];
}

- (IBAction)setSizeTo480p:(id)sender {
	NSRect r = NSMakeRect([window frame].origin.x, [window frame].origin.y - (480 - [window frame].size.height), 854, 480 + [self titleBarHeight]);
	[window setFrame:r display:YES animate:YES];
}

- (IBAction)setSizeTo720p:(id)sender {
	NSRect r = NSMakeRect([window frame].origin.x, [window frame].origin.y - (720 - [webView frame].size.height), 1280, 720 + [self titleBarHeight]);
	[window setFrame:r display:YES animate:YES];
}

- (IBAction)setSizeTo1080p:(id)sender {
	NSRect r = NSMakeRect([window frame].origin.x, [window frame].origin.y - (1080 - [window frame].size.height), 1920, 1080 + [self titleBarHeight]);
	[window setFrame:r display:YES animate:YES];
}

- (IBAction)toggleFloatOnTop:(id)sender {
	if (!floatingOnTop) {
		[window setLevel:NSFloatingWindowLevel];
		floatingOnTop = YES;
	} else {
		[window setLevel:NSNormalWindowLevel];
		floatingOnTop = NO;
	}
}

- (double) titleBarHeight {
    NSRect frame = NSMakeRect (0, 0, 100, 100);
    
    NSRect contentRect;
    contentRect = [NSWindow contentRectForFrameRect: frame
                                          styleMask: NSTitledWindowMask];
    
    return (frame.size.height - contentRect.size.height);
    
} // titleBarHeight


- (void)setupRemote {
	if (!hidRemote)
	{
		if ((hidRemote = [[HIDRemote alloc] init]) != nil)
		{
			[hidRemote setDelegate:self];
		}
	}
}


- (BOOL)startRemoteControl
{
	HIDRemoteMode remoteMode;
	remoteMode = kHIDRemoteModeExclusiveAuto;
	
	// Check whether the installation of Candelair is required to reliably operate in this mode
	if ([HIDRemote isCandelairInstallationRequiredForRemoteMode:remoteMode])
	{
		// Reliable usage of the remote in this mode under this operating system version
		// requires the Candelair driver to be installed. Let's inform the user about it.
		NSAlert *alert;
			
		if ((alert = [NSAlert alertWithMessageText:NSLocalizedString(@"Candelair driver installation necessary", @"")
					     defaultButton:NSLocalizedString(@"Download", @"")
					   alternateButton:NSLocalizedString(@"More information", @"")
					       otherButton:NSLocalizedString(@"Cancel", @"")
				 informativeTextWithFormat:NSLocalizedString(@"An additional driver needs to be installed before %@ can reliably access the remote under the OS version installed on your computer.", @""), [[NSBundle mainBundle] objectForInfoDictionaryKey:(id)kCFBundleNameKey]]) != nil)
		{
			switch ([alert runModal])
			{
				case NSAlertDefaultReturn:
					[[NSWorkspace sharedWorkspace] openURL:[NSURL URLWithString:@"http://www.candelair.com/download/"]];
				break;

				case NSAlertAlternateReturn:
					[[NSWorkspace sharedWorkspace] openURL:[NSURL URLWithString:@"http://www.candelair.com/"]];
				break;
			}
		}
	}	
	else
	{
		// Candelair is either already installed or not required under this OS release => proceed!
		if (remoteMode == kHIDRemoteModeExclusive)
		{
			// When used in exclusive, non-auto mode, enable exclusive lock lending. This isn't required
			// but there are good reasons to do this.
			[hidRemote setExclusiveLockLendingEnabled:YES];
		}
		
		// Start remote control
		if ([hidRemote startRemoteControl:remoteMode])
		{
			// Start was successful
			NSLog(@"HIDRemote started successfully");
			return (YES);
		}
		else
		{
			// Start failed
			NSLog(@"Couldn't start HIDRemote");
		}
	}
	
	return (NO);
}

- (void)stopRemoteControl
{
	[[HIDRemote sharedHIDRemote] stopRemoteControl];
}

#pragma mark -- Handle remote control events --
- (void)hidRemote:(HIDRemote *)hidRemote eventWithButton:(HIDRemoteButtonCode)buttonCode isPressed:(BOOL)isPressed fromHardwareWithAttributes:(NSMutableDictionary *)attributes
{
	int keyCode;

	switch (buttonCode)
	{
        // UP
		case kHIDRemoteButtonCodeUp:
			keyCode = 126;
            break;
		
		case kHIDRemoteButtonCodeUpHold:
			keyCode = 126;
            break;
		
		case kHIDRemoteButtonCodeDown:
			keyCode = 125;
            break;

		case kHIDRemoteButtonCodeDownHold:
			keyCode = 125;
            break;
		
		case kHIDRemoteButtonCodeLeft:
			keyCode = 123;
            break;

		case kHIDRemoteButtonCodeLeftHold:
			keyCode = 123;
            break;
		
		case kHIDRemoteButtonCodeRight:
			keyCode = 124;
            break;

		case kHIDRemoteButtonCodeRightHold:
			keyCode = 124;
            break;
		
		case kHIDRemoteButtonCodeCenter:
			keyCode = 36;
            break;

		case kHIDRemoteButtonCodeCenterHold:
			keyCode = 34;
            break;
		
		case kHIDRemoteButtonCodeMenu:
			keyCode = 51;
            break;

		case kHIDRemoteButtonCodeMenuHold:
			keyCode = 46;
            break;

		case kHIDRemoteButtonCodePlay:
			keyCode = 49;
            break;

		case kHIDRemoteButtonCodePlayHold:
			keyCode = 49;
            break;
            
        default:
            break;
	}
	
	if (isPressed) {
        NSEvent *event=[NSEvent keyEventWithType:NSKeyDown location:NSMakePoint(0,0) modifierFlags:NSShiftKeyMask|NSControlKeyMask timestamp:GetCurrentEventTime() windowNumber:[[self window] windowNumber] context:nil characters:@"1" charactersIgnoringModifiers:@"!" isARepeat:NO keyCode:keyCode];
        [NSApp postEvent:event atStart:YES];
    }
}

- (void)dealloc
{
    CGDisplayShowCursor( kCGDirectMainDisplay );
    [[HIDRemote sharedHIDRemote] stopRemoteControl];
	[[HIDRemote sharedHIDRemote] setDelegate:nil];
    asl_close(_client);
    [super dealloc];
}


@end
