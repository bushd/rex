//
//  reXAppDelegate.h
//  reX
//
//  Created by Bastian Brodbeck on 27.02.11.
//  Copyright 2011 dmc digital media center GmbH. All rights reserved.
//

#import <Cocoa/Cocoa.h>
#import <WebKit/WebKit.h>
#import <VLCKit/VLCKit.h>
#import "BBOverlayWindow.h"
#import "BBWebView.h"

@class BBWindowController;

@interface reXAppDelegate : NSObject <NSApplicationDelegate> {
@private
	BBWindowController *windowController;
	
    IBOutlet BBOverlayWindow *overlayWindow;
    IBOutlet NSWindow *window;
    IBOutlet BBWebView *webView;
    IBOutlet VLCVideoView *videoView;
	IBOutlet NSMenuItem *toggleFullscreen;
	
	BBOverlayWindow *dragWindow;
	
	BOOL floatingOnTop;
	NSMenuItem *setSizeToFullscreen;
	NSWindow *fullscreenWindow;
    
    NSString* resourcePath;
}

@property (assign) IBOutlet NSWindow *window;
@property (assign) IBOutlet BBOverlayWindow *overlayWindow;
@property (assign) IBOutlet BBWebView *webView;
@property (assign) IBOutlet VLCVideoView *videoView;

- (IBAction)setSizeTo480p:(id)sender;
- (IBAction)setSizeTo720p:(id)sender;
- (IBAction)setSizeTo1080p:(id)sender;
- (IBAction)toggleFullscreen:(id)sender;
- (IBAction)toggleFloatOnTop:(id)sender;
- (IBAction)openPreferences:(id)sender;
- (double) titleBarHeight;


@end
