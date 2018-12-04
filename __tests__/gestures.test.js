// @ts-ignore
import { h, render, run, union } from 'https://unpkg.com/@composi/core/dist/composi-core.mjs?module'
// @ts-ignore
import htm from 'https://unpkg.com/htm/dist/htm.mjs?module'
// @ts-ignore
import { mergeObjects } from 'https://unpkg.com/@composi/merge-objects/src/index.js?module'
// @ts-ignore
import { eventstart, eventend, eventmove, eventcancel, trigger, gestures, disableTextSelection, enableTextSelection } from '../src/gestures.js?module'

const html = htm.bind(h)
gestures()

const Msg = union(['SwipeLeft', 'SwipeRight', 'SwipeUp', 'SwipeDown', 'Tap', 'DblTap', 'LongTap'])


function actions(state, msg) {
  return Msg.match(msg, {
    'SwipeLeft': () => {
      state.response = 'Swipe LEFT completed!'
      return [state]
    }, 
    'SwipeRight': () => {
      state.response = 'You just swiped RIGHT!'
      return [state]
    }, 
    'SwipeUp': () => {
      state.response = 'Woohoo! Swiping UP!'
      return [state]
    }, 
    'SwipeDown': () => {
      state.response = 'We\'re going DOWN!'
      return [state]
    }, 
    'Tap': () => {
      state.response = 'That was a Tap!'
      return [state]
    }, 
    'DblTap': () => {
      state.response = 'That was a Double Tap!'
      return [state]
    }, 
    'LongTap': () => {
      state.response = 'This is a Looooong Tap!'
      return [state]
    }
  })
}

function List({state, send}) {
  return html`<ul class='list editing' 
    onswipeleft=${() => send(Msg.SwipeLeft())} 
    onswiperight=${() => send(Msg.SwipeRight())} 
    onswipeup=${() => send(Msg.SwipeUp())} 
    onswipedown=${() => send(Msg.SwipeDown())} 
    ontap=${() => send(Msg.Tap())} 
    ondbltap=${() => send(Msg.DblTap())}
    onlongtap=${() => send(Msg.LongTap())}
    >
  <li>
    <div>
      <h3>Gesture:</h3>
      <h2 class='attentionGrabber' id='gestureResponse'>${state.response}</h2>
      <br>
      <br>
      <br>
    </div>
  </li>
</ul>`
}

const state = {
  response: ''
}
const program = {
  init() {
    return [state]
  },
  view(state, send) {
    render(html`<${List} ...${{ state, send }} />`, 'section')
  },
  update(state, msg) {
    disableTextSelection('li')
    return actions(state, msg)
  }
}

run(program)

