/**
 * @type {string} eventstart
 */
var eventstart
/**
 * @type {string} eventend
 */
var eventend
/**
 * @type {string} eventmove
 */
var eventmove
/**
 * @type {string} eventcancel
 */
var eventcancel

// Pointer events for IE11 and MSEdge:
if (window.navigator.pointerEnabled) {
  eventstart = 'pointerdown'
  eventend = 'pointerup'
  eventmove = 'pointermove'
  eventcancel = 'pointercancel'

  // Pointer events for IE10 and WP8:
} else if (window.navigator.msPointerEnabled) {
  eventstart = 'MSPointerDown'
  eventend = 'MSPointerUp'
  eventmove = 'MSPointerMove'
  eventcancel = 'MSPointerCancel'

  // Touch events for iOS & Android:
} else if ('ontouchstart' in window) {
  eventstart = 'touchstart'
  eventend = 'touchend'
  eventmove = 'touchmove'
  eventcancel = 'touchcancel'

  // Mouse events for desktop:
} else {
  eventstart = 'mousedown'
  eventend = 'mouseup'
  eventmove = 'mousemove'
  eventcancel = 'mouseout'
}
export { eventstart, eventend, eventmove, eventcancel }

/**
 * Fire a gesture on an element and pass it some optional data.
 * @param {Element} el
 * @param {string} event
 * @param {*} [data]
 * @param {Event} [originalEvent]
 */
export function trigger(el, event, data, originalEvent) {
  if (!event) {
    console.error('No event was provided. You do need to provide one.')
    return
  }
  if (typeof el === 'string') el = document.querySelector(el)
  if (document.createEvent) {
    var evtObj = document.createEvent('Events')
    evtObj.initEvent(event, true, false)
    evtObj['data'] = data
    evtObj['originalEvent'] = originalEvent
    el.dispatchEvent(evtObj)
  }
}

/**
 * Enable gestures in the browser.
 * @return {void} undefined
 */
export var gestures = function() {
  var touch = {}
  var touchTimeout
  var swipeTimeout
  var tapTimeout
  var longTapDelay = 750
  var singleTapDelay = 150
  var gestureLength = 20
  if (/android/gim.test(navigator.userAgent)) singleTapDelay = 200
  var longTapTimeout

  /**
   * @param {Node} node
   */
  function parentIfText(node) {
    return 'tagName' in node ? node : node.parentNode
  }

  /**
   * @param {number} x1
   * @param {number} x2
   * @param {number} y1
   * @param {number} y2
   */
  function swipeDirection(x1, x2, y1, y2) {
    return Math.abs(x1 - x2) >= Math.abs(y1 - y2)
      ? x1 - x2 > 0
        ? 'left'
        : 'right'
      : y1 - y2 > 0
      ? 'up'
      : 'down'
  }

  function longTap(event) {
    longTapTimeout = null
    if (touch.last) {
      try {
        if (touch && touch.el) {
          trigger(touch.el, 'longtap', null, event)
          touch = {}
        }
      } catch (err) {}
    }
  }

  function cancelLongTap() {
    if (longTapTimeout) clearTimeout(longTapTimeout)
    longTapTimeout = null
  }

  function cancelAll() {
    if (touchTimeout) clearTimeout(touchTimeout)
    if (tapTimeout) clearTimeout(tapTimeout)
    if (swipeTimeout) clearTimeout(swipeTimeout)
    if (longTapTimeout) clearTimeout(longTapTimeout)
    touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null
    touch = {}
  }

  /**
   * Execute this after DOM loads:
   */
  ;(function() {
    var now
    var delta
    var body = document.body

    /**
     * Capture start of event:
     */
    body.addEventListener(eventstart, function(e) {
      now = Date.now()
      delta = now - (touch.last || now)

      if (eventstart === 'mousedown') {
        touch.el = parentIfText(/** @type{Node} */ (e.target))
        if (e.target['nodeName'] === 'ripple') {
          touch.el = e.target['parentNode']
        }
        touchTimeout && clearTimeout(touchTimeout)
        touch.x1 = e['pageX']
        touch.y1 = e['pageY']

        /**
         * Detect one finger gesture:
         */
      } else {
        if (e['touches'].length === 1) {
          if (!!e.target['disabled']) return
          touch.el = parentIfText(e['touches'][0].target)
          touchTimeout && clearTimeout(touchTimeout)
          touch.x1 = e['touches'][0]['pageX']
          touch.y1 = e['touches'][0]['pageY']
        }
      }

      if (delta > 0 && delta <= 450) {
        touch.isDoubleTap = true
      }
      touch.last = now
      longTapTimeout = setTimeout(longTap, longTapDelay, e)
    })

    /**
     * Capture event move:
     */
    body.addEventListener(eventmove, function(e) {
      cancelLongTap()
      if (eventmove === 'mousemove') {
        touch.x2 = e['pageX']
        touch.y2 = e['pageY']
      } else {
        /**
         * One finger gesture:
         */
        if (e['touches'].length === 1) {
          touch.x2 = e['touches'][0]['pageX']
          touch.y2 = e['touches'][0]['pageY']
          touch.move = true
        } else if (e['touches'].length === 2) {
          // TODO: pinch - rotate gestures?
        }
      }
    })

    /**
     * Capture event end:
     */
    body.addEventListener(eventend, function(e) {
      cancelLongTap()
      if (!!touch.el) {
        /**
         * Swipe detection:
         */
        if (
          (touch.x2 && Math.abs(touch.x1 - touch.x2) > gestureLength) ||
          (touch.y2 && Math.abs(touch.y1 - touch.y2) > gestureLength)
        ) {
          swipeTimeout = setTimeout(function() {
            if (touch && touch.el) {
              var direction = swipeDirection(
                touch.x1,
                touch.x2,
                touch.y1,
                touch.y2
              )
              trigger(touch.el, 'swipe', direction, e)
              trigger(touch.el, 'swipe' + direction, null, e)
              touch = {}
            }
          }, 0)

          /**
           * Normal tap:
           */
        } else if ('last' in touch) {
          /**
           * Delay by one tick so we can cancel the 'tap' event if 'scroll' fires:
           */
          tapTimeout = setTimeout(function() {
            /**
             * Trigger double tap immediately:
             */
            if (touch && touch.isDoubleTap) {
              if (touch && touch.el) {
                trigger(touch.el, 'dbltap', null, e)
                e.preventDefault()
                touch = {}
              }
            } else {
              /**
               * Trigger tap after singleTapDelay:
               */
              touchTimeout = setTimeout(function() {
                touchTimeout = null
                if (touch && touch.el && !touch.move) {
                  trigger(touch.el, 'tap', null, e)
                  touch = {}
                } else {
                  /**
                   * Touch moved, so cancel tap:
                   */
                  cancelAll()
                }
              }, singleTapDelay)
            }
          }, 0)
        }
      } else {
        return
      }
    })
    body.addEventListener('touchcancel', cancelAll)
  })()
}

/**
 * Function to disable text selection. Use with make swipe events not select the element's text.
 * @param {Element} element
 * @param {string | boolean} [all]
 * @return {void} undefined
 */
export function disableTextSelection(element, all) {
  if (!element) return
  if (all && typeof element === 'string') {
    var elements = Array.prototype.slice.call(
      document.querySelectorAll(element)
    )
    elements.map(function(element) {
      element.classList.add('disable-user-select')
    })
  } else {
    if (typeof element === 'string') {
      element = document.querySelector(element)
      element.classList.add('disable-user-select')
    }
  }
  var stylesheet = document.head.querySelector('.disable-user-select')
  if (!stylesheet) {
    stylesheet = document.createElement('style')
    stylesheet.className = 'disable-user-select'
    stylesheet.innerHTML =
      '.disable-user-select, .disable-user-select * { user-select: none; -webkit-user-select: none; -ms-user-select: none; }'
    document.head.appendChild(stylesheet)
  }
}

/**
 * Function to remove a style set to disable text selection. This will re-enable text selection.
 * @param {Element} element
 * @param {string | boolean} all
 * @return {void} undefined
 */
export function enableTextSelection(element, all) {
  if (all && typeof element === 'string') {
    var elements = Array.prototype.slice.call(
      document.querySelectorAll(element)
    )
    elements.map(function(element) {
      element.classList.remove('disable-user-select')
    })
  } else {
    if (typeof element === 'string') element = document.querySelector(element)
    if (!element) return
    element.classList.remove('disable-user-select')
  }
}
