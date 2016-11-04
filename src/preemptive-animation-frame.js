/* @flow */

import * as RAF from "request-polyfilled-animation-frame"

type Time = number
type State = 0 | 1 | 2

// Invariants:
// 1. In the NO_REQUEST state, there is never a scheduled animation frame.
// 2. In the PENDING_REQUEST and EXTRA_REQUEST states, there is always exactly
// one scheduled animation frame.
const NO_REQUEST = 0
const PENDING_REQUEST = 1
const EXTRA_REQUEST = 2

let requestID:?number = null
let nextID:number = 0
let state:State = NO_REQUEST
let requests:Array<(time:Time) => any> = []
let ids:Array<number> = []

const absent = new Error('absent')

export const now = RAF.now

export const requestAnimationFrame = <a>
  (request:(time:Time) => a) => {
    if (state === NO_REQUEST) {
      requestID = RAF.requestAnimationFrame(performAnimationFrame)
    }

    const id = ++nextID
    requests.push(request)
    ids.push(id)
    state = PENDING_REQUEST
    return id
  }

export const cancelAnimationFrame =
  (id:number):void => {
    const index = ids.indexOf(id)
    if (index >= 0) {
      ids.splice(index, 1)
      requests.splice(index, 1)
    }
  }

export const forceAnimationFrame =
  (time:Time=now()) => {
    switch (state) {
      case NO_REQUEST:
        break
      default:
        if (requestID != null) {
          RAF.cancelAnimationFrame(requestID)
          requestID = null
        }
        performAnimationFrame(time)
    }
  }

const performAnimationFrame =
  (time:Time) => {
    switch (state) {
      case NO_REQUEST:
        // This state should not be possible. How can there be no
        // request, yet somehow we are actively fulfilling a
        // request?
        throw Error('Unexpected frame request')
      case PENDING_REQUEST:
        // At this point, we do not *know* that another frame is
        // needed, but we make an extra frame request just in
        // case. It's possible to drop a frame if frame is requested
        // too late, so we just do it preemptively.
        requestID = RAF.requestAnimationFrame(performAnimationFrame)
        state = EXTRA_REQUEST
        ids.splice(0)
        dispatchAnimationFrame(requests.splice(0), 0, time)
        break
      case EXTRA_REQUEST:
        // Turns out the extra request was not needed, so we will
        // stop requesting. No reason to call it all the time if
        // no one needs it.
        state = NO_REQUEST
        break
    }
  }

const dispatchAnimationFrame = <a>
  (requests:Array<(time:Time) => a>
  , index:number
  , time:Time
  ) => {
    let exception = absent
    const count = requests.length
    try {
      while (index < count) {
        const request = requests[index]
        index = index + 1
        request(time)
      }
    } catch (error) {
      exception = error
    }

    if (index < count) {
      dispatchAnimationFrame(requests, index, time)
    }

    if (exception !== absent) {
      throw exception
    }
  }
