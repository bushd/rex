//
//  reXAppDelegate.h
//  reX
//
//  Created by Bastian Brodbeck on 27.02.11.
//  Copyright 2011 dmc digital media center GmbH. All rights reserved.
//

#import <Cocoa/Cocoa.h>
#import "BBOverlayWindow.h"
#import "BBWebView.h"
#import "BBSkinManager.h"
#import "HIDRemote.h"
#import "global.h"

@class BBWindowController;

@interface reXAppDelegate : NSObject <NSApplicationDelegate, NSWindowDelegate, HIDRemoteDelegate> {
@private
	BBWindowController *windowController;
	
    IBOutlet NSWindow *window;
    IBOutlet BBRexView *rexView;
	IBOutlet NSMenuItem *toggleFullscreen;

	BOOL floatingOnTop;
	NSMenuItem *setSizeToFullscreen;
	NSWindow *fullscreenWindow;
    
    NSRect windowFrame;
    
    HIDRemote *hidRemote;
}

@property (assign) IBOutlet NSWindow *window;

- (IBAction)setSizeTo480p:(id)sender;
- (IBAction)setSizeTo720p:(id)sender;
- (IBAction)setSizeTo1080p:(id)sender;
- (IBAction)toggleFullscreen:(id)sender;
- (IBAction)toggleFloatOnTop:(id)sender;
- (IBAction)fillscreen:(id)sender;
- (double) titleBarHeight;

- (void)setupRemote;

- (BOOL)startRemoteControl;
- (void)stopRemoteControl;
- (void)hidRemote:(HIDRemote *)hidRemote eventWithButton:(HIDRemoteButtonCode)buttonCode isPressed:(BOOL)isPressed fromHardwareWithAttributes:(NSMutableDictionary *)attributes;


@end
