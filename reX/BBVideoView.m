//
//  BBVideoView.m
//  reX
//
//  Created by Bastian Brodbeck on 03.12.11.
//  Copyright 2011 dmc digital media center GmbH. All rights reserved.
//

#import "BBVideoView.h"
#import "BBVideoLayoutManager.h"

@implementation BBVideoView

- (id)init
{
    self = [super init];
    if (self) {
       layoutManager = [[BBVideoLayoutManager layoutManager] retain];
    }
    
    return self;
}

@end
