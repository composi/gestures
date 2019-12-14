/**
 * Fire a gesture on an element and pass it some optional data.
 * @param {Element} el
 * @param {string} event
 * @param {*} [data]
 * @param {Event} [originalEvent]
 */
export function trigger(el: Element, event: string, data?: any, originalEvent?: Event): void;
/**
 * Function to disable text selection. Use with make swipe events not select the element's text.
 * @param {Element} element
 * @param {string | boolean} [all]
 * @return {void} undefined
 */
export function disableTextSelection(element: Element, all?: string | boolean): void;
/**
 * Function to remove a style set to disable text selection. This will re-enable text selection.
 * @param {Element} element
 * @param {string | boolean} all
 * @return {void} undefined
 */
export function enableTextSelection(element: Element, all: string | boolean): void;
export function gestures(): void;
/**
 * @type {string} eventstart
 */
export var eventstart: string;
/**
 * @type {string} eventend
 */
export var eventend: string;
/**
 * @type {string} eventmove
 */
export var eventmove: string;
/**
 * @type {string} eventcancel
 */
export var eventcancel: string;
