//
//  BBVideoLayoutManager.h
//  reX
//
//  Created by Bastian Brodbeck on 03.12.11.
//  Copyright 2011 dmc digital media center GmbH. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <VLCKit/VLCKit.h>

@interface BBVideoLayoutManager : VLCVideoLayoutManager
{
}

- (void)layoutSublayersOfLayer:(CALayer *)layer;

@end
