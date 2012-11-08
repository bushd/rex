//
//  WebInspector.h
//  reX
//
//  Created by Bastian Brodbeck on 29.01.12.
//  Copyright 2012 dmc digital media center GmbH. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <WebKit/WebKit.h>

@interface WebInspector : NSObject
{
    WebView *webView;
}
- (id)initWithWebView:(WebView *)webView;
- (void)detach:(id)sender;
- (void)show:(id)sender;
- (void)showConsole:(id)sender;
@end