//
//  BBRexView.h
//  reX
//
//  Created by Bastian Brodbeck on 12.11.11.
//  Copyright 2011 dmc digital media center GmbH. All rights reserved.
//

#import <Cocoa/Cocoa.h>
#import <WebKit/WebKit.h>
#import <VLCKit/VLCKit.h>
#import "BBWebView.h"

@interface BBRexView : NSView {
    VLCVideoView *videoView;
    BBWebView *webView;
}

-(BBWebView *)webView;
-(VLCVideoView *)videoView;

@end
