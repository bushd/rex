//
//  BBRexView.m
//  reX
//
//  Created by Bastian Brodbeck on 12.11.11.
//  Copyright 2011 dmc digital media center GmbH. All rights reserved.
//

#import "BBRexView.h"
#import "global.h"

@implementation BBRexView

- (id)initWithFrame:(NSRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        // Initialization code here.
    }
    
    return self;
}

- (void)drawRect:(NSRect)dirtyRect
{
    // Drawing code here.
}

- (void)awakeFromNib {
    [self setAutoresizingMask:NSViewWidthSizable|NSViewHeightSizable];
    [self setAutoresizesSubviews:YES];

    videoView = [[VLCVideoView alloc] initWithFrame:NSMakeRect(0,0,self.frame.size.width, self.frame.size.height)];
    [videoView setAutoresizingMask:NSViewWidthSizable | NSViewHeightSizable];
    [self addSubview:videoView];
    [videoView release];

    // init webview
    webView = [[BBWebView alloc] initWithFrame:NSMakeRect(0,0,self.frame.size.width, self.frame.size.height) frameName:nil groupName:nil];
    [webView setAutoresizingMask:NSViewWidthSizable | NSViewHeightSizable];
    [self addSubview:webView];
    [webView setVideoView:videoView];
    [webView setWantsLayer:YES];
	[webView setApplicationNameForUserAgent:@"reX"];
	[webView setDrawsBackground:NO];
    
    // init Resources
    bundle = [NSBundle mainBundle];
    [webView loadHome];
	[[[webView mainFrame] frameView] setAllowsScrolling:NO];
}
   
-(BBWebView *)webView {
    return webView;
}

-(VLCVideoView *)videoView {
    return videoView;
}

@end
