//
//  LKOverlayWindow.h
//  Overlay Windows
//
//  Created by Louis Klaassen on 29/06/07.
//  Copyright Louis Klaassen 2007. All rights reserved.
//
//	There is source used from Apple Computer's sample code available at:
//	http://developer.apple.com/samplecode/RoundTransparentWindow/index.html
//
//	Email Me! louisk2@gmail.com
//

#import <Cocoa/Cocoa.h>

@interface BBOverlayWindow : NSWindow
{
    NSView *view;
	id electedScrollView;
	NSPoint initialLocation;
}

@property (assign) NSPoint initialLocation;

- (id)initWithContentRect:(NSRect)contentRect styleMask:(unsigned int)aStyle backing:(NSBackingStoreType)bufferingType defer:(BOOL)flag;
- (id)initWithView:(NSView *)parent;

- (BOOL)acceptsFirstResponder;

- (void)attachToView:(NSView *)view;
- (void)detach;
- (void)updateSize;

- (void)cleanAndRelease;

@end
