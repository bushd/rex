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
	
    // init Resources
    NSBundle *bundle = [NSBundle mainBundle];
    resourcePath = [bundle resourcePath];
    
	// init windows
	//[window setAspectRatio:NSMakeSize(16.0, 9.0)];
    [window setCollectionBehavior:[window collectionBehavior]+NSWindowCollectionBehaviorFullScreenPrimary];
    
	// init webview
	[webView setApplicationNameForUserAgent:@"reX"];
	[webView setDrawsBackground:NO];
	//[webView loadURL:[NSURL URLWithString: [NSString stringWithFormat:@"%@/interface/reX.html", resourcePath]]];
    // use this while developing:
    [webView loadURL:[NSURL URLWithString: [NSString stringWithFormat:@"/Users/bastianbrodbeck/Documents/Code/Xcode/reX/reX/Resources/interface/reX.html", resourcePath]]];
	[[[webView mainFrame] frameView] setAllowsScrolling:NO];
	[webView setVideoView: videoView];
	
	floatingOnTop = false;
	
	[overlayWindow attachToView:videoView];
    [webView setWindow:overlayWindow];
	
    
    [window makeFirstResponder:window];     
	[window setNextResponder:overlayWindow];
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

- (IBAction)openPreferences:(id)sender {
	[webView loadURL:[NSURL URLWithString:@"/Users/bastianbrodbeck/Documents/Code/Xcode/reX/reX/Resources/interface/preferences.html"]];
}

- (double) titleBarHeight {
    NSRect frame = NSMakeRect (0, 0, 100, 100);
    
    NSRect contentRect;
    contentRect = [NSWindow contentRectForFrameRect: frame
                                          styleMask: NSTitledWindowMask];
    
    return (frame.size.height - contentRect.size.height);
    
} // titleBarHeight

- (void)dealloc
{
    asl_close(_client);
    [super dealloc];
}


@end
