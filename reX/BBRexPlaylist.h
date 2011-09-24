//
//  BBRexPlaylist.h
//  reX
//
//  Created by Bastian Brodbeck on 26.03.11.
//  Copyright 2011 dmc digital media center GmbH. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <VLCKit/VLCKit.h>


@interface BBRexPlaylist : NSObject {
	VLCMediaList *audioList;
    VLCMediaList *videoList;
}

@end
