//
//  main.m
//  reX
//
//  Created by Bastian Brodbeck on 27.02.11.
//  Copyright 2011 dmc digital media center GmbH. All rights reserved.
//

#import <Cocoa/Cocoa.h>
#import "global.h"

int main(int argc, char *argv[])
{
    _client = asl_open(NULL, NULL, ASL_OPT_STDERR);
    asl_set_filter(_client, ASL_FILTER_MASK_UPTO(ASL_FILTER_MASK_DEBUG));

    return NSApplicationMain(argc, (const char **)argv);
}
