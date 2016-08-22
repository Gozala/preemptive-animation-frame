# preemptive-animation-frame
[![travis][travis-image]][travis-url]
[![npm][npm-image]][npm-url]
[![downloads][downloads-image]][downloads-url]
[![js-standard-style][standard-image]][standard-url]

Library provides same API as [window.requestAnimationFrame][] but in contrast it is preemptive. It is possible to drop a frame if [window.requestAnimationFrame][] is called *(after you've done handling of the current frame)* too late. This library helps you avoid such frames drops by wrapping native API and scheduling request ahead of time.

It is especially useful when working with high level abstractions that require you to schedule requests at the end update step.

## Install

```bash
npm install preemptive-animation-frame
```

## API

```js
const PAF = require('preemptive-animation-frame')

// schedule
const requestID = PAF.requestAnimationFrame(time => {
  // repaint
})

// cancel
PAF.cancelAnimationFrame(requestID)
```

[window.requestAnimationFrame]:https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
[travis-image]: https://travis-ci.org/Gozala/preemptive-animation-frame.svg?branch=master
[travis-url]: https://travis-ci.org/Gozala/preemptive-animation-frame
[npm-image]: https://img.shields.io/npm/v/preemptive-animation-frame.svg
[npm-url]: https://npmjs.org/package/preemptive-animation-frame
[downloads-image]: https://img.shields.io/npm/dm/preemptive-animation-frame.svg
[downloads-url]: https://npmjs.org/package/preemptive-animation-frame
[standard-image]:https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]:http://standardjs.com/
