//
//  global.h
//  reX
//
//  Created by Bastian Brodbeck on 23.09.11.
//  Copyright 2011 dmc digital media center GmbH. All rights reserved.
//

#ifndef reX_global_h
#define reX_global_h

#import <WebKit/WebKit.h>
#import <VLCKit/VLCKit.h>
#include <asl.h>
#include "BBSkinManager.h"
#include "BBRexView.h"
#include "BBWebView.h"

aslclient _client;
NSBundle *bundle;
NSUserDefaults *preferences;

BOOL allowResize;

BBSkinManager *skinManager;
BBRexView *globalRexView;
NSWindow *globalWindow;

#endif
