# @composi/gestures

Cross-platform gesture library for desktop and mobile. Gzipped, @composi/gestures is only 1KB. It's smaller than most images you will use in your app.

## Installation

To install @composi/gestures, use NPM:

```
npm i -D @composi/gestures
```

After that you can import it into your project. Do so on the document that will be the main part loading in the browser. @composi/gestures needs to run after the DOM is loaded.

```javascript
import { gestures } from '@composi/gestures'
// Initialize the gestures:
gestures()
// App code here...
```

If you fail to execute `gestures()` after importing, the gestures will never get set up and will be unavailable to your code.

## Event Aliases

@composi/gestures provides normalised events and custom gestures for desktop and mobile. To facility easier cross-platform event handle, @composi/gestures provides the following four event aliases:

1. eventstart
2. eventend
3. eventmove
4. eventcancel

On desktop these resolve to `mousedown`, `mouseup` (click), `mousemove` and `mouseout`. On a device with support for pointer events, these become: `pointerdown`, `pointerup`, `pointermove` and `pointercancel`. On a device that supports touch events these become: `touchstart`, `touchend`, `touchmove` and `touchcancel`. You can use these event aliases just like you would any other events, with the assurance that they will work the same everywhere:

```javascript
import { eventstart, eventend, eventmove, eventcancel } from '@composi/gestures'

document.querySelector('button').addEventListener(eventend, (e) => {
  e.target.classList.toggle('selected')
})
```

## @composi/gestures

On mobile devices users expect to be able to tap and swipe. @composi/gestures provides taps and swipes that work on both mobile and desktop, ensuring an consitent user experience across platforms. With @composi/gestures you don't have to have separate events for desktop and mobile. 

@composi/gestures provides the following gestures:

1. tap
2. longtap
3. dbltap
4. swipe
5. swipeleft
6. swiperight
7. swipeup
8. swipedown

## Using @composi/gestures

There are two ways you can use gestures, as inline events or as event listeners.

### Inline Events

Depending on the library/framework you are using, you can use "on" gestures camel cased or lowercase:

```javascript
import { gestures } from '@composi/gestures'
// Initialize the gestures:
gestures()

// Define event callbacks:
function announceTap() {
  alert('You just tapped!')
}

function announceSwipe() {
  alert('You just swiped!')
}

// Define inline events:
function TappableButton(props) {
  return (
    <button onTap={() => announceTap()}>Tap</button>
  )
},

function SwipableButton(props) {
  return (
    <button onSwipe={() => announceSwipe()}>Swipe</button>
  )
}
```

### Event Listeners

You can also use gestures with event listeners:

```javascript
import { gestures } from '@composi/gestures'
// Initialize the gestures:
gestures()

const tappableBtn = document.querySelector('#tappableBtn')
tappableBtn.addEventListener('tap', function() {
  alert('You just tapped the button!')
})
```

### About Swipe

`swipe` is a more generic gesture than `swipeleft`, etc. However, if you use it, you can examine the event data to see which direction the swipe was:

```javascript
import { gestures } from '@composi/gestures'
// Initialize the gestures:
gestures()

function SwipeTest() {
  function announceSwipe(e) {
    // The swipe direction gets passed with the event
    // as the value of the property `data`:
    alert(`The swipe direction was: ${e.data}.`)
  }
  return (
    <div onswipe={e => announceSwipe(e)}>Swipe on me!</div>
  )
}
```

By capturing and checking the event data, you can have a single swipe event handle different directions. You might do that with a toggle switch. Attach a swipe gesture to it, and when the event data is `left`, turn it on, else turn it off. 

### Swipes and Text Selection

If you register a swipe on an element and it or its children have any text, when the user tried to swipe it will result in a text selection. You can avoid this glitch by using @composi/gestures's `disableTextSelection` function. You import it in and the pass it the element to disable text selection on. Below we show how to do this with React. We disable text selection on the button when the `componentDidMount` lifecycle hook executes:

```javascript
import { React } from 'react'
import { gestures, disableTextSelection } from '@composi/gestures'
// Initialize gestures:
gestures()

class Button extends React.Component {
  constructor(props) {
    super(props)
    this.button  = React.createRef();
  }
  render() {
    return (
      <button ref={this.button} onSwipe={e => this.handleSwipe(e)}>Swipe Me!</button>
    )
  }
  handleSwipe(e) {
    // Handle the swipe here...
  }
  componentDidMount() {
    // Disable text selection on the button:
    disableTextSelection(this.button.current)
  }
}
```

If you wish to disable text selection on may element, say all button tags or all elements of a class, you can use the selector followed by a second truthy value:

```javascript
disableTextSelection('button', true)
// or (any string is truthy)
disableTextSelection('.swipable', 'all')
```
#### Re-enabling Text Selection

If you want to later re-enable text selection on an element that you disabled, you can import and use the `enableTextSelection` function. Import it and pass it the element to enable:

```javascript
enableTextSelection('#user-list')
```

To re-enable many elements of the same type, you use it the same as `disableTextSelection` by passing in a tag selector or class, followed by a second truth value:

```javascript
enableTextSelection('button', true)
// or (any string is truthy)
enableTextSelection('.swipable', 'yes')
```

## Supported Libraries

@composi/gestures should work with any library or framework that does not convert inline events into synthetic events. Be aware that some libaries expect inline events to be camel cased. @composi/gestures has been tested with [Preact](https://preactjs.com), [Hyperapp](https://github.com/hyperapp/hyperapp), [Superfine](https://github.com/jorgebucaran/superfine), [VueJS](https://vuejs.org), [Composi](https://composor.github.io), [HyperHTML](https://viperhtml.js.org), [lit-html](https://polymer.github.io/lit-html/), [Svelte](https://svelte.technology)

### Preact 

```javascript
class List extends Component {
  render() {
    return (
      <p>
        <button onTap={() => this.announce()}>Tap Here...</button>
      </p>
    )
  }
  announce(e) {
    alert('You just tapped the button!')
  }
}
```

### Hyperapp

```javascript
const actions = {
  announceTap: () => alert('You just tapped the button!')
}

const view = (state, actions) => (
  <p>
    <button ontap={() => actions.announceTap()} >
      Tap Here...
    </button>
  </p>
)

app(null, actions, view, document.body)
```

### VueJS
Vue expects its special syntax for inline events. Even so, you can use @composi/gestures with Vue:

HTML:
```html
<div id='app'>
  <p><button v-on:swipe="announceSwipe">Swipe</button></p>
</div>
```
JavaScript:
```javascript
new Vue({
  el: '#app',
  methods: {
    announceSwipe: function(e) {
      alert(`You swiped in this direction: ${e.data}`)
    }
  }
})
```

### Svelte
```html
<button on:tap='set({ showModal: true })'>
  show modal
</button>
```

### HyperHTML
```javascript
let renderGesture = (name) => hyper()`<p>
  <button ontap=${handleClick}>
    Click me
  </button>
</p>`;

function handleClick(e) {
  e.preventDefault();
  alert('You just tapped the button.');
}

hyper(document.body)`${renderGesture()}`;
```

### lit-html

```javascript
function announceTap() {
  alert('You just tapped the button!')
}

render(html`
  <p>
    <button on-tap=${announceTap}>Tap Here...</button>
  </p>
`, document.body);
```

### Superfine 

```javascript
function GestureTest() {
  function announceDblTap() {
    alert('You just double tapped the button!')
  }
  return (
    <p>
      <button ondbltap={() => actions.announceDblTap()} >
        Tap Here...
      </button>
    </p>
  )
}
```

### @composi/core
```javascript
function List() {

  announceLongTap(e) {
    alert('You just long tapped the button!')
  }
  return (
    <p>
      <button onlongtap={() => announceLongTap()}>Tap Here...</button>
    </p>
  )
}
```

### Inferno & React

Because Inferno and React use synthetic events, you can't use @composi/gestures for inline events. However, you can use @composi/gestures with event listeners for them. You'd need to use a `ref` for the element where you want to listen for the gesture. Below is an example with Inferno. Notice how we use `ref` to get a reference to the button and then use `componentDidMount` to attach an event listener for the gesture (tap).

```javascript
class GestureTest extends Component {
  render() {
    return (
      <p>
        <button ref={element => this.tapBtn = element}>Tap</button>
      </p>
    );
  }
  componentDidMount(el) {
    this.tapBtn.addEventListener('tap', this.announce)
  } 
  announce() {
    alert('You just tapped!')
  }
}
```

And here's a gesture for React:

```javascript
import { React } from 'react'
import { ReactDOM } from 'react-dom'
import { gestures } from '@composi/gestures'

// Initialize gestures:
gestures()


class Button extends React.Component {
  constructor(props) {
    super(props)
    this.button  = React.createRef();
  }
  render() {
    return (
      <div>
        <p>
          <button ref={this.button}>Tap here...</button>
        </p>
      </div>
    )
  }
  componentDidMount() {
    // Use ref defined on button to attach event listener for tag gesture:
    this.button.current.addEventListener('tap', () => this.announce())
  }
  announce() {
    alert('You just tapped!')
  }
}

ReactDOM.render(
  <div>
    <Button/>
  </div>, 
  document.body
)
```
