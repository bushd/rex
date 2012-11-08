//
//  BBRexView.h
//  reX
//
//  Created by Bastian Brodbeck on 27.02.11.
//  Copyright 2011 dmc digital media center GmbH. All rights reserved.
//

#import <Cocoa/Cocoa.h>
#import <VLCKit/VLCKit.h>
#import <WebKit/WebKit.h>


@interface BBRexView : NSView {
@private
    VLCMediaListPlayer *player;
    
    VLCVideoView *videoView;
    WebView *webView;
}

- (VLCMediaListPlayer *)player;
- (WebView *)webView;

@end
