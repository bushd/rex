//
//  BBSkinManager.m
//  reX
//
//  Created by Bastian Brodbeck on 25.09.11.
//  Copyright 2011 dmc digital media center GmbH. All rights reserved.
//

#import "BBSkinManager.h"
#import "global.h"

@implementation BBSkinManager

- (id)init
{
    self = [super init];
    if (self) {
        // Initialization code here.
        [self scanSkinDefinitions];
    }
    
    return self;
}

- (void)scanSkinDefinitions {
    NSMutableDictionary *skins = [[NSMutableDictionary alloc] init];
    NSString *file;

    NSFileManager *fm = [[NSFileManager alloc] init];
    
    NSString *dir = [NSString stringWithFormat:@"%@/interface/skins/", [bundle resourcePath]];
    NSDirectoryEnumerator *dirEnum = [fm enumeratorAtPath:dir];

    while (file = [dirEnum nextObject]) {
        if ([[file pathExtension] isEqualToString: @"skin"]) {
            [skins setObject:[NSString stringWithContentsOfFile:[NSString stringWithFormat:@"%@%@", dir, file] encoding:NSUTF8StringEncoding error:NULL] forKey:[[file lastPathComponent] stringByDeletingPathExtension]];
        }
    }
    
    _loaded = YES;
    skinDefinitions = skins;
}

- (NSString *)skinDefinitionAsJSONString {
    if(_loaded) {
        NSEnumerator *enumerator = [skinDefinitions keyEnumerator];
        id key;
        
        NSMutableString *result = [[NSMutableString alloc] initWithString:@"{skins: {"];
        if ((key = [enumerator nextObject])) {
            [result appendFormat:@"%@: %@", key, [skinDefinitions objectForKey:key]];
             
            while ((key = [enumerator nextObject])) {
                [result appendFormat:@",%@: %@", key, [skinDefinitions objectForKey:key]];
            };
        }
        [result appendString:@"}}"];
    
       JSONString = [NSString stringWithString:result]; 
    }
    
    return JSONString;
}

@end
