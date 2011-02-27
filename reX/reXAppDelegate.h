//
//  reXAppDelegate.h
//  reX
//
//  Created by Bastian Brodbeck on 27.02.11.
//  Copyright 2011 dmc digital media center GmbH. All rights reserved.
//

#import <Cocoa/Cocoa.h>

@interface reXAppDelegate : NSObject <NSApplicationDelegate> {
@private
    NSWindow *window;
}

@property (assign) IBOutlet NSWindow *window;

@end
