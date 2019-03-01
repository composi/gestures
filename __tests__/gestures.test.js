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
    'SwipeLeft': (e) => {
      state.response = 'Swipe LEFT completed!'
      console.log(`originalEvent`, e);
      return [state]
    },
    'SwipeRight': (e) => {
      state.response = 'You just swiped RIGHT!'
      console.log(`originalEvent`, e);
      return [state]
    },
    'SwipeUp': (e) => {
      state.response = 'Woohoo! Swiping UP!'
      console.log(`originalEvent`, e);
      return [state]
    },
    'SwipeDown': (e) => {
      state.response = 'We\'re going DOWN!'
      console.log(`originalEvent`, e);
      return [state]
    },
    'Tap': (e) => {
      state.response = 'That was a Tap!'
      console.log(`originalEvent`, e);
      return [state]
    },
    'DblTap': (e) => {
      state.response = 'That was a Double Tap!'
      console.log(`originalEvent`, e);
      return [state]
    },
    'LongTap': (e) => {
      state.response = 'This is a Looooong Tap!'
      console.log(`originalEvent`, e);
      return [state]
    }
  })
}

function List({state, send}) {
  return html`<ul class='list editing'
    onswipeleft=${(e) => send(Msg.SwipeLeft(e))}
    onswiperight=${(e) => send(Msg.SwipeRight(e))}
    onswipeup=${(e) => send(Msg.SwipeUp(e))}
    onswipedown=${(e) => send(Msg.SwipeDown(e))}
    ontap=${(e) => send(Msg.Tap(e))}
    ondbltap=${(e) => send(Msg.DblTap(e))}
    onlongtap=${(e) => send(Msg.LongTap(e))}
    >
  <li>
    <div>
      <h3>Gesture:</h3>
      <h2 class='attentionGrabber' id='gestureResponse'>${state.response}</h2>
      <br/>
      <br/>
      <br/>
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
