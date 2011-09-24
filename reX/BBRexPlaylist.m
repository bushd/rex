//
//  BBRexPlaylist.m
//  reX
//
//  Created by Bastian Brodbeck on 26.03.11.
//  Copyright 2011 dmc digital media center GmbH. All rights reserved.
//

#import "BBRexPlaylist.h"


@implementation BBRexPlaylist

- (id)init {
    self=[super init];
    if(self)
    {
        [audioList init];
        [videoList init]; 
    }
    return self;
}

@end
