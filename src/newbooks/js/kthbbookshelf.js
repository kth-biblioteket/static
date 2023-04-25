/**
@interface jQueryEvent
*/
function jQueryEvent() {
}

/**
@interface
*/
function jQueryObject() {
}
jQueryObject.prototype = {
	/**
	@param {!(jQueryObject|Element|string)} selector
	@param {!(jQueryObject|Element|string)=} context
	@return {jQueryObject}
	*/
	closest: function(selector, context) {},
	/**
	@param {!(Object|string)} objOrKey
	@param {(string|number)=} value
	@return {!(jQueryObject|string)}
	*/
	css: function(objOrKey, value) {},
	/**
	@param {string} key
	@param {*} value
	@return {!(jQueryObject|string)}
	*/
	prop: function(key, value) {},
	/**
	@return {string}
	*/
	val: function() {},
	/**
	@param {string=} value
	@return {!(jQueryObject|string)}
	*/
	text: function(value) {},
	/**
	@param {string} name
	@param {function(this:Element,jQueryEvent)} handler
	*/
	bind: function(name, handler) {},
	/**
	@param {string} name
	@param {function(this:Element,jQueryEvent)} handler
	*/
	unbind: function(name, handler) {},
	/**
	@param {function(this:Element,jQueryEvent)} handler
	@return {!jQueryObject}
	*/
	click: function(handler) {},
	/**
	@param {string} cls
	@return {!jQueryObject}
	*/
	addClass: function(cls) {},
	/**
	@param {string} cls
	@return {boolean}
	*/
	hasClass: function(cls) {},
	/**
	@param {string} cls
	@return {!jQueryObject}
	*/
	removeClass: function(cls) {},
	/**
	@param {string} cls
	@param {boolean=} toggle
	@return {!jQueryObject}
	*/
	toggleClass: function(cls, toggle) {},
	/**
	@return {!jQueryObject}
	*/
	show: function() {},
	/**
	@return {!jQueryObject}
	*/
	hide: function() {},
	/**
	@param {boolean=} showOrHide
	@return {!jQueryObject}
	*/
	toggle: function(showOrHide) {},
	/**
	@param {function(this:Element, number, Element)} callback
	@return {!jQueryObject}
	*/
	each: function(callback) {},
	/**
	@param {function(this:Element, number, Element)} callback
	@return {!jQueryObject}
	*/
	map: function(callback) {},
	/**
	@return {!jQueryObject}
	*/
	clone: function() {},
	/**
	@param {(jQueryObject|Element|Text|string)} element
	@return {!jQueryObject}
	*/
	append: function(element) {},
	/**
	@param {(jQueryObject|Element|Text|string)} element
	@return {!jQueryObject}
	*/
	prepend: function(element) {},
	/**
	@param {(jQueryObject|Element|Text|string)} element
	@param {...(jQueryObject|Element|Text|string)} elements
	@return {!jQueryObject}
	*/
	before: function(element, elements) {},
	/**
	@param {number} index
	@return {!Element}
	*/
	get: function(index) {},
	/**
	@param {number} start
	@param {number=} end
	@return {!jQueryObject}
	*/
	slice: function(start, end) {},
	/**
	@param {!(jQueryObject|Element|string)} selector
	@return {!jQueryObject}
	*/
	find: function(selector) {},
	/**
	@param {string=} selector
	@return {!jQueryObject}
	*/
	parent: function(selector) {},
	/**
	@param {string=} selector
	@return {!jQueryObject}
	*/
	parents: function(selector) {},
	/**
	@param {string=} selector
	@return {!jQueryObject}
	*/
	children: function(selector) {},
	/**
	@param {string=} selector
	*/
	remove: function(selector) {},
	/**
	@param {number=} value
	@return {!(jQueryObject|number)}
	*/
	width: function(value) {},
	/**
	@param {number=} value
	@return {!(jQueryObject|number)}
	*/
	height: function(value) {},
	/**
	@param {number=} value
	@return {!(jQueryObject|number)}
	*/
	outerWidth: function(value) {},
	/**
	@param {number=} value
	@return {!(jQueryObject|number)}
	*/
	outerHeight: function(value) {},
	/**
	@param {Function} inOrInOut
	@param {Function=} out
	@return {!jQueryObject}
	*/
	hover: function(inOrInOut, out) {}
}


/**
@param {!(string|Element|Window)} selector
@return {!jQueryObject}
*/
//function jQuery(selector) {}
/**
@param {function()} onready
*/
//jQuery.ready = function(onready) {}
/**
@param {!Array} array
@param {*} value
@param {number=} fromIndex
@return {number}
*/
//jQuery.inArray = function(array, value, fromIndex) {}

jQuery.browser = {
	// jQuery detects other browsers, but we only want to sniff IE8.
	msie: true,
	version: ''
}

/**
@param {string} url
@param {(Object|Function)=} data
@param {function(*)=} callback
*/
//jQuery.getJSON = function(url, data, callback) {}
/**
@param {!Object} intoObject
@param {...!Object} fromObjects
*/
//jQuery.extend = function(intoObject, fromObjects) {}


/**
@interface
*/
function Stream() {};
Stream.prototype['loadSegment'] = function(id, context, onload) {};
Stream.prototype['createItem'] = function(segment, index, context, container) {};


/**
@interface

Used for the type id with requestFrame, cancelFrame
*/
function FrameId() {}

////////////////
// utility.js //
////////////////
// This file contains a lot of loose functions that don't live anywhere particular (yet)

var DEVICE_PIXEL_RATIO = (window['devicePixelRatio'] > 1) ? window['devicePixelRatio'] : 1;


function now() {
	return new Date().getTime();
}


var findVendorName_vendors = [ 'Webkit', 'Moz', 'O', 'Ms', 'Khtml', 'webkit', 'moz', 'o', 'ms', 'khtml' ];

/**
@param {...*} names
*/
function findVendorName(object, names) {
	if (object) {
		for (var ai = 1; ai < arguments.length; ++ai) {
			var name = arguments[ai];
			if (name in object) {
				return name;
			}
			name = name.slice(0, 1).toUpperCase() + name.slice(1);
			for (var vi = 0; vi < findVendorName_vendors.length; ++vi) {
				var vname = findVendorName_vendors[vi] + name;
				if (vname in object) {
					return vname;
				}
			}
		}
	}
	return undefined;
}


function setVendorCss(element, name, value) {
	element.each(function() {
		var vname = findVendorName(this.style, name);
		if (vname) this.style[vname] = value;
	});
}


/** @type { function((Function|undefined)):FrameId } */
var requestFrame = (function() {
	var request = findVendorName(window, 'requestAnimationFrame');
	return request
		? function(callback) { return window[request](callback) }
		: function(callback) { return window.setTimeout(callback, 1); };
})();

/** @type { function((FrameId|undefined)):undefined } */
var cancelFrame = (function() {
	var cancel = findVendorName(window, 'cancelAnimationFrame', 'cancelRequestAnimationFrame') || 'clearTimeout';
	return function(id) { window[cancel](id) };
})();


function fitInRectangle(inWidth, inHeight, aspectWidth, aspectHeight) {
	var w = inWidth;
	var h = inWidth * aspectHeight / aspectWidth;
	if (h > inHeight) {
		w = inHeight * aspectWidth / aspectHeight;
		h = inHeight;
	}
	return {
		width: Math.floor(w),
		height: Math.floor(h)
	}
}


function loadCss(url, onload) {
	if (document.createStyleSheet) {
		// IE likes to be different
		document.createStyleSheet(url);
		// createStyleSheet returns a styleSheet, but styleSheet.ownerNode.onload never fires.
		// If we just add a <link> then IE8 doesn't apply the css.  We're going to to both so IE works.
		// TODO: Is there a better way?
	}
	
	var link = jQuery('<link>');
	jQuery.extend(link.get(0), {
		'rel': 'stylesheet',
		'type': 'text/css',
		'href': url
	});
	jQuery('head').append(link);
	var stylesheet = link.get(0);
	stylesheet.onload = onload;
	stylesheet.onerror = onload;
}


function clamp(lower, value, upper) {
	return Math.max(lower, Math.min(value, upper));
}


// For a linearly changing value 0..1, produce a sin-curve value between 0..1
function smooth(t) {
	return (1 - Math.cos(t * Math.PI)) * 0.5;
}


function remove(object) {
	if (object && object['remove']) object['remove']();
}


/**
@constructor

A Lehmer RNG, taken from Wikipedia
*/
function Random(seed){
	this._s = seed;
}
Random.prototype.next = function() {
	this._s = (this._s * 279470273) % 4294967291;
	return this._s / 4294967291;
}

////////////////
// PointerListener.js //
////////////////

var hasTouch = 'ontouchstart' in window;
var touchDragTollerance = 6;
var touchVelInterval = 100;
var touchIdleInterval = 500;
var touchEvents = 'touchstart touchmove touchend touchcancel';
var mouseDragTollerance = 6;
var mouseEvents = 'mousedown mouseenter mouseleave mousemove contextmenu mousewheel DOMMouseScroll selectstart';
var mouseSetCaptureEvents = 'mouseup dragstart losecapture';
var mouseWindowCaptureEvents = 'mouseup dragstart mousemove';
var targetSuppressedEvents = 'click';


/**
Tracks an element's touch/mouse events and translates them into more robust, simpler events with velocity.  This is constrained to reporting a single point.

If dragHorizontal or dragVertical are true, then touch scrolling will be preventing when moving in that direction.

For onWheel events, the delta values are roughly equivalent to number of lines.  'step' values are our best-guess at the number of notches stepped on the mouse.

@constructor
@param {!jQueryObject} element
@param {!{
	dragHorizontal: (boolean|undefined),
	dragVertical: (boolean|undefined),
	onPointerStart: function(!{ pageX: number, pageY: number, startX: number, startY: number, velX: number, velY: number }): undefined,
	onPointerMove: function(!{ pageX: number, pageY: number, startX: number, startY: number, velX: number, velY: number }): undefined,
	onPointerEnd: function(!{ pageX: number, pageY: number, startX: number, startY: number, velX: number, velY: number }): undefined,
	onWheel: function(!{ delta: number, deltaX: number, deltaY: number, step: number, stepX: number, stepY }): undefined,
	onHoverStart: function(!{ pageX: number, pageY: number }): undefined,
	onHoverMove: function(!{ pageX: number, pageY: number }): undefined,
	onHoverEnd: function(!{ pageX: number, pageY: number }): undefined
}} options
*/
var PointerListener = function(element, options) {
	// IE/Firefox use setCapture and releaseCapture.  If not these we will hook `window` later.
	var hasSetCapture = element.get(0).setCapture && element.get(0).releaseCapture;
	
	var pointerId; // 'mouse' when mouse is pressed, else touch id
	var dragging; // We are capturing the touch, scrolling is prevented.
	var capturing; // Globally capturing events
	var captureTarget; // If hasSetCapture, the element they originally clicked on
	var startPos; // { x, y, time } pointer started
	var recentPos; // Array of { x, y, time } of all points within the last touchIdleInterval, for velocity calculation.
	var velX;
	var velY;
	var hoverPos;
	var unbindSuppressedEvents = null;
	var eventHandlers = {};
	var mouseWheelStep = Infinity;
	
	function dispatchPointerEvent(handler) {
		handler({
			pageX: recentPos[recentPos.length - 1].x,
			pageY: recentPos[recentPos.length - 1].y,
			startX: startPos.x,
			startY: startPos.y,
			velX: velX,
			velY: velY
		});
	}
	
	function startCapture() {
		if (!hasTouch && !capturing) {
			capturing = true;
			if (hasSetCapture && !captureTarget) {
				captureTarget = element;
				captureTarget.bind(mouseSetCaptureEvents, handleEvent);
				captureTarget.get(0).setCapture(false);
			}
			// For other browsers, the window will report all mouse movements
			jQuery(window).bind(mouseWindowCaptureEvents, handleEvent);
		}
	}
	
	function endCapture() {
		if (capturing) {
			capturing = false;
			if (captureTarget) {
				captureTarget.unbind(mouseSetCaptureEvents, handleEvent);
				captureTarget.get(0).releaseCapture();
				captureTarget = undefined;
			}
			jQuery(window).unbind(mouseWindowCaptureEvents, handleEvent);
		}
	}
	
	function startPoint(id, pointer) {
		pointerId = id;
		startPos = {
			x: pointer.pageX,
			y: pointer.pageY,
			time: now()
		};
		recentPos = [ startPos ];
		velX = 0;
		velY = 0;
		startCapture();
	}
	
	function updatePoint(pointer) {
		var prevPos = recentPos[recentPos.length - 1];
		var curPos = {
			x: pointer.pageX,
			y: pointer.pageY,
			time: now()
		};
		
		// Update recent list.  We prefer to calculate velocity based on a touch a little
		// over touchVelInterval ago, but not too long.
		recentPos.push(curPos);
		while (recentPos.length > 2
			&& curPos.time - recentPos[0].time > touchVelInterval) {
			recentPos.shift();
		}
		var velPos = recentPos[0];
		if (curPos.time - velPos.time >= touchIdleInterval) {
			// Previous touch was too long ago.
			recentPos.shift();
			velX = 0;
			velY = 0;
		} else {
			// Motioning.  Update velocity every touchVelInterval.
			var dt = curPos.time - velPos.time;
			if (dt > 0) {
				velX = (curPos.x - velPos.x) / dt;
				velY = (curPos.y - velPos.y) / dt;
			}
		}
		
		return curPos.x != prevPos.x || curPos.y != prevPos.y;
	}
	
	function movePoint(pointer, event, dragTollerance) {
		if (updatePoint(pointer)) {
			var curPos = recentPos[recentPos.length - 1];
			
			if (!dragging) {
				// Check whether we've starting dragging or allowing the iPad to scroll
				var movingHorizontally = (Math.abs(curPos.x - startPos.x) >= dragTollerance);
				var movingVertically = (Math.abs(curPos.y - startPos.y) >= dragTollerance);
				if ((options.dragHorizontal && movingHorizontally) || (options.dragVertical && movingVertically)) {
					dragging = true;
				} else if (hasTouch && ((!options.dragHorizontal && movingHorizontally) || (!options.dragVertical && movingVertically))) {
					// Drop this touch, allow them to scroll instead
					endPoint(pointer, true);
				}
			}
			
			if (dragging) {
				event.preventDefault();
			}
			
			if (pointerId !== undefined) {
				dispatchPointerEvent(options.onPointerMove);
			}
		}
	}
	
	function endPoint(pointer, noFlick) {
		endCapture();
		pointerId = undefined;
		if (unbindSuppressedEvents) {
			if (dragging) {
				// Delay a moment to suppress 'click' events immediately after mouseup
				setTimeout(unbindSuppressedEvents, 1);
			} else {
				unbindSuppressedEvents();
			}
			unbindSuppressedEvents = null;
		}
		dragging = false;
		if (pointer) {
			updatePoint(pointer);
		}
		if (noFlick) {
			velX = 0;
			velY = 0;
		}
		dispatchPointerEvent(options.onPointerEnd);
	}
	
	function movePointHover(pointer) {
		var prevPos = hoverPos;
		hoverPos = {
			pageX: pointer.pageX,
			pageY: pointer.pageY
		};
		(prevPos ? options.onHoverMove : options.onHoverStart)({
			pageX: pointer.pageX,
			pageY: pointer.pageY
		});	
	}
	
	function endPointHover(pointer) {
		if (hoverPos) {
			hoverPos = undefined;
			options.onHoverEnd({
				pageX: pointer.pageX,
				pageY: pointer.pageY
			});
		}
	}
	
	// setCapture prevents mouseenter/leave.  Check for it manually.
	function updatePointHoverManually(pointer) {
		if (jQuery(pointer.target).closest(element).length) {
			movePointHover(pointer);
		} else {
			endPointHover(pointer);
		}
	}
	
	eventHandlers['touchstart'] = function(event) {
		// If our current touch isn't in the list of touches, it must have been lost somehow...
		if (pointerId !== undefined) {
			var touches = event.touches || event['originalEvent'].touches;
			var found = false;
			for (var i = 0; i < touches.length; ++i) {
				found = touches[i].identifier == pointerId;
				if (found) break;
			}
			if (!found) {
				endPoint(undefined, true);
			}
		}
		
		if (pointerId === undefined && !event.defaultPrevented) {
			var changedTouches = event.changedTouches || event['originalEvent'].changedTouches;
			var touch = changedTouches[0];
			startPoint(touch.identifier, touch);
			dispatchPointerEvent(options.onPointerStart);
		}
	}
	
	eventHandlers['touchmove'] = function(event) {
		var changedTouches = event.changedTouches || event['originalEvent'].changedTouches;
		for (var i = 0; i < changedTouches.length; ++i) {
			var touch = changedTouches[i];
			if (touch.identifier == pointerId) {
				movePoint(touch, event, touchDragTollerance);
				break;
			}
		}
	}
	
	eventHandlers['touchend'] = function(event) {
		var changedTouches = event.changedTouches || event['originalEvent'].changedTouches;
		for (var i = 0; i < changedTouches.length; ++i) {
			var touch = changedTouches[i];
			if (touch.identifier == pointerId) {
				endPoint(touch, event.type == 'touchcancel');
				break;
			}
		}
	}
	
	eventHandlers['touchcancel'] = eventHandlers['touchend'];
	
	eventHandlers['mouseenter'] = function(event) {
		if (!captureTarget) {
			movePointHover(event);
		}
	}
	
	eventHandlers['mouseleave'] = function(event) {
		if (!captureTarget) {
			endPointHover(event);
		}
	}
	
	eventHandlers['mousedown'] = function(event) {
		if (event.which == 1
			&& pointerId === undefined
			&& !event.defaultPrevented) {
			startPoint('mouse', event);
			pointerId = 'mouse';
			dispatchPointerEvent(options.onPointerStart);
			
			if (event.target
				&& !unbindSuppressedEvents) {
				// Started dragging, prevent clicks.
				var target = jQuery(event.target);
				var prevent = function(targetEvent) {
					targetEvent.stopPropagation();
					return false;
				}
				
				// Create function to unbind the 'prevent' function
				unbindSuppressedEvents = function() {
					target.unbind(targetSuppressedEvents, prevent);
				}
				target.bind(targetSuppressedEvents, prevent);
			}
		
			// Suppress text selection
			return false;
		}
	}
	
	eventHandlers['mousemove'] = function(event) {
		if (pointerId == 'mouse') {
			if (hasSetCapture) {
				updatePointHoverManually(event);
			}
			movePoint(event, event, mouseDragTollerance);
		} else if (pointerId === undefined) {
			movePointHover(event);
		}
	}
	
	eventHandlers['mouseup'] = function(event) {
		if (event.which == 1
			&& pointerId == 'mouse') {
			endPoint(event, false);
		}
	}
	
	eventHandlers['dragstart'] = function(event) {
		// We can't allow drag-drop when we have our own drag
		return false;
	}
	
	eventHandlers['mousewheel'] = eventHandlers['DOMMouseScroll'] = function(event) {
		var originalEvent = event['originalEvent'];
		
		// Cancel if we already handled the other mousewheel/DOMMouseScroll
		if (originalEvent.defaultPrevented) return;
		
		var delta = -originalEvent.detail || (originalEvent.wheelDelta / 120) || 0;
		var deltaX = 0;
		var deltaY = delta;
    	
		if (originalEvent.axis !== undefined && originalEvent.axis === originalEvent.HORIZONTAL_AXIS) {
			deltaY = 0;
			deltaX = delta;
		} else if (originalEvent.wheelDeltaX !== undefined && originalEvent.wheelDeltaY !== undefined) {
			deltaX = originalEvent.wheelDeltaX / 120;
			deltaY = originalEvent.wheelDeltaY / 120;
		}
		
		if (delta != 0) {
			// Guess what the minimum step of this mousewheel is
			mouseWheelStep = Math.max(1, Math.min(Math.abs(delta), mouseWheelStep));
			
			options.onWheel({
				delta: delta,
				deltaX: deltaX,
				deltaY: deltaY,
				step: delta / mouseWheelStep,
				stepX: deltaX / mouseWheelStep,
				stepY: deltaY / mouseWheelStep
			});
			event.preventDefault();
		}
	}
	
	eventHandlers['losecapture'] = eventHandlers['contextmenu'] = function(event) {
		if (pointerId !== undefined) {
			endPoint(undefined, true);
		}
	}
	
	eventHandlers['selectstart'] = function() {
		// Prevent text selection in IE and FireFox
		return false;
	}
	
	var handleEvent = function(event) {
		return element && eventHandlers[event.type].apply(this, arguments);
	}
	
	this.remove = function() {
		if (hasTouch) {
			element.unbind(touchEvents, handleEvent);
		} else {
			element.unbind(mouseEvents, handleEvent);
		}
		endCapture();
		if (unbindSuppressedEvents) {
			unbindSuppressedEvents();
			unbindSuppressedEvents = null;
		}
	}
	
	if (hasTouch) {
		element.bind(touchEvents, handleEvent);
	} else {
		element.bind(mouseEvents, handleEvent);
	}
}

/////////////
// Transform.js
//////////////
var initTransform;

/**
@constructor
*/
function ElementPositionTransform(element) {
	this.element = element;
	this.e = this.element.get(0);
	initTransform(this.e);
}

/**
@constructor
*/
function ElementScaleTransform(element, x, y, width, height) {
	this.element = element;
	this.e = this.element.get(0);
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	initTransform(this.e);
}

(function() {
	var style = $('<div>').get(0).style;
	var transform = findVendorName(style, 'transform');
	var transformOrigin = findVendorName(style, 'transformOrigin');
	
	if (transformOrigin) {
		initTransform = function(e) {
			e.style.position = 'absolute';
			e.style[transformOrigin] = '0 0';
			e.style.left = 0;
			e.style.top = 0;
		}
	} else {
		initTransform = function(e) {
			e.style.position = 'absolute';
		}
	}
	
	if (transform && transformOrigin && findVendorName(style, 'perspective')) {
		// Accelerated transform
		ElementPositionTransform.prototype.setTopLeft = function(x, y) {
			this.e.style[transform] = 'translate3d(' + x.toFixed(3) + 'px,' + y.toFixed(3) + 'px,0)';
		}
		ElementScaleTransform.prototype.setTopLeft = function(x, y, z, sx, sy) {
			this.e.style[transform] = 'translate3d('
				+ (x + this.x * sx).toFixed(3) + 'px,'
				+ (y + this.y * sy).toFixed(3) + 'px,0) scale3d('
				+ sx.toFixed(3) + ','
				+ sy.toFixed(3) + ',1)';
			this.e.style.zIndex = Math.floor(z);
		}
	} else {
		ElementPositionTransform.prototype.setTopLeft = function(x, y) {
			this.e.style.left = Math.round(x) + 'px';
			this.e.style.top = Math.round(y) + 'px';
		}
		ElementScaleTransform.prototype.setTopLeft = function(x, y, z, sx, sy) {
			// Correct for sub-pixel aliasing.
			var left = x + this.x * sx;
			var top = y + this.y * sy;
			var right = left + this.width * sx;
			var bottom = top + this.height * sy;
			left = Math.round(left);
			top = Math.round(top);
			this.e.style.left = left + 'px';
			this.e.style.top = top + 'px';
			this.e.style.width = Math.round(right - left) + 'px';
			this.e.style.height = Math.round(bottom - top) + 'px';
			
			this.e.style.zIndex = Math.floor(z);
		}
	}
})();

//////////////
// SlidingList.js
////////////////
/**
Base implementation of a sideways-scrolling list, using 'view' for customised presentation of the items.

@constructor
*/
function SlidingList(container, options, view) {
	var segments = [];
	var stream = options['stream'];
	var streamContext;
	var input;
	var frameId;
	var updatingTimeout;
	var refreshingTimeout;
	var animateStartTime;
	var animateDuration;
	var animatePositionsCallback;
	var throwDecelleration = options['drag'] || 0.002;
	var thrownVelocity;
	var stepTimeout;
	var stepDirection = (options['stepDirection'] < 0) ? -1 : 1;
	var stepInterval = 'stepInterval' in options ? options['stepInterval'] : 3000;
	var stepDuration = 'stepDuration' in options ? options['stepDuration'] : 1000;
	var grabbed;
	var preloadCount = ('preload' in options) ? options['preload'] : 20;
	var preloadDistance = view.itemSpacing * preloadCount;
	var removeDistance = view.itemSpacing * preloadCount * 3 / 2; // 50% more
	var startItem = options['startItem'];
	var focusedItem = null;
	var rounding = options['rounding'];
	var maxThrowVelocity = options['maxThrowVelocity'] || 4;
	var maxThrowItems = options['maxThrowItems'] || Infinity;
	
	/**
	A segment of items, containing additional data required for the SlidingList.
	
	@constructor
	@param {*} id  The segment id to create
	@param {number} index  Index to insert the segment
	*/
	function Segment(id, index) {
		// Immediately insert into our list of segments
		segments.splice(index, 0, this);
		
		this.id = id;
		this.streamItems = [];
		this.loaded = false;
		this.next = null;
		this.prev = null;
		this.width = 0;
		
		var segment = this;
		stream['loadSegment'](id, streamContext, function(streamSegment) {
			if (segment.removed) return;
			
			var length = streamSegment['length'];
			segment.streamSegment = streamSegment;
			segment.next = streamSegment['next'];
			segment.prev = streamSegment['prev'];
			
			// Prevent infinite loops from degenerate segments
			if (segment.next == segment && !length) delete segment.next;
			if (segment.prev == segment && !length) delete segment.prev;
			
			if (segment.viewSegment) segment.viewSegment.remove();
			segment.viewSegment = view.createSegment(streamSegment, container);
			
			segment.loaded = true;
			segment.width = length * view.itemSpacing;
			
			// Load stream items so images closest to current position load first
			if (index == segments.length - 1) {
				// Right end, load forward
				for (var i = 0; i < streamSegment.length; ++i) {
					segment.streamItems.push(stream['createItem'](segment.streamSegment, i, streamContext));
				}
			} else {
				// Left end, load backward
				for (var i = streamSegment.length - 1; i >= 0; --i) {
					segment.streamItems[i] = stream['createItem'](segment.streamSegment, i, streamContext);
				}
			}
			for (var i = 0; i < segment.streamItems.length; ++i) {
				segment.viewSegment.initItem(segment.streamItems[i], i);
			}
			segment.initPosition();
			startItem = null;
			updateLoadedSegments();
		});
		
		if (!this.loaded) {
			// Show a placeholder while loading
			this.width = view.itemSpacing;
			this.viewSegment = view.createPlaceholderSegment(container);
			this.initPosition();
		}
	}
	Segment.prototype.initPosition = function() {
		var first = segments[1];
		var last = segments[segments.length - 2];
		if (this.loaded && startItem !== null) {
			// Very first loaded segment.  Position so startItem is centered.
			if (typeof startItem == 'function') {
				var startTest = startItem;
				startItem = null;
				for (var i = 0; i < this.streamItems.length; ++i) {
					if (startTest(this.streamItems[i])) {
						startItem = i;
						break;
					}
				}
			}
			if (startItem >= 0 && startItem < this.streamItems.length) {
				// Always center start image
				this.x = (view.viewWidth - view.itemSpacing) / 2 - startItem * view.itemSpacing;
			} else {
				// No starting image.  Position first segment according to normal alignment.
				this.x = view.marginWidth;
			}
			this.startX = this.x;
			this.endX = this.x;
			startItem = null;
		} else if (this == segments[0] && first && first.loaded) {
			// Insert new first segment before current first.
			this.x = first.x - this.width;
			this.startX = first.startX - this.width;
			this.endX = first.endX - this.width;
		} else if (this == segments[segments.length - 1] && last && last.loaded) {
			// Insert new last segment after current last
			this.x = last.x + last.width;
			this.startX = last.startX + last.width;
			this.endX = last.endX + last.width;
		} else {
			// Not ready
			this.x = view.marginWidth;
			this.startX = view.marginWidth;
			this.endX = view.marginWidth;
		}
		
		this.updatePosition(false);
	}
	Segment.prototype.updatePosition = function(refreshing) {
		this.viewSegment.setPosition(this.x, refreshing);
		
		var focusedIndex = Math.floor((view.viewWidth / 2 - this.x) / view.itemSpacing);
		if (focusedIndex >= 0 && focusedIndex < this.streamItems.length
			&& this.streamItems[focusedIndex] != focusedItem) {
			focusedItem = this.streamItems[focusedIndex];
			if (options['onItemFocused']) {
				options['onItemFocused'](focusedItem, this.id, focusedIndex);
			}
		}
	}
	Segment.prototype.remove = function() {
		this.removed = true;
		if (this.viewSegment) this.viewSegment.remove();
		delete this.streamSegment;
		while (this.streamItems.length) {
			remove(this.streamItems.pop());
		}
	}
	
	function beginAnimation(distance, duration, positionCallback) {
		cancelAnimation();
		var endX = Math.round(segments[0].x + distance);
		for (var i = 0; i < segments.length; ++i) {
			var segment = segments[i];
			segment.startX = segment.x;
			segment.endX = endX;
			endX += segment.width;
		}
		updateLoadedSegments();
		animateStartTime = now();
		animateDuration = duration;
		animatePositionsCallback = positionCallback;
		frameId = requestFrame(animate);
	}
	
	function endAnimation() {
		for (var i = 0; i < segments.length; ++i) {
			var segment = segments[i];
			segment.x = segment.startX = segment.endX;
		}
		updateLoadedSegments();
		waitStep();
	}
	
	function cancelAnimation() {
		clearTimeout(stepTimeout);
		stepTimeout = undefined;
		cancelFrame(frameId);
		frameId = undefined;
	}
	
	function animate() {
		frameId = undefined;
		var t = now() - animateStartTime;
		if (t >= animateDuration) {
			endAnimation();
		} else {
			animatePositionsCallback(t);
			
			// Check for the ends of what we've loaded.
			var viewWidth = view.viewWidth;
			var leftStop = view.marginWidth;
			var rightStop = viewWidth - view.marginWidth;
			if (segments[0].x > leftStop) {
				// Hit leftmost end
				var x = leftStop;
				for (var i = 0; i < segments.length; ++i) {
					var segment = segments[i];
					segment.endX = x;
					x += segment.width;
				}
				endAnimation();
			} else if (segments[segments.length - 1].x + segments[segments.length - 1].width < rightStop) {
				// Hit rightmost end
				var x = rightStop;
				for (var i = segments.length - 1; i >= 0; --i) {
					var segment = segments[i];
					x -= segment.width;
					segment.endX = x;
				}
				endAnimation();
			} else {
				// Still free to move
				frameId = requestFrame(animate);
			}
		}
		updateSegmentPositions(false);
	}
	
	function doThrow(velocity) {
		thrownVelocity = velocity;
		
		// Continue stepping in the direction they ask
		stepDirection = (thrownVelocity > 0) ? -1 : 1;
		
		// Unconstrained throw
		var distance = (0.5 * thrownVelocity * thrownVelocity) / ((thrownVelocity < 0) ? -throwDecelleration : throwDecelleration);
		
		if (rounding) {
			// Round distance to nearest item
			var p = segments[0].x - view.marginWidth + distance;
			distance += Math.round(p / view.itemSpacing) * view.itemSpacing - p;
		}
		
		// Prevent throwing more than maxThrowItems
		var itemX = (segments[0].x - view.marginWidth) / view.itemSpacing;
		if (distance < 0) {
			var itemOffset = Math.ceil(itemX) - itemX;
			var count = Math.ceil(itemOffset - distance / view.itemSpacing);
			if (count > maxThrowItems) {
				distance = (itemOffset - maxThrowItems) * view.itemSpacing;
			}
		} else {
			var itemOffset = itemX - Math.floor(itemX);
			var count = Math.ceil(itemOffset + distance / view.itemSpacing);
			if (count > maxThrowItems) {
				distance = (maxThrowItems - itemOffset) * view.itemSpacing;
			}
		}
		
		if (distance != 0) {
			// Readjust velocity and duration to match clamped/rounded distance
			thrownVelocity = Math.sqrt(Math.abs(distance * throwDecelleration * 2));
			if (distance < 0) thrownVelocity = -thrownVelocity;
			var duration = thrownVelocity / ((thrownVelocity < 0) ? -throwDecelleration : throwDecelleration);
			beginAnimation(distance, duration, updateThrowPositions);
		}
	}
	
	function updateThrowPositions(t) {
		var d = (thrownVelocity < 0) ? -throwDecelleration : throwDecelleration;
		for (var i = 0; i < segments.length; ++i) {
			var segment = segments[i];
			segment.x = segment.startX + thrownVelocity * t - 0.5 * d * t * t;
		}
	}
	
	function updateStepPositions(t) {
		t = smooth(t / animateDuration);
		for (var i = 0; i < segments.length; ++i) {
			var segment = segments[i];
			segment.x = segment.startX + t * (segment.endX - segment.startX);
		}
	}
	
	function waitStep() {
		if (frameId === undefined
			&& stepTimeout === undefined
			&& segments.length > 0
			&& !grabbed
			&& stepInterval != null) {
			// Not moving, start step in a bit
			stepTimeout = window.setTimeout(function() {
				stepTimeout = undefined;
				
				var count = 1;
				var step = (view.marginWidth - segments[0].x) % view.itemSpacing;
				var tollerance = 0.25 * view.itemWidth; // If this close to already-centered, go to next.
				if (stepDirection < 0) {
					while (step <= tollerance) step += view.itemSpacing;
					step += (count - 1) * view.itemSpacing;
				} else {
					while (step >= -tollerance) step -= view.itemSpacing;
					step -= (count - 1) * view.itemSpacing;
				}
				beginAnimation(step, stepDuration, updateStepPositions);
			}, stepInterval);
		}
	}
	
	// Move segments to their x position
	// Check for currently focused item
	function updateSegmentPositions(refreshing) {
		for (var i = 0; i < segments.length; ++i) {
			segments[i].updatePosition(refreshing);
		}
	}
	
	// Remove old segments, updateLoadedSegments other segments that will be visible duration the animation.
	function updateLoadedSegments() {
		if (updatingTimeout !== undefined) return;
		updatingTimeout = setTimeout(function() {
			updatingTimeout = undefined;
			if (!segments.length) return;
			
			var viewWidth = view.viewWidth;
			
			var minSegment = segments[0];
			var maxSegment = segments[segments.length - 1];
			
			// Remove segments too far away
			while (Math.max(minSegment.x, minSegment.endX) + minSegment.width < -removeDistance) {
				segments.shift().remove();
				minSegment = segments[0];
			}
			while (Math.min(maxSegment.x, maxSegment.endX) > viewWidth + removeDistance) {
				segments.pop().remove();
				maxSegment = segments[segments.length - 1];
			}
			
			// Load more segments
			if (Math.max(minSegment.x, minSegment.endX) > -preloadDistance
				&& minSegment.prev != null) {
				new Segment(minSegment.prev, 0);
			}
			if (Math.min(maxSegment.x, maxSegment.endX) + maxSegment.width < viewWidth + preloadDistance
				&& maxSegment.next != null) {
				new Segment(maxSegment.next, segments.length);
			}
		}, 1);
	}
	
	// Starts non-animated moving
	function startMove() {
		cancelAnimation();
		thrownVelocity = 0;
		for (var i = 0; i < segments.length; ++i) {
			var segment = segments[i];
			segment.startX = segment.endX = segment.x;
		}
	}
	
	// Moves relative to position saved by startMove
	function doMove(offset) {
		var viewWidth = view.viewWidth;
		var minSegment = segments[0];
		var minX = minSegment.startX;
		if (minSegment.prev != null) minX -= view.itemSpacing;
		var maxSegment = segments[segments.length - 1];
		var maxX = maxSegment.startX + maxSegment.width;
		if (maxSegment.next != null) maxX += view.itemSpacing;
		
		// Clamp the view
		var leftStop = view.marginWidth;
		var rightStop = viewWidth - view.marginWidth;
		offset = Math.max(offset, rightStop - maxX);
		offset = Math.min(offset, leftStop - minX);
		
		for (var i = 0; i < segments.length; ++i) {
			var segment = segments[i];
			segment.x = segment.endX = segment.startX + offset;
		}
		updateSegmentPositions(false);
		updateLoadedSegments();
	}
	
	this.remove = function() {
		clearTimeout(updatingTimeout);
		updatingTimeout = undefined;
		clearTimeout(refreshingTimeout);
		refreshingTimeout = undefined;
		cancelAnimation();
		while (segments.length > 0) {
			remove(segments.pop());
		}
	}
	
	this.refresh = function() {
		if (frameId === undefined && refreshingTimeout === undefined) {
			refreshingTimeout = setTimeout(function() {
				refreshingTimeout = undefined;
				updateSegmentPositions(true);
				updateLoadedSegments();
			}, 0);
		}
	}
	
	this.stepItem = function(step) {
		if (!grabbed
			&& segments.length > 0)
		{
			var dir = (step > 0) ? 1 : -1;
			var round = (step > 0) ? Math.floor : Math.ceil;
			// Align to the item on the side we're moving towards
			var side = (step > 0) ? (view.viewWidth + view.itemSpacing - view.itemWidth - view.marginWidth) : view.marginWidth;
			// Only scroll to the next item if they can see more than stepTollerance of the current item
			var tollerance = dir * view.stepTollerance;
			var target = round((segments[0].endX - side) / view.itemSpacing - step + tollerance) * view.itemSpacing + side;
			var distance = target - segments[0].x;
			var vel = Math.sqrt(Math.abs(2 * distance * throwDecelleration));
			if (distance < 0) vel = -vel;
			doThrow(vel);
		}
	}
	
	this.stepPage = function(step) {
		// Step a viewport width's worth of items
		// A page is the view width minus the margins
		var pageWidth = view.viewWidth - view.marginWidth * 2;
		this.stepItem(step * Math.max(1, Math.floor((view.viewWidth - view.marginWidth * 2) / view.itemSpacing)));
	}
	
	streamContext = {
		'itemWidth': view.itemFitWidth || view.itemWidth,
		'itemHeight': view.itemFitHeight || view.itemHeight,
		'itemSpacing': view.itemSpacing,
		'refresh': this.refresh
	}
	new Segment(options['startSegment'] || 0, 0);
	updateLoadedSegments();
	
	input = new PointerListener(container, {
		dragHorizontal: true,
		dragVertical: false,
		
		onPointerStart: function(event) {
			grabbed = segments.length > 1 || segments[0].loaded;
			if (grabbed) {
				startMove();
			}
		},
		onPointerMove: function(event) {
			if (grabbed) {
				doMove(event.pageX - event.startX);
			}
		},
		onPointerEnd: function(event) {
			if (grabbed) {
				doThrow(clamp(-maxThrowVelocity, event.velX, maxThrowVelocity));
				grabbed = false;
				waitStep();
			}
		},
		onWheel: function(event) {
			if (!grabbed
				&& segments.length > 0)
			{
				// Calculate distance, then 'throw' it that far
				var scroll = Math.abs(event.step) >= Math.abs(event.stepX) ? event.step : event.stepX;
				var distance = segments[0].endX - segments[0].x + scroll * view.itemSpacing;
				var vel = Math.sqrt(Math.abs(2 * distance * throwDecelleration));
				if (distance < 0) vel = -vel;
				doThrow(clamp(-maxThrowVelocity, vel, maxThrowVelocity));
			}
		},
		onHoverStart: function() {},
		onHoverEnd: function() {},
		onHoverMove: function(event) {
			// Restart timeout
			clearTimeout(stepTimeout);
			stepTimeout = undefined;
			waitStep();
		}
	});
	
	waitStep();
}

///////////////
// Bookshelf,js
///////////////

/**
@constructor
*/
function Bookshelf(container, options) {
	container = jQuery(container);
	setVendorCss(container, 'userSelect', 'none');
	container.css('overflow', 'hidden');
	if (!/^(absolute|fixed)$/.test(container.css('position'))) container.css('position', 'relative');
	
	var spacing = options['spacing'] || 1;
	var viewWidth = container.width();
	var viewHeight = container.height();
	var itemHeight = options['itemHeight'] || viewHeight;
	var itemWidth = options['itemWidth'] || itemHeight * (options['itemAspect'] || 1);
	var marginWidth = options['marginWidth'] || 0;
	var itemSpacing = Math.round(itemWidth * spacing);
	
	/**
	The bookshelf adds its own data to a Stream's segment.
	
	@constructor
	*/
	function BookshelfSegment(streamSegment, container) {
		this.items = [];
		this.element = jQuery('<div>').css({
			width: (streamSegment.length * itemWidth) + 'px',
			height: itemHeight + 'px'
		});
		this.transform = new ElementPositionTransform(this.element);
		container.append(this.element);
	}
	
	BookshelfSegment.prototype.setPosition = function(position, refreshing) {
		this.transform.setTopLeft(Math.round(position * DEVICE_PIXEL_RATIO) / DEVICE_PIXEL_RATIO, 0);
		if (refreshing) {
			// May be in response to an image loading.  Re-center image.
			for (var i = 0; i < this.items.length; ++i) {
				this.repositionItem(this.items[i], i);
			}
		}
	}
	
	BookshelfSegment.prototype.initItem = function(streamItem, index) {
		this.items[index] = streamItem;
		jQuery(streamItem['element']).css('position', 'absolute');
		this.repositionItem(streamItem, index);
		this.element.append(streamItem['element']);
	}
	
	BookshelfSegment.prototype.repositionItem = function(streamItem, index) {
		var h = streamItem['height'] != null ? streamItem['height'] : itemHeight;
		var w = streamItem['width'] != null ? streamItem['width'] : itemWidth;
		jQuery(streamItem['element'])
			.css('top', Math.round(itemHeight - h) + 'px')
			.css('left', Math.round(itemSpacing * index + (itemWidth - w) / 2) + 'px');
	}
	
	BookshelfSegment.prototype.remove = function() {
		this.element.remove();
	}
	
	var view = {
		itemWidth: itemWidth,
		itemHeight: itemHeight,
		itemSpacing: itemSpacing,
		viewWidth: viewWidth,
		marginWidth: marginWidth,
		// Step to next item if the current is at least 90% visible.
		stepTollerance: 0.9,
		
		createSegment: function(streamSegment, container) {
			return new BookshelfSegment(streamSegment, container);
		},
		
		createPlaceholderSegment: function(container) {
			var segment = new BookshelfSegment({
				length: 1
			}, container);
			
			// TODO: Loading...
			segment.element.append(jQuery('<div>').css({
				width: itemWidth + 'px',
				height: itemHeight + 'px'
			}));
			return segment;
		}
	}
	var list = new SlidingList(container, options, view);

	this['remove'] = function() {
		list.remove();
		list = undefined;
	}
	
	this['refresh'] = function() {
		view.viewWidth = viewWidth = container.width();
		list.refresh();
	}
	
	this['step'] = function(dir) {
		list.stepItem(dir);
	}
	
	this['stepPage'] = function(dir) {
		list.stepPage(dir);
	}
}

///////////////
// Carousel.js
////////////////

/**
@constructor
*/
function Carousel(container, options) {
	container = jQuery(container);
	setVendorCss(container, 'userSelect', 'none');
	container.css('user-select', 'none');
	if (!/^(absolute|fixed)$/.test(container.css('position'))) container.css('position', 'relative');
	
	var spacing = options['spacing'] || 1.2;
	var tilt = options['tilt'] || 0;
	var perspective = 'perspective' in options ? options['perspective'] : 1;
	var viewWidth = container.width();
	var viewHeight = container.height();
	var itemHeight = options['itemHeight'] || viewHeight;
	var itemWidth = options['itemWidth'] || itemHeight * (options['itemAspect'] || 1);
	var itemSpacing = itemWidth * spacing;
	var fade = 'fade' in options ? options['fade'] : 0.1;
	
	var radius = spacing * viewWidth / 2;
	var virtualWidth = Math.PI * radius;
	
	if (!('startItem' in options)) {
		// By default, start so one item is centered and we don't reveal the previous segment to the left.
		options['startItem'] = Math.ceil(virtualWidth / 2 / itemSpacing);
	}
	
	/**
	The carousel adds its own data to a Stream's segment.
	
	@constructor
	*/
	function CarouselSegment(streamSegment, container) {
		this.container = container;
		this.items = [];
		this.visible = false;
	}
	
	CarouselSegment.prototype.setPosition = function(position) {
		if (!this.visible) {
			// Quick test whether Segment has become visible.
			this.visible = position < virtualWidth && position > -this.items.length * itemSpacing;
		}
		if (this.visible) {
			// Update items, record if none are visible
			var anyVisible;
			for (var i = 0; i < this.items.length; ++i) {
				var item = this.items[i];
				item.setPosition(position + itemSpacing * i);
				anyVisible = anyVisible || item.visible;
			}
			this.visible = anyVisible;
		}
	}
	
	CarouselSegment.prototype.initItem = function(streamItem, index) {
		this.items[index] = new CarouselItem(streamItem, this.container);
	}
	
	CarouselSegment.prototype.remove = function() {
		for (var i = 0; i < this.items.length; ++i) {
			this.items[i].element.remove();
		}
	}
	
	/**
	@constructor
	*/
	function CarouselItem(streamItem, SegmentContainer) {
		this.element = jQuery(streamItem['element']).hide();
		this.streamItem = streamItem;
		this.visible = false;
		this.transform = new ElementScaleTransform(this.element, 0, 0, 0, 0);
		SegmentContainer.append(this.element);
	}
	
	CarouselItem.prototype.setPosition = function(position) {
		var p = (itemSpacing + position) / (itemSpacing + virtualWidth);
		var visible = p > 0 && p < 1 && this.streamItem['width'] > 0 && this.streamItem['height'] > 0;
		if (visible) {
			var angle = p * Math.PI;
			var z = 1 - Math.sin(angle);
			var scale = 1 / (1 + perspective * z);
			var x = viewWidth / 2 - scale * radius * Math.cos(angle);
			var y = viewHeight * tilt * z;
			
			var w = this.streamItem['width'];
			var h = this.streamItem['height'];
			this.transform.x = (itemWidth - w) / 2;
			this.transform.y = itemHeight - h;
			this.transform.width = w;
			this.transform.height = h;
			
			this.transform.setTopLeft(
				x - scale * itemWidth / 2,
				y + itemHeight - scale * itemHeight,
				1000 * (1 - z),
				scale, scale);
			var alpha = (p < fade) ? (p / fade)
				: (p > 1 - fade) ? ((1 - p) / fade)
				: 1;
			this.element.css('opacity', alpha.toFixed(3));
		}
		if (this.visible != visible) {
			this.visible = visible;
			this.element.toggle(visible);
		}
	}
	
	
	var list = new SlidingList(container, options, {
		// Size of item
		itemWidth: itemWidth,
		itemHeight: itemHeight,
		itemSpacing: itemSpacing,
		// Size of viewport.  For the carousel, this is the length of the arc that we place items.
		viewWidth: virtualWidth,
		// The left or rightmost item should be centered
		marginWidth: (virtualWidth - itemSpacing) / 2,
		// Step to next item that isn't the closest
		stepTollerance: 0.5,
		
		createSegment: function(streamSegment, container) {
			return new CarouselSegment(streamSegment, container);
		},
		
		createPlaceholderSegment: function(container) {
			// TODO: Loading...
			return new CarouselSegment(null, container);
		}
	});

	this['remove'] = function() {
		list.remove();
		list = undefined;
	}
	
	this['refresh'] = function() {
		list.refresh();
	}
	
	this['step'] = function(dir) {
		list.stepItem(dir);
	}
}

///////////////
// Train.js
///////////////

/**
@constructor
*/
function Train(container, options) {
	container = jQuery(container);
	setVendorCss(container, 'userSelect', 'none');
	container.css('user-select', 'none');
	container.css('overflow', 'hidden');
	if (!/^absolute|fixed$/.test(container.css('position'))) container.css('position', 'relative');
	
	var spacing = options['spacing'] || 1.1;
	var viewWidth = container.width();
	var viewHeight = container.height();
	var itemFitHeight = options['itemHeight'] || viewHeight;
	var itemFitWidth = options['itemWidth'] || itemFitHeight * (options['itemAspect'] || 0.8);
	var itemWidth = itemFitWidth * (options['unfocusedScale'] || 0.2);
	var itemHeight = itemFitHeight;
	var itemSpacing = itemWidth * spacing;
	var unfocusedOpacity = 'unfocusedOpacity' in options ? options['unfocusedOpacity'] : 0.5;
	var transitionOverlap = 'transitionOverlap' in options ? options['transitionOverlap'] : 0.15;
	var transitionFade = 'transitionFade' in options ? options['transitionFade'] : 0.2;
	var focusedPosition = 'focusedPosition' in options ? options['focusedPosition'] : 0.5;
	
	// The focused is assumed to be in the middle of the virtual area, so prepare an area that is sufficiently wide.
	var virtualWidth = viewWidth * (1 + 2 * Math.abs(focusedPosition - 0.5));
	
	if (!('startItem' in options)) {
		// By default, start so one item is centered and we don't reveal the previous segment to the left.
		options['startItem'] = Math.ceil(virtualWidth / 2 / itemSpacing);
	}
	if (!('maxThrowVelocity' in options)) {
		options['maxThrowVelocity'] = 1;
	}
	if (!('rounding' in options)) {
		options['rounding'] = true;
	}
	
	/**
	@constructor
	*/
	function TrainSegment(streamSegment, container) {
		this.container = container;
		this.items = [];
		this.visible = false;
	}
	
	TrainSegment.prototype.setPosition = function(position) {
		if (!this.visible) {
			// Quick test whether segment has become visible.
			this.visible = position < virtualWidth && position > -this.items.length * itemSpacing;
		}
		if (this.visible) {
			// Update items, record if none are visible
			var anyVisible;
			for (var i = 0; i < this.items.length; ++i) {
				var item = this.items[i];
				item.setPosition(position + itemSpacing * i);
				anyVisible = anyVisible || item.visible;
			}
			this.visible = anyVisible;
		}
	}
	
	TrainSegment.prototype.initItem = function(streamItem, index) {
		this.items[index] = new TrainItem(streamItem, this.container);
	}
	
	TrainSegment.prototype.remove = function() {
		for (var i = 0; i < this.items.length; ++i) {
			this.items[i].element.remove();
		}
	}
	
	/**
	@constructor
	*/
	function TrainItem(streamItem, segmentContainer) {
		this.element = jQuery(streamItem['element']).hide();
		this.streamItem = streamItem;
		this.visible = false;
		this.transform = new ElementScaleTransform(this.element, 0, 0, 0, 0);
		segmentContainer.append(this.element);
	}
	
	TrainItem.prototype.setPosition = function(position) {
		var p = (itemSpacing + position) / (itemSpacing + virtualWidth);
		var visible = p > 0 && p < 1;
		if (visible) {
			var w = this.streamItem['width'];
			var h = this.streamItem['height'];
			this.transform.x = -w / 2;
			this.transform.y = 0;
			this.transform.width = w;
			this.transform.height = h;
			
			// How close this item is to the focused position
			var focus = smooth(Math.max(0, 1 - Math.abs(position - (virtualWidth - itemSpacing) / 2) / ((1 + transitionOverlap) * itemSpacing / 2)));
			var scale = (1 - focus) * (itemWidth / itemFitWidth) + focus;
			var height = scale * h;
			
			var x = position + itemSpacing / 2;
			if (focusedPosition < 0.5) x += (viewWidth - virtualWidth);
			this.transform.setTopLeft(
				x,
				(viewHeight - height) / 2,
				1000 * focus,
				scale, scale);
			var alphaT = focus / transitionFade;
			var alpha = Math.min(1, unfocusedOpacity * (1 - alphaT) + alphaT);
			this.element.css('opacity', alpha.toFixed(3));
		}
		if (this.visible != visible) {
			this.visible = visible;
			this.element.toggle(visible);
		}
	}
	
	
	var list = new SlidingList(container, options, {
		// Size of item
		itemWidth: itemWidth,
		itemHeight: itemHeight,
		itemSpacing: itemSpacing,
		// For quality, items need to be scaled to fit in full size
		itemFitWidth: itemFitWidth,
		itemFitHeight: itemFitHeight,
		// Size of viewport.
		viewWidth: virtualWidth,
		marginWidth: (virtualWidth - itemSpacing) / 2,
		// Step to next item that isn't the closest
		stepTollerance: 0.5,
		createSegment: function(streamSegment, container) {
			return new TrainSegment(streamSegment, container);
		},
		
		createPlaceholderSegment: function(container) {
			// TODO: Loading...
			return new TrainSegment(null, container);
		}
	});

	this['remove'] = function() {
		list.remove();
		list = undefined;
	}
	
	this['refresh'] = function() {
		list.refresh();
	}
	
	this['step'] = function(dir) {
		list.stepItem(dir);
	}
}

////////////////////
// FadeTransition.js
///////////////////

/**
@constructor

Fades from one item to another using opacity.  Nicely handles delays and fading when you change your mind mid-transition.

Just call show(element) to add it to the container and fade it in when necessary.  If it never gets to
be shown, it's never added.

*/
function FadeTransition(container, outDuration, inDelay, inDuration) {
	inDelay = inDelay || 0;
	inDuration = (inDuration >= 0) ? inDuration : outDuration;
	
	var initTime = now();
	
	var prev;
	var prevFadeTime = initTime; // Time fully faded out
	var current;
	var currentFadeTime = initTime; // If !next, time full faded in, else time faded out
	var currentAdded;
	var next;
	var frame;
	var timeout;
	
	function setOpacity(element, value) {
		element.css('opacity', clamp(0.01, value, 1));
	}
	
	function update() {
		frame = undefined;
		timeout = undefined;
		
		var t = now();
		if (next) {
			if (currentAdded) {
				// Fading out current
				if (t < currentFadeTime) {
					setOpacity(current, (currentFadeTime - t) / outDuration);
				} else {
					current.remove();
					currentAdded = false;
				}
			}
			if (!currentAdded) {
				current = next;
				next = undefined;
				currentFadeTime = Math.max(t, Math.max(t, prevFadeTime) + inDelay) + inDuration;
			}
		}
		if (current && !next) {
			// Fading in current
			if (t >= currentFadeTime - inDuration) {
				if (!currentAdded) {
					// Create if only a jQuery string
					current = jQuery(current);
				}
				setOpacity(current, 1 - (currentFadeTime - t) / inDuration);
				if (!currentAdded) {
					container.append(current);
					currentAdded = true;
				}
			}
		}
		if (prev) {
			if (t < prevFadeTime) {
				setOpacity(prev, (prevFadeTime - t) / outDuration);
			} else {
				prev.remove();
				prev = undefined;
			}
		}
		
		if (prev || (t >= currentFadeTime - inDuration && t < currentFadeTime)) {
			// Actively animating
			frame = requestFrame(update);
		} else if (t < currentFadeTime) {
			// Waiting to fade in current
			timeout = setTimeout(update, currentFadeTime - inDuration - t);
		}
	}
	
	function stop() {
		clearTimeout(timeout);
		timeout = undefined;
		cancelFrame(frame);
		frame = undefined;
	}
	
	this['show'] = function(element) {
		stop();
		if (!next) {
			// Current will be fading out now
			var t = now();
			currentFadeTime = t + Math.min(1, 1 - (currentFadeTime - t) / inDuration) * outDuration;
		}
		next = element;
		if (prev) {
			// Transition to next when current and previous have faded out
		} else {
			if (currentAdded) {
				// Make current the previous for fading out
				prev = current;
				prevFadeTime = currentFadeTime;
				currentAdded = false;
			}
			current = undefined;
		}
		update();
	}
	
	this['remove'] = stop;
}

//////////////////
// SimpleItem.js
//////////////////

/**
@constructor
*/
function SimpleItem(data, context) {
	// Create container for the item
	var a = jQuery('<a>')
		.css('display', 'inline-block');
	jQuery.extend(a.get(0), {
		'href': data['link'],
		'target': data['target'],
		'title': data['title']
	});
		
	this['element'] = a;
	// Before the item is loaded the container has zero size
	this['width'] = 0;
	this['height'] = 0;
	this['data'] = data;
	
	var self = this;

	// Load the image asynchronously
	var image = new Image();
	var loaded = false;
	function ready() {
		if (loaded) {
			return;
		}
		loaded = true;
		image.onload = null;
		image.onerror = null;
		
		// Preserving the item's aspect ratio, make the item fill the box
		self['width'] = context['itemWidth'];
		self['height'] = Math.round(this.height * context['itemWidth'] / this.width);
		if (self['height'] > context['itemHeight']) {
			self['width'] = Math.round(this.width * context['itemHeight'] / this.height);
			self['height'] = context['itemHeight'];
		}
        var w = image.width;
		var h = image.height;
		if (image.src != 'https://apps.lib.kth.se/alma/newbooks/images/book200.png') {
            a.width(self['width'])
			.height(self['height'])
			.append(jQuery(image).css({
				// For a Carousel display, the image must fill its container, so that non-3D-accelerated browsers can scale it by resizing the <a>.
				'width': '100%',
				'height': '100%',
				// Remove border for linked image
				'border': 'none'
			}));
        } else {
            a.width(self['width'])
			.height(self['height'])
			.append(`<div class="bookshelfshape shape ">${self['data'].title}</div>`);
            
        }
		context.refresh();
	}
	image.onload = ready;
	image.onerror = ready;
    if (data['image'] != '') {
        image.src = data['image'];
    }
    else {
        image.src = 'https://apps.lib.kth.se/alma/newbooks/images/book200.png'
    }
	
	if (image.complete) {
		ready.call(image);
	}
}

////////////////////
// SubstituteImage.js
////////////////////

var SubstituteImage_useIE8Shadow = jQuery.browser.msie && /^[1-8]\./.test(jQuery.browser.version);


var SubstituteImage_queueTimeout;
var SubstituteImage_queueCallbacks = [];

/**
@private
*/
function SubstituteImage_dispatch() {
	SubstituteImage_queueTimeout = null;
	try {
		var callback = SubstituteImage_queueCallbacks.shift();
		callback();
	} finally {
		if (SubstituteImage_queueCallbacks.length) {
			SubstituteImage_queueTimeout = setTimeout(SubstituteImage_dispatch, 1);
		}
	}
}

/**
The SubstituteImage's substitute function is expensive.  This is used to queue the creation of substitute images one at a time.

@private
*/
function SubstituteImage_queue(callback) {
	SubstituteImage_queueCallbacks.push(callback);
	if (!SubstituteImage_queueTimeout) {
		SubstituteImage_queueTimeout = setTimeout(SubstituteImage_dispatch, 1);
	}
}


/**
@constructor
*/
function SubstituteImage(container, imageUrl, colorSeed, title, subtitle, authors, options) {
	function addBoxShadow(book) {
		if (SubstituteImage_useIE8Shadow) {
			var p = book.position();
			book.before(jQuery('<div class="shelf-ie-box-shadow">').css({
				'left': (p.left - 5) + 'px',
				'top': (p.top - 4) + 'px',
				'width': book.outerWidth() + 'px',
				'height': book.outerHeight() + 'px'
			}));
		} else {
			setVendorCss(book, 'boxShadow', options['boxShadow']);
		}
		
	}
	
	function substitute() {
		// Add substitute
		var random = new Random(colorSeed);
		var color = 'rgb(#,#,#)'.replace(/#/g, function() { return Math.floor(256 * (0.4 + 0.4 * random.next())) });
		var book = jQuery('<div class="shelf-image-substitute">').css('background-color', color);
		container.append(book);
		
		var fontSize;
		var bookWidth = book.width();
		var bookHeight = book.height();
		
		// Shrink authors so they fits in the allowed size
		var authorsDiv = jQuery('<div class="shelf-image-authors static">');
		if (authors) {
			for (var i = 0; i < authors.length; ++i) {
				authorsDiv.append(jQuery('<div>').text(authors[i]));
			}
		}
		book.append(authorsDiv);
		fontSize = options['authorsFontSize'];
		while (fontSize > 1
			&& (authorsDiv.outerHeight() > options['authorsMaxHeight'] || authorsDiv.outerWidth() > bookWidth)) {
			--fontSize;
			authorsDiv.css('font-size', fontSize + 'px');
		}
		authorsDiv.removeClass('static');
		
		var subtitleDiv;
		var subtitleHeight = 0;
		if (subtitle) {
			subtitleDiv = jQuery('<div class="shelf-image-subtitle">').text(subtitle);
			book.prepend('<br>').prepend(subtitleDiv);
			// Shrink subtitle until it fits in the allowed size
			fontSize = options['subtitleFontSize'];
			while (fontSize > 1
				&& (subtitleDiv.outerHeight() > options['subtitleMaxHeight'] || subtitleDiv.outerWidth() > bookWidth)) {
				--fontSize;
				subtitleDiv.css('font-size', fontSize + 'px');
			}
			subtitleHeight = subtitleDiv.outerHeight();
		}
		
		// Shrink title until it fits in available space
		var titleDiv = jQuery('<div class="shelf-image-title">').text(title);
		book.prepend('<br>').prepend(titleDiv);
		fontSize = options['titleFontSize'];
		var freeHeight = bookHeight - authorsDiv.outerHeight() - subtitleHeight;
		while (fontSize > 1
			&& (titleDiv.outerHeight() > freeHeight
				|| titleDiv.outerWidth() > bookWidth)) {
			--fontSize;
			book.css('font-size', fontSize + 'px');
		}
		
		// Position title and subtitle middle-ish-top
		var titleTotalHeight = titleDiv.outerHeight() + subtitleHeight;
		var titleY = Math.floor(Math.max(0, Math.min(
				(bookHeight - titleTotalHeight) * 0.2, // Nice middle-top
				(bookHeight - authorsDiv.outerHeight() - titleTotalHeight) / 2 // Dead-center of available space
			)));
		titleDiv.css('top', titleY + 'px');
		if (subtitleDiv) subtitleDiv.css('top', titleY + 'px');
		
		if (SubstituteImage_useIE8Shadow) {
			book.addClass('shelf-ie-no-text-shadow');
			titleDiv.prepend(jQuery('<div class="shelf-ie-text-shadow">').text(title));
			if (subtitleDiv) subtitleDiv.prepend(jQuery('<div class="shelf-ie-text-shadow">').text(subtitle));
			authorsDiv.prepend(jQuery('<div class="shelf-ie-text-shadow">').append(authorsDiv.children().clone()));
		}
		addBoxShadow(book);
		
		book.prepend(jQuery('<div class="shelf-image-bg">').css('background-image', 'url("' + options['background'] + '")'));
	}
	
	if (!imageUrl) {
		// Delay to wait for the container to be added to the DOM.
		SubstituteImage_queue(substitute);
	} else {
		var image = new Image();
		var ready = function() {
			image.onload = null;
			image.onerror = null;
			
			setTimeout(function() {
				var w = image.width;
				var h = image.height;
				if (w > 1 && h > 1) {
					// Loaded ok
					var book = jQuery(image);
					var containerWidth = container.width();
					var containerHeight = container.height();
					if (h > containerHeight) {
						w = Math.round(w * containerHeight / h);
						h = containerHeight;
					}
					if (w > containerWidth) {
						h = Math.round(h * containerWidth / w);
						w = containerWidth;
					}
					book.css({
						'width': w.toFixed() + 'px',
						'height': h.toFixed() + 'px',
						'position': 'relative', // Needed for IE8's shadow to have correct z order
						'top': (containerHeight - h).toFixed() + 'px'
					});
					
					container.append(book);
					addBoxShadow(book);
				} else {
					// No cover image
					SubstituteImage_queue(substitute);
				}
			}, 1);
		}
		image.onload = ready;
		image.onerror = ready;
		image.src = imageUrl;
	}
}

/////////////////////
// ArrayStream
////////////////////

/**

Makes a stream from an array of items.

Each item in the `array` is an object containing these attributes:
	- `image` The image URL
	- `link` (optional) <a> element href.
	- `target` (optional) <a> element target.  '_blank' will open the link in a new window.
	- `title` (optional) <img> element target.

@constructor
@implements Stream
@param {Array} array

*/
function ArrayStream(array, options) {
	options = options || {};
	
	this._array = array;
	this._options = {
		looping: !('looping' in options) || options['looping'],
		itemType: options['itemType'] || SimpleItem
	};
}


ArrayStream.prototype['loadSegment'] = function(id, context, onload) {
	var loop = this._options.looping ? id : undefined;
	onload({
		'id': id,
		'prev': loop,
		'next': loop,
		'length': this._array.length
	});
}


ArrayStream.prototype['createItem'] = function(segment, index, context) {
	return new this._options.itemType(this._array[index], context);
}

////////////////////
// JSONStream.js
////////////////////

/**
@constructor
*/
function JSONStream(baseUrl, options) {
	options = options || {};
	
	this._baseUrl = baseUrl;
	this._options = {
		itemType: options['itemType'] || SimpleItem
	};
}


JSONStream.prototype['loadSegment'] = function(id, context, onload) {
	jQuery.getJSON(this._baseUrl + id, function(data) {
		onload({
			'id': id,
			'prev': data['prev'],
			'next': data['next'],
			'length': data['items']['length'],
			_items: data['items']
		});
	});
}

				
JSONStream.prototype['createItem'] = function(segment, index, context) {
	return new this._options.itemType(segment._items[index], context);
}

///////////////
// exports.js
////////////////

var name = 'VirtualBookshelf';
var exports = window[name] || (window[name] = {});
exports['Bookshelf'] = Bookshelf;
exports['Carousel'] = Carousel;
exports['Train'] = Train;
exports['ArrayStream'] = ArrayStream;
exports['JSONStream'] = JSONStream;
exports['FadeTransition'] = FadeTransition;
exports['SimpleItem'] = SimpleItem;
exports['SubstituteImage'] = SubstituteImage;
