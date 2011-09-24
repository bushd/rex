//
//  LKOverlayWindow.m
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

#import "BBOverlayWindow.h"

@implementation BBOverlayWindow

@synthesize initialLocation;


//Init our overlay window (called if window stored in nib)
- (id)initWithContentRect:(NSRect)contentRect styleMask:(unsigned int)aStyle backing:(NSBackingStoreType)bufferingType defer:(BOOL)flag 
{
	NSWindow* result = [super initWithContentRect:contentRect styleMask:NSBorderlessWindowMask backing:NSBackingStoreBuffered defer:NO];
    [result setBackgroundColor:[NSColor clearColor]];
	[result setLevel: NSPopUpMenuWindowLevel];
    [result setAlphaValue:1.0];
    [result setOpaque:NO];
    [result setHasShadow:NO];
	
	//Register ourselves so we can participate in live resizing
	[[NSNotificationCenter defaultCenter] addObserver:result selector:@selector(updateSize) name:@"NSWindowDidResizeNotification" object:nil];
	
	return result;
}

- (id)initWithView:(NSView *)parent {

	view = parent;
	
	NSRect contentRect = NSZeroRect;
	contentRect.size = [parent frame].size;

	self = [super initWithContentRect:contentRect 
							 styleMask:NSBorderlessWindowMask 
							   backing:NSBackingStoreBuffered 
								defer:NO];
	
	[self setBackgroundColor:[NSColor clearColor]];
	[self setLevel: NSPopUpMenuWindowLevel];
	[self setAlphaValue:1.0];
	[self setOpaque:NO];
	[self setHasShadow:NO];
		
	//Register ourselves so we can participate in live resizing
	[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(updateSize) name:@"NSWindowDidResizeNotification" object:nil];
    
    [[self parentWindow] removeChildWindow:self];
	
	[self updateSize];
	
	//Attach the overlay window to the scroll view's window
	[[view window] addChildWindow:self ordered:NSWindowAbove];
		
	return self;
}

- (void)awakeFromNib {
}

- (BOOL)acceptsFirstResponder {
    return YES;
}

//Call this method to attach the overlay to a particular scroll view
- (void)attachToView:(NSView *)parent
{
	view = parent;
    
    [[self parentWindow] removeChildWindow:self];
	
	[self updateSize];
	
	//Attach the overlay window to the scroll view's window
	[[view window] addChildWindow:self ordered:NSWindowAbove];
}


//Call this to detach the overlay window from the NSScrollView (this does not release the window from memory)
- (void)detach
{
    [[self parentWindow] removeChildWindow:self];
    [self close];
}

//Call this at any time to update the position and size of the overlay window
- (void)updateSize
{	
	NSRect rect = [view frame];
	NSPoint viewPoint;
	viewPoint.x = rect.origin.x;
	viewPoint.y = rect.origin.y;
	NSPoint screenPoint = [[view window] convertBaseToScreen:viewPoint];
	
	NSRect finalFrame;
	
	finalFrame.origin.y = (screenPoint.y);
	finalFrame.size.width = rect.size.width;
	finalFrame.origin.x = (screenPoint.x);
	finalFrame.size.height = rect.size.height;
	
	/*
	//Touch ups to get pixel borders inline
	finalFrame.size.width = finalFrame.size.width - 2;
	finalFrame.origin.x = finalFrame.origin.x + 1;
	finalFrame.origin.y = finalFrame.origin.y + 1;
     */
	
	[self setFrame:finalFrame display:YES];	
}

//Aids live resize
- (void)windowDidResize:(NSNotification *)aNotification
{
	[self updateSize];
}

- (BOOL)isKeyWindow 
{
    return NO; // [[view window] isKeyWindow];
}

//Return YES here so that any controls on the overlay window can be used
- (BOOL) canBecomeKeyWindow
{
    return NO;
}

- (BOOL) canBecomeMainWindow {
    return NO;
}

- (void)cleanAndRelease
{
	[[NSNotificationCenter defaultCenter] removeObserver:self];
	[self detach];
	[self release];
}


@end
