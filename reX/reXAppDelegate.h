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
#import "BBSkinManager.h"
#import "HIDRemote.h"

@class BBWindowController;

@interface reXAppDelegate : NSObject <NSApplicationDelegate, NSWindowDelegate, HIDRemoteDelegate> {
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
    
    HIDRemote *hidRemote;
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
- (double) titleBarHeight;

- (void)setupRemote;

- (BOOL)startRemoteControl;
- (void)stopRemoteControl;
- (void)hidRemote:(HIDRemote *)hidRemote eventWithButton:(HIDRemoteButtonCode)buttonCode isPressed:(BOOL)isPressed fromHardwareWithAttributes:(NSMutableDictionary *)attributes;


@end
