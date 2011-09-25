//
//  BBSkinManager.h
//  reX
//
//  Created by Bastian Brodbeck on 25.09.11.
//  Copyright 2011 dmc digital media center GmbH. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface BBSkinManager : NSObject {

    NSMutableDictionary *skinDefinitions;
    BOOL _loaded;
    NSString *JSONString;
}

- (void)scanSkinDefinitions;
- (NSString *)skinDefinitionAsJSONString;

@end