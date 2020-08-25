!function(n){var e={};function t(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return n[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=n,t.c=e,t.d=function(n,e,r){t.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:r})},t.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},t.t=function(n,e){if(1&e&&(n=t(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var o in n)t.d(r,o,function(e){return n[e]}.bind(null,o));return r},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},t.p="",t(t.s="./src/main.js")}({"./lib/createElement.js":
/*!******************************!*\
  !*** ./lib/createElement.js ***!
  \******************************/
/*! exports provided: createElement, Text, Wrapper */function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Text", function() { return Text; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Wrapper", function() { return Wrapper; });\n/* harmony import */ var _gesture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gesture */ "./lib/gesture.js");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n\nfunction createElement(Cls, attributes) {\n  var o;\n\n  if (typeof Cls === "string") {\n    o = new Wrapper(Cls);\n  } else {\n    o = new Cls({\n      timer: {}\n    });\n  }\n\n  for (var name in attributes) {\n    // o[name] = attributes[name]\n    o.setAttribute(name, attributes[name]);\n  }\n\n  var visit = function visit(children) {\n    var _iterator = _createForOfIteratorHelper(children),\n        _step;\n\n    try {\n      for (_iterator.s(); !(_step = _iterator.n()).done;) {\n        var child = _step.value;\n\n        if (_typeof(child) === "object" && child instanceof Array) {\n          visit(child);\n          continue;\n        }\n\n        if (typeof child === "string") {\n          child = new Text(child);\n        }\n\n        o.appendChild(child);\n      }\n    } catch (err) {\n      _iterator.e(err);\n    } finally {\n      _iterator.f();\n    }\n  };\n\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  visit(children); // console.log(\'o\', o)\n\n  return o;\n}\nvar Text = /*#__PURE__*/function () {\n  function Text(text) {\n    _classCallCheck(this, Text);\n\n    this.children = [];\n    this.root = document.createTextNode(text); // console.log(config);\n  }\n\n  _createClass(Text, [{\n    key: "mountTo",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n    }\n  }, {\n    key: "getAttribute",\n    value: function getAttribute(name) {\n      return;\n    }\n  }]);\n\n  return Text;\n}();\nvar Wrapper = /*#__PURE__*/function () {\n  function Wrapper(type) {\n    _classCallCheck(this, Wrapper);\n\n    this.children = [];\n    this.root = document.createElement(type);\n  }\n\n  _createClass(Wrapper, [{\n    key: "setAttribute",\n    value: function setAttribute(name, value) {\n      // console.log(name, value)\n      // this[name] = value;\n      this.root.setAttribute(name, value);\n\n      if (name.match(/^on([\\s\\S]+)$/)) {\n        var eventName = RegExp.$1.replace(/^[\\s\\S]/, function (c) {\n          return c.toLowerCase();\n        });\n        this.addEventListener(eventName, value);\n      }\n\n      if (name === "enableGesture") {\n        Object(_gesture__WEBPACK_IMPORTED_MODULE_0__["enableGesture"])(this.root);\n      }\n    }\n  }, {\n    key: "addEventListener",\n    value: function addEventListener(type, handler, config) {\n      var _this$root;\n\n      (_this$root = this.root).addEventListener.apply(_this$root, arguments);\n    }\n  }, {\n    key: "mountTo",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n\n      var _iterator2 = _createForOfIteratorHelper(this.children),\n          _step2;\n\n      try {\n        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n          var child = _step2.value;\n          child.mountTo(this.root);\n        }\n      } catch (err) {\n        _iterator2.e(err);\n      } finally {\n        _iterator2.f();\n      }\n    }\n  }, {\n    key: "appendChild",\n    value: function appendChild(child) {\n      this.children.push(child);\n    }\n  }, {\n    key: "getAttribute",\n    value: function getAttribute(name) {\n      return this.root.getAttribute(name);\n    }\n  }, {\n    key: "style",\n    get: function get() {\n      return this.root.style;\n    }\n  }, {\n    key: "classList",\n    get: function get() {\n      return this.root.classList;\n    }\n  }, {\n    key: "innerText",\n    set: function set(text) {\n      return this.root.innerText = text;\n    }\n  }]);\n\n  return Wrapper;\n}();\n\n//# sourceURL=webpack:///./lib/createElement.js?')},"./lib/gesture.js":
/*!************************!*\
  !*** ./lib/gesture.js ***!
  \************************/
/*! exports provided: enableGesture */function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enableGesture", function() { return enableGesture; });\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n// let element = document.body;\nfunction enableGesture(element) {\n  var context = Object.create(null);\n  var MOUSE_SYMBOL = Symbol("mouse");\n\n  if (document.ontouchstart !== null) {\n    element.addEventListener("mousedown", function (event) {\n      context[MOUSE_SYMBOL] = Object.create(null);\n      start(event, context[MOUSE_SYMBOL]);\n\n      var mousemove = function mousemove(event) {\n        move(event, context[MOUSE_SYMBOL]);\n      };\n\n      var mouseend = function mouseend(event) {\n        end(event, context[MOUSE_SYMBOL]);\n        document.removeEventListener("mousemove", mousemove);\n        document.removeEventListener("mouseup", mouseend);\n      };\n\n      document.addEventListener("mousemove", mousemove);\n      document.addEventListener("mouseup", mouseend);\n    });\n  }\n\n  element.addEventListener("touchstart", function (event) {\n    // console.log(event.changedTouches[0]);\n    // console.log(\'start\');\n    var _iterator = _createForOfIteratorHelper(event.changedTouches),\n        _step;\n\n    try {\n      for (_iterator.s(); !(_step = _iterator.n()).done;) {\n        var touch = _step.value;\n        context[touch.identifier] = Object.create(null);\n        start(touch, context[touch.identifier]);\n      }\n    } catch (err) {\n      _iterator.e(err);\n    } finally {\n      _iterator.f();\n    }\n  });\n  element.addEventListener("touchmove", function (event) {\n    // console.log(event.changedTouches[0]);\n    var _iterator2 = _createForOfIteratorHelper(event.changedTouches),\n        _step2;\n\n    try {\n      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n        var touch = _step2.value;\n        move(touch, context[touch.identifier]);\n      }\n    } catch (err) {\n      _iterator2.e(err);\n    } finally {\n      _iterator2.f();\n    }\n  }); //touchend和touchcancel 只触发其中一个\n\n  element.addEventListener("touchend", function (event) {\n    var _iterator3 = _createForOfIteratorHelper(event.changedTouches),\n        _step3;\n\n    try {\n      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {\n        var touch = _step3.value;\n        end(touch, context[touch.identifier]);\n        delete context[touch.identifier];\n      }\n    } catch (err) {\n      _iterator3.e(err);\n    } finally {\n      _iterator3.f();\n    }\n  });\n  element.addEventListener("touchcancel", function (event) {\n    var _iterator4 = _createForOfIteratorHelper(event.changedTouches),\n        _step4;\n\n    try {\n      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {\n        var touch = _step4.value;\n        cancel(touch, context[touch.identifier]);\n        delete context[touch.identifier];\n      }\n    } catch (err) {\n      _iterator4.e(err);\n    } finally {\n      _iterator4.f();\n    }\n  });\n\n  var start = function start(point, context) {\n    element.dispatchEvent(Object.assign(new CustomEvent(\'start\', {\n      startX: context.clientX,\n      startY: context.clientY,\n      clientX: point.clientX,\n      clientY: point.clientY\n    })));\n    context.startX = point.clientX, context.startY = point.clientY;\n    context.moves = []; //离开前的速度\n\n    context.isTap = true;\n    context.isPan = false;\n    context.isPress = false;\n    context.timeoutHandler = setTimeout(function () {\n      if (context.isPan) {\n        return;\n      }\n\n      context.isTap = false;\n      context.isPan = false;\n      context.isPress = true;\n      element.dispatchEvent(new CustomEvent(\'pressstart\', {}));\n    }, 500);\n  };\n\n  var move = function move(point, context) {\n    var dx = point.clientX - context.startX,\n        dy = point.clientY - context.startY;\n\n    if (Math.pow(dx, 2) + Math.pow(dy, 2) > 100 && !context.isPan) {\n      if (context.isPress) {\n        element.dispatchEvent(new CustomEvent(\'presscancel\', {}));\n        console.log("press cancel");\n      }\n\n      context.isTap = false;\n      context.isPan = true;\n      context.isPress = false;\n      element.dispatchEvent(Object.assign(new CustomEvent(\'panstart\'), {\n        startX: context.startX,\n        startY: context.startY,\n        clientX: point.clientX,\n        clientY: point.clientY\n      }));\n    }\n\n    if (context.isPan) {\n      context.moves.push({\n        dx: dx,\n        dy: dy,\n        t: Date.now()\n      });\n      context.moves = context.moves.filter(function (record) {\n        return Date.now() - record.t < 300;\n      });\n      element.dispatchEvent(Object.assign(new CustomEvent("pan"), {\n        startX: context.startX,\n        startY: context.startY,\n        clientX: point.clientX,\n        clientY: point.clientY\n      })); // console.log("move", dx, dy)\n    }\n  };\n\n  var end = function end(point, context) {\n    if (context.isPan) {\n      var dx = point.clientX - context.startX,\n          dy = point.clientY - context.startY;\n      var record = context.moves[0];\n      var speed = Math.sqrt(Math.pow(record.dx - dx, 2) + Math.pow(record.dy - dy, 2)) / (Date.now() - record.t);\n      console.log(speed);\n      var isFlick = speed > 0.6;\n\n      if (isFlick) {\n        console.log("flick");\n        element.dispatchEvent(Object.assign(new CustomEvent(\'flick\'), {\n          startX: context.startX,\n          startY: context.startY,\n          clientX: point.clientX,\n          clientY: point.clientY,\n          speed: speed\n        }));\n      }\n\n      element.dispatchEvent(Object.assign(new CustomEvent(\'panend\'), {\n        startX: context.startX,\n        startY: context.startY,\n        clientX: point.clientX,\n        clientY: point.clientY,\n        speed: speed,\n        isFlick: isFlick\n      }));\n    }\n\n    if (context.isTap) {\n      element.dispatchEvent(new CustomEvent(\'tap\', {}));\n      console.log(\'tap end\');\n    }\n\n    if (context.isPress) {\n      console.log(\'press end\');\n      element.dispatchEvent(new CustomEvent(\'pressend\', {}));\n    }\n\n    clearTimeout(context.timeoutHandler);\n  };\n\n  var cancel = function cancel(point, context) {\n    console.log(\'canceled\');\n    element.dispatchEvent(new CustomEvent(\'canceled\', {}));\n    clearTimeout(context.timeoutHandler);\n  };\n}\n\n//# sourceURL=webpack:///./lib/gesture.js?')},"./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_createElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/createElement */ "./lib/createElement.js");\nfunction cov_1683vdokeq() {\n  var path = "/Users/linhao/Documents/toolchain/tt-example/src/main.js";\n  var hash = "b8616e0cc8f44d3553f73a55818b4758afc2683d";\n  var global = new Function("return this")();\n  var gcv = "__coverage__";\n  var coverageData = {\n    path: "/Users/linhao/Documents/toolchain/tt-example/src/main.js",\n    statementMap: {\n      "0": {\n        start: {\n          line: 3,\n          column: 16\n        },\n        end: {\n          line: 3,\n          column: 38\n        }\n      },\n      "1": {\n        start: {\n          line: 5,\n          column: 0\n        },\n        end: {\n          line: 5,\n          column: 32\n        }\n      }\n    },\n    fnMap: {},\n    branchMap: {},\n    s: {\n      "0": 0,\n      "1": 0\n    },\n    f: {},\n    b: {},\n    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",\n    hash: "b8616e0cc8f44d3553f73a55818b4758afc2683d"\n  };\n  var coverage = global[gcv] || (global[gcv] = {});\n\n  if (!coverage[path] || coverage[path].hash !== hash) {\n    coverage[path] = coverageData;\n  }\n\n  var actualCoverage = coverage[path];\n  {\n    // @ts-ignore\n    cov_1683vdokeq = function () {\n      return actualCoverage;\n    };\n  }\n  return actualCoverage;\n}\n\ncov_1683vdokeq();\n\nvar component = (cov_1683vdokeq().s[0]++, Object(_lib_createElement__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", null, "hello world"));\ncov_1683vdokeq().s[1]++;\ncomponent.mountTo(document.body);\n\n//# sourceURL=webpack:///./src/main.js?')}});