//
//  BBWindowController.m
//  reX
//
//  Created by Bastian Brodbeck on 10.04.11.
//  Copyright 2011 dmc digital media center GmbH. All rights reserved.
//

#import "BBWindowController.h"


@implementation BBWindowController

- (id)init {
    self=[super initWithWindowNibName:@"MainMenu"];
    if(self)
    {
        //perform any initializations
    }
    return self;
}


- (BOOL)canBecomeKeyWindow
{
    return YES;
}

- (BOOL)canBecomeMainWindow
{
    return YES;
}

@end
