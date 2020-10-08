function _typeof2(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

/*
 Copyright (C) Federico Zivolo 2017
 Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */
(function (e, t) {
  'object' == (typeof exports === "undefined" ? "undefined" : _typeof2(exports)) && 'undefined' != typeof module ? module.exports = t() : 'function' == typeof define && define.amd ? define(t) : e.Popper = t();
})(this, function () {
  'use strict';

  function e(e) {
    return e && '[object Function]' === {}.toString.call(e);
  }

  function t(e, t) {
    if (1 !== e.nodeType) return [];
    var o = window.getComputedStyle(e, null);
    return t ? o[t] : o;
  }

  function o(e) {
    return 'HTML' === e.nodeName ? e : e.parentNode || e.host;
  }

  function n(e) {
    if (!e || -1 !== ['HTML', 'BODY', '#document'].indexOf(e.nodeName)) return window.document.body;
    var i = t(e),
        r = i.overflow,
        p = i.overflowX,
        s = i.overflowY;
    return /(auto|scroll)/.test(r + s + p) ? e : n(o(e));
  }

  function r(e) {
    var o = e && e.offsetParent,
        i = o && o.nodeName;
    return i && 'BODY' !== i && 'HTML' !== i ? -1 !== ['TD', 'TABLE'].indexOf(o.nodeName) && 'static' === t(o, 'position') ? r(o) : o : window.document.documentElement;
  }

  function p(e) {
    var t = e.nodeName;
    return 'BODY' !== t && ('HTML' === t || r(e.firstElementChild) === e);
  }

  function s(e) {
    return null === e.parentNode ? e : s(e.parentNode);
  }

  function d(e, t) {
    if (!e || !e.nodeType || !t || !t.nodeType) return window.document.documentElement;
    var o = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
        i = o ? e : t,
        n = o ? t : e,
        a = document.createRange();
    a.setStart(i, 0), a.setEnd(n, 0);
    var f = a.commonAncestorContainer;
    if (e !== f && t !== f || i.contains(n)) return p(f) ? f : r(f);
    var l = s(e);
    return l.host ? d(l.host, t) : d(e, s(t).host);
  }

  function a(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 'top',
        o = 'top' === t ? 'scrollTop' : 'scrollLeft',
        i = e.nodeName;

    if ('BODY' === i || 'HTML' === i) {
      var n = window.document.documentElement,
          r = window.document.scrollingElement || n;
      return r[o];
    }

    return e[o];
  }

  function f(e, t) {
    var o = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
        i = a(t, 'top'),
        n = a(t, 'left'),
        r = o ? -1 : 1;
    return e.top += i * r, e.bottom += i * r, e.left += n * r, e.right += n * r, e;
  }

  function l(e, t) {
    var o = 'x' === t ? 'Left' : 'Top',
        i = 'Left' == o ? 'Right' : 'Bottom';
    return +e['border' + o + 'Width'].split('px')[0] + +e['border' + i + 'Width'].split('px')[0];
  }

  function m(e, t, o, i) {
    return _(t['offset' + e], o['client' + e], o['offset' + e], ie() ? o['offset' + e] + i['margin' + ('Height' === e ? 'Top' : 'Left')] + i['margin' + ('Height' === e ? 'Bottom' : 'Right')] : 0);
  }

  function h() {
    var e = window.document.body,
        t = window.document.documentElement,
        o = ie() && window.getComputedStyle(t);
    return {
      height: m('Height', e, t, o),
      width: m('Width', e, t, o)
    };
  }

  function c(e) {
    return se({}, e, {
      right: e.left + e.width,
      bottom: e.top + e.height
    });
  }

  function g(e) {
    var o = {};
    if (ie()) try {
      o = e.getBoundingClientRect();
      var i = a(e, 'top'),
          n = a(e, 'left');
      o.top += i, o.left += n, o.bottom += i, o.right += n;
    } catch (e) {} else o = e.getBoundingClientRect();
    var r = {
      left: o.left,
      top: o.top,
      width: o.right - o.left,
      height: o.bottom - o.top
    },
        p = 'HTML' === e.nodeName ? h() : {},
        s = p.width || e.clientWidth || r.right - r.left,
        d = p.height || e.clientHeight || r.bottom - r.top,
        f = e.offsetWidth - s,
        m = e.offsetHeight - d;

    if (f || m) {
      var g = t(e);
      f -= l(g, 'x'), m -= l(g, 'y'), r.width -= f, r.height -= m;
    }

    return c(r);
  }

  function u(e, o) {
    var i = ie(),
        r = 'HTML' === o.nodeName,
        p = g(e),
        s = g(o),
        d = n(e),
        a = t(o),
        l = +a.borderTopWidth.split('px')[0],
        m = +a.borderLeftWidth.split('px')[0],
        h = c({
      top: p.top - s.top - l,
      left: p.left - s.left - m,
      width: p.width,
      height: p.height
    });

    if (h.marginTop = 0, h.marginLeft = 0, !i && r) {
      var u = +a.marginTop.split('px')[0],
          b = +a.marginLeft.split('px')[0];
      h.top -= l - u, h.bottom -= l - u, h.left -= m - b, h.right -= m - b, h.marginTop = u, h.marginLeft = b;
    }

    return (i ? o.contains(d) : o === d && 'BODY' !== d.nodeName) && (h = f(h, o)), h;
  }

  function b(e) {
    var t = window.document.documentElement,
        o = u(e, t),
        i = _(t.clientWidth, window.innerWidth || 0),
        n = _(t.clientHeight, window.innerHeight || 0),
        r = a(t),
        p = a(t, 'left'),
        s = {
      top: r - o.top + o.marginTop,
      left: p - o.left + o.marginLeft,
      width: i,
      height: n
    };

    return c(s);
  }

  function y(e) {
    var i = e.nodeName;
    return 'BODY' === i || 'HTML' === i ? !1 : 'fixed' === t(e, 'position') || y(o(e));
  }

  function w(e, t, i, r) {
    var p = {
      top: 0,
      left: 0
    },
        s = d(e, t);
    if ('viewport' === r) p = b(s);else {
      var a;
      'scrollParent' === r ? (a = n(o(e)), 'BODY' === a.nodeName && (a = window.document.documentElement)) : 'window' === r ? a = window.document.documentElement : a = r;
      var f = u(a, s);

      if ('HTML' === a.nodeName && !y(s)) {
        var l = h(),
            m = l.height,
            c = l.width;
        p.top += f.top - f.marginTop, p.bottom = m + f.top, p.left += f.left - f.marginLeft, p.right = c + f.left;
      } else p = f;
    }
    return p.left += i, p.top += i, p.right -= i, p.bottom -= i, p;
  }

  function v(e) {
    var t = e.width,
        o = e.height;
    return t * o;
  }

  function E(e, t, o, i, n) {
    var r = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
    if (-1 === e.indexOf('auto')) return e;
    var p = w(o, i, r, n),
        s = {
      top: {
        width: p.width,
        height: t.top - p.top
      },
      right: {
        width: p.right - t.right,
        height: p.height
      },
      bottom: {
        width: p.width,
        height: p.bottom - t.bottom
      },
      left: {
        width: t.left - p.left,
        height: p.height
      }
    },
        d = Object.keys(s).map(function (e) {
      return se({
        key: e
      }, s[e], {
        area: v(s[e])
      });
    }).sort(function (e, t) {
      return t.area - e.area;
    }),
        a = d.filter(function (e) {
      var t = e.width,
          i = e.height;
      return t >= o.clientWidth && i >= o.clientHeight;
    }),
        f = 0 < a.length ? a[0].key : d[0].key,
        l = e.split('-')[1];
    return f + (l ? '-' + l : '');
  }

  function x(e, t, o) {
    var i = d(t, o);
    return u(o, i);
  }

  function O(e) {
    var t = window.getComputedStyle(e),
        o = parseFloat(t.marginTop) + parseFloat(t.marginBottom),
        i = parseFloat(t.marginLeft) + parseFloat(t.marginRight),
        n = {
      width: e.offsetWidth + i,
      height: e.offsetHeight + o
    };
    return n;
  }

  function L(e) {
    var t = {
      left: 'right',
      right: 'left',
      bottom: 'top',
      top: 'bottom'
    };
    return e.replace(/left|right|bottom|top/g, function (e) {
      return t[e];
    });
  }

  function S(e, t, o) {
    o = o.split('-')[0];
    var i = O(e),
        n = {
      width: i.width,
      height: i.height
    },
        r = -1 !== ['right', 'left'].indexOf(o),
        p = r ? 'top' : 'left',
        s = r ? 'left' : 'top',
        d = r ? 'height' : 'width',
        a = r ? 'width' : 'height';
    return n[p] = t[p] + t[d] / 2 - i[d] / 2, n[s] = o === s ? t[s] - i[a] : t[L(s)], n;
  }

  function T(e, t) {
    return Array.prototype.find ? e.find(t) : e.filter(t)[0];
  }

  function C(e, t, o) {
    if (Array.prototype.findIndex) return e.findIndex(function (e) {
      return e[t] === o;
    });
    var i = T(e, function (e) {
      return e[t] === o;
    });
    return e.indexOf(i);
  }

  function N(t, o, i) {
    var n = void 0 === i ? t : t.slice(0, C(t, 'name', i));
    return n.forEach(function (t) {
      t["function"] && console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
      var i = t["function"] || t.fn;
      t.enabled && e(i) && (o.offsets.popper = c(o.offsets.popper), o.offsets.reference = c(o.offsets.reference), o = i(o, t));
    }), o;
  }

  function k() {
    if (!this.state.isDestroyed) {
      var e = {
        instance: this,
        styles: {},
        attributes: {},
        flipped: !1,
        offsets: {}
      };
      e.offsets.reference = x(this.state, this.popper, this.reference), e.placement = E(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.offsets.popper = S(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = 'absolute', e = N(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e));
    }
  }

  function W(e, t) {
    return e.some(function (e) {
      var o = e.name,
          i = e.enabled;
      return i && o === t;
    });
  }

  function B(e) {
    for (var t = [!1, 'ms', 'Webkit', 'Moz', 'O'], o = e.charAt(0).toUpperCase() + e.slice(1), n = 0; n < t.length - 1; n++) {
      var i = t[n],
          r = i ? '' + i + o : e;
      if ('undefined' != typeof window.document.body.style[r]) return r;
    }

    return null;
  }

  function D() {
    return this.state.isDestroyed = !0, W(this.modifiers, 'applyStyle') && (this.popper.removeAttribute('x-placement'), this.popper.style.left = '', this.popper.style.position = '', this.popper.style.top = '', this.popper.style[B('transform')] = ''), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this;
  }

  function H(e, t, o, i) {
    var r = 'BODY' === e.nodeName,
        p = r ? window : e;
    p.addEventListener(t, o, {
      passive: !0
    }), r || H(n(p.parentNode), t, o, i), i.push(p);
  }

  function P(e, t, o, i) {
    o.updateBound = i, window.addEventListener('resize', o.updateBound, {
      passive: !0
    });
    var r = n(e);
    return H(r, 'scroll', o.updateBound, o.scrollParents), o.scrollElement = r, o.eventsEnabled = !0, o;
  }

  function A() {
    this.state.eventsEnabled || (this.state = P(this.reference, this.options, this.state, this.scheduleUpdate));
  }

  function M(e, t) {
    return window.removeEventListener('resize', t.updateBound), t.scrollParents.forEach(function (e) {
      e.removeEventListener('scroll', t.updateBound);
    }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t;
  }

  function I() {
    this.state.eventsEnabled && (window.cancelAnimationFrame(this.scheduleUpdate), this.state = M(this.reference, this.state));
  }

  function R(e) {
    return '' !== e && !isNaN(parseFloat(e)) && isFinite(e);
  }

  function U(e, t) {
    Object.keys(t).forEach(function (o) {
      var i = '';
      -1 !== ['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(o) && R(t[o]) && (i = 'px'), e.style[o] = t[o] + i;
    });
  }

  function Y(e, t) {
    Object.keys(t).forEach(function (o) {
      var i = t[o];
      !1 === i ? e.removeAttribute(o) : e.setAttribute(o, t[o]);
    });
  }

  function F(e, t, o) {
    var i = T(e, function (e) {
      var o = e.name;
      return o === t;
    }),
        n = !!i && e.some(function (e) {
      return e.name === o && e.enabled && e.order < i.order;
    });

    if (!n) {
      var r = '`' + t + '`';
      console.warn('`' + o + '`' + ' modifier is required by ' + r + ' modifier in order to work, be sure to include it before ' + r + '!');
    }

    return n;
  }

  function j(e) {
    return 'end' === e ? 'start' : 'start' === e ? 'end' : e;
  }

  function K(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
        o = ae.indexOf(e),
        i = ae.slice(o + 1).concat(ae.slice(0, o));
    return t ? i.reverse() : i;
  }

  function q(e, t, o, i) {
    var n = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
        r = +n[1],
        p = n[2];
    if (!r) return e;

    if (0 === p.indexOf('%')) {
      var s;

      switch (p) {
        case '%p':
          s = o;
          break;

        case '%':
        case '%r':
        default:
          s = i;
      }

      var d = c(s);
      return d[t] / 100 * r;
    }

    if ('vh' === p || 'vw' === p) {
      var a;
      return a = 'vh' === p ? _(document.documentElement.clientHeight, window.innerHeight || 0) : _(document.documentElement.clientWidth, window.innerWidth || 0), a / 100 * r;
    }

    return r;
  }

  function G(e, t, o, i) {
    var n = [0, 0],
        r = -1 !== ['right', 'left'].indexOf(i),
        p = e.split(/(\+|\-)/).map(function (e) {
      return e.trim();
    }),
        s = p.indexOf(T(p, function (e) {
      return -1 !== e.search(/,|\s/);
    }));
    p[s] && -1 === p[s].indexOf(',') && console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
    var d = /\s*,\s*|\s+/,
        a = -1 === s ? [p] : [p.slice(0, s).concat([p[s].split(d)[0]]), [p[s].split(d)[1]].concat(p.slice(s + 1))];
    return a = a.map(function (e, i) {
      var n = (1 === i ? !r : r) ? 'height' : 'width',
          p = !1;
      return e.reduce(function (e, t) {
        return '' === e[e.length - 1] && -1 !== ['+', '-'].indexOf(t) ? (e[e.length - 1] = t, p = !0, e) : p ? (e[e.length - 1] += t, p = !1, e) : e.concat(t);
      }, []).map(function (e) {
        return q(e, n, t, o);
      });
    }), a.forEach(function (e, t) {
      e.forEach(function (o, i) {
        R(o) && (n[t] += o * ('-' === e[i - 1] ? -1 : 1));
      });
    }), n;
  }

  for (var z = Math.min, V = Math.floor, _ = Math.max, X = ['native code', '[object MutationObserverConstructor]'], Q = function Q(e) {
    return X.some(function (t) {
      return -1 < (e || '').toString().indexOf(t);
    });
  }, J = 'undefined' != typeof window, Z = ['Edge', 'Trident', 'Firefox'], $ = 0, ee = 0; ee < Z.length; ee += 1) {
    if (J && 0 <= navigator.userAgent.indexOf(Z[ee])) {
      $ = 1;
      break;
    }
  }

  var i,
      te = J && Q(window.MutationObserver),
      oe = te ? function (e) {
    var t = !1,
        o = 0,
        i = document.createElement('span'),
        n = new MutationObserver(function () {
      e(), t = !1;
    });
    return n.observe(i, {
      attributes: !0
    }), function () {
      t || (t = !0, i.setAttribute('x-index', o), ++o);
    };
  } : function (e) {
    var t = !1;
    return function () {
      t || (t = !0, setTimeout(function () {
        t = !1, e();
      }, $));
    };
  },
      ie = function ie() {
    return void 0 == i && (i = -1 !== navigator.appVersion.indexOf('MSIE 10')), i;
  },
      ne = function ne(e, t) {
    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
  },
      re = function () {
    function e(e, t) {
      for (var o, n = 0; n < t.length; n++) {
        o = t[n], o.enumerable = o.enumerable || !1, o.configurable = !0, 'value' in o && (o.writable = !0), Object.defineProperty(e, o.key, o);
      }
    }

    return function (t, o, i) {
      return o && e(t.prototype, o), i && e(t, i), t;
    };
  }(),
      pe = function pe(e, t, o) {
    return t in e ? Object.defineProperty(e, t, {
      value: o,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = o, e;
  },
      se = Object.assign || function (e) {
    for (var t, o = 1; o < arguments.length; o++) {
      for (var i in t = arguments[o], t) {
        Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
      }
    }

    return e;
  },
      de = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'],
      ae = de.slice(3),
      fe = {
    FLIP: 'flip',
    CLOCKWISE: 'clockwise',
    COUNTERCLOCKWISE: 'counterclockwise'
  },
      le = function () {
    function t(o, i) {
      var n = this,
          r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
      ne(this, t), this.scheduleUpdate = function () {
        return requestAnimationFrame(n.update);
      }, this.update = oe(this.update.bind(this)), this.options = se({}, t.Defaults, r), this.state = {
        isDestroyed: !1,
        isCreated: !1,
        scrollParents: []
      }, this.reference = o.jquery ? o[0] : o, this.popper = i.jquery ? i[0] : i, this.options.modifiers = {}, Object.keys(se({}, t.Defaults.modifiers, r.modifiers)).forEach(function (e) {
        n.options.modifiers[e] = se({}, t.Defaults.modifiers[e] || {}, r.modifiers ? r.modifiers[e] : {});
      }), this.modifiers = Object.keys(this.options.modifiers).map(function (e) {
        return se({
          name: e
        }, n.options.modifiers[e]);
      }).sort(function (e, t) {
        return e.order - t.order;
      }), this.modifiers.forEach(function (t) {
        t.enabled && e(t.onLoad) && t.onLoad(n.reference, n.popper, n.options, t, n.state);
      }), this.update();
      var p = this.options.eventsEnabled;
      p && this.enableEventListeners(), this.state.eventsEnabled = p;
    }

    return re(t, [{
      key: 'update',
      value: function value() {
        return k.call(this);
      }
    }, {
      key: 'destroy',
      value: function value() {
        return D.call(this);
      }
    }, {
      key: 'enableEventListeners',
      value: function value() {
        return A.call(this);
      }
    }, {
      key: 'disableEventListeners',
      value: function value() {
        return I.call(this);
      }
    }]), t;
  }();

  return le.Utils = ('undefined' == typeof window ? global : window).PopperUtils, le.placements = de, le.Defaults = {
    placement: 'bottom',
    eventsEnabled: !0,
    removeOnDestroy: !1,
    onCreate: function onCreate() {},
    onUpdate: function onUpdate() {},
    modifiers: {
      shift: {
        order: 100,
        enabled: !0,
        fn: function fn(e) {
          var t = e.placement,
              o = t.split('-')[0],
              i = t.split('-')[1];

          if (i) {
            var n = e.offsets,
                r = n.reference,
                p = n.popper,
                s = -1 !== ['bottom', 'top'].indexOf(o),
                d = s ? 'left' : 'top',
                a = s ? 'width' : 'height',
                f = {
              start: pe({}, d, r[d]),
              end: pe({}, d, r[d] + r[a] - p[a])
            };
            e.offsets.popper = se({}, p, f[i]);
          }

          return e;
        }
      },
      offset: {
        order: 200,
        enabled: !0,
        fn: function fn(e, t) {
          var o,
              i = t.offset,
              n = e.placement,
              r = e.offsets,
              p = r.popper,
              s = r.reference,
              d = n.split('-')[0];
          return o = R(+i) ? [+i, 0] : G(i, p, s, d), 'left' === d ? (p.top += o[0], p.left -= o[1]) : 'right' === d ? (p.top += o[0], p.left += o[1]) : 'top' === d ? (p.left += o[0], p.top -= o[1]) : 'bottom' === d && (p.left += o[0], p.top += o[1]), e.popper = p, e;
        },
        offset: 0
      },
      preventOverflow: {
        order: 300,
        enabled: !0,
        fn: function fn(e, t) {
          var o = t.boundariesElement || r(e.instance.popper);
          e.instance.reference === o && (o = r(o));
          var i = w(e.instance.popper, e.instance.reference, t.padding, o);
          t.boundaries = i;
          var n = t.priority,
              p = e.offsets.popper,
              s = {
            primary: function primary(e) {
              var o = p[e];
              return p[e] < i[e] && !t.escapeWithReference && (o = _(p[e], i[e])), pe({}, e, o);
            },
            secondary: function secondary(e) {
              var o = 'right' === e ? 'left' : 'top',
                  n = p[o];
              return p[e] > i[e] && !t.escapeWithReference && (n = z(p[o], i[e] - ('right' === e ? p.width : p.height))), pe({}, o, n);
            }
          };
          return n.forEach(function (e) {
            var t = -1 === ['left', 'top'].indexOf(e) ? 'secondary' : 'primary';
            p = se({}, p, s[t](e));
          }), e.offsets.popper = p, e;
        },
        priority: ['left', 'right', 'top', 'bottom'],
        padding: 5,
        boundariesElement: 'scrollParent'
      },
      keepTogether: {
        order: 400,
        enabled: !0,
        fn: function fn(e) {
          var t = e.offsets,
              o = t.popper,
              i = t.reference,
              n = e.placement.split('-')[0],
              r = V,
              p = -1 !== ['top', 'bottom'].indexOf(n),
              s = p ? 'right' : 'bottom',
              d = p ? 'left' : 'top',
              a = p ? 'width' : 'height';
          return o[s] < r(i[d]) && (e.offsets.popper[d] = r(i[d]) - o[a]), o[d] > r(i[s]) && (e.offsets.popper[d] = r(i[s])), e;
        }
      },
      arrow: {
        order: 500,
        enabled: !0,
        fn: function fn(e, t) {
          if (!F(e.instance.modifiers, 'arrow', 'keepTogether')) return e;
          var o = t.element;

          if ('string' == typeof o) {
            if (o = e.instance.popper.querySelector(o), !o) return e;
          } else if (!e.instance.popper.contains(o)) return console.warn('WARNING: `arrow.element` must be child of its popper element!'), e;

          var i = e.placement.split('-')[0],
              n = e.offsets,
              r = n.popper,
              p = n.reference,
              s = -1 !== ['left', 'right'].indexOf(i),
              d = s ? 'height' : 'width',
              a = s ? 'top' : 'left',
              f = s ? 'left' : 'top',
              l = s ? 'bottom' : 'right',
              m = O(o)[d];
          p[l] - m < r[a] && (e.offsets.popper[a] -= r[a] - (p[l] - m)), p[a] + m > r[l] && (e.offsets.popper[a] += p[a] + m - r[l]);
          var h = p[a] + p[d] / 2 - m / 2,
              g = h - c(e.offsets.popper)[a];
          return g = _(z(r[d] - m, g), 0), e.arrowElement = o, e.offsets.arrow = {}, e.offsets.arrow[a] = Math.round(g), e.offsets.arrow[f] = '', e;
        },
        element: '[x-arrow]'
      },
      flip: {
        order: 600,
        enabled: !0,
        fn: function fn(e, t) {
          if (W(e.instance.modifiers, 'inner')) return e;
          if (e.flipped && e.placement === e.originalPlacement) return e;
          var o = w(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement),
              i = e.placement.split('-')[0],
              n = L(i),
              r = e.placement.split('-')[1] || '',
              p = [];

          switch (t.behavior) {
            case fe.FLIP:
              p = [i, n];
              break;

            case fe.CLOCKWISE:
              p = K(i);
              break;

            case fe.COUNTERCLOCKWISE:
              p = K(i, !0);
              break;

            default:
              p = t.behavior;
          }

          return p.forEach(function (s, d) {
            if (i !== s || p.length === d + 1) return e;
            i = e.placement.split('-')[0], n = L(i);
            var a = e.offsets.popper,
                f = e.offsets.reference,
                l = V,
                m = 'left' === i && l(a.right) > l(f.left) || 'right' === i && l(a.left) < l(f.right) || 'top' === i && l(a.bottom) > l(f.top) || 'bottom' === i && l(a.top) < l(f.bottom),
                h = l(a.left) < l(o.left),
                c = l(a.right) > l(o.right),
                g = l(a.top) < l(o.top),
                u = l(a.bottom) > l(o.bottom),
                b = 'left' === i && h || 'right' === i && c || 'top' === i && g || 'bottom' === i && u,
                y = -1 !== ['top', 'bottom'].indexOf(i),
                w = !!t.flipVariations && (y && 'start' === r && h || y && 'end' === r && c || !y && 'start' === r && g || !y && 'end' === r && u);
            (m || b || w) && (e.flipped = !0, (m || b) && (i = p[d + 1]), w && (r = j(r)), e.placement = i + (r ? '-' + r : ''), e.offsets.popper = se({}, e.offsets.popper, S(e.instance.popper, e.offsets.reference, e.placement)), e = N(e.instance.modifiers, e, 'flip'));
          }), e;
        },
        behavior: 'flip',
        padding: 5,
        boundariesElement: 'viewport'
      },
      inner: {
        order: 700,
        enabled: !1,
        fn: function fn(e) {
          var t = e.placement,
              o = t.split('-')[0],
              i = e.offsets,
              n = i.popper,
              r = i.reference,
              p = -1 !== ['left', 'right'].indexOf(o),
              s = -1 === ['top', 'left'].indexOf(o);
          return n[p ? 'left' : 'top'] = r[t] - (s ? n[p ? 'width' : 'height'] : 0), e.placement = L(t), e.offsets.popper = c(n), e;
        }
      },
      hide: {
        order: 800,
        enabled: !0,
        fn: function fn(e) {
          if (!F(e.instance.modifiers, 'hide', 'preventOverflow')) return e;
          var t = e.offsets.reference,
              o = T(e.instance.modifiers, function (e) {
            return 'preventOverflow' === e.name;
          }).boundaries;

          if (t.bottom < o.top || t.left > o.right || t.top > o.bottom || t.right < o.left) {
            if (!0 === e.hide) return e;
            e.hide = !0, e.attributes['x-out-of-boundaries'] = '';
          } else {
            if (!1 === e.hide) return e;
            e.hide = !1, e.attributes['x-out-of-boundaries'] = !1;
          }

          return e;
        }
      },
      computeStyle: {
        order: 850,
        enabled: !0,
        fn: function fn(e, t) {
          var o = t.x,
              i = t.y,
              n = e.offsets.popper,
              p = T(e.instance.modifiers, function (e) {
            return 'applyStyle' === e.name;
          }).gpuAcceleration;
          void 0 !== p && console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
          var s,
              d,
              a = void 0 === p ? t.gpuAcceleration : p,
              f = r(e.instance.popper),
              l = g(f),
              m = {
            position: n.position
          },
              h = {
            left: V(n.left),
            top: V(n.top),
            bottom: V(n.bottom),
            right: V(n.right)
          },
              c = 'bottom' === o ? 'top' : 'bottom',
              u = 'right' === i ? 'left' : 'right',
              b = B('transform');
          if (d = 'bottom' == c ? -l.height + h.bottom : h.top, s = 'right' == u ? -l.width + h.right : h.left, a && b) m[b] = 'translate3d(' + s + 'px, ' + d + 'px, 0)', m[c] = 0, m[u] = 0, m.willChange = 'transform';else {
            var y = 'bottom' == c ? -1 : 1,
                w = 'right' == u ? -1 : 1;
            m[c] = d * y, m[u] = s * w, m.willChange = c + ', ' + u;
          }
          var v = {
            "x-placement": e.placement
          };
          return e.attributes = se({}, v, e.attributes), e.styles = se({}, m, e.styles), e;
        },
        gpuAcceleration: !0,
        x: 'bottom',
        y: 'right'
      },
      applyStyle: {
        order: 900,
        enabled: !0,
        fn: function fn(e) {
          return U(e.instance.popper, e.styles), Y(e.instance.popper, e.attributes), e.offsets.arrow && U(e.arrowElement, e.offsets.arrow), e;
        },
        onLoad: function onLoad(e, t, o, i, n) {
          var r = x(n, t, e),
              p = E(o.placement, r, t, e, o.modifiers.flip.boundariesElement, o.modifiers.flip.padding);
          return t.setAttribute('x-placement', p), U(t, {
            position: 'absolute'
          }), o;
        },
        gpuAcceleration: void 0
      }
    }
  }, le;
});
/* perfect-scrollbar v0.6.13 */


!function t(e, n, r) {
  function o(i, s) {
    if (!n[i]) {
      if (!e[i]) {
        var a = "function" == typeof require && require;
        if (!s && a) return a(i, !0);
        if (l) return l(i, !0);
        var c = new Error("Cannot find module '" + i + "'");
        throw c.code = "MODULE_NOT_FOUND", c;
      }

      var u = n[i] = {
        exports: {}
      };
      e[i][0].call(u.exports, function (t) {
        var n = e[i][1][t];
        return o(n ? n : t);
      }, u, u.exports, t, e, n, r);
    }

    return n[i].exports;
  }

  for (var l = "function" == typeof require && require, i = 0; i < r.length; i++) {
    o(r[i]);
  }

  return o;
}({
  1: [function (t, e, n) {
    "use strict";

    function r(t) {
      t.fn.perfectScrollbar = function (t) {
        return this.each(function () {
          if ("object" == _typeof2(t) || "undefined" == typeof t) {
            var e = t;
            l.get(this) || o.initialize(this, e);
          } else {
            var n = t;
            "update" === n ? o.update(this) : "destroy" === n && o.destroy(this);
          }
        });
      };
    }

    var o = t("../main"),
        l = t("../plugin/instances");
    if ("function" == typeof define && define.amd) define(["jquery"], r);else {
      var i = window.jQuery ? window.jQuery : window.$;
      "undefined" != typeof i && r(i);
    }
    e.exports = r;
  }, {
    "../main": 7,
    "../plugin/instances": 18
  }],
  2: [function (t, e, n) {
    "use strict";

    function r(t, e) {
      var n = t.className.split(" ");
      n.indexOf(e) < 0 && n.push(e), t.className = n.join(" ");
    }

    function o(t, e) {
      var n = t.className.split(" "),
          r = n.indexOf(e);
      r >= 0 && n.splice(r, 1), t.className = n.join(" ");
    }

    n.add = function (t, e) {
      t.classList ? t.classList.add(e) : r(t, e);
    }, n.remove = function (t, e) {
      t.classList ? t.classList.remove(e) : o(t, e);
    }, n.list = function (t) {
      return t.classList ? Array.prototype.slice.apply(t.classList) : t.className.split(" ");
    };
  }, {}],
  3: [function (t, e, n) {
    "use strict";

    function r(t, e) {
      return window.getComputedStyle(t)[e];
    }

    function o(t, e, n) {
      return "number" == typeof n && (n = n.toString() + "px"), t.style[e] = n, t;
    }

    function l(t, e) {
      for (var n in e) {
        var r = e[n];
        "number" == typeof r && (r = r.toString() + "px"), t.style[n] = r;
      }

      return t;
    }

    var i = {};
    i.e = function (t, e) {
      var n = document.createElement(t);
      return n.className = e, n;
    }, i.appendTo = function (t, e) {
      return e.appendChild(t), t;
    }, i.css = function (t, e, n) {
      return "object" == _typeof2(e) ? l(t, e) : "undefined" == typeof n ? r(t, e) : o(t, e, n);
    }, i.matches = function (t, e) {
      return "undefined" != typeof t.matches ? t.matches(e) : "undefined" != typeof t.matchesSelector ? t.matchesSelector(e) : "undefined" != typeof t.webkitMatchesSelector ? t.webkitMatchesSelector(e) : "undefined" != typeof t.mozMatchesSelector ? t.mozMatchesSelector(e) : "undefined" != typeof t.msMatchesSelector ? t.msMatchesSelector(e) : void 0;
    }, i.remove = function (t) {
      "undefined" != typeof t.remove ? t.remove() : t.parentNode && t.parentNode.removeChild(t);
    }, i.queryChildren = function (t, e) {
      return Array.prototype.filter.call(t.childNodes, function (t) {
        return i.matches(t, e);
      });
    }, e.exports = i;
  }, {}],
  4: [function (t, e, n) {
    "use strict";

    var r = function r(t) {
      this.element = t, this.events = {};
    };

    r.prototype.bind = function (t, e) {
      "undefined" == typeof this.events[t] && (this.events[t] = []), this.events[t].push(e), this.element.addEventListener(t, e, !1);
    }, r.prototype.unbind = function (t, e) {
      var n = "undefined" != typeof e;
      this.events[t] = this.events[t].filter(function (r) {
        return !(!n || r === e) || (this.element.removeEventListener(t, r, !1), !1);
      }, this);
    }, r.prototype.unbindAll = function () {
      for (var t in this.events) {
        this.unbind(t);
      }
    };

    var o = function o() {
      this.eventElements = [];
    };

    o.prototype.eventElement = function (t) {
      var e = this.eventElements.filter(function (e) {
        return e.element === t;
      })[0];
      return "undefined" == typeof e && (e = new r(t), this.eventElements.push(e)), e;
    }, o.prototype.bind = function (t, e, n) {
      this.eventElement(t).bind(e, n);
    }, o.prototype.unbind = function (t, e, n) {
      this.eventElement(t).unbind(e, n);
    }, o.prototype.unbindAll = function () {
      for (var t = 0; t < this.eventElements.length; t++) {
        this.eventElements[t].unbindAll();
      }
    }, o.prototype.once = function (t, e, n) {
      var r = this.eventElement(t),
          o = function o(t) {
        r.unbind(e, o), n(t);
      };

      r.bind(e, o);
    }, e.exports = o;
  }, {}],
  5: [function (t, e, n) {
    "use strict";

    e.exports = function () {
      function t() {
        return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
      }

      return function () {
        return t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t();
      };
    }();
  }, {}],
  6: [function (t, e, n) {
    "use strict";

    var r = t("./class"),
        o = t("./dom"),
        l = n.toInt = function (t) {
      return parseInt(t, 10) || 0;
    },
        i = n.clone = function (t) {
      if (t) {
        if (t.constructor === Array) return t.map(i);

        if ("object" == _typeof2(t)) {
          var e = {};

          for (var n in t) {
            e[n] = i(t[n]);
          }

          return e;
        }

        return t;
      }

      return null;
    };

    n.extend = function (t, e) {
      var n = i(t);

      for (var r in e) {
        n[r] = i(e[r]);
      }

      return n;
    }, n.isEditable = function (t) {
      return o.matches(t, "input,[contenteditable]") || o.matches(t, "select,[contenteditable]") || o.matches(t, "textarea,[contenteditable]") || o.matches(t, "button,[contenteditable]");
    }, n.removePsClasses = function (t) {
      for (var e = r.list(t), n = 0; n < e.length; n++) {
        var o = e[n];
        0 === o.indexOf("ps-") && r.remove(t, o);
      }
    }, n.outerWidth = function (t) {
      return l(o.css(t, "width")) + l(o.css(t, "paddingLeft")) + l(o.css(t, "paddingRight")) + l(o.css(t, "borderLeftWidth")) + l(o.css(t, "borderRightWidth"));
    }, n.startScrolling = function (t, e) {
      r.add(t, "ps-in-scrolling"), "undefined" != typeof e ? r.add(t, "ps-" + e) : (r.add(t, "ps-x"), r.add(t, "ps-y"));
    }, n.stopScrolling = function (t, e) {
      r.remove(t, "ps-in-scrolling"), "undefined" != typeof e ? r.remove(t, "ps-" + e) : (r.remove(t, "ps-x"), r.remove(t, "ps-y"));
    }, n.env = {
      isWebKit: "WebkitAppearance" in document.documentElement.style,
      supportsTouch: "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch,
      supportsIePointer: null !== window.navigator.msMaxTouchPoints
    };
  }, {
    "./class": 2,
    "./dom": 3
  }],
  7: [function (t, e, n) {
    "use strict";

    var r = t("./plugin/destroy"),
        o = t("./plugin/initialize"),
        l = t("./plugin/update");
    e.exports = {
      initialize: o,
      update: l,
      destroy: r
    };
  }, {
    "./plugin/destroy": 9,
    "./plugin/initialize": 17,
    "./plugin/update": 21
  }],
  8: [function (t, e, n) {
    "use strict";

    e.exports = {
      handlers: ["click-rail", "drag-scrollbar", "keyboard", "wheel", "touch"],
      maxScrollbarLength: null,
      minScrollbarLength: null,
      scrollXMarginOffset: 0,
      scrollYMarginOffset: 0,
      suppressScrollX: !1,
      suppressScrollY: !1,
      swipePropagation: !0,
      useBothWheelAxes: !1,
      wheelPropagation: !1,
      wheelSpeed: 1,
      theme: "default"
    };
  }, {}],
  9: [function (t, e, n) {
    "use strict";

    var r = t("../lib/helper"),
        o = t("../lib/dom"),
        l = t("./instances");

    e.exports = function (t) {
      var e = l.get(t);
      e && (e.event.unbindAll(), o.remove(e.scrollbarX), o.remove(e.scrollbarY), o.remove(e.scrollbarXRail), o.remove(e.scrollbarYRail), r.removePsClasses(t), l.remove(t));
    };
  }, {
    "../lib/dom": 3,
    "../lib/helper": 6,
    "./instances": 18
  }],
  10: [function (t, e, n) {
    "use strict";

    function r(t, e) {
      function n(t) {
        return t.getBoundingClientRect();
      }

      var r = function r(t) {
        t.stopPropagation();
      };

      e.event.bind(e.scrollbarY, "click", r), e.event.bind(e.scrollbarYRail, "click", function (r) {
        var o = r.pageY - window.pageYOffset - n(e.scrollbarYRail).top,
            s = o > e.scrollbarYTop ? 1 : -1;
        i(t, "top", t.scrollTop + s * e.containerHeight), l(t), r.stopPropagation();
      }), e.event.bind(e.scrollbarX, "click", r), e.event.bind(e.scrollbarXRail, "click", function (r) {
        var o = r.pageX - window.pageXOffset - n(e.scrollbarXRail).left,
            s = o > e.scrollbarXLeft ? 1 : -1;
        i(t, "left", t.scrollLeft + s * e.containerWidth), l(t), r.stopPropagation();
      });
    }

    var o = t("../instances"),
        l = t("../update-geometry"),
        i = t("../update-scroll");

    e.exports = function (t) {
      var e = o.get(t);
      r(t, e);
    };
  }, {
    "../instances": 18,
    "../update-geometry": 19,
    "../update-scroll": 20
  }],
  11: [function (t, e, n) {
    "use strict";

    function r(t, e) {
      function n(n) {
        var o = r + n * e.railXRatio,
            i = Math.max(0, e.scrollbarXRail.getBoundingClientRect().left) + e.railXRatio * (e.railXWidth - e.scrollbarXWidth);
        o < 0 ? e.scrollbarXLeft = 0 : o > i ? e.scrollbarXLeft = i : e.scrollbarXLeft = o;
        var s = l.toInt(e.scrollbarXLeft * (e.contentWidth - e.containerWidth) / (e.containerWidth - e.railXRatio * e.scrollbarXWidth)) - e.negativeScrollAdjustment;
        c(t, "left", s);
      }

      var r = null,
          o = null,
          s = function s(e) {
        n(e.pageX - o), a(t), e.stopPropagation(), e.preventDefault();
      },
          u = function u() {
        l.stopScrolling(t, "x"), e.event.unbind(e.ownerDocument, "mousemove", s);
      };

      e.event.bind(e.scrollbarX, "mousedown", function (n) {
        o = n.pageX, r = l.toInt(i.css(e.scrollbarX, "left")) * e.railXRatio, l.startScrolling(t, "x"), e.event.bind(e.ownerDocument, "mousemove", s), e.event.once(e.ownerDocument, "mouseup", u), n.stopPropagation(), n.preventDefault();
      });
    }

    function o(t, e) {
      function n(n) {
        var o = r + n * e.railYRatio,
            i = Math.max(0, e.scrollbarYRail.getBoundingClientRect().top) + e.railYRatio * (e.railYHeight - e.scrollbarYHeight);
        o < 0 ? e.scrollbarYTop = 0 : o > i ? e.scrollbarYTop = i : e.scrollbarYTop = o;
        var s = l.toInt(e.scrollbarYTop * (e.contentHeight - e.containerHeight) / (e.containerHeight - e.railYRatio * e.scrollbarYHeight));
        c(t, "top", s);
      }

      var r = null,
          o = null,
          s = function s(e) {
        n(e.pageY - o), a(t), e.stopPropagation(), e.preventDefault();
      },
          u = function u() {
        l.stopScrolling(t, "y"), e.event.unbind(e.ownerDocument, "mousemove", s);
      };

      e.event.bind(e.scrollbarY, "mousedown", function (n) {
        o = n.pageY, r = l.toInt(i.css(e.scrollbarY, "top")) * e.railYRatio, l.startScrolling(t, "y"), e.event.bind(e.ownerDocument, "mousemove", s), e.event.once(e.ownerDocument, "mouseup", u), n.stopPropagation(), n.preventDefault();
      });
    }

    var l = t("../../lib/helper"),
        i = t("../../lib/dom"),
        s = t("../instances"),
        a = t("../update-geometry"),
        c = t("../update-scroll");

    e.exports = function (t) {
      var e = s.get(t);
      r(t, e), o(t, e);
    };
  }, {
    "../../lib/dom": 3,
    "../../lib/helper": 6,
    "../instances": 18,
    "../update-geometry": 19,
    "../update-scroll": 20
  }],
  12: [function (t, e, n) {
    "use strict";

    function r(t, e) {
      function n(n, r) {
        var o = t.scrollTop;

        if (0 === n) {
          if (!e.scrollbarYActive) return !1;
          if (0 === o && r > 0 || o >= e.contentHeight - e.containerHeight && r < 0) return !e.settings.wheelPropagation;
        }

        var l = t.scrollLeft;

        if (0 === r) {
          if (!e.scrollbarXActive) return !1;
          if (0 === l && n < 0 || l >= e.contentWidth - e.containerWidth && n > 0) return !e.settings.wheelPropagation;
        }

        return !0;
      }

      var r = !1;
      e.event.bind(t, "mouseenter", function () {
        r = !0;
      }), e.event.bind(t, "mouseleave", function () {
        r = !1;
      });
      var i = !1;
      e.event.bind(e.ownerDocument, "keydown", function (c) {
        if (!(c.isDefaultPrevented && c.isDefaultPrevented() || c.defaultPrevented)) {
          var u = l.matches(e.scrollbarX, ":focus") || l.matches(e.scrollbarY, ":focus");

          if (r || u) {
            var d = document.activeElement ? document.activeElement : e.ownerDocument.activeElement;

            if (d) {
              if ("IFRAME" === d.tagName) d = d.contentDocument.activeElement;else for (; d.shadowRoot;) {
                d = d.shadowRoot.activeElement;
              }
              if (o.isEditable(d)) return;
            }

            var p = 0,
                f = 0;

            switch (c.which) {
              case 37:
                p = c.metaKey ? -e.contentWidth : c.altKey ? -e.containerWidth : -30;
                break;

              case 38:
                f = c.metaKey ? e.contentHeight : c.altKey ? e.containerHeight : 30;
                break;

              case 39:
                p = c.metaKey ? e.contentWidth : c.altKey ? e.containerWidth : 30;
                break;

              case 40:
                f = c.metaKey ? -e.contentHeight : c.altKey ? -e.containerHeight : -30;
                break;

              case 33:
                f = 90;
                break;

              case 32:
                f = c.shiftKey ? 90 : -90;
                break;

              case 34:
                f = -90;
                break;

              case 35:
                f = c.ctrlKey ? -e.contentHeight : -e.containerHeight;
                break;

              case 36:
                f = c.ctrlKey ? t.scrollTop : e.containerHeight;
                break;

              default:
                return;
            }

            a(t, "top", t.scrollTop - f), a(t, "left", t.scrollLeft + p), s(t), i = n(p, f), i && c.preventDefault();
          }
        }
      });
    }

    var o = t("../../lib/helper"),
        l = t("../../lib/dom"),
        i = t("../instances"),
        s = t("../update-geometry"),
        a = t("../update-scroll");

    e.exports = function (t) {
      var e = i.get(t);
      r(t, e);
    };
  }, {
    "../../lib/dom": 3,
    "../../lib/helper": 6,
    "../instances": 18,
    "../update-geometry": 19,
    "../update-scroll": 20
  }],
  13: [function (t, e, n) {
    "use strict";

    function r(t, e) {
      function n(n, r) {
        var o = t.scrollTop;

        if (0 === n) {
          if (!e.scrollbarYActive) return !1;
          if (0 === o && r > 0 || o >= e.contentHeight - e.containerHeight && r < 0) return !e.settings.wheelPropagation;
        }

        var l = t.scrollLeft;

        if (0 === r) {
          if (!e.scrollbarXActive) return !1;
          if (0 === l && n < 0 || l >= e.contentWidth - e.containerWidth && n > 0) return !e.settings.wheelPropagation;
        }

        return !0;
      }

      function r(t) {
        var e = t.deltaX,
            n = -1 * t.deltaY;
        return "undefined" != typeof e && "undefined" != typeof n || (e = -1 * t.wheelDeltaX / 6, n = t.wheelDeltaY / 6), t.deltaMode && 1 === t.deltaMode && (e *= 10, n *= 10), e !== e && n !== n && (e = 0, n = t.wheelDelta), t.shiftKey ? [-n, -e] : [e, n];
      }

      function o(e, n) {
        var r = t.querySelector("textarea:hover, select[multiple]:hover, .ps-child:hover");

        if (r) {
          if (!window.getComputedStyle(r).overflow.match(/(scroll|auto)/)) return !1;
          var o = r.scrollHeight - r.clientHeight;
          if (o > 0 && !(0 === r.scrollTop && n > 0 || r.scrollTop === o && n < 0)) return !0;
          var l = r.scrollLeft - r.clientWidth;
          if (l > 0 && !(0 === r.scrollLeft && e < 0 || r.scrollLeft === l && e > 0)) return !0;
        }

        return !1;
      }

      function s(s) {
        var c = r(s),
            u = c[0],
            d = c[1];
        o(u, d) || (a = !1, e.settings.useBothWheelAxes ? e.scrollbarYActive && !e.scrollbarXActive ? (d ? i(t, "top", t.scrollTop - d * e.settings.wheelSpeed) : i(t, "top", t.scrollTop + u * e.settings.wheelSpeed), a = !0) : e.scrollbarXActive && !e.scrollbarYActive && (u ? i(t, "left", t.scrollLeft + u * e.settings.wheelSpeed) : i(t, "left", t.scrollLeft - d * e.settings.wheelSpeed), a = !0) : (i(t, "top", t.scrollTop - d * e.settings.wheelSpeed), i(t, "left", t.scrollLeft + u * e.settings.wheelSpeed)), l(t), a = a || n(u, d), a && (s.stopPropagation(), s.preventDefault()));
      }

      var a = !1;
      "undefined" != typeof window.onwheel ? e.event.bind(t, "wheel", s) : "undefined" != typeof window.onmousewheel && e.event.bind(t, "mousewheel", s);
    }

    var o = t("../instances"),
        l = t("../update-geometry"),
        i = t("../update-scroll");

    e.exports = function (t) {
      var e = o.get(t);
      r(t, e);
    };
  }, {
    "../instances": 18,
    "../update-geometry": 19,
    "../update-scroll": 20
  }],
  14: [function (t, e, n) {
    "use strict";

    function r(t, e) {
      e.event.bind(t, "scroll", function () {
        l(t);
      });
    }

    var o = t("../instances"),
        l = t("../update-geometry");

    e.exports = function (t) {
      var e = o.get(t);
      r(t, e);
    };
  }, {
    "../instances": 18,
    "../update-geometry": 19
  }],
  15: [function (t, e, n) {
    "use strict";

    function r(t, e) {
      function n() {
        var t = window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection() : "";
        return 0 === t.toString().length ? null : t.getRangeAt(0).commonAncestorContainer;
      }

      function r() {
        c || (c = setInterval(function () {
          return l.get(t) ? (s(t, "top", t.scrollTop + u.top), s(t, "left", t.scrollLeft + u.left), void i(t)) : void clearInterval(c);
        }, 50));
      }

      function a() {
        c && (clearInterval(c), c = null), o.stopScrolling(t);
      }

      var c = null,
          u = {
        top: 0,
        left: 0
      },
          d = !1;
      e.event.bind(e.ownerDocument, "selectionchange", function () {
        t.contains(n()) ? d = !0 : (d = !1, a());
      }), e.event.bind(window, "mouseup", function () {
        d && (d = !1, a());
      }), e.event.bind(window, "keyup", function () {
        d && (d = !1, a());
      }), e.event.bind(window, "mousemove", function (e) {
        if (d) {
          var n = {
            x: e.pageX,
            y: e.pageY
          },
              l = {
            left: t.offsetLeft,
            right: t.offsetLeft + t.offsetWidth,
            top: t.offsetTop,
            bottom: t.offsetTop + t.offsetHeight
          };
          n.x < l.left + 3 ? (u.left = -5, o.startScrolling(t, "x")) : n.x > l.right - 3 ? (u.left = 5, o.startScrolling(t, "x")) : u.left = 0, n.y < l.top + 3 ? (l.top + 3 - n.y < 5 ? u.top = -5 : u.top = -20, o.startScrolling(t, "y")) : n.y > l.bottom - 3 ? (n.y - l.bottom + 3 < 5 ? u.top = 5 : u.top = 20, o.startScrolling(t, "y")) : u.top = 0, 0 === u.top && 0 === u.left ? a() : r();
        }
      });
    }

    var o = t("../../lib/helper"),
        l = t("../instances"),
        i = t("../update-geometry"),
        s = t("../update-scroll");

    e.exports = function (t) {
      var e = l.get(t);
      r(t, e);
    };
  }, {
    "../../lib/helper": 6,
    "../instances": 18,
    "../update-geometry": 19,
    "../update-scroll": 20
  }],
  16: [function (t, e, n) {
    "use strict";

    function r(t, e, n, r) {
      function o(n, r) {
        var o = t.scrollTop,
            l = t.scrollLeft,
            i = Math.abs(n),
            s = Math.abs(r);

        if (s > i) {
          if (r < 0 && o === e.contentHeight - e.containerHeight || r > 0 && 0 === o) return !e.settings.swipePropagation;
        } else if (i > s && (n < 0 && l === e.contentWidth - e.containerWidth || n > 0 && 0 === l)) return !e.settings.swipePropagation;

        return !0;
      }

      function a(e, n) {
        s(t, "top", t.scrollTop - n), s(t, "left", t.scrollLeft - e), i(t);
      }

      function c() {
        w = !0;
      }

      function u() {
        w = !1;
      }

      function d(t) {
        return t.targetTouches ? t.targetTouches[0] : t;
      }

      function p(t) {
        return !(!t.targetTouches || 1 !== t.targetTouches.length) || !(!t.pointerType || "mouse" === t.pointerType || t.pointerType === t.MSPOINTER_TYPE_MOUSE);
      }

      function f(t) {
        if (p(t)) {
          Y = !0;
          var e = d(t);
          g.pageX = e.pageX, g.pageY = e.pageY, v = new Date().getTime(), null !== y && clearInterval(y), t.stopPropagation();
        }
      }

      function h(t) {
        if (!Y && e.settings.swipePropagation && f(t), !w && Y && p(t)) {
          var n = d(t),
              r = {
            pageX: n.pageX,
            pageY: n.pageY
          },
              l = r.pageX - g.pageX,
              i = r.pageY - g.pageY;
          a(l, i), g = r;
          var s = new Date().getTime(),
              c = s - v;
          c > 0 && (m.x = l / c, m.y = i / c, v = s), o(l, i) && (t.stopPropagation(), t.preventDefault());
        }
      }

      function b() {
        !w && Y && (Y = !1, clearInterval(y), y = setInterval(function () {
          return l.get(t) && (m.x || m.y) ? Math.abs(m.x) < .01 && Math.abs(m.y) < .01 ? void clearInterval(y) : (a(30 * m.x, 30 * m.y), m.x *= .8, void (m.y *= .8)) : void clearInterval(y);
        }, 10));
      }

      var g = {},
          v = 0,
          m = {},
          y = null,
          w = !1,
          Y = !1;
      n && (e.event.bind(window, "touchstart", c), e.event.bind(window, "touchend", u), e.event.bind(t, "touchstart", f), e.event.bind(t, "touchmove", h), e.event.bind(t, "touchend", b)), r && (window.PointerEvent ? (e.event.bind(window, "pointerdown", c), e.event.bind(window, "pointerup", u), e.event.bind(t, "pointerdown", f), e.event.bind(t, "pointermove", h), e.event.bind(t, "pointerup", b)) : window.MSPointerEvent && (e.event.bind(window, "MSPointerDown", c), e.event.bind(window, "MSPointerUp", u), e.event.bind(t, "MSPointerDown", f), e.event.bind(t, "MSPointerMove", h), e.event.bind(t, "MSPointerUp", b)));
    }

    var o = t("../../lib/helper"),
        l = t("../instances"),
        i = t("../update-geometry"),
        s = t("../update-scroll");

    e.exports = function (t) {
      if (o.env.supportsTouch || o.env.supportsIePointer) {
        var e = l.get(t);
        r(t, e, o.env.supportsTouch, o.env.supportsIePointer);
      }
    };
  }, {
    "../../lib/helper": 6,
    "../instances": 18,
    "../update-geometry": 19,
    "../update-scroll": 20
  }],
  17: [function (t, e, n) {
    "use strict";

    var r = t("../lib/helper"),
        o = t("../lib/class"),
        l = t("./instances"),
        i = t("./update-geometry"),
        s = {
      "click-rail": t("./handler/click-rail"),
      "drag-scrollbar": t("./handler/drag-scrollbar"),
      keyboard: t("./handler/keyboard"),
      wheel: t("./handler/mouse-wheel"),
      touch: t("./handler/touch"),
      selection: t("./handler/selection")
    },
        a = t("./handler/native-scroll");

    e.exports = function (t, e) {
      e = "object" == _typeof2(e) ? e : {}, o.add(t, "ps-container");
      var n = l.add(t);
      n.settings = r.extend(n.settings, e), o.add(t, "ps-theme-" + n.settings.theme), n.settings.handlers.forEach(function (e) {
        s[e](t);
      }), a(t), i(t);
    };
  }, {
    "../lib/class": 2,
    "../lib/helper": 6,
    "./handler/click-rail": 10,
    "./handler/drag-scrollbar": 11,
    "./handler/keyboard": 12,
    "./handler/mouse-wheel": 13,
    "./handler/native-scroll": 14,
    "./handler/selection": 15,
    "./handler/touch": 16,
    "./instances": 18,
    "./update-geometry": 19
  }],
  18: [function (t, e, n) {
    "use strict";

    function r(t) {
      function e() {
        a.add(t, "ps-focus");
      }

      function n() {
        a.remove(t, "ps-focus");
      }

      var r = this;
      r.settings = s.clone(c), r.containerWidth = null, r.containerHeight = null, r.contentWidth = null, r.contentHeight = null, r.isRtl = "rtl" === u.css(t, "direction"), r.isNegativeScroll = function () {
        var e = t.scrollLeft,
            n = null;
        return t.scrollLeft = -1, n = t.scrollLeft < 0, t.scrollLeft = e, n;
      }(), r.negativeScrollAdjustment = r.isNegativeScroll ? t.scrollWidth - t.clientWidth : 0, r.event = new d(), r.ownerDocument = t.ownerDocument || document, r.scrollbarXRail = u.appendTo(u.e("div", "ps-scrollbar-x-rail"), t), r.scrollbarX = u.appendTo(u.e("div", "ps-scrollbar-x"), r.scrollbarXRail), r.scrollbarX.setAttribute("tabindex", 0), r.event.bind(r.scrollbarX, "focus", e), r.event.bind(r.scrollbarX, "blur", n), r.scrollbarXActive = null, r.scrollbarXWidth = null, r.scrollbarXLeft = null, r.scrollbarXBottom = s.toInt(u.css(r.scrollbarXRail, "bottom")), r.isScrollbarXUsingBottom = r.scrollbarXBottom === r.scrollbarXBottom, r.scrollbarXTop = r.isScrollbarXUsingBottom ? null : s.toInt(u.css(r.scrollbarXRail, "top")), r.railBorderXWidth = s.toInt(u.css(r.scrollbarXRail, "borderLeftWidth")) + s.toInt(u.css(r.scrollbarXRail, "borderRightWidth")), u.css(r.scrollbarXRail, "display", "block"), r.railXMarginWidth = s.toInt(u.css(r.scrollbarXRail, "marginLeft")) + s.toInt(u.css(r.scrollbarXRail, "marginRight")), u.css(r.scrollbarXRail, "display", ""), r.railXWidth = null, r.railXRatio = null, r.scrollbarYRail = u.appendTo(u.e("div", "ps-scrollbar-y-rail"), t), r.scrollbarY = u.appendTo(u.e("div", "ps-scrollbar-y"), r.scrollbarYRail), r.scrollbarY.setAttribute("tabindex", 0), r.event.bind(r.scrollbarY, "focus", e), r.event.bind(r.scrollbarY, "blur", n), r.scrollbarYActive = null, r.scrollbarYHeight = null, r.scrollbarYTop = null, r.scrollbarYRight = s.toInt(u.css(r.scrollbarYRail, "right")), r.isScrollbarYUsingRight = r.scrollbarYRight === r.scrollbarYRight, r.scrollbarYLeft = r.isScrollbarYUsingRight ? null : s.toInt(u.css(r.scrollbarYRail, "left")), r.scrollbarYOuterWidth = r.isRtl ? s.outerWidth(r.scrollbarY) : null, r.railBorderYWidth = s.toInt(u.css(r.scrollbarYRail, "borderTopWidth")) + s.toInt(u.css(r.scrollbarYRail, "borderBottomWidth")), u.css(r.scrollbarYRail, "display", "block"), r.railYMarginHeight = s.toInt(u.css(r.scrollbarYRail, "marginTop")) + s.toInt(u.css(r.scrollbarYRail, "marginBottom")), u.css(r.scrollbarYRail, "display", ""), r.railYHeight = null, r.railYRatio = null;
    }

    function o(t) {
      return t.getAttribute("data-ps-id");
    }

    function l(t, e) {
      t.setAttribute("data-ps-id", e);
    }

    function i(t) {
      t.removeAttribute("data-ps-id");
    }

    var s = t("../lib/helper"),
        a = t("../lib/class"),
        c = t("./default-setting"),
        u = t("../lib/dom"),
        d = t("../lib/event-manager"),
        p = t("../lib/guid"),
        f = {};
    n.add = function (t) {
      var e = p();
      return l(t, e), f[e] = new r(t), f[e];
    }, n.remove = function (t) {
      delete f[o(t)], i(t);
    }, n.get = function (t) {
      return f[o(t)];
    };
  }, {
    "../lib/class": 2,
    "../lib/dom": 3,
    "../lib/event-manager": 4,
    "../lib/guid": 5,
    "../lib/helper": 6,
    "./default-setting": 8
  }],
  19: [function (t, e, n) {
    "use strict";

    function r(t, e) {
      return t.settings.minScrollbarLength && (e = Math.max(e, t.settings.minScrollbarLength)), t.settings.maxScrollbarLength && (e = Math.min(e, t.settings.maxScrollbarLength)), e;
    }

    function o(t, e) {
      var n = {
        width: e.railXWidth
      };
      e.isRtl ? n.left = e.negativeScrollAdjustment + t.scrollLeft + e.containerWidth - e.contentWidth : n.left = t.scrollLeft, e.isScrollbarXUsingBottom ? n.bottom = e.scrollbarXBottom - t.scrollTop : n.top = e.scrollbarXTop + t.scrollTop, s.css(e.scrollbarXRail, n);
      var r = {
        top: t.scrollTop,
        height: e.railYHeight
      };
      e.isScrollbarYUsingRight ? e.isRtl ? r.right = e.contentWidth - (e.negativeScrollAdjustment + t.scrollLeft) - e.scrollbarYRight - e.scrollbarYOuterWidth : r.right = e.scrollbarYRight - t.scrollLeft : e.isRtl ? r.left = e.negativeScrollAdjustment + t.scrollLeft + 2 * e.containerWidth - e.contentWidth - e.scrollbarYLeft - e.scrollbarYOuterWidth : r.left = e.scrollbarYLeft + t.scrollLeft, s.css(e.scrollbarYRail, r), s.css(e.scrollbarX, {
        left: e.scrollbarXLeft,
        width: e.scrollbarXWidth - e.railBorderXWidth
      }), s.css(e.scrollbarY, {
        top: e.scrollbarYTop,
        height: e.scrollbarYHeight - e.railBorderYWidth
      });
    }

    var l = t("../lib/helper"),
        i = t("../lib/class"),
        s = t("../lib/dom"),
        a = t("./instances"),
        c = t("./update-scroll");

    e.exports = function (t) {
      var e = a.get(t);
      e.containerWidth = t.clientWidth, e.containerHeight = t.clientHeight, e.contentWidth = t.scrollWidth, e.contentHeight = t.scrollHeight;
      var n;
      t.contains(e.scrollbarXRail) || (n = s.queryChildren(t, ".ps-scrollbar-x-rail"), n.length > 0 && n.forEach(function (t) {
        s.remove(t);
      }), s.appendTo(e.scrollbarXRail, t)), t.contains(e.scrollbarYRail) || (n = s.queryChildren(t, ".ps-scrollbar-y-rail"), n.length > 0 && n.forEach(function (t) {
        s.remove(t);
      }), s.appendTo(e.scrollbarYRail, t)), !e.settings.suppressScrollX && e.containerWidth + e.settings.scrollXMarginOffset < e.contentWidth ? (e.scrollbarXActive = !0, e.railXWidth = e.containerWidth - e.railXMarginWidth, e.railXRatio = e.containerWidth / e.railXWidth, e.scrollbarXWidth = r(e, l.toInt(e.railXWidth * e.containerWidth / e.contentWidth)), e.scrollbarXLeft = l.toInt((e.negativeScrollAdjustment + t.scrollLeft) * (e.railXWidth - e.scrollbarXWidth) / (e.contentWidth - e.containerWidth))) : e.scrollbarXActive = !1, !e.settings.suppressScrollY && e.containerHeight + e.settings.scrollYMarginOffset < e.contentHeight ? (e.scrollbarYActive = !0, e.railYHeight = e.containerHeight - e.railYMarginHeight, e.railYRatio = e.containerHeight / e.railYHeight, e.scrollbarYHeight = r(e, l.toInt(e.railYHeight * e.containerHeight / e.contentHeight)), e.scrollbarYTop = l.toInt(t.scrollTop * (e.railYHeight - e.scrollbarYHeight) / (e.contentHeight - e.containerHeight))) : e.scrollbarYActive = !1, e.scrollbarXLeft >= e.railXWidth - e.scrollbarXWidth && (e.scrollbarXLeft = e.railXWidth - e.scrollbarXWidth), e.scrollbarYTop >= e.railYHeight - e.scrollbarYHeight && (e.scrollbarYTop = e.railYHeight - e.scrollbarYHeight), o(t, e), e.scrollbarXActive ? i.add(t, "ps-active-x") : (i.remove(t, "ps-active-x"), e.scrollbarXWidth = 0, e.scrollbarXLeft = 0, c(t, "left", 0)), e.scrollbarYActive ? i.add(t, "ps-active-y") : (i.remove(t, "ps-active-y"), e.scrollbarYHeight = 0, e.scrollbarYTop = 0, c(t, "top", 0));
    };
  }, {
    "../lib/class": 2,
    "../lib/dom": 3,
    "../lib/helper": 6,
    "./instances": 18,
    "./update-scroll": 20
  }],
  20: [function (t, e, n) {
    "use strict";

    var r,
        o,
        l = t("./instances"),
        i = function i(t) {
      var e = document.createEvent("Event");
      return e.initEvent(t, !0, !0), e;
    };

    e.exports = function (t, e, n) {
      if ("undefined" == typeof t) throw "You must provide an element to the update-scroll function";
      if ("undefined" == typeof e) throw "You must provide an axis to the update-scroll function";
      if ("undefined" == typeof n) throw "You must provide a value to the update-scroll function";
      "top" === e && n <= 0 && (t.scrollTop = n = 0, t.dispatchEvent(i("ps-y-reach-start"))), "left" === e && n <= 0 && (t.scrollLeft = n = 0, t.dispatchEvent(i("ps-x-reach-start")));
      var s = l.get(t);
      "top" === e && n >= s.contentHeight - s.containerHeight && (n = s.contentHeight - s.containerHeight, n - t.scrollTop <= 1 ? n = t.scrollTop : t.scrollTop = n, t.dispatchEvent(i("ps-y-reach-end"))), "left" === e && n >= s.contentWidth - s.containerWidth && (n = s.contentWidth - s.containerWidth, n - t.scrollLeft <= 1 ? n = t.scrollLeft : t.scrollLeft = n, t.dispatchEvent(i("ps-x-reach-end"))), r || (r = t.scrollTop), o || (o = t.scrollLeft), "top" === e && n < r && t.dispatchEvent(i("ps-scroll-up")), "top" === e && n > r && t.dispatchEvent(i("ps-scroll-down")), "left" === e && n < o && t.dispatchEvent(i("ps-scroll-left")), "left" === e && n > o && t.dispatchEvent(i("ps-scroll-right")), "top" === e && (t.scrollTop = r = n, t.dispatchEvent(i("ps-scroll-y"))), "left" === e && (t.scrollLeft = o = n, t.dispatchEvent(i("ps-scroll-x")));
    };
  }, {
    "./instances": 18
  }],
  21: [function (t, e, n) {
    "use strict";

    var r = t("../lib/helper"),
        o = t("../lib/dom"),
        l = t("./instances"),
        i = t("./update-geometry"),
        s = t("./update-scroll");

    e.exports = function (t) {
      var e = l.get(t);
      e && (e.negativeScrollAdjustment = e.isNegativeScroll ? t.scrollWidth - t.clientWidth : 0, o.css(e.scrollbarXRail, "display", "block"), o.css(e.scrollbarYRail, "display", "block"), e.railXMarginWidth = r.toInt(o.css(e.scrollbarXRail, "marginLeft")) + r.toInt(o.css(e.scrollbarXRail, "marginRight")), e.railYMarginHeight = r.toInt(o.css(e.scrollbarYRail, "marginTop")) + r.toInt(o.css(e.scrollbarYRail, "marginBottom")), o.css(e.scrollbarXRail, "display", "none"), o.css(e.scrollbarYRail, "display", "none"), i(t), s(t, "top", t.scrollTop), s(t, "left", t.scrollLeft), o.css(e.scrollbarXRail, "display", ""), o.css(e.scrollbarYRail, "display", ""));
    };
  }, {
    "../lib/dom": 3,
    "../lib/helper": 6,
    "./instances": 18,
    "./update-geometry": 19,
    "./update-scroll": 20
  }]
}, {}, [1]);
/*
 Copyright (C) Federico Zivolo 2017
 Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */

(function (e, t) {
  'object' == (typeof exports === "undefined" ? "undefined" : _typeof2(exports)) && 'undefined' != typeof module ? module.exports = t() : 'function' == typeof define && define.amd ? define(t) : e.Popper = t();
})(this, function () {
  'use strict';

  function e(e) {
    return e && '[object Function]' === {}.toString.call(e);
  }

  function t(e, t) {
    if (1 !== e.nodeType) return [];
    var o = window.getComputedStyle(e, null);
    return t ? o[t] : o;
  }

  function o(e) {
    return 'HTML' === e.nodeName ? e : e.parentNode || e.host;
  }

  function n(e) {
    if (!e || -1 !== ['HTML', 'BODY', '#document'].indexOf(e.nodeName)) return window.document.body;
    var i = t(e),
        r = i.overflow,
        p = i.overflowX,
        s = i.overflowY;
    return /(auto|scroll)/.test(r + s + p) ? e : n(o(e));
  }

  function r(e) {
    var o = e && e.offsetParent,
        i = o && o.nodeName;
    return i && 'BODY' !== i && 'HTML' !== i ? -1 !== ['TD', 'TABLE'].indexOf(o.nodeName) && 'static' === t(o, 'position') ? r(o) : o : window.document.documentElement;
  }

  function p(e) {
    var t = e.nodeName;
    return 'BODY' !== t && ('HTML' === t || r(e.firstElementChild) === e);
  }

  function s(e) {
    return null === e.parentNode ? e : s(e.parentNode);
  }

  function d(e, t) {
    if (!e || !e.nodeType || !t || !t.nodeType) return window.document.documentElement;
    var o = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
        i = o ? e : t,
        n = o ? t : e,
        a = document.createRange();
    a.setStart(i, 0), a.setEnd(n, 0);
    var f = a.commonAncestorContainer;
    if (e !== f && t !== f || i.contains(n)) return p(f) ? f : r(f);
    var l = s(e);
    return l.host ? d(l.host, t) : d(e, s(t).host);
  }

  function a(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 'top',
        o = 'top' === t ? 'scrollTop' : 'scrollLeft',
        i = e.nodeName;

    if ('BODY' === i || 'HTML' === i) {
      var n = window.document.documentElement,
          r = window.document.scrollingElement || n;
      return r[o];
    }

    return e[o];
  }

  function f(e, t) {
    var o = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
        i = a(t, 'top'),
        n = a(t, 'left'),
        r = o ? -1 : 1;
    return e.top += i * r, e.bottom += i * r, e.left += n * r, e.right += n * r, e;
  }

  function l(e, t) {
    var o = 'x' === t ? 'Left' : 'Top',
        i = 'Left' == o ? 'Right' : 'Bottom';
    return +e['border' + o + 'Width'].split('px')[0] + +e['border' + i + 'Width'].split('px')[0];
  }

  function m(e, t, o, i) {
    return _(t['offset' + e], o['client' + e], o['offset' + e], ie() ? o['offset' + e] + i['margin' + ('Height' === e ? 'Top' : 'Left')] + i['margin' + ('Height' === e ? 'Bottom' : 'Right')] : 0);
  }

  function h() {
    var e = window.document.body,
        t = window.document.documentElement,
        o = ie() && window.getComputedStyle(t);
    return {
      height: m('Height', e, t, o),
      width: m('Width', e, t, o)
    };
  }

  function c(e) {
    return se({}, e, {
      right: e.left + e.width,
      bottom: e.top + e.height
    });
  }

  function g(e) {
    var o = {};
    if (ie()) try {
      o = e.getBoundingClientRect();
      var i = a(e, 'top'),
          n = a(e, 'left');
      o.top += i, o.left += n, o.bottom += i, o.right += n;
    } catch (e) {} else o = e.getBoundingClientRect();
    var r = {
      left: o.left,
      top: o.top,
      width: o.right - o.left,
      height: o.bottom - o.top
    },
        p = 'HTML' === e.nodeName ? h() : {},
        s = p.width || e.clientWidth || r.right - r.left,
        d = p.height || e.clientHeight || r.bottom - r.top,
        f = e.offsetWidth - s,
        m = e.offsetHeight - d;

    if (f || m) {
      var g = t(e);
      f -= l(g, 'x'), m -= l(g, 'y'), r.width -= f, r.height -= m;
    }

    return c(r);
  }

  function u(e, o) {
    var i = ie(),
        r = 'HTML' === o.nodeName,
        p = g(e),
        s = g(o),
        d = n(e),
        a = t(o),
        l = +a.borderTopWidth.split('px')[0],
        m = +a.borderLeftWidth.split('px')[0],
        h = c({
      top: p.top - s.top - l,
      left: p.left - s.left - m,
      width: p.width,
      height: p.height
    });

    if (h.marginTop = 0, h.marginLeft = 0, !i && r) {
      var u = +a.marginTop.split('px')[0],
          b = +a.marginLeft.split('px')[0];
      h.top -= l - u, h.bottom -= l - u, h.left -= m - b, h.right -= m - b, h.marginTop = u, h.marginLeft = b;
    }

    return (i ? o.contains(d) : o === d && 'BODY' !== d.nodeName) && (h = f(h, o)), h;
  }

  function b(e) {
    var t = window.document.documentElement,
        o = u(e, t),
        i = _(t.clientWidth, window.innerWidth || 0),
        n = _(t.clientHeight, window.innerHeight || 0),
        r = a(t),
        p = a(t, 'left'),
        s = {
      top: r - o.top + o.marginTop,
      left: p - o.left + o.marginLeft,
      width: i,
      height: n
    };

    return c(s);
  }

  function y(e) {
    var i = e.nodeName;
    return 'BODY' === i || 'HTML' === i ? !1 : 'fixed' === t(e, 'position') || y(o(e));
  }

  function w(e, t, i, r) {
    var p = {
      top: 0,
      left: 0
    },
        s = d(e, t);
    if ('viewport' === r) p = b(s);else {
      var a;
      'scrollParent' === r ? (a = n(o(e)), 'BODY' === a.nodeName && (a = window.document.documentElement)) : 'window' === r ? a = window.document.documentElement : a = r;
      var f = u(a, s);

      if ('HTML' === a.nodeName && !y(s)) {
        var l = h(),
            m = l.height,
            c = l.width;
        p.top += f.top - f.marginTop, p.bottom = m + f.top, p.left += f.left - f.marginLeft, p.right = c + f.left;
      } else p = f;
    }
    return p.left += i, p.top += i, p.right -= i, p.bottom -= i, p;
  }

  function v(e) {
    var t = e.width,
        o = e.height;
    return t * o;
  }

  function E(e, t, o, i, n) {
    var r = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
    if (-1 === e.indexOf('auto')) return e;
    var p = w(o, i, r, n),
        s = {
      top: {
        width: p.width,
        height: t.top - p.top
      },
      right: {
        width: p.right - t.right,
        height: p.height
      },
      bottom: {
        width: p.width,
        height: p.bottom - t.bottom
      },
      left: {
        width: t.left - p.left,
        height: p.height
      }
    },
        d = Object.keys(s).map(function (e) {
      return se({
        key: e
      }, s[e], {
        area: v(s[e])
      });
    }).sort(function (e, t) {
      return t.area - e.area;
    }),
        a = d.filter(function (e) {
      var t = e.width,
          i = e.height;
      return t >= o.clientWidth && i >= o.clientHeight;
    }),
        f = 0 < a.length ? a[0].key : d[0].key,
        l = e.split('-')[1];
    return f + (l ? '-' + l : '');
  }

  function x(e, t, o) {
    var i = d(t, o);
    return u(o, i);
  }

  function O(e) {
    var t = window.getComputedStyle(e),
        o = parseFloat(t.marginTop) + parseFloat(t.marginBottom),
        i = parseFloat(t.marginLeft) + parseFloat(t.marginRight),
        n = {
      width: e.offsetWidth + i,
      height: e.offsetHeight + o
    };
    return n;
  }

  function L(e) {
    var t = {
      left: 'right',
      right: 'left',
      bottom: 'top',
      top: 'bottom'
    };
    return e.replace(/left|right|bottom|top/g, function (e) {
      return t[e];
    });
  }

  function S(e, t, o) {
    o = o.split('-')[0];
    var i = O(e),
        n = {
      width: i.width,
      height: i.height
    },
        r = -1 !== ['right', 'left'].indexOf(o),
        p = r ? 'top' : 'left',
        s = r ? 'left' : 'top',
        d = r ? 'height' : 'width',
        a = r ? 'width' : 'height';
    return n[p] = t[p] + t[d] / 2 - i[d] / 2, n[s] = o === s ? t[s] - i[a] : t[L(s)], n;
  }

  function T(e, t) {
    return Array.prototype.find ? e.find(t) : e.filter(t)[0];
  }

  function C(e, t, o) {
    if (Array.prototype.findIndex) return e.findIndex(function (e) {
      return e[t] === o;
    });
    var i = T(e, function (e) {
      return e[t] === o;
    });
    return e.indexOf(i);
  }

  function N(t, o, i) {
    var n = void 0 === i ? t : t.slice(0, C(t, 'name', i));
    return n.forEach(function (t) {
      t["function"] && console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
      var i = t["function"] || t.fn;
      t.enabled && e(i) && (o.offsets.popper = c(o.offsets.popper), o.offsets.reference = c(o.offsets.reference), o = i(o, t));
    }), o;
  }

  function k() {
    if (!this.state.isDestroyed) {
      var e = {
        instance: this,
        styles: {},
        attributes: {},
        flipped: !1,
        offsets: {}
      };
      e.offsets.reference = x(this.state, this.popper, this.reference), e.placement = E(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.offsets.popper = S(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = 'absolute', e = N(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e));
    }
  }

  function W(e, t) {
    return e.some(function (e) {
      var o = e.name,
          i = e.enabled;
      return i && o === t;
    });
  }

  function B(e) {
    for (var t = [!1, 'ms', 'Webkit', 'Moz', 'O'], o = e.charAt(0).toUpperCase() + e.slice(1), n = 0; n < t.length - 1; n++) {
      var i = t[n],
          r = i ? '' + i + o : e;
      if ('undefined' != typeof window.document.body.style[r]) return r;
    }

    return null;
  }

  function D() {
    return this.state.isDestroyed = !0, W(this.modifiers, 'applyStyle') && (this.popper.removeAttribute('x-placement'), this.popper.style.left = '', this.popper.style.position = '', this.popper.style.top = '', this.popper.style[B('transform')] = ''), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this;
  }

  function H(e, t, o, i) {
    var r = 'BODY' === e.nodeName,
        p = r ? window : e;
    p.addEventListener(t, o, {
      passive: !0
    }), r || H(n(p.parentNode), t, o, i), i.push(p);
  }

  function P(e, t, o, i) {
    o.updateBound = i, window.addEventListener('resize', o.updateBound, {
      passive: !0
    });
    var r = n(e);
    return H(r, 'scroll', o.updateBound, o.scrollParents), o.scrollElement = r, o.eventsEnabled = !0, o;
  }

  function A() {
    this.state.eventsEnabled || (this.state = P(this.reference, this.options, this.state, this.scheduleUpdate));
  }

  function M(e, t) {
    return window.removeEventListener('resize', t.updateBound), t.scrollParents.forEach(function (e) {
      e.removeEventListener('scroll', t.updateBound);
    }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t;
  }

  function I() {
    this.state.eventsEnabled && (window.cancelAnimationFrame(this.scheduleUpdate), this.state = M(this.reference, this.state));
  }

  function R(e) {
    return '' !== e && !isNaN(parseFloat(e)) && isFinite(e);
  }

  function U(e, t) {
    Object.keys(t).forEach(function (o) {
      var i = '';
      -1 !== ['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(o) && R(t[o]) && (i = 'px'), e.style[o] = t[o] + i;
    });
  }

  function Y(e, t) {
    Object.keys(t).forEach(function (o) {
      var i = t[o];
      !1 === i ? e.removeAttribute(o) : e.setAttribute(o, t[o]);
    });
  }

  function F(e, t, o) {
    var i = T(e, function (e) {
      var o = e.name;
      return o === t;
    }),
        n = !!i && e.some(function (e) {
      return e.name === o && e.enabled && e.order < i.order;
    });

    if (!n) {
      var r = '`' + t + '`';
      console.warn('`' + o + '`' + ' modifier is required by ' + r + ' modifier in order to work, be sure to include it before ' + r + '!');
    }

    return n;
  }

  function j(e) {
    return 'end' === e ? 'start' : 'start' === e ? 'end' : e;
  }

  function K(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
        o = ae.indexOf(e),
        i = ae.slice(o + 1).concat(ae.slice(0, o));
    return t ? i.reverse() : i;
  }

  function q(e, t, o, i) {
    var n = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
        r = +n[1],
        p = n[2];
    if (!r) return e;

    if (0 === p.indexOf('%')) {
      var s;

      switch (p) {
        case '%p':
          s = o;
          break;

        case '%':
        case '%r':
        default:
          s = i;
      }

      var d = c(s);
      return d[t] / 100 * r;
    }

    if ('vh' === p || 'vw' === p) {
      var a;
      return a = 'vh' === p ? _(document.documentElement.clientHeight, window.innerHeight || 0) : _(document.documentElement.clientWidth, window.innerWidth || 0), a / 100 * r;
    }

    return r;
  }

  function G(e, t, o, i) {
    var n = [0, 0],
        r = -1 !== ['right', 'left'].indexOf(i),
        p = e.split(/(\+|\-)/).map(function (e) {
      return e.trim();
    }),
        s = p.indexOf(T(p, function (e) {
      return -1 !== e.search(/,|\s/);
    }));
    p[s] && -1 === p[s].indexOf(',') && console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
    var d = /\s*,\s*|\s+/,
        a = -1 === s ? [p] : [p.slice(0, s).concat([p[s].split(d)[0]]), [p[s].split(d)[1]].concat(p.slice(s + 1))];
    return a = a.map(function (e, i) {
      var n = (1 === i ? !r : r) ? 'height' : 'width',
          p = !1;
      return e.reduce(function (e, t) {
        return '' === e[e.length - 1] && -1 !== ['+', '-'].indexOf(t) ? (e[e.length - 1] = t, p = !0, e) : p ? (e[e.length - 1] += t, p = !1, e) : e.concat(t);
      }, []).map(function (e) {
        return q(e, n, t, o);
      });
    }), a.forEach(function (e, t) {
      e.forEach(function (o, i) {
        R(o) && (n[t] += o * ('-' === e[i - 1] ? -1 : 1));
      });
    }), n;
  }

  for (var z = Math.min, V = Math.floor, _ = Math.max, X = ['native code', '[object MutationObserverConstructor]'], Q = function Q(e) {
    return X.some(function (t) {
      return -1 < (e || '').toString().indexOf(t);
    });
  }, J = 'undefined' != typeof window, Z = ['Edge', 'Trident', 'Firefox'], $ = 0, ee = 0; ee < Z.length; ee += 1) {
    if (J && 0 <= navigator.userAgent.indexOf(Z[ee])) {
      $ = 1;
      break;
    }
  }

  var i,
      te = J && Q(window.MutationObserver),
      oe = te ? function (e) {
    var t = !1,
        o = 0,
        i = document.createElement('span'),
        n = new MutationObserver(function () {
      e(), t = !1;
    });
    return n.observe(i, {
      attributes: !0
    }), function () {
      t || (t = !0, i.setAttribute('x-index', o), ++o);
    };
  } : function (e) {
    var t = !1;
    return function () {
      t || (t = !0, setTimeout(function () {
        t = !1, e();
      }, $));
    };
  },
      ie = function ie() {
    return void 0 == i && (i = -1 !== navigator.appVersion.indexOf('MSIE 10')), i;
  },
      ne = function ne(e, t) {
    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
  },
      re = function () {
    function e(e, t) {
      for (var o, n = 0; n < t.length; n++) {
        o = t[n], o.enumerable = o.enumerable || !1, o.configurable = !0, 'value' in o && (o.writable = !0), Object.defineProperty(e, o.key, o);
      }
    }

    return function (t, o, i) {
      return o && e(t.prototype, o), i && e(t, i), t;
    };
  }(),
      pe = function pe(e, t, o) {
    return t in e ? Object.defineProperty(e, t, {
      value: o,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = o, e;
  },
      se = Object.assign || function (e) {
    for (var t, o = 1; o < arguments.length; o++) {
      for (var i in t = arguments[o], t) {
        Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
      }
    }

    return e;
  },
      de = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'],
      ae = de.slice(3),
      fe = {
    FLIP: 'flip',
    CLOCKWISE: 'clockwise',
    COUNTERCLOCKWISE: 'counterclockwise'
  },
      le = function () {
    function t(o, i) {
      var n = this,
          r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
      ne(this, t), this.scheduleUpdate = function () {
        return requestAnimationFrame(n.update);
      }, this.update = oe(this.update.bind(this)), this.options = se({}, t.Defaults, r), this.state = {
        isDestroyed: !1,
        isCreated: !1,
        scrollParents: []
      }, this.reference = o.jquery ? o[0] : o, this.popper = i.jquery ? i[0] : i, this.options.modifiers = {}, Object.keys(se({}, t.Defaults.modifiers, r.modifiers)).forEach(function (e) {
        n.options.modifiers[e] = se({}, t.Defaults.modifiers[e] || {}, r.modifiers ? r.modifiers[e] : {});
      }), this.modifiers = Object.keys(this.options.modifiers).map(function (e) {
        return se({
          name: e
        }, n.options.modifiers[e]);
      }).sort(function (e, t) {
        return e.order - t.order;
      }), this.modifiers.forEach(function (t) {
        t.enabled && e(t.onLoad) && t.onLoad(n.reference, n.popper, n.options, t, n.state);
      }), this.update();
      var p = this.options.eventsEnabled;
      p && this.enableEventListeners(), this.state.eventsEnabled = p;
    }

    return re(t, [{
      key: 'update',
      value: function value() {
        return k.call(this);
      }
    }, {
      key: 'destroy',
      value: function value() {
        return D.call(this);
      }
    }, {
      key: 'enableEventListeners',
      value: function value() {
        return A.call(this);
      }
    }, {
      key: 'disableEventListeners',
      value: function value() {
        return I.call(this);
      }
    }]), t;
  }();

  return le.Utils = ('undefined' == typeof window ? global : window).PopperUtils, le.placements = de, le.Defaults = {
    placement: 'bottom',
    eventsEnabled: !0,
    removeOnDestroy: !1,
    onCreate: function onCreate() {},
    onUpdate: function onUpdate() {},
    modifiers: {
      shift: {
        order: 100,
        enabled: !0,
        fn: function fn(e) {
          var t = e.placement,
              o = t.split('-')[0],
              i = t.split('-')[1];

          if (i) {
            var n = e.offsets,
                r = n.reference,
                p = n.popper,
                s = -1 !== ['bottom', 'top'].indexOf(o),
                d = s ? 'left' : 'top',
                a = s ? 'width' : 'height',
                f = {
              start: pe({}, d, r[d]),
              end: pe({}, d, r[d] + r[a] - p[a])
            };
            e.offsets.popper = se({}, p, f[i]);
          }

          return e;
        }
      },
      offset: {
        order: 200,
        enabled: !0,
        fn: function fn(e, t) {
          var o,
              i = t.offset,
              n = e.placement,
              r = e.offsets,
              p = r.popper,
              s = r.reference,
              d = n.split('-')[0];
          return o = R(+i) ? [+i, 0] : G(i, p, s, d), 'left' === d ? (p.top += o[0], p.left -= o[1]) : 'right' === d ? (p.top += o[0], p.left += o[1]) : 'top' === d ? (p.left += o[0], p.top -= o[1]) : 'bottom' === d && (p.left += o[0], p.top += o[1]), e.popper = p, e;
        },
        offset: 0
      },
      preventOverflow: {
        order: 300,
        enabled: !0,
        fn: function fn(e, t) {
          var o = t.boundariesElement || r(e.instance.popper);
          e.instance.reference === o && (o = r(o));
          var i = w(e.instance.popper, e.instance.reference, t.padding, o);
          t.boundaries = i;
          var n = t.priority,
              p = e.offsets.popper,
              s = {
            primary: function primary(e) {
              var o = p[e];
              return p[e] < i[e] && !t.escapeWithReference && (o = _(p[e], i[e])), pe({}, e, o);
            },
            secondary: function secondary(e) {
              var o = 'right' === e ? 'left' : 'top',
                  n = p[o];
              return p[e] > i[e] && !t.escapeWithReference && (n = z(p[o], i[e] - ('right' === e ? p.width : p.height))), pe({}, o, n);
            }
          };
          return n.forEach(function (e) {
            var t = -1 === ['left', 'top'].indexOf(e) ? 'secondary' : 'primary';
            p = se({}, p, s[t](e));
          }), e.offsets.popper = p, e;
        },
        priority: ['left', 'right', 'top', 'bottom'],
        padding: 5,
        boundariesElement: 'scrollParent'
      },
      keepTogether: {
        order: 400,
        enabled: !0,
        fn: function fn(e) {
          var t = e.offsets,
              o = t.popper,
              i = t.reference,
              n = e.placement.split('-')[0],
              r = V,
              p = -1 !== ['top', 'bottom'].indexOf(n),
              s = p ? 'right' : 'bottom',
              d = p ? 'left' : 'top',
              a = p ? 'width' : 'height';
          return o[s] < r(i[d]) && (e.offsets.popper[d] = r(i[d]) - o[a]), o[d] > r(i[s]) && (e.offsets.popper[d] = r(i[s])), e;
        }
      },
      arrow: {
        order: 500,
        enabled: !0,
        fn: function fn(e, t) {
          if (!F(e.instance.modifiers, 'arrow', 'keepTogether')) return e;
          var o = t.element;

          if ('string' == typeof o) {
            if (o = e.instance.popper.querySelector(o), !o) return e;
          } else if (!e.instance.popper.contains(o)) return console.warn('WARNING: `arrow.element` must be child of its popper element!'), e;

          var i = e.placement.split('-')[0],
              n = e.offsets,
              r = n.popper,
              p = n.reference,
              s = -1 !== ['left', 'right'].indexOf(i),
              d = s ? 'height' : 'width',
              a = s ? 'top' : 'left',
              f = s ? 'left' : 'top',
              l = s ? 'bottom' : 'right',
              m = O(o)[d];
          p[l] - m < r[a] && (e.offsets.popper[a] -= r[a] - (p[l] - m)), p[a] + m > r[l] && (e.offsets.popper[a] += p[a] + m - r[l]);
          var h = p[a] + p[d] / 2 - m / 2,
              g = h - c(e.offsets.popper)[a];
          return g = _(z(r[d] - m, g), 0), e.arrowElement = o, e.offsets.arrow = {}, e.offsets.arrow[a] = Math.round(g), e.offsets.arrow[f] = '', e;
        },
        element: '[x-arrow]'
      },
      flip: {
        order: 600,
        enabled: !0,
        fn: function fn(e, t) {
          if (W(e.instance.modifiers, 'inner')) return e;
          if (e.flipped && e.placement === e.originalPlacement) return e;
          var o = w(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement),
              i = e.placement.split('-')[0],
              n = L(i),
              r = e.placement.split('-')[1] || '',
              p = [];

          switch (t.behavior) {
            case fe.FLIP:
              p = [i, n];
              break;

            case fe.CLOCKWISE:
              p = K(i);
              break;

            case fe.COUNTERCLOCKWISE:
              p = K(i, !0);
              break;

            default:
              p = t.behavior;
          }

          return p.forEach(function (s, d) {
            if (i !== s || p.length === d + 1) return e;
            i = e.placement.split('-')[0], n = L(i);
            var a = e.offsets.popper,
                f = e.offsets.reference,
                l = V,
                m = 'left' === i && l(a.right) > l(f.left) || 'right' === i && l(a.left) < l(f.right) || 'top' === i && l(a.bottom) > l(f.top) || 'bottom' === i && l(a.top) < l(f.bottom),
                h = l(a.left) < l(o.left),
                c = l(a.right) > l(o.right),
                g = l(a.top) < l(o.top),
                u = l(a.bottom) > l(o.bottom),
                b = 'left' === i && h || 'right' === i && c || 'top' === i && g || 'bottom' === i && u,
                y = -1 !== ['top', 'bottom'].indexOf(i),
                w = !!t.flipVariations && (y && 'start' === r && h || y && 'end' === r && c || !y && 'start' === r && g || !y && 'end' === r && u);
            (m || b || w) && (e.flipped = !0, (m || b) && (i = p[d + 1]), w && (r = j(r)), e.placement = i + (r ? '-' + r : ''), e.offsets.popper = se({}, e.offsets.popper, S(e.instance.popper, e.offsets.reference, e.placement)), e = N(e.instance.modifiers, e, 'flip'));
          }), e;
        },
        behavior: 'flip',
        padding: 5,
        boundariesElement: 'viewport'
      },
      inner: {
        order: 700,
        enabled: !1,
        fn: function fn(e) {
          var t = e.placement,
              o = t.split('-')[0],
              i = e.offsets,
              n = i.popper,
              r = i.reference,
              p = -1 !== ['left', 'right'].indexOf(o),
              s = -1 === ['top', 'left'].indexOf(o);
          return n[p ? 'left' : 'top'] = r[t] - (s ? n[p ? 'width' : 'height'] : 0), e.placement = L(t), e.offsets.popper = c(n), e;
        }
      },
      hide: {
        order: 800,
        enabled: !0,
        fn: function fn(e) {
          if (!F(e.instance.modifiers, 'hide', 'preventOverflow')) return e;
          var t = e.offsets.reference,
              o = T(e.instance.modifiers, function (e) {
            return 'preventOverflow' === e.name;
          }).boundaries;

          if (t.bottom < o.top || t.left > o.right || t.top > o.bottom || t.right < o.left) {
            if (!0 === e.hide) return e;
            e.hide = !0, e.attributes['x-out-of-boundaries'] = '';
          } else {
            if (!1 === e.hide) return e;
            e.hide = !1, e.attributes['x-out-of-boundaries'] = !1;
          }

          return e;
        }
      },
      computeStyle: {
        order: 850,
        enabled: !0,
        fn: function fn(e, t) {
          var o = t.x,
              i = t.y,
              n = e.offsets.popper,
              p = T(e.instance.modifiers, function (e) {
            return 'applyStyle' === e.name;
          }).gpuAcceleration;
          void 0 !== p && console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
          var s,
              d,
              a = void 0 === p ? t.gpuAcceleration : p,
              f = r(e.instance.popper),
              l = g(f),
              m = {
            position: n.position
          },
              h = {
            left: V(n.left),
            top: V(n.top),
            bottom: V(n.bottom),
            right: V(n.right)
          },
              c = 'bottom' === o ? 'top' : 'bottom',
              u = 'right' === i ? 'left' : 'right',
              b = B('transform');
          if (d = 'bottom' == c ? -l.height + h.bottom : h.top, s = 'right' == u ? -l.width + h.right : h.left, a && b) m[b] = 'translate3d(' + s + 'px, ' + d + 'px, 0)', m[c] = 0, m[u] = 0, m.willChange = 'transform';else {
            var y = 'bottom' == c ? -1 : 1,
                w = 'right' == u ? -1 : 1;
            m[c] = d * y, m[u] = s * w, m.willChange = c + ', ' + u;
          }
          var v = {
            "x-placement": e.placement
          };
          return e.attributes = se({}, v, e.attributes), e.styles = se({}, m, e.styles), e;
        },
        gpuAcceleration: !0,
        x: 'bottom',
        y: 'right'
      },
      applyStyle: {
        order: 900,
        enabled: !0,
        fn: function fn(e) {
          return U(e.instance.popper, e.styles), Y(e.instance.popper, e.attributes), e.offsets.arrow && U(e.arrowElement, e.offsets.arrow), e;
        },
        onLoad: function onLoad(e, t, o, i, n) {
          var r = x(n, t, e),
              p = E(o.placement, r, t, e, o.modifiers.flip.boundariesElement, o.modifiers.flip.padding);
          return t.setAttribute('x-placement', p), U(t, {
            position: 'absolute'
          }), o;
        },
        gpuAcceleration: void 0
      }
    }
  }, le;
}); //! moment.js
//! version : 2.14.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com


!function (a, b) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof2(exports)) && "undefined" != typeof module ? module.exports = b() : "function" == typeof define && define.amd ? define(b) : a.moment = b();
}(this, function () {
  "use strict";

  function a() {
    return md.apply(null, arguments);
  } // This is done to register the method called with moment()
  // without creating circular dependencies.


  function b(a) {
    md = a;
  }

  function c(a) {
    return a instanceof Array || "[object Array]" === Object.prototype.toString.call(a);
  }

  function d(a) {
    return "[object Object]" === Object.prototype.toString.call(a);
  }

  function e(a) {
    var b;

    for (b in a) {
      // even if its not own property I'd still call it non-empty
      return !1;
    }

    return !0;
  }

  function f(a) {
    return a instanceof Date || "[object Date]" === Object.prototype.toString.call(a);
  }

  function g(a, b) {
    var c,
        d = [];

    for (c = 0; c < a.length; ++c) {
      d.push(b(a[c], c));
    }

    return d;
  }

  function h(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
  }

  function i(a, b) {
    for (var c in b) {
      h(b, c) && (a[c] = b[c]);
    }

    return h(b, "toString") && (a.toString = b.toString), h(b, "valueOf") && (a.valueOf = b.valueOf), a;
  }

  function j(a, b, c, d) {
    return qb(a, b, c, d, !0).utc();
  }

  function k() {
    // We need to deep clone this object.
    return {
      empty: !1,
      unusedTokens: [],
      unusedInput: [],
      overflow: -2,
      charsLeftOver: 0,
      nullInput: !1,
      invalidMonth: null,
      invalidFormat: !1,
      userInvalidated: !1,
      iso: !1,
      parsedDateParts: [],
      meridiem: null
    };
  }

  function l(a) {
    return null == a._pf && (a._pf = k()), a._pf;
  }

  function m(a) {
    if (null == a._isValid) {
      var b = l(a),
          c = nd.call(b.parsedDateParts, function (a) {
        return null != a;
      });
      a._isValid = !isNaN(a._d.getTime()) && b.overflow < 0 && !b.empty && !b.invalidMonth && !b.invalidWeekday && !b.nullInput && !b.invalidFormat && !b.userInvalidated && (!b.meridiem || b.meridiem && c), a._strict && (a._isValid = a._isValid && 0 === b.charsLeftOver && 0 === b.unusedTokens.length && void 0 === b.bigHour);
    }

    return a._isValid;
  }

  function n(a) {
    var b = j(NaN);
    return null != a ? i(l(b), a) : l(b).userInvalidated = !0, b;
  }

  function o(a) {
    return void 0 === a;
  }

  function p(a, b) {
    var c, d, e;
    if (o(b._isAMomentObject) || (a._isAMomentObject = b._isAMomentObject), o(b._i) || (a._i = b._i), o(b._f) || (a._f = b._f), o(b._l) || (a._l = b._l), o(b._strict) || (a._strict = b._strict), o(b._tzm) || (a._tzm = b._tzm), o(b._isUTC) || (a._isUTC = b._isUTC), o(b._offset) || (a._offset = b._offset), o(b._pf) || (a._pf = l(b)), o(b._locale) || (a._locale = b._locale), od.length > 0) for (c in od) {
      d = od[c], e = b[d], o(e) || (a[d] = e);
    }
    return a;
  } // Moment prototype object


  function q(b) {
    p(this, b), this._d = new Date(null != b._d ? b._d.getTime() : NaN), pd === !1 && (pd = !0, a.updateOffset(this), pd = !1);
  }

  function r(a) {
    return a instanceof q || null != a && null != a._isAMomentObject;
  }

  function s(a) {
    return 0 > a ? Math.ceil(a) || 0 : Math.floor(a);
  }

  function t(a) {
    var b = +a,
        c = 0;
    return 0 !== b && isFinite(b) && (c = s(b)), c;
  } // compare two arrays, return the number of differences


  function u(a, b, c) {
    var d,
        e = Math.min(a.length, b.length),
        f = Math.abs(a.length - b.length),
        g = 0;

    for (d = 0; e > d; d++) {
      (c && a[d] !== b[d] || !c && t(a[d]) !== t(b[d])) && g++;
    }

    return g + f;
  }

  function v(b) {
    a.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + b);
  }

  function w(b, c) {
    var d = !0;
    return i(function () {
      return null != a.deprecationHandler && a.deprecationHandler(null, b), d && (v(b + "\nArguments: " + Array.prototype.slice.call(arguments).join(", ") + "\n" + new Error().stack), d = !1), c.apply(this, arguments);
    }, c);
  }

  function x(b, c) {
    null != a.deprecationHandler && a.deprecationHandler(b, c), qd[b] || (v(c), qd[b] = !0);
  }

  function y(a) {
    return a instanceof Function || "[object Function]" === Object.prototype.toString.call(a);
  }

  function z(a) {
    var b, c;

    for (c in a) {
      b = a[c], y(b) ? this[c] = b : this["_" + c] = b;
    }

    this._config = a, // Lenient ordinal parsing accepts just a number in addition to
    // number + (possibly) stuff coming from _ordinalParseLenient.
    this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source);
  }

  function A(a, b) {
    var c,
        e = i({}, a);

    for (c in b) {
      h(b, c) && (d(a[c]) && d(b[c]) ? (e[c] = {}, i(e[c], a[c]), i(e[c], b[c])) : null != b[c] ? e[c] = b[c] : delete e[c]);
    }

    for (c in a) {
      h(a, c) && !h(b, c) && d(a[c]) && ( // make sure changes to properties don't modify parent config
      e[c] = i({}, e[c]));
    }

    return e;
  }

  function B(a) {
    null != a && this.set(a);
  }

  function C(a, b, c) {
    var d = this._calendar[a] || this._calendar.sameElse;
    return y(d) ? d.call(b, c) : d;
  }

  function D(a) {
    var b = this._longDateFormat[a],
        c = this._longDateFormat[a.toUpperCase()];

    return b || !c ? b : (this._longDateFormat[a] = c.replace(/MMMM|MM|DD|dddd/g, function (a) {
      return a.slice(1);
    }), this._longDateFormat[a]);
  }

  function E() {
    return this._invalidDate;
  }

  function F(a) {
    return this._ordinal.replace("%d", a);
  }

  function G(a, b, c, d) {
    var e = this._relativeTime[c];
    return y(e) ? e(a, b, c, d) : e.replace(/%d/i, a);
  }

  function H(a, b) {
    var c = this._relativeTime[a > 0 ? "future" : "past"];
    return y(c) ? c(b) : c.replace(/%s/i, b);
  }

  function I(a, b) {
    var c = a.toLowerCase();
    zd[c] = zd[c + "s"] = zd[b] = a;
  }

  function J(a) {
    return "string" == typeof a ? zd[a] || zd[a.toLowerCase()] : void 0;
  }

  function K(a) {
    var b,
        c,
        d = {};

    for (c in a) {
      h(a, c) && (b = J(c), b && (d[b] = a[c]));
    }

    return d;
  }

  function L(a, b) {
    Ad[a] = b;
  }

  function M(a) {
    var b = [];

    for (var c in a) {
      b.push({
        unit: c,
        priority: Ad[c]
      });
    }

    return b.sort(function (a, b) {
      return a.priority - b.priority;
    }), b;
  }

  function N(b, c) {
    return function (d) {
      return null != d ? (P(this, b, d), a.updateOffset(this, c), this) : O(this, b);
    };
  }

  function O(a, b) {
    return a.isValid() ? a._d["get" + (a._isUTC ? "UTC" : "") + b]() : NaN;
  }

  function P(a, b, c) {
    a.isValid() && a._d["set" + (a._isUTC ? "UTC" : "") + b](c);
  } // MOMENTS


  function Q(a) {
    return a = J(a), y(this[a]) ? this[a]() : this;
  }

  function R(a, b) {
    if ("object" == _typeof2(a)) {
      a = K(a);

      for (var c = M(a), d = 0; d < c.length; d++) {
        this[c[d].unit](a[c[d].unit]);
      }
    } else if (a = J(a), y(this[a])) return this[a](b);

    return this;
  }

  function S(a, b, c) {
    var d = "" + Math.abs(a),
        e = b - d.length,
        f = a >= 0;
    return (f ? c ? "+" : "" : "-") + Math.pow(10, Math.max(0, e)).toString().substr(1) + d;
  } // token:    'M'
  // padded:   ['MM', 2]
  // ordinal:  'Mo'
  // callback: function () { this.month() + 1 }


  function T(a, b, c, d) {
    var e = d;
    "string" == typeof d && (e = function e() {
      return this[d]();
    }), a && (Ed[a] = e), b && (Ed[b[0]] = function () {
      return S(e.apply(this, arguments), b[1], b[2]);
    }), c && (Ed[c] = function () {
      return this.localeData().ordinal(e.apply(this, arguments), a);
    });
  }

  function U(a) {
    return a.match(/\[[\s\S]/) ? a.replace(/^\[|\]$/g, "") : a.replace(/\\/g, "");
  }

  function V(a) {
    var b,
        c,
        d = a.match(Bd);

    for (b = 0, c = d.length; c > b; b++) {
      Ed[d[b]] ? d[b] = Ed[d[b]] : d[b] = U(d[b]);
    }

    return function (b) {
      var e,
          f = "";

      for (e = 0; c > e; e++) {
        f += d[e] instanceof Function ? d[e].call(b, a) : d[e];
      }

      return f;
    };
  } // format date using native date object


  function W(a, b) {
    return a.isValid() ? (b = X(b, a.localeData()), Dd[b] = Dd[b] || V(b), Dd[b](a)) : a.localeData().invalidDate();
  }

  function X(a, b) {
    function c(a) {
      return b.longDateFormat(a) || a;
    }

    var d = 5;

    for (Cd.lastIndex = 0; d >= 0 && Cd.test(a);) {
      a = a.replace(Cd, c), Cd.lastIndex = 0, d -= 1;
    }

    return a;
  }

  function Y(a, b, c) {
    Wd[a] = y(b) ? b : function (a, d) {
      return a && c ? c : b;
    };
  }

  function Z(a, b) {
    return h(Wd, a) ? Wd[a](b._strict, b._locale) : new RegExp($(a));
  } // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript


  function $(a) {
    return _(a.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (a, b, c, d, e) {
      return b || c || d || e;
    }));
  }

  function _(a) {
    return a.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  }

  function aa(a, b) {
    var c,
        d = b;

    for ("string" == typeof a && (a = [a]), "number" == typeof b && (d = function d(a, c) {
      c[b] = t(a);
    }), c = 0; c < a.length; c++) {
      Xd[a[c]] = d;
    }
  }

  function ba(a, b) {
    aa(a, function (a, c, d, e) {
      d._w = d._w || {}, b(a, d._w, d, e);
    });
  }

  function ca(a, b, c) {
    null != b && h(Xd, a) && Xd[a](b, c._a, c, a);
  }

  function da(a, b) {
    return new Date(Date.UTC(a, b + 1, 0)).getUTCDate();
  }

  function ea(a, b) {
    return c(this._months) ? this._months[a.month()] : this._months[(this._months.isFormat || fe).test(b) ? "format" : "standalone"][a.month()];
  }

  function fa(a, b) {
    return c(this._monthsShort) ? this._monthsShort[a.month()] : this._monthsShort[fe.test(b) ? "format" : "standalone"][a.month()];
  }

  function ga(a, b, c) {
    var d,
        e,
        f,
        g = a.toLocaleLowerCase();
    if (!this._monthsParse) for ( // this is not used
    this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], d = 0; 12 > d; ++d) {
      f = j([2e3, d]), this._shortMonthsParse[d] = this.monthsShort(f, "").toLocaleLowerCase(), this._longMonthsParse[d] = this.months(f, "").toLocaleLowerCase();
    }
    return c ? "MMM" === b ? (e = sd.call(this._shortMonthsParse, g), -1 !== e ? e : null) : (e = sd.call(this._longMonthsParse, g), -1 !== e ? e : null) : "MMM" === b ? (e = sd.call(this._shortMonthsParse, g), -1 !== e ? e : (e = sd.call(this._longMonthsParse, g), -1 !== e ? e : null)) : (e = sd.call(this._longMonthsParse, g), -1 !== e ? e : (e = sd.call(this._shortMonthsParse, g), -1 !== e ? e : null));
  }

  function ha(a, b, c) {
    var d, e, f;
    if (this._monthsParseExact) return ga.call(this, a, b, c); // TODO: add sorting
    // Sorting makes sure if one month (or abbr) is a prefix of another
    // see sorting in computeMonthsParse

    for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), d = 0; 12 > d; d++) {
      // test the regex
      if (e = j([2e3, d]), c && !this._longMonthsParse[d] && (this._longMonthsParse[d] = new RegExp("^" + this.months(e, "").replace(".", "") + "$", "i"), this._shortMonthsParse[d] = new RegExp("^" + this.monthsShort(e, "").replace(".", "") + "$", "i")), c || this._monthsParse[d] || (f = "^" + this.months(e, "") + "|^" + this.monthsShort(e, ""), this._monthsParse[d] = new RegExp(f.replace(".", ""), "i")), c && "MMMM" === b && this._longMonthsParse[d].test(a)) return d;
      if (c && "MMM" === b && this._shortMonthsParse[d].test(a)) return d;
      if (!c && this._monthsParse[d].test(a)) return d;
    }
  } // MOMENTS


  function ia(a, b) {
    var c;
    if (!a.isValid()) // No op
      return a;
    if ("string" == typeof b) if (/^\d+$/.test(b)) b = t(b);else // TODO: Another silent failure?
      if (b = a.localeData().monthsParse(b), "number" != typeof b) return a;
    return c = Math.min(a.date(), da(a.year(), b)), a._d["set" + (a._isUTC ? "UTC" : "") + "Month"](b, c), a;
  }

  function ja(b) {
    return null != b ? (ia(this, b), a.updateOffset(this, !0), this) : O(this, "Month");
  }

  function ka() {
    return da(this.year(), this.month());
  }

  function la(a) {
    return this._monthsParseExact ? (h(this, "_monthsRegex") || na.call(this), a ? this._monthsShortStrictRegex : this._monthsShortRegex) : (h(this, "_monthsShortRegex") || (this._monthsShortRegex = ie), this._monthsShortStrictRegex && a ? this._monthsShortStrictRegex : this._monthsShortRegex);
  }

  function ma(a) {
    return this._monthsParseExact ? (h(this, "_monthsRegex") || na.call(this), a ? this._monthsStrictRegex : this._monthsRegex) : (h(this, "_monthsRegex") || (this._monthsRegex = je), this._monthsStrictRegex && a ? this._monthsStrictRegex : this._monthsRegex);
  }

  function na() {
    function a(a, b) {
      return b.length - a.length;
    }

    var b,
        c,
        d = [],
        e = [],
        f = [];

    for (b = 0; 12 > b; b++) {
      c = j([2e3, b]), d.push(this.monthsShort(c, "")), e.push(this.months(c, "")), f.push(this.months(c, "")), f.push(this.monthsShort(c, ""));
    }

    for ( // Sorting makes sure if one month (or abbr) is a prefix of another it
    // will match the longer piece.
    d.sort(a), e.sort(a), f.sort(a), b = 0; 12 > b; b++) {
      d[b] = _(d[b]), e[b] = _(e[b]);
    }

    for (b = 0; 24 > b; b++) {
      f[b] = _(f[b]);
    }

    this._monthsRegex = new RegExp("^(" + f.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + e.join("|") + ")", "i"), this._monthsShortStrictRegex = new RegExp("^(" + d.join("|") + ")", "i");
  } // HELPERS


  function oa(a) {
    return pa(a) ? 366 : 365;
  }

  function pa(a) {
    return a % 4 === 0 && a % 100 !== 0 || a % 400 === 0;
  }

  function qa() {
    return pa(this.year());
  }

  function ra(a, b, c, d, e, f, g) {
    //can't just apply() to create a date:
    //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
    var h = new Date(a, b, c, d, e, f, g); //the date constructor remaps years 0-99 to 1900-1999

    return 100 > a && a >= 0 && isFinite(h.getFullYear()) && h.setFullYear(a), h;
  }

  function sa(a) {
    var b = new Date(Date.UTC.apply(null, arguments)); //the Date.UTC function remaps years 0-99 to 1900-1999

    return 100 > a && a >= 0 && isFinite(b.getUTCFullYear()) && b.setUTCFullYear(a), b;
  } // start-of-first-week - start-of-year


  function ta(a, b, c) {
    var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
    d = 7 + b - c,
        // first-week day local weekday -- which local weekday is fwd
    e = (7 + sa(a, 0, d).getUTCDay() - b) % 7;
    return -e + d - 1;
  } //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday


  function ua(a, b, c, d, e) {
    var f,
        g,
        h = (7 + c - d) % 7,
        i = ta(a, d, e),
        j = 1 + 7 * (b - 1) + h + i;
    return 0 >= j ? (f = a - 1, g = oa(f) + j) : j > oa(a) ? (f = a + 1, g = j - oa(a)) : (f = a, g = j), {
      year: f,
      dayOfYear: g
    };
  }

  function va(a, b, c) {
    var d,
        e,
        f = ta(a.year(), b, c),
        g = Math.floor((a.dayOfYear() - f - 1) / 7) + 1;
    return 1 > g ? (e = a.year() - 1, d = g + wa(e, b, c)) : g > wa(a.year(), b, c) ? (d = g - wa(a.year(), b, c), e = a.year() + 1) : (e = a.year(), d = g), {
      week: d,
      year: e
    };
  }

  function wa(a, b, c) {
    var d = ta(a, b, c),
        e = ta(a + 1, b, c);
    return (oa(a) - d + e) / 7;
  } // HELPERS
  // LOCALES


  function xa(a) {
    return va(a, this._week.dow, this._week.doy).week;
  }

  function ya() {
    return this._week.dow;
  }

  function za() {
    return this._week.doy;
  } // MOMENTS


  function Aa(a) {
    var b = this.localeData().week(this);
    return null == a ? b : this.add(7 * (a - b), "d");
  }

  function Ba(a) {
    var b = va(this, 1, 4).week;
    return null == a ? b : this.add(7 * (a - b), "d");
  } // HELPERS


  function Ca(a, b) {
    return "string" != typeof a ? a : isNaN(a) ? (a = b.weekdaysParse(a), "number" == typeof a ? a : null) : parseInt(a, 10);
  }

  function Da(a, b) {
    return "string" == typeof a ? b.weekdaysParse(a) % 7 || 7 : isNaN(a) ? null : a;
  }

  function Ea(a, b) {
    return c(this._weekdays) ? this._weekdays[a.day()] : this._weekdays[this._weekdays.isFormat.test(b) ? "format" : "standalone"][a.day()];
  }

  function Fa(a) {
    return this._weekdaysShort[a.day()];
  }

  function Ga(a) {
    return this._weekdaysMin[a.day()];
  }

  function Ha(a, b, c) {
    var d,
        e,
        f,
        g = a.toLocaleLowerCase();
    if (!this._weekdaysParse) for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], d = 0; 7 > d; ++d) {
      f = j([2e3, 1]).day(d), this._minWeekdaysParse[d] = this.weekdaysMin(f, "").toLocaleLowerCase(), this._shortWeekdaysParse[d] = this.weekdaysShort(f, "").toLocaleLowerCase(), this._weekdaysParse[d] = this.weekdays(f, "").toLocaleLowerCase();
    }
    return c ? "dddd" === b ? (e = sd.call(this._weekdaysParse, g), -1 !== e ? e : null) : "ddd" === b ? (e = sd.call(this._shortWeekdaysParse, g), -1 !== e ? e : null) : (e = sd.call(this._minWeekdaysParse, g), -1 !== e ? e : null) : "dddd" === b ? (e = sd.call(this._weekdaysParse, g), -1 !== e ? e : (e = sd.call(this._shortWeekdaysParse, g), -1 !== e ? e : (e = sd.call(this._minWeekdaysParse, g), -1 !== e ? e : null))) : "ddd" === b ? (e = sd.call(this._shortWeekdaysParse, g), -1 !== e ? e : (e = sd.call(this._weekdaysParse, g), -1 !== e ? e : (e = sd.call(this._minWeekdaysParse, g), -1 !== e ? e : null))) : (e = sd.call(this._minWeekdaysParse, g), -1 !== e ? e : (e = sd.call(this._weekdaysParse, g), -1 !== e ? e : (e = sd.call(this._shortWeekdaysParse, g), -1 !== e ? e : null)));
  }

  function Ia(a, b, c) {
    var d, e, f;
    if (this._weekdaysParseExact) return Ha.call(this, a, b, c);

    for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), d = 0; 7 > d; d++) {
      // test the regex
      if (e = j([2e3, 1]).day(d), c && !this._fullWeekdaysParse[d] && (this._fullWeekdaysParse[d] = new RegExp("^" + this.weekdays(e, "").replace(".", ".?") + "$", "i"), this._shortWeekdaysParse[d] = new RegExp("^" + this.weekdaysShort(e, "").replace(".", ".?") + "$", "i"), this._minWeekdaysParse[d] = new RegExp("^" + this.weekdaysMin(e, "").replace(".", ".?") + "$", "i")), this._weekdaysParse[d] || (f = "^" + this.weekdays(e, "") + "|^" + this.weekdaysShort(e, "") + "|^" + this.weekdaysMin(e, ""), this._weekdaysParse[d] = new RegExp(f.replace(".", ""), "i")), c && "dddd" === b && this._fullWeekdaysParse[d].test(a)) return d;
      if (c && "ddd" === b && this._shortWeekdaysParse[d].test(a)) return d;
      if (c && "dd" === b && this._minWeekdaysParse[d].test(a)) return d;
      if (!c && this._weekdaysParse[d].test(a)) return d;
    }
  } // MOMENTS


  function Ja(a) {
    if (!this.isValid()) return null != a ? this : NaN;
    var b = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
    return null != a ? (a = Ca(a, this.localeData()), this.add(a - b, "d")) : b;
  }

  function Ka(a) {
    if (!this.isValid()) return null != a ? this : NaN;
    var b = (this.day() + 7 - this.localeData()._week.dow) % 7;
    return null == a ? b : this.add(a - b, "d");
  }

  function La(a) {
    if (!this.isValid()) return null != a ? this : NaN; // behaves the same as moment#day except
    // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
    // as a setter, sunday should belong to the previous week.

    if (null != a) {
      var b = Da(a, this.localeData());
      return this.day(this.day() % 7 ? b : b - 7);
    }

    return this.day() || 7;
  }

  function Ma(a) {
    return this._weekdaysParseExact ? (h(this, "_weekdaysRegex") || Pa.call(this), a ? this._weekdaysStrictRegex : this._weekdaysRegex) : (h(this, "_weekdaysRegex") || (this._weekdaysRegex = pe), this._weekdaysStrictRegex && a ? this._weekdaysStrictRegex : this._weekdaysRegex);
  }

  function Na(a) {
    return this._weekdaysParseExact ? (h(this, "_weekdaysRegex") || Pa.call(this), a ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (h(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = qe), this._weekdaysShortStrictRegex && a ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex);
  }

  function Oa(a) {
    return this._weekdaysParseExact ? (h(this, "_weekdaysRegex") || Pa.call(this), a ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (h(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = re), this._weekdaysMinStrictRegex && a ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex);
  }

  function Pa() {
    function a(a, b) {
      return b.length - a.length;
    }

    var b,
        c,
        d,
        e,
        f,
        g = [],
        h = [],
        i = [],
        k = [];

    for (b = 0; 7 > b; b++) {
      c = j([2e3, 1]).day(b), d = this.weekdaysMin(c, ""), e = this.weekdaysShort(c, ""), f = this.weekdays(c, ""), g.push(d), h.push(e), i.push(f), k.push(d), k.push(e), k.push(f);
    }

    for ( // Sorting makes sure if one weekday (or abbr) is a prefix of another it
    // will match the longer piece.
    g.sort(a), h.sort(a), i.sort(a), k.sort(a), b = 0; 7 > b; b++) {
      h[b] = _(h[b]), i[b] = _(i[b]), k[b] = _(k[b]);
    }

    this._weekdaysRegex = new RegExp("^(" + k.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp("^(" + i.join("|") + ")", "i"), this._weekdaysShortStrictRegex = new RegExp("^(" + h.join("|") + ")", "i"), this._weekdaysMinStrictRegex = new RegExp("^(" + g.join("|") + ")", "i");
  } // FORMATTING


  function Qa() {
    return this.hours() % 12 || 12;
  }

  function Ra() {
    return this.hours() || 24;
  }

  function Sa(a, b) {
    T(a, 0, 0, function () {
      return this.localeData().meridiem(this.hours(), this.minutes(), b);
    });
  } // PARSING


  function Ta(a, b) {
    return b._meridiemParse;
  } // LOCALES


  function Ua(a) {
    // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
    // Using charAt should be more compatible.
    return "p" === (a + "").toLowerCase().charAt(0);
  }

  function Va(a, b, c) {
    return a > 11 ? c ? "pm" : "PM" : c ? "am" : "AM";
  }

  function Wa(a) {
    return a ? a.toLowerCase().replace("_", "-") : a;
  } // pick the locale from the array
  // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
  // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root


  function Xa(a) {
    for (var b, c, d, e, f = 0; f < a.length;) {
      for (e = Wa(a[f]).split("-"), b = e.length, c = Wa(a[f + 1]), c = c ? c.split("-") : null; b > 0;) {
        if (d = Ya(e.slice(0, b).join("-"))) return d;
        if (c && c.length >= b && u(e, c, !0) >= b - 1) //the next array item is better than a shallower substring of this one
          break;
        b--;
      }

      f++;
    }

    return null;
  }

  function Ya(a) {
    var b = null; // TODO: Find a better way to register and load all the locales in Node

    if (!we[a] && "undefined" != typeof module && module && module.exports) try {
      b = se._abbr, require("./locale/" + a), // because defineLocale currently also sets the global locale, we
      // want to undo that for lazy loaded locales
      Za(b);
    } catch (c) {}
    return we[a];
  } // This function will load locale and then set the global locale.  If
  // no arguments are passed in, it will simply return the current global
  // locale key.


  function Za(a, b) {
    var c; // moment.duration._locale = moment._locale = data;

    return a && (c = o(b) ? ab(a) : $a(a, b), c && (se = c)), se._abbr;
  }

  function $a(a, b) {
    if (null !== b) {
      var c = ve; // treat as if there is no base config
      // backwards compat for now: also set the locale

      return b.abbr = a, null != we[a] ? (x("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."), c = we[a]._config) : null != b.parentLocale && (null != we[b.parentLocale] ? c = we[b.parentLocale]._config : x("parentLocaleUndefined", "specified parentLocale is not defined yet. See http://momentjs.com/guides/#/warnings/parent-locale/")), we[a] = new B(A(c, b)), Za(a), we[a];
    } // useful for testing


    return delete we[a], null;
  }

  function _a(a, b) {
    if (null != b) {
      var c,
          d = ve; // MERGE

      null != we[a] && (d = we[a]._config), b = A(d, b), c = new B(b), c.parentLocale = we[a], we[a] = c, // backwards compat for now: also set the locale
      Za(a);
    } else // pass null for config to unupdate, useful for tests
      null != we[a] && (null != we[a].parentLocale ? we[a] = we[a].parentLocale : null != we[a] && delete we[a]);

    return we[a];
  } // returns locale data


  function ab(a) {
    var b;
    if (a && a._locale && a._locale._abbr && (a = a._locale._abbr), !a) return se;

    if (!c(a)) {
      if (b = Ya(a)) return b;
      a = [a];
    }

    return Xa(a);
  }

  function bb() {
    return rd(we);
  }

  function cb(a) {
    var b,
        c = a._a;
    return c && -2 === l(a).overflow && (b = c[Zd] < 0 || c[Zd] > 11 ? Zd : c[$d] < 1 || c[$d] > da(c[Yd], c[Zd]) ? $d : c[_d] < 0 || c[_d] > 24 || 24 === c[_d] && (0 !== c[ae] || 0 !== c[be] || 0 !== c[ce]) ? _d : c[ae] < 0 || c[ae] > 59 ? ae : c[be] < 0 || c[be] > 59 ? be : c[ce] < 0 || c[ce] > 999 ? ce : -1, l(a)._overflowDayOfYear && (Yd > b || b > $d) && (b = $d), l(a)._overflowWeeks && -1 === b && (b = de), l(a)._overflowWeekday && -1 === b && (b = ee), l(a).overflow = b), a;
  } // date from iso format


  function db(a) {
    var b,
        c,
        d,
        e,
        f,
        g,
        h = a._i,
        i = xe.exec(h) || ye.exec(h);

    if (i) {
      for (l(a).iso = !0, b = 0, c = Ae.length; c > b; b++) {
        if (Ae[b][1].exec(i[1])) {
          e = Ae[b][0], d = Ae[b][2] !== !1;
          break;
        }
      }

      if (null == e) return void (a._isValid = !1);

      if (i[3]) {
        for (b = 0, c = Be.length; c > b; b++) {
          if (Be[b][1].exec(i[3])) {
            // match[2] should be 'T' or space
            f = (i[2] || " ") + Be[b][0];
            break;
          }
        }

        if (null == f) return void (a._isValid = !1);
      }

      if (!d && null != f) return void (a._isValid = !1);

      if (i[4]) {
        if (!ze.exec(i[4])) return void (a._isValid = !1);
        g = "Z";
      }

      a._f = e + (f || "") + (g || ""), jb(a);
    } else a._isValid = !1;
  } // date from iso format or fallback


  function eb(b) {
    var c = Ce.exec(b._i);
    return null !== c ? void (b._d = new Date(+c[1])) : (db(b), void (b._isValid === !1 && (delete b._isValid, a.createFromInputFallback(b))));
  } // Pick the first defined of two or three arguments.


  function fb(a, b, c) {
    return null != a ? a : null != b ? b : c;
  }

  function gb(b) {
    // hooks is actually the exported moment object
    var c = new Date(a.now());
    return b._useUTC ? [c.getUTCFullYear(), c.getUTCMonth(), c.getUTCDate()] : [c.getFullYear(), c.getMonth(), c.getDate()];
  } // convert an array to a date.
  // the array should mirror the parameters below
  // note: all values past the year are optional and will default to the lowest possible value.
  // [year, month, day , hour, minute, second, millisecond]


  function hb(a) {
    var b,
        c,
        d,
        e,
        f = [];

    if (!a._d) {
      // Default to current date.
      // * if no year, month, day of month are given, default to today
      // * if day of month is given, default month and year
      // * if month is given, default only year
      // * if year is given, don't default anything
      for (d = gb(a), a._w && null == a._a[$d] && null == a._a[Zd] && ib(a), a._dayOfYear && (e = fb(a._a[Yd], d[Yd]), a._dayOfYear > oa(e) && (l(a)._overflowDayOfYear = !0), c = sa(e, 0, a._dayOfYear), a._a[Zd] = c.getUTCMonth(), a._a[$d] = c.getUTCDate()), b = 0; 3 > b && null == a._a[b]; ++b) {
        a._a[b] = f[b] = d[b];
      } // Zero out whatever was not defaulted, including time


      for (; 7 > b; b++) {
        a._a[b] = f[b] = null == a._a[b] ? 2 === b ? 1 : 0 : a._a[b];
      } // Check for 24:00:00.000


      24 === a._a[_d] && 0 === a._a[ae] && 0 === a._a[be] && 0 === a._a[ce] && (a._nextDay = !0, a._a[_d] = 0), a._d = (a._useUTC ? sa : ra).apply(null, f), // Apply timezone offset from input. The actual utcOffset can be changed
      // with parseZone.
      null != a._tzm && a._d.setUTCMinutes(a._d.getUTCMinutes() - a._tzm), a._nextDay && (a._a[_d] = 24);
    }
  }

  function ib(a) {
    var b, c, d, e, f, g, h, i;
    b = a._w, null != b.GG || null != b.W || null != b.E ? (f = 1, g = 4, c = fb(b.GG, a._a[Yd], va(rb(), 1, 4).year), d = fb(b.W, 1), e = fb(b.E, 1), (1 > e || e > 7) && (i = !0)) : (f = a._locale._week.dow, g = a._locale._week.doy, c = fb(b.gg, a._a[Yd], va(rb(), f, g).year), d = fb(b.w, 1), null != b.d ? (e = b.d, (0 > e || e > 6) && (i = !0)) : null != b.e ? (e = b.e + f, (b.e < 0 || b.e > 6) && (i = !0)) : e = f), 1 > d || d > wa(c, f, g) ? l(a)._overflowWeeks = !0 : null != i ? l(a)._overflowWeekday = !0 : (h = ua(c, d, e, f, g), a._a[Yd] = h.year, a._dayOfYear = h.dayOfYear);
  } // date from string and format string


  function jb(b) {
    // TODO: Move this to another part of the creation flow to prevent circular deps
    if (b._f === a.ISO_8601) return void db(b);
    b._a = [], l(b).empty = !0; // This array is used to make a Date, either with `new Date` or `Date.UTC`

    var c,
        d,
        e,
        f,
        g,
        h = "" + b._i,
        i = h.length,
        j = 0;

    for (e = X(b._f, b._locale).match(Bd) || [], c = 0; c < e.length; c++) {
      f = e[c], d = (h.match(Z(f, b)) || [])[0], d && (g = h.substr(0, h.indexOf(d)), g.length > 0 && l(b).unusedInput.push(g), h = h.slice(h.indexOf(d) + d.length), j += d.length), Ed[f] ? (d ? l(b).empty = !1 : l(b).unusedTokens.push(f), ca(f, d, b)) : b._strict && !d && l(b).unusedTokens.push(f);
    } // add remaining unparsed input length to the string


    l(b).charsLeftOver = i - j, h.length > 0 && l(b).unusedInput.push(h), // clear _12h flag if hour is <= 12
    b._a[_d] <= 12 && l(b).bigHour === !0 && b._a[_d] > 0 && (l(b).bigHour = void 0), l(b).parsedDateParts = b._a.slice(0), l(b).meridiem = b._meridiem, // handle meridiem
    b._a[_d] = kb(b._locale, b._a[_d], b._meridiem), hb(b), cb(b);
  }

  function kb(a, b, c) {
    var d; // Fallback

    return null == c ? b : null != a.meridiemHour ? a.meridiemHour(b, c) : null != a.isPM ? (d = a.isPM(c), d && 12 > b && (b += 12), d || 12 !== b || (b = 0), b) : b;
  } // date from string and array of format strings


  function lb(a) {
    var b, c, d, e, f;
    if (0 === a._f.length) return l(a).invalidFormat = !0, void (a._d = new Date(NaN));

    for (e = 0; e < a._f.length; e++) {
      f = 0, b = p({}, a), null != a._useUTC && (b._useUTC = a._useUTC), b._f = a._f[e], jb(b), m(b) && (f += l(b).charsLeftOver, f += 10 * l(b).unusedTokens.length, l(b).score = f, (null == d || d > f) && (d = f, c = b));
    }

    i(a, c || b);
  }

  function mb(a) {
    if (!a._d) {
      var b = K(a._i);
      a._a = g([b.year, b.month, b.day || b.date, b.hour, b.minute, b.second, b.millisecond], function (a) {
        return a && parseInt(a, 10);
      }), hb(a);
    }
  }

  function nb(a) {
    var b = new q(cb(ob(a))); // Adding is smart enough around DST

    return b._nextDay && (b.add(1, "d"), b._nextDay = void 0), b;
  }

  function ob(a) {
    var b = a._i,
        d = a._f;
    return a._locale = a._locale || ab(a._l), null === b || void 0 === d && "" === b ? n({
      nullInput: !0
    }) : ("string" == typeof b && (a._i = b = a._locale.preparse(b)), r(b) ? new q(cb(b)) : (c(d) ? lb(a) : f(b) ? a._d = b : d ? jb(a) : pb(a), m(a) || (a._d = null), a));
  }

  function pb(b) {
    var d = b._i;
    void 0 === d ? b._d = new Date(a.now()) : f(d) ? b._d = new Date(d.valueOf()) : "string" == typeof d ? eb(b) : c(d) ? (b._a = g(d.slice(0), function (a) {
      return parseInt(a, 10);
    }), hb(b)) : "object" == _typeof2(d) ? mb(b) : "number" == typeof d ? // from milliseconds
    b._d = new Date(d) : a.createFromInputFallback(b);
  }

  function qb(a, b, f, g, h) {
    var i = {}; // object construction must be done this way.
    // https://github.com/moment/moment/issues/1423

    return "boolean" == typeof f && (g = f, f = void 0), (d(a) && e(a) || c(a) && 0 === a.length) && (a = void 0), i._isAMomentObject = !0, i._useUTC = i._isUTC = h, i._l = f, i._i = a, i._f = b, i._strict = g, nb(i);
  }

  function rb(a, b, c, d) {
    return qb(a, b, c, d, !1);
  } // Pick a moment m from moments so that m[fn](other) is true for all
  // other. This relies on the function fn to be transitive.
  //
  // moments should either be an array of moment objects or an array, whose
  // first element is an array of moment objects.


  function sb(a, b) {
    var d, e;
    if (1 === b.length && c(b[0]) && (b = b[0]), !b.length) return rb();

    for (d = b[0], e = 1; e < b.length; ++e) {
      b[e].isValid() && !b[e][a](d) || (d = b[e]);
    }

    return d;
  } // TODO: Use [].sort instead?


  function tb() {
    var a = [].slice.call(arguments, 0);
    return sb("isBefore", a);
  }

  function ub() {
    var a = [].slice.call(arguments, 0);
    return sb("isAfter", a);
  }

  function vb(a) {
    var b = K(a),
        c = b.year || 0,
        d = b.quarter || 0,
        e = b.month || 0,
        f = b.week || 0,
        g = b.day || 0,
        h = b.hour || 0,
        i = b.minute || 0,
        j = b.second || 0,
        k = b.millisecond || 0; // representation for dateAddRemove

    this._milliseconds = +k + 1e3 * j + // 1000
    6e4 * i + // 1000 * 60
    1e3 * h * 60 * 60, //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
    // Because of dateAddRemove treats 24 hours as different from a
    // day when working around DST, we need to store them separately
    this._days = +g + 7 * f, // It is impossible translate months into days without knowing
    // which months you are are talking about, so we have to store
    // it separately.
    this._months = +e + 3 * d + 12 * c, this._data = {}, this._locale = ab(), this._bubble();
  }

  function wb(a) {
    return a instanceof vb;
  } // FORMATTING


  function xb(a, b) {
    T(a, 0, 0, function () {
      var a = this.utcOffset(),
          c = "+";
      return 0 > a && (a = -a, c = "-"), c + S(~~(a / 60), 2) + b + S(~~a % 60, 2);
    });
  }

  function yb(a, b) {
    var c = (b || "").match(a) || [],
        d = c[c.length - 1] || [],
        e = (d + "").match(Ge) || ["-", 0, 0],
        f = +(60 * e[1]) + t(e[2]);
    return "+" === e[0] ? f : -f;
  } // Return a moment from input, that is local/utc/zone equivalent to model.


  function zb(b, c) {
    var d, e; // Use low-level api, because this fn is low-level api.

    return c._isUTC ? (d = c.clone(), e = (r(b) || f(b) ? b.valueOf() : rb(b).valueOf()) - d.valueOf(), d._d.setTime(d._d.valueOf() + e), a.updateOffset(d, !1), d) : rb(b).local();
  }

  function Ab(a) {
    // On Firefox.24 Date#getTimezoneOffset returns a floating point.
    // https://github.com/moment/moment/pull/1871
    return 15 * -Math.round(a._d.getTimezoneOffset() / 15);
  } // MOMENTS
  // keepLocalTime = true means only change the timezone, without
  // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
  // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
  // +0200, so we adjust the time as needed, to be valid.
  //
  // Keeping the time actually adds/subtracts (one hour)
  // from the actual represented time. That is why we call updateOffset
  // a second time. In case it wants us to change the offset again
  // _changeInProgress == true case, then we have to adjust, because
  // there is no such time in the given timezone.


  function Bb(b, c) {
    var d,
        e = this._offset || 0;
    return this.isValid() ? null != b ? ("string" == typeof b ? b = yb(Td, b) : Math.abs(b) < 16 && (b = 60 * b), !this._isUTC && c && (d = Ab(this)), this._offset = b, this._isUTC = !0, null != d && this.add(d, "m"), e !== b && (!c || this._changeInProgress ? Sb(this, Mb(b - e, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, a.updateOffset(this, !0), this._changeInProgress = null)), this) : this._isUTC ? e : Ab(this) : null != b ? this : NaN;
  }

  function Cb(a, b) {
    return null != a ? ("string" != typeof a && (a = -a), this.utcOffset(a, b), this) : -this.utcOffset();
  }

  function Db(a) {
    return this.utcOffset(0, a);
  }

  function Eb(a) {
    return this._isUTC && (this.utcOffset(0, a), this._isUTC = !1, a && this.subtract(Ab(this), "m")), this;
  }

  function Fb() {
    return this._tzm ? this.utcOffset(this._tzm) : "string" == typeof this._i && this.utcOffset(yb(Sd, this._i)), this;
  }

  function Gb(a) {
    return this.isValid() ? (a = a ? rb(a).utcOffset() : 0, (this.utcOffset() - a) % 60 === 0) : !1;
  }

  function Hb() {
    return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
  }

  function Ib() {
    if (!o(this._isDSTShifted)) return this._isDSTShifted;
    var a = {};

    if (p(a, this), a = ob(a), a._a) {
      var b = a._isUTC ? j(a._a) : rb(a._a);
      this._isDSTShifted = this.isValid() && u(a._a, b.toArray()) > 0;
    } else this._isDSTShifted = !1;

    return this._isDSTShifted;
  }

  function Jb() {
    return this.isValid() ? !this._isUTC : !1;
  }

  function Kb() {
    return this.isValid() ? this._isUTC : !1;
  }

  function Lb() {
    return this.isValid() ? this._isUTC && 0 === this._offset : !1;
  }

  function Mb(a, b) {
    var c,
        d,
        e,
        f = a,
        // matching against regexp is expensive, do it on demand
    g = null; // checks for null or undefined

    return wb(a) ? f = {
      ms: a._milliseconds,
      d: a._days,
      M: a._months
    } : "number" == typeof a ? (f = {}, b ? f[b] = a : f.milliseconds = a) : (g = He.exec(a)) ? (c = "-" === g[1] ? -1 : 1, f = {
      y: 0,
      d: t(g[$d]) * c,
      h: t(g[_d]) * c,
      m: t(g[ae]) * c,
      s: t(g[be]) * c,
      ms: t(g[ce]) * c
    }) : (g = Ie.exec(a)) ? (c = "-" === g[1] ? -1 : 1, f = {
      y: Nb(g[2], c),
      M: Nb(g[3], c),
      w: Nb(g[4], c),
      d: Nb(g[5], c),
      h: Nb(g[6], c),
      m: Nb(g[7], c),
      s: Nb(g[8], c)
    }) : null == f ? f = {} : "object" == _typeof2(f) && ("from" in f || "to" in f) && (e = Pb(rb(f.from), rb(f.to)), f = {}, f.ms = e.milliseconds, f.M = e.months), d = new vb(f), wb(a) && h(a, "_locale") && (d._locale = a._locale), d;
  }

  function Nb(a, b) {
    // We'd normally use ~~inp for this, but unfortunately it also
    // converts floats to ints.
    // inp may be undefined, so careful calling replace on it.
    var c = a && parseFloat(a.replace(",", ".")); // apply sign while we're at it

    return (isNaN(c) ? 0 : c) * b;
  }

  function Ob(a, b) {
    var c = {
      milliseconds: 0,
      months: 0
    };
    return c.months = b.month() - a.month() + 12 * (b.year() - a.year()), a.clone().add(c.months, "M").isAfter(b) && --c.months, c.milliseconds = +b - +a.clone().add(c.months, "M"), c;
  }

  function Pb(a, b) {
    var c;
    return a.isValid() && b.isValid() ? (b = zb(b, a), a.isBefore(b) ? c = Ob(a, b) : (c = Ob(b, a), c.milliseconds = -c.milliseconds, c.months = -c.months), c) : {
      milliseconds: 0,
      months: 0
    };
  }

  function Qb(a) {
    return 0 > a ? -1 * Math.round(-1 * a) : Math.round(a);
  } // TODO: remove 'name' arg after deprecation is removed


  function Rb(a, b) {
    return function (c, d) {
      var e, f; //invert the arguments, but complain about it

      return null === d || isNaN(+d) || (x(b, "moment()." + b + "(period, number) is deprecated. Please use moment()." + b + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."), f = c, c = d, d = f), c = "string" == typeof c ? +c : c, e = Mb(c, d), Sb(this, e, a), this;
    };
  }

  function Sb(b, c, d, e) {
    var f = c._milliseconds,
        g = Qb(c._days),
        h = Qb(c._months);
    b.isValid() && (e = null == e ? !0 : e, f && b._d.setTime(b._d.valueOf() + f * d), g && P(b, "Date", O(b, "Date") + g * d), h && ia(b, O(b, "Month") + h * d), e && a.updateOffset(b, g || h));
  }

  function Tb(a, b) {
    var c = a.diff(b, "days", !0);
    return -6 > c ? "sameElse" : -1 > c ? "lastWeek" : 0 > c ? "lastDay" : 1 > c ? "sameDay" : 2 > c ? "nextDay" : 7 > c ? "nextWeek" : "sameElse";
  }

  function Ub(b, c) {
    // We want to compare the start of today, vs this.
    // Getting start-of-today depends on whether we're local/utc/offset or not.
    var d = b || rb(),
        e = zb(d, this).startOf("day"),
        f = a.calendarFormat(this, e) || "sameElse",
        g = c && (y(c[f]) ? c[f].call(this, d) : c[f]);
    return this.format(g || this.localeData().calendar(f, this, rb(d)));
  }

  function Vb() {
    return new q(this);
  }

  function Wb(a, b) {
    var c = r(a) ? a : rb(a);
    return this.isValid() && c.isValid() ? (b = J(o(b) ? "millisecond" : b), "millisecond" === b ? this.valueOf() > c.valueOf() : c.valueOf() < this.clone().startOf(b).valueOf()) : !1;
  }

  function Xb(a, b) {
    var c = r(a) ? a : rb(a);
    return this.isValid() && c.isValid() ? (b = J(o(b) ? "millisecond" : b), "millisecond" === b ? this.valueOf() < c.valueOf() : this.clone().endOf(b).valueOf() < c.valueOf()) : !1;
  }

  function Yb(a, b, c, d) {
    return d = d || "()", ("(" === d[0] ? this.isAfter(a, c) : !this.isBefore(a, c)) && (")" === d[1] ? this.isBefore(b, c) : !this.isAfter(b, c));
  }

  function Zb(a, b) {
    var c,
        d = r(a) ? a : rb(a);
    return this.isValid() && d.isValid() ? (b = J(b || "millisecond"), "millisecond" === b ? this.valueOf() === d.valueOf() : (c = d.valueOf(), this.clone().startOf(b).valueOf() <= c && c <= this.clone().endOf(b).valueOf())) : !1;
  }

  function $b(a, b) {
    return this.isSame(a, b) || this.isAfter(a, b);
  }

  function _b(a, b) {
    return this.isSame(a, b) || this.isBefore(a, b);
  }

  function ac(a, b, c) {
    var d, e, f, g; // 1000
    // 1000 * 60
    // 1000 * 60 * 60
    // 1000 * 60 * 60 * 24, negate dst
    // 1000 * 60 * 60 * 24 * 7, negate dst

    return this.isValid() ? (d = zb(a, this), d.isValid() ? (e = 6e4 * (d.utcOffset() - this.utcOffset()), b = J(b), "year" === b || "month" === b || "quarter" === b ? (g = bc(this, d), "quarter" === b ? g /= 3 : "year" === b && (g /= 12)) : (f = this - d, g = "second" === b ? f / 1e3 : "minute" === b ? f / 6e4 : "hour" === b ? f / 36e5 : "day" === b ? (f - e) / 864e5 : "week" === b ? (f - e) / 6048e5 : f), c ? g : s(g)) : NaN) : NaN;
  }

  function bc(a, b) {
    // difference in months
    var c,
        d,
        e = 12 * (b.year() - a.year()) + (b.month() - a.month()),
        // b is in (anchor - 1 month, anchor + 1 month)
    f = a.clone().add(e, "months"); //check for negative zero, return zero if negative zero
    // linear across the month
    // linear across the month

    return 0 > b - f ? (c = a.clone().add(e - 1, "months"), d = (b - f) / (f - c)) : (c = a.clone().add(e + 1, "months"), d = (b - f) / (c - f)), -(e + d) || 0;
  }

  function cc() {
    return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
  }

  function dc() {
    var a = this.clone().utc();
    return 0 < a.year() && a.year() <= 9999 ? y(Date.prototype.toISOString) ? this.toDate().toISOString() : W(a, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : W(a, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
  }

  function ec(b) {
    b || (b = this.isUtc() ? a.defaultFormatUtc : a.defaultFormat);
    var c = W(this, b);
    return this.localeData().postformat(c);
  }

  function fc(a, b) {
    return this.isValid() && (r(a) && a.isValid() || rb(a).isValid()) ? Mb({
      to: this,
      from: a
    }).locale(this.locale()).humanize(!b) : this.localeData().invalidDate();
  }

  function gc(a) {
    return this.from(rb(), a);
  }

  function hc(a, b) {
    return this.isValid() && (r(a) && a.isValid() || rb(a).isValid()) ? Mb({
      from: this,
      to: a
    }).locale(this.locale()).humanize(!b) : this.localeData().invalidDate();
  }

  function ic(a) {
    return this.to(rb(), a);
  } // If passed a locale key, it will set the locale for this
  // instance.  Otherwise, it will return the locale configuration
  // variables for this instance.


  function jc(a) {
    var b;
    return void 0 === a ? this._locale._abbr : (b = ab(a), null != b && (this._locale = b), this);
  }

  function kc() {
    return this._locale;
  }

  function lc(a) {
    // the following switch intentionally omits break keywords
    // to utilize falling through the cases.
    switch (a = J(a)) {
      case "year":
        this.month(0);

      /* falls through */

      case "quarter":
      case "month":
        this.date(1);

      /* falls through */

      case "week":
      case "isoWeek":
      case "day":
      case "date":
        this.hours(0);

      /* falls through */

      case "hour":
        this.minutes(0);

      /* falls through */

      case "minute":
        this.seconds(0);

      /* falls through */

      case "second":
        this.milliseconds(0);
    } // weeks are a special case
    // quarters are also special


    return "week" === a && this.weekday(0), "isoWeek" === a && this.isoWeekday(1), "quarter" === a && this.month(3 * Math.floor(this.month() / 3)), this;
  }

  function mc(a) {
    // 'date' is an alias for 'day', so it should be considered as such.
    return a = J(a), void 0 === a || "millisecond" === a ? this : ("date" === a && (a = "day"), this.startOf(a).add(1, "isoWeek" === a ? "week" : a).subtract(1, "ms"));
  }

  function nc() {
    return this._d.valueOf() - 6e4 * (this._offset || 0);
  }

  function oc() {
    return Math.floor(this.valueOf() / 1e3);
  }

  function pc() {
    return new Date(this.valueOf());
  }

  function qc() {
    var a = this;
    return [a.year(), a.month(), a.date(), a.hour(), a.minute(), a.second(), a.millisecond()];
  }

  function rc() {
    var a = this;
    return {
      years: a.year(),
      months: a.month(),
      date: a.date(),
      hours: a.hours(),
      minutes: a.minutes(),
      seconds: a.seconds(),
      milliseconds: a.milliseconds()
    };
  }

  function sc() {
    // new Date(NaN).toJSON() === null
    return this.isValid() ? this.toISOString() : null;
  }

  function tc() {
    return m(this);
  }

  function uc() {
    return i({}, l(this));
  }

  function vc() {
    return l(this).overflow;
  }

  function wc() {
    return {
      input: this._i,
      format: this._f,
      locale: this._locale,
      isUTC: this._isUTC,
      strict: this._strict
    };
  }

  function xc(a, b) {
    T(0, [a, a.length], 0, b);
  } // MOMENTS


  function yc(a) {
    return Cc.call(this, a, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy);
  }

  function zc(a) {
    return Cc.call(this, a, this.isoWeek(), this.isoWeekday(), 1, 4);
  }

  function Ac() {
    return wa(this.year(), 1, 4);
  }

  function Bc() {
    var a = this.localeData()._week;

    return wa(this.year(), a.dow, a.doy);
  }

  function Cc(a, b, c, d, e) {
    var f;
    return null == a ? va(this, d, e).year : (f = wa(a, d, e), b > f && (b = f), Dc.call(this, a, b, c, d, e));
  }

  function Dc(a, b, c, d, e) {
    var f = ua(a, b, c, d, e),
        g = sa(f.year, 0, f.dayOfYear);
    return this.year(g.getUTCFullYear()), this.month(g.getUTCMonth()), this.date(g.getUTCDate()), this;
  } // MOMENTS


  function Ec(a) {
    return null == a ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (a - 1) + this.month() % 3);
  } // HELPERS
  // MOMENTS


  function Fc(a) {
    var b = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
    return null == a ? b : this.add(a - b, "d");
  }

  function Gc(a, b) {
    b[ce] = t(1e3 * ("0." + a));
  } // MOMENTS


  function Hc() {
    return this._isUTC ? "UTC" : "";
  }

  function Ic() {
    return this._isUTC ? "Coordinated Universal Time" : "";
  }

  function Jc(a) {
    return rb(1e3 * a);
  }

  function Kc() {
    return rb.apply(null, arguments).parseZone();
  }

  function Lc(a) {
    return a;
  }

  function Mc(a, b, c, d) {
    var e = ab(),
        f = j().set(d, b);
    return e[c](f, a);
  }

  function Nc(a, b, c) {
    if ("number" == typeof a && (b = a, a = void 0), a = a || "", null != b) return Mc(a, b, c, "month");
    var d,
        e = [];

    for (d = 0; 12 > d; d++) {
      e[d] = Mc(a, d, c, "month");
    }

    return e;
  } // ()
  // (5)
  // (fmt, 5)
  // (fmt)
  // (true)
  // (true, 5)
  // (true, fmt, 5)
  // (true, fmt)


  function Oc(a, b, c, d) {
    "boolean" == typeof a ? ("number" == typeof b && (c = b, b = void 0), b = b || "") : (b = a, c = b, a = !1, "number" == typeof b && (c = b, b = void 0), b = b || "");
    var e = ab(),
        f = a ? e._week.dow : 0;
    if (null != c) return Mc(b, (c + f) % 7, d, "day");
    var g,
        h = [];

    for (g = 0; 7 > g; g++) {
      h[g] = Mc(b, (g + f) % 7, d, "day");
    }

    return h;
  }

  function Pc(a, b) {
    return Nc(a, b, "months");
  }

  function Qc(a, b) {
    return Nc(a, b, "monthsShort");
  }

  function Rc(a, b, c) {
    return Oc(a, b, c, "weekdays");
  }

  function Sc(a, b, c) {
    return Oc(a, b, c, "weekdaysShort");
  }

  function Tc(a, b, c) {
    return Oc(a, b, c, "weekdaysMin");
  }

  function Uc() {
    var a = this._data;
    return this._milliseconds = Ue(this._milliseconds), this._days = Ue(this._days), this._months = Ue(this._months), a.milliseconds = Ue(a.milliseconds), a.seconds = Ue(a.seconds), a.minutes = Ue(a.minutes), a.hours = Ue(a.hours), a.months = Ue(a.months), a.years = Ue(a.years), this;
  }

  function Vc(a, b, c, d) {
    var e = Mb(b, c);
    return a._milliseconds += d * e._milliseconds, a._days += d * e._days, a._months += d * e._months, a._bubble();
  } // supports only 2.0-style add(1, 's') or add(duration)


  function Wc(a, b) {
    return Vc(this, a, b, 1);
  } // supports only 2.0-style subtract(1, 's') or subtract(duration)


  function Xc(a, b) {
    return Vc(this, a, b, -1);
  }

  function Yc(a) {
    return 0 > a ? Math.floor(a) : Math.ceil(a);
  }

  function Zc() {
    var a,
        b,
        c,
        d,
        e,
        f = this._milliseconds,
        g = this._days,
        h = this._months,
        i = this._data; // if we have a mix of positive and negative values, bubble down first
    // check: https://github.com/moment/moment/issues/2166
    // The following code bubbles up values, see the tests for
    // examples of what that means.
    // convert days to months
    // 12 months -> 1 year

    return f >= 0 && g >= 0 && h >= 0 || 0 >= f && 0 >= g && 0 >= h || (f += 864e5 * Yc(_c(h) + g), g = 0, h = 0), i.milliseconds = f % 1e3, a = s(f / 1e3), i.seconds = a % 60, b = s(a / 60), i.minutes = b % 60, c = s(b / 60), i.hours = c % 24, g += s(c / 24), e = s($c(g)), h += e, g -= Yc(_c(e)), d = s(h / 12), h %= 12, i.days = g, i.months = h, i.years = d, this;
  }

  function $c(a) {
    // 400 years have 146097 days (taking into account leap year rules)
    // 400 years have 12 months === 4800
    return 4800 * a / 146097;
  }

  function _c(a) {
    // the reverse of daysToMonths
    return 146097 * a / 4800;
  }

  function ad(a) {
    var b,
        c,
        d = this._milliseconds;
    if (a = J(a), "month" === a || "year" === a) return b = this._days + d / 864e5, c = this._months + $c(b), "month" === a ? c : c / 12;

    switch (b = this._days + Math.round(_c(this._months)), a) {
      case "week":
        return b / 7 + d / 6048e5;

      case "day":
        return b + d / 864e5;

      case "hour":
        return 24 * b + d / 36e5;

      case "minute":
        return 1440 * b + d / 6e4;

      case "second":
        return 86400 * b + d / 1e3;
      // Math.floor prevents floating point math errors here

      case "millisecond":
        return Math.floor(864e5 * b) + d;

      default:
        throw new Error("Unknown unit " + a);
    }
  } // TODO: Use this.as('ms')?


  function bd() {
    return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * t(this._months / 12);
  }

  function cd(a) {
    return function () {
      return this.as(a);
    };
  }

  function dd(a) {
    return a = J(a), this[a + "s"]();
  }

  function ed(a) {
    return function () {
      return this._data[a];
    };
  }

  function fd() {
    return s(this.days() / 7);
  } // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize


  function gd(a, b, c, d, e) {
    return e.relativeTime(b || 1, !!c, a, d);
  }

  function hd(a, b, c) {
    var d = Mb(a).abs(),
        e = jf(d.as("s")),
        f = jf(d.as("m")),
        g = jf(d.as("h")),
        h = jf(d.as("d")),
        i = jf(d.as("M")),
        j = jf(d.as("y")),
        k = e < kf.s && ["s", e] || 1 >= f && ["m"] || f < kf.m && ["mm", f] || 1 >= g && ["h"] || g < kf.h && ["hh", g] || 1 >= h && ["d"] || h < kf.d && ["dd", h] || 1 >= i && ["M"] || i < kf.M && ["MM", i] || 1 >= j && ["y"] || ["yy", j];
    return k[2] = b, k[3] = +a > 0, k[4] = c, gd.apply(null, k);
  } // This function allows you to set the rounding function for relative time strings


  function id(a) {
    return void 0 === a ? jf : "function" == typeof a ? (jf = a, !0) : !1;
  } // This function allows you to set a threshold for relative time strings


  function jd(a, b) {
    return void 0 === kf[a] ? !1 : void 0 === b ? kf[a] : (kf[a] = b, !0);
  }

  function kd(a) {
    var b = this.localeData(),
        c = hd(this, !a, b);
    return a && (c = b.pastFuture(+this, c)), b.postformat(c);
  }

  function ld() {
    // for ISO strings we do not use the normal bubbling rules:
    //  * milliseconds bubble up until they become hours
    //  * days do not bubble at all
    //  * months bubble up until they become years
    // This is because there is no context-free conversion between hours and days
    // (think of clock changes)
    // and also not between days and months (28-31 days per month)
    var a,
        b,
        c,
        d = lf(this._milliseconds) / 1e3,
        e = lf(this._days),
        f = lf(this._months);
    a = s(d / 60), b = s(a / 60), d %= 60, a %= 60, c = s(f / 12), f %= 12; // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js

    var g = c,
        h = f,
        i = e,
        j = b,
        k = a,
        l = d,
        m = this.asSeconds();
    return m ? (0 > m ? "-" : "") + "P" + (g ? g + "Y" : "") + (h ? h + "M" : "") + (i ? i + "D" : "") + (j || k || l ? "T" : "") + (j ? j + "H" : "") + (k ? k + "M" : "") + (l ? l + "S" : "") : "P0D";
  }

  var md, nd;
  nd = Array.prototype.some ? Array.prototype.some : function (a) {
    for (var b = Object(this), c = b.length >>> 0, d = 0; c > d; d++) {
      if (d in b && a.call(this, b[d], d, b)) return !0;
    }

    return !1;
  }; // Plugins that add properties should also add the key here (null value),
  // so we can properly clone ourselves.

  var od = a.momentProperties = [],
      pd = !1,
      qd = {};
  a.suppressDeprecationWarnings = !1, a.deprecationHandler = null;
  var rd;
  rd = Object.keys ? Object.keys : function (a) {
    var b,
        c = [];

    for (b in a) {
      h(a, b) && c.push(b);
    }

    return c;
  };
  var sd,
      td = {
    sameDay: "[Today at] LT",
    nextDay: "[Tomorrow at] LT",
    nextWeek: "dddd [at] LT",
    lastDay: "[Yesterday at] LT",
    lastWeek: "[Last] dddd [at] LT",
    sameElse: "L"
  },
      ud = {
    LTS: "h:mm:ss A",
    LT: "h:mm A",
    L: "MM/DD/YYYY",
    LL: "MMMM D, YYYY",
    LLL: "MMMM D, YYYY h:mm A",
    LLLL: "dddd, MMMM D, YYYY h:mm A"
  },
      vd = "Invalid date",
      wd = "%d",
      xd = /\d{1,2}/,
      yd = {
    future: "in %s",
    past: "%s ago",
    s: "a few seconds",
    m: "a minute",
    mm: "%d minutes",
    h: "an hour",
    hh: "%d hours",
    d: "a day",
    dd: "%d days",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years"
  },
      zd = {},
      Ad = {},
      Bd = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
      Cd = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
      Dd = {},
      Ed = {},
      Fd = /\d/,
      Gd = /\d\d/,
      Hd = /\d{3}/,
      Id = /\d{4}/,
      Jd = /[+-]?\d{6}/,
      Kd = /\d\d?/,
      Ld = /\d\d\d\d?/,
      Md = /\d\d\d\d\d\d?/,
      Nd = /\d{1,3}/,
      Od = /\d{1,4}/,
      Pd = /[+-]?\d{1,6}/,
      Qd = /\d+/,
      Rd = /[+-]?\d+/,
      Sd = /Z|[+-]\d\d:?\d\d/gi,
      Td = /Z|[+-]\d\d(?::?\d\d)?/gi,
      Ud = /[+-]?\d+(\.\d{1,3})?/,
      Vd = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,
      Wd = {},
      Xd = {},
      Yd = 0,
      Zd = 1,
      $d = 2,
      _d = 3,
      ae = 4,
      be = 5,
      ce = 6,
      de = 7,
      ee = 8;
  sd = Array.prototype.indexOf ? Array.prototype.indexOf : function (a) {
    // I know
    var b;

    for (b = 0; b < this.length; ++b) {
      if (this[b] === a) return b;
    }

    return -1;
  }, T("M", ["MM", 2], "Mo", function () {
    return this.month() + 1;
  }), T("MMM", 0, 0, function (a) {
    return this.localeData().monthsShort(this, a);
  }), T("MMMM", 0, 0, function (a) {
    return this.localeData().months(this, a);
  }), I("month", "M"), L("month", 8), Y("M", Kd), Y("MM", Kd, Gd), Y("MMM", function (a, b) {
    return b.monthsShortRegex(a);
  }), Y("MMMM", function (a, b) {
    return b.monthsRegex(a);
  }), aa(["M", "MM"], function (a, b) {
    b[Zd] = t(a) - 1;
  }), aa(["MMM", "MMMM"], function (a, b, c, d) {
    var e = c._locale.monthsParse(a, d, c._strict);

    null != e ? b[Zd] = e : l(c).invalidMonth = a;
  }); // LOCALES

  var fe = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/,
      ge = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
      he = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
      ie = Vd,
      je = Vd; // FORMATTING

  T("Y", 0, 0, function () {
    var a = this.year();
    return 9999 >= a ? "" + a : "+" + a;
  }), T(0, ["YY", 2], 0, function () {
    return this.year() % 100;
  }), T(0, ["YYYY", 4], 0, "year"), T(0, ["YYYYY", 5], 0, "year"), T(0, ["YYYYYY", 6, !0], 0, "year"), // ALIASES
  I("year", "y"), // PRIORITIES
  L("year", 1), // PARSING
  Y("Y", Rd), Y("YY", Kd, Gd), Y("YYYY", Od, Id), Y("YYYYY", Pd, Jd), Y("YYYYYY", Pd, Jd), aa(["YYYYY", "YYYYYY"], Yd), aa("YYYY", function (b, c) {
    c[Yd] = 2 === b.length ? a.parseTwoDigitYear(b) : t(b);
  }), aa("YY", function (b, c) {
    c[Yd] = a.parseTwoDigitYear(b);
  }), aa("Y", function (a, b) {
    b[Yd] = parseInt(a, 10);
  }), // HOOKS
  a.parseTwoDigitYear = function (a) {
    return t(a) + (t(a) > 68 ? 1900 : 2e3);
  }; // MOMENTS

  var ke = N("FullYear", !0); // FORMATTING

  T("w", ["ww", 2], "wo", "week"), T("W", ["WW", 2], "Wo", "isoWeek"), // ALIASES
  I("week", "w"), I("isoWeek", "W"), // PRIORITIES
  L("week", 5), L("isoWeek", 5), // PARSING
  Y("w", Kd), Y("ww", Kd, Gd), Y("W", Kd), Y("WW", Kd, Gd), ba(["w", "ww", "W", "WW"], function (a, b, c, d) {
    b[d.substr(0, 1)] = t(a);
  });
  var le = {
    dow: 0,
    // Sunday is the first day of the week.
    doy: 6
  }; // FORMATTING

  T("d", 0, "do", "day"), T("dd", 0, 0, function (a) {
    return this.localeData().weekdaysMin(this, a);
  }), T("ddd", 0, 0, function (a) {
    return this.localeData().weekdaysShort(this, a);
  }), T("dddd", 0, 0, function (a) {
    return this.localeData().weekdays(this, a);
  }), T("e", 0, 0, "weekday"), T("E", 0, 0, "isoWeekday"), // ALIASES
  I("day", "d"), I("weekday", "e"), I("isoWeekday", "E"), // PRIORITY
  L("day", 11), L("weekday", 11), L("isoWeekday", 11), // PARSING
  Y("d", Kd), Y("e", Kd), Y("E", Kd), Y("dd", function (a, b) {
    return b.weekdaysMinRegex(a);
  }), Y("ddd", function (a, b) {
    return b.weekdaysShortRegex(a);
  }), Y("dddd", function (a, b) {
    return b.weekdaysRegex(a);
  }), ba(["dd", "ddd", "dddd"], function (a, b, c, d) {
    var e = c._locale.weekdaysParse(a, d, c._strict); // if we didn't get a weekday name, mark the date as invalid


    null != e ? b.d = e : l(c).invalidWeekday = a;
  }), ba(["d", "e", "E"], function (a, b, c, d) {
    b[d] = t(a);
  }); // LOCALES

  var me = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
      ne = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
      oe = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
      pe = Vd,
      qe = Vd,
      re = Vd;
  T("H", ["HH", 2], 0, "hour"), T("h", ["hh", 2], 0, Qa), T("k", ["kk", 2], 0, Ra), T("hmm", 0, 0, function () {
    return "" + Qa.apply(this) + S(this.minutes(), 2);
  }), T("hmmss", 0, 0, function () {
    return "" + Qa.apply(this) + S(this.minutes(), 2) + S(this.seconds(), 2);
  }), T("Hmm", 0, 0, function () {
    return "" + this.hours() + S(this.minutes(), 2);
  }), T("Hmmss", 0, 0, function () {
    return "" + this.hours() + S(this.minutes(), 2) + S(this.seconds(), 2);
  }), Sa("a", !0), Sa("A", !1), // ALIASES
  I("hour", "h"), // PRIORITY
  L("hour", 13), Y("a", Ta), Y("A", Ta), Y("H", Kd), Y("h", Kd), Y("HH", Kd, Gd), Y("hh", Kd, Gd), Y("hmm", Ld), Y("hmmss", Md), Y("Hmm", Ld), Y("Hmmss", Md), aa(["H", "HH"], _d), aa(["a", "A"], function (a, b, c) {
    c._isPm = c._locale.isPM(a), c._meridiem = a;
  }), aa(["h", "hh"], function (a, b, c) {
    b[_d] = t(a), l(c).bigHour = !0;
  }), aa("hmm", function (a, b, c) {
    var d = a.length - 2;
    b[_d] = t(a.substr(0, d)), b[ae] = t(a.substr(d)), l(c).bigHour = !0;
  }), aa("hmmss", function (a, b, c) {
    var d = a.length - 4,
        e = a.length - 2;
    b[_d] = t(a.substr(0, d)), b[ae] = t(a.substr(d, 2)), b[be] = t(a.substr(e)), l(c).bigHour = !0;
  }), aa("Hmm", function (a, b, c) {
    var d = a.length - 2;
    b[_d] = t(a.substr(0, d)), b[ae] = t(a.substr(d));
  }), aa("Hmmss", function (a, b, c) {
    var d = a.length - 4,
        e = a.length - 2;
    b[_d] = t(a.substr(0, d)), b[ae] = t(a.substr(d, 2)), b[be] = t(a.substr(e));
  });
  var se,
      te = /[ap]\.?m?\.?/i,
      ue = N("Hours", !0),
      ve = {
    calendar: td,
    longDateFormat: ud,
    invalidDate: vd,
    ordinal: wd,
    ordinalParse: xd,
    relativeTime: yd,
    months: ge,
    monthsShort: he,
    week: le,
    weekdays: me,
    weekdaysMin: oe,
    weekdaysShort: ne,
    meridiemParse: te
  },
      we = {},
      xe = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,
      ye = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,
      ze = /Z|[+-]\d\d(?::?\d\d)?/,
      Ae = [["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/], ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/], ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/], ["GGGG-[W]WW", /\d{4}-W\d\d/, !1], ["YYYY-DDD", /\d{4}-\d{3}/], ["YYYY-MM", /\d{4}-\d\d/, !1], ["YYYYYYMMDD", /[+-]\d{10}/], ["YYYYMMDD", /\d{8}/], // YYYYMM is NOT allowed by the standard
  ["GGGG[W]WWE", /\d{4}W\d{3}/], ["GGGG[W]WW", /\d{4}W\d{2}/, !1], ["YYYYDDD", /\d{7}/]],
      Be = [["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/], ["HH:mm:ss", /\d\d:\d\d:\d\d/], ["HH:mm", /\d\d:\d\d/], ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/], ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/], ["HHmmss", /\d\d\d\d\d\d/], ["HHmm", /\d\d\d\d/], ["HH", /\d\d/]],
      Ce = /^\/?Date\((\-?\d+)/i;
  a.createFromInputFallback = w("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function (a) {
    a._d = new Date(a._i + (a._useUTC ? " UTC" : ""));
  }), // constant that refers to the ISO standard
  a.ISO_8601 = function () {};

  var De = w("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function () {
    var a = rb.apply(null, arguments);
    return this.isValid() && a.isValid() ? this > a ? this : a : n();
  }),
      Ee = w("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function () {
    var a = rb.apply(null, arguments);
    return this.isValid() && a.isValid() ? a > this ? this : a : n();
  }),
      Fe = function Fe() {
    return Date.now ? Date.now() : +new Date();
  };

  xb("Z", ":"), xb("ZZ", ""), // PARSING
  Y("Z", Td), Y("ZZ", Td), aa(["Z", "ZZ"], function (a, b, c) {
    c._useUTC = !0, c._tzm = yb(Td, a);
  }); // HELPERS
  // timezone chunker
  // '+10:00' > ['10',  '00']
  // '-1530'  > ['-15', '30']

  var Ge = /([\+\-]|\d\d)/gi; // HOOKS
  // This function will be called whenever a moment is mutated.
  // It is intended to keep the offset in sync with the timezone.

  a.updateOffset = function () {}; // ASP.NET json date format regex


  var He = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/,
      Ie = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;
  Mb.fn = vb.prototype;
  var Je = Rb(1, "add"),
      Ke = Rb(-1, "subtract");
  a.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", a.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
  var Le = w("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function (a) {
    return void 0 === a ? this.localeData() : this.locale(a);
  }); // FORMATTING

  T(0, ["gg", 2], 0, function () {
    return this.weekYear() % 100;
  }), T(0, ["GG", 2], 0, function () {
    return this.isoWeekYear() % 100;
  }), xc("gggg", "weekYear"), xc("ggggg", "weekYear"), xc("GGGG", "isoWeekYear"), xc("GGGGG", "isoWeekYear"), // ALIASES
  I("weekYear", "gg"), I("isoWeekYear", "GG"), // PRIORITY
  L("weekYear", 1), L("isoWeekYear", 1), // PARSING
  Y("G", Rd), Y("g", Rd), Y("GG", Kd, Gd), Y("gg", Kd, Gd), Y("GGGG", Od, Id), Y("gggg", Od, Id), Y("GGGGG", Pd, Jd), Y("ggggg", Pd, Jd), ba(["gggg", "ggggg", "GGGG", "GGGGG"], function (a, b, c, d) {
    b[d.substr(0, 2)] = t(a);
  }), ba(["gg", "GG"], function (b, c, d, e) {
    c[e] = a.parseTwoDigitYear(b);
  }), // FORMATTING
  T("Q", 0, "Qo", "quarter"), // ALIASES
  I("quarter", "Q"), // PRIORITY
  L("quarter", 7), // PARSING
  Y("Q", Fd), aa("Q", function (a, b) {
    b[Zd] = 3 * (t(a) - 1);
  }), // FORMATTING
  T("D", ["DD", 2], "Do", "date"), // ALIASES
  I("date", "D"), // PRIOROITY
  L("date", 9), // PARSING
  Y("D", Kd), Y("DD", Kd, Gd), Y("Do", function (a, b) {
    return a ? b._ordinalParse : b._ordinalParseLenient;
  }), aa(["D", "DD"], $d), aa("Do", function (a, b) {
    b[$d] = t(a.match(Kd)[0], 10);
  }); // MOMENTS

  var Me = N("Date", !0); // FORMATTING

  T("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), // ALIASES
  I("dayOfYear", "DDD"), // PRIORITY
  L("dayOfYear", 4), // PARSING
  Y("DDD", Nd), Y("DDDD", Hd), aa(["DDD", "DDDD"], function (a, b, c) {
    c._dayOfYear = t(a);
  }), // FORMATTING
  T("m", ["mm", 2], 0, "minute"), // ALIASES
  I("minute", "m"), // PRIORITY
  L("minute", 14), // PARSING
  Y("m", Kd), Y("mm", Kd, Gd), aa(["m", "mm"], ae); // MOMENTS

  var Ne = N("Minutes", !1); // FORMATTING

  T("s", ["ss", 2], 0, "second"), // ALIASES
  I("second", "s"), // PRIORITY
  L("second", 15), // PARSING
  Y("s", Kd), Y("ss", Kd, Gd), aa(["s", "ss"], be); // MOMENTS

  var Oe = N("Seconds", !1); // FORMATTING

  T("S", 0, 0, function () {
    return ~~(this.millisecond() / 100);
  }), T(0, ["SS", 2], 0, function () {
    return ~~(this.millisecond() / 10);
  }), T(0, ["SSS", 3], 0, "millisecond"), T(0, ["SSSS", 4], 0, function () {
    return 10 * this.millisecond();
  }), T(0, ["SSSSS", 5], 0, function () {
    return 100 * this.millisecond();
  }), T(0, ["SSSSSS", 6], 0, function () {
    return 1e3 * this.millisecond();
  }), T(0, ["SSSSSSS", 7], 0, function () {
    return 1e4 * this.millisecond();
  }), T(0, ["SSSSSSSS", 8], 0, function () {
    return 1e5 * this.millisecond();
  }), T(0, ["SSSSSSSSS", 9], 0, function () {
    return 1e6 * this.millisecond();
  }), // ALIASES
  I("millisecond", "ms"), // PRIORITY
  L("millisecond", 16), // PARSING
  Y("S", Nd, Fd), Y("SS", Nd, Gd), Y("SSS", Nd, Hd);
  var Pe;

  for (Pe = "SSSS"; Pe.length <= 9; Pe += "S") {
    Y(Pe, Qd);
  }

  for (Pe = "S"; Pe.length <= 9; Pe += "S") {
    aa(Pe, Gc);
  } // MOMENTS


  var Qe = N("Milliseconds", !1); // FORMATTING

  T("z", 0, 0, "zoneAbbr"), T("zz", 0, 0, "zoneName");
  var Re = q.prototype;
  Re.add = Je, Re.calendar = Ub, Re.clone = Vb, Re.diff = ac, Re.endOf = mc, Re.format = ec, Re.from = fc, Re.fromNow = gc, Re.to = hc, Re.toNow = ic, Re.get = Q, Re.invalidAt = vc, Re.isAfter = Wb, Re.isBefore = Xb, Re.isBetween = Yb, Re.isSame = Zb, Re.isSameOrAfter = $b, Re.isSameOrBefore = _b, Re.isValid = tc, Re.lang = Le, Re.locale = jc, Re.localeData = kc, Re.max = Ee, Re.min = De, Re.parsingFlags = uc, Re.set = R, Re.startOf = lc, Re.subtract = Ke, Re.toArray = qc, Re.toObject = rc, Re.toDate = pc, Re.toISOString = dc, Re.toJSON = sc, Re.toString = cc, Re.unix = oc, Re.valueOf = nc, Re.creationData = wc, // Year
  Re.year = ke, Re.isLeapYear = qa, // Week Year
  Re.weekYear = yc, Re.isoWeekYear = zc, // Quarter
  Re.quarter = Re.quarters = Ec, // Month
  Re.month = ja, Re.daysInMonth = ka, // Week
  Re.week = Re.weeks = Aa, Re.isoWeek = Re.isoWeeks = Ba, Re.weeksInYear = Bc, Re.isoWeeksInYear = Ac, // Day
  Re.date = Me, Re.day = Re.days = Ja, Re.weekday = Ka, Re.isoWeekday = La, Re.dayOfYear = Fc, // Hour
  Re.hour = Re.hours = ue, // Minute
  Re.minute = Re.minutes = Ne, // Second
  Re.second = Re.seconds = Oe, // Millisecond
  Re.millisecond = Re.milliseconds = Qe, // Offset
  Re.utcOffset = Bb, Re.utc = Db, Re.local = Eb, Re.parseZone = Fb, Re.hasAlignedHourOffset = Gb, Re.isDST = Hb, Re.isLocal = Jb, Re.isUtcOffset = Kb, Re.isUtc = Lb, Re.isUTC = Lb, // Timezone
  Re.zoneAbbr = Hc, Re.zoneName = Ic, // Deprecations
  Re.dates = w("dates accessor is deprecated. Use date instead.", Me), Re.months = w("months accessor is deprecated. Use month instead", ja), Re.years = w("years accessor is deprecated. Use year instead", ke), Re.zone = w("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", Cb), Re.isDSTShifted = w("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", Ib);
  var Se = Re,
      Te = B.prototype;
  Te.calendar = C, Te.longDateFormat = D, Te.invalidDate = E, Te.ordinal = F, Te.preparse = Lc, Te.postformat = Lc, Te.relativeTime = G, Te.pastFuture = H, Te.set = z, // Month
  Te.months = ea, Te.monthsShort = fa, Te.monthsParse = ha, Te.monthsRegex = ma, Te.monthsShortRegex = la, // Week
  Te.week = xa, Te.firstDayOfYear = za, Te.firstDayOfWeek = ya, // Day of Week
  Te.weekdays = Ea, Te.weekdaysMin = Ga, Te.weekdaysShort = Fa, Te.weekdaysParse = Ia, Te.weekdaysRegex = Ma, Te.weekdaysShortRegex = Na, Te.weekdaysMinRegex = Oa, // Hours
  Te.isPM = Ua, Te.meridiem = Va, Za("en", {
    ordinalParse: /\d{1,2}(th|st|nd|rd)/,
    ordinal: function ordinal(a) {
      var b = a % 10,
          c = 1 === t(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";
      return a + c;
    }
  }), // Side effect imports
  a.lang = w("moment.lang is deprecated. Use moment.locale instead.", Za), a.langData = w("moment.langData is deprecated. Use moment.localeData instead.", ab);

  var Ue = Math.abs,
      Ve = cd("ms"),
      We = cd("s"),
      Xe = cd("m"),
      Ye = cd("h"),
      Ze = cd("d"),
      $e = cd("w"),
      _e = cd("M"),
      af = cd("y"),
      bf = ed("milliseconds"),
      cf = ed("seconds"),
      df = ed("minutes"),
      ef = ed("hours"),
      ff = ed("days"),
      gf = ed("months"),
      hf = ed("years"),
      jf = Math.round,
      kf = {
    s: 45,
    // seconds to minute
    m: 45,
    // minutes to hour
    h: 22,
    // hours to day
    d: 26,
    // days to month
    M: 11
  },
      lf = Math.abs,
      mf = vb.prototype;

  mf.abs = Uc, mf.add = Wc, mf.subtract = Xc, mf.as = ad, mf.asMilliseconds = Ve, mf.asSeconds = We, mf.asMinutes = Xe, mf.asHours = Ye, mf.asDays = Ze, mf.asWeeks = $e, mf.asMonths = _e, mf.asYears = af, mf.valueOf = bd, mf._bubble = Zc, mf.get = dd, mf.milliseconds = bf, mf.seconds = cf, mf.minutes = df, mf.hours = ef, mf.days = ff, mf.weeks = fd, mf.months = gf, mf.years = hf, mf.humanize = kd, mf.toISOString = ld, mf.toString = ld, mf.toJSON = ld, mf.locale = jc, mf.localeData = kc, // Deprecations
  mf.toIsoString = w("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", ld), mf.lang = Le, // Side effect imports
  // FORMATTING
  T("X", 0, 0, "unix"), T("x", 0, 0, "valueOf"), // PARSING
  Y("x", Rd), Y("X", Ud), aa("X", function (a, b, c) {
    c._d = new Date(1e3 * parseFloat(a, 10));
  }), aa("x", function (a, b, c) {
    c._d = new Date(t(a));
  }), // Side effect imports
  a.version = "2.14.1", b(rb), a.fn = Se, a.min = tb, a.max = ub, a.now = Fe, a.utc = j, a.unix = Jc, a.months = Pc, a.isDate = f, a.locale = Za, a.invalid = n, a.duration = Mb, a.isMoment = r, a.weekdays = Rc, a.parseZone = Kc, a.localeData = ab, a.isDuration = wb, a.monthsShort = Qc, a.weekdaysMin = Tc, a.defineLocale = $a, a.updateLocale = _a, a.locales = bb, a.weekdaysShort = Sc, a.normalizeUnits = J, a.relativeTimeRounding = id, a.relativeTimeThreshold = jd, a.calendarFormat = Tb, a.prototype = Se;
  var nf = a;
  return nf;
});
/*!
 * sweetalert2 v7.24.1
 * Released under the MIT License.
 */

(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof2(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.Sweetalert2 = factory();
})(this, function () {
  'use strict';

  var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return _typeof2(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
  };

  var classCallCheck = function classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  var inherits = function inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + _typeof2(superClass));
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (_typeof2(call) === "object" || typeof call === "function") ? call : self;
  };

  var slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var consolePrefix = 'SweetAlert2:';
  /**
   * Filter the unique values into a new array
   * @param arr
   */

  var uniqueArray = function uniqueArray(arr) {
    var result = [];

    for (var i = 0; i < arr.length; i++) {
      if (result.indexOf(arr[i]) === -1) {
        result.push(arr[i]);
      }
    }

    return result;
  };
  /**
   * Converts `inputOptions` into an array of `[value, label]`s
   * @param inputOptions
   */


  var formatInputOptions = function formatInputOptions(inputOptions) {
    var result = [];

    if (typeof Map !== 'undefined' && inputOptions instanceof Map) {
      inputOptions.forEach(function (value, key) {
        result.push([key, value]);
      });
    } else {
      Object.keys(inputOptions).forEach(function (key) {
        result.push([key, inputOptions[key]]);
      });
    }

    return result;
  };
  /**
   * Standardise console warnings
   * @param message
   */


  var warn = function warn(message) {
    console.warn(consolePrefix + ' ' + message);
  };
  /**
   * Standardise console errors
   * @param message
   */


  var error = function error(message) {
    console.error(consolePrefix + ' ' + message);
  };
  /**
   * Private global state for `warnOnce`
   * @type {Array}
   * @private
   */


  var previousWarnOnceMessages = [];
  /**
   * Show a console warning, but only if it hasn't already been shown
   * @param message
   */

  var warnOnce = function warnOnce(message) {
    if (!(previousWarnOnceMessages.indexOf(message) !== -1)) {
      previousWarnOnceMessages.push(message);
      warn(message);
    }
  };
  /**
   * If `arg` is a function, call it (with no arguments or context) and return the result.
   * Otherwise, just pass the value through
   * @param arg
   */


  var callIfFunction = function callIfFunction(arg) {
    return typeof arg === 'function' ? arg() : arg;
  };

  var isThenable = function isThenable(arg) {
    return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && typeof arg.then === 'function';
  };

  var DismissReason = Object.freeze({
    cancel: 'cancel',
    backdrop: 'overlay',
    close: 'close',
    esc: 'esc',
    timer: 'timer'
  });
  var version = "7.24.1";

  var argsToParams = function argsToParams(args) {
    var params = {};

    switch (_typeof(args[0])) {
      case 'string':
        ['title', 'html', 'type'].forEach(function (name, index) {
          switch (_typeof(args[index])) {
            case 'string':
              params[name] = args[index];
              break;

            case 'undefined':
              break;

            default:
              error('Unexpected type of ' + name + '! Expected "string", got ' + _typeof(args[index]));
          }
        });
        break;

      case 'object':
        _extends(params, args[0]);

        break;

      default:
        error('Unexpected type of argument! Expected "string" or "object", got ' + _typeof(args[0]));
        return false;
    }

    return params;
  };
  /**
   * Adapt a legacy inputValidator for use with expectRejections=false
   */


  var adaptInputValidator = function adaptInputValidator(legacyValidator) {
    return function adaptedInputValidator(inputValue, extraParams) {
      return legacyValidator.call(this, inputValue, extraParams).then(function () {
        return undefined;
      }, function (validationError) {
        return validationError;
      });
    };
  };

  var swalPrefix = 'swal2-';

  var prefix = function prefix(items) {
    var result = {};

    for (var i in items) {
      result[items[i]] = swalPrefix + items[i];
    }

    return result;
  };

  var swalClasses = prefix(['container', 'shown', 'height-auto', 'iosfix', 'popup', 'modal', 'no-backdrop', 'toast', 'toast-shown', 'fade', 'show', 'hide', 'noanimation', 'close', 'title', 'header', 'content', 'actions', 'confirm', 'cancel', 'footer', 'icon', 'icon-text', 'image', 'input', 'has-input', 'file', 'range', 'select', 'radio', 'checkbox', 'textarea', 'inputerror', 'validationerror', 'progresssteps', 'activeprogressstep', 'progresscircle', 'progressline', 'loading', 'styled', 'top', 'top-start', 'top-end', 'top-left', 'top-right', 'center', 'center-start', 'center-end', 'center-left', 'center-right', 'bottom', 'bottom-start', 'bottom-end', 'bottom-left', 'bottom-right', 'grow-row', 'grow-column', 'grow-fullscreen']);
  var iconTypes = prefix(['success', 'warning', 'info', 'question', 'error']); // Remember state in cases where opening and handling a modal will fiddle with it.

  var states = {
    previousBodyPadding: null
  };

  var hasClass = function hasClass(elem, className) {
    if (elem.classList) {
      return elem.classList.contains(className);
    }

    return false;
  };

  var focusInput = function focusInput(input) {
    input.focus(); // place cursor at end of text in text input

    if (input.type !== 'file') {
      // http://stackoverflow.com/a/2345915/1331425
      var val = input.value;
      input.value = '';
      input.value = val;
    }
  };

  var addOrRemoveClass = function addOrRemoveClass(target, classList, add) {
    if (!target || !classList) {
      return;
    }

    if (typeof classList === 'string') {
      classList = classList.split(/\s+/).filter(Boolean);
    }

    classList.forEach(function (className) {
      if (target.forEach) {
        target.forEach(function (elem) {
          add ? elem.classList.add(className) : elem.classList.remove(className);
        });
      } else {
        add ? target.classList.add(className) : target.classList.remove(className);
      }
    });
  };

  var addClass = function addClass(target, classList) {
    addOrRemoveClass(target, classList, true);
  };

  var removeClass = function removeClass(target, classList) {
    addOrRemoveClass(target, classList, false);
  };

  var getChildByClass = function getChildByClass(elem, className) {
    for (var i = 0; i < elem.childNodes.length; i++) {
      if (hasClass(elem.childNodes[i], className)) {
        return elem.childNodes[i];
      }
    }
  };

  var show = function show(elem) {
    elem.style.opacity = '';
    elem.style.display = elem.id === swalClasses.content ? 'block' : 'flex';
  };

  var hide = function hide(elem) {
    elem.style.opacity = '';
    elem.style.display = 'none';
  };

  var empty = function empty(elem) {
    while (elem.firstChild) {
      elem.removeChild(elem.firstChild);
    }
  }; // borrowed from jquery $(elem).is(':visible') implementation


  var isVisible = function isVisible(elem) {
    return elem && (elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
  };

  var removeStyleProperty = function removeStyleProperty(elem, property) {
    if (elem.style.removeProperty) {
      elem.style.removeProperty(property);
    } else {
      elem.style.removeAttribute(property);
    }
  };

  var getContainer = function getContainer() {
    return document.body.querySelector('.' + swalClasses.container);
  };

  var elementByClass = function elementByClass(className) {
    var container = getContainer();
    return container ? container.querySelector('.' + className) : null;
  };

  var getPopup = function getPopup() {
    return elementByClass(swalClasses.popup);
  };

  var getIcons = function getIcons() {
    var popup = getPopup();
    return popup.querySelectorAll('.' + swalClasses.icon);
  };

  var getTitle = function getTitle() {
    return elementByClass(swalClasses.title);
  };

  var getContent = function getContent() {
    return elementByClass(swalClasses.content);
  };

  var getImage = function getImage() {
    return elementByClass(swalClasses.image);
  };

  var getProgressSteps = function getProgressSteps() {
    return elementByClass(swalClasses.progresssteps);
  };

  var getValidationError = function getValidationError() {
    return elementByClass(swalClasses.validationerror);
  };

  var getConfirmButton = function getConfirmButton() {
    return elementByClass(swalClasses.confirm);
  };

  var getCancelButton = function getCancelButton() {
    return elementByClass(swalClasses.cancel);
  };

  var getButtonsWrapper = function getButtonsWrapper() {
    warnOnce('swal.getButtonsWrapper() is deprecated and will be removed in the next major release, use swal.getActions() instead');
    return elementByClass(swalClasses.actions);
  };

  var getActions = function getActions() {
    return elementByClass(swalClasses.actions);
  };

  var getFooter = function getFooter() {
    return elementByClass(swalClasses.footer);
  };

  var getCloseButton = function getCloseButton() {
    return elementByClass(swalClasses.close);
  };

  var getFocusableElements = function getFocusableElements() {
    var focusableElementsWithTabindex = Array.prototype.slice.call(getPopup().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])')) // sort according to tabindex
    .sort(function (a, b) {
      a = parseInt(a.getAttribute('tabindex'));
      b = parseInt(b.getAttribute('tabindex'));

      if (a > b) {
        return 1;
      } else if (a < b) {
        return -1;
      }

      return 0;
    }); // https://github.com/jkup/focusable/blob/master/index.js

    var otherFocusableElements = Array.prototype.slice.call(getPopup().querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable], audio[controls], video[controls]'));
    return uniqueArray(focusableElementsWithTabindex.concat(otherFocusableElements));
  };

  var isModal = function isModal() {
    return !document.body.classList.contains(swalClasses['toast-shown']);
  };

  var isToast = function isToast() {
    return document.body.classList.contains(swalClasses['toast-shown']);
  };

  var isLoading = function isLoading() {
    return getPopup().hasAttribute('data-loading');
  }; // Detect Node env


  var isNodeEnv = function isNodeEnv() {
    return typeof window === 'undefined' || typeof document === 'undefined';
  };

  var sweetHTML = ('\n <div aria-labelledby="' + swalClasses.title + '" aria-describedby="' + swalClasses.content + '" class="' + swalClasses.popup + '" tabindex="-1">\n   <div class="' + swalClasses.header + '">\n     <ul class="' + swalClasses.progresssteps + '"></ul>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.error + '">\n       <span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span>\n     </div>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.question + '">\n       <span class="' + swalClasses['icon-text'] + '">?</span>\n      </div>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.warning + '">\n       <span class="' + swalClasses['icon-text'] + '">!</span>\n      </div>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.info + '">\n       <span class="' + swalClasses['icon-text'] + '">i</span>\n      </div>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.success + '">\n       <div class="swal2-success-circular-line-left"></div>\n       <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n       <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n       <div class="swal2-success-circular-line-right"></div>\n     </div>\n     <img class="' + swalClasses.image + '" />\n     <h2 class="' + swalClasses.title + '" id="' + swalClasses.title + '"></h2>\n     <button type="button" class="' + swalClasses.close + '">\xD7</button>\n   </div>\n   <div class="' + swalClasses.content + '">\n     <div id="' + swalClasses.content + '"></div>\n     <input class="' + swalClasses.input + '" />\n     <input type="file" class="' + swalClasses.file + '" />\n     <div class="' + swalClasses.range + '">\n       <input type="range" />\n       <output></output>\n     </div>\n     <select class="' + swalClasses.select + '"></select>\n     <div class="' + swalClasses.radio + '"></div>\n     <label for="' + swalClasses.checkbox + '" class="' + swalClasses.checkbox + '">\n       <input type="checkbox" />\n     </label>\n     <textarea class="' + swalClasses.textarea + '"></textarea>\n     <div class="' + swalClasses.validationerror + '" id="' + swalClasses.validationerror + '"></div>\n   </div>\n   <div class="' + swalClasses.actions + '">\n     <button type="button" class="' + swalClasses.confirm + '">OK</button>\n     <button type="button" class="' + swalClasses.cancel + '">Cancel</button>\n   </div>\n   <div class="' + swalClasses.footer + '">\n   </div>\n </div>\n').replace(/(^|\n)\s*/g, '');
  /*
   * Add modal + backdrop to DOM
   */

  var init = function init(params) {
    // Clean up the old popup if it exists
    var c = getContainer();

    if (c) {
      c.parentNode.removeChild(c);
      removeClass([document.documentElement, document.body], [swalClasses['no-backdrop'], swalClasses['has-input'], swalClasses['toast-shown']]);
    }

    if (isNodeEnv()) {
      error('SweetAlert2 requires document to initialize');
      return;
    }

    var container = document.createElement('div');
    container.className = swalClasses.container;
    container.innerHTML = sweetHTML;
    var targetElement = typeof params.target === 'string' ? document.querySelector(params.target) : params.target;
    targetElement.appendChild(container);
    var popup = getPopup();
    var content = getContent();
    var input = getChildByClass(content, swalClasses.input);
    var file = getChildByClass(content, swalClasses.file);
    var range = content.querySelector('.' + swalClasses.range + ' input');
    var rangeOutput = content.querySelector('.' + swalClasses.range + ' output');
    var select = getChildByClass(content, swalClasses.select);
    var checkbox = content.querySelector('.' + swalClasses.checkbox + ' input');
    var textarea = getChildByClass(content, swalClasses.textarea); // a11y

    popup.setAttribute('role', params.toast ? 'alert' : 'dialog');
    popup.setAttribute('aria-live', params.toast ? 'polite' : 'assertive');

    if (!params.toast) {
      popup.setAttribute('aria-modal', 'true');
    }

    var oldInputVal = void 0; // IE11 workaround, see #1109 for details

    var resetValidationError = function resetValidationError(e) {
      if (Swal.isVisible() && oldInputVal !== e.target.value) {
        Swal.resetValidationError();
      }

      oldInputVal = e.target.value;
    };

    input.oninput = resetValidationError;
    file.onchange = resetValidationError;
    select.onchange = resetValidationError;
    checkbox.onchange = resetValidationError;
    textarea.oninput = resetValidationError;

    range.oninput = function (e) {
      resetValidationError(e);
      rangeOutput.value = range.value;
    };

    range.onchange = function (e) {
      resetValidationError(e);
      range.nextSibling.value = range.value;
    };

    return popup;
  };

  var parseHtmlToContainer = function parseHtmlToContainer(param, target) {
    if (!param) {
      return hide(target);
    }

    if ((typeof param === 'undefined' ? 'undefined' : _typeof(param)) === 'object') {
      target.innerHTML = '';

      if (0 in param) {
        for (var i = 0; (i in param); i++) {
          target.appendChild(param[i].cloneNode(true));
        }
      } else {
        target.appendChild(param.cloneNode(true));
      }
    } else if (param) {
      target.innerHTML = param;
    } else {}

    show(target);
  };

  var animationEndEvent = function () {
    // Prevent run in Node env
    if (isNodeEnv()) {
      return false;
    }

    var testEl = document.createElement('div');
    var transEndEventNames = {
      'WebkitAnimation': 'webkitAnimationEnd',
      'OAnimation': 'oAnimationEnd oanimationend',
      'animation': 'animationend'
    };

    for (var i in transEndEventNames) {
      if (transEndEventNames.hasOwnProperty(i) && typeof testEl.style[i] !== 'undefined') {
        return transEndEventNames[i];
      }
    }

    return false;
  }(); // Measure width of scrollbar
  // https://github.com/twbs/bootstrap/blob/master/js/modal.js#L279-L286


  var measureScrollbar = function measureScrollbar() {
    var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;

    if (supportsTouch) {
      return 0;
    }

    var scrollDiv = document.createElement('div');
    scrollDiv.style.width = '50px';
    scrollDiv.style.height = '50px';
    scrollDiv.style.overflow = 'scroll';
    document.body.appendChild(scrollDiv);
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollbarWidth;
  };

  var fixScrollbar = function fixScrollbar() {
    // for queues, do not do this more than once
    if (states.previousBodyPadding !== null) {
      return;
    } // if the body has overflow


    if (document.body.scrollHeight > window.innerHeight) {
      // add padding so the content doesn't shift after removal of scrollbar
      states.previousBodyPadding = parseInt(window.getComputedStyle(document.body).getPropertyValue('padding-right'));
      document.body.style.paddingRight = states.previousBodyPadding + measureScrollbar() + 'px';
    }
  };

  var undoScrollbar = function undoScrollbar() {
    if (states.previousBodyPadding !== null) {
      document.body.style.paddingRight = states.previousBodyPadding;
      states.previousBodyPadding = null;
    }
  }; // Fix iOS scrolling http://stackoverflow.com/q/39626302/1331425


  var iOSfix = function iOSfix() {
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    if (iOS && !hasClass(document.body, swalClasses.iosfix)) {
      var offset = document.body.scrollTop;
      document.body.style.top = offset * -1 + 'px';
      addClass(document.body, swalClasses.iosfix);
    }
  };

  var undoIOSfix = function undoIOSfix() {
    if (hasClass(document.body, swalClasses.iosfix)) {
      var offset = parseInt(document.body.style.top, 10);
      removeClass(document.body, swalClasses.iosfix);
      document.body.style.top = '';
      document.body.scrollTop = offset * -1;
    }
  };

  var globalState = {}; // Restore previous active (focused) element

  var restoreActiveElement = function restoreActiveElement() {
    var x = window.scrollX;
    var y = window.scrollY;
    globalState.restoreFocusTimeout = setTimeout(function () {
      if (globalState.previousActiveElement && globalState.previousActiveElement.focus) {
        globalState.previousActiveElement.focus();
        globalState.previousActiveElement = null;
      }
    }, 100); // issues/900

    if (typeof x !== 'undefined' && typeof y !== 'undefined') {
      // IE doesn't have scrollX/scrollY support
      window.scrollTo(x, y);
    }
  };
  /*
   * Global function to close sweetAlert
   */


  var close = function close(onClose, onAfterClose) {
    var container = getContainer();
    var popup = getPopup();

    if (!popup) {
      return;
    }

    if (onClose !== null && typeof onClose === 'function') {
      onClose(popup);
    }

    removeClass(popup, swalClasses.show);
    addClass(popup, swalClasses.hide);

    var removePopupAndResetState = function removePopupAndResetState() {
      if (!isToast()) {
        restoreActiveElement();
        globalState.keydownTarget.removeEventListener('keydown', globalState.keydownHandler, {
          capture: globalState.keydownListenerCapture
        });
        globalState.keydownHandlerAdded = false;
      }

      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }

      removeClass([document.documentElement, document.body], [swalClasses.shown, swalClasses['height-auto'], swalClasses['no-backdrop'], swalClasses['has-input'], swalClasses['toast-shown']]);

      if (isModal()) {
        undoScrollbar();
        undoIOSfix();
      }

      if (onAfterClose !== null && typeof onAfterClose === 'function') {
        setTimeout(function () {
          onAfterClose();
        });
      }
    }; // If animation is supported, animate


    if (animationEndEvent && !hasClass(popup, swalClasses.noanimation)) {
      popup.addEventListener(animationEndEvent, function swalCloseEventFinished() {
        popup.removeEventListener(animationEndEvent, swalCloseEventFinished);

        if (hasClass(popup, swalClasses.hide)) {
          removePopupAndResetState();
        }
      });
    } else {
      // Otherwise, remove immediately
      removePopupAndResetState();
    }
  };
  /*
   * Global function to determine if swal2 popup is shown
   */


  var isVisible$1 = function isVisible() {
    return !!getPopup();
  };
  /*
   * Global function to click 'Confirm' button
   */


  var clickConfirm = function clickConfirm() {
    return getConfirmButton().click();
  };
  /*
   * Global function to click 'Cancel' button
   */


  var clickCancel = function clickCancel() {
    return getCancelButton().click();
  };

  function fire() {
    var Swal = this;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return new (Function.prototype.bind.apply(Swal, [null].concat(args)))();
  }
  /**
   * Extends a Swal class making it able to be instantiated without the `new` keyword (and thus without `Swal.fire`)
   * @param ParentSwal
   * @returns {NoNewKeywordSwal}
   */


  function withNoNewKeyword(ParentSwal) {
    var NoNewKeywordSwal = function NoNewKeywordSwal() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (!(this instanceof NoNewKeywordSwal)) {
        return new (Function.prototype.bind.apply(NoNewKeywordSwal, [null].concat(args)))();
      }

      Object.getPrototypeOf(NoNewKeywordSwal).apply(this, args);
    };

    NoNewKeywordSwal.prototype = _extends(Object.create(ParentSwal.prototype), {
      constructor: NoNewKeywordSwal
    });

    if (typeof Object.setPrototypeOf === 'function') {
      Object.setPrototypeOf(NoNewKeywordSwal, ParentSwal);
    } else {
      // Android 4.4
      // eslint-disable-next-line
      NoNewKeywordSwal.__proto__ = ParentSwal;
    }

    return NoNewKeywordSwal;
  }

  var defaultParams = {
    title: '',
    titleText: '',
    text: '',
    html: '',
    footer: '',
    type: null,
    toast: false,
    customClass: '',
    target: 'body',
    backdrop: true,
    animation: true,
    heightAuto: true,
    allowOutsideClick: true,
    allowEscapeKey: true,
    allowEnterKey: true,
    stopKeydownPropagation: true,
    keydownListenerCapture: false,
    showConfirmButton: true,
    showCancelButton: false,
    preConfirm: null,
    confirmButtonText: 'OK',
    confirmButtonAriaLabel: '',
    confirmButtonColor: null,
    confirmButtonClass: null,
    cancelButtonText: 'Cancel',
    cancelButtonAriaLabel: '',
    cancelButtonColor: null,
    cancelButtonClass: null,
    buttonsStyling: true,
    reverseButtons: false,
    focusConfirm: true,
    focusCancel: false,
    showCloseButton: false,
    closeButtonAriaLabel: 'Close this dialog',
    showLoaderOnConfirm: false,
    imageUrl: null,
    imageWidth: null,
    imageHeight: null,
    imageAlt: '',
    imageClass: null,
    timer: null,
    width: null,
    padding: null,
    background: null,
    input: null,
    inputPlaceholder: '',
    inputValue: '',
    inputOptions: {},
    inputAutoTrim: true,
    inputClass: null,
    inputAttributes: {},
    inputValidator: null,
    grow: false,
    position: 'center',
    progressSteps: [],
    currentProgressStep: null,
    progressStepsDistance: null,
    onBeforeOpen: null,
    onAfterClose: null,
    onOpen: null,
    onClose: null,
    useRejections: false,
    expectRejections: false
  };
  var deprecatedParams = ['useRejections', 'expectRejections'];
  /**
   * Is valid parameter
   * @param {String} paramName
   */

  var isValidParameter = function isValidParameter(paramName) {
    return defaultParams.hasOwnProperty(paramName) || paramName === 'extraParams';
  };
  /**
   * Is deprecated parameter
   * @param {String} paramName
   */


  var isDeprecatedParameter = function isDeprecatedParameter(paramName) {
    return deprecatedParams.indexOf(paramName) !== -1;
  };
  /**
   * Show relevant warnings for given params
   *
   * @param params
   */


  var showWarningsForParams = function showWarningsForParams(params) {
    for (var param in params) {
      if (!isValidParameter(param)) {
        warn('Unknown parameter "' + param + '"');
      }

      if (isDeprecatedParameter(param)) {
        warnOnce('The parameter "' + param + '" is deprecated and will be removed in the next major release.');
      }
    }
  };

  var deprecationWarning = '"setDefaults" & "resetDefaults" methods are deprecated in favor of "mixin" method and will be removed in the next major release. For new projects, use "mixin". For past projects already using "setDefaults", support will be provided through an additional package.';
  var defaults$1 = {};

  function withGlobalDefaults(ParentSwal) {
    var SwalWithGlobalDefaults = function (_ParentSwal) {
      inherits(SwalWithGlobalDefaults, _ParentSwal);

      function SwalWithGlobalDefaults() {
        classCallCheck(this, SwalWithGlobalDefaults);
        return possibleConstructorReturn(this, (SwalWithGlobalDefaults.__proto__ || Object.getPrototypeOf(SwalWithGlobalDefaults)).apply(this, arguments));
      }

      createClass(SwalWithGlobalDefaults, [{
        key: '_main',
        value: function _main(params) {
          return get(SwalWithGlobalDefaults.prototype.__proto__ || Object.getPrototypeOf(SwalWithGlobalDefaults.prototype), '_main', this).call(this, _extends({}, defaults$1, params));
        }
      }], [{
        key: 'setDefaults',
        value: function setDefaults(params) {
          warnOnce(deprecationWarning);

          if (!params || (typeof params === 'undefined' ? 'undefined' : _typeof(params)) !== 'object') {
            throw new TypeError('SweetAlert2: The argument for setDefaults() is required and has to be a object');
          }

          showWarningsForParams(params); // assign valid params from `params` to `defaults`

          Object.keys(params).forEach(function (param) {
            if (ParentSwal.isValidParameter(param)) {
              defaults$1[param] = params[param];
            }
          });
        }
      }, {
        key: 'resetDefaults',
        value: function resetDefaults() {
          warnOnce(deprecationWarning);
          defaults$1 = {};
        }
      }]);
      return SwalWithGlobalDefaults;
    }(ParentSwal); // Set default params if `window._swalDefaults` is an object


    if (typeof window !== 'undefined' && _typeof(window._swalDefaults) === 'object') {
      SwalWithGlobalDefaults.setDefaults(window._swalDefaults);
    }

    return SwalWithGlobalDefaults;
  }
  /**
   * Returns an extended version of `Swal` containing `params` as defaults.
   * Useful for reusing Swal configuration.
   *
   * For example:
   *
   * Before:
   * const textPromptOptions = { input: 'text', showCancelButton: true }
   * const {value: firstName} = await Swal({ ...textPromptOptions, title: 'What is your first name?' })
   * const {value: lastName} = await Swal({ ...textPromptOptions, title: 'What is your last name?' })
   *
   * After:
   * const TextPrompt = Swal.mixin({ input: 'text', showCancelButton: true })
   * const {value: firstName} = await TextPrompt('What is your first name?')
   * const {value: lastName} = await TextPrompt('What is your last name?')
   *
   * @param mixinParams
   */


  function mixin(mixinParams) {
    var Swal = this;
    return withNoNewKeyword(function (_Swal) {
      inherits(MixinSwal, _Swal);

      function MixinSwal() {
        classCallCheck(this, MixinSwal);
        return possibleConstructorReturn(this, (MixinSwal.__proto__ || Object.getPrototypeOf(MixinSwal)).apply(this, arguments));
      }

      createClass(MixinSwal, [{
        key: '_main',
        value: function _main(params) {
          return get(MixinSwal.prototype.__proto__ || Object.getPrototypeOf(MixinSwal.prototype), '_main', this).call(this, _extends({}, mixinParams, params));
        }
      }]);
      return MixinSwal;
    }(Swal));
  } // private global state for the queue feature


  var currentSteps = [];
  /*
   * Global function for chaining sweetAlert popups
   */

  var queue = function queue(steps) {
    var swal = this;
    currentSteps = steps;

    var resetQueue = function resetQueue() {
      currentSteps = [];
      document.body.removeAttribute('data-swal2-queue-step');
    };

    var queueResult = [];
    return new Promise(function (resolve, reject) {
      (function step(i, callback) {
        if (i < currentSteps.length) {
          document.body.setAttribute('data-swal2-queue-step', i);
          swal(currentSteps[i]).then(function (result) {
            if (typeof result.value !== 'undefined') {
              queueResult.push(result.value);
              step(i + 1, callback);
            } else {
              resetQueue();
              resolve({
                dismiss: result.dismiss
              });
            }
          });
        } else {
          resetQueue();
          resolve({
            value: queueResult
          });
        }
      })(0);
    });
  };
  /*
   * Global function for getting the index of current popup in queue
   */


  var getQueueStep = function getQueueStep() {
    return document.body.getAttribute('data-swal2-queue-step');
  };
  /*
   * Global function for inserting a popup to the queue
   */


  var insertQueueStep = function insertQueueStep(step, index) {
    if (index && index < currentSteps.length) {
      return currentSteps.splice(index, 0, step);
    }

    return currentSteps.push(step);
  };
  /*
   * Global function for deleting a popup from the queue
   */


  var deleteQueueStep = function deleteQueueStep(index) {
    if (typeof currentSteps[index] !== 'undefined') {
      currentSteps.splice(index, 1);
    }
  };
  /**
   * Show spinner instead of Confirm button and disable Cancel button
   */


  var showLoading = function showLoading() {
    var popup = getPopup();

    if (!popup) {
      Swal('');
    }

    popup = getPopup();
    var actions = getActions();
    var confirmButton = getConfirmButton();
    var cancelButton = getCancelButton();
    show(actions);
    show(confirmButton);
    addClass([popup, actions], swalClasses.loading);
    confirmButton.disabled = true;
    cancelButton.disabled = true;
    popup.setAttribute('data-loading', true);
    popup.setAttribute('aria-busy', true);
    popup.focus();
  };
  /**
   * Show spinner instead of Confirm button and disable Cancel button
   */


  var getTimerLeft = function getTimerLeft() {
    return globalState.timeout && globalState.timeout.getTimerLeft();
  };

  var staticMethods = Object.freeze({
    isValidParameter: isValidParameter,
    isDeprecatedParameter: isDeprecatedParameter,
    argsToParams: argsToParams,
    adaptInputValidator: adaptInputValidator,
    close: close,
    closePopup: close,
    closeModal: close,
    closeToast: close,
    isVisible: isVisible$1,
    clickConfirm: clickConfirm,
    clickCancel: clickCancel,
    getPopup: getPopup,
    getTitle: getTitle,
    getContent: getContent,
    getImage: getImage,
    getButtonsWrapper: getButtonsWrapper,
    getActions: getActions,
    getConfirmButton: getConfirmButton,
    getCancelButton: getCancelButton,
    getFooter: getFooter,
    isLoading: isLoading,
    fire: fire,
    mixin: mixin,
    queue: queue,
    getQueueStep: getQueueStep,
    insertQueueStep: insertQueueStep,
    deleteQueueStep: deleteQueueStep,
    showLoading: showLoading,
    enableLoading: showLoading,
    getTimerLeft: getTimerLeft
  }); // https://github.com/Riim/symbol-polyfill/blob/master/index.js

  var _Symbol = typeof Symbol === 'function' ? Symbol : function () {
    var idCounter = 0;

    function _Symbol(key) {
      return '__' + key + '_' + Math.floor(Math.random() * 1e9) + '_' + ++idCounter + '__';
    }

    _Symbol.iterator = _Symbol('Symbol.iterator');
    return _Symbol;
  }(); // WeakMap polyfill, needed for Android 4.4
  // Related issue: https://github.com/sweetalert2/sweetalert2/issues/1071
  // http://webreflection.blogspot.fi/2015/04/a-weakmap-polyfill-in-20-lines-of-code.html


  var WeakMap$1 = typeof WeakMap === 'function' ? WeakMap : function (s, dP, hOP) {
    function WeakMap() {
      dP(this, s, {
        value: _Symbol('WeakMap')
      });
    }

    WeakMap.prototype = {
      'delete': function del(o) {
        delete o[this[s]];
      },
      get: function get(o) {
        return o[this[s]];
      },
      has: function has(o) {
        return hOP.call(o, this[s]);
      },
      set: function set(o, v) {
        dP(o, this[s], {
          configurable: true,
          value: v
        });
      }
    };
    return WeakMap;
  }(_Symbol('WeakMap'), Object.defineProperty, {}.hasOwnProperty);
  /**
   * This module containts `WeakMap`s for each effectively-"private  property" that a `swal` has.
   * For example, to set the private property "foo" of `this` to "bar", you can `privateProps.foo.set(this, 'bar')`
   * This is the approach that Babel will probably take to implement private methods/fields
   *   https://github.com/tc39/proposal-private-methods
   *   https://github.com/babel/babel/pull/7555
   * Once we have the changes from that PR in Babel, and our core class fits reasonable in *one module*
   *   then we can use that language feature.
   */

  var privateProps = {
    promise: new WeakMap$1(),
    innerParams: new WeakMap$1(),
    domCache: new WeakMap$1()
  };
  /**
   * Show spinner instead of Confirm button and disable Cancel button
   */

  function hideLoading() {
    var innerParams = privateProps.innerParams.get(this);
    var domCache = privateProps.domCache.get(this);

    if (!innerParams.showConfirmButton) {
      hide(domCache.confirmButton);

      if (!innerParams.showCancelButton) {
        hide(domCache.actions);
      }
    }

    removeClass([domCache.popup, domCache.actions], swalClasses.loading);
    domCache.popup.removeAttribute('aria-busy');
    domCache.popup.removeAttribute('data-loading');
    domCache.confirmButton.disabled = false;
    domCache.cancelButton.disabled = false;
  } // Get input element by specified type or, if type isn't specified, by params.input


  function getInput(inputType) {
    var innerParams = privateProps.innerParams.get(this);
    var domCache = privateProps.domCache.get(this);
    inputType = inputType || innerParams.input;

    if (!inputType) {
      return null;
    }

    switch (inputType) {
      case 'select':
      case 'textarea':
      case 'file':
        return getChildByClass(domCache.content, swalClasses[inputType]);

      case 'checkbox':
        return domCache.popup.querySelector('.' + swalClasses.checkbox + ' input');

      case 'radio':
        return domCache.popup.querySelector('.' + swalClasses.radio + ' input:checked') || domCache.popup.querySelector('.' + swalClasses.radio + ' input:first-child');

      case 'range':
        return domCache.popup.querySelector('.' + swalClasses.range + ' input');

      default:
        return getChildByClass(domCache.content, swalClasses.input);
    }
  }

  function enableButtons() {
    var domCache = privateProps.domCache.get(this);
    domCache.confirmButton.disabled = false;
    domCache.cancelButton.disabled = false;
  }

  function disableButtons() {
    var domCache = privateProps.domCache.get(this);
    domCache.confirmButton.disabled = true;
    domCache.cancelButton.disabled = true;
  }

  function enableConfirmButton() {
    var domCache = privateProps.domCache.get(this);
    domCache.confirmButton.disabled = false;
  }

  function disableConfirmButton() {
    var domCache = privateProps.domCache.get(this);
    domCache.confirmButton.disabled = true;
  }

  function enableInput() {
    var input = this.getInput();

    if (!input) {
      return false;
    }

    if (input.type === 'radio') {
      var radiosContainer = input.parentNode.parentNode;
      var radios = radiosContainer.querySelectorAll('input');

      for (var i = 0; i < radios.length; i++) {
        radios[i].disabled = false;
      }
    } else {
      input.disabled = false;
    }
  }

  function disableInput() {
    var input = this.getInput();

    if (!input) {
      return false;
    }

    if (input && input.type === 'radio') {
      var radiosContainer = input.parentNode.parentNode;
      var radios = radiosContainer.querySelectorAll('input');

      for (var i = 0; i < radios.length; i++) {
        radios[i].disabled = true;
      }
    } else {
      input.disabled = true;
    }
  } // Show block with validation error


  function showValidationError(error) {
    var domCache = privateProps.domCache.get(this);
    domCache.validationError.innerHTML = error;
    var popupComputedStyle = window.getComputedStyle(domCache.popup);
    domCache.validationError.style.marginLeft = '-' + popupComputedStyle.getPropertyValue('padding-left');
    domCache.validationError.style.marginRight = '-' + popupComputedStyle.getPropertyValue('padding-right');
    show(domCache.validationError);
    var input = this.getInput();

    if (input) {
      input.setAttribute('aria-invalid', true);
      input.setAttribute('aria-describedBy', swalClasses.validationerror);
      focusInput(input);
      addClass(input, swalClasses.inputerror);
    }
  } // Hide block with validation error


  function resetValidationError() {
    var domCache = privateProps.domCache.get(this);

    if (domCache.validationError) {
      hide(domCache.validationError);
    }

    var input = this.getInput();

    if (input) {
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedBy');
      removeClass(input, swalClasses.inputerror);
    }
  }

  var Timer = function Timer(callback, delay) {
    classCallCheck(this, Timer);
    var id, started, running;
    var remaining = delay;

    this.start = function () {
      running = true;
      started = new Date();
      id = setTimeout(callback, remaining);
    };

    this.stop = function () {
      running = false;
      clearTimeout(id);
      remaining -= new Date() - started;
    };

    this.getTimerLeft = function () {
      if (running) {
        this.stop();
        this.start();
      }

      return remaining;
    };

    this.getStateRunning = function () {
      return running;
    };

    this.start();
  };

  var defaultInputValidators = {
    email: function email(string, extraParams) {
      return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(string) ? Promise.resolve() : Promise.reject(extraParams && extraParams.validationMessage ? extraParams.validationMessage : 'Invalid email address');
    },
    url: function url(string, extraParams) {
      // taken from https://stackoverflow.com/a/3809435/1331425
      return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/.test(string) ? Promise.resolve() : Promise.reject(extraParams && extraParams.validationMessage ? extraParams.validationMessage : 'Invalid URL');
    }
  };
  /**
   * Set type, text and actions on popup
   *
   * @param params
   * @returns {boolean}
   */

  function setParameters(params) {
    // Use default `inputValidator` for supported input types if not provided
    if (!params.inputValidator) {
      Object.keys(defaultInputValidators).forEach(function (key) {
        if (params.input === key) {
          params.inputValidator = params.expectRejections ? defaultInputValidators[key] : Swal.adaptInputValidator(defaultInputValidators[key]);
        }
      });
    } // Determine if the custom target element is valid


    if (!params.target || typeof params.target === 'string' && !document.querySelector(params.target) || typeof params.target !== 'string' && !params.target.appendChild) {
      warn('Target parameter is not valid, defaulting to "body"');
      params.target = 'body';
    }

    var popup = void 0;
    var oldPopup = getPopup();
    var targetElement = typeof params.target === 'string' ? document.querySelector(params.target) : params.target; // If the model target has changed, refresh the popup

    if (oldPopup && targetElement && oldPopup.parentNode !== targetElement.parentNode) {
      popup = init(params);
    } else {
      popup = oldPopup || init(params);
    } // Set popup width


    if (params.width) {
      popup.style.width = typeof params.width === 'number' ? params.width + 'px' : params.width;
    } // Set popup padding


    if (params.padding) {
      popup.style.padding = typeof params.padding === 'number' ? params.padding + 'px' : params.padding;
    } // Set popup background


    if (params.background) {
      popup.style.background = params.background;
    }

    var popupBackgroundColor = window.getComputedStyle(popup).getPropertyValue('background-color');
    var successIconParts = popup.querySelectorAll('[class^=swal2-success-circular-line], .swal2-success-fix');

    for (var i = 0; i < successIconParts.length; i++) {
      successIconParts[i].style.backgroundColor = popupBackgroundColor;
    }

    var container = getContainer();
    var title = getTitle();
    var content = getContent().querySelector('#' + swalClasses.content);
    var actions = getActions();
    var confirmButton = getConfirmButton();
    var cancelButton = getCancelButton();
    var closeButton = getCloseButton();
    var footer = getFooter(); // Title

    if (params.titleText) {
      title.innerText = params.titleText;
    } else if (params.title) {
      title.innerHTML = params.title.split('\n').join('<br />');
    }

    if (typeof params.backdrop === 'string') {
      getContainer().style.background = params.backdrop;
    } else if (!params.backdrop) {
      addClass([document.documentElement, document.body], swalClasses['no-backdrop']);
    } // Content as HTML


    if (params.html) {
      parseHtmlToContainer(params.html, content); // Content as plain text
    } else if (params.text) {
      content.textContent = params.text;
      show(content);
    } else {
      hide(content);
    } // Position


    if (params.position in swalClasses) {
      addClass(container, swalClasses[params.position]);
    } else {
      warn('The "position" parameter is not valid, defaulting to "center"');
      addClass(container, swalClasses.center);
    } // Grow


    if (params.grow && typeof params.grow === 'string') {
      var growClass = 'grow-' + params.grow;

      if (growClass in swalClasses) {
        addClass(container, swalClasses[growClass]);
      }
    } // Animation


    if (typeof params.animation === 'function') {
      params.animation = params.animation.call();
    } // Close button


    if (params.showCloseButton) {
      closeButton.setAttribute('aria-label', params.closeButtonAriaLabel);
      show(closeButton);
    } else {
      hide(closeButton);
    } // Default Class


    popup.className = swalClasses.popup;

    if (params.toast) {
      addClass([document.documentElement, document.body], swalClasses['toast-shown']);
      addClass(popup, swalClasses.toast);
    } else {
      addClass(popup, swalClasses.modal);
    } // Custom Class


    if (params.customClass) {
      addClass(popup, params.customClass);
    } // Progress steps


    var progressStepsContainer = getProgressSteps();
    var currentProgressStep = parseInt(params.currentProgressStep === null ? Swal.getQueueStep() : params.currentProgressStep, 10);

    if (params.progressSteps && params.progressSteps.length) {
      show(progressStepsContainer);
      empty(progressStepsContainer);

      if (currentProgressStep >= params.progressSteps.length) {
        warn('Invalid currentProgressStep parameter, it should be less than progressSteps.length ' + '(currentProgressStep like JS arrays starts from 0)');
      }

      params.progressSteps.forEach(function (step, index) {
        var circle = document.createElement('li');
        addClass(circle, swalClasses.progresscircle);
        circle.innerHTML = step;

        if (index === currentProgressStep) {
          addClass(circle, swalClasses.activeprogressstep);
        }

        progressStepsContainer.appendChild(circle);

        if (index !== params.progressSteps.length - 1) {
          var line = document.createElement('li');
          addClass(line, swalClasses.progressline);

          if (params.progressStepsDistance) {
            line.style.width = params.progressStepsDistance;
          }

          progressStepsContainer.appendChild(line);
        }
      });
    } else {
      hide(progressStepsContainer);
    } // Icon


    var icons = getIcons();

    for (var _i = 0; _i < icons.length; _i++) {
      hide(icons[_i]);
    }

    if (params.type) {
      var validType = false;

      for (var iconType in iconTypes) {
        if (params.type === iconType) {
          validType = true;
          break;
        }
      }

      if (!validType) {
        error('Unknown alert type: ' + params.type);
        return false;
      }

      var icon = popup.querySelector('.' + swalClasses.icon + '.' + iconTypes[params.type]);
      show(icon); // Animate icon

      if (params.animation) {
        addClass(icon, 'swal2-animate-' + params.type + '-icon');
      }
    } // Custom image


    var image = getImage();

    if (params.imageUrl) {
      image.setAttribute('src', params.imageUrl);
      image.setAttribute('alt', params.imageAlt);
      show(image);

      if (params.imageWidth) {
        image.setAttribute('width', params.imageWidth);
      } else {
        image.removeAttribute('width');
      }

      if (params.imageHeight) {
        image.setAttribute('height', params.imageHeight);
      } else {
        image.removeAttribute('height');
      }

      image.className = swalClasses.image;

      if (params.imageClass) {
        addClass(image, params.imageClass);
      }
    } else {
      hide(image);
    } // Cancel button


    if (params.showCancelButton) {
      cancelButton.style.display = 'inline-block';
    } else {
      hide(cancelButton);
    } // Confirm button


    if (params.showConfirmButton) {
      removeStyleProperty(confirmButton, 'display');
    } else {
      hide(confirmButton);
    } // Actions (buttons) wrapper


    if (!params.showConfirmButton && !params.showCancelButton) {
      hide(actions);
    } else {
      show(actions);
    } // Edit text on confirm and cancel buttons


    confirmButton.innerHTML = params.confirmButtonText;
    cancelButton.innerHTML = params.cancelButtonText; // ARIA labels for confirm and cancel buttons

    confirmButton.setAttribute('aria-label', params.confirmButtonAriaLabel);
    cancelButton.setAttribute('aria-label', params.cancelButtonAriaLabel); // Add buttons custom classes

    confirmButton.className = swalClasses.confirm;
    addClass(confirmButton, params.confirmButtonClass);
    cancelButton.className = swalClasses.cancel;
    addClass(cancelButton, params.cancelButtonClass); // Buttons styling

    if (params.buttonsStyling) {
      addClass([confirmButton, cancelButton], swalClasses.styled); // Buttons background colors

      if (params.confirmButtonColor) {
        confirmButton.style.backgroundColor = params.confirmButtonColor;
      }

      if (params.cancelButtonColor) {
        cancelButton.style.backgroundColor = params.cancelButtonColor;
      } // Loading state


      var confirmButtonBackgroundColor = window.getComputedStyle(confirmButton).getPropertyValue('background-color');
      confirmButton.style.borderLeftColor = confirmButtonBackgroundColor;
      confirmButton.style.borderRightColor = confirmButtonBackgroundColor;
    } else {
      removeClass([confirmButton, cancelButton], swalClasses.styled);
      confirmButton.style.backgroundColor = confirmButton.style.borderLeftColor = confirmButton.style.borderRightColor = '';
      cancelButton.style.backgroundColor = cancelButton.style.borderLeftColor = cancelButton.style.borderRightColor = '';
    } // Footer


    parseHtmlToContainer(params.footer, footer); // CSS animation

    if (params.animation === true) {
      removeClass(popup, swalClasses.noanimation);
    } else {
      addClass(popup, swalClasses.noanimation);
    } // showLoaderOnConfirm && preConfirm


    if (params.showLoaderOnConfirm && !params.preConfirm) {
      warn('showLoaderOnConfirm is set to true, but preConfirm is not defined.\n' + 'showLoaderOnConfirm should be used together with preConfirm, see usage example:\n' + 'https://sweetalert2.github.io/#ajax-request');
    }
  }
  /**
   * Open popup, add necessary classes and styles, fix scrollbar
   *
   * @param {Array} params
   */


  var openPopup = function openPopup(params) {
    var container = getContainer();
    var popup = getPopup();

    if (params.onBeforeOpen !== null && typeof params.onBeforeOpen === 'function') {
      params.onBeforeOpen(popup);
    }

    if (params.animation) {
      addClass(popup, swalClasses.show);
      addClass(container, swalClasses.fade);
      removeClass(popup, swalClasses.hide);
    } else {
      removeClass(popup, swalClasses.fade);
    }

    show(popup); // scrolling is 'hidden' until animation is done, after that 'auto'

    container.style.overflowY = 'hidden';

    if (animationEndEvent && !hasClass(popup, swalClasses.noanimation)) {
      popup.addEventListener(animationEndEvent, function swalCloseEventFinished() {
        popup.removeEventListener(animationEndEvent, swalCloseEventFinished);
        container.style.overflowY = 'auto';
      });
    } else {
      container.style.overflowY = 'auto';
    }

    addClass([document.documentElement, document.body, container], swalClasses.shown);

    if (params.heightAuto && params.backdrop && !params.toast) {
      addClass([document.documentElement, document.body], swalClasses['height-auto']);
    }

    if (isModal()) {
      fixScrollbar();
      iOSfix();
    }

    if (!globalState.previousActiveElement) {
      globalState.previousActiveElement = document.activeElement;
    }

    if (params.onOpen !== null && typeof params.onOpen === 'function') {
      setTimeout(function () {
        params.onOpen(popup);
      });
    }
  };

  function _main(userParams) {
    var _this = this;

    showWarningsForParams(userParams);

    var innerParams = _extends({}, defaultParams, userParams);

    setParameters(innerParams);
    Object.freeze(innerParams);
    privateProps.innerParams.set(this, innerParams); // clear the previous timer

    if (globalState.timeout) {
      globalState.timeout.stop();
      delete globalState.timeout;
    } // clear the restore focus timeout


    clearTimeout(globalState.restoreFocusTimeout);
    var domCache = {
      popup: getPopup(),
      container: getContainer(),
      content: getContent(),
      actions: getActions(),
      confirmButton: getConfirmButton(),
      cancelButton: getCancelButton(),
      closeButton: getCloseButton(),
      validationError: getValidationError(),
      progressSteps: getProgressSteps()
    };
    privateProps.domCache.set(this, domCache);
    var constructor = this.constructor;
    return new Promise(function (resolve, reject) {
      // functions to handle all resolving/rejecting/settling
      var succeedWith = function succeedWith(value) {
        constructor.closePopup(innerParams.onClose, innerParams.onAfterClose); // TODO: make closePopup an *instance* method

        if (innerParams.useRejections) {
          resolve(value);
        } else {
          resolve({
            value: value
          });
        }
      };

      var dismissWith = function dismissWith(dismiss) {
        constructor.closePopup(innerParams.onClose, innerParams.onAfterClose);

        if (innerParams.useRejections) {
          reject(dismiss);
        } else {
          resolve({
            dismiss: dismiss
          });
        }
      };

      var errorWith = function errorWith(error$$1) {
        constructor.closePopup(innerParams.onClose, innerParams.onAfterClose);
        reject(error$$1);
      }; // Close on timer


      if (innerParams.timer) {
        globalState.timeout = new Timer(function () {
          dismissWith('timer');
          delete globalState.timeout;
        }, innerParams.timer);
      } // Get the value of the popup input


      var getInputValue = function getInputValue() {
        var input = _this.getInput();

        if (!input) {
          return null;
        }

        switch (innerParams.input) {
          case 'checkbox':
            return input.checked ? 1 : 0;

          case 'radio':
            return input.checked ? input.value : null;

          case 'file':
            return input.files.length ? input.files[0] : null;

          default:
            return innerParams.inputAutoTrim ? input.value.trim() : input.value;
        }
      }; // input autofocus


      if (innerParams.input) {
        setTimeout(function () {
          var input = _this.getInput();

          if (input) {
            focusInput(input);
          }
        }, 0);
      }

      var confirm = function confirm(value) {
        if (innerParams.showLoaderOnConfirm) {
          constructor.showLoading(); // TODO: make showLoading an *instance* method
        }

        if (innerParams.preConfirm) {
          _this.resetValidationError();

          var preConfirmPromise = Promise.resolve().then(function () {
            return innerParams.preConfirm(value, innerParams.extraParams);
          });

          if (innerParams.expectRejections) {
            preConfirmPromise.then(function (preConfirmValue) {
              return succeedWith(preConfirmValue || value);
            }, function (validationError) {
              _this.hideLoading();

              if (validationError) {
                _this.showValidationError(validationError);
              }
            });
          } else {
            preConfirmPromise.then(function (preConfirmValue) {
              if (isVisible(domCache.validationError) || preConfirmValue === false) {
                _this.hideLoading();
              } else {
                succeedWith(preConfirmValue || value);
              }
            }, function (error$$1) {
              return errorWith(error$$1);
            });
          }
        } else {
          succeedWith(value);
        }
      }; // Mouse interactions


      var onButtonEvent = function onButtonEvent(event) {
        var e = event || window.event;
        var target = e.target || e.srcElement;
        var confirmButton = domCache.confirmButton,
            cancelButton = domCache.cancelButton;
        var targetedConfirm = confirmButton && (confirmButton === target || confirmButton.contains(target));
        var targetedCancel = cancelButton && (cancelButton === target || cancelButton.contains(target));

        switch (e.type) {
          case 'click':
            // Clicked 'confirm'
            if (targetedConfirm && constructor.isVisible()) {
              _this.disableButtons();

              if (innerParams.input) {
                var inputValue = getInputValue();

                if (innerParams.inputValidator) {
                  _this.disableInput();

                  var validationPromise = Promise.resolve().then(function () {
                    return innerParams.inputValidator(inputValue, innerParams.extraParams);
                  });

                  if (innerParams.expectRejections) {
                    validationPromise.then(function () {
                      _this.enableButtons();

                      _this.enableInput();

                      confirm(inputValue);
                    }, function (validationError) {
                      _this.enableButtons();

                      _this.enableInput();

                      if (validationError) {
                        _this.showValidationError(validationError);
                      }
                    });
                  } else {
                    validationPromise.then(function (validationError) {
                      _this.enableButtons();

                      _this.enableInput();

                      if (validationError) {
                        _this.showValidationError(validationError);
                      } else {
                        confirm(inputValue);
                      }
                    }, function (error$$1) {
                      return errorWith(error$$1);
                    });
                  }
                } else {
                  confirm(inputValue);
                }
              } else {
                confirm(true);
              } // Clicked 'cancel'

            } else if (targetedCancel && constructor.isVisible()) {
              _this.disableButtons();

              dismissWith(constructor.DismissReason.cancel);
            }

            break;

          default:
        }
      };

      var buttons = domCache.popup.querySelectorAll('button');

      for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = onButtonEvent;
        buttons[i].onmouseover = onButtonEvent;
        buttons[i].onmouseout = onButtonEvent;
        buttons[i].onmousedown = onButtonEvent;
      } // Closing popup by close button


      domCache.closeButton.onclick = function () {
        dismissWith(constructor.DismissReason.close);
      };

      if (innerParams.toast) {
        // Closing popup by internal click
        domCache.popup.onclick = function (e) {
          if (innerParams.showConfirmButton || innerParams.showCancelButton || innerParams.showCloseButton || innerParams.input) {
            return;
          }

          constructor.closePopup(innerParams.onClose, innerParams.onAfterClose);
          dismissWith(constructor.DismissReason.close);
        };
      } else {
        var ignoreOutsideClick = false; // Ignore click events that had mousedown on the popup but mouseup on the container
        // This can happen when the user drags a slider

        domCache.popup.onmousedown = function () {
          domCache.container.onmouseup = function (e) {
            domCache.container.onmouseup = undefined; // We only check if the mouseup target is the container because usually it doesn't
            // have any other direct children aside of the popup

            if (e.target === domCache.container) {
              ignoreOutsideClick = true;
            }
          };
        }; // Ignore click events that had mousedown on the container but mouseup on the popup


        domCache.container.onmousedown = function () {
          domCache.popup.onmouseup = function (e) {
            domCache.popup.onmouseup = undefined; // We also need to check if the mouseup target is a child of the popup

            if (e.target === domCache.popup || domCache.popup.contains(e.target)) {
              ignoreOutsideClick = true;
            }
          };
        };

        domCache.container.onclick = function (e) {
          if (ignoreOutsideClick) {
            ignoreOutsideClick = false;
            return;
          }

          if (e.target !== domCache.container) {
            return;
          }

          if (callIfFunction(innerParams.allowOutsideClick)) {
            dismissWith(constructor.DismissReason.backdrop);
          }
        };
      } // Reverse buttons (Confirm on the right side)


      if (innerParams.reverseButtons) {
        domCache.confirmButton.parentNode.insertBefore(domCache.cancelButton, domCache.confirmButton);
      } else {
        domCache.confirmButton.parentNode.insertBefore(domCache.confirmButton, domCache.cancelButton);
      } // Focus handling


      var setFocus = function setFocus(index, increment) {
        var focusableElements = getFocusableElements(innerParams.focusCancel); // search for visible elements and select the next possible match

        for (var _i = 0; _i < focusableElements.length; _i++) {
          index = index + increment; // rollover to first item

          if (index === focusableElements.length) {
            index = 0; // go to last item
          } else if (index === -1) {
            index = focusableElements.length - 1;
          } // determine if element is visible


          var el = focusableElements[index];

          if (isVisible(el)) {
            return el.focus();
          }
        } // no visible focusable elements, focus the popup


        domCache.popup.focus();
      };

      var keydownHandler = function keydownHandler(e, innerParams) {
        if (innerParams.stopKeydownPropagation) {
          e.stopPropagation();
        }

        var arrowKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Left', 'Right', 'Up', 'Down' // IE11
        ];

        if (e.key === 'Enter' && !e.isComposing) {
          if (e.target && _this.getInput() && e.target.outerHTML === _this.getInput().outerHTML) {
            if (['textarea', 'file'].indexOf(innerParams.input) !== -1) {
              return; // do not submit
            }

            constructor.clickConfirm();
            e.preventDefault();
          } // TAB

        } else if (e.key === 'Tab') {
          var targetElement = e.target || e.srcElement;
          var focusableElements = getFocusableElements(innerParams.focusCancel);
          var btnIndex = -1; // Find the button - note, this is a nodelist, not an array.

          for (var _i2 = 0; _i2 < focusableElements.length; _i2++) {
            if (targetElement === focusableElements[_i2]) {
              btnIndex = _i2;
              break;
            }
          }

          if (!e.shiftKey) {
            // Cycle to the next button
            setFocus(btnIndex, 1);
          } else {
            // Cycle to the prev button
            setFocus(btnIndex, -1);
          }

          e.stopPropagation();
          e.preventDefault(); // ARROWS - switch focus between buttons
        } else if (arrowKeys.indexOf(e.key) !== -1) {
          // focus Cancel button if Confirm button is currently focused
          if (document.activeElement === domCache.confirmButton && isVisible(domCache.cancelButton)) {
            domCache.cancelButton.focus(); // and vice versa
          } else if (document.activeElement === domCache.cancelButton && isVisible(domCache.confirmButton)) {
            domCache.confirmButton.focus();
          } // ESC

        } else if ((e.key === 'Escape' || e.key === 'Esc') && callIfFunction(innerParams.allowEscapeKey) === true) {
          dismissWith(constructor.DismissReason.esc);
        }
      };

      if (globalState.keydownHandlerAdded) {
        globalState.keydownTarget.removeEventListener('keydown', globalState.keydownHandler, {
          capture: globalState.keydownListenerCapture
        });
        globalState.keydownHandlerAdded = false;
      }

      if (!innerParams.toast) {
        globalState.keydownHandler = function (e) {
          return keydownHandler(e, innerParams);
        };

        globalState.keydownTarget = innerParams.keydownListenerCapture ? window : domCache.popup;
        globalState.keydownListenerCapture = innerParams.keydownListenerCapture;
        globalState.keydownTarget.addEventListener('keydown', globalState.keydownHandler, {
          capture: globalState.keydownListenerCapture
        });
        globalState.keydownHandlerAdded = true;
      }

      _this.enableButtons();

      _this.hideLoading();

      _this.resetValidationError();

      if (innerParams.input) {
        addClass(document.body, swalClasses['has-input']);
      } // inputs


      var inputTypes = ['input', 'file', 'range', 'select', 'radio', 'checkbox', 'textarea'];
      var input = void 0;

      for (var _i3 = 0; _i3 < inputTypes.length; _i3++) {
        var inputClass = swalClasses[inputTypes[_i3]];
        var inputContainer = getChildByClass(domCache.content, inputClass);
        input = _this.getInput(inputTypes[_i3]); // set attributes

        if (input) {
          for (var j in input.attributes) {
            if (input.attributes.hasOwnProperty(j)) {
              var attrName = input.attributes[j].name;

              if (attrName !== 'type' && attrName !== 'value') {
                input.removeAttribute(attrName);
              }
            }
          }

          for (var attr in innerParams.inputAttributes) {
            input.setAttribute(attr, innerParams.inputAttributes[attr]);
          }
        } // set class


        inputContainer.className = inputClass;

        if (innerParams.inputClass) {
          addClass(inputContainer, innerParams.inputClass);
        }

        hide(inputContainer);
      }

      var populateInputOptions = void 0;

      switch (innerParams.input) {
        case 'text':
        case 'email':
        case 'password':
        case 'number':
        case 'tel':
        case 'url':
          input = getChildByClass(domCache.content, swalClasses.input);
          input.value = innerParams.inputValue;
          input.placeholder = innerParams.inputPlaceholder;
          input.type = innerParams.input;
          show(input);
          break;

        case 'file':
          input = getChildByClass(domCache.content, swalClasses.file);
          input.placeholder = innerParams.inputPlaceholder;
          input.type = innerParams.input;
          show(input);
          break;

        case 'range':
          var range = getChildByClass(domCache.content, swalClasses.range);
          var rangeInput = range.querySelector('input');
          var rangeOutput = range.querySelector('output');
          rangeInput.value = innerParams.inputValue;
          rangeInput.type = innerParams.input;
          rangeOutput.value = innerParams.inputValue;
          show(range);
          break;

        case 'select':
          var select = getChildByClass(domCache.content, swalClasses.select);
          select.innerHTML = '';

          if (innerParams.inputPlaceholder) {
            var placeholder = document.createElement('option');
            placeholder.innerHTML = innerParams.inputPlaceholder;
            placeholder.value = '';
            placeholder.disabled = true;
            placeholder.selected = true;
            select.appendChild(placeholder);
          }

          populateInputOptions = function populateInputOptions(inputOptions) {
            inputOptions.forEach(function (_ref) {
              var _ref2 = slicedToArray(_ref, 2),
                  optionValue = _ref2[0],
                  optionLabel = _ref2[1];

              var option = document.createElement('option');
              option.value = optionValue;
              option.innerHTML = optionLabel;

              if (innerParams.inputValue.toString() === optionValue.toString()) {
                option.selected = true;
              }

              select.appendChild(option);
            });
            show(select);
            select.focus();
          };

          break;

        case 'radio':
          var radio = getChildByClass(domCache.content, swalClasses.radio);
          radio.innerHTML = '';

          populateInputOptions = function populateInputOptions(inputOptions) {
            inputOptions.forEach(function (_ref3) {
              var _ref4 = slicedToArray(_ref3, 2),
                  radioValue = _ref4[0],
                  radioLabel = _ref4[1];

              var radioInput = document.createElement('input');
              var radioLabelElement = document.createElement('label');
              radioInput.type = 'radio';
              radioInput.name = swalClasses.radio;
              radioInput.value = radioValue;

              if (innerParams.inputValue.toString() === radioValue.toString()) {
                radioInput.checked = true;
              }

              radioLabelElement.innerHTML = radioLabel;
              radioLabelElement.insertBefore(radioInput, radioLabelElement.firstChild);
              radio.appendChild(radioLabelElement);
            });
            show(radio);
            var radios = radio.querySelectorAll('input');

            if (radios.length) {
              radios[0].focus();
            }
          };

          break;

        case 'checkbox':
          var checkbox = getChildByClass(domCache.content, swalClasses.checkbox);

          var checkboxInput = _this.getInput('checkbox');

          checkboxInput.type = 'checkbox';
          checkboxInput.value = 1;
          checkboxInput.id = swalClasses.checkbox;
          checkboxInput.checked = Boolean(innerParams.inputValue);
          var label = checkbox.getElementsByTagName('span');

          if (label.length) {
            checkbox.removeChild(label[0]);
          }

          label = document.createElement('span');
          label.innerHTML = innerParams.inputPlaceholder;
          checkbox.appendChild(label);
          show(checkbox);
          break;

        case 'textarea':
          var textarea = getChildByClass(domCache.content, swalClasses.textarea);
          textarea.value = innerParams.inputValue;
          textarea.placeholder = innerParams.inputPlaceholder;
          show(textarea);
          break;

        case null:
          break;

        default:
          error('Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "' + innerParams.input + '"');
          break;
      }

      if (innerParams.input === 'select' || innerParams.input === 'radio') {
        var processInputOptions = function processInputOptions(inputOptions) {
          return populateInputOptions(formatInputOptions(inputOptions));
        };

        if (isThenable(innerParams.inputOptions)) {
          constructor.showLoading();
          innerParams.inputOptions.then(function (inputOptions) {
            _this.hideLoading();

            processInputOptions(inputOptions);
          });
        } else if (_typeof(innerParams.inputOptions) === 'object') {
          processInputOptions(innerParams.inputOptions);
        } else {
          error('Unexpected type of inputOptions! Expected object, Map or Promise, got ' + _typeof(innerParams.inputOptions));
        }
      } else if (['text', 'email', 'number', 'tel', 'textarea'].indexOf(innerParams.input) !== -1 && isThenable(innerParams.inputValue)) {
        constructor.showLoading();
        hide(input);
        innerParams.inputValue.then(function (inputValue) {
          input.value = innerParams.input === 'number' ? parseFloat(inputValue) || 0 : inputValue + '';
          show(input);

          _this.hideLoading();
        })["catch"](function (err) {
          error('Error in inputValue promise: ' + err);
          input.value = '';
          show(input);

          _this.hideLoading();
        });
      }

      openPopup(innerParams);

      if (!innerParams.toast) {
        if (!callIfFunction(innerParams.allowEnterKey)) {
          if (document.activeElement) {
            document.activeElement.blur();
          }
        } else if (innerParams.focusCancel && isVisible(domCache.cancelButton)) {
          domCache.cancelButton.focus();
        } else if (innerParams.focusConfirm && isVisible(domCache.confirmButton)) {
          domCache.confirmButton.focus();
        } else {
          setFocus(-1, 1);
        }
      } // fix scroll


      domCache.container.scrollTop = 0;
    });
  }

  var instanceMethods = Object.freeze({
    hideLoading: hideLoading,
    disableLoading: hideLoading,
    getInput: getInput,
    enableButtons: enableButtons,
    disableButtons: disableButtons,
    enableConfirmButton: enableConfirmButton,
    disableConfirmButton: disableConfirmButton,
    enableInput: enableInput,
    disableInput: disableInput,
    showValidationError: showValidationError,
    resetValidationError: resetValidationError,
    _main: _main
  });
  var currentInstance = void 0; // SweetAlert constructor

  function SweetAlert() {
    // Prevent run in Node env
    if (typeof window === 'undefined') {
      return;
    } // Check for the existence of Promise


    if (typeof Promise === 'undefined') {
      error('This package requires a Promise library, please include a shim to enable it in this browser (See: https://github.com/sweetalert2/sweetalert2/wiki/Migration-from-SweetAlert-to-SweetAlert2#1-ie-support)');
    }

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (typeof args[0] === 'undefined') {
      error('SweetAlert2 expects at least 1 attribute!');
      return false;
    }

    currentInstance = this;
    var outerParams = Object.freeze(this.constructor.argsToParams(args));
    Object.defineProperties(this, {
      params: {
        value: outerParams,
        writable: false,
        enumerable: true
      }
    });

    var promise = this._main(this.params);

    privateProps.promise.set(this, promise);
  } // `catch` cannot be the name of a module export, so we define our thenable methods here instead


  SweetAlert.prototype.then = function (onFulfilled, onRejected) {
    var promise = privateProps.promise.get(this);
    return promise.then(onFulfilled, onRejected);
  };

  SweetAlert.prototype["catch"] = function (onRejected) {
    var promise = privateProps.promise.get(this);
    return promise["catch"](onRejected);
  };

  SweetAlert.prototype["finally"] = function (onFinally) {
    var promise = privateProps.promise.get(this);
    return promise["finally"](onFinally);
  }; // Assign instance methods from src/instanceMethods/*.js to prototype


  _extends(SweetAlert.prototype, instanceMethods); // Assign static methods from src/staticMethods/*.js to constructor


  _extends(SweetAlert, staticMethods); // Proxy to instance methods to constructor, for now, for backwards compatibility


  Object.keys(instanceMethods).forEach(function (key) {
    SweetAlert[key] = function () {
      if (currentInstance) {
        var _currentInstance;

        return (_currentInstance = currentInstance)[key].apply(_currentInstance, arguments);
      }
    };
  });
  SweetAlert.DismissReason = DismissReason;

  SweetAlert.noop = function () {};

  SweetAlert.version = version;
  var Swal = withNoNewKeyword(withGlobalDefaults(SweetAlert));
  Swal["default"] = Swal;
  return Swal;
});

if (typeof window !== 'undefined' && window.Sweetalert2) {
  window.swal = window.sweetAlert = window.Swal = window.SweetAlert = window.Sweetalert2;
}

"undefined" != typeof document && function (e, t) {
  var n = e.createElement("style");
  if (e.getElementsByTagName("head")[0].appendChild(n), n.styleSheet) n.styleSheet.disabled || (n.styleSheet.cssText = t);else try {
    n.innerHTML = t;
  } catch (e) {
    n.innerText = t;
  }
}(document, "@-webkit-keyframes swal2-show {\n" + "  0% {\n" + "    -webkit-transform: scale(0.7);\n" + "            transform: scale(0.7); }\n" + "  45% {\n" + "    -webkit-transform: scale(1.05);\n" + "            transform: scale(1.05); }\n" + "  80% {\n" + "    -webkit-transform: scale(0.95);\n" + "            transform: scale(0.95); }\n" + "  100% {\n" + "    -webkit-transform: scale(1);\n" + "            transform: scale(1); } }\n" + "\n" + "@keyframes swal2-show {\n" + "  0% {\n" + "    -webkit-transform: scale(0.7);\n" + "            transform: scale(0.7); }\n" + "  45% {\n" + "    -webkit-transform: scale(1.05);\n" + "            transform: scale(1.05); }\n" + "  80% {\n" + "    -webkit-transform: scale(0.95);\n" + "            transform: scale(0.95); }\n" + "  100% {\n" + "    -webkit-transform: scale(1);\n" + "            transform: scale(1); } }\n" + "\n" + "@-webkit-keyframes swal2-hide {\n" + "  0% {\n" + "    -webkit-transform: scale(1);\n" + "            transform: scale(1);\n" + "    opacity: 1; }\n" + "  100% {\n" + "    -webkit-transform: scale(0.5);\n" + "            transform: scale(0.5);\n" + "    opacity: 0; } }\n" + "\n" + "@keyframes swal2-hide {\n" + "  0% {\n" + "    -webkit-transform: scale(1);\n" + "            transform: scale(1);\n" + "    opacity: 1; }\n" + "  100% {\n" + "    -webkit-transform: scale(0.5);\n" + "            transform: scale(0.5);\n" + "    opacity: 0; } }\n" + "\n" + "@-webkit-keyframes swal2-animate-success-line-tip {\n" + "  0% {\n" + "    top: 1.1875em;\n" + "    left: .0625em;\n" + "    width: 0; }\n" + "  54% {\n" + "    top: 1.0625em;\n" + "    left: .125em;\n" + "    width: 0; }\n" + "  70% {\n" + "    top: 2.1875em;\n" + "    left: -.375em;\n" + "    width: 3.125em; }\n" + "  84% {\n" + "    top: 3em;\n" + "    left: 1.3125em;\n" + "    width: 1.0625em; }\n" + "  100% {\n" + "    top: 2.8125em;\n" + "    left: .875em;\n" + "    width: 1.5625em; } }\n" + "\n" + "@keyframes swal2-animate-success-line-tip {\n" + "  0% {\n" + "    top: 1.1875em;\n" + "    left: .0625em;\n" + "    width: 0; }\n" + "  54% {\n" + "    top: 1.0625em;\n" + "    left: .125em;\n" + "    width: 0; }\n" + "  70% {\n" + "    top: 2.1875em;\n" + "    left: -.375em;\n" + "    width: 3.125em; }\n" + "  84% {\n" + "    top: 3em;\n" + "    left: 1.3125em;\n" + "    width: 1.0625em; }\n" + "  100% {\n" + "    top: 2.8125em;\n" + "    left: .875em;\n" + "    width: 1.5625em; } }\n" + "\n" + "@-webkit-keyframes swal2-animate-success-line-long {\n" + "  0% {\n" + "    top: 3.375em;\n" + "    right: 2.875em;\n" + "    width: 0; }\n" + "  65% {\n" + "    top: 3.375em;\n" + "    right: 2.875em;\n" + "    width: 0; }\n" + "  84% {\n" + "    top: 2.1875em;\n" + "    right: 0;\n" + "    width: 3.4375em; }\n" + "  100% {\n" + "    top: 2.375em;\n" + "    right: .5em;\n" + "    width: 2.9375em; } }\n" + "\n" + "@keyframes swal2-animate-success-line-long {\n" + "  0% {\n" + "    top: 3.375em;\n" + "    right: 2.875em;\n" + "    width: 0; }\n" + "  65% {\n" + "    top: 3.375em;\n" + "    right: 2.875em;\n" + "    width: 0; }\n" + "  84% {\n" + "    top: 2.1875em;\n" + "    right: 0;\n" + "    width: 3.4375em; }\n" + "  100% {\n" + "    top: 2.375em;\n" + "    right: .5em;\n" + "    width: 2.9375em; } }\n" + "\n" + "@-webkit-keyframes swal2-rotate-success-circular-line {\n" + "  0% {\n" + "    -webkit-transform: rotate(-45deg);\n" + "            transform: rotate(-45deg); }\n" + "  5% {\n" + "    -webkit-transform: rotate(-45deg);\n" + "            transform: rotate(-45deg); }\n" + "  12% {\n" + "    -webkit-transform: rotate(-405deg);\n" + "            transform: rotate(-405deg); }\n" + "  100% {\n" + "    -webkit-transform: rotate(-405deg);\n" + "            transform: rotate(-405deg); } }\n" + "\n" + "@keyframes swal2-rotate-success-circular-line {\n" + "  0% {\n" + "    -webkit-transform: rotate(-45deg);\n" + "            transform: rotate(-45deg); }\n" + "  5% {\n" + "    -webkit-transform: rotate(-45deg);\n" + "            transform: rotate(-45deg); }\n" + "  12% {\n" + "    -webkit-transform: rotate(-405deg);\n" + "            transform: rotate(-405deg); }\n" + "  100% {\n" + "    -webkit-transform: rotate(-405deg);\n" + "            transform: rotate(-405deg); } }\n" + "\n" + "@-webkit-keyframes swal2-animate-error-x-mark {\n" + "  0% {\n" + "    margin-top: 1.625em;\n" + "    -webkit-transform: scale(0.4);\n" + "            transform: scale(0.4);\n" + "    opacity: 0; }\n" + "  50% {\n" + "    margin-top: 1.625em;\n" + "    -webkit-transform: scale(0.4);\n" + "            transform: scale(0.4);\n" + "    opacity: 0; }\n" + "  80% {\n" + "    margin-top: -.375em;\n" + "    -webkit-transform: scale(1.15);\n" + "            transform: scale(1.15); }\n" + "  100% {\n" + "    margin-top: 0;\n" + "    -webkit-transform: scale(1);\n" + "            transform: scale(1);\n" + "    opacity: 1; } }\n" + "\n" + "@keyframes swal2-animate-error-x-mark {\n" + "  0% {\n" + "    margin-top: 1.625em;\n" + "    -webkit-transform: scale(0.4);\n" + "            transform: scale(0.4);\n" + "    opacity: 0; }\n" + "  50% {\n" + "    margin-top: 1.625em;\n" + "    -webkit-transform: scale(0.4);\n" + "            transform: scale(0.4);\n" + "    opacity: 0; }\n" + "  80% {\n" + "    margin-top: -.375em;\n" + "    -webkit-transform: scale(1.15);\n" + "            transform: scale(1.15); }\n" + "  100% {\n" + "    margin-top: 0;\n" + "    -webkit-transform: scale(1);\n" + "            transform: scale(1);\n" + "    opacity: 1; } }\n" + "\n" + "@-webkit-keyframes swal2-animate-error-icon {\n" + "  0% {\n" + "    -webkit-transform: rotateX(100deg);\n" + "            transform: rotateX(100deg);\n" + "    opacity: 0; }\n" + "  100% {\n" + "    -webkit-transform: rotateX(0deg);\n" + "            transform: rotateX(0deg);\n" + "    opacity: 1; } }\n" + "\n" + "@keyframes swal2-animate-error-icon {\n" + "  0% {\n" + "    -webkit-transform: rotateX(100deg);\n" + "            transform: rotateX(100deg);\n" + "    opacity: 0; }\n" + "  100% {\n" + "    -webkit-transform: rotateX(0deg);\n" + "            transform: rotateX(0deg);\n" + "    opacity: 1; } }\n" + "\n" + "body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast {\n" + "  flex-direction: column;\n" + "  align-items: stretch; }\n" + "  body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast .swal2-actions {\n" + "    flex: 1;\n" + "    align-self: stretch;\n" + "    justify-content: flex-end;\n" + "    height: 2.2em; }\n" + "  body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast .swal2-loading {\n" + "    justify-content: center; }\n" + "  body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast .swal2-input {\n" + "    height: 2em;\n" + "    margin: .3125em auto;\n" + "    font-size: 1em; }\n" + "  body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast .swal2-validationerror {\n" + "    font-size: 1em; }\n" + "\n" + "body.swal2-toast-shown > .swal2-container {\n" + "  position: fixed;\n" + "  background-color: transparent; }\n" + "  body.swal2-toast-shown > .swal2-container.swal2-shown {\n" + "    background-color: transparent; }\n" + "  body.swal2-toast-shown > .swal2-container.swal2-top {\n" + "    top: 0;\n" + "    right: auto;\n" + "    bottom: auto;\n" + "    left: 50%;\n" + "    -webkit-transform: translateX(-50%);\n" + "            transform: translateX(-50%); }\n" + "  body.swal2-toast-shown > .swal2-container.swal2-top-end, body.swal2-toast-shown > .swal2-container.swal2-top-right {\n" + "    top: 0;\n" + "    right: 0;\n" + "    bottom: auto;\n" + "    left: auto; }\n" + "  body.swal2-toast-shown > .swal2-container.swal2-top-start, body.swal2-toast-shown > .swal2-container.swal2-top-left {\n" + "    top: 0;\n" + "    right: auto;\n" + "    bottom: auto;\n" + "    left: 0; }\n" + "  body.swal2-toast-shown > .swal2-container.swal2-center-start, body.swal2-toast-shown > .swal2-container.swal2-center-left {\n" + "    top: 50%;\n" + "    right: auto;\n" + "    bottom: auto;\n" + "    left: 0;\n" + "    -webkit-transform: translateY(-50%);\n" + "            transform: translateY(-50%); }\n" + "  body.swal2-toast-shown > .swal2-container.swal2-center {\n" + "    top: 50%;\n" + "    right: auto;\n" + "    bottom: auto;\n" + "    left: 50%;\n" + "    -webkit-transform: translate(-50%, -50%);\n" + "            transform: translate(-50%, -50%); }\n" + "  body.swal2-toast-shown > .swal2-container.swal2-center-end, body.swal2-toast-shown > .swal2-container.swal2-center-right {\n" + "    top: 50%;\n" + "    right: 0;\n" + "    bottom: auto;\n" + "    left: auto;\n" + "    -webkit-transform: translateY(-50%);\n" + "            transform: translateY(-50%); }\n" + "  body.swal2-toast-shown > .swal2-container.swal2-bottom-start, body.swal2-toast-shown > .swal2-container.swal2-bottom-left {\n" + "    top: auto;\n" + "    right: auto;\n" + "    bottom: 0;\n" + "    left: 0; }\n" + "  body.swal2-toast-shown > .swal2-container.swal2-bottom {\n" + "    top: auto;\n" + "    right: auto;\n" + "    bottom: 0;\n" + "    left: 50%;\n" + "    -webkit-transform: translateX(-50%);\n" + "            transform: translateX(-50%); }\n" + "  body.swal2-toast-shown > .swal2-container.swal2-bottom-end, body.swal2-toast-shown > .swal2-container.swal2-bottom-right {\n" + "    top: auto;\n" + "    right: 0;\n" + "    bottom: 0;\n" + "    left: auto; }\n" + "\n" + ".swal2-popup.swal2-toast {\n" + "  flex-direction: row;\n" + "  align-items: center;\n" + "  width: auto;\n" + "  padding: 0.625em;\n" + "  box-shadow: 0 0 0.625em #d9d9d9;\n" + "  overflow-y: hidden; }\n" + "  .swal2-popup.swal2-toast .swal2-header {\n" + "    flex-direction: row; }\n" + "  .swal2-popup.swal2-toast .swal2-title {\n" + "    justify-content: flex-start;\n" + "    margin: 0 .6em;\n" + "    font-size: 1em; }\n" + "  .swal2-popup.swal2-toast .swal2-close {\n" + "    position: initial; }\n" + "  .swal2-popup.swal2-toast .swal2-content {\n" + "    justify-content: flex-start;\n" + "    font-size: 1em; }\n" + "  .swal2-popup.swal2-toast .swal2-icon {\n" + "    width: 2em;\n" + "    min-width: 2em;\n" + "    height: 2em;\n" + "    margin: 0; }\n" + "    .swal2-popup.swal2-toast .swal2-icon-text {\n" + "      font-size: 2em;\n" + "      font-weight: bold;\n" + "      line-height: 1em; }\n" + "    .swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring {\n" + "      width: 2em;\n" + "      height: 2em; }\n" + "    .swal2-popup.swal2-toast .swal2-icon.swal2-error [class^='swal2-x-mark-line'] {\n" + "      top: .875em;\n" + "      width: 1.375em; }\n" + "      .swal2-popup.swal2-toast .swal2-icon.swal2-error [class^='swal2-x-mark-line'][class$='left'] {\n" + "        left: .3125em; }\n" + "      .swal2-popup.swal2-toast .swal2-icon.swal2-error [class^='swal2-x-mark-line'][class$='right'] {\n" + "        right: .3125em; }\n" + "  .swal2-popup.swal2-toast .swal2-actions {\n" + "    height: auto;\n" + "    margin: 0 .3125em; }\n" + "  .swal2-popup.swal2-toast .swal2-styled {\n" + "    margin: 0 .3125em;\n" + "    padding: .3125em .625em;\n" + "    font-size: 1em; }\n" + "    .swal2-popup.swal2-toast .swal2-styled:focus {\n" + "      box-shadow: 0 0 0 0.0625em #fff, 0 0 0 0.125em rgba(50, 100, 150, 0.4); }\n" + "  .swal2-popup.swal2-toast .swal2-success {\n" + "    border-color: #a5dc86; }\n" + "    .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-circular-line'] {\n" + "      position: absolute;\n" + "      width: 2em;\n" + "      height: 2.8125em;\n" + "      -webkit-transform: rotate(45deg);\n" + "              transform: rotate(45deg);\n" + "      border-radius: 50%; }\n" + "      .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-circular-line'][class$='left'] {\n" + "        top: -.25em;\n" + "        left: -.9375em;\n" + "        -webkit-transform: rotate(-45deg);\n" + "                transform: rotate(-45deg);\n" + "        -webkit-transform-origin: 2em 2em;\n" + "                transform-origin: 2em 2em;\n" + "        border-radius: 4em 0 0 4em; }\n" + "      .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-circular-line'][class$='right'] {\n" + "        top: -.25em;\n" + "        left: .9375em;\n" + "        -webkit-transform-origin: 0 2em;\n" + "                transform-origin: 0 2em;\n" + "        border-radius: 0 4em 4em 0; }\n" + "    .swal2-popup.swal2-toast .swal2-success .swal2-success-ring {\n" + "      width: 2em;\n" + "      height: 2em; }\n" + "    .swal2-popup.swal2-toast .swal2-success .swal2-success-fix {\n" + "      top: 0;\n" + "      left: .4375em;\n" + "      width: .4375em;\n" + "      height: 2.6875em; }\n" + "    .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-line'] {\n" + "      height: .3125em; }\n" + "      .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-line'][class$='tip'] {\n" + "        top: 1.125em;\n" + "        left: .1875em;\n" + "        width: .75em; }\n" + "      .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-line'][class$='long'] {\n" + "        top: .9375em;\n" + "        right: .1875em;\n" + "        width: 1.375em; }\n" + "  .swal2-popup.swal2-toast.swal2-show {\n" + "    -webkit-animation: showSweetToast .5s;\n" + "            animation: showSweetToast .5s; }\n" + "  .swal2-popup.swal2-toast.swal2-hide {\n" + "    -webkit-animation: hideSweetToast .2s forwards;\n" + "            animation: hideSweetToast .2s forwards; }\n" + "  .swal2-popup.swal2-toast .swal2-animate-success-icon .swal2-success-line-tip {\n" + "    -webkit-animation: animate-toast-success-tip .75s;\n" + "            animation: animate-toast-success-tip .75s; }\n" + "  .swal2-popup.swal2-toast .swal2-animate-success-icon .swal2-success-line-long {\n" + "    -webkit-animation: animate-toast-success-long .75s;\n" + "            animation: animate-toast-success-long .75s; }\n" + "\n" + "@-webkit-keyframes showSweetToast {\n" + "  0% {\n" + "    -webkit-transform: translateY(-0.625em) rotateZ(2deg);\n" + "            transform: translateY(-0.625em) rotateZ(2deg);\n" + "    opacity: 0; }\n" + "  33% {\n" + "    -webkit-transform: translateY(0) rotateZ(-2deg);\n" + "            transform: translateY(0) rotateZ(-2deg);\n" + "    opacity: .5; }\n" + "  66% {\n" + "    -webkit-transform: translateY(0.3125em) rotateZ(2deg);\n" + "            transform: translateY(0.3125em) rotateZ(2deg);\n" + "    opacity: .7; }\n" + "  100% {\n" + "    -webkit-transform: translateY(0) rotateZ(0);\n" + "            transform: translateY(0) rotateZ(0);\n" + "    opacity: 1; } }\n" + "\n" + "@keyframes showSweetToast {\n" + "  0% {\n" + "    -webkit-transform: translateY(-0.625em) rotateZ(2deg);\n" + "            transform: translateY(-0.625em) rotateZ(2deg);\n" + "    opacity: 0; }\n" + "  33% {\n" + "    -webkit-transform: translateY(0) rotateZ(-2deg);\n" + "            transform: translateY(0) rotateZ(-2deg);\n" + "    opacity: .5; }\n" + "  66% {\n" + "    -webkit-transform: translateY(0.3125em) rotateZ(2deg);\n" + "            transform: translateY(0.3125em) rotateZ(2deg);\n" + "    opacity: .7; }\n" + "  100% {\n" + "    -webkit-transform: translateY(0) rotateZ(0);\n" + "            transform: translateY(0) rotateZ(0);\n" + "    opacity: 1; } }\n" + "\n" + "@-webkit-keyframes hideSweetToast {\n" + "  0% {\n" + "    opacity: 1; }\n" + "  33% {\n" + "    opacity: .5; }\n" + "  100% {\n" + "    -webkit-transform: rotateZ(1deg);\n" + "            transform: rotateZ(1deg);\n" + "    opacity: 0; } }\n" + "\n" + "@keyframes hideSweetToast {\n" + "  0% {\n" + "    opacity: 1; }\n" + "  33% {\n" + "    opacity: .5; }\n" + "  100% {\n" + "    -webkit-transform: rotateZ(1deg);\n" + "            transform: rotateZ(1deg);\n" + "    opacity: 0; } }\n" + "\n" + "@-webkit-keyframes animate-toast-success-tip {\n" + "  0% {\n" + "    top: .5625em;\n" + "    left: .0625em;\n" + "    width: 0; }\n" + "  54% {\n" + "    top: .125em;\n" + "    left: .125em;\n" + "    width: 0; }\n" + "  70% {\n" + "    top: .625em;\n" + "    left: -.25em;\n" + "    width: 1.625em; }\n" + "  84% {\n" + "    top: 1.0625em;\n" + "    left: .75em;\n" + "    width: .5em; }\n" + "  100% {\n" + "    top: 1.125em;\n" + "    left: .1875em;\n" + "    width: .75em; } }\n" + "\n" + "@keyframes animate-toast-success-tip {\n" + "  0% {\n" + "    top: .5625em;\n" + "    left: .0625em;\n" + "    width: 0; }\n" + "  54% {\n" + "    top: .125em;\n" + "    left: .125em;\n" + "    width: 0; }\n" + "  70% {\n" + "    top: .625em;\n" + "    left: -.25em;\n" + "    width: 1.625em; }\n" + "  84% {\n" + "    top: 1.0625em;\n" + "    left: .75em;\n" + "    width: .5em; }\n" + "  100% {\n" + "    top: 1.125em;\n" + "    left: .1875em;\n" + "    width: .75em; } }\n" + "\n" + "@-webkit-keyframes animate-toast-success-long {\n" + "  0% {\n" + "    top: 1.625em;\n" + "    right: 1.375em;\n" + "    width: 0; }\n" + "  65% {\n" + "    top: 1.25em;\n" + "    right: .9375em;\n" + "    width: 0; }\n" + "  84% {\n" + "    top: .9375em;\n" + "    right: 0;\n" + "    width: 1.125em; }\n" + "  100% {\n" + "    top: .9375em;\n" + "    right: .1875em;\n" + "    width: 1.375em; } }\n" + "\n" + "@keyframes animate-toast-success-long {\n" + "  0% {\n" + "    top: 1.625em;\n" + "    right: 1.375em;\n" + "    width: 0; }\n" + "  65% {\n" + "    top: 1.25em;\n" + "    right: .9375em;\n" + "    width: 0; }\n" + "  84% {\n" + "    top: .9375em;\n" + "    right: 0;\n" + "    width: 1.125em; }\n" + "  100% {\n" + "    top: .9375em;\n" + "    right: .1875em;\n" + "    width: 1.375em; } }\n" + "\n" + "body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) {\n" + "  overflow-y: hidden; }\n" + "\n" + "body.swal2-height-auto {\n" + "  height: auto !important; }\n" + "\n" + "body.swal2-no-backdrop .swal2-shown {\n" + "  top: auto;\n" + "  right: auto;\n" + "  bottom: auto;\n" + "  left: auto;\n" + "  background-color: transparent; }\n" + "  body.swal2-no-backdrop .swal2-shown > .swal2-modal {\n" + "    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4); }\n" + "  body.swal2-no-backdrop .swal2-shown.swal2-top {\n" + "    top: 0;\n" + "    left: 50%;\n" + "    -webkit-transform: translateX(-50%);\n" + "            transform: translateX(-50%); }\n" + "  body.swal2-no-backdrop .swal2-shown.swal2-top-start, body.swal2-no-backdrop .swal2-shown.swal2-top-left {\n" + "    top: 0;\n" + "    left: 0; }\n" + "  body.swal2-no-backdrop .swal2-shown.swal2-top-end, body.swal2-no-backdrop .swal2-shown.swal2-top-right {\n" + "    top: 0;\n" + "    right: 0; }\n" + "  body.swal2-no-backdrop .swal2-shown.swal2-center {\n" + "    top: 50%;\n" + "    left: 50%;\n" + "    -webkit-transform: translate(-50%, -50%);\n" + "            transform: translate(-50%, -50%); }\n" + "  body.swal2-no-backdrop .swal2-shown.swal2-center-start, body.swal2-no-backdrop .swal2-shown.swal2-center-left {\n" + "    top: 50%;\n" + "    left: 0;\n" + "    -webkit-transform: translateY(-50%);\n" + "            transform: translateY(-50%); }\n" + "  body.swal2-no-backdrop .swal2-shown.swal2-center-end, body.swal2-no-backdrop .swal2-shown.swal2-center-right {\n" + "    top: 50%;\n" + "    right: 0;\n" + "    -webkit-transform: translateY(-50%);\n" + "            transform: translateY(-50%); }\n" + "  body.swal2-no-backdrop .swal2-shown.swal2-bottom {\n" + "    bottom: 0;\n" + "    left: 50%;\n" + "    -webkit-transform: translateX(-50%);\n" + "            transform: translateX(-50%); }\n" + "  body.swal2-no-backdrop .swal2-shown.swal2-bottom-start, body.swal2-no-backdrop .swal2-shown.swal2-bottom-left {\n" + "    bottom: 0;\n" + "    left: 0; }\n" + "  body.swal2-no-backdrop .swal2-shown.swal2-bottom-end, body.swal2-no-backdrop .swal2-shown.swal2-bottom-right {\n" + "    right: 0;\n" + "    bottom: 0; }\n" + "\n" + ".swal2-container {\n" + "  display: flex;\n" + "  position: fixed;\n" + "  top: 0;\n" + "  right: 0;\n" + "  bottom: 0;\n" + "  left: 0;\n" + "  flex-direction: row;\n" + "  align-items: center;\n" + "  justify-content: center;\n" + "  padding: 10px;\n" + "  background-color: transparent;\n" + "  z-index: 1060;\n" + "  overflow-x: hidden;\n" + "  -webkit-overflow-scrolling: touch; }\n" + "  .swal2-container.swal2-top {\n" + "    align-items: flex-start; }\n" + "  .swal2-container.swal2-top-start, .swal2-container.swal2-top-left {\n" + "    align-items: flex-start;\n" + "    justify-content: flex-start; }\n" + "  .swal2-container.swal2-top-end, .swal2-container.swal2-top-right {\n" + "    align-items: flex-start;\n" + "    justify-content: flex-end; }\n" + "  .swal2-container.swal2-center {\n" + "    align-items: center; }\n" + "  .swal2-container.swal2-center-start, .swal2-container.swal2-center-left {\n" + "    align-items: center;\n" + "    justify-content: flex-start; }\n" + "  .swal2-container.swal2-center-end, .swal2-container.swal2-center-right {\n" + "    align-items: center;\n" + "    justify-content: flex-end; }\n" + "  .swal2-container.swal2-bottom {\n" + "    align-items: flex-end; }\n" + "  .swal2-container.swal2-bottom-start, .swal2-container.swal2-bottom-left {\n" + "    align-items: flex-end;\n" + "    justify-content: flex-start; }\n" + "  .swal2-container.swal2-bottom-end, .swal2-container.swal2-bottom-right {\n" + "    align-items: flex-end;\n" + "    justify-content: flex-end; }\n" + "  .swal2-container.swal2-grow-fullscreen > .swal2-modal {\n" + "    display: flex !important;\n" + "    flex: 1;\n" + "    align-self: stretch;\n" + "    justify-content: center; }\n" + "  .swal2-container.swal2-grow-row > .swal2-modal {\n" + "    display: flex !important;\n" + "    flex: 1;\n" + "    align-content: center;\n" + "    justify-content: center; }\n" + "  .swal2-container.swal2-grow-column {\n" + "    flex: 1;\n" + "    flex-direction: column; }\n" + "    .swal2-container.swal2-grow-column.swal2-top, .swal2-container.swal2-grow-column.swal2-center, .swal2-container.swal2-grow-column.swal2-bottom {\n" + "      align-items: center; }\n" + "    .swal2-container.swal2-grow-column.swal2-top-start, .swal2-container.swal2-grow-column.swal2-center-start, .swal2-container.swal2-grow-column.swal2-bottom-start, .swal2-container.swal2-grow-column.swal2-top-left, .swal2-container.swal2-grow-column.swal2-center-left, .swal2-container.swal2-grow-column.swal2-bottom-left {\n" + "      align-items: flex-start; }\n" + "    .swal2-container.swal2-grow-column.swal2-top-end, .swal2-container.swal2-grow-column.swal2-center-end, .swal2-container.swal2-grow-column.swal2-bottom-end, .swal2-container.swal2-grow-column.swal2-top-right, .swal2-container.swal2-grow-column.swal2-center-right, .swal2-container.swal2-grow-column.swal2-bottom-right {\n" + "      align-items: flex-end; }\n" + "    .swal2-container.swal2-grow-column > .swal2-modal {\n" + "      display: flex !important;\n" + "      flex: 1;\n" + "      align-content: center;\n" + "      justify-content: center; }\n" + "  .swal2-container:not(.swal2-top):not(.swal2-top-start):not(.swal2-top-end):not(.swal2-top-left):not(.swal2-top-right):not(.swal2-center-start):not(.swal2-center-end):not(.swal2-center-left):not(.swal2-center-right):not(.swal2-bottom):not(.swal2-bottom-start):not(.swal2-bottom-end):not(.swal2-bottom-left):not(.swal2-bottom-right) > .swal2-modal {\n" + "    margin: auto; }\n" + "  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {\n" + "    .swal2-container .swal2-modal {\n" + "      margin: 0 !important; } }\n" + "  .swal2-container.swal2-fade {\n" + "    transition: background-color .1s; }\n" + "  .swal2-container.swal2-shown {\n" + "    background-color: rgba(0, 0, 0, 0.4); }\n" + "\n" + ".swal2-popup {\n" + "  display: none;\n" + "  position: relative;\n" + "  flex-direction: column;\n" + "  justify-content: center;\n" + "  width: 32em;\n" + "  max-width: 100%;\n" + "  padding: 1.25em;\n" + "  border-radius: 0.3125em;\n" + "  background: #fff;\n" + "  font-family: inherit;\n" + "  font-size: 1rem;\n" + "  box-sizing: border-box; }\n" + "  .swal2-popup:focus {\n" + "    outline: none; }\n" + "  .swal2-popup.swal2-loading {\n" + "    overflow-y: hidden; }\n" + "  .swal2-popup .swal2-header {\n" + "    display: flex;\n" + "    flex-direction: column;\n" + "    align-items: center; }\n" + "  .swal2-popup .swal2-title {\n" + "    display: block;\n" + "    position: relative;\n" + "    max-width: 100%;\n" + "    margin: 0 0 0.4em;\n" + "    padding: 0;\n" + "    color: #595959;\n" + "    font-size: 1.875em;\n" + "    font-weight: 600;\n" + "    text-align: center;\n" + "    text-transform: none;\n" + "    word-wrap: break-word; }\n" + "  .swal2-popup .swal2-actions {\n" + "    align-items: center;\n" + "    justify-content: center;\n" + "    margin: 1.25em auto 0; }\n" + "    .swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled[disabled] {\n" + "      opacity: .4; }\n" + "    .swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled:hover {\n" + "      background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)); }\n" + "    .swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled:active {\n" + "      background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)); }\n" + "    .swal2-popup .swal2-actions.swal2-loading .swal2-styled.swal2-confirm {\n" + "      width: 2.5em;\n" + "      height: 2.5em;\n" + "      margin: .46875em;\n" + "      padding: 0;\n" + "      border: .25em solid transparent;\n" + "      border-radius: 100%;\n" + "      border-color: transparent;\n" + "      background-color: transparent !important;\n" + "      color: transparent;\n" + "      cursor: default;\n" + "      box-sizing: border-box;\n" + "      -webkit-animation: swal2-rotate-loading 1.5s linear 0s infinite normal;\n" + "              animation: swal2-rotate-loading 1.5s linear 0s infinite normal;\n" + "      -webkit-user-select: none;\n" + "         -moz-user-select: none;\n" + "          -ms-user-select: none;\n" + "              user-select: none; }\n" + "    .swal2-popup .swal2-actions.swal2-loading .swal2-styled.swal2-cancel {\n" + "      margin-right: 30px;\n" + "      margin-left: 30px; }\n" + "    .swal2-popup .swal2-actions.swal2-loading :not(.swal2-styled).swal2-confirm::after {\n" + "      display: inline-block;\n" + "      width: 15px;\n" + "      height: 15px;\n" + "      margin-left: 5px;\n" + "      border: 3px solid #999999;\n" + "      border-radius: 50%;\n" + "      border-right-color: transparent;\n" + "      box-shadow: 1px 1px 1px #fff;\n" + "      content: '';\n" + "      -webkit-animation: swal2-rotate-loading 1.5s linear 0s infinite normal;\n" + "              animation: swal2-rotate-loading 1.5s linear 0s infinite normal; }\n" + "  .swal2-popup .swal2-styled {\n" + "    margin: 0 .3125em;\n" + "    padding: .625em 2em;\n" + "    font-weight: 500;\n" + "    box-shadow: none; }\n" + "    .swal2-popup .swal2-styled:not([disabled]) {\n" + "      cursor: pointer; }\n" + "    .swal2-popup .swal2-styled.swal2-confirm {\n" + "      border: 0;\n" + "      border-radius: 0.25em;\n" + "      background: initial;\n" + "      background-color: #3085d6;\n" + "      color: #fff;\n" + "      font-size: 1.0625em; }\n" + "    .swal2-popup .swal2-styled.swal2-cancel {\n" + "      border: 0;\n" + "      border-radius: 0.25em;\n" + "      background: initial;\n" + "      background-color: #aaa;\n" + "      color: #fff;\n" + "      font-size: 1.0625em; }\n" + "    .swal2-popup .swal2-styled:focus {\n" + "      outline: none;\n" + "      box-shadow: 0 0 0 2px #fff, 0 0 0 4px rgba(50, 100, 150, 0.4); }\n" + "    .swal2-popup .swal2-styled::-moz-focus-inner {\n" + "      border: 0; }\n" + "  .swal2-popup .swal2-footer {\n" + "    justify-content: center;\n" + "    margin: 1.25em 0 0;\n" + "    padding-top: 1em;\n" + "    border-top: 1px solid #eee;\n" + "    color: #545454;\n" + "    font-size: 1em; }\n" + "  .swal2-popup .swal2-image {\n" + "    max-width: 100%;\n" + "    margin: 1.25em auto; }\n" + "  .swal2-popup .swal2-close {\n" + "    position: absolute;\n" + "    top: 0;\n" + "    right: 0;\n" + "    justify-content: center;\n" + "    width: 1.2em;\n" + "    height: 1.2em;\n" + "    padding: 0;\n" + "    transition: color 0.1s ease-out;\n" + "    border: none;\n" + "    border-radius: 0;\n" + "    background: transparent;\n" + "    color: #cccccc;\n" + "    font-family: serif;\n" + "    font-size: 2.5em;\n" + "    line-height: 1.2;\n" + "    cursor: pointer;\n" + "    overflow: hidden; }\n" + "    .swal2-popup .swal2-close:hover {\n" + "      -webkit-transform: none;\n" + "              transform: none;\n" + "      color: #f27474; }\n" + "  .swal2-popup > .swal2-input,\n" + "  .swal2-popup > .swal2-file,\n" + "  .swal2-popup > .swal2-textarea,\n" + "  .swal2-popup > .swal2-select,\n" + "  .swal2-popup > .swal2-radio,\n" + "  .swal2-popup > .swal2-checkbox {\n" + "    display: none; }\n" + "  .swal2-popup .swal2-content {\n" + "    justify-content: center;\n" + "    margin: 0;\n" + "    padding: 0;\n" + "    color: #545454;\n" + "    font-size: 1.125em;\n" + "    font-weight: 300;\n" + "    line-height: normal;\n" + "    word-wrap: break-word; }\n" + "  .swal2-popup #swal2-content {\n" + "    text-align: center; }\n" + "  .swal2-popup .swal2-input,\n" + "  .swal2-popup .swal2-file,\n" + "  .swal2-popup .swal2-textarea,\n" + "  .swal2-popup .swal2-select,\n" + "  .swal2-popup .swal2-radio,\n" + "  .swal2-popup .swal2-checkbox {\n" + "    margin: 1em auto; }\n" + "  .swal2-popup .swal2-input,\n" + "  .swal2-popup .swal2-file,\n" + "  .swal2-popup .swal2-textarea {\n" + "    width: 100%;\n" + "    transition: border-color .3s, box-shadow .3s;\n" + "    border: 1px solid #d9d9d9;\n" + "    border-radius: 0.1875em;\n" + "    font-size: 1.125em;\n" + "    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.06);\n" + "    box-sizing: border-box; }\n" + "    .swal2-popup .swal2-input.swal2-inputerror,\n" + "    .swal2-popup .swal2-file.swal2-inputerror,\n" + "    .swal2-popup .swal2-textarea.swal2-inputerror {\n" + "      border-color: #f27474 !important;\n" + "      box-shadow: 0 0 2px #f27474 !important; }\n" + "    .swal2-popup .swal2-input:focus,\n" + "    .swal2-popup .swal2-file:focus,\n" + "    .swal2-popup .swal2-textarea:focus {\n" + "      border: 1px solid #b4dbed;\n" + "      outline: none;\n" + "      box-shadow: 0 0 3px #c4e6f5; }\n" + "    .swal2-popup .swal2-input::-webkit-input-placeholder,\n" + "    .swal2-popup .swal2-file::-webkit-input-placeholder,\n" + "    .swal2-popup .swal2-textarea::-webkit-input-placeholder {\n" + "      color: #cccccc; }\n" + "    .swal2-popup .swal2-input:-ms-input-placeholder,\n" + "    .swal2-popup .swal2-file:-ms-input-placeholder,\n" + "    .swal2-popup .swal2-textarea:-ms-input-placeholder {\n" + "      color: #cccccc; }\n" + "    .swal2-popup .swal2-input::-ms-input-placeholder,\n" + "    .swal2-popup .swal2-file::-ms-input-placeholder,\n" + "    .swal2-popup .swal2-textarea::-ms-input-placeholder {\n" + "      color: #cccccc; }\n" + "    .swal2-popup .swal2-input::placeholder,\n" + "    .swal2-popup .swal2-file::placeholder,\n" + "    .swal2-popup .swal2-textarea::placeholder {\n" + "      color: #cccccc; }\n" + "  .swal2-popup .swal2-range input {\n" + "    width: 80%; }\n" + "  .swal2-popup .swal2-range output {\n" + "    width: 20%;\n" + "    font-weight: 600;\n" + "    text-align: center; }\n" + "  .swal2-popup .swal2-range input,\n" + "  .swal2-popup .swal2-range output {\n" + "    height: 2.625em;\n" + "    margin: 1em auto;\n" + "    padding: 0;\n" + "    font-size: 1.125em;\n" + "    line-height: 2.625em; }\n" + "  .swal2-popup .swal2-input {\n" + "    height: 2.625em;\n" + "    padding: 0.75em; }\n" + "    .swal2-popup .swal2-input[type='number'] {\n" + "      max-width: 10em; }\n" + "  .swal2-popup .swal2-file {\n" + "    font-size: 1.125em; }\n" + "  .swal2-popup .swal2-textarea {\n" + "    height: 6.75em;\n" + "    padding: 0.75em; }\n" + "  .swal2-popup .swal2-select {\n" + "    min-width: 50%;\n" + "    max-width: 100%;\n" + "    padding: .375em .625em;\n" + "    color: #545454;\n" + "    font-size: 1.125em; }\n" + "  .swal2-popup .swal2-radio,\n" + "  .swal2-popup .swal2-checkbox {\n" + "    align-items: center;\n" + "    justify-content: center; }\n" + "    .swal2-popup .swal2-radio label,\n" + "    .swal2-popup .swal2-checkbox label {\n" + "      margin: 0 .6em;\n" + "      font-size: 1.125em; }\n" + "    .swal2-popup .swal2-radio input,\n" + "    .swal2-popup .swal2-checkbox input {\n" + "      margin: 0 .4em; }\n" + "  .swal2-popup .swal2-validationerror {\n" + "    display: none;\n" + "    align-items: center;\n" + "    justify-content: center;\n" + "    padding: 0.625em;\n" + "    background: #f0f0f0;\n" + "    color: #666666;\n" + "    font-size: 1em;\n" + "    font-weight: 300;\n" + "    overflow: hidden; }\n" + "    .swal2-popup .swal2-validationerror::before {\n" + "      display: inline-block;\n" + "      width: 1.5em;\n" + "      min-width: 1.5em;\n" + "      height: 1.5em;\n" + "      margin: 0 .625em;\n" + "      border-radius: 50%;\n" + "      background-color: #f27474;\n" + "      color: #fff;\n" + "      font-weight: 600;\n" + "      line-height: 1.5em;\n" + "      text-align: center;\n" + "      content: '!';\n" + "      zoom: normal; }\n" + "\n" + "@supports (-ms-accelerator: true) {\n" + "  .swal2-range input {\n" + "    width: 100% !important; }\n" + "  .swal2-range output {\n" + "    display: none; } }\n" + "\n" + "@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {\n" + "  .swal2-range input {\n" + "    width: 100% !important; }\n" + "  .swal2-range output {\n" + "    display: none; } }\n" + "\n" + "@-moz-document url-prefix() {\n" + "  .swal2-close:focus {\n" + "    outline: 2px solid rgba(50, 100, 150, 0.4); } }\n" + "\n" + ".swal2-icon {\n" + "  position: relative;\n" + "  justify-content: center;\n" + "  width: 5em;\n" + "  height: 5em;\n" + "  margin: 1.25em auto 1.875em;\n" + "  border: .25em solid transparent;\n" + "  border-radius: 50%;\n" + "  line-height: 5em;\n" + "  cursor: default;\n" + "  box-sizing: content-box;\n" + "  -webkit-user-select: none;\n" + "     -moz-user-select: none;\n" + "      -ms-user-select: none;\n" + "          user-select: none;\n" + "  zoom: normal; }\n" + "  .swal2-icon-text {\n" + "    font-size: 3.75em; }\n" + "  .swal2-icon.swal2-error {\n" + "    border-color: #f27474; }\n" + "    .swal2-icon.swal2-error .swal2-x-mark {\n" + "      position: relative;\n" + "      flex-grow: 1; }\n" + "    .swal2-icon.swal2-error [class^='swal2-x-mark-line'] {\n" + "      display: block;\n" + "      position: absolute;\n" + "      top: 2.3125em;\n" + "      width: 2.9375em;\n" + "      height: .3125em;\n" + "      border-radius: .125em;\n" + "      background-color: #f27474; }\n" + "      .swal2-icon.swal2-error [class^='swal2-x-mark-line'][class$='left'] {\n" + "        left: 1.0625em;\n" + "        -webkit-transform: rotate(45deg);\n" + "                transform: rotate(45deg); }\n" + "      .swal2-icon.swal2-error [class^='swal2-x-mark-line'][class$='right'] {\n" + "        right: 1em;\n" + "        -webkit-transform: rotate(-45deg);\n" + "                transform: rotate(-45deg); }\n" + "  .swal2-icon.swal2-warning {\n" + "    border-color: #facea8;\n" + "    color: #f8bb86; }\n" + "  .swal2-icon.swal2-info {\n" + "    border-color: #9de0f6;\n" + "    color: #3fc3ee; }\n" + "  .swal2-icon.swal2-question {\n" + "    border-color: #c9dae1;\n" + "    color: #87adbd; }\n" + "  .swal2-icon.swal2-success {\n" + "    border-color: #a5dc86; }\n" + "    .swal2-icon.swal2-success [class^='swal2-success-circular-line'] {\n" + "      position: absolute;\n" + "      width: 3.75em;\n" + "      height: 7.5em;\n" + "      -webkit-transform: rotate(45deg);\n" + "              transform: rotate(45deg);\n" + "      border-radius: 50%; }\n" + "      .swal2-icon.swal2-success [class^='swal2-success-circular-line'][class$='left'] {\n" + "        top: -.4375em;\n" + "        left: -2.0635em;\n" + "        -webkit-transform: rotate(-45deg);\n" + "                transform: rotate(-45deg);\n" + "        -webkit-transform-origin: 3.75em 3.75em;\n" + "                transform-origin: 3.75em 3.75em;\n" + "        border-radius: 7.5em 0 0 7.5em; }\n" + "      .swal2-icon.swal2-success [class^='swal2-success-circular-line'][class$='right'] {\n" + "        top: -.6875em;\n" + "        left: 1.875em;\n" + "        -webkit-transform: rotate(-45deg);\n" + "                transform: rotate(-45deg);\n" + "        -webkit-transform-origin: 0 3.75em;\n" + "                transform-origin: 0 3.75em;\n" + "        border-radius: 0 7.5em 7.5em 0; }\n" + "    .swal2-icon.swal2-success .swal2-success-ring {\n" + "      position: absolute;\n" + "      top: -.25em;\n" + "      left: -.25em;\n" + "      width: 100%;\n" + "      height: 100%;\n" + "      border: 0.25em solid rgba(165, 220, 134, 0.3);\n" + "      border-radius: 50%;\n" + "      z-index: 2;\n" + "      box-sizing: content-box; }\n" + "    .swal2-icon.swal2-success .swal2-success-fix {\n" + "      position: absolute;\n" + "      top: .5em;\n" + "      left: 1.625em;\n" + "      width: .4375em;\n" + "      height: 5.625em;\n" + "      -webkit-transform: rotate(-45deg);\n" + "              transform: rotate(-45deg);\n" + "      z-index: 1; }\n" + "    .swal2-icon.swal2-success [class^='swal2-success-line'] {\n" + "      display: block;\n" + "      position: absolute;\n" + "      height: .3125em;\n" + "      border-radius: .125em;\n" + "      background-color: #a5dc86;\n" + "      z-index: 2; }\n" + "      .swal2-icon.swal2-success [class^='swal2-success-line'][class$='tip'] {\n" + "        top: 2.875em;\n" + "        left: .875em;\n" + "        width: 1.5625em;\n" + "        -webkit-transform: rotate(45deg);\n" + "                transform: rotate(45deg); }\n" + "      .swal2-icon.swal2-success [class^='swal2-success-line'][class$='long'] {\n" + "        top: 2.375em;\n" + "        right: .5em;\n" + "        width: 2.9375em;\n" + "        -webkit-transform: rotate(-45deg);\n" + "                transform: rotate(-45deg); }\n" + "\n" + ".swal2-progresssteps {\n" + "  align-items: center;\n" + "  margin: 0 0 1.25em;\n" + "  padding: 0;\n" + "  font-weight: 600; }\n" + "  .swal2-progresssteps li {\n" + "    display: inline-block;\n" + "    position: relative; }\n" + "  .swal2-progresssteps .swal2-progresscircle {\n" + "    width: 2em;\n" + "    height: 2em;\n" + "    border-radius: 2em;\n" + "    background: #3085d6;\n" + "    color: #fff;\n" + "    line-height: 2em;\n" + "    text-align: center;\n" + "    z-index: 20; }\n" + "    .swal2-progresssteps .swal2-progresscircle:first-child {\n" + "      margin-left: 0; }\n" + "    .swal2-progresssteps .swal2-progresscircle:last-child {\n" + "      margin-right: 0; }\n" + "    .swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep {\n" + "      background: #3085d6; }\n" + "      .swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep ~ .swal2-progresscircle {\n" + "        background: #add8e6; }\n" + "      .swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep ~ .swal2-progressline {\n" + "        background: #add8e6; }\n" + "  .swal2-progresssteps .swal2-progressline {\n" + "    width: 2.5em;\n" + "    height: .4em;\n" + "    margin: 0 -1px;\n" + "    background: #3085d6;\n" + "    z-index: 10; }\n" + "\n" + "[class^='swal2'] {\n" + "  -webkit-tap-highlight-color: transparent; }\n" + "\n" + ".swal2-show {\n" + "  -webkit-animation: swal2-show 0.3s;\n" + "          animation: swal2-show 0.3s; }\n" + "  .swal2-show.swal2-noanimation {\n" + "    -webkit-animation: none;\n" + "            animation: none; }\n" + "\n" + ".swal2-hide {\n" + "  -webkit-animation: swal2-hide 0.15s forwards;\n" + "          animation: swal2-hide 0.15s forwards; }\n" + "  .swal2-hide.swal2-noanimation {\n" + "    -webkit-animation: none;\n" + "            animation: none; }\n" + "\n" + "[dir='rtl'] .swal2-close {\n" + "  right: auto;\n" + "  left: 0; }\n" + "\n" + ".swal2-animate-success-icon .swal2-success-line-tip {\n" + "  -webkit-animation: swal2-animate-success-line-tip 0.75s;\n" + "          animation: swal2-animate-success-line-tip 0.75s; }\n" + "\n" + ".swal2-animate-success-icon .swal2-success-line-long {\n" + "  -webkit-animation: swal2-animate-success-line-long 0.75s;\n" + "          animation: swal2-animate-success-line-long 0.75s; }\n" + "\n" + ".swal2-animate-success-icon .swal2-success-circular-line-right {\n" + "  -webkit-animation: swal2-rotate-success-circular-line 4.25s ease-in;\n" + "          animation: swal2-rotate-success-circular-line 4.25s ease-in; }\n" + "\n" + ".swal2-animate-error-icon {\n" + "  -webkit-animation: swal2-animate-error-icon 0.5s;\n" + "          animation: swal2-animate-error-icon 0.5s; }\n" + "  .swal2-animate-error-icon .swal2-x-mark {\n" + "    -webkit-animation: swal2-animate-error-x-mark 0.5s;\n" + "            animation: swal2-animate-error-x-mark 0.5s; }\n" + "\n" + "@-webkit-keyframes swal2-rotate-loading {\n" + "  0% {\n" + "    -webkit-transform: rotate(0deg);\n" + "            transform: rotate(0deg); }\n" + "  100% {\n" + "    -webkit-transform: rotate(360deg);\n" + "            transform: rotate(360deg); } }\n" + "\n" + "@keyframes swal2-rotate-loading {\n" + "  0% {\n" + "    -webkit-transform: rotate(0deg);\n" + "            transform: rotate(0deg); }\n" + "  100% {\n" + "    -webkit-transform: rotate(360deg);\n" + "            transform: rotate(360deg); } }");
