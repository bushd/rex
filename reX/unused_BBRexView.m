//
//  BBRexView.m
//  reX
//
//  Created by Bastian Brodbeck on 27.02.11.
//  Copyright 2011 dmc digital media center GmbH. All rights reserved.
//

#import "BBRexView.h"


@implementation BBRexView

- (id)initWithFrame:(NSRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        // Initialization code here.
    }
    
    return self;
}

- (void)awakeFromNib {
    videoView = [[VLCVideoView alloc] initWithFrame:NSMakeRect(0,0,self.frame.size.width, self.frame.size.height)];
    [self addSubview:videoView];
    
    player = [[VLCMediaListPlayer alloc] init];
    [[player mediaPlayer] setVideoView:videoView];
    
    webView = [[NSView alloc] initWithFrame:NSMakeRect(0,0,self.frame.size.width, self.frame.size.height)];
    [self addSubview:webView];
    [webView setWantsLayer:YES];
    [webView.layer setBackgroundColor:CGColorCreateGenericRGB(1.0, 0.0, 0.0, 0.5)];   
    
    [videoView release];
    [webView release];
    [player release];
}

- (VLCMediaListPlayer *)player {
    return player;
}

- (WebView *)webView {
    return webView;
}


- (void)dealloc
{
    [videoView release];
    [webView release];
    [player release];
    [super dealloc];
}

- (void)drawRect:(NSRect)dirtyRect
{
    // Drawing code here.
}


- (void)mouseDown:(NSEvent *)theEvent {  
    NSLog(@"down");
}

- (void)mouseDragged:(NSEvent *)theEvent {
	NSLog(@"drag");
}

- (BOOL)acceptsFirstResponder {
    return NO;
}

@end
