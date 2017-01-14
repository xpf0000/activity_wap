/*! project:msohu-v3, version:3.6.1, update:2017-01-06 15:08:06 */
!function(a, b) {
    "undefined" != typeof module ? module.exports = b() : "function" == typeof define && "object" == typeof define.amd ? define(b) : this[a] = b()
}("clipboard", function() {
    var a = {};
    return a.copy = function() {
        var a,
            b = !1;
        return document.addEventListener("copy", function(c) {
            if (b) {
                b = !1;
                for (var d in a)
                    c.clipboardData.setData(d, a[d]);
                c.preventDefault()
            }
        }), function(c) {
            return new Promise(function(d, e) {
                b = !0, a = "string" == typeof c ? {
                    "text/plain": c
                } : c instanceof Node ? {
                    "text/html": (new XMLSerializer).serializeToString(c)
                } : c;
                try {
                    document.execCommand("copy") ? d() : (b = !1, e(new Error("Unable to copy. Perhaps it's not available in your browser?")))
                } catch (a) {
                    b = !1, e(a)
                }
            })
        }
    }(), a.paste = function() {
        var a,
            b,
            c = !1;
        return document.addEventListener("paste", function(d) {
            c && (c = !1, d.preventDefault(), a(d.clipboardData.getData(b)))
        }), function(d) {
            return new Promise(function(e, f) {
                c = !0, a = e, b = d || "text/plain";
                try {
                    document.execCommand("paste") || (c = !1, f(new Error("Unable to paste. Pasting only works in Internet Explorer at the moment.")))
                } catch (a) {
                    c = !1, f(new Error(a))
                }
            })
        }
    }(), "undefined" == typeof ClipboardEvent && "undefined" != typeof window.clipboardData && "undefined" != typeof window.clipboardData.setData && (!function(a) {
        function b(a, b) {
            return function() {
                a.apply(b, arguments)
            }
        }
        function c(a) {
            if ("object" != typeof this)
                throw new TypeError("Promises must be constructed via new");
            if ("function" != typeof a)
                throw new TypeError("not a function");
            this._state = null, this._value = null, this._deferreds = [], i(a, b(e, this), b(f, this))
        }
        function d(a) {
            var b = this;
            return null === this._state ? void this._deferreds.push(a) : void j(function() {
                var c = b._state ? a.onFulfilled : a.onRejected;
                if (null === c)
                    return void (b._state ? a.resolve : a.reject)(b._value);
                var d;
                try {
                    d = c(b._value)
                } catch (b) {
                    return void a.reject(b)
                }
                a.resolve(d)
            })
        }
        function e(a) {
            try {
                if (a === this)
                    throw new TypeError("A promise cannot be resolved with itself.");
                if (a && ("object" == typeof a || "function" == typeof a)) {
                    var c = a.then;
                    if ("function" == typeof c)
                        return void i(b(c, a), b(e, this), b(f, this))
                }
                this._state = !0, this._value = a, g.call(this)
            } catch (a) {
                f.call(this, a)
            }
        }
        function f(a) {
            this._state = !1, this._value = a, g.call(this)
        }
        function g() {
            for (var a = 0, b = this._deferreds.length; b > a; a++)
                d.call(this, this._deferreds[a]);
            this._deferreds = null
        }
        function h(a, b, c, d) {
            this.onFulfilled = "function" == typeof a ? a : null, this.onRejected = "function" == typeof b ? b : null, this.resolve = c, this.reject = d
        }
        function i(a, b, c) {
            var d = !1;
            try {
                a(function(a) {
                    d || (d = !0, b(a))
                }, function(a) {
                    d || (d = !0, c(a))
                })
            } catch (a) {
                if (d)
                    return;
                d = !0, c(a)
            }
        }
        var j = c.immediateFn || "function" == typeof setImmediate && setImmediate || function(a) {
                setTimeout(a, 1)
            },
            k = Array.isArray || function(a) {
                return "[object Array]" === Object.prototype.toString.call(a)
            };
        c.prototype.catch = function(a) {
            return this.then(null, a)
        }, c.prototype.then = function(a, b) {
            var e = this;
            return new c(function(c, f) {
                d.call(e, new h(a, b, c, f))
            })
        }, c.all = function() {
            var a = Array.prototype.slice.call(1 === arguments.length && k(arguments[0]) ? arguments[0] : arguments);
            return new c(function(b, c) {
                function d(f, g) {
                    try {
                        if (g && ("object" == typeof g || "function" == typeof g)) {
                            var h = g.then;
                            if ("function" == typeof h)
                                return void h.call(g, function(a) {
                                    d(f, a)
                                }, c)
                        }
                        a[f] = g, 0 === --e && b(a)
                    } catch (a) {
                        c(a)
                    }
                }
                if (0 === a.length)
                    return b([]);
                for (var e = a.length, f = 0; f < a.length; f++)
                    d(f, a[f])
            })
        }, c.resolve = function(a) {
            return a && "object" == typeof a && a.constructor === c ? a : new c(function(b) {
                b(a)
            })
        }, c.reject = function(a) {
            return new c(function(b, c) {
                c(a)
            })
        }, c.race = function(a) {
            return new c(function(b, c) {
                for (var d = 0, e = a.length; e > d; d++)
                    a[d].then(b, c)
            })
        }, "undefined" != typeof module && module.exports ? module.exports = c : a.Promise || (a.Promise = c)
    }(this), a.copy = function(a) {
        return new Promise(function(b, c) {
            if ("string" != typeof a && !("text/plain" in a))
                throw new Error("You must provide a text/plain type.");
            var d = "string" == typeof a ? a : a["text/plain"],
                e = window.clipboardData.setData("Text", d);
            e ? b() : c(new Error("Copying was rejected."))
        })
    }, a.paste = function(a) {
        return new Promise(function(a, b) {
            var c = window.clipboardData.getData("Text");
            c ? a(c) : b(new Error("Pasting was rejected."))
        })
    }), a
}), function(a, b) {
    "function" == typeof define && define.amd ? define([], b) : "object" == typeof exports ? module.exports = b() : a.$clamp = b()
}(this, function() {
    function a(a, b) {
        function c(a, b) {
            return k.getComputedStyle || (k.getComputedStyle = function(a, b) {
                return this.el = a, this.getPropertyValue = function(b) {
                    var c = /(\-([a-z]){1})/g;
                    return "float" == b && (b = "styleFloat"), c.test(b) && (b = b.replace(c, function() {
                        return arguments[2].toUpperCase()
                    })), a.currentStyle && a.currentStyle[b] ? a.currentStyle[b] : null
                }, this
            }), k.getComputedStyle(a, null).getPropertyValue(b)
        }
        function d(b) {
            var c = b || a.clientHeight,
                d = f(a);
            return Math.max(Math.floor(c / d), 0)
        }
        function e(b) {
            var c = f(a);
            return c * b
        }
        function f(a) {
            var b = c(a, "line-height");
            return "normal" == b && (b = 1.2 * parseInt(c(a, "font-size"))), parseInt(b)
        }
        function g(b) {
            return b.lastChild.children && b.lastChild.children.length > 0 ? g(Array.prototype.slice.call(b.children).pop()) : b.lastChild && b.lastChild.nodeValue && "" !== b.lastChild.nodeValue && b.lastChild.nodeValue != l.truncationChar ? b.lastChild : (b.lastChild.parentNode.removeChild(b.lastChild), g(a))
        }
        function h(b, c) {
            function d() {
                t = l.splitOnChars.slice(0), u = t[0], r = null, s = null
            }
            if (c) {
                var e = b.nodeValue.replace(l.truncationChar, "");
                if (r || (u = t.length > 0 ? t.shift() : "", r = e.split(u)), r.length > 1 ? (s = r.pop(), i(b, r.join(u))) : r = null, j && (b.nodeValue = b.nodeValue.replace(l.truncationChar, ""), a.innerHTML = b.nodeValue + " " + j.innerHTML + l.truncationChar), r) {
                    if (a.clientHeight <= c) {
                        if (!(t.length >= 0 && "" !== u))
                            return a.innerHTML;
                        i(b, r.join(u) + u + s), r = null
                    }
                } else
                    "" === u && (i(b, ""), b = g(a), d());
                return l.animate ? void setTimeout(function() {
                    h(b, c)
                }, l.animate === !0 ? 10 : l.animate) : h(b, c)
            }
        }
        function i(a, b) {
            a.nodeValue = b + l.truncationChar
        }
        b = b || {};
        var j,
            k = window,
            l = {
                clamp: b.clamp || 2,
                useNativeClamp: "undefined" == typeof b.useNativeClamp || b.useNativeClamp,
                splitOnChars: b.splitOnChars || [".", "-", "\u2013", "\u2014", " "],
                animate: b.animate || !1,
                truncationChar: b.truncationChar || "\u2026",
                truncationHTML: b.truncationHTML
            },
            m = a.style,
            n = a.innerHTML,
            o = "undefined" != typeof a.style.webkitLineClamp,
            p = l.clamp,
            q = p.indexOf && (p.indexOf("px") > -1 || p.indexOf("em") > -1);
        l.truncationHTML && (j = document.createElement("span"), j.innerHTML = l.truncationHTML);
        var r,
            s,
            t = l.splitOnChars.slice(0),
            u = t[0];
        "auto" == p ? p = d() : q && (p = d(parseInt(p)));
        var v;
        if (o && l.useNativeClamp)
            m.overflow = "hidden", m.textOverflow = "ellipsis", m.webkitBoxOrient = "vertical", m.display = "-webkit-box", m.webkitLineClamp = p, q && (m.height = l.clamp + "px");
        else {
            var w = e(p);
            w <= a.clientHeight && (v = h(g(a), w))
        }
        return {
            original: n,
            clamped: v
        }
    }
    return a
});
var template = function(a, b) {
    return template["object" == typeof b ? "render" : "compile"].apply(template, arguments)
};
!function(a, b) {
    "use strict";
    a.version = "2.0.1", a.openTag = "<%", a.closeTag = "%>", a.isEscape = !0, a.isCompress = !1, a.parser = null, a.render = function(a, b) {
        var c = d(a);
        return void 0 === c ? e({
            id: a,
            name: "Render Error",
            message: "No Template"
        }) : c(b)
    }, a.compile = function(b, d) {
        function g(c) {
            try {
                return new k(c) + ""
            } catch (f) {
                return i ? (f.id = b || d, f.name = "Render Error", f.source = d, e(f)) : a.compile(b, d, !0)(c)
            }
        }
        var h = arguments,
            i = h[2],
            j = "anonymous";
        "string" != typeof d && (i = h[1], d = h[0], b = j);
        try {
            var k = f(d, i)
        } catch (a) {
            return a.id = b || d, a.name = "Syntax Error", e(a)
        }
        return g.prototype = k.prototype, g.toString = function() {
            return k.toString()
        }, b !== j && (c[b] = g), g
    }, a.helper = function(b, c) {
        a.prototype[b] = c
    }, a.onerror = function(a) {
        var c = "[template]:\n" + a.id + "\n\n[name]:\n" + a.name;
        a.message && (c += "\n\n[message]:\n" + a.message), a.line && (c += "\n\n[line]:\n" + a.line, c += "\n\n[source]:\n" + a.source.split(/\n/)[a.line - 1].replace(/^[\s\t]+/, "")), a.temp && (c += "\n\n[temp]:\n" + a.temp), b.console && console.error(c)
    };
    var c = {},
        d = function(d) {
            var e = c[d];
            if (void 0 === e && "document" in b) {
                var f = document.getElementById(d);
                if (f) {
                    var g = f.value || f.innerHTML;
                    return a.compile(d, g.replace(/^\s*|\s*$/g, ""))
                }
            } else if (c.hasOwnProperty(d))
                return e
        },
        e = function(b) {
            function c() {
                return c + ""
            }
            return a.onerror(b), c.toString = function() {
                return "{Template Error}"
            }, c
        },
        f = function() {
            a.prototype = {
                $render: a.render,
                $escape: function(a) {
                    return "string" == typeof a ? a.replace(/&(?![\w#]+;)|[<>"']/g, function(a) {
                        return {
                            "<": "&#60;",
                            ">": "&#62;",
                            '"': "&#34;",
                            "'": "&#39;",
                            "&": "&#38;"
                        }[a]
                    }) : a
                },
                $string: function(a) {
                    return "string" == typeof a || "number" == typeof a ? a : "function" == typeof a ? a() : ""
                }
            };
            var b = Array.prototype.forEach || function(a, b) {
                    for (var c = this.length >>> 0, d = 0; d < c; d++)
                        d in this && a.call(b, this[d], d, this)
                },
                c = function(a, c) {
                    b.call(a, c)
                },
                d = "break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",
                e = /\/\*(?:.|\n)*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|'[^']*'|"[^"]*"|[\s\t\n]*\.[\s\t\n]*[$\w\.]+/g,
                f = /[^\w$]+/g,
                g = new RegExp(["\\b" + d.replace(/,/g, "\\b|\\b") + "\\b"].join("|"), "g"),
                h = /\b\d[^,]*/g,
                i = /^,+|,+$/g,
                j = function(a) {
                    return a = a.replace(e, "").replace(f, ",").replace(g, "").replace(h, "").replace(i, ""), a = a ? a.split(/,+/) : []
                };
            return function(b, d) {
                function e(b) {
                    return o += b.split(/\n/).length - 1, a.isCompress && (b = b.replace(/[\n\r\t\s]+/g, " ")), b = b.replace(/('|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n"), b = u[1] + "'" + b + "'" + u[2], b + "\n"
                }
                function f(b) {
                    var c = o;
                    if (l ? b = l(b) : d && (b = b.replace(/\n/g, function() {
                        return o++, "$line=" + o + ";"
                    })), 0 === b.indexOf("=")) {
                        var e = 0 !== b.indexOf("==");
                        if (b = b.replace(/^=*|[\s;]*$/g, ""), e && a.isEscape) {
                            var f = b.replace(/\s*\([^\)]+\)/, "");
                            q.hasOwnProperty(f) || /^(include|print)$/.test(f) || (b = "$escape($string(" + b + "))")
                        } else
                            b = "$string(" + b + ")";
                        b = u[1] + b + u[2]
                    }
                    return d && (b = "$line=" + c + ";" + b), g(b), b + "\n"
                }
                function g(a) {
                    a = j(a), c(a, function(a) {
                        p.hasOwnProperty(a) || (h(a), p[a] = !0)
                    })
                }
                function h(a) {
                    var b;
                    "print" === a ? b = w : "include" === a ? (r.$render = q.$render, b = x) : (b = "$data." + a, q.hasOwnProperty(a) && (r[a] = q[a], b = 0 === a.indexOf("$") ? "$helpers." + a : b + "===undefined?$helpers." + a + ":" + b)), s += a + "=" + b + ","
                }
                var i = a.openTag,
                    k = a.closeTag,
                    l = a.parser,
                    m = b,
                    n = "",
                    o = 1,
                    p = {
                        $data: !0,
                        $helpers: !0,
                        $out: !0,
                        $line: !0
                    },
                    q = a.prototype,
                    r = {},
                    s = "var $helpers=this," + (d ? "$line=0," : ""),
                    t = "".trim,
                    u = t ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"],
                    v = t ? "if(content!==undefined){$out+=content;return content}" : "$out.push(content);",
                    w = "function(content){" + v + "}",
                    x = "function(id,data){if(data===undefined){data=$data}var content=$helpers.$render(id,data);" + v + "}";
                c(m.split(i), function(a, b) {
                    a = a.split(k);
                    var c = a[0],
                        d = a[1];
                    1 === a.length ? n += e(c) : (n += f(c), d && (n += e(d)))
                }), m = n, d && (m = "try{" + m + "}catch(e){e.line=$line;throw e}"), m = "'use strict';" + s + u[0] + m + "return new String(" + u[3] + ")";
                try {
                    var y = new Function("$data", m);
                    return y.prototype = r, y
                } catch (a) {
                    throw a.temp = "function anonymous($data) {" + m + "}", a
                }
            }
        }()
}(template, this), "function" == typeof define ? define(function(a, b, c) {
    c.exports = template
}) : "undefined" != typeof exports && (module.exports = template);
var Zepto = function() {
    function a(a) {
        return null == a ? String(a) : U[V.call(a)] || "object"
    }
    function b(b) {
        return "function" == a(b)
    }
    function c(a) {
        return null != a && a == a.window
    }
    function d(a) {
        return null != a && a.nodeType == a.DOCUMENT_NODE
    }
    function e(b) {
        return "object" == a(b)
    }
    function f(a) {
        return e(a) && !c(a) && Object.getPrototypeOf(a) == Object.prototype
    }
    function g(a) {
        return "number" == typeof a.length
    }
    function h(a) {
        return D.call(a, function(a) {
            return null != a
        })
    }
    function i(a) {
        return a.length > 0 ? x.fn.concat.apply([], a) : a
    }
    function j(a) {
        return a.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
    }
    function k(a) {
        return a in G ? G[a] : G[a] = new RegExp("(^|\\s)" + a + "(\\s|$)")
    }
    function l(a, b) {
        return "number" != typeof b || H[j(a)] ? b : b + "px"
    }
    function m(a) {
        var b,
            c;
        return F[a] || (b = E.createElement(a), E.body.appendChild(b), c = getComputedStyle(b, "").getPropertyValue("display"), b.parentNode.removeChild(b), "none" == c && (c = "block"), F[a] = c), F[a]
    }
    function n(a) {
        return "children" in a ? C.call(a.children) : x.map(a.childNodes, function(a) {
            if (1 == a.nodeType)
                return a
        })
    }
    function o(a, b, c) {
        for (w in b)
            c && (f(b[w]) || Z(b[w])) ? (f(b[w]) && !f(a[w]) && (a[w] = {}), Z(b[w]) && !Z(a[w]) && (a[w] = []), o(a[w], b[w], c)) : b[w] !== v && (a[w] = b[w])
    }
    function p(a, b) {
        return null == b ? x(a) : x(a).filter(b)
    }
    function q(a, c, d, e) {
        return b(c) ? c.call(a, d, e) : c
    }
    function r(a, b, c) {
        null == c ? a.removeAttribute(b) : a.setAttribute(b, c)
    }
    function s(a, b) {
        var c = a.className || "",
            d = c && c.baseVal !== v;
        return b === v ? d ? c.baseVal : c : void (d ? c.baseVal = b : a.className = b)
    }
    function t(a) {
        var b;
        try {
            return a ? "true" == a || "false" != a && ("null" == a ? null : /^0/.test(a) || isNaN(b = Number(a)) ? /^[\[\{]/.test(a) ? x.parseJSON(a) : a : b) : a
        } catch (b) {
            return a
        }
    }
    function u(a, b) {
        b(a);
        for (var c = 0, d = a.childNodes.length; c < d; c++)
            u(a.childNodes[c], b)
    }
    var v,
        w,
        x,
        y,
        z,
        A,
        B = [],
        C = B.slice,
        D = B.filter,
        E = window.document,
        F = {},
        G = {},
        H = {
            "column-count": 1,
            columns: 1,
            "font-weight": 1,
            "line-height": 1,
            opacity: 1,
            "z-index": 1,
            zoom: 1
        },
        I = /^\s*<(\w+|!)[^>]*>/,
        J = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        K = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        L = /^(?:body|html)$/i,
        M = /([A-Z])/g,
        N = ["val", "css", "html", "text", "data", "width", "height", "offset"],
        O = ["after", "prepend", "before", "append"],
        P = E.createElement("table"),
        Q = E.createElement("tr"),
        R = {
            tr: E.createElement("tbody"),
            tbody: P,
            thead: P,
            tfoot: P,
            td: Q,
            th: Q,
            "*": E.createElement("div")
        },
        S = /complete|loaded|interactive/,
        T = /^[\w-]*$/,
        U = {},
        V = U.toString,
        W = {},
        X = E.createElement("div"),
        Y = {
            tabindex: "tabIndex",
            readonly: "readOnly",
            for: "htmlFor",
            class: "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        Z = Array.isArray || function(a) {
            return a instanceof Array
        };
    return W.matches = function(a, b) {
        if (!b || !a || 1 !== a.nodeType)
            return !1;
        var c = a.webkitMatchesSelector || a.mozMatchesSelector || a.oMatchesSelector || a.matchesSelector;
        if (c)
            return c.call(a, b);
        var d,
            e = a.parentNode,
            f = !e;
        return f && (e = X).appendChild(a), d = ~W.qsa(e, b).indexOf(a), f && X.removeChild(a), d
    }, z = function(a) {
        return a.replace(/-+(.)?/g, function(a, b) {
            return b ? b.toUpperCase() : ""
        })
    }, A = function(a) {
        return D.call(a, function(b, c) {
            return a.indexOf(b) == c
        })
    }, W.fragment = function(a, b, c) {
        var d,
            e,
            g;
        return J.test(a) && (d = x(E.createElement(RegExp.$1))), d || (a.replace && (a = a.replace(K, "<$1></$2>")), b === v && (b = I.test(a) && RegExp.$1), b in R || (b = "*"), g = R[b], g.innerHTML = "" + a, d = x.each(C.call(g.childNodes), function() {
            g.removeChild(this)
        })), f(c) && (e = x(d), x.each(c, function(a, b) {
            N.indexOf(a) > -1 ? e[a](b) : e.attr(a, b)
        })), d
    }, W.Z = function(a, b) {
        return a = a || [], a.__proto__ = x.fn, a.selector = b || "", a
    }, W.isZ = function(a) {
        return a instanceof W.Z
    }, W.init = function(a, c) {
        var d;
        if (!a)
            return W.Z();
        if ("string" == typeof a)
            if (a = a.trim(), "<" == a[0] && I.test(a))
                d = W.fragment(a, RegExp.$1, c), a = null;
            else {
                if (c !== v)
                    return x(c).find(a);
                d = W.qsa(E, a)
            }
        else {
            if (b(a))
                return x(E).ready(a);
            if (W.isZ(a))
                return a;
            if (Z(a))
                d = h(a);
            else if (e(a))
                d = [a], a = null;
            else if (I.test(a))
                d = W.fragment(a.trim(), RegExp.$1, c), a = null;
            else {
                if (c !== v)
                    return x(c).find(a);
                d = W.qsa(E, a)
            }
        }
        return W.Z(d, a)
    }, x = function(a, b) {
        return W.init(a, b)
    }, x.extend = function(a) {
        var b,
            c = C.call(arguments, 1);
        return "boolean" == typeof a && (b = a, a = c.shift()), c.forEach(function(c) {
            o(a, c, b)
        }), a
    }, W.qsa = function(a, b) {
        var c,
            e = "#" == b[0],
            f = !e && "." == b[0],
            g = e || f ? b.slice(1) : b,
            h = T.test(g);
        return d(a) && h && e ? (c = a.getElementById(g)) ? [c] : [] : 1 !== a.nodeType && 9 !== a.nodeType ? [] : C.call(h && !e ? f ? a.getElementsByClassName(g) : a.getElementsByTagName(b) : a.querySelectorAll(b))
    }, x.contains = E.documentElement.contains ? function(a, b) {
        return a !== b && a.contains(b)
    } : function(a, b) {
        for (; b && (b = b.parentNode);)
            if (b === a)
                return !0;
        return !1
    }, x.type = a, x.isFunction = b, x.isWindow = c, x.isArray = Z, x.isPlainObject = f, x.isEmptyObject = function(a) {
        var b;
        for (b in a)
            return !1;
        return !0
    }, x.inArray = function(a, b, c) {
        return B.indexOf.call(b, a, c)
    }, x.camelCase = z, x.trim = function(a) {
        return null == a ? "" : String.prototype.trim.call(a)
    }, x.uuid = 0, x.support = {}, x.expr = {}, x.map = function(a, b) {
        var c,
            d,
            e,
            f = [];
        if (g(a))
            for (d = 0; d < a.length; d++)
                c = b(a[d], d), null != c && f.push(c);
        else
            for (e in a)
                c = b(a[e], e), null != c && f.push(c);
        return i(f)
    }, x.each = function(a, b) {
        var c,
            d;
        if (g(a)) {
            for (c = 0; c < a.length; c++)
                if (b.call(a[c], c, a[c]) === !1)
                    return a
        } else
            for (d in a)
                if (b.call(a[d], d, a[d]) === !1)
                    return a;
        return a
    }, x.grep = function(a, b) {
        return D.call(a, b)
    }, window.JSON && (x.parseJSON = JSON.parse), x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) {
        U["[object " + b + "]"] = b.toLowerCase()
    }), x.fn = {
        forEach: B.forEach,
        reduce: B.reduce,
        push: B.push,
        sort: B.sort,
        indexOf: B.indexOf,
        concat: B.concat,
        map: function(a) {
            return x(x.map(this, function(b, c) {
                return a.call(b, c, b)
            }))
        },
        slice: function() {
            return x(C.apply(this, arguments))
        },
        ready: function(a) {
            return S.test(E.readyState) && E.body ? a(x) : E.addEventListener("DOMContentLoaded", function() {
                a(x)
            }, !1), this
        },
        get: function(a) {
            return a === v ? C.call(this) : this[a >= 0 ? a : a + this.length]
        },
        toArray: function() {
            return this.get()
        },
        size: function() {
            return this.length
        },
        remove: function() {
            return this.each(function() {
                null != this.parentNode && this.parentNode.removeChild(this)
            })
        },
        each: function(a) {
            return B.every.call(this, function(b, c) {
                return a.call(b, c, b) !== !1
            }), this
        },
        filter: function(a) {
            return b(a) ? this.not(this.not(a)) : x(D.call(this, function(b) {
                return W.matches(b, a)
            }))
        },
        add: function(a, b) {
            return x(A(this.concat(x(a, b))))
        },
        is: function(a) {
            return this.length > 0 && W.matches(this[0], a)
        },
        not: function(a) {
            var c = [];
            if (b(a) && a.call !== v)
                this.each(function(b) {
                    a.call(this, b) || c.push(this)
                });
            else {
                var d = "string" == typeof a ? this.filter(a) : g(a) && b(a.item) ? C.call(a) : x(a);
                this.forEach(function(a) {
                    d.indexOf(a) < 0 && c.push(a)
                })
            }
            return x(c)
        },
        has: function(a) {
            return this.filter(function() {
                return e(a) ? x.contains(this, a) : x(this).find(a).size()
            })
        },
        eq: function(a) {
            return a === -1 ? this.slice(a) : this.slice(a, +a + 1)
        },
        first: function() {
            var a = this[0];
            return a && !e(a) ? a : x(a)
        },
        last: function() {
            var a = this[this.length - 1];
            return a && !e(a) ? a : x(a)
        },
        find: function(a) {
            var b,
                c = this;
            return b = a ? "object" == typeof a ? x(a).filter(function() {
                var a = this;
                return B.some.call(c, function(b) {
                    return x.contains(b, a)
                })
            }) : 1 == this.length ? x(W.qsa(this[0], a)) : this.map(function() {
                return W.qsa(this, a)
            }) : []
        },
        closest: function(a, b) {
            var c = this[0],
                e = !1;
            for ("object" == typeof a && (e = x(a)); c && !(e ? e.indexOf(c) >= 0 : W.matches(c, a));)
                c = c !== b && !d(c) && c.parentNode;
            return x(c)
        },
        parents: function(a) {
            for (var b = [], c = this; c.length > 0;)
                c = x.map(c, function(a) {
                    if ((a = a.parentNode) && !d(a) && b.indexOf(a) < 0)
                        return b.push(a), a
                });
            return p(b, a)
        },
        parent: function(a) {
            return p(A(this.pluck("parentNode")), a)
        },
        children: function(a) {
            return p(this.map(function() {
                return n(this)
            }), a)
        },
        contents: function() {
            return this.map(function() {
                return C.call(this.childNodes)
            })
        },
        siblings: function(a) {
            return p(this.map(function(a, b) {
                return D.call(n(b.parentNode), function(a) {
                    return a !== b
                })
            }), a)
        },
        empty: function() {
            return this.each(function() {
                this.innerHTML = ""
            })
        },
        pluck: function(a) {
            return x.map(this, function(b) {
                return b[a]
            })
        },
        show: function() {
            return this.each(function() {
                "none" == this.style.display && (this.style.display = ""), "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = m(this.nodeName))
            })
        },
        replaceWith: function(a) {
            return this.before(a).remove()
        },
        wrap: function(a) {
            var c = b(a);
            if (this[0] && !c)
                var d = x(a).get(0),
                    e = d.parentNode || this.length > 1;
            return this.each(function(b) {
                x(this).wrapAll(c ? a.call(this, b) : e ? d.cloneNode(!0) : d)
            })
        },
        wrapAll: function(a) {
            if (this[0]) {
                x(this[0]).before(a = x(a));
                for (var b; (b = a.children()).length;)
                    a = b.first();
                x(a).append(this)
            }
            return this
        },
        wrapInner: function(a) {
            var c = b(a);
            return this.each(function(b) {
                var d = x(this),
                    e = d.contents(),
                    f = c ? a.call(this, b) : a;
                e.length ? e.wrapAll(f) : d.append(f)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                x(this).replaceWith(x(this).children())
            }), this
        },
        clone: function() {
            return this.map(function() {
                return this.cloneNode(!0)
            })
        },
        hide: function() {
            return this.css("display", "none")
        },
        toggle: function(a) {
            return this.each(function() {
                var b = x(this);
                (a === v ? "none" == b.css("display") : a) ? b.show() : b.hide()
            })
        },
        prev: function(a) {
            return x(this.pluck("previousElementSibling")).filter(a || "*")
        },
        next: function(a) {
            return x(this.pluck("nextElementSibling")).filter(a || "*")
        },
        html: function(a) {
            return 0 in arguments ? this.each(function(b) {
                var c = this.innerHTML;
                x(this).empty().append(q(this, a, b, c))
            }) : 0 in this ? this[0].innerHTML : null
        },
        text: function(a) {
            return 0 in arguments ? this.each(function(b) {
                var c = q(this, a, b, this.textContent);
                this.textContent = null == c ? "" : "" + c
            }) : 0 in this ? this[0].textContent : null
        },
        attr: function(a, b) {
            var c;
            return "string" != typeof a || 1 in arguments ? this.each(function(c) {
                if (1 === this.nodeType)
                    if (e(a))
                        for (w in a)
                            r(this, w, a[w]);
                    else
                        r(this, a, q(this, b, c, this.getAttribute(a)))
            }) : this.length && 1 === this[0].nodeType ? !(c = this[0].getAttribute(a)) && a in this[0] ? this[0][a] : c : v
        },
        removeAttr: function(a) {
            return this.each(function() {
                1 === this.nodeType && r(this, a)
            })
        },
        prop: function(a, b) {
            return a = Y[a] || a, 1 in arguments ? this.each(function(c) {
                this[a] = q(this, b, c, this[a])
            }) : this[0] && this[0][a]
        },
        data: function(a, b) {
            var c = "data-" + a.replace(M, "-$1").toLowerCase(),
                d = 1 in arguments ? this.attr(c, b) : this.attr(c);
            return null !== d ? t(d) : v
        },
        val: function(a) {
            return 0 in arguments ? this.each(function(b) {
                this.value = q(this, a, b, this.value)
            }) : this[0] && (this[0].multiple ? x(this[0]).find("option").filter(function() {
                return this.selected
            }).pluck("value") : this[0].value)
        },
        offset: function(a) {
            if (a)
                return this.each(function(b) {
                    var c = x(this),
                        d = q(this, a, b, c.offset()),
                        e = c.offsetParent().offset(),
                        f = {
                            top: d.top - e.top,
                            left: d.left - e.left
                        };
                    "static" == c.css("position") && (f.position = "relative"), c.css(f)
                });
            if (!this.length)
                return null;
            var b = this[0].getBoundingClientRect();
            return {
                left: b.left + window.pageXOffset,
                top: b.top + window.pageYOffset,
                width: Math.round(b.width),
                height: Math.round(b.height)
            }
        },
        css: function(b, c) {
            if (arguments.length < 2) {
                var d = this[0],
                    e = getComputedStyle(d, "");
                if (!d)
                    return;
                if ("string" == typeof b)
                    return d.style[z(b)] || e.getPropertyValue(b);
                if (Z(b)) {
                    var f = {};
                    return x.each(b, function(a, b) {
                        f[b] = d.style[z(b)] || e.getPropertyValue(b)
                    }), f
                }
            }
            var g = "";
            if ("string" == a(b))
                c || 0 === c ? g = j(b) + ":" + l(b, c) : this.each(function() {
                    this.style.removeProperty(j(b))
                });
            else
                for (w in b)
                    b[w] || 0 === b[w] ? g += j(w) + ":" + l(w, b[w]) + ";" : this.each(function() {
                        this.style.removeProperty(j(w))
                    });
            return this.each(function() {
                this.style.cssText += ";" + g
            })
        },
        index: function(a) {
            return a ? this.indexOf(x(a)[0]) : this.parent().children().indexOf(this[0])
        },
        hasClass: function(a) {
            return !!a && B.some.call(this, function(a) {
                    return this.test(s(a))
                }, k(a))
        },
        addClass: function(a) {
            return a ? this.each(function(b) {
                if ("className" in this) {
                    y = [];
                    var c = s(this),
                        d = q(this, a, b, c);
                    d.split(/\s+/g).forEach(function(a) {
                        x(this).hasClass(a) || y.push(a)
                    }, this), y.length && s(this, c + (c ? " " : "") + y.join(" "))
                }
            }) : this
        },
        removeClass: function(a) {
            return this.each(function(b) {
                if ("className" in this) {
                    if (a === v)
                        return s(this, "");
                    y = s(this), q(this, a, b, y).split(/\s+/g).forEach(function(a) {
                        y = y.replace(k(a), " ")
                    }), s(this, y.trim())
                }
            })
        },
        toggleClass: function(a, b) {
            return a ? this.each(function(c) {
                var d = x(this),
                    e = q(this, a, c, s(this));
                e.split(/\s+/g).forEach(function(a) {
                    (b === v ? !d.hasClass(a) : b) ? d.addClass(a) : d.removeClass(a)
                })
            }) : this
        },
        scrollTop: function(a) {
            if (this.length) {
                var b = "scrollTop" in this[0];
                return a === v ? b ? this[0].scrollTop : this[0].pageYOffset : this.each(b ? function() {
                    this.scrollTop = a
                } : function() {
                    this.scrollTo(this.scrollX, a)
                })
            }
        },
        scrollLeft: function(a) {
            if (this.length) {
                var b = "scrollLeft" in this[0];
                return a === v ? b ? this[0].scrollLeft : this[0].pageXOffset : this.each(b ? function() {
                    this.scrollLeft = a
                } : function() {
                    this.scrollTo(a, this.scrollY)
                })
            }
        },
        position: function() {
            if (this.length) {
                var a = this[0],
                    b = this.offsetParent(),
                    c = this.offset(),
                    d = L.test(b[0].nodeName) ? {
                        top: 0,
                        left: 0
                    } : b.offset();
                return c.top -= parseFloat(x(a).css("margin-top")) || 0, c.left -= parseFloat(x(a).css("margin-left")) || 0, d.top += parseFloat(x(b[0]).css("border-top-width")) || 0, d.left += parseFloat(x(b[0]).css("border-left-width")) || 0, {
                    top: c.top - d.top,
                    left: c.left - d.left
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var a = this.offsetParent || E.body; a && !L.test(a.nodeName) && "static" == x(a).css("position");)
                    a = a.offsetParent;
                return a
            })
        }
    }, x.fn.detach = x.fn.remove, ["width", "height"].forEach(function(a) {
        var b = a.replace(/./, function(a) {
            return a[0].toUpperCase()
        });
        x.fn[a] = function(e) {
            var f,
                g = this[0];
            return e === v ? c(g) ? g["inner" + b] : d(g) ? g.documentElement["scroll" + b] : (f = this.offset()) && f[a] : this.each(function(b) {
                g = x(this), g.css(a, q(this, e, b, g[a]()))
            })
        }
    }), O.forEach(function(b, c) {
        var d = c % 2;
        x.fn[b] = function() {
            var b,
                e,
                f = x.map(arguments, function(c) {
                    return b = a(c), "object" == b || "array" == b || null == c ? c : W.fragment(c)
                }),
                g = this.length > 1;
            return f.length < 1 ? this : this.each(function(a, b) {
                e = d ? b : b.parentNode, b = 0 == c ? b.nextSibling : 1 == c ? b.firstChild : 2 == c ? b : null;
                var h = x.contains(E.documentElement, e);
                f.forEach(function(a) {
                    if (g)
                        a = a.cloneNode(!0);
                    else if (!e)
                        return x(a).remove();
                    e.insertBefore(a, b), h && u(a, function(a) {
                        null == a.nodeName || "SCRIPT" !== a.nodeName.toUpperCase() || a.type && "text/javascript" !== a.type || a.src || window.eval.call(window, a.innerHTML)
                    })
                })
            })
        }, x.fn[d ? b + "To" : "insert" + (c ? "Before" : "After")] = function(a) {
            return x(a)[b](this), this
        }
    }), W.Z.prototype = x.fn, W.uniq = A, W.deserializeValue = t, x.zepto = W, x
}();
window.Zepto = Zepto, void 0 === window.$ && (window.$ = Zepto), function(a) {
    function b(a) {
        return a._zid || (a._zid = m++)
    }
    function c(a, c, f, g) {
        if (c = d(c), c.ns)
            var h = e(c.ns);
        return (q[b(a)] || []).filter(function(a) {
            return a && (!c.e || a.e == c.e) && (!c.ns || h.test(a.ns)) && (!f || b(a.fn) === b(f)) && (!g || a.sel == g)
        })
    }
    function d(a) {
        var b = ("" + a).split(".");
        return {
            e: b[0],
            ns: b.slice(1).sort().join(" ")
        }
    }
    function e(a) {
        return new RegExp("(?:^| )" + a.replace(" ", " .* ?") + "(?: |$)")
    }
    function f(a, b) {
        return a.del && !s && a.e in t || !!b
    }
    function g(a) {
        return u[a] || s && t[a] || a
    }
    function h(c, e, h, i, k, m, n) {
        var o = b(c),
            p = q[o] || (q[o] = []);
        e.split(/\s/).forEach(function(b) {
            if ("ready" == b)
                return a(document).ready(h);
            var e = d(b);
            e.fn = h, e.sel = k, e.e in u && (h = function(b) {
                var c = b.relatedTarget;
                if (!c || c !== this && !a.contains(this, c))
                    return e.fn.apply(this, arguments)
            }), e.del = m;
            var o = m || h;
            e.proxy = function(a) {
                if (a = j(a), !a.isImmediatePropagationStopped()) {
                    a.data = i;
                    var b = o.apply(c, a._args == l ? [a] : [a].concat(a._args));
                    return b === !1 && (a.preventDefault(), a.stopPropagation()), b
                }
            }, e.i = p.length, p.push(e), "addEventListener" in c && c.addEventListener(g(e.e), e.proxy, f(e, n))
        })
    }
    function i(a, d, e, h, i) {
        var j = b(a);
        (d || "").split(/\s/).forEach(function(b) {
            c(a, b, e, h).forEach(function(b) {
                delete q[j][b.i], "removeEventListener" in a && a.removeEventListener(g(b.e), b.proxy, f(b, i))
            })
        })
    }
    function j(b, c) {
        return !c && b.isDefaultPrevented || (c || (c = b), a.each(y, function(a, d) {
            var e = c[a];
            b[a] = function() {
                return this[d] = v, e && e.apply(c, arguments)
            }, b[d] = w
        }), (c.defaultPrevented !== l ? c.defaultPrevented : "returnValue" in c ? c.returnValue === !1 : c.getPreventDefault && c.getPreventDefault()) && (b.isDefaultPrevented = v)), b
    }
    function k(a) {
        var b,
            c = {
                originalEvent: a
            };
        for (b in a)
            x.test(b) || a[b] === l || (c[b] = a[b]);
        return j(c, a)
    }
    var l,
        m = 1,
        n = Array.prototype.slice,
        o = a.isFunction,
        p = function(a) {
            return "string" == typeof a
        },
        q = {},
        r = {},
        s = "onfocusin" in window,
        t = {
            focus: "focusin",
            blur: "focusout"
        },
        u = {
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        };
    r.click = r.mousedown = r.mouseup = r.mousemove = "MouseEvents", a.event = {
        add: h,
        remove: i
    }, a.proxy = function(c, d) {
        var e = 2 in arguments && n.call(arguments, 2);
        if (o(c)) {
            var f = function() {
                return c.apply(d, e ? e.concat(n.call(arguments)) : arguments)
            };
            return f._zid = b(c), f
        }
        if (p(d))
            return e ? (e.unshift(c[d], c), a.proxy.apply(null, e)) : a.proxy(c[d], c);
        throw new TypeError("expected function")
    }, a.fn.bind = function(a, b, c) {
        return this.on(a, b, c)
    }, a.fn.unbind = function(a, b) {
        return this.off(a, b)
    }, a.fn.one = function(a, b, c, d) {
        return this.on(a, b, c, d, 1)
    };
    var v = function() {
            return !0
        },
        w = function() {
            return !1
        },
        x = /^([A-Z]|returnValue$|layer[XY]$)/,
        y = {
            preventDefault: "isDefaultPrevented",
            stopImmediatePropagation: "isImmediatePropagationStopped",
            stopPropagation: "isPropagationStopped"
        };
    a.fn.delegate = function(a, b, c) {
        return this.on(b, a, c)
    }, a.fn.undelegate = function(a, b, c) {
        return this.off(b, a, c)
    }, a.fn.live = function(b, c) {
        return a(document.body).delegate(this.selector, b, c), this
    }, a.fn.die = function(b, c) {
        return a(document.body).undelegate(this.selector, b, c), this
    }, a.fn.on = function(b, c, d, e, f) {
        var g,
            j,
            m = this;
        return b && !p(b) ? (a.each(b, function(a, b) {
            m.on(a, c, d, b, f)
        }), m) : (p(c) || o(e) || e === !1 || (e = d, d = c, c = l), (o(d) || d === !1) && (e = d, d = l), e === !1 && (e = w), m.each(function(l, m) {
            f && (g = function(a) {
                return i(m, a.type, e), e.apply(this, arguments)
            }), c && (j = function(b) {
                var d,
                    f = a(b.target).closest(c, m).get(0);
                if (f && f !== m)
                    return d = a.extend(k(b), {
                        currentTarget: f,
                        liveFired: m
                    }), (g || e).apply(f, [d].concat(n.call(arguments, 1)))
            }), h(m, b, e, d, c, j || g)
        }))
    }, a.fn.off = function(b, c, d) {
        var e = this;
        return b && !p(b) ? (a.each(b, function(a, b) {
            e.off(a, c, b)
        }), e) : (p(c) || o(d) || d === !1 || (d = c, c = l), d === !1 && (d = w), e.each(function() {
            i(this, b, d, c)
        }))
    }, a.fn.trigger = function(b, c) {
        return b = p(b) || a.isPlainObject(b) ? a.Event(b) : j(b), b._args = c, this.each(function() {
            "dispatchEvent" in this ? this.dispatchEvent(b) : a(this).triggerHandler(b, c)
        })
    }, a.fn.triggerHandler = function(b, d) {
        var e,
            f;
        return this.each(function(g, h) {
            e = k(p(b) ? a.Event(b) : b), e._args = d, e.target = h, a.each(c(h, b.type || b), function(a, b) {
                if (f = b.proxy(e), e.isImmediatePropagationStopped())
                    return !1
            })
        }), f
    }, "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(b) {
        a.fn[b] = function(a) {
            return a ? this.bind(b, a) : this.trigger(b)
        }
    }), ["focus", "blur"].forEach(function(b) {
        a.fn[b] = function(a) {
            return a ? this.bind(b, a) : this.each(function() {
                try {
                    this[b]()
                } catch (a) {}
            }), this
        }
    }), a.Event = function(a, b) {
        p(a) || (b = a, a = b.type);
        var c = document.createEvent(r[a] || "Events"),
            d = !0;
        if (b)
            for (var e in b)
                "bubbles" == e ? d = !!b[e] : c[e] = b[e];
        return c.initEvent(a, d, !0), j(c)
    }
}(Zepto), function(a) {
    function b(b, c, d) {
        var e = a.Event(c);
        return a(b).trigger(e, d), !e.isDefaultPrevented()
    }
    function c(a, c, d, e) {
        if (a.global)
            return b(c || s, d, e)
    }
    function d(b) {
        b.global && 0 === a.active++ && c(b, null, "ajaxStart")
    }
    function e(b) {
        b.global && !--a.active && c(b, null, "ajaxStop")
    }
    function f(a, b) {
        var d = b.context;
        return b.beforeSend.call(d, a, b) !== !1 && c(b, d, "ajaxBeforeSend", [a, b]) !== !1 && void c(b, d, "ajaxSend", [a, b])
    }
    function g(a, b, d, e) {
        var f = d.context,
            g = "success";
        d.success.call(f, a, g, b), e && e.resolveWith(f, [a, g, b]), c(d, f, "ajaxSuccess", [b, d, a]), i(g, b, d)
    }
    function h(a, b, d, e, f) {
        var g = e.context;
        e.error.call(g, d, b, a), f && f.rejectWith(g, [d, b, a]), c(e, g, "ajaxError", [d, e, a || b]), i(b, d, e)
    }
    function i(a, b, d) {
        var f = d.context;
        d.complete.call(f, b, a), c(d, f, "ajaxComplete", [b, d]), e(d)
    }
    function j() {}
    function k(a) {
        return a && (a = a.split(";", 2)[0]), a && (a == x ? "html" : a == w ? "json" : u.test(a) ? "script" : v.test(a) && "xml") || "text"
    }
    function l(a, b) {
        return "" == b ? a : (a + "&" + b).replace(/[&?]{1,2}/, "?")
    }
    function m(b) {
        b.processData && b.data && "string" != a.type(b.data) && (b.data = a.param(b.data, b.traditional)), !b.data || b.type && "GET" != b.type.toUpperCase() || (b.url = l(b.url, b.data), b.data = void 0)
    }
    function n(b, c, d, e) {
        return a.isFunction(c) && (e = d, d = c, c = void 0), a.isFunction(d) || (e = d, d = void 0), {
            url: b,
            data: c,
            success: d,
            dataType: e
        }
    }
    function o(b, c, d, e) {
        var f,
            g = a.isArray(c),
            h = a.isPlainObject(c);
        a.each(c, function(c, i) {
            f = a.type(i), e && (c = d ? e : e + "[" + (h || "object" == f || "array" == f ? c : "") + "]"), !e && g ? b.add(i.name, i.value) : "array" == f || !d && "object" == f ? o(b, i, d, c) : b.add(c, i)
        })
    }
    var p,
        q,
        r = 0,
        s = window.document,
        t = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        u = /^(?:text|application)\/javascript/i,
        v = /^(?:text|application)\/xml/i,
        w = "application/json",
        x = "text/html",
        y = /^\s*$/;
    a.active = 0, a.ajaxJSONP = function(b, c) {
        if (!("type" in b))
            return a.ajax(b);
        var d,
            e,
            i = b.jsonpCallback,
            j = (a.isFunction(i) ? i() : i) || "jsonp" + ++r,
            k = s.createElement("script"),
            l = window[j],
            m = function(b) {
                a(k).triggerHandler("error", b || "abort")
            },
            n = {
                abort: m
            };
        return c && c.promise(n), a(k).on("load error", function(f, i) {
            clearTimeout(e), a(k).off().remove(), "error" != f.type && d ? g(d[0], n, b, c) : h(null, i || "error", n, b, c), window[j] = l, d && a.isFunction(l) && l(d[0]), l = d = void 0
        }), f(n, b) === !1 ? (m("abort"), n) : (window[j] = function() {
            d = arguments
        }, k.src = b.url.replace(/\?(.+)=\?/, "?$1=" + j), s.head.appendChild(k), b.timeout > 0 && (e = setTimeout(function() {
            m("timeout")
        }, b.timeout)), n)
    }, a.ajaxSettings = {
        type: "GET",
        beforeSend: j,
        success: j,
        error: j,
        complete: j,
        context: null,
        global: !0,
        xhr: function() {
            return new window.XMLHttpRequest
        },
        accepts: {
            script: "text/javascript, application/javascript, application/x-javascript",
            json: w,
            xml: "application/xml, text/xml",
            html: x,
            text: "text/plain"
        },
        crossDomain: !1,
        timeout: 0,
        processData: !0,
        cache: !0
    }, a.ajax = function(b) {
        var c = a.extend({}, b || {}),
            e = a.Deferred && a.Deferred();
        for (p in a.ajaxSettings)
            void 0 === c[p] && (c[p] = a.ajaxSettings[p]);
        d(c), c.crossDomain || (c.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(c.url) && RegExp.$2 != window.location.host), c.url || (c.url = window.location.toString()), m(c);
        var i = c.dataType,
            n = /\?.+=\?/.test(c.url);
        if (n && (i = "jsonp"), c.cache !== !1 && (b && b.cache === !0 || "script" != i && "jsonp" != i) || (c.url = l(c.url, "_=" + Date.now())), "jsonp" == i)
            return n || (c.url = l(c.url, c.jsonp ? c.jsonp + "=?" : c.jsonp === !1 ? "" : "callback=?")), a.ajaxJSONP(c, e);
        var o,
            r = c.accepts[i],
            s = {},
            t = function(a, b) {
                s[a.toLowerCase()] = [a, b]
            },
            u = /^([\w-]+:)\/\//.test(c.url) ? RegExp.$1 : window.location.protocol,
            v = c.xhr(),
            w = v.setRequestHeader;
        if (e && e.promise(v), c.crossDomain || t("X-Requested-With", "XMLHttpRequest"), t("Accept", r || "*/*"), (r = c.mimeType || r) && (r.indexOf(",") > -1 && (r = r.split(",", 2)[0]), v.overrideMimeType && v.overrideMimeType(r)), (c.contentType || c.contentType !== !1 && c.data && "GET" != c.type.toUpperCase()) && t("Content-Type", c.contentType || "application/x-www-form-urlencoded"), c.headers)
            for (q in c.headers)
                t(q, c.headers[q]);
        if (v.setRequestHeader = t, v.onreadystatechange = function() {
            if (4 == v.readyState) {
                v.onreadystatechange = j, clearTimeout(o);
                var b,
                    d = !1;
                if (v.status >= 200 && v.status < 300 || 304 == v.status || 0 == v.status && "file:" == u) {
                    i = i || k(c.mimeType || v.getResponseHeader("content-type")), b = v.responseText;
                    try {
                        "script" == i ? (0, eval)(b) : "xml" == i ? b = v.responseXML : "json" == i && (b = y.test(b) ? null : a.parseJSON(b))
                    } catch (a) {
                        d = a
                    }
                    d ? h(d, "parsererror", v, c, e) : g(b, v, c, e)
                } else
                    h(v.statusText || null, v.status ? "error" : "abort", v, c, e)
            }
        }, f(v, c) === !1)
            return v.abort(), h(null, "abort", v, c, e), v;
        if (c.xhrFields)
            for (q in c.xhrFields)
                v[q] = c.xhrFields[q];
        var x = !("async" in c) || c.async;
        v.open(c.type, c.url, x, c.username, c.password);
        for (q in s)
            w.apply(v, s[q]);
        return c.timeout > 0 && (o = setTimeout(function() {
            v.onreadystatechange = j, v.abort(), h(null, "timeout", v, c, e)
        }, c.timeout)), v.send(c.data ? c.data : null), v
    }, a.get = function() {
        return a.ajax(n.apply(null, arguments))
    }, a.post = function() {
        var b = n.apply(null, arguments);
        return b.type = "POST", a.ajax(b)
    }, a.getJSON = function() {
        var b = n.apply(null, arguments);
        return b.dataType = "json", a.ajax(b)
    }, a.fn.load = function(b, c, d) {
        if (!this.length)
            return this;
        var e,
            f = this,
            g = b.split(/\s/),
            h = n(b, c, d),
            i = h.success;
        return g.length > 1 && (h.url = g[0], e = g[1]), h.success = function(b) {
            f.html(e ? a("<div>").html(b.replace(t, "")).find(e) : b), i && i.apply(f, arguments)
        }, a.ajax(h), this
    };
    var z = encodeURIComponent;
    a.param = function(a, b) {
        var c = [];
        return c.add = function(a, b) {
            this.push(z(a) + "=" + z(b))
        }, o(c, a, b), c.join("&").replace(/%20/g, "+")
    }
}(Zepto), function(a) {
    a.fn.serializeArray = function() {
        var b,
            c,
            d = [];
        return a([].slice.call(this.get(0).elements)).each(function() {
            b = a(this), c = b.attr("type"), "fieldset" != this.nodeName.toLowerCase() && !this.disabled && "submit" != c && "reset" != c && "button" != c && ("radio" != c && "checkbox" != c || this.checked) && d.push({
                name: b.attr("name"),
                value: b.val()
            })
        }), d
    }, a.fn.serialize = function() {
        var a = [];
        return this.serializeArray().forEach(function(b) {
            a.push(encodeURIComponent(b.name) + "=" + encodeURIComponent(b.value))
        }), a.join("&")
    }, a.fn.submit = function(b) {
        if (b)
            this.bind("submit", b);
        else if (this.length) {
            var c = a.Event("submit");
            this.eq(0).trigger(c), c.isDefaultPrevented() || this.get(0).submit()
        }
        return this
    }
}(Zepto), function(a) {
    "__proto__" in {} || a.extend(a.zepto, {
        Z: function(b, c) {
            return b = b || [], a.extend(b, a.fn), b.selector = c || "", b.__Z = !0, b
        },
        isZ: function(b) {
            return "array" === a.type(b) && "__Z" in b
        }
    });
    try {
        getComputedStyle(void 0)
    } catch (a) {
        var b = getComputedStyle;
        window.getComputedStyle = function(a) {
            try {
                return b(a)
            } catch (a) {
                return null
            }
        }
    }
}(Zepto), function(a) {
    function b(c) {
        var d = [["resolve", "done", a.Callbacks({
                once: 1,
                memory: 1
            }), "resolved"], ["reject", "fail", a.Callbacks({
                once: 1,
                memory: 1
            }), "rejected"], ["notify", "progress", a.Callbacks({
                memory: 1
            })]],
            e = "pending",
            f = {
                state: function() {
                    return e
                },
                always: function() {
                    return g.done(arguments).fail(arguments), this
                },
                then: function() {
                    var c = arguments;
                    return b(function(b) {
                        a.each(d, function(d, e) {
                            var h = a.isFunction(c[d]) && c[d];
                            g[e[1]](function() {
                                var c = h && h.apply(this, arguments);
                                if (c && a.isFunction(c.promise))
                                    c.promise().done(b.resolve).fail(b.reject).progress(b.notify);
                                else {
                                    var d = this === f ? b.promise() : this,
                                        g = h ? [c] : arguments;
                                    b[e[0] + "With"](d, g)
                                }
                            })
                        }), c = null
                    }).promise()
                },
                promise: function(b) {
                    return null != b ? a.extend(b, f) : f
                }
            },
            g = {};
        return a.each(d, function(a, b) {
            var c = b[2],
                h = b[3];
            f[b[1]] = c.add, h && c.add(function() {
                e = h
            }, d[1 ^ a][2].disable, d[2][2].lock), g[b[0]] = function() {
                return g[b[0] + "With"](this === g ? f : this, arguments), this
            }, g[b[0] + "With"] = c.fireWith
        }), f.promise(g), c && c.call(g, g), g
    }
    var c = Array.prototype.slice;
    a.when = function(d) {
        var e,
            f,
            g,
            h = c.call(arguments),
            i = h.length,
            j = 0,
            k = 1 !== i || d && a.isFunction(d.promise) ? i : 0,
            l = 1 === k ? d : b(),
            m = function(a, b, d) {
                return function(f) {
                    b[a] = this, d[a] = arguments.length > 1 ? c.call(arguments) : f, d === e ? l.notifyWith(b, d) : --k || l.resolveWith(b, d)
                }
            };
        if (i > 1)
            for (e = new Array(i), f = new Array(i), g = new Array(i); j < i; ++j)
                h[j] && a.isFunction(h[j].promise) ? h[j].promise().done(m(j, g, h)).fail(l.reject).progress(m(j, f, e)) : --k;
        return k || l.resolveWith(g, h), l.promise()
    }, a.Deferred = b
}(Zepto), function(a, b) {
    function c(a) {
        return a.replace(/([a-z])([A-Z])/, "$1-$2").toLowerCase()
    }
    function d(a) {
        return e ? e + a : a.toLowerCase()
    }
    var e,
        f,
        g,
        h,
        i,
        j,
        k,
        l,
        m,
        n,
        o = "",
        p = {
            Webkit: "webkit",
            Moz: "",
            O: "o"
        },
        q = window.document,
        r = q.createElement("div"),
        s = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
        t = {};
    a.each(p, function(a, c) {
        if (r.style[a + "TransitionProperty"] !== b)
            return o = "-" + a.toLowerCase() + "-", e = c, !1
    }), f = o + "transform", t[g = o + "transition-property"] = t[h = o + "transition-duration"] = t[j = o + "transition-delay"] = t[i = o + "transition-timing-function"] = t[k = o + "animation-name"] = t[l = o + "animation-duration"] = t[n = o + "animation-delay"] = t[m = o + "animation-timing-function"] = "", a.fx = {
        off: e === b && r.style.transitionProperty === b,
        speeds: {
            _default: 400,
            fast: 200,
            slow: 600
        },
        cssPrefix: o,
        transitionEnd: d("TransitionEnd"),
        animationEnd: d("AnimationEnd")
    }, a.fn.animate = function(c, d, e, f, g) {
        return a.isFunction(d) && (f = d, e = b, d = b), a.isFunction(e) && (f = e, e = b), a.isPlainObject(d) && (e = d.easing, f = d.complete, g = d.delay, d = d.duration), d && (d = ("number" == typeof d ? d : a.fx.speeds[d] || a.fx.speeds._default) / 1e3), g && (g = parseFloat(g) / 1e3), this.anim(c, d, e, f, g)
    }, a.fn.anim = function(d, e, o, p, q) {
        var r,
            u,
            v,
            w = {},
            x = "",
            y = this,
            z = a.fx.transitionEnd,
            A = !1;
        if (e === b && (e = a.fx.speeds._default / 1e3), q === b && (q = 0), a.fx.off && (e = 0), "string" == typeof d)
            w[k] = d, w[l] = e + "s", w[n] = q + "s", w[m] = o || "linear", z = a.fx.animationEnd;
        else {
            u = [];
            for (r in d)
                s.test(r) ? x += r + "(" + d[r] + ") " : (w[r] = d[r], u.push(c(r)));
            x && (w[f] = x, u.push(f)), e > 0 && "object" == typeof d && (w[g] = u.join(", "), w[h] = e + "s", w[j] = q + "s", w[i] = o || "linear")
        }
        return v = function(b) {
            if ("undefined" != typeof b) {
                if (b.target !== b.currentTarget)
                    return;
                a(b.target).unbind(z, v)
            } else
                a(this).unbind(z, v);
            A = !0, a(this).css(t), p && p.call(this)
        }, e > 0 && (this.bind(z, v), setTimeout(function() {
            A || v.call(y)
        }, 1e3 * e + 25)), this.size() && this.get(0).clientLeft, this.css(w), e <= 0 && setTimeout(function() {
            y.each(function() {
                v.call(this)
            })
        }, 0), this
    }, r = null
}(Zepto), function(a) {
    a.Callbacks = function(b) {
        b = a.extend({}, b);
        var c,
            d,
            e,
            f,
            g,
            h,
            i = [],
            j = !b.once && [],
            k = function(a) {
                for (c = b.memory && a, d = !0, h = f || 0, f = 0, g = i.length, e = !0; i && h < g; ++h)
                    if (i[h].apply(a[0], a[1]) === !1 && b.stopOnFalse) {
                        c = !1;
                        break
                    }
                e = !1, i && (j ? j.length && k(j.shift()) : c ? i.length = 0 : l.disable())
            },
            l = {
                add: function() {
                    if (i) {
                        var d = i.length,
                            h = function(c) {
                                a.each(c, function(a, c) {
                                    "function" == typeof c ? b.unique && l.has(c) || i.push(c) : c && c.length && "string" != typeof c && h(c)
                                })
                            };
                        h(arguments), e ? g = i.length : c && (f = d, k(c))
                    }
                    return this
                },
                remove: function() {
                    return i && a.each(arguments, function(b, c) {
                        for (var d; (d = a.inArray(c, i, d)) > -1;)
                            i.splice(d, 1), e && (d <= g && --g, d <= h && --h)
                    }), this
                },
                has: function(b) {
                    return !(!i || !(b ? a.inArray(b, i) > -1 : i.length))
                },
                empty: function() {
                    return g = i.length = 0, this
                },
                disable: function() {
                    return i = j = c = void 0, this
                },
                disabled: function() {
                    return !i
                },
                lock: function() {
                    return j = void 0, c || l.disable(), this
                },
                locked: function() {
                    return !j
                },
                fireWith: function(a, b) {
                    return !i || d && !j || (b = b || [], b = [a, b.slice ? b.slice() : b], e ? j.push(b) : k(b)), this
                },
                fire: function() {
                    return l.fireWith(this, arguments)
                },
                fired: function() {
                    return !!d
                }
            };
        return l
    }
}(Zepto), function(a) {
    "function" != typeof Object.create && (Object.create = function(a) {
        function b() {}
        return b.prototype = a, new b
    });
    var b = function(a, b) {
            var c = b || this;
            return a.bind ? a.bind(c) : function() {
                return a.apply(c, arguments)
            }
        },
        c = function(a, b) {
            var c;
            for (c in b)
                b.hasOwnProperty(c) && (a[c] = b[c])
        },
        d = {
            fn: {
                initialize: function() {}
            },
            create: function(a, b) {
                var c = Object.create(this);
                return c.fn = Object.create(this.fn), c.parent = this, a && this.implement.call(c, a), b && this.extend.call(c, b), c
            },
            instance: function() {
                var a = Object.create(this.fn);
                return a.parent = this, a.initialize.apply(a, arguments), a
            },
            extend: function(a) {
                var b = a.extended;
                return c(this, a), b && b.apply(this), this
            },
            implement: function(a) {
                var b = a.included;
                return c(this.fn, a), b && b.apply(this), this
            }
        };
    d.proxy = d.fn.proxy = b, a.Klass = d
}(this), function(a) {
    a.CookieUtil = {
        get: function(a) {
            var b = new RegExp("\\b" + a + "=([^;]*)\\b"),
                c = b.exec(document.cookie);
            return c ? decodeURIComponent(c[1]) : null
        },
        set: function(a, b) {
            var c = arguments,
                d = arguments.length,
                e = d > 2 ? c[2] : null,
                f = d > 3 ? c[3] : "/",
                g = d > 4 ? c[4] : null,
                h = d > 5 && c[5];
            document.cookie = a + "=" + encodeURIComponent(b) + (null === e ? "" : "; expires=" + e.toGMTString()) + (null === f ? "" : "; path=" + f) + (null === g ? "" : "; domain=" + g) + (h === !0 ? "; secure" : "")
        },
        remove: function(a, b, c) {
            this.get(a) && (b = b || "/", document.cookie = a + "=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=" + b + (c ? "; domain=" + c : ""))
        }
    }
}(window), function(a) {
    var b = a.Zepto || a.jQuery;
    a.Statistics = {
        base: "//zz.m.sohu.com/msohu_cv.gif/?",
        protocol: window.https_zz ? "https:" : "",
        https_zzWhiteList: ["zz.m.sohu.com"],
        https_beansWhiteList: ["s.go.sohu.com", "i.go.sohu.com"],
        params: function(a) {
            var b,
                c = {};
            if ("string" == typeof a)
                c._once_ = a, c._dc = +new Date;
            else {
                for (b in a)
                    c[b] = a[b];
                if (c.hasOwnProperty("_dc")) {
                    var d;
                    for (d = "_dc" + Math.random().toString().substring(2, 15); c.hasOwnProperty(d);)
                        ;
                    c[d] = +new Date
                } else
                    c._dc = +new Date
            }
            return this.appendParams(c)
        },
        appendParams: function(a) {
            var b,
                c = [];
            for (b in a)
                a.hasOwnProperty(b) && c.push(b + "=" + a[b]);
            return c.join("&")
        },
        isValidUrl: function(a) {
            return !!(/^http:\/\//.test(a) || /^https:\/\//.test(a) || /^\/\//.test(a))
        },
        inArray: function(a, b) {
            if (!b)
                return !1;
            for (var c = 0, d = b.length; c < d; c++)
                if (a === b[c])
                    return !0;
            return !1
        },
        resetBase: function(a) {
            return this.isValidUrl(a) && a.indexOf("//") !== -1 && (a = a.slice(a.indexOf("//"))), a
        },
        getHost: function(a) {
            var b = "",
                c = /\/\/([^\/]*).*/,
                d = this.resetBase(a),
                e = d.match(c);
            return "undefined" != typeof e && null != e && (b = e[1]), b
        },
        addStatistics: function(a, b) {
            var c;
            if (b) {
                var d = this.getHost(b);
                this.inArray(d, this.https_zzWhiteList) ? (b = this.resetBase(b), b = this.protocol + b) : this.inArray(d, this.https_beansWhiteList) && (b = a.apid && this.inArray(parseFloat(a.apid.split("_")[1]), window.https_beans) || window.https_go ? b.replace(/^(\/\/|http:\/\/)/, "https://") : b.replace(/^http:\/\//, "//"))
            } else
                b = this.protocol + this.base;
            b.indexOf("?") < 0 ? b += "?" : "?" !== b.slice(b.length - 1) && "&" !== b.slice(b.length - 1) && (b += "&"), c = new Image(1, 1), c.src = b + this.params(a)
        },
        addGlobalSupport: function() {
            function a(a) {
                var b,
                    d,
                    e;
                a.preventDefault(), a.stopPropagation(), b = a.target, d = b.parentNode, ((e = b.getAttribute("data-code")) || (e = d.getAttribute("data-code"))) && c.addStatistics(e)
            }
            var c = this;
            b("body").on("touchend", "[data-code]", a)
        }
    }, "function" == typeof define && (define.amd || seajs) ? define("Statistics", [], function() {
        return Statistics
    }) : "undefined" != typeof module && module.exports && (module.exports = Statistics)
}(this), function(a) {
    var b = a.navigator,
        c = b.userAgent,
        d = c.match(/(Android)[\s\/]*([\d\.]+)/i),
        e = c.match(/(iPad|iPhone|iPod)[\w\s]*;(?:[\w\s]+;)*[\w\s]+(?:iPad|iPhone|iPod)?\sOS\s([\d_\.]+)/i),
        f = c.match(/(Windows\s+Phone)(?:\sOS)?\s([\d\.]+)/i),
        g = /pad|XiaoMi\/MiPad|lepad|YOGA|MediaPad|GT-P|SM-T|GT-N5100|sch-i800|HUAWEI\s?[MTS]\d+-\w+|Nexus\s7|Nexus\s8|Nexus\s11|Kindle Fire HD|Tablet|tab/i,
        h = /WebKit\/[\d.]+/i.test(c),
        i = !!e && (b.standalone ? h : /Safari/i.test(c) && !/CriOS/i.test(c) && !/MQQBrowser/i.test(c) && !/baidubrowser/i.test(c)),
        j = {};
    d && (j.android = !0, j.version = d[2], j.android4 = /^4/.test(j.version), j.android3 = /^3/.test(j.version), j.android2 = /^2/.test(j.version), j.androidpad = g.test(c)), e && (j.ios = !0, j.version = e[2].replace(/_/g, "."), j["ios" + j.version.match(/^(\w+)/i)[1]] = !0, "iPad" === e[1] ? j.ipad = !0 : "iPhone" === e[1] ? j.iphone = !0 : "iPod" === e[1] && (j.ipod = !0)), f && (j.wp = !0, j.version = f[2], j.wp8 = /^8/.test(j.version), j.wp7 = /^7/.test(j.version), j.wppad = /Pad/i.test(j.version));
    var k = {
        os: j,
        isSmartDevice: function() {
            return !!(j.ios || j.android || j.wp)
        }(),
        isWebkit: h,
        isSafari: i,
        isBelowIos7: !!(j.ios && j.version.match(/^(\w+)/i)[1] < 7),
        isUC: /UC/i.test(c),
        isQQ: /QBrowser/i.test(c),
        isWeixin: /MicroMessenger/i.test(c),
        isSogouBrowser: /sogou/i.test(c),
        isBaiduboxapp: /baiduboxapp/i.test(c),
        isBaiduBrowser: /baidubrowser/i.test(c),
        isInstalled: this.isSafari || !this.isUC && !this.isQQ && !this.isWeixin && !this.isSogouBrowser && !this.isBaiduboxapp && !this.isBaiduBrowser,
        isHuawei: /huawei|honor/gi.test(c),
        isXiaomi: /HM|RedMi|Mi/gi.test(c),
        isOppo: /oppo/i.test(c),
        isVivo: /vivo/i.test(c),
        isSamsung: /SAMSUNG/i.test(c),
        isBaiduBrowser: /baidubrowser/i.test(c),
        isBaiduBoxApp: /baiduboxapp/i.test(c),
        isSogou: /sogoumobilebrowser/i.test(c),
        isSupportLocalStorage: function() {
            var b,
                c = "isSupportLocalStorage";
            try {
                b = a.localStorage
            } catch (a) {
                return b = null, console.log(a), !1
            }
            if (b)
                try {
                    return b.setItem(c, c), b.removeItem(c), !0
                } catch (a) {
                    return !1
                }
            return !1
        }()
    };
    "function" == typeof define && (define.amd || seajs) ? define("supporter", [], function() {
        return k
    }) : "undefined" != typeof module && module.exports && (module.exports = k), a.supporter = k
}(window), function(a, b) {
    var c = b.navigator.userAgent,
        d = c.toLocaleLowerCase().match(/vivo/i),
        e = /000014_baidu_zt/.test(location.href) || /000014_baidu_zt/.test(CookieUtil.get("_trans_")),
        f = b.supporter || {};
    b.GoTop = Klass.create({
        template: '<div data-code="000027_back2top"><img src="//s1.rr.itc.cn/w/u/0/27.png" width="100%" height="100%" /></div>',
        vivo_toHomeIconTemplate: '<div class="toHomeBtn toHomeIcon"><a class="hsfzdj_vivo" href="//m.sohu.com/?_once_=000025_hsfzdj_vivo"></a></div>',
        baidu_toHomeIconTemplate: '<div class="toHomeBtn toHomeIcon"><a class="hsfzdj_bd" href="//m.sohu.com/?_once_=000025_hsfzdj_bd"></a></div>',
        toHomeIconTemplate: '<div class="toHomeBtn toHomeIconAllpage"><a class="hsfzdj" href="//m.sohu.com/?_once_=000025_hsfzdj"></a></div>',
        templateStyle: {
            "z-index": "999",
            display: "none"
        },
        initialize: function(b) {
            if (this.template = b.template || this.template, this.vivo_toHomeIconTemplate = b.vivo_toHomeIconTemplate || this.vivo_toHomeIconTemplate, this.baidu_toHomeIconTemplate = b.baidu_toHomeIconTemplate || this.baidu_toHomeIconTemplate, this.toHomeIconTemplate = b.toHomeIconTemplate || this.toHomeIconTemplate, this.toHomeParentDom = b.toHomeParentDom || a(".finCnls"), b.templateStyle)
                for (var c in b.templateStyle)
                    b.templateStyle.hasOwnProperty(c) && (this.templateStyle[c] = b.templateStyle[c]);
            d ? (this.toHome = a(this.vivo_toHomeIconTemplate).css(this.templateStyle), this.toHomeParentDom.append(this.toHome)) : e ? (this.toHome = a(this.baidu_toHomeIconTemplate).css(this.templateStyle), /000141_ss_baidu_qq/i.test(window.location.href) || this.toHomeParentDom.append(this.toHome)) : (this.toHome = a(this.toHomeIconTemplate).css(this.templateStyle), this.toHomeParentDom.append(this.toHome)), this.el = a(this.template).css({
                "z-index": "999",
                display: "none"
            }).addClass("back-to-top"), a("body").append(this.el), this.el.on("touchend", this.doScrollToTop), f.isSupportLocalStorage && a("body").on("click", ".toHomeBtn a", this.doGotohome), this.isSupport = this.isSupportFixed(), this.el.css("position", this.isSupport ? "fixed" : "absolute"), a(window).on("scroll", a.proxy(this.onWindowScroll, this))
        },
        isSupportFixed: function() {
            var a,
                b,
                d = c.match(/(iPad|iPhone|iPod)\s+OS\s([\d_\.]+)/),
                e = d && d[2] && parseInt(d[2].replace(/_/g, "."), 10) < 5,
                f = /Opera Mini/i.test(c),
                g = document.body;
            return a = document.createElement("div"), a.style.cssText = "display:none;position:fixed;z-index:100;", g.appendChild(a), b = "fixed" == window.getComputedStyle(a).position, g.removeChild(a), a = null, b && !e && !f
        },
        onWindowScroll: function() {
            var a,
                b;
            a = this.el, b = this.el[0].style.display, window.pageYOffset > window.innerHeight ? (this.isSupport || a.css("top", window.pageYOffset + window.innerHeight - 35 - a.height() + "px"), "none" === b && (a.css({
                display: "",
                opacity: "0"
            }), a.animate({
                opacity: 1
            }, 400, "ease-in"), Statistics.addStatistics("000025_hsfzbg"))) : "none" !== b && a.animate({
                opacity: 0
            }, 400, "ease-out", function() {
                a.hide()
            })
        },
        doScrollToTop: function(a) {
            a.preventDefault(), a.stopPropagation();
            var b = this.getAttribute("data-code");
            b && Statistics.addStatistics(b), window.scrollTo(0, 1)
        },
        doGotohome: function(a) {
            a.preventDefault();
            var b = document.createElement("a");
            b.href = document.referrer;
            var c = b.pathname,
                d = b.hostname,
                e = (new Date).getTime(),
                f = window.localStorage.getItem("msohu/toHome/back_timer") || e;
            f > e - 3e5 && /^([tdg][1-9]\.)?m\.sohu\.com$/i.test(d) && ("" === c || "/" === c) ? ("hsfzdj_vivo" === this.className ? Statistics.addStatistics("000025_hsfzdj_vivo") : "hsfzdj_bd" === this.className ? Statistics.addStatistics("000025_hsfzdj_bd") : Statistics.addStatistics("000025_hsfzdj"), setTimeout(function() {
                window.history.back()
            }, 100)) : "hsfzdj_vivo" === this.className ? window.location.href = "//m.sohu.com/?_once_=000025_hsfzdj_vivo" : "hsfzdj_bd" === this.className ? window.location.href = "//m.sohu.com/?_once_=000025_hsfzdj_bd" : window.location.href = "//m.sohu.com/?_once_=000025_hsfzdj", window.localStorage.setItem("msohu/toHome/back_timer", e), b = null
        }
    })
}(Zepto, this), function(a) {
    var b = /Android/i.test(a.navigator.userAgent),
        c = document.createElement("div").style,
        d = function() {
            for (var a, b = "t,webkitT,MozT,msT,OT".split(","), d = 0, e = b.length; d < e; d++)
                if (a = b[d] + "ransform", a in c)
                    return b[d].substr(0, b[d].length - 1);
            return !1
        }(),
        e = function() {
            return "webkit" == d || "O" === d ? d.toLowerCase() + "TransitionEnd" : "transitionend"
        }(),
        f = function(a, b, c) {
            var d = this,
                f = function() {
                    a.transitionTimer && clearTimeout(a.transitionTimer), a.transitionTimer = null, a.removeEventListener(e, g, !1)
                },
                g = function() {
                    f(), c && c.call(d)
                };
            f(), a.addEventListener(e, g, !1), a.transitionTimer = setTimeout(g, b + 100)
        },
        g = function(a, b) {
            return function() {
                return a.apply(b, arguments)
            }
        },
        h = function(c) {
            c = c || {};
            for (var d in c)
                this[d] = c[d];
            this.ct = document.body, this._onScroll_ = g(this._onScroll, this), a.addEventListener("scroll", this._onScroll_, !1), this.maxScrollY = 0, b && (this.useFade = !1), this.elements = [], this.lazyElements = {}, this.scan(this.ct), this._onPageShow_ = g(this._onPageShow, this), a.addEventListener("pageshow", this._onPageShow_, !1)
        };
    h.prototype = {
        range: 200,
        realSrcAttribute: "data-src",
        useFade: !0,
        _onPageShow: function(a) {
            a.persisted && (this.maxScrollY = 0, this.scan(this.ct))
        },
        _onScroll: function() {
            var a = this.getScrollY();
            a > this.maxScrollY && (this.maxScrollY = a, this._scrollAction())
        },
        getScrollY: function() {
            return a.pageYOffset || a.scrollY
        },
        _scrollAction: function() {
            clearTimeout(this.lazyLoadTimeout), this.elements = this.elements.filter(function(b) {
                if (this.range + a.innerHeight >= b.getBoundingClientRect().top - document.documentElement.clientTop) {
                    var c = b.getAttribute(this.realSrcAttribute);
                    return c && (this.lazyElements[c] ? this.lazyElements[c].push(b) : this.lazyElements[c] = [b]), !1
                }
                return !0
            }, this), this.lazyLoadTimeout = setTimeout(g(this._loadImage, this), b ? 500 : 0)
        },
        _loadImage: function() {
            var a,
                b,
                c;
            for (b in this.lazyElements)
                c = this.lazyElements[b], a = c.shift(), 0 === c.length && delete this.lazyElements[b], a.addEventListener("load", g(this._onImageLoad, this), !1), a.addEventListener("error", g(this._onImageError, this), !1), a.src != b ? this._setImageSrc(a, b) : this._onImageLoad(a)
        },
        _onImageLoad: function(a) {
            var b = this,
                c = a.target || a,
                d = c.getAttribute(b.realSrcAttribute),
                e = b.lazyElements[d];
            b._showImage(c), this.successCallBack && this.successCallBack(a), e && (e.forEach(function(a) {
                b._setImageSrc(a, d), b._showImage(a)
            }), delete b.lazyElements[d])
        },
        _onImageError: function(a) {
            this.errorCallBack && this.errorCallBack(a)
        },
        _setImageSrc: function(a, b) {
            this.useFade && (a.style.opacity = "0"), a.src = b
        },
        _showImage: function(a) {
            var b = this,
                c = function() {
                    a.setAttribute("data-lazy-load-completed", "1"), b.onImageLoad && b.onImageLoad(a)
                };
            b.useFade ? (a.style[d + "Transition"] = "opacity 200ms", a.style.opacity = 1, f(a, 200, c)) : c()
        },
        scan: function(a) {
            var b;
            a = a || document.body, b = a.querySelectorAll("img[" + this.realSrcAttribute + "]") || [], b = Array.prototype.slice.call(b, 0), b = b.filter(function(a) {
                return this.elements.indexOf(a) == -1 && "1" != a.getAttribute("data-lazy-load-completed")
            }, this), this.elements = this.elements.concat(b), this._scrollAction()
        },
        destroy: function() {
            this.destroyed || (this.destroyed = !0, a.removeEventListener("scroll", this._onScroll_, !1), a.removeEventListener("pageshow", this._onPageShow_, !1), this.elements = this.lazyElements = null)
        }
    }, c = null, a.ImageLazyLoader = h
}(window), function(a) {
    var b = a.navigator,
        c = b.userAgent,
        d = /Android/i.test(b.userAgent),
        e = c.match(/(iPad|iPhone|iPod)[\w\s]*;(?:[\w\s]+;)*[\w\s]+(?:iPad|iPhone|iPod)?\sOS\s([\d_\.]+)/i),
        f = (/QBrowser/i.test(c), /MI\s\d/i.test(c), /Sogou/i.test(c)),
        g = /LT18i/i.test(c),
        h = /WebKit\/[\d.]+/i.test(c),
        i = !!e && (b.standalone ? h : /Safari/i.test(c) && !/CriOS/i.test(c) && !/MQQBrowser/i.test(c)),
        j = b.msPointerEnabled,
        k = {
            start: j ? "MSPointerDown" : "touchstart",
            move: j ? "MSPointerMove" : "touchmove",
            end: j ? "MSPointerUp" : "touchend"
        },
        l = Array.prototype.slice,
        m = document.createElement("div").style,
        n = function() {
            for (var a, b = "t,webkitT,MozT,msT,OT".split(","), c = 0, d = b.length; c < d; c++)
                if (a = b[c] + "ransform", a in m)
                    return b[c].substr(0, b[c].length - 1);
            return !1
        }(),
        o = (n ? "-" + n.toLowerCase() + "-" : "", function(a) {
            return "" === n ? a : (a = a.charAt(0).toUpperCase() + a.substr(1), n + a)
        }),
        p = o("transform"),
        q = o("transitionDuration"),
        r = function() {
            return "webkit" == n || "O" === n ? n.toLowerCase() + "TransitionEnd" : "transitionend"
        }(),
        s = function() {},
        t = function(a, b) {
            var c,
                d,
                e,
                f;
            if (c = (b || "").match(/\S+/g) || [], d = 1 === a.nodeType && (a.className ? (" " + a.className + " ").replace(/[\t\r\n]/g, " ") : " ")) {
                for (f = 0; e = c[f++];)
                    d.indexOf(" " + e + " ") < 0 && (d += e + " ");
                a.className = d.trim()
            }
        },
        u = function(a, b) {
            var c,
                d,
                e,
                f;
            if (c = (b || "").match(/\S+/g) || [], d = 1 === a.nodeType && (a.className ? (" " + a.className + " ").replace(/[\t\r\n]/g, " ") : " ")) {
                for (f = 0; e = c[f++];)
                    for (; d.indexOf(" " + e + " ") >= 0;)
                        d = d.replace(" " + e + " ", " ");
                a.className = d.trim()
            }
        },
        v = function(a, b, c) {
            var d = this,
                e = function() {
                    a.transitionTimer && clearTimeout(a.transitionTimer), a.transitionTimer = null, a.removeEventListener(r, f, !1)
                },
                f = function() {
                    e(), c && c.call(d)
                };
            e(), a.addEventListener(r, f, !1), a.transitionTimer = setTimeout(f, b + 100)
        },
        w = function(b, c) {
            return function() {
                clearTimeout(b.orientationChangedTimer);
                var d = l.call(arguments, 0),
                    e = a.navigator,
                    f = e.userAgent,
                    g = /Android/i.test(e.userAgent),
                    h = f.match(/(iPad|iPhone|iPod)[\w\s]*;(?:[\w\s]+;)*[\w\s]+(?:iPad|iPhone|iPod)?\sOS\s([\d_\.]+)/i),
                    i = /QBrowser/i.test(f),
                    j = /MI\s\d/i.test(f),
                    k = /Sogou/i.test(f),
                    m = /LT18i/i.test(f),
                    n = /WebKit\/[\d.]+/i.test(f),
                    o = (!!h && (e.standalone ? n : /Safari/i.test(f) && !/CriOS/i.test(f) && !/MQQBrowser/i.test(f)), g ? j || m || k ? 1e3 : 400 : h && i ? 400 : 0);
                b.orientationChangedTimer = setTimeout(function() {
                    b.apply(c, d)
                }, o)
            }
        },
        x = function(b) {
            g && f ? a.addEventListener("resize", b, !1) : e && !i ? (a.addEventListener("orientationchange", b, !1), a.addEventListener("resize", b, !1)) : a.addEventListener("onorientationchange" in a ? "orientationchange" : "resize", b, !1)
        },
        y = function(a) {
            a = a || {};
            for (var b in a)
                this[b] = a[b];
            this.el = "string" == typeof this.targetSelector ? document.querySelector(this.targetSelector) : this.targetSelector, j && (this.el.style.msTouchAction = "pan-y"), this.el.style.overflow = "hidden", this.wrap = this.wrapSelector ? this.el.querySelector(this.wrapSelector) : this.el.children[0], this.items = l.call(this.wrap.children, 0), this.items.forEach(function(a, b) {
                a.setAttribute("data-index", b), a.style.display = "block"
            }), this.prevSelector && (this.prevEl = "string" == typeof this.prevSelector ? document.querySelector(this.prevSelector) : this.prevSelector, this.prevEl.addEventListener("click", this, !1)), this.nextSelector && (this.nextEl = "string" == typeof this.nextSelector ? document.querySelector(this.nextSelector) : this.nextSelector, this.nextEl.addEventListener("click", this, !1)), this.indicatorSelector && (this.indicators = "string" == typeof this.indicatorSelector ? document.querySelectorAll(this.indicatorSelector) : this.indicatorSelector, this.indicators = l.call(this.indicators, 0)), this._resetInitPosition = w(function() {
                this.setInitPosition.call(this)
            }, this), x(this._resetInitPosition), this.el.addEventListener(k.start, this, !1), this.setInitPosition(), this.to(this.activeIndex, !0), this.running = !1, this.autoPlay && this.start()
        };
    y.prototype = {
        activeIndex: 0,
        autoPlay: !0,
        interval: 3e3,
        duration: 300,
        beforeSlide: s,
        onSlide: s,
        getItemWidth: function() {
            return this.wrap.getBoundingClientRect().width || this.wrap.offsetWidth
        },
        getLastIndex: function() {
            return this.items.length - 1
        },
        getContext: function(a) {
            var b,
                c,
                d = this.getLastIndex();
            return "undefined" == typeof a && (a = this.activeIndex), b = a - 1, c = a + 1, b < 0 && (b = d), c > d && (c = 0), {
                prev: b,
                next: c,
                active: a
            }
        },
        setInitPosition: function() {
            var a,
                b,
                c = this,
                d = c.getItemWidth(),
                e = this.items,
                f = e.length,
                g = c.activeIndex,
                h = 0 === g ? f - 1 : g - 1;
            for (c.stop(), a = f - 1; a >= 0; a--)
                e[a].style.left = -d * a + "px";
            for (c._move(h, 0, -d), c._move(g, 0, 0), b = 0; b < f; b++)
                b !== g && b !== h && c._move(b, 0, d);
            c.start()
        },
        start: function() {
            this.running || (this.running = !0, this.clear(), this.run())
        },
        stop: function() {
            this.running = !1, this.clear()
        },
        clear: function() {
            clearTimeout(this.slideTimer), this.slideTimer = null
        },
        run: function() {
            var a = this;
            a.slideTimer || (a.slideTimer = setInterval(function() {
                a.to(a.getContext().next)
            }, a.interval))
        },
        prev: function() {
            this.to(this.activeIndex - 1)
        },
        next: function() {
            this.to(this.activeIndex + 1)
        },
        onPrevClick: function(a) {
            a && a.preventDefault(), this.clear(), this.prev(), this.autoPlay && this.run()
        },
        onNextClick: function(a) {
            a && a.preventDefault(), this.clear(), this.next(), this.autoPlay && this.run()
        },
        to: function(a, b, c) {
            var d = this.activeIndex,
                e = this.getLastIndex();
            a >= 0 && a <= e && a != d && this.beforeSlide(a) !== !1 ? this.slide(a, b, c) : a === e + 1 ? this.slide(0, b, c) : a === -1 ? this.slide(e, b, c) : this.slide(d, b, c)
        },
        slide: function(a, b, c) {
            var d = this,
                e = d.activeIndex,
                f = e,
                g = function() {
                    d.wrap.removeEventListener(r, g, !1), d.indicators && d.indicatorCls && (d.indicators[f] && u(d.indicators[f], d.indicatorCls), d.indicators[d.activeIndex] && t(d.indicators[d.activeIndex], d.indicatorCls))
                };
            b || v(d.wrap, d.duration, g), d._slipNext(a, b, c), d.onSlide(d.activeIndex), b && g()
        },
        _move: function(a, b, c) {
            var d = this,
                e = this.items,
                f = d.getLastIndex();
            a < 0 || a > f || (e[a].style[q] = b + "ms", e[a].style[p] = "translate3d(" + c + "px, 0px, 0px)")
        },
        _slipNext: function(a, b, c) {
            var d = this,
                e = d.activeIndex,
                f = d.getItemWidth(),
                g = d.getLastIndex(),
                h = a,
                i = this.items,
                j = i.length,
                k = 0 === h ? j - 1 : h - 1,
                l = h,
                m = h < j - 1 ? h + 1 : 0,
                n = b ? 0 : d.duration;
            a > e && e !== g && 0 !== e || 0 === e && 1 === a || 0 === a && e === g || a === e && !c ? (d._move(k, n, -f), d._move(l, n, 0), d._move(m, 0, f)) : (d._move(k, 0, -f), d._move(l, n, 0), d._move(m, n, f)), d.activeIndex = a
        },
        _slipDistance: function(a, b) {
            var c = this,
                d = this.items,
                e = d.length,
                f = c.getItemWidth(),
                g = 0 === a ? e - 1 : a - 1,
                h = a,
                i = a < e - 1 ? a + 1 : 0;
            d[g].style[q] = "0ms", d[h].style[q] = "0ms", d[i].style[q] = "0ms", d[g].style[p] = "translate3d(" + (-f - b) + "px, 0px, 0px)", d[h].style[p] = "translate3d(" + -b + "px, 0px, 0px)", d[i].style[p] = "translate3d(" + (f - b) + "px, 0px, 0px)"
        },
        onTouchStart: function(a) {
            var b = this;
            if (!(b.prevEl && b.prevEl.contains && b.prevEl.contains(a.target) || b.nextEl && b.nextEl.contains && b.nextEl.contains(a.target))) {
                clearTimeout(b.androidTouchMoveTimeout), b.clear(), d && (b.androidTouchMoveTimeout = setTimeout(function() {
                    b.resetStatus()
                }, 3e3)), b.el.removeEventListener(k.move, b, !1), b.el.removeEventListener(k.end, b, !1), b.el.addEventListener(k.move, b, !1), b.el.addEventListener(k.end, b, !1), delete b.horizontal;
                var c = j ? a.clientX : a.touches[0].clientX,
                    e = j ? a.clientY : a.touches[0].clientY;
                b.touchCoords = {}, b.touchCoords.startX = c, b.touchCoords.startY = e, b.touchCoords.timeStamp = a.timeStamp
            }
        },
        onTouchMove: function(a) {
            var b = this;
            if (clearTimeout(b.touchMoveTimeout), j && (b.touchMoveTimeout = setTimeout(function() {
                b.resetStatus()
            }, 3e3)), b.touchCoords) {
                b.touchCoords.stopX = j ? a.clientX : a.touches[0].clientX, b.touchCoords.stopY = j ? a.clientY : a.touches[0].clientY;
                var c = b.touchCoords.startX - b.touchCoords.stopX,
                    d = Math.abs(c),
                    e = Math.abs(b.touchCoords.startY - b.touchCoords.stopY);
                if ("undefined" != typeof b.horizontal)
                    0 !== c && a.preventDefault();
                else {
                    if (!(d > e))
                        return delete b.touchCoords, void (b.horizontal = !1);
                    b.horizontal = !0, 0 !== c && a.preventDefault(), b.iscroll && b.iscroll.enabled && b.iscroll.disable(), clearTimeout(b.androidTouchMoveTimeout)
                }
                var f = b.getItemWidth(),
                    g = (b.activeIndex * f, b.activeIndex);
                b.getLastIndex();
                d < f && b._slipDistance(g, c)
            }
        },
        onTouchEnd: function(a) {
            if (clearTimeout(this.androidTouchMoveTimeout), clearTimeout(this.touchMoveTimeout), this.el.removeEventListener(k.move, this, !1), this.el.removeEventListener(k.end, this, !1), this.touchCoords) {
                var b,
                    c = this.getItemWidth(),
                    d = Math.abs(this.touchCoords.startX - this.touchCoords.stopX),
                    e = this.touchCoords.startX > this.touchCoords.stopX,
                    f = this.activeIndex;
                isNaN(d) || 0 === d || (d > c && (d = c), b = d >= 80 || a.timeStamp - this.touchCoords.timeStamp < 200 ? this.touchCoords.startX > this.touchCoords.stopX ? f + 1 : f - 1 : f, this.to(b, !1, e), delete this.touchCoords)
            }
            this.resetStatus()
        },
        resetStatus: function() {
            this.iscroll && this.iscroll.enable(), this.autoPlay && this.run()
        },
        refresh: function() {
            var a = this.getLastIndex();
            this.items = l.call(this.wrap.children, 0), this.activeIndex > a && this.to(a, !0)
        },
        handleEvent: function(a) {
            switch (a.type) {
            case k.start:
                this.onTouchStart(a);
                break;
            case k.move:
                this.onTouchMove(a);
                break;
            case k.end:
                this.onTouchEnd(a);
                break;
            case "click":
                a.currentTarget == this.prevEl ? this.onPrevClick(a) : a.currentTarget == this.nextEl && this.onNextClick(a)
            }
        },
        destroy: function() {
            this.destroyed = !0, this.stop(), this.prevEl && (this.prevEl.removeEventListener("click", this, !1), this.prevEl = null), this.nextEl && (this.nextEl.removeEventListener("click", this, !1), this.nextEl = null), this.indicators = null, this.el.removeEventListener(k.start, this, !1), this.el.removeEventListener(k.move, this, !1), this.el.removeEventListener(k.end, this, !1), a.removeEventListener("orientationchange", this._resetInitPosition, !1), a.removeEventListener("resize", this._resetInitPosition, !1), this.el = this.wrap = this.items = null, this.iscroll = null
        }
    }, m = null, "function" == typeof define && (define.amd || seajs) && define("slidewidget", [], function() {
        return y
    }), a.Slide = y
}(window);
var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(a) {
        var b,
            c,
            d,
            e,
            f,
            g,
            h,
            i = "",
            j = 0;
        for (a = Base64._utf8_encode(a); j < a.length;)
            b = a.charCodeAt(j++), c = a.charCodeAt(j++), d = a.charCodeAt(j++), e = b >> 2, f = (3 & b) << 4 | c >> 4, g = (15 & c) << 2 | d >> 6, h = 63 & d, isNaN(c) ? g = h = 64 : isNaN(d) && (h = 64), i = i + this._keyStr.charAt(e) + this._keyStr.charAt(f) + this._keyStr.charAt(g) + this._keyStr.charAt(h);
        return i
    },
    decode: function(a) {
        var b,
            c,
            d,
            e,
            f,
            g,
            h,
            i = "",
            j = 0;
        for (a = a.replace(/[^A-Za-z0-9\+\/\=]/g, ""); j < a.length;)
            e = this._keyStr.indexOf(a.charAt(j++)), f = this._keyStr.indexOf(a.charAt(j++)), g = this._keyStr.indexOf(a.charAt(j++)), h = this._keyStr.indexOf(a.charAt(j++)), b = e << 2 | f >> 4, c = (15 & f) << 4 | g >> 2, d = (3 & g) << 6 | h, i += String.fromCharCode(b), 64 != g && (i += String.fromCharCode(c)), 64 != h && (i += String.fromCharCode(d));
        return i = Base64._utf8_decode(i)
    },
    _utf8_encode: function(a) {
        a = a.replace(/\r\n/g, "\n");
        for (var b = "", c = 0; c < a.length; c++) {
            var d = a.charCodeAt(c);
            d < 128 ? b += String.fromCharCode(d) : d > 127 && d < 2048 ? (b += String.fromCharCode(d >> 6 | 192), b += String.fromCharCode(63 & d | 128)) : (b += String.fromCharCode(d >> 12 | 224), b += String.fromCharCode(d >> 6 & 63 | 128), b += String.fromCharCode(63 & d | 128))
        }
        return b
    },
    _utf8_decode: function(a) {
        for (var b = "", c = 0, d = c1 = c2 = 0; c < a.length;)
            d = a.charCodeAt(c), d < 128 ? (b += String.fromCharCode(d), c++) : d > 191 && d < 224 ? (c2 = a.charCodeAt(c + 1), b += String.fromCharCode((31 & d) << 6 | 63 & c2), c += 2) : (c2 = a.charCodeAt(c + 1), c3 = a.charCodeAt(c + 2), b += String.fromCharCode((15 & d) << 12 | (63 & c2) << 6 | 63 & c3), c += 3);
        return b
    }
};
!function() {
    function a(a, b) {
        a = a || [], b = b || "original";
        var c,
            d = a.length,
            e = /\.webp$/i,
            f = /\.(jpg|jpeg|png|gif)$/i,
            g = null,
            h = "";
        for (c = d - 1; c >= 0; c--)
            a[c].hasAttribute(b) && (g = a[c], h = g.getAttribute(b) || "", h.match(e) || g.setAttribute(b, h.replace(f, ".webp")))
    }
    function b(a) {
        var b,
            c,
            d = function() {
                var a = "000188_imageerror_",
                    b = /\.webp$/gi,
                    c = this ? this.getAttribute("src") : "",
                    d = "";
                d = a + (b.test(c) ? "webp" : "jpg"), Statistics.addStatistics(d)
            },
            e = Object.prototype.toString.call(a);
        if ("[object Array]" === e || "[object NodeList]" === e)
            for (b = 0,
            c = a.length; b < c; b++)
                a[b].onerror = d
    }
    var c = function(a) {
            var b = a.success,
                c = a.error,
                d = a.feature,
                e = {
                    lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
                    lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
                    alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
                    animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
                },
                f = function(a) {
                    return "function" == typeof a
                };
            d = e[d] ? d : "lossy";
            var g = new Image;
            g.onload = function() {
                g.width > 0 && g.height > 0;
                f(b) && b()
            }, g.onerror = function() {
                f(c) && c()
            }, g.src = "data:image/webp;base64," + e[d]
        },
        d = {
            isSupportWebP: c,
            setPicToWebP: a,
            imgItemsAddErrorCallback: b
        };
    "function" == typeof define && (define.amd || seajs) ? define("WEBP", [], function() {
        return d
    }) : "undefined" != typeof module && module.exports && (module.exports = d), window.WEBP = d
}(), function(a) {
    var b = window.CookieUtil,
        c = window.supporter,
        d = window.Statistics,
        e = c.isSupportLocalStorage,
        f = {
            key: "_smuid",
            init: function(a) {
                var c,
                    f,
                    g,
                    h,
                    i,
                    j = "000192_ls_smuid_other";
                f = b.get(this.key), e && (g = window.localStorage, c = g.getItem(this.key), i = a && a.isUpdateCookie, !c && f ? g.setItem(this.key, f) : c && f !== c && (i && (h = new Date, h.setTime(h.getTime() + 31536e7), b.set(this.key, c, h, "/", ".sohu.com"), j = "000192_ls_smuid_home"), d.addStatistics(j)))
            }
        };
    a.SmuidLocalStore = f, "function" == typeof define && (define.amd || seajs) ? define("SmuidLocalStore", [], function() {
        return f
    }) : "undefined" != typeof module && module.exports && (module.exports = f)
}(window), function(a) {
    var b,
        c,
        d = a.MSOHU || (a.MSOHU = {}),
        e = a.Statistics;
    b = function(a) {
        this.srcAttr = a.srcAttr, this.indexAttr = a.indexAttr, this.chkData = a.chkData || {}, this.notFoundCode = a.notFoundCode || "000196_404", this.errorCode = a.errorCode || "000196_neterror"
    }, c = b.prototype, c._proxy = function(a, b) {
        return function() {
            return a.apply(b, arguments)
        }
    }, c.listenImgLoad = function(a, b) {
        var c,
            d,
            e = a.ele || [],
            f = e.length,
            g = a.successCallBack || this._notFoundCallBack,
            h = a.errorCallBack || this._errorCallBack,
            i = this.chkData;
        if (e && "function" == typeof g && "function" == typeof h)
            if (!f && this._isImg(e))
                d = e.getAttribute(this.indexAttr) || 1, b && b.index && (d = b.index), c = e.getAttribute(i.attr), c === i.success ? this._proxy(g, this)({
                    target: e
                }, d, [e], this) : c === i.fail ? this._proxy(h, this)({
                    target: e
                }, d, [e], this) : (e.addEventListener("load", this._handleLoad(g, d, [e]), !1), e.addEventListener("error", this._handleLoad(h, d, [e]), !1));
            else if (f && this._isImg(e))
                for (d = 0; d < f; d++)
                    !function(a, b) {
                        var c,
                            d = e[a].getAttribute(b.indexAttr) || a + 1,
                            f = b.chkData;
                        c = e[a].getAttribute(f.attr), c === f.success ? b._proxy(g, b)({
                            target: e[a]
                        }, d, e, b) : c === f.fail ? b._proxy(h, b)({
                            target: e[a]
                        }, d, e, b) : (e[a].addEventListener("load", b._handleLoad(g, d, e), !1), e[a].addEventListener("error", b._handleLoad(h, d, e), !1))
                    }(d, this)
    }, c._handleLoad = function(a, b, c) {
        var d = this;
        return function(e) {
            d._proxy(a, this)(e, b, c, d)
        }
    }, c._isImg = function(a) {
        var b,
            a = a || "",
            c = a.length;
        for (c || (a = [a], c = a.length), b = 0; b < c; b++)
            if (!a[b] || !a[b].nodeName || "img" !== a[b].nodeName.toLowerCase() || 1 !== a[b].nodeType)
                return !1;
        return !0
    }, c._is404DefaultPic = function(a) {
        var b = this.chkData,
            c = a.getAttribute(b.attr);
        return (c === b.success || !a.getAttribute(this.srcAttr) || a.getAttribute("src") == a.getAttribute(this.srcAttr)) && (!!a && 1 === a.naturalWidth && 1 === a.naturalHeight)
    }, c._notFoundCallBack = function(a, b, c, d) {
        var f = a.target,
            g = {};
        b = b || 1, b && d._is404DefaultPic(f) && (g = d._makeStatisticParams(f, {
            _once_: d.notFoundCode,
            index: b
        }), d._isAddStatistic(f) && g && e.addStatistics(g))
    }, c._errorCallBack = function(a, b, c, d) {
        var f = a.target;
        d._isAddStatistic(f) && e.addStatistics(d.errorCode)
    }, c._isAddStatistic = function(a) {
        var b = a.getAttribute(this.srcAttr) || a.getAttribute("src"),
            c = /.*(s[1-9]\.rr\.itc\.cn).*/gm;
        return !!c.test(b)
    }, c._makeStatisticParams = function(a, b) {
        var c,
            d,
            e,
            f = window.location.href,
            g = a.getAttribute(this.srcAttr) || a.getAttribute("src"),
            h = g.match(/.*s[1-9]\.rr\.itc\.cn(\S+)/),
            i = f.match(/.sohu\.com\/(n|p)\/(\d+)\/.*/);
        return b._once_ && b.index ? (h && h.length > 1 && (c = h[1]), i && i.length > 1 && (e = i[1], d = i[2]), {
            _once_: b._once_,
            index: b.index,
            path: c,
            etype: e,
            eid: d
        }) : ""
    }, d.ImgStatistic = b, "function" == typeof define && (define.amd || seajs) ? define("ImgStatistic", [], function() {
        return b
    }) : "undefined" != typeof module && module.exports && (module.exports = b)
}(this), function() {
    function a(a) {
        this.url = a.url || "", this.data = a.data || {}, this.success = a.success || e, this.error = a.error || e, this.timeout = a.timeout ? a.timeout : a.error || e, this.time = a.time || 3e3, this.callbackName = "", this.init()
    }
    function b(a) {
        var b = a.parentNode;
        a && 11 !== b.nodeType && b.removeChild(a)
    }
    function c(a) {
        var b,
            c = [];
        if ("object" == typeof a && a && a !== {}) {
            for (b in a)
                a.hasOwnProperty(b) && c.push(b + "=" + a[b]);
            return c.join("&")
        }
        if (a === {} || null === a)
            return ""
    }
    var d = window.document,
        e = function() {};
    a.prototype = {
        init: function() {
            this.setParams(), this.createJsonp()
        },
        setParams: function() {
            this.url = this.url + (this.url.indexOf("?") === -1 ? "?" : "&") + c(this.data) + "&_time_=" + 1 * new Date, /callback=(\w+)/.test(this.url) ? this.callbackName = RegExp.$1 : /callback=/.test(this.url) ? (this.callbackName = "jsonp_" + 1 * new Date + "_" + Math.random().toString().substring(2, 15), this.url.replace("callback=?", "callback=" + this.callbackName), this.url.replace("callback=%3F", "callback=" + this.callbackName)) : (this.callbackName = "jsonp_" + 1 * new Date + "_" + Math.random().toString().substring(2, 15), this.url += "&callback=" + this.callbackName)
        },
        createJsonp: function() {
            var a = this,
                b = d.getElementsByTagName("head"),
                c = this.createScriptTag(),
                e = a.callbackName,
                f = "#id_" + e;
            b && b[0] && b[0].appendChild(c), a.timeout && (a.outTimer = setTimeout(function() {
                window[e] = null, b && b[0] && b[0].querySelector(f) && (b[0].removeChild(b[0].querySelector(f)), a.timeout())
            }, a.time))
        },
        createScriptTag: function() {
            var a = this,
                b = d.createElement("script"),
                c = a.callbackName;
            return b.src = a.url, b.id = "id_" + a.callbackName, window[c] = function(b) {
                window[c] = null;
                var e = d.getElementById("id_" + a.callbackName);
                a.removeScriptTag(e), a.success(b), a.timeout && clearTimeout(a.outTimer)
            }, b.onerror = function() {
                a.timeout && clearTimeout(a.outTimer), a.error()
            }, b
        },
        removeScriptTag: function(a) {
            b(a)
        }
    }, "function" == typeof define && (define.amd || seajs) ? define("Jsonp", [], function() {
        return a
    }) : "undefined" != typeof module && module.exports && (module.exports = a), window.Jsonp = a
}(window), function(a) {
    function b(a) {
        this.timeStart = 0, this.timeEnd = 0, this.loadTime = 0, this.options = a || {}, this.extraObj = {}, this.init()
    }
    var c = window.Jsonp;
    b.prototype.init = function() {
        "function" == typeof c && (this.timeStart = (new Date).getTime(), this._loadCallback(), new c(this.options))
    }, b.prototype._loadCallback = function() {
        var a = this,
            b = this.options.success,
            c = this.options.error,
            d = this.options.timeout;
        b && (this.options.success = function(c) {
            a.timeEnd = (new Date).getTime(), a.loadTime = a.timeEnd - a.timeStart, a.extraObj.loadTime = a.loadTime, b(c, a.extraObj)
        }), c && (this.options.error = function() {
            a.timeEnd = (new Date).getTime(), a.loadTime = a.timeEnd - a.timeStart, a.extraObj.loadTime = a.loadTime, c(a.extraObj)
        }), d && (this.options.timeout = function() {
            a.timeEnd = (new Date).getTime(), a.loadTime = a.timeEnd - a.timeStart, a.extraObj.loadTime = a.loadTime, d(a.extraObj)
        })
    }, window.JsonpTimeDecorator = b
}(window), function(a) {
    "use strict";
    function b(a, b) {
        var c = (65535 & a) + (65535 & b),
            d = (a >> 16) + (b >> 16) + (c >> 16);
        return d << 16 | 65535 & c
    }
    function c(a, b) {
        return a << b | a >>> 32 - b
    }
    function d(a, d, e, f, g, h) {
        return b(c(b(b(d, a), b(f, h)), g), e)
    }
    function e(a, b, c, e, f, g, h) {
        return d(b & c | ~b & e, a, b, f, g, h)
    }
    function f(a, b, c, e, f, g, h) {
        return d(b & e | c & ~e, a, b, f, g, h)
    }
    function g(a, b, c, e, f, g, h) {
        return d(b ^ c ^ e, a, b, f, g, h)
    }
    function h(a, b, c, e, f, g, h) {
        return d(c ^ (b | ~e), a, b, f, g, h)
    }
    function i(a, c) {
        a[c >> 5] |= 128 << c % 32, a[(c + 64 >>> 9 << 4) + 14] = c;
        var d,
            i,
            j,
            k,
            l,
            m = 1732584193,
            n = -271733879,
            o = -1732584194,
            p = 271733878;
        for (d = 0; d < a.length; d += 16)
            i = m, j = n, k = o, l = p, m = e(m, n, o, p, a[d], 7, -680876936), p = e(p, m, n, o, a[d + 1], 12, -389564586), o = e(o, p, m, n, a[d + 2], 17, 606105819), n = e(n, o, p, m, a[d + 3], 22, -1044525330), m = e(m, n, o, p, a[d + 4], 7, -176418897), p = e(p, m, n, o, a[d + 5], 12, 1200080426), o = e(o, p, m, n, a[d + 6], 17, -1473231341), n = e(n, o, p, m, a[d + 7], 22, -45705983), m = e(m, n, o, p, a[d + 8], 7, 1770035416), p = e(p, m, n, o, a[d + 9], 12, -1958414417), o = e(o, p, m, n, a[d + 10], 17, -42063), n = e(n, o, p, m, a[d + 11], 22, -1990404162), m = e(m, n, o, p, a[d + 12], 7, 1804603682), p = e(p, m, n, o, a[d + 13], 12, -40341101), o = e(o, p, m, n, a[d + 14], 17, -1502002290), n = e(n, o, p, m, a[d + 15], 22, 1236535329), m = f(m, n, o, p, a[d + 1], 5, -165796510), p = f(p, m, n, o, a[d + 6], 9, -1069501632), o = f(o, p, m, n, a[d + 11], 14, 643717713), n = f(n, o, p, m, a[d], 20, -373897302), m = f(m, n, o, p, a[d + 5], 5, -701558691), p = f(p, m, n, o, a[d + 10], 9, 38016083), o = f(o, p, m, n, a[d + 15], 14, -660478335), n = f(n, o, p, m, a[d + 4], 20, -405537848), m = f(m, n, o, p, a[d + 9], 5, 568446438), p = f(p, m, n, o, a[d + 14], 9, -1019803690), o = f(o, p, m, n, a[d + 3], 14, -187363961), n = f(n, o, p, m, a[d + 8], 20, 1163531501), m = f(m, n, o, p, a[d + 13], 5, -1444681467), p = f(p, m, n, o, a[d + 2], 9, -51403784), o = f(o, p, m, n, a[d + 7], 14, 1735328473), n = f(n, o, p, m, a[d + 12], 20, -1926607734), m = g(m, n, o, p, a[d + 5], 4, -378558), p = g(p, m, n, o, a[d + 8], 11, -2022574463), o = g(o, p, m, n, a[d + 11], 16, 1839030562), n = g(n, o, p, m, a[d + 14], 23, -35309556), m = g(m, n, o, p, a[d + 1], 4, -1530992060), p = g(p, m, n, o, a[d + 4], 11, 1272893353), o = g(o, p, m, n, a[d + 7], 16, -155497632), n = g(n, o, p, m, a[d + 10], 23, -1094730640), m = g(m, n, o, p, a[d + 13], 4, 681279174), p = g(p, m, n, o, a[d], 11, -358537222), o = g(o, p, m, n, a[d + 3], 16, -722521979), n = g(n, o, p, m, a[d + 6], 23, 76029189), m = g(m, n, o, p, a[d + 9], 4, -640364487), p = g(p, m, n, o, a[d + 12], 11, -421815835), o = g(o, p, m, n, a[d + 15], 16, 530742520), n = g(n, o, p, m, a[d + 2], 23, -995338651), m = h(m, n, o, p, a[d], 6, -198630844), p = h(p, m, n, o, a[d + 7], 10, 1126891415), o = h(o, p, m, n, a[d + 14], 15, -1416354905), n = h(n, o, p, m, a[d + 5], 21, -57434055), m = h(m, n, o, p, a[d + 12], 6, 1700485571), p = h(p, m, n, o, a[d + 3], 10, -1894986606), o = h(o, p, m, n, a[d + 10], 15, -1051523), n = h(n, o, p, m, a[d + 1], 21, -2054922799), m = h(m, n, o, p, a[d + 8], 6, 1873313359), p = h(p, m, n, o, a[d + 15], 10, -30611744), o = h(o, p, m, n, a[d + 6], 15, -1560198380), n = h(n, o, p, m, a[d + 13], 21, 1309151649), m = h(m, n, o, p, a[d + 4], 6, -145523070), p = h(p, m, n, o, a[d + 11], 10, -1120210379), o = h(o, p, m, n, a[d + 2], 15, 718787259), n = h(n, o, p, m, a[d + 9], 21, -343485551), m = b(m, i), n = b(n, j), o = b(o, k), p = b(p, l);
        return [m, n, o, p]
    }
    function j(a) {
        var b,
            c = "";
        for (b = 0; b < 32 * a.length; b += 8)
            c += String.fromCharCode(a[b >> 5] >>> b % 32 & 255);
        return c
    }
    function k(a) {
        var b,
            c = [];
        for (c[(a.length >> 2) - 1] = void 0, b = 0; b < c.length; b += 1)
            c[b] = 0;
        for (b = 0; b < 8 * a.length; b += 8)
            c[b >> 5] |= (255 & a.charCodeAt(b / 8)) << b % 32;
        return c
    }
    function l(a) {
        return j(i(k(a), 8 * a.length))
    }
    function m(a, b) {
        var c,
            d,
            e = k(a),
            f = [],
            g = [];
        for (f[15] = g[15] = void 0, e.length > 16 && (e = i(e, 8 * a.length)), c = 0; c < 16; c += 1)
            f[c] = 909522486 ^ e[c], g[c] = 1549556828 ^ e[c];
        return d = i(f.concat(k(b)), 512 + 8 * b.length), j(i(g.concat(d), 640))
    }
    function n(a) {
        var b,
            c,
            d = "0123456789abcdef",
            e = "";
        for (c = 0; c < a.length; c += 1)
            b = a.charCodeAt(c), e += d.charAt(b >>> 4 & 15) + d.charAt(15 & b);
        return e
    }
    function o(a) {
        return unescape(encodeURIComponent(a))
    }
    function p(a) {
        return l(o(a))
    }
    function q(a) {
        return n(p(a))
    }
    function r(a, b) {
        return m(o(a), o(b))
    }
    function s(a, b) {
        return n(r(a, b))
    }
    function t(a, b, c) {
        return b ? c ? r(b, a) : s(b, a) : c ? p(a) : q(a)
    }
    "function" == typeof define && define.amd ? define(function() {
        return t
    }) : "object" == typeof module && module.exports ? module.exports = t : a.md5 = t
}(this), function(a) {
    function b(a, b) {
        this.exposedNum = 0, this.pieceExposeStatisticNum = b && b.pieceExposeStatisticNum || 3, this.pieceExposeStatisticDelay = 200, this.lastExposedDom, this.domArr = [], this.domPathArr = [], this.statisticsTimer = null, this.pieceExposeTimer = null, this.init(a)
    }
    var c = {
            remove: function(a, b) {
                if ("object" == typeof a && "[object Array]" === toString.call(a)) {
                    if ("number" == typeof b && b >= 0)
                        return a.remove ? a.remove(b) : a.slice(0, b).concat(a.slice(b + 1, a.length));
                    if ("object" == typeof b && "[object Array]" === toString.call(b)) {
                        for (var c = [], d = 0, e = b.length; d < e; d++)
                            a[b[d]] = void 0;
                        for (var f = 0, g = a.length; f < g; f++)
                            void 0 !== a[f] && c.push(a[f]);
                        return c
                    }
                }
            },
            getScrollY: function() {
                return a.pageYOffset || a.scrollY || d.documentElement.scrollTop
            },
            getOffsetTop: function(a) {
                for (var b = 0; a.offsetParent && "" !== a.offsetParent;)
                    b += a.offsetTop, a = a.offsetParent;
                return b
            },
            proxy: function(a, b) {
                var c = b || this;
                return function() {
                    a.apply(c, arguments)
                }
            },
            extend: function(a, b) {
                var c = function(a) {
                    return "[object Object]" === Object.prototype.toString.call(a)
                };
                if (c(a) && c(b)) {
                    for (var d in b)
                        b.hasOwnProperty(d) && (a[d] = b[d]);
                    return a
                }
            }
        },
        d = a.document,
        e = a.innerHeight,
        f = a.innerWidth;
    d.body;
    b.prototype = {
        intervalTime: 0,
        lastScrollY: 0,
        slideDirection: "",
        init: function(a) {
            this.add(a).once().addExposureListen()
        },
        add: function(a) {
            return this.addNewElements(a), this
        },
        addNewElements: function(a) {
            if (0 === this.domArr.length && (this.removeExposureListen(), this.addExposureListen()), "[object Array]" === toString.call(a) && 0 !== a.length) {
                var b,
                    c = a.length;
                for (b = 0; b < c; b++)
                    this._addElement(a[b])
            } else
                "[object Object]" === toString.call(a) && a.dom && this._addElement(a)
        },
        once: function() {
            return this.sendFirstScreenStatis(), this
        },
        sendFirstScreenStatis: function() {
            var a = this;
            return this.allIsExposure(a.domArr, 1), a
        },
        addExposureListen: function() {
            var b = this;
            a.addEventListener("scroll", c.proxy(b.exposureListenFunc, b), !1), a.addEventListener("scroll", c.proxy(b.pieceExposeFunc, b), !1)
        },
        removeExposureListen: function() {
            var b = this;
            a.removeEventListener("scroll", c.proxy(b.exposureListenFunc, b), !1), a.removeEventListener("scroll", c.proxy(b.pieceExposeFunc, b), !1)
        },
        _setSlideDirection: function() {
            var a = this,
                b = a.lastScrollY,
                d = c.getScrollY();
            d > b ? a.slideDirection = "down" : a.slideDirection = "up", a.lastScrollY = d
        },
        exposureListenFunc: function() {
            var a = this;
            clearInterval(a.statisticsTimer), a.statisticsTimer = setTimeout(function() {
                a._setSlideDirection(), a.allIsExposure(a.domArr)
            }, a.intervalTime)
        },
        pieceExposeFunc: function() {
            var a,
                b = this,
                c = this.slideDirection,
                d = this.lastExposedDom || null;
            this.pieceExposeTimer && (clearTimeout(this.pieceExposeTimer), this.pieceExposeTimer = null), this.pieceExposeTimer = setTimeout(function() {
                b.pieceExposeStatistic(d, a, c)
            }, b.pieceExposeStatisticDelay)
        },
        pieceExposeStatistic: function(a, b, c) {
            var d;
            this.exposedNum >= this.pieceExposeStatisticNum && a && (b = b || this.domPathArr.join(","), this.exposedNum = 0, this.domPathArr = [], this.lastExposedDom = null, a.callback && (d = a.callback)(c, b))
        },
        allIsExposure: function(a, b) {
            var c,
                d,
                e,
                f = a.length,
                g = this.domArr,
                h = [],
                i = !1,
                j = this.slideDirection,
                k = function() {};
            if (0 === f)
                return void this.removeExposureListen();
            for (c = 0; c < f; c++)
                i = this.isExposure(g[c].dom, g[c].overHeight, g[c].otherJudgeMethod), i && (h.push(c), d = g[c].type, d && "pieceExpose" === d ? (e = g[c].path, e && this.domPathArr.push(e), this.exposedNum += 1, this.lastExposedDom = g[c]) : g[c].callback && (k = g[c].callback)(j));
            b && this.lastExposedDom && this.pieceExposeStatistic(this.lastExposedDom, this.domPathArr.join(","), j), this.removeElement(h)
        },
        _addElement: function(a) {
            var b = this;
            b.domArr.push(a)
        },
        removeElement: function(a) {
            this.domArr = c.remove(this.domArr, a)
        },
        isExposure: function() {
            var b,
                d,
                g,
                h = !1;
            e = a.innerHeight, f = a.innerWidth, 1 === arguments.length ? b = arguments[0] : 2 === arguments.length ? (b = arguments[0], "function" == typeof arguments[1] ? g = arguments[1] : d = arguments[1]) : arguments.length >= 3 && (b = arguments[0], d = arguments[1], g = arguments[2]);
            var i,
                j,
                k,
                l;
            return b && (l = d ? b.clientHeight + d : b.clientHeight, i = c.getScrollY(), j = c.getOffsetTop(b), k = j - i, k > 0 && k < e && (b.isDomTopExposure = !0), k > -l && k < e - l && (b.isDomBottomExposure = !0), h = g ? !!b.isDomTopExposure && !!b.isDomBottomExposure && g() : !!b.isDomTopExposure && !!b.isDomBottomExposure, h && (b.isDomTopExposure = !1, b.isDomBottomExposure = !1)), h
        }
    }, "function" == typeof define && (define.amd || seajs) ? define("NewExposureStatis", [], function() {
        return b
    }) : "undefined" != typeof module && module.exports && (module.exports = b), a.NewExposureStatis = b
}(window), function(a) {
    var b = function() {
        function a(a) {
            window.hasOwnProperty("console") && console.warn && console.warn(a)
        }
        function b() {
            return "complete" === document.readyState
        }
        function c(c) {
            if (z)
                return b() || a("document is not loaded yet, timing for some segments may be incorrect."), window.performance.timing[c]
        }
        function d(a, b) {
            if (z) {
                var d = c(a),
                    e = c(b);
                if (!isNaN(d) && !isNaN(e))
                    return (e - d) / 1e3
            }
        }
        function e() {
            return d("redirectStart", "redirectStart")
        }
        function f() {
            return d("fetchStart", "domainLookupStart")
        }
        function g() {
            return d("domainLookupStart", "domainLookupEnd")
        }
        function h() {
            return d("connectStart", "connectEnd")
        }
        function i() {
            return d("requestStart", "responseStart")
        }
        function j() {
            return d("responseStart", "responseEnd")
        }
        function k() {
            return d("domLoading", "domInteractive")
        }
        function l() {
            return d("domLoading", "domContentLoadedEventStart")
        }
        function m() {
            return d("domLoading", "domComplete")
        }
        function n() {
            return d("navigationStart", "domLoading")
        }
        function o() {
            return d("navigationStart", "loadEventEnd")
        }
        function p() {
            return !!c("navigationStart")
        }
        function q(a) {
            var b;
            return a && "string" == typeof a ? (b = c(a), 0 !== b && b ? b - c("navigationStart") : "") : ""
        }
        function r(a) {
            if ("[object Array]" !== Object.prototype.toString.call(a))
                return !1;
            var b,
                c = a.length,
                d = [];
            for (b = 0; b < c; b++)
                d.push(q(a[b]));
            return d.join(".")
        }
        function s(a) {
            var b = a.offsetTop;
            return null !== a.offsetParent && (b += s(a.offsetParent)), b
        }
        function t() {
            if (!window.performance || !window.performance.getEntriesByName)
                return 0;
            for (var a = document.querySelector(".topic-info img.topic_img"), b = 0, c = window.screen.height, d = document.images, e = 0; e < d.length; e++) {
                var f = d[e];
                if ((!a || "topic_img" != f.className || f.src == a.src) && s(f) < c) {
                    var g = window.performance.getEntriesByName(f.src);
                    g.length && (imgTiming = g[0], imgTiming.responseEnd > b && (b = imgTiming.responseEnd))
                }
            }
            return Number((b / 1e3).toFixed(3))
        }
        function u() {
            if (!window.performance || !window.performance.getEntriesByName)
                return {};
            var a = 0,
                b = 0,
                c = 0,
                d = 0,
                e = 0,
                f = 0,
                g = 0,
                h = 0,
                i = 0,
                j = 0,
                k = window.performance.getEntries();
            for (var l in k) {
                var m = k[l],
                    n = m.name;
                if (["jpg", "jpeg", "png", "webp"].indexOf(n.split(".").pop()) == -1)
                    /s\.go\.sohu\.com\//.test(n) && (i += 1, j += m.duration);
                else {
                    if (/rr\.itc\.cn\//.test(n)) {
                        a += 1, b += m.duration;
                        continue
                    }
                    if (/f\.itc\.cn\//.test(n)) {
                        c += 1, d += m.duration;
                        continue
                    }
                    if (/images\.sohu\.com\//.test(n)) {
                        e += 1, f += m.duration;
                        continue
                    }
                    g += 1, h += m.duration
                }
            }
            return {
                cmImg: a ? (b / a / 1e3).toFixed(3) : 0,
                fImg: c ? (d / c / 1e3).toFixed(3) : 0,
                adImg: e ? (f / e / 1e3).toFixed(3) : 0,
                otherImg: g ? (h / g / 1e3).toFixed(3) : 0,
                sgo: i ? (j / i / 1e3).toFixed(3) : 0
            }
        }
        function v(a, b) {
            function c() {
                var b = "undefined" != typeof window.performance && "undefined" != typeof window.performance.timing,
                    c = navigator.connection || navigator.mozConnection || navigator.webkitConnection || {
                        type: "unknown"
                    };
                if (b) {
                    var d = {
                            _once_: a,
                            redirect: e(),
                            cache: f(),
                            dns: g(),
                            tcp: h(),
                            firstByte: i(),
                            response: j(),
                            interactive: k(),
                            domReady: l(),
                            firstScreen: t(),
                            domComplete: m(),
                            blankScreen: n(),
                            total: o(),
                            nettype: c.type,
                            ad: B ? 0 : 1
                        },
                        s = u();
                    s.cmImg && (d.cmImg = s.cmImg), s.fImg && (d.fImg = s.fImg), s.adImg && (d.adImg = s.adImg), s.otherImg && (d.otherImg = s.otherImg), s.sgo && (d.sgo = s.sgo), p() && (d.pt = r(q)), w.addStatistics(d, "//zz.m.sohu.com/perf.gif?")
                }
            }
            var d = ["connectEnd", "connectStart", "domComplete", "domContentLoadedEventEnd", "domContentLoadedEventStart", "domInteractive", "domLoading", "domainLookupEnd", "domainLookupStart", "fetchStart", "loadEventEnd", "loadEventStart", "navigationStart", "redirectEnd", "redirectStart", "requestStart", "responseEnd", "responseStart", "secureConnectionStart", "unloadEventEnd", "unloadEventStart"];
            b = b || {};
            var q = b.ptKeys || d;
            return "complete" === document.readyState ? void c() : void (document.onreadystatechange = function() {
                "complete" === document.readyState && c()
            })
        }
        var w = window.Statistics,
            x = (window.CookieUtil, window.MSOHUBASEAD || {}),
            y = "undefined" != typeof window.performance,
            z = y && "undefined" != typeof window.performance.timing,
            A = y && "undefined" != typeof window.performance.navigation,
            B = x.isNoADMSohu;
        y ? (z || a("window.performance.timing is not implement."), A || a("window.performance.navigation is not implement.")) : a("window.performance is not implement.");
        var C;
        if (A)
            switch (window.performance.navigation.type) {
            case 0:
                C = "navigation";
                break;
            case 1:
                C = "reload";
                break;
            case 2:
                C = "history";
                break;
            case 255:
                C = "unknown"
            }
        var D;
        A && (D = window.performance.navigation.redirectCount);
        var E,
            F = !1;
        return y && ("function" == typeof window.performance.now ? (E = function() {
            return window.performance.now()
        }, F = !0) : "function" == typeof window.performance.webkitNow && (E = function() {
            return window.performance.webkitNow()
        }, F = !0)), E || (a("window.performance.now is not implemented, using Date.now"), E = function() {
            return Date.now()
        }), v
    }.call({});
    "function" == typeof define && (define.amd || seajs) ? define("addMonitor", [], function() {
        return b
    }) : "undefined" != typeof module && module.exports && (module.exports = b), a.addMonitor = b
}(window), function() {
    var a = window.MSOHU || (window.MSOHU = {}),
        b = a.AD || (a.AD = {}),
        c = {
            urlToObj: function(a) {
                if ("string" != typeof a)
                    return {};
                var b = a.split("?")[1],
                    c = {};
                if (!b)
                    return {};
                if (b.length && 0 === b.length)
                    return {};
                var d,
                    e = b.split("&"),
                    f = e.length,
                    g = [];
                for (d = 0; d < f; d++)
                    g = e[d].split("="), c[g[0]] = g[1] || "";
                return c
            },
            objToUrlParams: function(a, b) {
                var c,
                    d = function(a) {
                        var b,
                            c = [];
                        if ("object" == typeof a && a && a !== {}) {
                            for (b in a)
                                a.hasOwnProperty(b) && c.push(b + "=" + a[b]);
                            return c.join("&")
                        }
                        if (a === {} || null === a)
                            return ""
                    };
                return c = a.indexOf("?") === -1 ? a + "?" : "?" === a.charAt(a.length - 1) ? a : a + "&", c + d(b)
            }
        },
        d = {
            2: "\u65b0\u95fb",
            3: "\u4f53\u80b2",
            4: "\u5a31\u4e50",
            5: "\u8d22\u7ecf",
            7: "\u79d1\u6280",
            8: "\u519b\u4e8b",
            9: "\u661f\u5ea7",
            21: "\u60c5\u611f",
            1592: "\u6c7d\u8f66",
            5100: "\u5386\u53f2",
            16085: "\u5065\u5eb7",
            16246: "\u6559\u80b2",
            326: "\u65f6\u5c1a",
            16084: "\u65c5\u6e38",
            16247: "\u7f8e\u98df",
            16879: "\u6587\u5316\u8bfb\u4e66",
            18159: "\u65b0\u95fb\u6d41",
            18235: "\u65b0\u95fb\u6d41",
            16248: "\u6bcd\u5a74",
            1393: "\u7b11\u8bdd"
        },
        e = {
            getChannelIdByUrl: function() {
                var a = window.location.href,
                    b = /\/c\/(\d+)\//,
                    c = b.exec(a);
                return c ? c[1] : ""
            },
            getChannelNameByUrl: function() {
                var a = window.location.href,
                    b = /\/c\/(\d+)\//,
                    c = b.exec(a);
                return c ? d[c[1]] : ""
            },
            getChannelNameById: function(a) {
                return d[a]
            },
            isValidUrl: function(a) {
                return /^(http(s)?:)?\/\//.test(a)
            },
            imageUrlHandle: function(a, b) {
                var c = ["images.sohu.com", "x.jd.com"],
                    d = this.getHost(a);
                return this.inArray(d, c) && (a = this.adProtocolHandler(a, b)), window.https_i0 && "images.sohu.com" === d && (a = a.replace(/^(\/\/|http:\/\/|https:\/\/)images.sohu.com/, "https://i0.sohu.com")), a
            },
            isTestEnvironment: function(a) {
                var b = window.location.hostname,
                    c = [/^([tdg][1-9]\.)m\.sohu\.com$/, /^([t][1-9]\.)read\.m\.sohu\.com$/, /^([t][1-9]\.).zhibo\.m\.sohu\.com$/];
                a && c.push(a);
                for (var d in c)
                    if (c[d].test(b))
                        return !0;
                return !1
            },
            inArray: function(a, b) {
                if (!b)
                    return !1;
                for (var c = 0, d = b.length; c < d; c++)
                    if (a === b[c])
                        return !0;
                return !1
            },
            resetBase: function(a) {
                return this.isValidUrl(a) && a.indexOf("//") !== -1 && (a = a.slice(a.indexOf("//"))), a
            },
            getHost: function(a) {
                var b = "",
                    c = /\/\/([^\/]*).*/,
                    d = this.resetBase(a),
                    e = d.match(c);
                return "undefined" != typeof e && null != e && (b = e[1]), b
            },
            adProtocolHandler: function(a, b) {
                return a = a || "", b = b || 0, this.inArray(parseFloat(b), window.https_beans) || window.https_go ? a.replace(/^(\/\/|http:\/\/)/, "https://") : a.replace(/^http:\/\//, "//")
            },
            getAdTransCode: function() {
                var a = window.CookieUtil,
                    b = c.urlToObj(window.location.href),
                    d = b._trans_ || "",
                    e = function(a) {
                        return "[object Null]" === Object.prototype.toString.call(a)
                    };
                return a ? e(a.get("_trans_")) ? d : a.get("_trans_") : ""
            }
        };
    "function" == typeof define && (define.amd || seajs) ? define("msohuAdUtils", [], function() {
        return e
    }) : "undefined" != typeof module && module.exports && (module.exports = e), b.utils = e
}(window), function(a) {
    var b = function() {
        function b() {
            return j
        }
        function c(a, b) {
            j[a] = b
        }
        var d = {
                focusMap: "6400320",
                banner: "30000002",
                bannerHigher: "6400120",
                hotBanner: "2920248",
                bigBanner: "6000500",
                infoFlow: "130001",
                text: "160001",
                graphicMixe: "2160151",
                graphicMixeDesc: "30000001",
                graphicMixeTitle: "2500150",
                indexWin: "4800640",
                indexSelect: "6400320",
                implantH5: "6400320",
                videoPlayer: "30000001",
                gif: "30000001",
                detailBottom: "6400100"
            },
            e = a._sPath || "casted",
            f = {
                getAdUrl: "//s.go.sohu.com/" + e + "/?",
                statisticUrl: "//i.go.sohu.com",
                testAdUrl: "http://10.16.10.63/adgtr/?"
            },
            g = {
                hardAd: "1",
                softAd: "2"
            },
            h = a._idPrefix || "beans_",
            i = "beans_",
            j = {},
            k = 4e3,
            l = 8e3;
        return {
            adps_type: d,
            ad_url: f,
            ad_style: g,
            adIdPrefix: h,
            reportAdIdPrefix: i,
            getAdData: b,
            setAdData: c,
            globalTimeout: k,
            adTimeout: l
        }
    }();
    a.MSOHU_AD_DATA_CONFIG = b, "function" == typeof define && (define.amd || seajs) ? define("adConfig", function() {
        return b
    }) : "undefined" != typeof module && module.exports && (module.exports = b)
}(window), function(a) {
    function b(a, b, c) {
        if (a = a || {}, "[object Object]" !== Object.prototype.toString.call(a) || Object.prototype.toString.call(a) !== Object.prototype.toString.call(b))
            return a;
        for (var d in b)
            b.hasOwnProperty(d) && (!c && a.hasOwnProperty(d) || (a[d] = b[d]));
        return a
    }
    function c(c, d, e, f, g) {
        function h() {
            if (d.hasOwnProperty("imp"))
                if ("string" == typeof d.imp)
                    o.addStatistics(F.handlerAdplusParam(d.imp, d.apid, d.impid), F.handlerUrl(d.imp));
                else if ("object" == typeof d.imp && "[object Array]" === toString.apply(d.imp))
                    for (var a = 0, b = d.imp.length; a < b; a++)
                        o.addStatistics(F.handlerAdplusParam(d.imp[a], d.apid, d.impid), F.handlerUrl(d.imp[a]));
            d.hasOwnProperty("clkm") && (m = d.clkm), d.hasOwnProperty("telimp") && (n = d.telimp), o.addStatistics(d, r + "/count/v?")
        }
        function i() {
            o.addStatistics(d, r + "/count/av?")
        }
        function j() {
            e && e.addEventListener("click", l, !1)
        }
        function l(b) {
            if ("tel" !== b.target.className) {
                if (b.currentTarget === e || e.hasAttribute("data-msohu-money")) {
                    if (u)
                        return;
                    u = !0, setTimeout(function() {
                        u = !1
                    }, 2e3);
                    var c;
                    if (b.preventDefault(), d.cx = b.offsetX, d.cy = b.offsetY, d.rdm = Math.random().toString().substring(2, 15), m)
                        if ("string" == typeof m)
                            o.addStatistics(F.handlerAdplusParam(m, d.apid, d.impid), F.handlerUrl(m));
                        else if ("object" == typeof m && "[object Array]" === toString.apply(m))
                            for (var g = 0, h = m.length; g < h; g++)
                                o.addStatistics(F.handlerAdplusParam(m[g], d.apid, d.impid), F.handlerUrl(m[g]));
                    f && f(), "IMG" === e.tagName ? c = e.parentNode.getAttribute("href") : "A" === e.tagName ? c = e.getAttribute("data-url") : e.hasAttribute("data-msohu-money") && (c = e.querySelector("a").getAttribute("data-url")), new q({
                        url: s.adProtocolHandler(r, d.apid && d.apid.split("_")[1]) + "/count/c",
                        data: d,
                        time: k.globalTimeout,
                        success: function(b) {
                            "OK" !== b.STATUS && o.addStatistics(d, r + "/count/c?");
                            var e = setTimeout(function() {
                                e = null, a.location.href = c
                            }, 300)
                        },
                        error: function() {
                            o.addStatistics(d, r + "/count/c?");
                            var b = setTimeout(function() {
                                b = null, a.location.href = c
                            }, 300)
                        }
                    })
                }
            } else {
                if (u)
                    return;
                if (u = !0, setTimeout(function() {
                    u = !1
                }, 2e3), o.addStatistics(d, r + "/count/tel?"), o.addStatistics(d, r + "/count/c?"), n)
                    if ("string" == typeof n)
                        o.addStatistics(F.handlerAdplusParam(n, d.apid, d.impid), F.handlerUrl(n));
                    else if ("object" == typeof n && "[object Array]" === toString.apply(n))
                        for (var g = 0, h = n.length; g < h; g++)
                            o.addStatistics(F.handlerAdplusParam(n[g], d.apid, d.impid), F.handlerUrl(n[g]));
                if (m)
                    if ("string" == typeof m)
                        o.addStatistics(F.handlerAdplusParam(m, d.apid, d.impid), F.handlerUrl(m));
                    else if ("object" == typeof m && "[object Array]" === toString.apply(m))
                        for (var g = 0, h = m.length; g < h; g++)
                            o.addStatistics(F.handlerAdplusParam(m[g], d.apid, d.impid), F.handlerUrl(m[g]))
            }
        }
        var m,
            n,
            p = k.reportAdIdPrefix + c,
            u = !1,
            v = function() {};
        if (!d || !e)
            return d = {
                aid: "",
                apid: p,
                impid: "",
                at: "",
                mkey: "",
                latcy: "",
                freq: "",
                turn: "",
                ipos: "",
                pgid: "",
                ax: "",
                ay: "",
                cx: "",
                cy: "",
                ed: "",
                ext: "",
                ref: "",
                rsln: "",
                sf: "",
                jsv: "",
                r: "",
                supplyid: 4,
                ch_trans: t
            }, d = b(d, g), {
                sendPVStatis: function() {
                    o.addStatistics(F.addChannelParam(d), r + "/count/v?")
                },
                sendAVStatis: v,
                addClickStatis: v
            };
        if (d.apid = p, d.ax = e.offsetLeft, d.ay = e.offsetTop, d.rsln = a.screen.width + "*" + a.screen.height, d.sf = !1, d.jsv = a.passion_config && a.passion_config.VERSION || "06301130", d.r = (Math.random() + "").substring(2, 15), d = b(d, g), d = F.addChannelParam(d), e.querySelector("iframe")) {
            var w = e.querySelector("iframe"),
                x = w.getAttribute("src"),
                y = F.handlerUrlAndParams(s.adProtocolHandler(r, c) + "/count/c?", d),
                z = "[_SOHU_CLICK_ENC_]";
            x.indexOf(z) > -1 ? w.setAttribute("src", x.replace(z, encodeURIComponent(y))) : w.setAttribute("src", F.handlerUrlAndParams(x, {
                clkm: encodeURIComponent(y)
            }))
        }
        return {
            sendPVStatis: h,
            sendAVStatis: i,
            addClickStatis: j,
            triggerClickEvent: l
        }
    }
    function d(a) {
        var b = a.adData,
            d = a.adSpaceID,
            f = a.containerObj,
            g = (a.targetObj, a.targetObjIsWant),
            h = a.isSendStatisFn,
            i = a.clickCallBack,
            k = a.statisAdValidExposure,
            l = a.extraParams;
        void 0 === g && (g = !0);
        var m = c(d, b, f, i, l);
        if (j && "function" == typeof j && j({
            adSpaceID: d,
            adData: b,
            containerObj: f,
            clickCallBack: i
        }), m.sendPVStatis(), E) {
            var n;
            n = k ? function() {
                m.sendAVStatis(), k.firstExposureCallback(), e(f, h, k.secondExposureCallback)
            } : m.sendAVStatis, E.add({
                dom: f,
                callback: n,
                otherJudgeMethod: h
            }).once()
        } else
            m.sendAVStatis();
        m.addClickStatis()
    }
    function e(a, b, c) {
        var d = 1e3,
            e = null;
        e = setTimeout(function() {
            e = null, E.isExposure(a, 0, b) && c && c()
        }, d)
    }
    function f(a) {
        var b = a.data,
            c = a.turn,
            d = a.progid,
            e = a.roomid,
            f = a.adPId;
        if (!b || !b.resource)
            return {
                adInfo: null,
                sendInfo: null
            };
        var g,
            h,
            i,
            j = function(a) {
                return a.split("|")
            },
            k = b.resource.imp,
            l = b.resource.clkm,
            m = b.resource.telimp;
        g = "[object Array]" === toString.call(k) ? k : /^\[(.+?)\]$/.test(k) ? JSON.parse(k) : k ? j(k) : [], h = "[object Array]" === toString.call(l) ? l : /^\[(.+?)\]$/.test(l) ? JSON.parse(l) : l ? j(l) : [], i = "[object Array]" === toString.call(m) ? m : /^\[(.+?)\]$/.test(m) ? JSON.parse(m) : m ? j(m) : [];
        var n,
            o,
            p,
            q = g.length,
            r = h.length,
            s = i.length,
            u = [],
            v = [],
            w = [];
        for (n = 0; n < q; n++)
            (/^http:\/\//.test(g[n]) || /^https:\/\//.test(g[n])) && u.push(g[n]);
        for (o = 0; o < r; o++)
            (/^http:\/\//.test(h[o]) || /^https:\/\//.test(h[o])) && v.push(h[o]);
        for (p = 0; p < s; p++)
            (/^http:\/\//.test(i[p]) || /^https:\/\//.test(i[p])) && w.push(i[p]);
        g = u, h = v, i = w;
        var x = {};
        "image" === b.resource.type ? ("pictxtphone" === b.form && (x.tel = b.resource1.text), x.form = b.form, x.adstyle = b.adstyle, x.image = y(b.resource.file, f), x.url = b.resource.click, x.text = b.resource.text, x.width = b.resource.width, x.height = b.resource.height, x.progid = d ? d : "", x.roomid = e ? e : "", b.resource1 && "text" === b.resource1.type && (x.text = b.resource1.text), b.dsp_source && (x.dsp_source = b.dsp_source)) : "text" === b.resource.type ? (x.image = "", x.url = b.resource.click, x.text = b.resource.text) : "iframe" === b.resource.type && (x.image = "", x.url = b.resource.click, x.iframe = y(b.resource.file, f)), b.resource2 && (x.image = y(b.resource.file, f), x.url = b.resource.click, x.title = b.resource2.text, x.desc = b.resource1.text), b.special && b.special.dict && (x.url = b.resource.click, b.special.dict.picture && (x.image = y(b[b.special.dict.picture].file, f)), b.special.dict.txt && (x.text = b[b.special.dict.txt].text), b.special.dict.title && (x.title = b[b.special.dict.title].text), b.special.dict.summary && (x.desc = b[b.special.dict.summary].text), b.special.dict.video && (x.video = b[b.special.dict.video].file), b.special.dict.phone && (x.tel = b[b.special.dict.phone].text)), b.resource.clkm && "iframe" === b.resource.type && (x.url += (/\?/.test(x.url) ? "&" : "?") + "clkm=" + b.resource.clkm, x.iframe += (/\?/.test(x.iframe) ? "&" : "?") + "clkm=" + b.resource.clkm), /^https:\/\//.test(x.url) ? x.url = x.url : /^http:\/\//.test(x.url) || /^https:\/\//.test(x.url) || (x.url = "http://" + x.url), b.dsp_source && (x.dsp_source = b.dsp_source);
        var z = {
            pgid: "pgid" + (new Date).getTime(),
            clkm: h,
            ed: b.ed || "",
            supplyid: 4,
            at: b.adtype || "",
            freq: b.freq || "",
            impid: b.impression_id || "",
            ipos: 1,
            mkey: b.monitorkey || "",
            c: b.c || "",
            e: b.e || "",
            imp: g,
            turn: c || 1,
            ext: b.ext || "",
            aid: b.adid || "",
            bucket: b.bucket || "",
            ch_trans: t,
            shbd_monitor_ext: b.shbd_monitor_ext,
            telimp: i
        };
        return "1" == C.get("ns") && (z.NS = 1), {
            adInfo: x,
            sendInfo: z
        }
    }
    function g(c) {
        j = c && c.storeLastStatisticAdData;
        var e = !c.isClick || c.isClick,
            g = !1;
        if (c.type && c.formalApId && c.adps) {
            c.adps === n.banner && (g = !0);
            var l,
                m = h(c),
                q = m.type,
                u = (m.adType, m.url),
                w = m.baseData.itemspaceid,
                y = m.baseData,
                z = m.adTemplate,
                A = m.className,
                E = (m.homeSlide, m.homeSlideParam, m.flowIndex),
                G = m.flowAdIndex,
                H = m.groupAd,
                I = m.focusMapAdIndex || 4,
                J = m.handlerAdDom,
                K = m.insertAdDom,
                L = m.successCallBack,
                M = m.insertSuccessCallBack,
                N = m.errorCallBack,
                O = m.clickCallBack,
                P = m.statisAdValidExposure,
                Q = m.isCachedData,
                R = !1;
            H && (l = H.setContainerDomArr);
            var S = k.adIdPrefix + w,
                T = p.compile(z);
            if (8 !== q || c.merge || document.querySelector("#" + S)) {
                var U,
                    V = !1,
                    W = (new Date).getTime(),
                    X = function(b) {
                        return !(!s.inArray(b, a.https_beans) && !a.https_go)
                    },
                    Y = function(b, c, h) {
                        var j,
                            c = c,
                            m = k.adIdPrefix + c,
                            n = !1,
                            o = {},
                            r = {
                                data: b,
                                turn: y.turn,
                                progid: y.progid,
                                roomid: y.roomid,
                                adPId: c
                            };
                        j = f(r);
                        var s,
                            t,
                            u;
                        if (!R) {
                            if (j && j.adInfo && j.sendInfo) {
                                var w = j ? {
                                    data: j.adInfo
                                } : {
                                    data: {}
                                };
                                !g || "picturetxt" !== j.adInfo.form && "pictxtphone" !== j.adInfo.form || z !== MSOHUAD.adTemplate.finalPicText && z !== MSOHUAD.adTemplate.billGraphicMix && (n = !0, z === MSOHUAD.adTemplate.finalBannerTmgAd ? (z = MSOHUAD.adTemplate.billGraphicMix, A = "bill-top-graphic-text", J = null) : (z = MSOHUAD.adTemplate.finalPicText, A = "graphicMixeCompact graphicMixe"), T = p.compile(z));
                                var B = !!j.adInfo.iframe;
                                if (w.data.adPId = String(c), B && 7 === q ? (T = p.compile(MSOHUAD.adTemplate.hasContaineriframeAd), A += " iframe-money") : B && 8 === q && (T = p.compile(MSOHUAD.adTemplate.noContaineriframeAd), A += " iframe-money"), !B || 13455 !== Number(c) && 12735 !== Number(c) || (A += " hm-btm-ifm-mny"), 3 === q) {
                                    var D = document.querySelector(A) ? document.querySelector(A).parentNode.querySelectorAll(".ls .it") : [];
                                    s = D[3] || document.createElement("div");
                                    var N = F.transformHtmlToDom(T(w))[0];
                                    s.id = m, s.appendChild(N), s.style.display = "block", s.style.overflow = "hidden", s.style.height = "43px", F.addClass(s.childNodes[0], "infoFlowAnimate"), F.addClass(s.childNodes[1], "infoFlowAnimate"), s.childNodes[1] && s.childNodes[1].setAttribute("data-msohu-money", "true")
                                } else if (4 === q) {
                                    s = document.createElement("li"), s.id = m, F.addClass(s, "topic-item"), s.innerHTML = T(w), s.setAttribute("data-msohu-money", "true");
                                    var Q = document.querySelector(".tips .topic-info .topic-swipe"),
                                        S = document.querySelectorAll(".tips .topic-info .topic-item"),
                                        U = document.querySelector(".tips .topic-info .page-wrapper"),
                                        V = document.createElement("span"),
                                        W = S.length;
                                    W > 0 && W < I - 1 ? (Q.appendChild(s), MSOHUAD.focusMapAdIndex = W - 1) : W >= I - 1 && (Q.insertBefore(s, S[I]), MSOHUAD.focusMapAdIndex = I - 1), 0 !== U.querySelectorAll("span").length && U.appendChild(V)
                                } else if (6 === q) {
                                    s = document.createElement("a"), s.id = m, F.addClass(s, A), s.href = "javascript:;", s.setAttribute("data-url", w.data.url), s.setAttribute("data-msohu-money", "true"), s.innerHTML = T(w);
                                    var Y = document.querySelectorAll("a[data-flow-index='" + E + "']"),
                                        Z = Y[G - 1],
                                        $ = document.querySelector(".stream-container .stream");
                                    Z && $.insertBefore(s, Z)
                                } else if (7 === q) {
                                    s = F.transformHtmlToDom(T(w))[0], s.id = m, n ? s.className = A : F.addClass(s, A), s.setAttribute("data-msohu-money", "true"), e || s.removeAttribute("data-msohu-money");
                                    var Y = document.querySelectorAll("li[data-flow-index='" + E + "']"),
                                        Z = Y[G - 1],
                                        $ = document.querySelector(".it .content ul"),
                                        _ = a.news_config ? a.news_config.channel_en_name : "health",
                                        aa = !(!a.CONFIGS || !a.CONFIGS.roomId);
                                    _ && !aa && ($ = document.querySelector(".content ul")), Z && $.insertBefore(s, Z)
                                } else if (8 === q)
                                    s = document.getElementById(m) || document.createElement("div"), n ? s.className = A : F.addClass(s, A), s.setAttribute("data-msohu-money", "true"), J && !B ? J(s, j) : s.innerHTML = T(w), s.style.display = "block";
                                else if (9 === q && H) {
                                    MSOHUAD.adData[H.name].length = H.length, MSOHUAD.adData[H.name].nowLen++, MSOHUAD.adData[H.name][H.index - 1] = {}, MSOHUAD.adData[H.name][H.index - 1].adInfo = w.data, MSOHUAD.adData[H.name][H.index - 1].adSendInfo = j.sendInfo, MSOHUAD.adData[H.name][H.index - 1].adPId = c;
                                    for (var ba = 0, ca = H.length; ba < ca; ba++)
                                        if (!MSOHUAD.adData[H.name][ba] || !MSOHUAD.adData[H.name][ba].adInfo)
                                            return;
                                    s = F.transformHtmlToDom(T({
                                        data: MSOHUAD.adData[H.name]
                                    }))[0], F.addClass(s, A)
                                } else if (1 === q && (s = document.getElementById(m) || document.createElement("li"), s.innerHTML = T(w), s.style.display = "block", s.setAttribute("data-msohu-money", "true"), 1 === q)) {
                                    var da,
                                        ea = s.parentNode,
                                        fa = ea.children,
                                        ga = fa.length;
                                    for (da = 0; da < ga; da++)
                                        if (s === fa[da]) {
                                            MSOHUAD.focusMapAdIndex = da;
                                            break
                                        }
                                }
                                if (K && K(s, j), M && M(), B) {
                                    var ha = String(y.adps),
                                        ia = parseInt(ha.substr(0, ha.length - 4), 10),
                                        ja = parseInt(ha.substr(ha.length - 4), 10);
                                    if (s.querySelector("iframe"))
                                        if ("2920248" === ha)
                                            s.querySelector("iframe").style.width = "143px", s.querySelector("iframe").style.height = "149px";
                                        else if ("2160151" === ha)
                                            /graphicMixeCompact/i.test(s.className) ? s.querySelector("iframe").style.height = "85px" : /graphicMixeJD/i.test(s.className) ? s.querySelector("iframe").style.height = "81px" : s.querySelector("iframe").style.height = "101px";
                                        else {
                                            s.querySelector("iframe").style.height = ja * s.offsetWidth / ia + "px";
                                            var ka = function() {
                                                var a = s.getElementsByTagName("iframe")[0],
                                                    b = document.documentElement.clientWidth;
                                                a.style.width = b + "px", a.style.height = ja * b / ia + "px"
                                            };
                                            v && !x ? (a.addEventListener("orientationchange", F.createOrientationChangeProxy(ka, this), !1), a.addEventListener("resize", F.createOrientationChangeProxy(ka, this), !1)) : a.addEventListener("onorientationchange" in a ? "orientationchange" : "resize", F.createOrientationChangeProxy(ka, this), !1)
                                        }
                                }
                                1 === q || 4 === q ? (t = s, u = s, 4 === q && i()) : 2 === q ? (t = s.querySelector(".hushoubanner"), u = s.querySelector("img") || null) : 3 === q ? (t = s.childNodes[1], u = s.childNodes[1]) : 9 === q ? l(s) : 6 !== q && 7 !== q && 8 !== q || (t = s, u = s)
                            } else
                                s = document.getElementById(m), 1 !== q && s && s.parentNode.removeChild(s), t = null, u = null, 9 === q && H && (MSOHUAD.adData[H.name].length = H.length, MSOHUAD.adData[H.name].nowLen++, MSOHUAD.adData[H.name][H.index - 1] = {}, MSOHUAD.adData[H.name][H.index - 1].adPId = c);
                            if (adParam = j ? j.sendInfo : null, o.ss_t = h.loadTime, o.ss_p = C.get("_sxsp") || "", o.ss_hs = X(c) ? 1 : 0, 1 === q || 4 === q)
                                d({
                                    adData: adParam,
                                    adSpaceID: c,
                                    containerObj: t,
                                    targetObj: u,
                                    targetObjIsWant: !0,
                                    isSendStatisFn: MSOHUAD.isSentStatis,
                                    statisAdValidExposure: P,
                                    extraParams: o
                                });
                            else if (9 === q && MSOHUAD.adData[H.name].nowLen === MSOHUAD.adData[H.name].length)
                                for (var la = 0, ma = H.length; la < ma; la++) {
                                    var na = MSOHUAD.adData[H.name][la];
                                    d({
                                        adData: na.adSendInfo,
                                        adSpaceID: na.adPId,
                                        containerObj: na.containerDom,
                                        targetObj: na.targetDom,
                                        clickCallBack: O,
                                        statisAdValidExposure: P,
                                        extraParams: o
                                    })
                                }
                            else
                                d({
                                    adData: adParam,
                                    adSpaceID: c,
                                    containerObj: t,
                                    targetObj: u,
                                    clickCallBack: O,
                                    statisAdValidExposure: P,
                                    extraParams: o
                                });
                            L && L()
                        }
                    },
                    Z = function(a, c) {
                        var d,
                            a = a,
                            e = k.adIdPrefix + a,
                            f = k.reportAdIdPrefix + a,
                            g = {};
                        R = !0;
                        var h = document.getElementById(e);
                        h && 1 !== q && h.parentNode.removeChild(h), g.ss_t = c.loadTime, g.ss_p = C.get("_sxsp") || "", g.ss_hs = X(a) ? 1 : 0, d = b({
                            apid: f,
                            supplyid: 4,
                            ch_trans: t
                        }, g), o.addStatistics(F.addChannelParam(d), r + "/count/e?"), o.addStatistics(F.addChannelParam({
                            _once_: "000157_error",
                            itemspaceid: e,
                            supplyid: 4
                        })), N && N()
                    },
                    $ = function(a, c) {
                        var d,
                            a = a,
                            e = k.adIdPrefix + a,
                            f = k.reportAdIdPrefix + a,
                            g = {};
                        R = !0;
                        var h = document.getElementById(e);
                        h && 1 !== q && h.parentNode.removeChild(h), g.ss_t = c.loadTime, g.ss_p = C.get("_sxsp") || "", g.ss_hs = X(a) ? 1 : 0, d = b({
                            apid: f,
                            supplyid: 4,
                            ch_trans: t
                        }, g), o.addStatistics(F.addChannelParam(d), r + "/count/to?"), o.addStatistics(F.addChannelParam({
                            _once_: "000157_adtimeout",
                            itemspaceid: e,
                            supplyid: 4
                        })), N && N()
                    };
                Q && D && (U = a.sessionStorage.getItem(S), U && (U = JSON.parse(U), U.offline && parseInt(W.toString().substr(0, 10)) > U.offline ? V = !1 : (Y(U, w, U.extraObj || {}), V = !0))), new B({
                    url: u,
                    data: y,
                    time: k.adTimeout,
                    success: function(b, d) {
                        if (b) {
                            if (Q && D) {
                                var e = b[0] || {};
                                if (e.extraObj = d, a.sessionStorage.setItem(S, JSON.stringify(e)), e.resource && e.resource.file) {
                                    var f = new Image;
                                    f.src = e.resource.file
                                }
                            }
                            if (!V)
                                if (d = d || {}, c.merge)
                                    for (var g = w.split(","), h = g.length, i = 0; i < h; i++)
                                        !function(a) {
                                            Y(b[a], g[a].trim(), d)
                                        }(i);
                                else
                                    Y(b[0], w, d)
                        }
                    },
                    error: function(a) {
                        if (a = a || {}, c.merge)
                            for (var b = w.split(","), d = b.length, e = 0; e < d; e++)
                                !function(c) {
                                    Z(b[c].trim(), a)
                                }(e);
                        else
                            Z(w, a)
                    },
                    timeout: function(a) {
                        if (a = a || {}, c.merge)
                            for (var b = w.split(","), d = b.length, e = 0; e < d; e++)
                                !function(c) {
                                    $(b[c].trim(), a)
                                }(e);
                        else
                            $(w, a)
                    }
                })
            }
        }
    }
    function h(b) {
        var c = (a.location.hostname, l.getAdUrl),
            d = l.testAdUrl,
            e = {},
            f = "",
            g = {
                itemspaceid: b.formalApId || "111111",
                adps: b.adps || "160001",
                adsrc: b.adsrc || 13,
                apt: b.apt || 4,
                turn: b.maxTurn || 1
            };
        c = s.adProtocolHandler(c, g.itemspaceid), b.merge && (g.merge = b.merge);
        var h = function() {
                return "callback=sohu_moblie_callback1383228627964854" + Math.random().toString().substring(2, 15)
            },
            i = function(b, c) {
                var d,
                    e,
                    f,
                    g = 60,
                    h = D ? JSON.parse(a.localStorage.getItem("msohu/ad_turn")) || {} : {};
                return d = parseInt(h[c] || parseInt(Math.random() * g + 1, 10), 10), e = e > g ? 1 : d + 1, h[c] = e, D && a.localStorage.setItem("msohu/ad_turn", JSON.stringify(h)), f = b ? (e - 1) % b + 1 : e
            },
            j = function(a, b) {
                var c = g;
                return c.turn = i(a, b), c
            };
        if (z && b.testApId) {
            if (e.baseUrl = d, g.itemspaceid = b.testApId, g.bucketid = 2, 8 === b.type || 1 === b.type)
                if (b.merge)
                    for (var m = b.formalApId.split(","), n = b.testApId.split(","), o = 0; o < m.length; o++) {
                        var p = document.querySelector("#" + k.adIdPrefix + m[o]);
                        p && (p.id = k.adIdPrefix + n[o])
                    }
                else {
                    var p = document.querySelector("#" + k.adIdPrefix + b.formalApId);
                    p && (p.id = k.adIdPrefix + b.testApId)
                }
        } else
            e.baseUrl = c;
        return b.debugloc && (g.debugloc = b.debugloc), b.zhibo && (g.progid = b.progid, g.roomid = b.roomid), b.maxTurn >= 2 && (f = b.adTurnCookieName ? b.adTurnCookieName : k.adIdPrefix + g.itemspaceid + "_turn", g = j(b.maxTurn, f)), g = F.addChannelParam(g), e.baseData = g, e.type = b.type, e.adTemplate = b.adTemplate, e.className = b.adDomClassName || "", e.homeSlide = b.homeSlide, e.homeSlideParam = b.homeSlideParam, e.focusMapAdIndex = b.focusMapAdIndex, e.groupAd = b.groupAd, e.handlerAdDom = b.handlerAdDom, e.insertAdDom = b.insterAdDom, e.successCallBack = b.successCallBack, e.insertSuccessCallBack = b.insertSuccessCallBack, e.errorCallBack = b.errorCallBack, e.clickCallBack = b.clickCallBack, e.adType = b.adType, e.flowIndex = b.flowIndex, e.flowAdIndex = b.flowAdIndex, e.statisAdValidExposure = b.statisAdValidExposure, e.isCachedData = b.isCachedData, e.url = e.baseUrl + h(), e
    }
    function i() {
        if (document.querySelector(".topic-info")) {
            var a,
                b = document.documentElement.clientWidth,
                c = document.querySelectorAll(".topic-item"),
                d = c.length;
            for (a = 0; a < d; a++)
                c[a].style.left = b * a + "px"
        }
    }
    var j,
        k = a.MSOHU_AD_DATA_CONFIG,
        l = k.ad_url,
        m = k.ad_style,
        n = k.adps_type,
        o = a.Statistics,
        p = a.template,
        q = (a.ExposureStatis, a.LocalStore, a.Jsonp),
        r = (a.Slide, a.vendor, l.statisticUrl),
        s = MSOHU.AD.utils,
        t = s.getAdTransCode(),
        u = a.navigator.userAgent,
        v = (/Android/i.test(navigator.userAgent), u.match(/(iPad|iPhone|iPod)[\w\s]*;(?:[\w\s]+;)*[\w\s]+(?:iPad|iPhone|iPod)?\sOS\s([\d_\.]+)/i)),
        w = /WebKit\/[\d.]+/i.test(u),
        x = !!v && (navigator.standalone ? w : /Safari/i.test(u) && !/CriOS/i.test(u) && !/MQQBrowser/i.test(u)),
        y = $.proxy(s.imageUrlHandle, s),
        z = s.isTestEnvironment(),
        A = a.supporter || (a.supporter = {}),
        B = a.JsonpTimeDecorator || a.Jsonp,
        C = a.CookieUtil || (a.CookieUtil = {}),
        D = A.isSupportLocalStorage;
    a.MSOHUAD = {}, MSOHUAD.focusMapAdIndex = null, MSOHUAD.isSentStatis = function() {
        var a;
        return MSOHUAD.homeSlide ? a = MSOHUAD.homeSlide.activeIndex : MSOHUAD.listSlide && (a = MSOHUAD.listSlide.activeIndex), MSOHUAD.focusMapAdIndex === a
    }, MSOHUAD.adData = {
        carChannelDoublePicAd: [],
        homePageFocusMapAd: {
            first: !1,
            two: !1
        }
    }, MSOHUAD.adData.carChannelDoublePicAd.nowLen = 0;
    var E = MSOHUAD.moneyExposureStatis || (MSOHUAD.moneyExposureStatis = new NewExposureStatis),
        F = {
            transformHtmlToDom: function(a) {
                if ("string" == typeof a) {
                    var b,
                        c = document.createElement("div");
                    return c.innerHTML = a, b = c.childNodes, c = null, b
                }
            },
            addClass: function(a, b) {
                if (a) {
                    var c = new RegExp("(?:^|\\s+)" + b + "(?:\\s+|$)");
                    c.test(a.className) || (a.className = [a.className, b].join(" "))
                }
            },
            createOrientationChangeProxy: function(b, c) {
                return function() {
                    clearTimeout(b.orientationChangeTimer);
                    var d = Array.prototype.slice.call(arguments, 0),
                        e = a.navigator,
                        f = e.userAgent,
                        g = /Android/i.test(e.userAgent),
                        h = f.match(/(iPad|iPhone|iPod)[\w\s]*;(?:[\w\s]+;)*[\w\s]+(?:iPad|iPhone|iPod)?\sOS\s([\d_\.]+)/i),
                        i = (/QBrowser/i.test(f), /MI\s\d/i.test(f)),
                        j = /Sogou/i.test(f),
                        k = /LT18i/i.test(f),
                        l = /WebKit\/[\d.]+/i.test(f),
                        m = !!h && (e.standalone ? l : /Safari/i.test(f) && !/CriOS/i.test(f) && !/MQQBrowser/i.test(f)),
                        n = g ? i || k || j ? 1e3 : 400 : h && !m ? 400 : 0;
                    b.orientationChangeTimer = setTimeout(function() {
                        b.apply(c, d)
                    }, n)
                }
            },
            addChannelParam: function(b) {
                var c,
                    d = a.location.hostname,
                    e = a.location.pathname,
                    f = /\/c\/(\d+)/i.exec(e),
                    g = /\/n\/(\d+)/i.exec(e);
                return /m\.sohu\.com/.test(d) ? (/^\/$/.test(e) && (b.newschn = "1"), f && (b.newschn = f[1]), g && a.article_config && a.article_config.channel_long_path && (c = a.article_config.channel_long_path, b.newschn = c[0][1].split("/")[2], c[1] && (b.subchannelid = c[1][1].split("/")[2])), b) : b
            },
            handlerUrlAndParams: function(a, b) {
                var c,
                    d = function(a) {
                        var b,
                            c = [];
                        if ("object" == typeof a && a && a !== {}) {
                            for (b in a)
                                a.hasOwnProperty(b) && c.push(b + "=" + a[b]);
                            return c.join("&")
                        }
                        if (a === {} || null === a)
                            return ""
                    };
                return c = a.indexOf("?") === -1 ? a + "?" : "?" === a.charAt(a.length - 1) ? a : a + "&", c + d(b)
            },
            handlerAdplusParam: function(a, b, c) {
                return /imp\.optaim\.com/.test(a) ? {
                    apid: b,
                    impid: c
                } : {
                    _dc_: +new Date
                }
            },
            handlerUrl: function(a) {
                var b;
                return b = a.indexOf("?") === -1 ? a + "?" : "?" === a.charAt(a.length - 1) ? a : a + "&"
            }
        };
    p.helper("getAdLabelText", function(b) {
        var c = "\u5e7f\u544a",
            d = a.ad_config && a.ad_config[b];
        return d && (c = "\u5e7f\u544a"), c
    });
    var G = {
            indexWin: '<div class="index-win-money-img-inner">\t\t                <div class="index-win-money-img-inner-cell">                            <% if ( !!data.dsp_source ) { %>                                <span class="dsp_source"><%= data.dsp_source %></span>                            <% } %>\t\t                    <p>\t\t                        <i class="index-win-money-close index-win-money-img-close" data-type="img"></i>\t\t                        <a href="javascript:;" data-url="<%= data.url %>">\t\t                        <i id="index-win-money-time" class="index-win-money-time index-win-money-time-3"></i>\t\t                        <img src="<%= data.file %>" />\t\t                        </a>\t\t                    </p>\t\t                </div>\t\t            </div>',
            indexSelect: '<p class="index-select-money-img">\t\t    \t\t\t\t\t<% if ( !!data.dsp_source ) { %>\t\t                            <span class="dsp_source"><%= data.dsp_source %></span>\t\t                        <% } %>\t\t\t                    <a href="javascript:;" data-url="<%= data.url %>">\t\t\t                        <i id="index-win-money-time" class="index-win-money-time index-win-money-time-3"></i>\t\t\t                        <img src="<%= data.file %>" />\t\t\t                    </a>\t\t                    </p>\t\t                    <p class="index-select-money-text">\t\t\t                    <a href="javascript:;" class="index-select-money-zoom"></a><a class="index-select-txt" href="javascript:;" data-url="<%= data.url %>"><%= data.text %></a>\t\t                    </p>',
            focusMap: '<div class="img-l">                        <% if ( !!data.dsp_source ) { %>                            <span class="dsp_source"><%= data.dsp_source %></span>                        <% } %>\t\t\t\t\t\t<a href="javascript:;" data-url="<%=data.url%>">\t\t\t\t\t\t\t<img src="<%=data.image%>" alt="<%=data.text%>" border="0" class="topic_img">\t\t\t\t\t\t</a>\t\t\t\t\t\t<div class="topic-title"><p><%=data.text%></p></div>\t\t\t\t\t\t<% if ($data.data.adstyle !== "' + m.softAd + '") { %>                        \t<div class="focus_label">\u5e7f\u544a</div>                        <% } %>\t\t\t\t\t</div>',
            adBanner: '<section class="adbanner">                        <div class="hushoubanner">                            <img src="<%=data.image%>" alt="<%=data.text%>" >                        </div>                    </section>',
            adInfoFlow: '<div class="h4WP"><a href="javascript:;" data-url="<%=data.url%>" class="h4"><span class="generalize_label"><%= getAdLabelText(data.adPId)%> | </span><%=data.text%></a></div>',
            adChannelNewsFlow: '<li class="itNewsFlowMoney">\t\t\t\t\t\t\t\t\t<a href="javascript:;" data-url="<%=data.url%>">\t\t\t\t\t\t\t\t\t\t<div class="cnt"><h4><%=data.title%></h4><p><%=data.desc%></p></div>\t\t\t\t\t\t\t\t\t\t<div class="image"><img src="<%=data.image%>" alt="<%=data.title%>"></div>\t\t\t\t\t\t\t\t\t\t<div class="sign">\u5e7f\u544a</div>\t\t\t\t\t\t\t\t\t</a>\t\t\t\t\t\t\t\t</li>',
            adNewsFlow: '<div class="title"><%=data.text%></div>\t\t\t\t\t\t\t<div class="cnt adNewsFlowAd">\t\t\t\t\t\t\t\t<div class="picContainer">\t\t\t\t\t\t\t\t\t<div class="pic">\t\t\t\t\t\t\t\t\t\t<div class="img">\t\t\t\t\t\t\t\t\t\t\t<img src="<%=data.image%>" alt="<%=data.text%>">\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t<div class="des">\t\t\t\t\t\t\t\t\t<div class="brief">\t\t\t\t\t\t\t\t\t\t<div class="text"><%=data.desc%></div>\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t<div class="opt toSource">\u5e7f\u544a</div>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t',
            readAdBookFlow: '<a href="javascript:;" data-url="<%=data.url%>"><img src="<%=data.image%>" alt="<%=data.text%>"></a>',
            homeBannerImgAd: '<a href="javascript:;" data-url="<%=data.url%>">                                <% if ( !!data.dsp_source ) { %>                                    <span class="dsp_source"><%= data.dsp_source %></span>                                <% } %>\t\t\t\t\t\t\t\t<img src="<%=data.image%>" >\t\t\t\t\t\t\t\t<em class="tag">\u5e7f\u544a</em>\t\t\t\t\t\t\t</a>\t\t\t\t\t\t\t<% if ($data.data.tel) { %>\t\t\t\t\t\t\t\t<a class="tel" href="tel:<%=data.tel%>"></a>\t\t\t\t\t\t\t<% } %>',
            channelBannerImgAd: '<div class="channel_banner_img">                                <% if ( !!data.dsp_source ) { %>                                    <span class="dsp_source"><%= data.dsp_source %></span>                                <% } %>\t\t\t\t\t\t\t\t<a href="javascript:;" data-url="<%=data.url%>">\t\t\t\t\t\t\t\t\t<img src="<%=data.image%>"><em class="tag">\u5e7f\u544a</em>\t\t\t\t\t\t\t\t</a>\t\t\t\t\t\t\t\t<% if ($data.data.tel) { %><a class="tel" href="tel:<%=data.tel%>"></a><% } %>\t\t\t\t\t\t\t</div>',
            finalBannerTmgAd: '<a href="javascript:;" data-url="<%=data.url%>">\t                                <% if ( !!data.dsp_source ) { %>\t                                    <span class="dsp_source"><%= data.dsp_source %></span>\t                                <% } %>\t\t\t\t\t\t\t\t\t<img src="<%=data.image%>" style="max-width:100%;">\t\t\t\t\t\t\t\t\t<em class="tag">\u5e7f\u544a</em>\t\t\t\t\t\t\t\t</a>',
            detailBottom: '<div class="detail-bottom">\t\t\t\t\t\t\t\t<% if ( !!data.dsp_source ) { %>                                    <span class="dsp_source"><%= data.dsp_source %></span>                                <% } %>\t\t                        <span class="detail-bottom-close"></span>\t\t                        <a href="javascript:;" data-url="<%= data.url %>" target="_blank">\t\t                            <img src="<%= data.file %>" style="display:block!important;" />\t\t                        </a>\t                        </div>',
            implantH5: '<div class="player" style="position:relative;">\t        \t\t\t<% if ( !!data.dsp_source ) { %>                            <span class="dsp_source"><%= data.dsp_source %></span>                        <% } %>                        <div class="videoRoot">                            <iframe border="0" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" src="<%= data.iframe %>" style="width:100%; height: 100%; margin:0 auto; vertical-align: top;"></iframe>                        </div>                        <p class="toResouse h5Detail">                            <a href="javascript:;" data-url="<%= data.click %>">\u67e5\u770b\u8be6\u60c5</a>                            <span>\u5e7f\u544a</span>                        </p>                    </div>',
            gif: '<div class="player" style="position:relative;">            \t\t\t<% if ( !!data.dsp_source ) { %>                            <span class="dsp_source"><%= data.dsp_source %></span>                        <% } %>                        <div class="videoRoot">                            <img id="videoElem" src="<%+ data.file %>" width="100%" height="100%"></img>                            <i></i>                        </div>                        <p class="toResouse toResouseGif">                            <a href="javascript:;" data-url="<%= data.click %>">\u67e5\u770b\u8be6\u60c5</a>                            <span>\u5e7f\u544a</span>                        </p>                    </div>',
            videoPlayer: '<div class="player" style="position:relative;">            \t\t\t\t<% if ( !!data.dsp_source ) { %>\t                            <span class="dsp_source"><%= data.dsp_source %></span>\t                        <% } %>            \t\t\t\t<% if(data.android && data.version <= 4.0) { %>\t                            <div class="video_tvp_link">\t                                <div class="video-poster" style="background-image: url(<%= data.image %>); background-color: rgb(0, 0, 0); width: 320px; height: 160px; background-position: 50% 50%; background-size: 100%; background-repeat: no-repeat;">\t                                    <a style="width:100%;height:100%;display:block" class="tvp_mp4_link" href="<%= data.video %>" target="_blank">\t                                    </a>\t                                </div>\t                                <a class="player_control" href="<%= data.video %>" target="_blank">\t                                    <span class="playBtn"><b class="state_play"></b></span>\t                                </a>\t                            </div>\t                            <p class="toResouse toResouseGif">\t                                <a href="javascript:;" data-url="<%= data.click %>">\u67e5\u770b\u8be6\u60c5</a>\t                                <span>\u5e7f\u544a</span>\t                            </p>\t                        </div>\t\t                    <% } else { %>\t\t                        <div class="player">\t\t                            <div class="videoRoot">\t\t                                <video id="videoElem" controls="controls" poster="<%= data.image %>" src="<%= data.video %>" width="100%" height="100%" webkit-playsinline x-webkit-airplay="true"></video>\t\t                            </div>\t\t                            <p class="toResouse toResouseVideo">\t\t                                <a href="javascript:;" data-url="<%= data.click %>">\u67e5\u770b\u8be6\u60c5</a>\t\t                                <span>\u5e7f\u544a</span>\t\t                            </p>\t\t                    <% } %>                    \t</div>',
            homeBannerTextAd: '<a href="javascript:;" data-url="<%=data.url%>"><%=data.text%></a>',
            channelInfoFlowTextAd: '<a href="javascript:;" data-url="<%=data.url%>"><span class="generalize_label"><%= getAdLabelText(data.adPId)%> | </span><%=data.text%></a>',
            noContaineriframeAd: '<iframe style="width:100%; margin:0 auto; vertical-align: top;" frameborder="0" marginwidth="0" marginheight="0" margin="0 auto;" scrolling="no" src="<%=data.iframe%>"></iframe>',
            hasContaineriframeAd: '<div><iframe style="width:100%; margin:0 auto; vertical-align: top;" frameborder="0" marginwidth="0" marginheight="0" margin="0 auto;" scrolling="no" src="<%=data.iframe%>"></iframe></div>',
            carChannelLocalMarketInfoFlowAd: '<a href="javascript:;" data-url="<%=data.url%>" class="h4 info-flow-money"><span class="generalize_label">\u5e7f\u544a |</span><%=data.text%><i class="i iT iT1"></i></a>',
            carChannelDoublePicAd: '<ul class="doublePic">\t\t\t\t\t\t\t\t\t\t<li data-msohu-money="true"><a href="javascript:;" data-url="<%=data[0].adInfo.url%>"><img alt="<%=data[0].adInfo.text%>" src="<%=data[0].adInfo.image%>"><span class="layer-txt"><%=data[0].adInfo.text%></span></a></li>\t\t\t\t\t\t\t\t\t\t<li data-msohu-money="true"><a href="javascript:;" data-url="<%=data[1].adInfo.url%>"><img alt="<%=data[1].adInfo.text%>" src="<%=data[1].adInfo.image%>"><span class="layer-txt"><%=data[1].adInfo.text%></span></a></li>\t\t\t\t\t\t\t\t\t</ul>',
            homeNewsTextAd: '<div class="h4WP"><a href="javascript:;" data-url="<%=data.url%>" class="h4 info-flow-money"><span class="generalize_label"><%= getAdLabelText(data.adPId)%> | </span><%=data.text%><i class="i iT iT1"></i></a></div>',
            topBannerAd: '<div><a href="javascript:;" data-url="<%=data.url%>"><img src="<%=data.image%>" ></a></div>',
            textAd: '<div><a href="javascript:;" data-url="<%=data.url%>"><span class="generalize_label"><%= getAdLabelText(data.adPId)%> | </span><%=data.text%></a></div>',
            hotPoint: '<a href="javascript:;" data-url="<%=data.url%>"><i class="img"><img src="<%=data.image%>" width="143" height="131" /></i><p class="des"><%=data.text%></p></a>',
            finalPicText: '<div class="pictextPhone">\t\t\t\t\t\t\t\t<a href="javascript:;" data-url="<%=data.url%>">\t                                <div class="pic">\t\t                                <% if ( !!data.dsp_source ) { %>\t\t                                    <span class="dsp_source"><%= data.dsp_source %></span>\t\t                                <% } %>\t                                \t<img src="<%=data.image%>" alt="\u5e7f\u544a">\t                                </div>\t                                <div class="textInfo">\t                                    <p class="text"><%=data.text%></p>\t                                </div>\t\t\t\t\t\t\t\t\t<div class="toSource">\t\t\t\t\t\t\t\t\t\t<p class="source">\u5e7f\u544a</p>\t\t\t\t\t\t\t\t\t</div>\t                            </a>\t                            <% if ($data.data.tel) { %>\t                            \t<a class="tel" href="tel:<%=data.tel%>">\u62e8\u6253\u7535\u8bdd</a>\t                            <% } %>                            </div>',
            zhiboChannel: '<p class="info-ad"><span class="info-ad-line"></span><span class="info-ad-content"><b><img src="<%=data.image%>"><i></i></b></span></p>',
            elementDom: '<li class="message-wrapper" data-type="ad">\t\t\t\t\t\t\t<div class="message">\t\t\t\t\t\t\t\t<div class="msg-cnt">\t\t\t\t\t\t\t\t\t<div class="compere">\t\t\t\t\t\t\t\t\t\t<header class="title">\t\t\t\t\t\t\t\t\t\t\t<span>\u641c\u72d0\u63a8\u5e7f\uff1a</span>\t\t\t\t\t\t\t\t\t\t</header>\t\t\t\t\t\t\t\t\t\t<p class="cnt"><%= data.text %></p>\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t<div class="cnt-module">\t\t\t\t\t\t\t\t\t\t<div class="figure">\t\t\t\t\t\t\t\t\t\t\t<div class="pic">\t\t\t\t\t\t\t\t\t\t\t\t<a class="adImg" href="javascript:;" data-url="<%=data.url%>"><img src="<%=data.image%>"></a>\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t<b></b>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</li>',
            adTalkStreamDom: '<li class="message-wrapper left-msg" data-type="talkAd">\t\t\t\t\t\t\t\t\t<div class="message">\t\t\t\t\t\t\t\t\t\t<div class="msg-publisher">\t\t\t\t\t\t\t\t\t\t\t<a href="javascript:;" class="avatar" style="background-image: url(//s7.rr.itc.cn/org/wapChange/20141_30_14/b9koeg66314926520.jpg)">\t\t\t\t\t\t\t\t\t\t\t<img src="//s7.rr.itc.cn/org/wapChange/20141_30_14/b9koeg66314926520.jpg" alt="">\t\t\t\t\t\t\t\t\t\t\t</a>\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t<div class="msg-cnt-wrapper">\t\t\t\t\t\t\t\t\t\t\t<div class="talk-msg-item">\t\t\t\t\t\t\t\t\t\t\t\t<div class="msg-cnt">\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="compere">\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="compere">\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<header class="title">\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\u641c\u72d0\u63a8\u5e7f\uff1a</span>\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</header>\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p class="cnt"><%= data.text %></p>\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="cnt-module">\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="figure">\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="pic">\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a class="adImg" href="javascript:;" data-url="<%=data.url%>"><img src="<%=data.image%>"></a>\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t</li>',
            billBanner: '<div class="bill-banner">                            <a href="javascript:;" data-url="<%=data.url%>">                                <img src="<%=data.image%>" alt="">                                <span class="tag-wp">                                    <em class="tag">\u5e7f\u544a</em>                                </span>                            </a>                        </div>',
            billBigBanner: '<div class="news-item news-item-img-big news-item-img-big-bill">\t\t\t                    <a href="javascript:;" data-url="<%=data.url%>">\t\t\t                    \t<% if ( data.text ) { %>\t\t\t                    \t\t<span class="title"><%= data.text %></span>\t\t\t                    \t<% } %>\t\t\t                        <span class="img-wp">\t\t                                <% if ( !!data.dsp_source ) { %>\t\t                                    <span class="dsp_source"><%= data.dsp_source %></span>\t\t                                <% } %>\t\t\t                            <img src="<%=data.image%>" alt="">\t\t\t                        </span>\t\t\t                        <span class="tag-wp">\t\t\t                            <em class="tag">\u5e7f\u544a</em>\t\t\t                        </span>\t\t\t                    </a>\t\t\t                </div>',
            billText: '<div class="news-item news-item-img-no news-item-img-no-bill">                        <a href="javascript:;" data-url="<%=data.url%>">                            <span class="title"><%= data.text %></span>                            <span class="tag-wp">                                <em class="tag">\u5e7f\u544a</em>                            </span>                        </a>                       </div>',
            billGraphicMix: '<div class="news-item news-item-img-sm">\t\t\t                    <a href="javascript:;" data-url="<%=data.url%>">\t\t\t                        <span class="img-wp">\t\t                                <% if ( !!data.dsp_source ) { %>\t\t                                    <span class="dsp_source"><%= data.dsp_source %></span>\t\t                                <% } %>\t\t\t                            <img src="<%=data.image%>" alt="<%= data.text %>">\t\t\t                        </span>\t\t\t                        <span class="title"><%= data.text %></span>\t\t\t                        <span class="tag-wp">\t\t\t                            <em class="tag">\u5e7f\u544a</em>\t\t\t                        </span>\t\t\t                    </a>\t\t\t                </div>'
        },
        H = {
            focusMap: "topic-item",
            adBanner: "adbanner",
            adInfoFlow: "it",
            adChannelNewsFlow: "itNewsFlowMoney",
            adNewsFlow: "feed feed_full feed_money",
            readAdBookFlow: "picMoney",
            homeBannerImgAd: "home_banner_img",
            homeBannerTextAd: "home_banner_text",
            channelBannerImgAd: "channel_banner_img",
            channelBannerTextAd: "channel_banner_text",
            finalBannerTmgAd: "channel_banner_img",
            carChannelDoublePicAd: "",
            iframeAd: "",
            homeNewsTextAd: "",
            topBannerAd: "topBannerAd",
            graphicMixe: "graphicMixe"
        };
    MSOHUAD.adStatisticsSend = d, MSOHUAD.renderAdAndSendStatis = g, MSOHUAD.setCommonAdStatisSend = c, MSOHUAD.handleFormalAndTestAdParam = h, MSOHUAD.adDataHandle = f, MSOHUAD.adTemplate = G, MSOHUAD.Utils = F, MSOHUAD.adDomClassName = H, "function" == typeof define && (define.amd || seajs) ? define("MSOHUAD", ["adUtils"], function() {
        return MSOHUAD
    }) : "undefined" != typeof module && module.exports && (module.exports = MSOHUAD)
}(window), function() {
    function a(a) {
        this.shareData = a || {}, this.init()
    }
    var b = window.MSOHU || (window.MSOHU = {}),
        c = b.Modules || (b.Modules = {}),
        d = window.FastClick,
        e = window.Statistics,
        f = "//s8.rr.itc.cn/org/wapChange/20161_5_11/b8v0r29602064149596.jpg",
        g = window.MSOHU_AD_DATA_CONFIG,
        h = {
            handlerUrlAndParams: function(a, b) {
                var c,
                    d = function(a) {
                        var b,
                            c = [];
                        if ("object" == typeof a && a && a !== {}) {
                            for (b in a)
                                a.hasOwnProperty(b) && c.push(b + "=" + a[b]);
                            return c.join("&")
                        }
                        if (a === {} || null === a)
                            return ""
                    };
                return c = a.indexOf("?") === -1 ? a + "?" : "?" === a.charAt(a.length - 1) ? a : a + "&", c + d(b)
            }
        };
    if (a.prototype = {
        constroctur: a,
        template: {
            sharePage: '<div class="wx-share-layer share-page-black">                            <div class="share-mask">                                <div class="share-guide"></div>                                <div class="share-slogan"></div>                            </div>                        </div>'
        },
        status: "",
        isSetShare: !1,
        animationTime: 400,
        $el: "",
        init: function() {
            this.render(), this.setStyle(), this.bindEvent(), this.setShare()
        },
        render: function() {
            var a = this.template.sharePage;
            this.$body = $("body"), this.$body.append(a), this.$el = this.$body.find(".wx-share-layer"), this.$shareMask = this.$el.find(".share-mask"), this.$shareGuide = this.$el.find(".share-guide"), this.$shareSlogan = this.$el.find(".share-slogan")
        },
        setStyle: function() {
            this.$shareMask.css("display", "none"), this.shareMaskShowClass = "share-mask-show", /ucbrowser\//i.test(window.navigator.userAgent) && (this.shareMaskShowClass = "share-mask-show-uc"), this.otherStyle && this.$el.addClass(this.otherStyle)
        },
        setPosition: function() {
            var a = window.pageYOffset || window.scrollY || document.documentElement.scrollTop,
                b = window.innerHeight || document.documentElement.clientHeight,
                c = this.$body.height();
            this.$shareMask.css("display", "none"), this.$shareMask.height(c), this.$shareGuide.css("top", a + 10 + "px"), this.$shareSlogan.css("top", a + b / 2 + "px")
        },
        setShare: function() {
            var a = (c.share, this.shareData),
                b = window.location.href,
                d = /_once_=/i.test(b) ? b.replace(/_once_=.*[^&$]/gi, function(a) {
                    return "_once_=000022_shareback_wechat_flow"
                }) : h.handlerUrlAndParams(location.href, {
                    _once_: "000022_shareback_wechat_flow"
                });
            a ? a.link = d : a = {
                title: $("head title").text(),
                desc: $('meta[name="description"]').attr("content") || "",
                link: d,
                img_url: f
            }, setWeixinShareData(a), this.isSetShare = !0
        },
        bindEvent: function() {
            d && d.attach(this.$el[0]), this.$el.on("click", ".share-mask", $.proxy(this.hide, this))
        },
        removeEvent: function() {
            this.$el.off("click")
        },
        show: function() {
            this.$body.on("touchmove", this.preventDefault),
            this.status = "showing", this.$el.css("display", "block"), this.setPosition(), this.showMask()
        },
        hide: function(a) {
            "show" === this.status && (!e || a && "A" === $(a.currentTarget).attr("tagName") || e.addStatistics("000022_close_clk"), this.status = "hiding", this.$body.off("touchmove", this.preventDefault), this.hideMask())
        },
        showMask: function() {
            var a = this,
                b = this.$shareMask,
                c = this.shareMaskShowClass;
            b.css("display", "block"), setTimeout(function() {
                b.addClass(c), setTimeout(function() {
                    a.status = "show"
                }, a.animationTime)
            }, 0)
        },
        hideMask: function() {
            var a = this,
                b = a.$shareMask,
                c = a.shareMaskShowClass;
            b.removeClass(c).addClass("share-mask-hide"), setTimeout(function() {
                b.removeClass("share-mask-hide"), b.css("display", "none"), a.status = "hide"
            }, a.animationTime)
        },
        scrollToTop: function() {
            var a = $("header.h_min").next(),
                b = a.attr("id"),
                c = 1,
                d = new RegExp("^" + g.adIdPrefix, "i");
            d.test(b) && (c = a.height() / 2 + 1), window.scrollTo(0, c)
        },
        destory: function() {
            this.removeEvent()
        },
        preventDefault: function(a) {
            a.preventDefault()
        }
    }, "function" == typeof define && (define.amd || seajs))
        define("WxShareLayer", ["Statistics"], function(b) {
            return a
        });
    else if ("undefined" != typeof module && module.exports) {
        require("Statistics");
        module.exports = a
    }
    c.WxShareLayer = a
}(), window.setWeixinShareData = function(a) {
    var b = "//res.wx.qq.com/open/js/jweixin-1.0.0.js",
        c = "//api.m.sohu.com/ng/wechat/js_sign",
        d = function() {
            var a = navigator.userAgent.toLowerCase();
            return !!/micromessenger/.test(a)
        },
        e = function(a, b) {
            var c = document.getElementsByTagName("head")[0],
                d = document.createElement("script");
            d.setAttribute("type", "text/javascript"), d.setAttribute("src", a), c.appendChild(d), d.onload = b
        },
        f = function(b) {
            wx.config({
                debug: !1,
                appId: "wx1d8cf72ef24fa4b2",
                timestamp: b.timestamp,
                nonceStr: b.nonce,
                signature: b.signature,
                jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"]
            }), wx.ready(function() {
                var b = {
                    title: a.title,
                    desc: a.desc,
                    link: a.link,
                    imgUrl: a.img_url
                };
                wx.onMenuShareAppMessage(b), wx.onMenuShareTimeline(b)
            })
        },
        g = function() {
            $.ajax({
                type: "POST",
                url: c,
                data: {
                    url: location.href
                },
                dataType: "json",
                success: function(a) {
                    f(a.data)
                }
            })
        };
    d() && e(b, g)
}, function() {
    function a(a) {
        function b(a, b) {
            var c,
                d,
                e;
            for (d in b)
                e = b[d], c = new RegExp("(" + d + "=)[^&]+", "i"), a.match(c) ? a = a.replace(c, "$1" + e) : a += a.indexOf("?") === -1 ? "?" + d + "=" + e : "&" + d + "=" + e;
            return a
        }
        function c(a, b) {
            var c;
            for (var d in b)
                c = new RegExp(d + "=" + b[d], "g"), a = a.replace(c, "");
            return a
        }
        function f(a, b) {
            var c = document.createElement("script"),
                d = document.getElementsByTagName("body")[0];
            c.setAttribute("src", a), c.onload = c.onreadystatechange = function() {
                this.readyState && "loaded" != this.readyState && "complete" != this.readyState || (b && b(), c.onload = c.onreadystatechange = null, c.parentNode.removeChild(c))
            }, d.appendChild(c)
        }
        function g(a) {
            var b = document.createElement("div");
            b.style.visibility = "hidden", b.innerHTML = '<iframe src="' + a + '" scrolling="no" width="1" height="1"></iframe>', document.body.appendChild(b), setTimeout(function() {
                b && b.parentNode && b.parentNode.removeChild(b)
            }, 5e3)
        }
        a = a || {}, this.url = a.url || document.location.href, this.title = a.title || $("title").text() || "", this.desc = a.desc || $("meta[name=description]").attr("content") || this.title, this.image = a.image || e, this.from = a.from || "\u624b\u673a\u641c\u72d0", this.newsid = a.newsid || "", this.sohupassport = a.passport || "", this.appList = {
            sinaweibo: ["kSinaWeibo", "SinaWeibo", 11, "\u65b0\u6d6a\u5fae\u535a"],
            wechatfriends: ["kWeixin", "WechatFriends", 1, "\u5fae\u4fe1\u597d\u53cb"],
            wechattimeline: ["kWeixinFriend", "WechatTimeline", "8", "\u5fae\u4fe1\u670b\u53cb\u5708"],
            qq: ["kQQ", "QQ", "4", "QQ\u597d\u53cb"],
            qzone: ["kQZone", "QZone", "3", "QQ\u7a7a\u95f4"]
        }, this.successCallback = a.successCallback || "", this.failCallback = a.failCallback || "";
        var h = {
                share: a.shareOnceCode || "000022_share_",
                shareback: a.sharebackOnceCode || "000022_shareback_"
            },
            i = navigator.userAgent.toLowerCase();
        this.device = {
            os: {
                version: 0,
                isiOS: i.indexOf("iphone") > -1 || i.indexOf("ipad") > -1 || i.indexOf("ios") > -1,
                isAndroid: i.indexOf("android") > -1 || i.indexOf("adr") > -1 || i.indexOf("linux;") > -1
            },
            browser: {
                version: 0,
                isQQ: i.indexOf("mqqbrowser/") > -1,
                isUC: i.indexOf("ucbrowser/") > -1,
                isWechat: i.indexOf("micromessenger") > -1,
                isSamsung: i.indexOf("samsungbrowser/") > -1,
                isSogou: i.indexOf("sogoumobilebrowser/") > -1,
                isPinganWifi: i.indexOf("pawifi") > -1,
                isPinganData: i.indexOf("padt") > -1,
                isBaiduBrowser: i.indexOf("baidubrowser") > -1,
                isBaiduBoxApp: i.indexOf("baiduboxapp") > -1
            }
        }, this.getVersion = function(a) {
            var b = a.split(".");
            return parseFloat(b[0] + "." + b[1])
        }, this.shareWebQzone = function() {
            var a = "//openmobile.qq.com/api/check2?page=qzshare.html&loginpage=loginindex.html&logintype=qzone",
                b = this.desc.substring(0, 200),
                c = ["title=" + encodeURIComponent(this.title), "imageUrl=" + encodeURIComponent(this.image), "desc=" + encodeURIComponent(b), "summary=" + encodeURIComponent(b), "url=" + this.url, "successUrl=" + this.url, "failUrl=" + this.url, "callbackUrl=" + this.url].join("&");
            window.location.href = a + "&" + c
        }, this.shareto = function(a) {
            var d,
                e,
                f,
                i,
                j,
                k = this,
                l = this.device,
                m = this.title,
                n = this.desc,
                o = this.image,
                p = this.from,
                q = this.newsid,
                r = this.failCallback,
                s = Date.now(),
                t = 0;
            if (d = l.browser.isUC ? b(this.url, {
                _once_: h.shareback + a + "_uc"
            }) : l.browser.isQQ ? b(this.url, {
                _once_: h.shareback + a + "_qq"
            }) : l.browser.isSogou ? b(this.url, {
                _once_: h.shareback + a + "_sogou"
            }) : b(this.url, {
                _once_: h.shareback + a
            }), "sohuwd" == a) {
                var u = "undefined" == typeof gallery ? 3 : 4;
                window.location.href = b("http://h5.t.sohu.com/feed/share", {
                    url: d,
                    id: q,
                    type: u,
                    title: m,
                    pic: o,
                    passport: this.sohupassport
                })
            } else if ("qzone" == a) {
                d = Base64.encode(d), o = Base64.encode(o), m = Base64.encode(m), n = Base64.encode(n), p = Base64.encode(p);
                var v,
                    w = {
                        android: "mqqapi://share/to_qzone?src_type=app&version=1&file_type=news&req_type=1",
                        ios: "mqqapi://share/to_fri?file_type=news&src_type=app&version=1&generalpastboard=1&shareType=1&cflag=1&objectlocation=pasteboard&callback_type=scheme&callback_name=QQ41AF4B2A&"
                    },
                    x = Date.now();
                l.os.isAndroid ? l.browser.isUC ? g(b(w.android, {
                    url: d,
                    image_url: o,
                    title: m,
                    description: n,
                    app_name: p
                })) : window.location.href = b(w.android, {
                    url: d,
                    previewimageUrl: o,
                    title: m,
                    description: n,
                    thirdAppDisplayName: p
                }) : window.location.href = b(w.ios, {
                    url: d,
                    previewimageUrl: o,
                    title: m,
                    description: n,
                    thirdAppDisplayName: p
                }), v = setTimeout(function() {
                    var a = Date.now() - x;
                    a < 1100 && k.shareWebQzone()
                }, 1e3)
            } else if ("qq" == a)
                window.location.href = b("mqqapi://share/to_fri?src_type=web&version=1&file_type=news", {
                    share_id: "1101685683",
                    title: Base64.encode(m),
                    thirdAppDisplayName: Base64.encode("\u624b\u673a\u641c\u72d0"),
                    url: Base64.encode(d)
                }), setTimeout(function() {
                    var a = Date.now() - x;
                    a < 1100 && alert("\u5206\u4eab\u5931\u8d25\uff01\u8bf7\u76f4\u63a5\u590d\u5236\u94fe\u63a5\u5e76\u6253\u5f00QQ\u8fdb\u884c\u5206\u4eab\uff01")
                }, 1e3);
            else if ("wechatfriends" == a || "wechattimeline" == a || "sinaweibo" == a)
                if (l.browser.isUC)
                    l.os.isiOS && "undefined" != typeof ucbrowser ? (a = this.appList[a][0], ucbrowser.web_share(m, m, d, a, "", " @" + p + " ", "")) : "undefined" != typeof ucweb ? (a = this.appList[a][1], ucweb.startRequest("shell.page_share", [m, m + " @" + p + " ", d, a, "", "", ""])) : console.log("UCBrowser native share bypass.");
                else if (l.browser.isQQ) {
                    o = o.replace(/^\/\//, "http://"), a = this.appList[a][2];
                    var y = {
                        url: d.replace(/^https:\/\//, "http://"),
                        title: m,
                        img_url: o,
                        to_app: a,
                        cus_txt: m + " @\u624b\u673a\u641c\u72d0 "
                    };
                    browser && browser.app && browser.app.share ? browser.app.share(y) : console.log("QQBrowser native share bypass.")
                } else if (l.browser.isSogou) {
                    var z = {
                        shareTitle: m,
                        shareContent: n,
                        shareImageUrl: o,
                        shareUrl: d,
                        shareSnapshotTab: "",
                        shareType: null
                    };
                    "wechatfriends" == a || "wechattimeline" == a ? ("wechatfriends" == a ? z.shareType = 2 : "wechattimeline" == a && (z.shareType = 4), SogouMse && SogouMse.Utility && SogouMse.Utility.shareWithInfo ? SogouMse.Utility.shareWithInfo(z) : console.log("sogouBrowser native share error."), setTimeout(function() {
                        var a = Date.now() - x;
                        a < 1100 && alert("\u5206\u4eab\u5931\u8d25\uff01\u8bf7\u76f4\u63a5\u590d\u5236\u94fe\u63a5\u5e76\u6253\u5f00\u5fae\u4fe1\u8fdb\u884c\u5206\u4eab\uff01")
                    }, 1e3)) : window.location.href = b("http://service.weibo.com/share/share.php?", {
                        title: encodeURIComponent(m),
                        url: encodeURIComponent(d),
                        appkey: "217550396",
                        pic: o,
                        ralateUid: "1934323297",
                        count: "n",
                        size: "middle"
                    })
                } else if ("wechatfriends" == a || "wechattimeline" == a)
                    if (l.browser.isBaiduBrowser)
                        d = b(this.url, {
                            _once_: h.shareback + a + "_bdbr"
                        }), l.os.isAndroid ? (i = {
                            title: m,
                            content: n,
                            imageurl: location.protocol + o,
                            landurl: d,
                            shareSource: " @\u624b\u673a\u641c\u72d0 "
                        }, e = window._flyflowNative, e && e.exec && e.exec("bd_utils", "shareWebPage", JSON.stringify(i), "")) : l.os.isiOS && (window.location.href = "bdbrowser://share");
                    else if (l.browser.isBaiduBoxApp) {
                        if (d = b(this.url, {
                            _once_: h.shareback + a + "_bdbo"
                        }), l.os.isAndroid)
                            i = {
                                mediaType: "all",
                                title: m,
                                content: n,
                                iconUrl: location.protocol + o,
                                linkUrl: d
                            }, f = {
                                obj: "Bdbox_android_utils",
                                func: "callShare",
                                args: [JSON.stringify(i), "console.log", "console.log"]
                            }, this.androidBaiduBoxAppShare(f);
                        else if (l.os.isiOS) {
                            j = [], i = {
                                title: m,
                                content: n,
                                iconUrl: location.protocol + o,
                                linkUrl: d,
                                source: " @\u624b\u673a\u641c\u72d0 "
                            }, f = {
                                options: encodeURIComponent(JSON.stringify(i)),
                                successcallback: function() {},
                                errorcallback: function() {
                                    console.log("\u5206\u4eab\u5931\u8d25\u3002")
                                }
                            };
                            for (var A in f)
                                j.push(A + "=" + f[A]);
                            window.location.href = "baiduboxapp://callShare?" + j.join("&")
                        }
                    } else {
                        d = c(d, {
                            _once_: h.shareback + a
                        }), d = b(d, {
                            shareApp: a
                        }), l.os.isiOS && l.os.version > 8 ? window.location.href = "mttbrowser://url=" + d : g("mttbrowser://url=" + d);
                        var B = function e() {
                            s += 1e3, t += 1, t < 3 ? setTimeout(e, 1e3) : Math.abs(s - Date.now()) > 600 || (d = c(d, {
                                shareApp: a
                            }), d = b(d, {
                                _once_: h.shareback + a + "_tips"
                            }), history.replaceState(null, document.title, d), r && "function" == typeof r && r())
                        };
                        setTimeout(B, 1e3)
                    }
                else
                    "sinaweibo" == a && (window.location.href = b("http://service.weibo.com/share/share.php?", {
                        title: encodeURIComponent(m),
                        url: encodeURIComponent(d),
                        appkey: "217550396",
                        pic: o,
                        ralateUid: "1934323297",
                        count: "n",
                        size: "middle"
                    }))
        }, this.androidBaiduBoxAppShare = function(a) {
            try {
                return window.prompt("BdboxApp:" + JSON.stringify(a))
            } catch (a) {
                return {
                    error: 201
                }
            }
        }, this.pinganWifiShareTo = function(a, c) {
            var d = b(this.url, {
                _once_: h.shareback + a + "_pinganwifi"
            });
            if (console.log("inter pingan wifi"), "sohuwd" === a) {
                "undefined" == typeof gallery ? 3 : 4;
                window.location.href = b("http://h5.t.sohu.com/feed/share", {
                    url: d,
                    id: this.newsid,
                    type: this.type,
                    title: this.title,
                    pic: this.image,
                    passport: this.sohupassport
                })
            } else
                window.location.href = b(c + "://", {
                    method: "sohuShare",
                    shareType: a,
                    title: Base64.encode(this.title || ""),
                    url: Base64.encode(d),
                    subtitle: Base64.encode(this.desc || ""),
                    imgurl: Base64.encode(this.image || "")
                })
        };
        var j = this;
        this.shareWechatByQQBrowser = function() {
            var a = window.location.href.match(/shareApp=(\w+)/i);
            if (a) {
                var b = a[1];
                $.isFunction(history.replaceState) && (history.replaceState(null, document.title, location.href.replace(/shareApp=wechatfriends/g, "")), history.replaceState(null, document.title, location.href.replace(/shareApp=wechattimeline/g, ""))), j.shareto(b), Statistics.addStatistics("000022_lqb")
            }
        }, this.init = function() {
            var a = this.device;
            a.browser.isQQ ? ("undefined" == typeof browser ? f("//jsapi.qq.com/get?api=app.setShareInfo,app.share", function() {
                j.shareWechatByQQBrowser()
            }) : j.shareWechatByQQBrowser(), a.browser.version = this.getVersion(i.split("mqqbrowser/")[1])) : a.browser.isUC && (a.browser.version = this.getVersion(i.split("ucbrowser/")[1])), a.os.isiOS && (a.os.version = parseInt(i.match(/\s*os\s*\d\d?/gi)[0].split(" ")[2], 10))
        }, this.init();
        for (var k = $(".sns"), l = 0; l < k.length; l++)
            $(k[l]).on("click", function(a) {
                var b = $(this).attr("data-app");
                if (j.device.browser.isUC ? Statistics.addStatistics(h.share + b + "_uc") : j.device.browser.isQQ ? Statistics.addStatistics(h.share + b + "_qq") : j.device.browser.isSogou ? Statistics.addStatistics(h.share + b + "_sogou") : j.device.browser.isBaiduBrowser ? Statistics.addStatistics(h.share + b + "_bdbr") : j.device.browser.isBaiduBoxApp ? Statistics.addStatistics(h.share + b + "_bdbo") : Statistics.addStatistics(h.share + b), j.device.browser.isUC) {
                    var c = d.shareMaskView || {
                        ucHide: function() {}
                    };
                    c.ucHide(a), setTimeout(function() {
                        j.shareto(b)
                    }, 500)
                } else
                    j.device.browser.isPinganWifi ? j.pinganWifiShareTo(b, "pawifishare") : j.device.browser.isPinganData ? j.pinganWifiShareTo(b, "padatashare") : j.shareto(b)
            });
        return this
    }
    var b = window.MSOHU || (window.MSOHU = {}),
        c = b.Modules || (b.Modules = {}),
        d = b.Views || (b.Views = {}),
        e = "//s8.rr.itc.cn/org/wapChange/20161_5_11/b8v0r29602064149596.jpg";
    "function" == typeof define && (define.amd || seajs) ? define("share", [""], function(a) {
        return a
    }) : "undefined" != typeof module && module.exports && (module.exports = a), c.share = a
}(), function() {
    var a = window.MSOHU || (window.MSOHU = {}),
        b = a.Helpers || (a.Helpers = {});
    b.sliceString = function(a, b, c, d) {
        return b = b || 0, c = c || 6, "[object String]" !== Object.prototype.toString.call(a) || "[object Number]" !== Object.prototype.toString.call(b) || "[object Number]" !== Object.prototype.toString.call(c) ? a : a.length > c ? d ? a.substr(b, c) : a.substr(b, c) + "..." : a
    }, b.sliceStringByByte = function(a, b) {
        var c,
            d,
            e = 0,
            f = "";
        b = b || 20;
        for (var g = 0; g < a.length; g++) {
            if (c = a.charAt(g), d = a.charCodeAt(g), e += null != c.match(/[^\x00-\xff]/gi) || 65 <= d && d <= 90 ? 2 : 1, !(e <= 20)) {
                f += "...";
                break
            }
            f += c
        }
        return f
    }, b.getQueryArgValue = function(a, b) {
        var c = new RegExp("\\b" + b + "=([^&]*)\\b"),
            d = c.exec(a);
        return d ? decodeURIComponent(d[1]) : null
    }, b.addQueryArgs = function(a, b) {
        var c,
            d,
            e;
        for (d in b)
            e = b[d], c = new RegExp("(" + d + "=)[^&]+", "i"), a.match(c) ? a = a.replace(c, "$1" + e) : a += a.indexOf("?") === -1 ? "?" + d + "=" + e : "&" + d + "=" + e;
        return a
    }, b.removeQueryArgs = function(a, b) {
        var c;
        for (var d in b)
            c = new RegExp("((&*)" + d + "=" + b[d] + "(?=(&+)|$))", "g"), a = a.replace(c, "");
        return a
    }, b.removeQueryArgs = function(a, b) {
        var c;
        for (var d in b)
            c = new RegExp("((&*)" + d + "=" + b[d] + "(?=(&+)|$))", "g"), a = a.replace(c, "");
        return a
    }, b.proxy = function(a, b) {
        return function() {
            if ("function" == typeof a)
                return a.apply(b, arguments)
        }
    }
}(), function(a) {
    var b,
        c = window.Statistics,
        d = function(a) {
            this.timingExposeOnceCode = a.timingExposeOnceCode, this.timingExposeTimeArr = a.timingExposeTimeArr || [], void 0 !== a.maxTime && (this.maxTime = a.maxTime, Math.max.apply(null, this.timingExposeTimeArr) <= this.maxTime && this.timingExposeTimeArr.push(this.maxTime + 1e4))
        };
    b = d.prototype, b.listenTimingExpose = function(a) {
        var b,
            c,
            d = this,
            e = this.timingExposeTimeArr.length;
        if (e && (!a || "function" == typeof a))
            for (b = a || this._timingExposeCallBack, c = 0; c < e; c++)
                !function(a) {
                    b.call(d, d.timingExposeTimeArr[a])
                }(c)
    }, b._timingExposeCallBack = function(a) {
        var b = this;
        a && "number" == typeof a && setTimeout(function() {
            c.addStatistics(b._getTimingExposeOnceCode(a))
        }, a)
    }, b._getTimingExposeOnceCode = function(a) {
        var b = "";
        return !a || "number" != typeof a || a < 0 ? this.timingExposeOnceCode : (b = void 0 === this.maxTime || a <= this.maxTime ? "_" + a / 1e3 : "_" + this.maxTime / 1e3 + "+", this.timingExposeOnceCode + b)
    }, "function" == typeof define && (define.amd || seajs) ? define("TimingExpose", [], function() {
        return d
    }) : "undefined" != typeof module && module.exports && (module.exports = d), a.TimingExpose = d
}(window), function() {
    function a(b, c, d) {
        if (b = b || {}, "[object Object]" !== Object.prototype.toString.call(b) || Object.prototype.toString.call(b) !== Object.prototype.toString.call(c))
            return b;
        for (var e in c)
            c.hasOwnProperty(e) && ("[object Object]" === Object.prototype.toString.call(c[e]) ? a(b[e], c[e], d) : !d && b.hasOwnProperty(e) || (b[e] = c[e]));
        return b
    }
    function b(a, b, c) {
        var d = document.createElement("script");
        c = c || "utf-8", d.type = "text/javascript", d.charset = c, d.onload = d.onreadystatechange = function() {
            this.readyState && "loaded" != this.readyState && "complete" != this.readyState || (b && "function" == typeof b && b(), d.onload = d.onreadystatechange = null)
        }, d.src = a, document.getElementsByTagName("head")[0].appendChild(d)
    }
    var c = window.MSOHU || (window.MSOHU = {}),
        d = c.SohuPlayer || (c.SohuPlayer = {});
    d.embedPlayers = function(c, d) {
        var e = {
            playerContainerClass: "player",
            wrapperNode: document,
            playerOptions: {
                autoplay: !1,
                hotVideo: !0,
                infoPanel: !1,
                resolution: !1,
                mtvSrc: 10010001
            }
        };
        c = a(e, c, !0);
        var f = c.wrapperNode.querySelectorAll("." + c.playerContainerClass),
            g = f.length;
        if (g && 0 !== g) {
            CookieUtil.set("MTV_SRC", c.playerOptions.mtvSrc, null, "/", ".sohu.com");
            var h = function() {
                for (var b = [], e = 0; e < g; e++)
                    !function(d) {
                        var e = f[d],
                            g = e.getAttribute("id"),
                            h = e.getAttribute("desc").match(/[1-9][0-9]*/g)[0],
                            i = {
                                data: {
                                    vid: h,
                                    site: 1
                                }
                            };
                        i = a(i, c.playerOptions, !0);
                        var j = playerFactory.createPlayer("#" + g, i);
                        b.push(j)
                    }(e);
                "function" == typeof d && d(b)
            };
            window.playerFactory ? h() : b("//js.tv.itc.cn/m/player/inc-all.js", h)
        }
    }
}(), function(a) {
    function b() {
        var a = navigator.userAgent.toLowerCase(),
            b = 0;
        a.indexOf("windows") > -1 ? b = 1 : a.indexOf("mac") > -1 ? b = 2 : a.indexOf("linux") > -1 ? b = 3 : a.indexOf("solaris") > -1 ? b = 4 : a.indexOf("x11") > -1 && (b = 5), a.match(/AppleWebKit.*Mobile.*/) || a.match(/AppleWebKit/) ? b = 6 : a.indexOf("ios") > -1 ? b = 6 : a.indexOf("android") > -1 ? b = 7 : a.indexOf("iphone") > -1 ? b = 8 : a.indexOf("ipad") > -1 && (b = 9);
        var c = 0;
        return a.indexOf("android") > -1 ? (a.indexOf("safari") > -1 || a.indexOf("chrome") > -1) && (c = 4) : a.indexOf("mac") > -1 && a.indexOf("safari") > -1 && (c = 5), a.indexOf("mqqbrowser") > -1 ? (c = 2, a.indexOf("nettype") > -1 && (c = 1)) : a.indexOf("qq") > -1 ? c = 1 : a.indexOf("ucbrowser") > -1 ? c = 3 : a.indexOf("crios") > -1 ? c = 4 : a.indexOf("liebaofast") > -1 ? c = 6 : a.indexOf("qhbrowser") > -1 || a.indexOf("360") > -1 && a.indexOf("aphone") > -1 || a.indexOf("360browser") > -1 ? c = 7 : a.indexOf("baidubrowser") > -1 ? c = 8 : a.indexOf("baiduboxapp") > -1 ? c = 9 : a.indexOf("sogousearch") > -1 ? c = 10 : a.indexOf("sogoumobilebrowser") > -1 || a.indexOf("sogoumse") > -1 ? c = 11 : (a.indexOf("opios") > -1 || a.indexOf("opr") > -1) && (c = 12), (255 & b) << 8 | 255 & c
    }
    function c() {
        try {
            return 0 === document.documentElement.clientHeight ? document.body.clientWidth + "," + document.body.clientHeight : document.documentElement.clientWidth + "," + document.documentElement.clientHeight
        } catch (a) {}
    }
    function d(d) {
        if (!d || !d.resource)
            return {
                adInfo: null,
                sendInfo: null
            };
        var e = {};
        if ("iframe" === d.type) {
            var g = {
                    sohuurl: encodeURIComponent(a.location.href),
                    refer: encodeURIComponent(document.referrer),
                    ti: encodeURIComponent(document.title),
                    ua: encodeURIComponent(navigator.userAgent),
                    rnd: l,
                    z: md5(Math.random()).substring(9, 25),
                    ssi0: b(),
                    bs: c()
                },
                h = f(p.adProtocolHandler(d.resource.base_url, d.adid), g);
            e.id = d.resource.id, e.iframe = h
        }
        var i = {
            rnd: l
        };
        return {
            adInfo: e,
            sendInfo: i
        }
    }
    function e(b) {
        var c = (a.location.hostname, {}),
            d = r + "/ask/?",
            e = CookieUtil.get("duid"),
            f = {
                id: b.formalApId || "111111"
            },
            g = function() {
                return "callback=sougou_ad_callback" + Math.random().toString().substring(2, 15)
            };
        return e && (f.duid = e), c.baseUrl = d, c.baseData = f, c.statisticsCode = b.statisticsCode, c.adTemplate = b.adTemplate, c.insertAdDom = b.insterAdDom, c.className = b.adDomClassName || "", c.successCallBack = b.successCallBack, c.insertSuccessCallBack = b.insertSuccessCallBack, c.errorCallBack = b.errorCallBack, c.statisAdValidExposure = b.statisAdValidExposure, c.url = c.baseUrl + g(), c
    }
    function f(b, c) {
        var d,
            e = function(a) {
                var b,
                    c = [];
                if ("object" == typeof a && a && a !== {}) {
                    for (b in a)
                        a.hasOwnProperty(b) && c.push(b + "=" + a[b]);
                    return c.join("&")
                }
                if (a === {} || null === a)
                    return ""
            };
        return d = b.indexOf("?") === -1 ? b + "?" : "?" === b.charAt(b.length - 1) ? b : b + "&", d = a.https_go ? d.replace(/^(\/\/|http:\/\/)/, "https://") : d.replace(/^http:\/\//, "//"), d + e(c)
    }
    function g(a, b, c, d) {
        function e() {
            b.z = md5(Math.random()), k.addStatistics(b, g + "/imps?"), k.addStatistics(d.exposureCode)
        }
        var f = a,
            g = r,
            h = c.querySelector("iframe");
        return b.id = f, h.style.height = "75px", h.style.marginBottom = "10px", c.className.indexOf("news-item") >= 0 && (h.style.height = "81px"), {
            sendAVStatis: e
        }
    }
    function h(a) {
        var b = a.adData,
            c = a.adSpaceID,
            d = a.statisticsCode,
            e = a.containerObj,
            f = (a.targetObj, a.targetObjIsWant),
            h = a.isSendStatisFn,
            i = a.statisAdValidExposure;
        void 0 === f && (f = !0);
        var j = g(c, b, e, d);
        if (q) {
            var k;
            k = i ? function() {
                j.sendAVStatis()
            } : j.sendAVStatis, q.add({
                dom: e,
                callback: k,
                otherJudgeMethod: h
            }).once()
        } else
            j.sendAVStatis()
    }
    function i(a) {
        if (a.formalApId) {
            var b = e(a),
                c = (b.type, b.url),
                f = b.baseData.id,
                g = b.baseData,
                i = b.statisticsCode,
                l = (b.adTemplate, b.className),
                m = b.insertAdDom,
                n = b.successCallBack,
                o = b.insertSuccessCallBack,
                p = b.errorCallBack,
                q = !1,
                r = f;
            new Jsonp({
                url: c,
                data: g,
                time: MSOHU_AD_DATA_CONFIG.adTimeout,
                success: function(a) {
                    var b,
                        c,
                        e,
                        g = d(a[0]),
                        p = !1;
                    if (a && a.length > 0 && "iframe" === a[0].type && (p = !0), !q) {
                        if (k.addStatistics(i.loadCode), g && g.adInfo && g.sendInfo) {
                            var s = {
                                data: g.adInfo
                            };
                            if (p) {
                                var t = template.compile(j.adTemplate.hasContaineriframeAd);
                                b = j.Utils.transformHtmlToDom(t(s))[0], b.id = "sougou_" + r, j.Utils.addClass(b, l), b.setAttribute("data-msohu-money", "true")
                            }
                            m && m(b, g), o && o(), adParam = g ? g.sendInfo : null, c = b, e = b, h({
                                adData: adParam,
                                adSpaceID: f,
                                statisticsCode: i,
                                containerObj: c,
                                targetObj: e
                            }), k.addStatistics(i.consumeCode)
                        } else
                            b = document.getElementById(r), c = null, e = null;
                        n && n()
                    }
                },
                error: function() {
                    q = !0, p && p()
                },
                timeout: function() {
                    q = !0, p && p()
                }
            })
        }
    }
    a.SOUGOUAD = {};
    var j = a.MSOHUAD || (a.MSOHUAD = {}),
        k = a.Statistics,
        l = md5(Math.random()).substring(9, 25),
        m = a.navigator.userAgent,
        n = (/Android/i.test(navigator.userAgent), m.match(/(iPad|iPhone|iPod)[\w\s]*;(?:[\w\s]+;)*[\w\s]+(?:iPad|iPhone|iPod)?\sOS\s([\d_\.]+)/i)),
        o = /WebKit\/[\d.]+/i.test(m),
        p = (!!n && (navigator.standalone ? o : /Safari/i.test(m) && !/CriOS/i.test(m) && !/MQQBrowser/i.test(m)), MSOHU.AD.utils),
        q = j.moneyExposureStatis || (j.moneyExposureStatis = new NewExposureStatis),
        r = "https://wuliao.epro.sogou.com";
    SOUGOUAD.renderAdAndSendStatis = i
}(window), function(a) {
    var b = a.MSOHU_AD_DATA_CONFIG,
        c = b.adps_type,
        d = {
            "\u65b0\u95fb": {
                bannerAdData: [{
                    type: 8,
                    itemspaceid: 12444,
                    itemspaceidTest: "",
                    max_turn: 8,
                    adps: c.banner
                }, {
                    type: 8,
                    itemspaceid: 12296,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.bannerHigher
                }],
                textAdData: [{
                    type: 8,
                    itemspaceid: 12298,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.text
                }],
                fluidAdData: [{
                    ad_type: "jzl"
                }, {
                    type: 7,
                    itemspaceid: 13243,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13569,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13583,
                    itemspaceidTest: 14321,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixeJD"
                }, {
                    type: 7,
                    itemspaceid: 13778,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13907,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: "13282,13305",
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.text,
                    ad_type: "text"
                }, {
                    type: 7,
                    itemspaceid: 13777,
                    itemspaceidTest: 12859,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 625760,
                    ad_type: "graphicMixeSogou"
                }, {
                    type: 7,
                    itemspaceid: 13809,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13810,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 14829,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 12445,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.bigBanner,
                    ad_type: "bigBanner"
                }],
                autoLoadAdData: [{
                    type: 7,
                    itemspaceid: 14970,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 14986,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 15002,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }]
            },
            "\u8d22\u7ecf": {
                bannerAdData: [{
                    type: 8,
                    itemspaceid: 12446,
                    itemspaceidTest: "",
                    max_turn: 8,
                    adps: c.banner
                }, {
                    type: 8,
                    itemspaceid: 12302,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.bannerHigher
                }],
                textAdData: [{
                    type: 8,
                    itemspaceid: 12304,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.text
                }],
                fluidAdData: [{
                    type: 7,
                    itemspaceid: 13244,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13570,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13584,
                    itemspaceidTest: 14321,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixeJD"
                }, {
                    type: 7,
                    itemspaceid: 13756,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13896,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: "13285,13306",
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.text,
                    ad_type: "text"
                }, {
                    type: 7,
                    itemspaceid: 13755,
                    itemspaceidTest: 12859,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 625760,
                    ad_type: "graphicMixeSogou"
                }, {
                    type: 7,
                    itemspaceid: 13787,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13788,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 14830,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 12447,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.bigBanner,
                    ad_type: "bigBanner"
                }],
                autoLoadAdData: [{
                    type: 7,
                    itemspaceid: 14971,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 14987,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 15003,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }]
            },
            "\u5a31\u4e50": {
                bannerAdData: [{
                    type: 8,
                    itemspaceid: 12450,
                    itemspaceidTest: "",
                    max_turn: 8,
                    adps: c.banner
                }, {
                    type: 8,
                    itemspaceid: 12314,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.bannerHigher
                }],
                textAdData: [{
                    type: 8,
                    itemspaceid: 12316,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.text
                }],
                fluidAdData: [{
                    type: 7,
                    itemspaceid: 13246,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13572,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13586,
                    itemspaceidTest: 14321,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixeJD"
                }, {
                    type: 7,
                    itemspaceid: 13782,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13909,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: "13289,13310",
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.text,
                    ad_type: "text"
                }, {
                    type: 7,
                    itemspaceid: 13781,
                    itemspaceidTest: 12859,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 625760,
                    ad_type: "graphicMixeSogou"
                }, {
                    type: 7,
                    itemspaceid: 13813,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13814,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 14832,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 12451,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.bigBanner,
                    ad_type: "bigBanner"
                }],
                autoLoadAdData: [{
                    type: 7,
                    itemspaceid: 14973,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 14989,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 15005,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }]
            },
            "\u4f53\u80b2": {
                bannerAdData: [{
                    type: 8,
                    itemspaceid: 12448,
                    itemspaceidTest: "",
                    max_turn: 8,
                    adps: c.banner
                }, {
                    type: 8,
                    itemspaceid: 12308,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.bannerHigher
                }],
                textAdData: [{
                    type: 8,
                    itemspaceid: 12310,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.text
                }],
                fluidAdData: [{
                    type: 7,
                    itemspaceid: 13245,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13571,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13585,
                    itemspaceidTest: 14321,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixeJD"
                }, {
                    type: 7,
                    itemspaceid: 13774,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13905,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: "13287,13308",
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.text,
                    ad_type: "text"
                }, {
                    type: 7,
                    itemspaceid: 13773,
                    itemspaceidTest: 12859,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 625760,
                    ad_type: "graphicMixeSogou"
                }, {
                    type: 7,
                    itemspaceid: 13805,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13806,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 14831,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 12449,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.bigBanner,
                    ad_type: "bigBanner"
                }],
                autoLoadAdData: [{
                    type: 7,
                    itemspaceid: 14972,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 14988,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 15004,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }]
            },
            "\u519b\u4e8b": {
                bannerAdData: [{
                    type: 8,
                    itemspaceid: 12454,
                    itemspaceidTest: "",
                    max_turn: 8,
                    adps: c.banner
                }, {
                    type: 8,
                    itemspaceid: 12325,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.bannerHigher
                }],
                textAdData: [{
                    type: 8,
                    itemspaceid: 12326,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.text
                }],
                fluidAdData: [{
                    type: 7,
                    itemspaceid: 13248,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13574,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13588,
                    itemspaceidTest: 14321,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixeJD"
                }, {
                    type: 7,
                    itemspaceid: 13762,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13899,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: "13291,13314",
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.text,
                    ad_type: "text"
                }, {
                    type: 7,
                    itemspaceid: 13761,
                    itemspaceidTest: 12859,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 625760,
                    ad_type: "graphicMixeSogou"
                }, {
                    type: 7,
                    itemspaceid: 13793,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13794,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 14834,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 12455,
                    itemspaceidTest: 12575,
                    max_turn: 2,
                    adps: c.bigBanner,
                    ad_type: "bigBanner"
                }],
                autoLoadAdData: [{
                    type: 7,
                    itemspaceid: 14975,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 14991,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 15007,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }]
            },
            "\u65f6\u5c1a": {
                bannerAdData: [{
                    type: 8,
                    itemspaceid: 12452,
                    itemspaceidTest: "",
                    max_turn: 8,
                    adps: c.banner
                }, {
                    type: 8,
                    itemspaceid: 12319,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.bannerHigher
                }],
                textAdData: [{
                    type: 8,
                    itemspaceid: 12320,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.text
                }],
                fluidAdData: [{
                    type: 7,
                    itemspaceid: 13249,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13575,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13589,
                    itemspaceidTest: 14321,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixeJD"
                }, {
                    type: 7,
                    itemspaceid: 13772,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13904,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: "13292,13315",
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.text,
                    ad_type: "text"
                }, {
                    type: 7,
                    itemspaceid: 13771,
                    itemspaceidTest: 12859,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 625760,
                    ad_type: "graphicMixeSogou"
                }, {
                    type: 7,
                    itemspaceid: 13803,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13804,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 14835,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 12453,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.bigBanner,
                    ad_type: "bigBanner"
                }],
                autoLoadAdData: [{
                    type: 7,
                    itemspaceid: 14976,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 14992,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 15008,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }]
            },
            "\u6c7d\u8f66": {
                bannerAdData: [{
                    type: 8,
                    itemspaceid: 12477,
                    itemspaceidTest: "",
                    max_turn: 8,
                    adps: c.banner
                }, {
                    type: 8,
                    itemspaceid: 12333,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.bannerHigher
                }],
                textAdData: [{
                    type: 8,
                    itemspaceid: 12334,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.text
                }],
                fluidAdData: [{
                    type: 7,
                    itemspaceid: 13247,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13573,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13587,
                    itemspaceidTest: 14321,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixeJD"
                }, {
                    type: 7,
                    itemspaceid: 13770,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13903,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: "13290,13313",
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.text,
                    ad_type: "text"
                }, {
                    type: 7,
                    itemspaceid: 13769,
                    itemspaceidTest: 12859,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 625760,
                    ad_type: "graphicMixeSogou"
                }, {
                    type: 7,
                    itemspaceid: 13801,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13802,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 14833,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 12478,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.bigBanner,
                    ad_type: "bigBanner"
                }],
                autoLoadAdData: [{
                    type: 7,
                    itemspaceid: 14974,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 14990,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 15006,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }]
            },
            "\u79d1\u6280": {
                bannerAdData: [{
                    type: 8,
                    itemspaceid: 12462,
                    itemspaceidTest: "",
                    max_turn: 8,
                    adps: c.banner
                }, {
                    type: 8,
                    itemspaceid: 12464,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.bannerHigher
                }],
                textAdData: [{
                    type: 8,
                    itemspaceid: 12465,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.text
                }],
                fluidAdData: [{
                    type: 7,
                    itemspaceid: 13253,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13579,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13593,
                    itemspaceidTest: 14321,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixeJD"
                }, {
                    type: 7,
                    itemspaceid: 13754,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13895,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: "13299,13320",
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.text,
                    ad_type: "text"
                }, {
                    type: 7,
                    itemspaceid: 13753,
                    itemspaceidTest: 12859,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 625760,
                    ad_type: "graphicMixeSogou"
                }, {
                    type: 7,
                    itemspaceid: 13785,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13786,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 14839,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 12463,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.bigBanner,
                    ad_type: "bigBanner"
                }],
                autoLoadAdData: [{
                    type: 7,
                    itemspaceid: 14980,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 14996,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 15012,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }]
            },
            "\u5386\u53f2": {
                bannerAdData: [{
                    type: 8,
                    itemspaceid: 12456,
                    itemspaceidTest: "",
                    max_turn: 8,
                    adps: c.banner
                }, {
                    type: 8,
                    itemspaceid: 12335,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.bannerHigher
                }],
                textAdData: [{
                    type: 8,
                    itemspaceid: 12336,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.text
                }],
                fluidAdData: [{
                    type: 7,
                    itemspaceid: 13280,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13581,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13595,
                    itemspaceidTest: 14321,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixeJD"
                }, {
                    type: 7,
                    itemspaceid: 13764,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13900,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: "13303,13324",
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.text,
                    ad_type: "text"
                }, {
                    type: 7,
                    itemspaceid: 13763,
                    itemspaceidTest: 12859,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 625760,
                    ad_type: "graphicMixeSogou"
                }, {
                    type: 7,
                    itemspaceid: 13795,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13796,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 14841,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 12457,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.bigBanner,
                    ad_type: "bigBanner"
                }],
                autoLoadAdData: [{
                    type: 7,
                    itemspaceid: 14982,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 14998,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 15014,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }]
            },
            "\u661f\u5ea7": {
                bannerAdData: [{
                    type: 8,
                    itemspaceid: 13682,
                    itemspaceidTest: "",
                    max_turn: 8,
                    adps: c.banner
                }, {
                    type: 8,
                    itemspaceid: 13678,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.bannerHigher
                }],
                textAdData: [{
                    type: 8,
                    itemspaceid: 13679,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.text
                }],
                fluidAdData: [{
                    type: 7,
                    itemspaceid: 13683,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13684,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13685,
                    itemspaceidTest: 14321,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixeJD"
                }, {
                    type: 7,
                    itemspaceid: 13780,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13908,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: "13686,13687",
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.text,
                    ad_type: "text"
                }, {
                    type: 7,
                    itemspaceid: 13779,
                    itemspaceidTest: 12859,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 625760,
                    ad_type: "graphicMixeSogou"
                }, {
                    type: 7,
                    itemspaceid: 13811,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13812,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 14843,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13681,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.bigBanner,
                    ad_type: "bigBanner"
                }],
                autoLoadAdData: [{
                    type: 7,
                    itemspaceid: 14984,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 15e3,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 15016,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }]
            },
            "\u65c5\u6e38": {
                bannerAdData: [{
                    type: 8,
                    itemspaceid: 13044,
                    itemspaceidTest: "",
                    max_turn: 8,
                    adps: c.banner
                }, {
                    type: 8,
                    itemspaceid: 13046,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.bannerHigher
                }],
                textAdData: [{
                    type: 8,
                    itemspaceid: 13047,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.text
                }],
                fluidAdData: [{
                    type: 7,
                    itemspaceid: 13250,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13576,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13590,
                    itemspaceidTest: 14321,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixeJD"
                }, {
                    type: 7,
                    itemspaceid: 13766,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13901,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: "13294,13316",
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.text,
                    ad_type: "text"
                }, {
                    type: 7,
                    itemspaceid: 13765,
                    itemspaceidTest: 12859,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 625760,
                    ad_type: "graphicMixeSogou"
                }, {
                    type: 7,
                    itemspaceid: 13797,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13798,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 14836,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13045,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.bigBanner,
                    ad_type: "bigBanner"
                }],
                autoLoadAdData: [{
                    type: 7,
                    itemspaceid: 14977,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 14993,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 15009,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }]
            },
            "\u5065\u5eb7": {
                bannerAdData: [{
                    type: 8,
                    itemspaceid: 13048,
                    itemspaceidTest: "",
                    max_turn: 8,
                    adps: c.banner
                }, {
                    type: 8,
                    itemspaceid: 13050,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.bannerHigher
                }],
                textAdData: [{
                    type: 8,
                    itemspaceid: 13051,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.text
                }],
                fluidAdData: [{
                    type: 7,
                    itemspaceid: 13251,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13577,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13591,
                    itemspaceidTest: 14321,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixeJD"
                }, {
                    type: 7,
                    itemspaceid: 13758,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13897,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: "13296,13317",
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.text,
                    ad_type: "text"
                }, {
                    type: 7,
                    itemspaceid: 13757,
                    itemspaceidTest: 12859,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 625760,
                    ad_type: "graphicMixeSogou"
                }, {
                    type: 7,
                    itemspaceid: 13789,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13790,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 14837,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13049,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.bigBanner,
                    ad_type: "bigBanner"
                }],
                autoLoadAdData: [{
                    type: 7,
                    itemspaceid: 14978,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 14994,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 15010,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }]
            },
            "\u7f8e\u98df": {
                bannerAdData: [{
                    type: 8,
                    itemspaceid: 13052,
                    itemspaceidTest: "",
                    max_turn: 8,
                    adps: c.banner
                }, {
                    type: 8,
                    itemspaceid: 13054,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.bannerHigher
                }],
                textAdData: [{
                    type: 8,
                    itemspaceid: 13055,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.text
                }],
                fluidAdData: [{
                    type: 7,
                    itemspaceid: 13252,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13578,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13592,
                    itemspaceidTest: 14321,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixeJD"
                }, {
                    type: 7,
                    itemspaceid: 13768,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13902,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: "13297,13318",
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.text,
                    ad_type: "text"
                }, {
                    type: 7,
                    itemspaceid: 13767,
                    itemspaceidTest: 12859,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 625760,
                    ad_type: "graphicMixeSogou"
                }, {
                    type: 7,
                    itemspaceid: 13799,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13800,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 14838,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13053,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.bigBanner,
                    ad_type: "bigBanner"
                }],
                autoLoadAdData: [{
                    type: 7,
                    itemspaceid: 14979,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 14995,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 15011,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }]
            },
            "\u6559\u80b2": {
                bannerAdData: [{
                    type: 8,
                    itemspaceid: 13056,
                    itemspaceidTest: "",
                    max_turn: 8,
                    adps: c.banner
                }, {
                    type: 8,
                    itemspaceid: 13058,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.bannerHigher
                }],
                textAdData: [{
                    type: 8,
                    itemspaceid: 13059,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.text
                }],
                fluidAdData: [{
                    type: 7,
                    itemspaceid: 13254,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13580,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13594,
                    itemspaceidTest: 14321,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixeJD"
                }, {
                    type: 7,
                    itemspaceid: 13760,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13898,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: "13300,13321",
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.text,
                    ad_type: "text"
                }, {
                    type: 7,
                    itemspaceid: 13759,
                    itemspaceidTest: 12859,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 625760,
                    ad_type: "graphicMixeSogou"
                }, {
                    type: 7,
                    itemspaceid: 13791,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13792,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 14840,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13057,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.bigBanner,
                    ad_type: "bigBanner"
                }],
                autoLoadAdData: [{
                    type: 7,
                    itemspaceid: 14981,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 14997,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 15013,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }]
            },
            "\u6587\u5316\u8bfb\u4e66": {
                bannerAdData: [{
                    type: 8,
                    itemspaceid: 13508,
                    itemspaceidTest: "",
                    max_turn: 8,
                    adps: c.banner
                }, {
                    type: 8,
                    itemspaceid: 13504,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.bannerHigher
                }],
                textAdData: [{
                    type: 8,
                    itemspaceid: 13505,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.text
                }],
                fluidAdData: [{
                    type: 7,
                    itemspaceid: 13509,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13582,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13596,
                    itemspaceidTest: 14321,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixeJD"
                }, {
                    type: 7,
                    itemspaceid: 13776,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13906,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: "13510,13511",
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.text,
                    ad_type: "text"
                }, {
                    type: 7,
                    itemspaceid: 13775,
                    itemspaceidTest: 12859,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 625760,
                    ad_type: "graphicMixeSogou"
                }, {
                    type: 7,
                    itemspaceid: 13807,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13808,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 14842,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13507,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.bigBanner,
                    ad_type: "bigBanner"
                }],
                autoLoadAdData: [{
                    type: 7,
                    itemspaceid: 14983,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 14999,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 15015,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }]
            },
            "\u6bcd\u5a74": {
                bannerAdData: [{
                    type: 8,
                    itemspaceid: 14301,
                    itemspaceidTest: "",
                    max_turn: 8,
                    adps: c.banner
                }, {
                    type: 8,
                    itemspaceid: 14297,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.bannerHigher
                }],
                textAdData: [{
                    type: 8,
                    itemspaceid: 14298,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.text
                }],
                fluidAdData: [{
                    type: 7,
                    itemspaceid: 14302,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 14303,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 14304,
                    itemspaceidTest: 14321,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixeJD"
                }, {
                    type: 7,
                    itemspaceid: 14317,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 14313,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: "14305,14306",
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.text,
                    ad_type: "text"
                }, {
                    type: 7,
                    itemspaceid: 14314,
                    itemspaceidTest: 12859,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 625760,
                    ad_type: "graphicMixeSogou"
                }, {
                    type: 7,
                    itemspaceid: 14315,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 14316,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 14845,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 14300,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.bigBanner,
                    ad_type: "bigBanner"
                }],
                autoLoadAdData: [{
                    type: 7,
                    itemspaceid: 14985,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 15001,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 15017,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }]
            },
            "\u7efc\u5408": {
                bannerAdData: [{
                    type: 8,
                    itemspaceid: 12444,
                    itemspaceidTest: "",
                    max_turn: 8,
                    adps: c.banner
                }, {
                    type: 8,
                    itemspaceid: 12296,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.bannerHigher
                }],
                textAdData: [{
                    type: 8,
                    itemspaceid: 12298,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.text
                }],
                fluidAdData: [{
                    type: 7,
                    itemspaceid: 13243,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13569,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13583,
                    itemspaceidTest: 14321,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixeJD"
                }, {
                    type: 7,
                    itemspaceid: 13778,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13907,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: "13282,13305",
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.text,
                    ad_type: "text"
                }, {
                    type: 7,
                    itemspaceid: 13777,
                    itemspaceidTest: 12859,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 625760,
                    ad_type: "graphicMixeSogou"
                }, {
                    type: 7,
                    itemspaceid: 13809,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13810,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 14829,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 12445,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.bigBanner,
                    ad_type: "bigBanner"
                }],
                autoLoadAdData: [{
                    type: 7,
                    itemspaceid: 14970,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 14986,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 15002,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }]
            },
            "\u7b11\u8bdd": {
                bannerAdData: [{
                    type: 8,
                    itemspaceid: 12460,
                    itemspaceidTest: "",
                    max_turn: 8,
                    adps: c.banner
                }, {
                    type: 8,
                    itemspaceid: 12343,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.bannerHigher
                }],
                textAdData: [{
                    type: 8,
                    itemspaceid: 12344,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.text
                }],
                fluidAdData: [{
                    type: 7,
                    itemspaceid: 13703,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixeDesc,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13704,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixeDesc,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 13705,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixeDesc,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 12461,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.bigBanner,
                    ad_type: "bigBanner"
                }]
            },
            "\u5965\u8fd0": {
                bannerAdData: [{
                    type: 8,
                    itemspaceid: 14851,
                    itemspaceidTest: 14318,
                    max_turn: 8,
                    adps: c.banner
                }, {
                    type: 8,
                    itemspaceid: 14847,
                    itemspaceidTest: 14316,
                    max_turn: 2,
                    adps: c.bannerHigher
                }],
                textAdData: [{
                    type: 8,
                    itemspaceid: 14848,
                    itemspaceidTest: 14317,
                    max_turn: 2,
                    adps: c.text
                }],
                fluidAdData: [{
                    type: 7,
                    itemspaceid: 14852,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 14853,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 14854,
                    itemspaceidTest: 14321,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixeJD"
                }, {
                    type: 7,
                    itemspaceid: 14861,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 14862,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: "14855,14856",
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.text,
                    ad_type: "text"
                }, {
                    type: 7,
                    itemspaceid: 14858,
                    itemspaceidTest: 12859,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 625760,
                    ad_type: "graphicMixeSogou"
                }, {
                    type: 7,
                    itemspaceid: 14859,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 14860,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 14831,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 14850,
                    itemspaceidTest: "",
                    max_turn: 2,
                    adps: c.bigBanner,
                    ad_type: "bigBanner"
                }],
                autoLoadAdData: [{
                    type: 7,
                    itemspaceid: 14972,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 14988,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }, {
                    type: 7,
                    itemspaceid: 15004,
                    itemspaceidTest: 14339,
                    max_turn: 2,
                    adps: c.graphicMixe,
                    ad_type: "graphicMixe"
                }]
            }
        };
    a.isShowJzl === !1 && "jzl" === d["\u65b0\u95fb"].fluidAdData[0].ad_type && d["\u65b0\u95fb"].fluidAdData.shift(), b.setAdData("article", d)
}(window), function(a) {
    function b(a) {
        if (!j(a))
            return e.adProtocolHandler(g, 0);
        var b = "",
            c = {
                itemspaceid: a[1] || 111111,
                adps: a[3] || "160001",
                adsrc: 13,
                apt: 4
            };
        return i && a[2] ? (b = h, c.itemspaceid = a[2], c.bucketid = 2) : b = e.adProtocolHandler(g, c.itemspaceid), b += k(c)
    }
    var c = a.MSOHU_AD_DATA_CONFIG,
        d = c.ad_url,
        e = MSOHU.AD.utils,
        f = a.location.hostname,
        g = d.getAdUrl,
        h = d.testAdUrl,
        i = function() {
            var a = /^([tdg][1-9]\.)m\.sohu\.com$/.test(f);
            return a
        }(),
        j = function(a) {
            return "[object Array]" === Object.prototype.toString.call(a)
        },
        k = function(a) {
            var b,
                c = [],
                d = function(a) {
                    return "[object Object]" === Object.prototype.toString.call(a)
                };
            if (a && d(a)) {
                for (b in a)
                    a.hasOwnProperty(b) && c.push(b + "=" + a[b]);
                return c.join("&")
            }
        },
        l = function() {
            var b = a.location.href,
                c = !1;
            return "1" === CookieUtil.get("hide_ad") && (c = !0), /_trans_=000018_sogou_sohuicon/.test(b) && (c = !0), c
        }(),
        m = a.MSOHUBASEAD = {};
    m.getAdRequestBaseUrl = b, m.isNoADMSohu = l
}(window), function(a) {
    var b = a.MSOHU_AD_DATA_CONFIG,
        c = b.adps_type,
        d = {
            "\u9996\u9875": {
                indexWinAdData: {
                    itemspaceid: 13187,
                    itemspaceidTest: 12537,
                    adps: c.indexWin
                },
                indexSelectAdData: {
                    itemspaceid: 13201,
                    itemspaceidTest: "",
                    adps: c.indexSelect
                },
                implantH5AdData: {
                    itemspaceid: 13713,
                    itemspaceidTest: 12818,
                    adps: c.implantH5
                },
                videoPlayerAdData: {
                    itemspaceid: 13413,
                    itemspaceidTest: 12818,
                    adps: c.videoPlayer
                },
                gifAdData: {
                    itemspaceid: 13730,
                    itemspaceidTest: 12818,
                    adps: c.gif
                }
            },
            "\u65b0\u95fb": {
                indexWinAdData: {
                    itemspaceid: 13188,
                    itemspaceidTest: 12537,
                    adps: c.indexWin
                },
                indexSelectAdData: {
                    itemspaceid: 13202,
                    itemspaceidTest: "",
                    adps: c.indexSelect
                },
                detailBottomAdData: {
                    itemspaceid: 13215,
                    itemspaceidTest: "14318",
                    adps: c.detailBottom
                }
            },
            "\u65b0\u95fb\u6d41": {
                indexWinAdData: {
                    itemspaceid: 13188,
                    itemspaceidTest: 12537,
                    adps: c.indexWin
                },
                indexSelectAdData: {
                    itemspaceid: 13202,
                    itemspaceidTest: "",
                    adps: c.indexSelect
                },
                detailBottomAdData: {
                    itemspaceid: 13215,
                    itemspaceidTest: "12561",
                    adps: c.detailBottom
                }
            },
            "\u8d22\u7ecf": {
                indexWinAdData: {
                    itemspaceid: 13189,
                    itemspaceidTest: 12537,
                    adps: c.indexWin
                },
                indexSelectAdData: {
                    itemspaceid: 13203,
                    itemspaceidTest: "",
                    adps: c.indexSelect
                },
                detailBottomAdData: {
                    itemspaceid: 13216,
                    itemspaceidTest: "12561",
                    adps: c.detailBottom
                }
            },
            "\u5a31\u4e50": {
                indexWinAdData: {
                    itemspaceid: 13191,
                    itemspaceidTest: 12537,
                    adps: c.indexWin
                },
                indexSelectAdData: {
                    itemspaceid: 13205,
                    itemspaceidTest: "",
                    adps: c.indexSelect
                },
                implantH5AdData: {
                    itemspaceid: 13714,
                    itemspaceidTest: "",
                    adps: c.implantH5
                },
                videoPlayerAdData: {
                    itemspaceid: 13420,
                    itemspaceidTest: "",
                    adps: c.videoPlayer
                },
                gifAdData: {
                    itemspaceid: 13731,
                    itemspaceidTest: "",
                    adps: c.gif
                },
                detailBottomAdData: {
                    itemspaceid: 13218,
                    itemspaceidTest: "12561",
                    adps: c.detailBottom
                }
            },
            "\u6587\u5316\u8bfb\u4e66": {
                indexWinAdData: {
                    itemspaceid: 13500,
                    itemspaceidTest: 12537,
                    adps: c.indexWin
                },
                indexSelectAdData: {
                    itemspaceid: 13501,
                    itemspaceidTest: "",
                    adps: c.indexSelect
                },
                detailBottomAdData: {
                    itemspaceid: 13506,
                    itemspaceidTest: "12561",
                    adps: c.detailBottom
                }
            },
            "\u4f53\u80b2": {
                indexWinAdData: {
                    itemspaceid: 13190,
                    itemspaceidTest: 12537,
                    adps: c.indexWin
                },
                indexSelectAdData: {
                    itemspaceid: 13204,
                    itemspaceidTest: "",
                    adps: c.indexSelect
                },
                detailBottomAdData: {
                    itemspaceid: 13217,
                    itemspaceidTest: "12561",
                    adps: c.detailBottom
                }
            },
            "\u519b\u4e8b": {
                indexWinAdData: {
                    itemspaceid: 13193,
                    itemspaceidTest: 12537,
                    adps: c.indexWin
                },
                indexSelectAdData: {
                    itemspaceid: 13207,
                    itemspaceidTest: "",
                    adps: c.indexSelect
                },
                detailBottomAdData: {
                    itemspaceid: 13220,
                    itemspaceidTest: "1256112763",
                    adps: c.detailBottom
                }
            },
            "\u65f6\u5c1a": {
                indexWinAdData: {
                    itemspaceid: 13194,
                    itemspaceidTest: 12537,
                    adps: c.indexWin
                },
                indexSelectAdData: {
                    itemspaceid: 13208,
                    itemspaceidTest: "",
                    adps: c.indexSelect
                },
                detailBottomAdData: {
                    itemspaceid: 13221,
                    itemspaceidTest: "12561",
                    adps: c.detailBottom
                }
            },
            "\u6c7d\u8f66": {
                indexWinAdData: {
                    itemspaceid: 13192,
                    itemspaceidTest: 12537,
                    adps: c.indexWin
                },
                indexSelectAdData: {
                    itemspaceid: 13206,
                    itemspaceidTest: "",
                    adps: c.indexSelect
                },
                detailBottomAdData: {
                    itemspaceid: 13219,
                    itemspaceidTest: "12561",
                    adps: c.detailBottom
                }
            },
            "\u79d1\u6280": {
                indexWinAdData: {
                    itemspaceid: 13198,
                    itemspaceidTest: 12537,
                    adps: c.indexWin
                },
                indexSelectAdData: {
                    itemspaceid: 13212,
                    itemspaceidTest: "",
                    adps: c.indexSelect
                },
                detailBottomAdData: {
                    itemspaceid: 13225,
                    itemspaceidTest: "12561",
                    adps: c.detailBottom
                }
            },
            "\u5386\u53f2": {
                indexWinAdData: {
                    itemspaceid: 13199,
                    itemspaceidTest: 12537,
                    adps: c.indexWin
                },
                indexSelectAdData: {
                    itemspaceid: 13213,
                    itemspaceidTest: "",
                    adps: c.indexSelect
                },
                detailBottomAdData: {
                    itemspaceid: 13228,
                    itemspaceidTest: "12561",
                    adps: c.detailBottom
                }
            },
            "\u661f\u5ea7": {
                indexWinAdData: {
                    itemspaceid: 13674,
                    itemspaceidTest: 12537,
                    adps: c.indexWin
                },
                indexSelectAdData: {
                    itemspaceid: 13676,
                    itemspaceidTest: "",
                    adps: c.indexSelect
                },
                detailBottomAdData: {
                    itemspaceid: 13680,
                    itemspaceidTest: "12561",
                    adps: c.detailBottom
                }
            },
            "\u65c5\u6e38": {
                indexWinAdData: {
                    itemspaceid: 13195,
                    itemspaceidTest: 12537,
                    adps: c.indexWin
                },
                indexSelectAdData: {
                    itemspaceid: 13209,
                    itemspaceidTest: "",
                    adps: c.indexSelect
                },
                detailBottomAdData: {
                    itemspaceid: 13222,
                    itemspaceidTest: "12561",
                    adps: c.detailBottom
                }
            },
            "\u5065\u5eb7": {
                indexWinAdData: {
                    itemspaceid: 13196,
                    itemspaceidTest: 12537,
                    adps: c.indexWin
                },
                indexSelectAdData: {
                    itemspaceid: 13210,
                    itemspaceidTest: "",
                    adps: c.indexSelect
                },
                detailBottomAdData: {
                    itemspaceid: 13223,
                    itemspaceidTest: "12561",
                    adps: c.detailBottom
                }
            },
            "\u7f8e\u98df": {
                indexWinAdData: {
                    itemspaceid: 13197,
                    itemspaceidTest: 12537,
                    adps: c.indexWin
                },
                indexSelectAdData: {
                    itemspaceid: 13211,
                    itemspaceidTest: "",
                    adps: c.indexSelect
                },
                detailBottomAdData: {
                    itemspaceid: 13224,
                    itemspaceidTest: "12561",
                    adps: c.detailBottom
                }
            },
            "\u6559\u80b2": {
                indexWinAdData: {
                    itemspaceid: 13200,
                    itemspaceidTest: 12537,
                    adps: c.indexWin
                },
                indexSelectAdData: {
                    itemspaceid: 13214,
                    itemspaceidTest: "",
                    adps: c.indexSelect
                },
                detailBottomAdData: {
                    itemspaceid: 13226,
                    itemspaceidTest: "12561",
                    adps: c.detailBottom
                }
            },
            "\u6bcd\u5a74": {
                indexWinAdData: {
                    itemspaceid: "",
                    itemspaceidTest: 12537,
                    adps: c.indexWin
                },
                indexSelectAdData: {
                    itemspaceid: "",
                    itemspaceidTest: "",
                    adps: c.indexSelect
                },
                detailBottomAdData: {
                    itemspaceid: 14299,
                    itemspaceidTest: "12561",
                    adps: c.detailBottom
                }
            },
            "\u7efc\u5408": {
                indexWinAdData: {
                    itemspaceid: 13188,
                    itemspaceidTest: 12537,
                    adps: c.indexWin
                },
                indexSelectAdData: {
                    itemspaceid: 13202,
                    itemspaceidTest: "",
                    adps: c.indexSelect
                },
                detailBottomAdData: {
                    itemspaceid: 13215,
                    itemspaceidTest: "12561",
                    adps: c.detailBottom
                }
            }
        };
    b.setAdData("special", d)
}(window);
var MONEY = function() {
    var a = window.FastClick,
        b = (window.Jsonp, window.MSOHU_AD_DATA_CONFIG),
        c = b.ad_url,
        d = c.statisticUrl,
        f = MSOHU.AD.utils,
        g = window.JsonpTimeDecorator || (window.JsonpTimeDecorator = function() {}),
        h = f.isValidUrl,
        i = b.adTimeout,
        j = b.getAdData().special,
        k = window.article_config,
        l = window.supporter,
        m = MSOHU.AD.utils.getAdTransCode(),
        n = d + "/count/c?",
        o = MSOHUBASEAD.getAdRequestBaseUrl,
        p = $.proxy(f.imageUrlHandle, f),
        q = function(a) {
            return Object.keys(a).length > 1
        },
        r = f.isTestEnvironment(),
        s = function(a) {
            return h(a) ? a : "http://" + a
        },
        t = {},
        u = function(a) {
            var c,
                d = "",
                e = {
                    aid: q(a) && a.adid ? a.adid : "",
                    apid: b.reportAdIdPrefix + a.itemspaceid,
                    impid: q(a) && a.impression_id ? a.impression_id : "",
                    at: q(a) && a.adtype ? a.adtype : "",
                    mkey: q(a) && a.monitorkey ? a.monitorkey : "",
                    latcy: "",
                    freq: q(a) && a.freq ? a.freq : "",
                    turn: 1,
                    ipos: 0,
                    pgid: "pgid" + (new Date).getTime(),
                    ax: q(a) && a.adElem && a.adElem.offsetLeft ? a.adElem.offsetLeft : "",
                    ay: q(a) && a.adElem && a.adElem.offsetTop ? a.adElem.offsetTop : "",
                    cx: q(a) && a.cx && a.cx ? a.cx : "",
                    cy: q(a) && a.cy && a.cy ? a.cy : "",
                    ed: q(a) && a.ed ? a.ed : "",
                    supplyid: 4,
                    ext: q(a) && a.ext ? a.ext : "",
                    rsln: window.screen.width + "*" + window.screen.height,
                    ref: encodeURIComponent(document.referrer),
                    sf: !1,
                    jsv: window.passion_config && window.passion_config.VERSION || "06301130",
                    r: (Math.random() + "").substring(2, 15),
                    bucket: q(a) && a.bucket ? a.bucket : "",
                    newschn: q(a) && a.newschn ? a.newschn : "",
                    subchannelid: q(a) && a.subchannelid ? a.subchannelid : "",
                    ch_trans: m,
                    shbd_monitor_ext: a.shbd_monitor_ext
                },
                f = {},
                g = t && t[a.itemspaceid];
            g && (f.ss_t = g.loadTime, f.ss_p = CookieUtil.get("_sxsp") || "", f.ss_hs = window.location.protocol.indexOf("https") < 0 ? 0 : 1), $.extend(e, f), delete t[a.itemspaceid];
            for (c in e)
                d += c + "=" + e[c] + "&";
            return d = d.substr(0, d.length - 1)
        },
        v = function(a, b, c) {
            var d = /\?/.test(a) ? "&" : "?",
                e = Math.random().toString().substring(2, 15);
            if (h(a))
                return a.indexOf("imp.optaim.com") >= 0 ? [a, d, "apid=", b, "&impid=", c, "&rdm=", e].join("") : a + "&rdm=" + e
        },
        w = function(a) {
            return "string" == typeof a ? a.indexOf("?") === -1 ? a + "?" : "&" === a.substr(-1) ? a : a + "&" : ""
        },
        x = function(a, c) {
            var d = b.reportAdIdPrefix + (c ? c.itemspaceid : ""),
                e = c ? c.impression_id : "",
                f = [],
                g = function(b) {
                    var c,
                        f = b.length;
                    for (c = 0; c < f; c += 1)
                        h(a) && Statistics.addStatistics({}, w(v(b[c], d, e)))
                };
            f = "[object Array]" === toString.call(a) ? a : /^\[(.+?)\]$/.test(a) ? JSON.parse(a) : a ? a.split("|") : [], g(f)
        },
        y = function(a) {
            var b = d + "/count/v?";
            x(b + u(a), a), a.resource && a.resource.imp && x(a.resource.imp, a)
        },
        z = function(a) {
            var b = d + "/count/e?";
            x(b + u(a), a), a.resource && a.resource.imp && x(a.resource.imp, a)
        },
        A = function(a) {
            var b = d + "/count/to?";
            x(b + u(a), a), a.resource && a.resource.imp && x(a.resource.imp, a)
        },
        B = function(a) {
            var b = d + "/count/vp?";
            Statistics.addStatistics({}, w(b + u(a))), a.resource && a.resource.tracking_imp && x(a.resource.tracking_imp, a)
        },
        C = function(a) {
            var b = d + "/count/av?";
            x(b + u(a), a)
        },
        D = function(a, b, c) {
            var e = d + "/count/c?";
            if (f !== !0) {
                var f = !0;
                "IMG" === a.target.nodeName && (b.cx = a.offsetX, b.cy = a.offsetY), urlLink = e + u(b), $.ajax({
                    url: urlLink,
                    type: "GET",
                    dataType: "jsonp",
                    success: function(a) {
                        c && ("OK" !== a.STATUS && x(e + u(a), a), window.location.href = c)
                    },
                    error: function() {
                        x(e + u(b), b), setTimeout(function() {
                            window.location.href = c
                        }, 2e3)
                    }
                }), setTimeout(function() {
                    f = !1
                }, 2e3), b.resource.clkm && x(b.resource.clkm, b)
            }
        },
        E = function(a, b) {
            var c,
                d,
                e,
                f = l.isSupportLocalStorage,
                g = 60,
                h = {};
            return f && (h = JSON.parse(window.localStorage.getItem("msohu/ad_turn") || {})), c = parseInt(h[b] || parseInt(Math.random() * g + 1, 10), 10), d = d > g ? 1 : c + 1, h[b] = d, f && window.localStorage.setItem("msohu/ad_turn", JSON.stringify(h)), e = a ? (d - 1) % a + 1 : d
        },
        F = function(a, b) {
            if (b)
                return CookieUtil.get(a);
            var c = new Date,
                d = new Date(c.getFullYear(), c.getMonth(), c.getDate(), "23", "59", "59");
            return !CookieUtil.get(a) && (CookieUtil.set(a, 1, d), !0)
        },
        G = function(a, b, c) {
            if (b)
                return parseInt(CookieUtil.get(a)) === c;
            var d = new Date,
                e = new Date(d.getFullYear(), d.getMonth(), d.getDate(), "23", "59", "59");
            CookieUtil.set(a, parseInt(CookieUtil.get(a) || 0) + 1, e)
        },
        H = function() {
            var a = location.pathname;
            return "/" === a ? "\u9996\u9875" : f.getChannelNameByUrl()
        },
        I = function(a, b) {
            var c,
                d = {};
            try {
                c = "index" === b ? H() : k.channel_long_path[0][0], d = {
                    itemspaceid: j[c][a].itemspaceid,
                    adps: j[c][a].adps
                }, r && (d.itemspaceidTest = j[c][a].itemspaceidTest)
            } catch (a) {
                d = {}
            }
            return d
        },
        J = function(a, b) {
            var c,
                d = function(a) {
                    var b,
                        c = [];
                    if ("object" == typeof a && a && a !== {}) {
                        for (b in a)
                            a.hasOwnProperty(b) && c.push(b + "=" + a[b]);
                        return c.join("&")
                    }
                    if (a === {} || null === a)
                        return ""
                };
            return c = a.indexOf("?") === -1 ? a + "?" : "?" === a.charAt(a.length - 1) ? a : a + "&", c + d(b)
        },
        K = function(a, b) {
            var c = window.MSOHUAD.moneyExposureStatis || {};
            !$(a).attr("is_send") && c.isExposure(a[0]) && (C(b), $(a).attr("is_send", 1))
        },
        L = function() {
            var a,
                b,
                c,
                d = window.location.hostname,
                e = window.location.pathname;
            /\/c\/(\d+)/i.exec(e), /\/n\/(\d+)/i.exec(e);
            return /m\.(sohu|sohuno)\.com/.test(d) ? ("c" == window.location.pathname.split("/")[1] ? b = window.location.pathname.match(/[1-9][0-9]*/g)[0] : k && k.channel_long_path ? (a = k.channel_long_path, b = a[0][1].match(/[1-9][0-9]*/g)[0], a[1] && (c = a[1][1].match(/[1-9][0-9]*/g)[0])) : b = "1", {
                newschn: b ? b : "",
                subchannelid: c ? c : ""
            }) : {}
        },
        M = L().newschn,
        N = L().subchannelid;
    return {
        indexWin: function() {
            var a = I("indexWinAdData", "index");
            if (a && !$.isEmptyObject(a)) {
                baseAdParam = ["", a.itemspaceid, a.itemspaceidTest, a.adps];
                var b = document.querySelector(".site, .travel-nav, .fashion-nav, .top-nav") || document.getElementById("scroller");
                if (baseAdParam[1] && b) {
                    var c = E(2, "indexWin"),
                        d = this,
                        e = r && 0 !== baseAdParam[2].length ? baseAdParam[2] : baseAdParam[1];
                    return l.isVivo ? (F("indexWin_" + e), void this.indexSelect()) : F("indexWin_" + e, !0) ? void this.indexSelect() : void new g({
                        url: o(baseAdParam) + "&newschn=" + M + "&subchannelid=" + N + "&turn=" + c,
                        time: i,
                        success: function(a, c) {
                            if (a = a[0], t[e] = c, !a || !a.resource || !a.resource1)
                                return y({
                                    itemspaceid: e,
                                    newschn: M,
                                    subchannelid: N
                                }), void d.indexSelect();
                            F("indexWin_" + e), Statistics.addStatistics({
                                _once_: "000157_indexWin",
                                itemspaceid: e
                            });
                            var f = s(a.resource.click),
                                g = {
                                    data: {
                                        url: f,
                                        file: p(a.resource.file, e),
                                        dsp_source: a.dsp_source
                                    }
                                },
                                h = window.template.compile(window.MSOHUAD.adTemplate.indexWin),
                                i = h(g),
                                j = '<i class="index-win-money-close index-win-money-text-close" data-type="text"></i><a href="javascript:;" data-url="' + f + '">' + a.resource1.text + "</a>",
                                k = 3;
                            window.specialMonitorKeyArr && window.specialMonitorKeyArr.indexOf(a.monitorkey) >= 0 && (k = 5);
                            var l,
                                m,
                                n = function(b) {
                                    b.preventDefault(), D(b, a, this.getAttribute("data-url"))
                                },
                                o = function() {
                                    document.querySelector(".index-win-money-img").style.display = "none", document.querySelector(".index-win-money-text").style.display = "block", document.querySelector(".index-win-money-text a").onclick = n
                                },
                                q = function(b) {
                                    if (b) {
                                        k = 0;
                                        var c = window.location.pathname,
                                            d = /^\/$/.test(c) ? "1" : /\/c\/(\d+)/i.exec(c)[1];
                                        return Statistics.addStatistics({
                                            _once_: "000091_gb_hsfc",
                                            itemspaceid: a.itemspaceid,
                                            channelId: d
                                        }), clearTimeout(m), void o()
                                    }
                                    m = setTimeout(function() {
                                        o(), clearTimeout(m)
                                    }, 1e3 * k);
                                    var e = setInterval(function() {
                                        if (0 === k)
                                            return void clearInterval(e);
                                        k--;
                                        var a = document.querySelector(".index-win-money-time");
                                        a && (a.className = "index-win-money-time index-win-money-time-" + k)
                                    }, 1e3)
                                },
                                r = function(a) {
                                    a.preventDefault(), a.stopPropagation();
                                    var b = this.getAttribute("data-type");
                                    "text" === b ? setTimeout(function() {
                                        document.querySelector(".index-win-money-text").style.display = "none"
                                    }, 400) : q(!0)
                                };
                            l = document.createElement("div"), l.className = "index-win-money-img", /all/.test(b.className) || (l.className += " index-win-money-img-sub"), l.innerHTML = i;
                            var u = l.querySelector(".index-win-money-time");
                            u && (u.className = "index-win-money-time index-win-money-time-" + k), l.style.height = document.body.scrollHeight + "px", $("body").append(l);
                            var v = $(".index-win-money-img").find(".dsp_source");
                            v.css("top", -(parseFloat(v.css("font-size")) + parseFloat(v.css("padding-top")) + parseFloat(v.css("padding-bottom")))), textRoot = document.createElement("div"), textRoot.className = "index-win-money-text", textRoot.innerHTML = j, 0 !== $("#scroller").length ? $("#pullDown").after(textRoot) : b.parentNode.insertBefore(textRoot, b), $(".index-win-money-img img").on("load", function() {
                                q()
                            }), setTimeout(function() {
                                $(".index-win-money-img-close").show("500")
                            }, 200), document.querySelector(".index-win-money-img-close").onclick = r, document.querySelector(".index-win-money-text-close").onclick = r, a.itemspaceid = e, a.newschn = M, a.subchannelid = N, a.adElem = l, y(a), C(a), $("body").on("click", ".index-win-money-img a", function(b) {
                                b.preventDefault(), D(b, a, this.getAttribute("data-url"))
                            })
                        },
                        error: function(a) {
                            t[e] = a, z({
                                itemspaceid: e,
                                newschn: M,
                                subchannelid: N,
                                supplyid: 4
                            }), Statistics.addStatistics({
                                _once_: "000157_error",
                                itemspaceid: e,
                                newschn: M,
                                subchannelid: N,
                                supplyid: 4
                            })
                        },
                        timeout: function(a) {
                            t[e] = a, A({
                                itemspaceid: e,
                                newschn: M,
                                subchannelid: N,
                                supplyid: 4
                            }), Statistics.addStatistics({
                                _once_: "000157_adtimeout",
                                itemspaceid: e,
                                newschn: M,
                                subchannelid: N,
                                supplyid: 4
                            })
                        }
                    })
                }
            }
        },
        indexSelect: function() {
            var b = I("indexSelectAdData", "index");
            if (b && !$.isEmptyObject(b)) {
                baseAdParam = ["", b.itemspaceid, b.itemspaceidTest, b.adps];
                var c = document.querySelector(".site, .travel-nav, .fashion-nav, .top-nav") || document.getElementById("scroller");
                if (baseAdParam[1] && c) {
                    var d = E(2, "indexSelect"),
                        e = r && 0 !== baseAdParam[2].length ? baseAdParam[2] : baseAdParam[1];
                    F("indexSelect_" + e, !0) || new g({
                        url: o(baseAdParam) + "&newschn=" + M + "&subchannelid=" + N + "&turn=" + d,
                        time: i,
                        success: function(b, d) {
                            if (b = b[0], t[e] = d, !b || !b.resource || !b.resource1)
                                return void y({
                                    itemspaceid: e
                                });
                            F("indexSelect_" + e), Statistics.addStatistics({
                                _once_: "000157_indexSelect",
                                itemspaceid: e
                            });
                            var f,
                                g,
                                h = {
                                    data: {
                                        url: s(b.resource.click),
                                        file: p(b.resource.file, e),
                                        text: b.resource1.text,
                                        dsp_source: b.dsp_source
                                    }
                                },
                                i = window.template.compile(window.MSOHUAD.adTemplate.indexSelect),
                                j = i(h),
                                k = 3,
                                l = function(a) {
                                    return a.preventDefault(), k > 0 ? void n(!0) : void (/index-select-money-showimg/.test(f.className) ? setTimeout(function() {
                                        f.className = "index-select-money select-exposure"
                                    }, 400) : setTimeout(function() {
                                        f.className = "index-select-money index-select-money-showimg"
                                    }, 400))
                                },
                                m = function() {
                                    f.className = "index-select-money select-exposure", document.querySelector(".index-win-money-time").style.display = "none"
                                },
                                n = function(a) {
                                    if (a)
                                        return k = 0, clearTimeout(g), void m();
                                    g = setTimeout(function() {
                                        m(), clearTimeout(g)
                                    }, 3e3);
                                    var b = setInterval(function() {
                                        if (0 === k)
                                            return void clearInterval(b);
                                        k--;
                                        var a = document.querySelector(".index-win-money-time");
                                        a && (a.className = "index-win-money-time index-win-money-time-" + k)
                                    }, 1e3)
                                };
                            f = document.createElement("div"), f.className = "index-select-money index-select-money-showimg", f.innerHTML = j, 0 !== $("#scroller").length ? $("#pullDown").after(f) : c.parentNode.insertBefore(f, c), n(), b.itemspaceid = e, b.newschn = M, b.subchannelid = N, b.adElem = f, y(b), C(b), a && a.attach($(".index-select-money-zoom")[0]), $(document.body).on("click", ".select-exposure .index-select-money-zoom", function(a) {
                                a.preventDefault(), C(b)
                            }), $(document.body).on("click", ".index-select-money-img a , .index-select-txt", function(a) {
                                a.preventDefault(), D(a, b, this.getAttribute("data-url"))
                            }), $(document.body).on("click", ".index-select-money-zoom", l)
                        },
                        error: function(a) {
                            t[e] = a, z({
                                itemspaceid: e,
                                newschn: M,
                                subchannelid: N,
                                supplyid: 4
                            }), Statistics.addStatistics({
                                _once_: "000157_error",
                                itemspaceid: e,
                                newschn: M,
                                subchannelid: N,
                                supplyid: 4
                            })
                        },
                        timeout: function(a) {
                            t[e] = a, A({
                                itemspaceid: e,
                                newschn: M,
                                subchannelid: N,
                                supplyid: 4
                            }), Statistics.addStatistics({
                                _once_: "000157_adtimeout",
                                itemspaceid: e,
                                newschn: M,
                                subchannelid: N,
                                supplyid: 4
                            })
                        }
                    })
                }
            }
        },
        implantH5: function() {
            var a = I("implantH5AdData", "index");
            if (a && !$.isEmptyObject(a) && (baseAdParam = ["", a.itemspaceid, a.itemspaceidTest, a.adps], r || baseAdParam[1])) {
                var b = 1,
                    c = r && 0 !== baseAdParam[2].length ? baseAdParam[2] : baseAdParam[1];
                if (F("h5Ad_" + c, !0))
                    return void this.gif();
                var d = this;
                new g({
                    url: o(baseAdParam) + "&turn=" + b + "&newschn=" + M,
                    time: i,
                    success: function(a, b) {
                        if (a = a[0], t[c] = b, !a || !a.resource)
                            return y({
                                itemspaceid: c,
                                newschn: M,
                                subchannelid: N
                            }), void d.gif();
                        F("h5Ad_" + c), a.itemspaceid = c, a.newschn = M, a.subchannelid = N;
                        var e,
                            f = u(a),
                            g = n + f;
                        a.iframe = J(a.resource.file, {
                            clkm: encodeURIComponent(g)
                        });
                        var h = {
                                data: {
                                    iframe: a.iframe,
                                    click: a.resource.click,
                                    dsp_source: a.dsp_source
                                }
                            },
                            i = window.template.compile(window.MSOHUAD.adTemplate.implantH5);
                        e = i(h);
                        var j = function(b) {
                                b.preventDefault(), D(b, a, this.getAttribute("data-url"))
                            },
                            k = $(e).appendTo(".video_player");
                        a.adElem = k[0], $(window).scroll(function() {
                            K($(".player"), a)
                        });
                        var l = window.innerWidth;
                        $(".videoRoot").length > 0 && ($(".player").css({
                            width: l + "px",
                            marginLeft: "auto",
                            marginRight: "auto"
                        }), $(".videoRoot").css({
                            width: l + "px",
                            height: l / 2 + "px"
                        }), $("#videoElem").css({
                            width: l + "px",
                            height: l / 2 + "px"
                        })), y(a), $(".h5Detail a").on("click", j)
                    },
                    error: function(a) {
                        t[c] = a, z({
                            itemspaceid: c,
                            newschn: M,
                            subchannelid: N,
                            supplyid: 4
                        }), Statistics.addStatistics({
                            _once_: "000157_error",
                            itemspaceid: c,
                            newschn: M,
                            subchannelid: N,
                            supplyid: 4
                        })
                    },
                    timeout: function(a) {
                        t[c] = a, A({
                            itemspaceid: c,
                            newschn: M,
                            subchannelid: N,
                            supplyid: 4
                        }), Statistics.addStatistics({
                            _once_: "000157_adtimeout",
                            itemspaceid: c,
                            newschn: M,
                            subchannelid: N,
                            supplyid: 4
                        })
                    }
                })
            }
        },
        videoPlayer: function() {
            var a = I("videoPlayerAdData", "index");
            if (a && !$.isEmptyObject(a)) {
                baseAdParam = ["", a.itemspaceid, a.itemspaceidTest, a.adps];
                var b = navigator.userAgent.toLowerCase(),
                    c = b.match(/(?:MQ)?QBrowser\/([\d\.]+)/i),
                    d = b.match(/UCBrowser(?:\/)?([\d\.\/]+)/i),
                    f = b.match(/SogouMobileBrowser(?:\/)?([\d\.\/]+)/i),
                    h = d ? d[1] : null,
                    j = 0,
                    k = c ? c[1] : null,
                    m = 0;
                if (h) {
                    var n = h.match(/(^\d+\.\d+)/i);
                    n && (j = Number(n[1]))
                }
                if (k) {
                    var p = k.match(/(^\d+\.\d+)/i);
                    p && (m = Number(p[1]))
                }
                if (!(!baseAdParam[1] || l.os.android && f || l.os.ios && d || l.os.android && d && j < 10.4 || l.os.android && c && m < 4)) {
                    var q = 1,
                        s = r && 0 !== baseAdParam[2].length ? baseAdParam[2] : baseAdParam[1];
                    if (!F("videoAd_" + s, !0)) {
                        new g({
                            url: o(baseAdParam) + "&turn=" + q + "&newschn=" + M + "&subchannelid=" + N,
                            time: i,
                            success: function(a, b) {
                                if (a = a[0], t[s] = b, !a || !a.resource || !a.resource1)
                                    return void y({
                                        itemspaceid: s,
                                        newschn: M,
                                        subchannelid: N
                                    });
                                var c = function(b) {
                                    b.preventDefault(), D(b, a, this.getAttribute("data-url"))
                                };
                                F("videoAd_" + s);
                                var d = function(a) {
                                    var b = {};
                                    return a.special && a.special.dict && (a.special.dict.picture && (b.image = a[a.special.dict.picture].file), a.special.dict.title && (b.title = a[a.special.dict.title].text), a.special.dict.video && (b.video = a[a.special.dict.video].file)), b
                                };
                                adInfo = d(a);
                                var f = {
                                        data: {
                                            android: l.os.android,
                                            version: l.os.version,
                                            image: adInfo.image,
                                            video: adInfo.video,
                                            click: a.resource.click,
                                            dsp_source: a.dsp_source
                                        }
                                    },
                                    g = window.template.compile(window.MSOHUAD.adTemplate.videoPlayer),
                                    h = g(f),
                                    i = $(h).appendTo(".video_player");
                                a.itemspaceid = s, a.newschn = M, a.subchannelid = N, a.adElem = i[0], $(window).scroll(function() {
                                    K($(".player"), a)
                                });
                                var j = window.innerWidth;
                                $(".videoRoot").length > 0 ? ($(".player").css({
                                    width: j + "px",
                                    marginLeft: "auto",
                                    marginRight: "auto"
                                }), $(".videoRoot").css({
                                    width: j + "px",
                                    height: j / 2 + "px"
                                }), $("#videoElem").css({
                                    width: j + "px",
                                    height: j / 2 + "px"
                                })) : l.os.android && l.os.version <= 4 && ($(".video_tvp_link").css({
                                    width: j + "px",
                                    marginLeft: "auto",
                                    marginRight: "auto"
                                }), $(".video-poster").css({
                                    width: j + "px",
                                    height: j / 2 + "px"
                                })), $(document.body).on("click", ".video_tvp_link a", function() {
                                    l.os.android && l.os.version <= 4 && B(e, a)
                                }), $("#videoElem").on({
                                    play: function(b) {
                                        b.preventDefault(), "/" === location.pathname ? Statistics.addStatistics("000091_spdj_hsxwbk") : Statistics.addStatistics("000091_spdj_ylywbk"), B(a)
                                    }
                                }), y(a), $(".toResouseVideo a").on("click", c)
                            },
                            error: function(a) {
                                t[s] = a, z({
                                    itemspaceid: s,
                                    newschn: M,
                                    subchannelid: N,
                                    supplyid: 4
                                }), Statistics.addStatistics({
                                    _once_: "000157_error",
                                    itemspaceid: s,
                                    newschn: M,
                                    subchannelid: N,
                                    supplyid: 4
                                })
                            },
                            timeout: function(a) {
                                t[s] = a, A({
                                    itemspaceid: s,
                                    newschn: M,
                                    subchannelid: N,
                                    supplyid: 4
                                }), Statistics.addStatistics({
                                    _once_: "000157_adtimeout",
                                    itemspaceid: s,
                                    newschn: M,
                                    subchannelid: N,
                                    supplyid: 4
                                })
                            }
                        })
                    }
                }
            }
        },
        gif: function() {
            var a = I("gifAdData", "index");
            if (a && !$.isEmptyObject(a) && (baseAdParam = ["", a.itemspaceid, a.itemspaceidTest, a.adps], baseAdParam[1])) {
                var b = 1,
                    c = r && 0 !== baseAdParam[2].length ? baseAdParam[2] : baseAdParam[1];
                if (F("gifAd_" + c, !0))
                    return void this.videoPlayer();
                var d = this;
                new g({
                    url: o(baseAdParam) + "&turn=" + b + "&newschn=" + M,
                    time: i,
                    success: function(a, b) {
                        if (a = a[0], t[c] = b, !a || !a.resource)
                            return y({
                                itemspaceid: c,
                                newschn: M,
                                subchannelid: N
                            }), void d.videoPlayer();
                        F("gifAd_" + c);
                        var e = {
                                data: {
                                    click: a.resource.click,
                                    file: p(a.resource.file, c),
                                    dsp_source: a.dsp_source
                                }
                            },
                            f = window.template.compile(window.MSOHUAD.adTemplate.gif),
                            g = f(e),
                            h = function(b) {
                                b.preventDefault(), D(b, a, this.getAttribute("data-url"))
                            },
                            i = $(g).appendTo(".video_player");
                        a.itemspaceid = c, a.newschn = M, a.subchannelid = N, a.adElem = i[0], $(window).scroll(function() {
                            K($(".player"), a)
                        });
                        var j = window.innerWidth;
                        $(".videoRoot").length > 0 && ($(".player").css({
                            width: j + "px",
                            marginLeft: "auto",
                            marginRight: "auto"
                        }), $(".videoRoot").css({
                            width: j + "px",
                            height: j / 2 + "px"
                        }), $("#videoElem").css({
                            width: j + "px",
                            height: j / 2 + "px"
                        })), y(a), $(".videoRoot").click(function() {
                            var b = $("#videoElem").attr("src");
                            $("#videoElem").attr("src", b == a.resource2.file ? a.resource.file : a.resource2.file), $(".videoRoot i").toggle(), /gif/.test(b) || B(a)
                        }), $(".toResouseGif a").on("click", h)
                    },
                    error: function(a) {
                        t[c] = a, z({
                            itemspaceid: c,
                            newschn: M,
                            subchannelid: N,
                            supplyid: 4
                        }), Statistics.addStatistics({
                            _once_: "000157_error",
                            itemspaceid: c,
                            newschn: M,
                            subchannelid: N,
                            supplyid: 4
                        })
                    },
                    timeout: function(a) {
                        t[c] = a, A({
                            itemspaceid: c,
                            newschn: M,
                            subchannelid: N,
                            supplyid: 4
                        }), Statistics.addStatistics({
                            _once_: "000157_adtimeout",
                            itemspaceid: c,
                            newschn: M,
                            subchannelid: N,
                            supplyid: 4
                        })
                    }
                })
            }
        },
        detailBottom: function() {
            var a = I("detailBottomAdData");
            if (a && !$.isEmptyObject(a) && (baseAdParam = ["", a.itemspaceid, a.itemspaceidTest, a.adps], baseAdParam[1] && !/(_trans_=000014_baidu_zt|_trans_=000014_shenma_zt)/.test(window.location.href))) {
                var b = E(2, "detailBottom"),
                    c = r && 0 !== baseAdParam[2].length ? baseAdParam[2] : baseAdParam[1];
                k && k.bottom_adclose && "True" === k.bottom_adclose || G("detailBottom", !0, 3) || new g({
                    url: o(baseAdParam) + "&turn=" + b + "&newschn=" + M + "&subchannelid=" + N,
                    time: i,
                    success: function(a, b) {
                        if (a = a[0], t[c] = b, !a || !a.resource)
                            return void y({
                                itemspaceid: c,
                                newschn: M,
                                subchannelid: N
                            });
                        G("detailBottom");
                        var d = {
                                data: {
                                    url: s(a.resource.click),
                                    file: p(a.resource.file, c),
                                    dsp_source: a.dsp_source
                                }
                            },
                            e = window.template.compile(window.MSOHUAD.adTemplate.detailBottom),
                            f = e(d),
                            g = $(f).appendTo("body");
                        a.itemspaceid = c, a.newschn = M, a.subchannelid = N, a.adElem = g[0], y(a), C(a);
                        var h = function(b) {
                                b.preventDefault(), D(b, a, this.getAttribute("data-url"))
                            },
                            i = function(a) {
                                $(this).parent().hide()
                            };
                        $(".detail-bottom a").on("click", h), $(".detail-bottom-close").on("click", i)
                    },
                    error: function(a) {
                        t[c] = a, z({
                            itemspaceid: c,
                            newschn: M,
                            subchannelid: N,
                            supplyid: 4
                        }), Statistics.addStatistics({
                            _once_: "000157_error",
                            itemspaceid: c,
                            newschn: M,
                            subchannelid: N,
                            supplyid: 4
                        })
                    },
                    timeout: function(a) {
                        t[c] = a, A({
                            itemspaceid: c,
                            newschn: M,
                            subchannelid: N,
                            supplyid: 4
                        }), Statistics.addStatistics({
                            _once_: "000157_adtimeout",
                            itemspaceid: c,
                            newschn: M,
                            subchannelid: N,
                            supplyid: 4
                        })
                    }
                })
            }
        }
    }
}();
!function(a) {
    a.ARTICLE = a.ARTICLE || {};
    var b = function() {
        function b(b) {
            if ("\u65b0\u95fb" === k) {
                var c = new Jsonp({
                    url: "//cdn.jiuzhilan.com/reco/callback/sohu.js",
                    time: MSOHU_AD_DATA_CONFIG.adTimeout,
                    success: function(c) {
                        h.addStatistics("000213_jz");
                        var d = c[0];
                        if (d && d.resource && d.resource.base_url) {
                            h.addStatistics("000213_xh");
                            var f = d.resource.base_url;
                            a.https_go ? d.resource.base_url = f.replace(/^(\/\/|http:\/\/)/, "https://") : d.resource.base_url = f.replace(/^http:\/\//, "//");
                            var g = {
                                    data: {
                                        iframe: d.resource.base_url
                                    }
                                },
                                i = template.compile(e.adTemplate.hasContaineriframeAd),
                                j = e.Utils.transformHtmlToDom(i(g))[0],
                                k = j.querySelector("iframe");
                            k.style.height = "81px", k.style.paddingTop = "10px", k.style.paddingBottom = "10px", j.id = "jzl_bill", b.after($(j)), n.add([{
                                dom: document.querySelector("#" + j.id),
                                callback: function() {
                                    h.addStatistics("000213_bg")
                                }
                            }]).once()
                        }
                    },
                    error: function() {},
                    timeout: function() {}
                });
                a.jzl_ad_sohu_callback = function(a) {
                    c.success(a)
                }
            }
        }
        function c() {
            if (!l && p) {
                var b = p.bannerAdData[0],
                    c = {
                        type: b.type,
                        formalApId: b.itemspaceid,
                        testApId: b.itemspaceidTest,
                        maxTurn: b.max_turn,
                        adTurnCookieName: "final_top_banner_ad_turn",
                        adps: b.adps,
                        adTemplate: f.finalBannerTmgAd,
                        adDomClassName: g.finalBannerTmgAd,
                        isCachedData: !0,
                        handlerAdDom: function(b, c) {
                            var d = c.adInfo.width,
                                e = c.adInfo.height,
                                f = a.innerWidth * e / d + "px",
                                g = c.adInfo.dsp_source;
                            $(b).find("a").css({
                                display: "block",
                                height: f
                            }).attr("data-url", c.adInfo.url).html('<img src="' + c.adInfo.image + '" style="width: 100%; height: auto; vertical-align: top;" /><em class="tag">\u5e7f\u544a</em>'), $(b).css("padding-top", e / d * 100 + "%"), g && $(b).append('<span class="dsp_source">' + g + "</span>")
                        }
                    },
                    d = p.bannerAdData[1],
                    e = {
                        type: d.type,
                        formalApId: d.itemspaceid,
                        testApId: d.itemspaceidTest,
                        maxTurn: d.max_turn,
                        adTurnCookieName: "centerPic",
                        adps: d.adps,
                        adTemplate: f.billBanner,
                        adDomClassName: ""
                    },
                    h = p.textAdData[0],
                    j = {
                        type: h.type,
                        formalApId: h.itemspaceid,
                        testApId: h.itemspaceidTest,
                        maxTurn: h.max_turn,
                        adTurnCookieName: "centerText",
                        adps: h.adps,
                        adTemplate: f.billText,
                        adDomClassName: ""
                    };
                if (/_trans_=000014_shenma_zt/.test(a.location.href)) {
                    var k = $("#" + o.adIdPrefix + b.itemspaceid);
                    k.length > 0 && k.remove()
                } else
                    i(c);
                i(e), i(j), MONEY.detailBottom()
            }
        }
        function d(a, c, d, e) {
            if (!l && p) {
                var g = e || $("#newsListWrapper .news-item"),
                    h = g.length;
                d && (r = 0);
                var j,
                    k = p.fluidAdData,
                    m = p.autoLoadAdData;
                a -= 1, d = d || !1, j = d ? m : k;
                for (var n = a; n < h; n += c) {
                    if (function(a) {
                        var c,
                            d = j[r],
                            e = "news-item",
                            k = 0;
                        if ("graphicMixeSogou" === d.ad_type) {
                            var l = {
                                formalApId: d.itemspaceid,
                                statisticsCode: {
                                    loadCode: "000203_jz_zwysth",
                                    consumeCode: "000203_xh_zwysth",
                                    exposureCode: "000203_bg_zwysth"
                                },
                                adTemplate: f.billGraphicMix,
                                adDomClassName: e,
                                insterAdDom: function(b) {
                                    $(b).insertAfter(g.eq(a))
                                }
                            };
                            SOUGOUAD.renderAdAndSendStatis(l)
                        } else if ("jzl" === d.ad_type)
                            b(g.eq(a));
                        else {
                            "graphicMixe" === d.ad_type ? c = f.billGraphicMix : "bigBanner" === d.ad_type ? c = f.billBigBanner : "text" === d.ad_type ? (c = f.billText, k = 1) : "graphicMixeJD" === d.ad_type && (c = f.billGraphicMix, e = "news-item graphicMixeJD");
                            var m = {
                                type: d.type,
                                formalApId: d.itemspaceid,
                                testApId: d.itemspaceidTest,
                                maxTurn: d.max_turn,
                                adTurnCookieName: o.adIdPrefix + d.itemspaceid,
                                adps: d.adps,
                                merge: k,
                                adTemplate: c,
                                adDomClassName: e,
                                insterAdDom: function(b) {
                                    a < h - 1 ? g.eq(a + 1).before($(b)) : g.eq(a).parent().append($(b))
                                }
                            };
                            i(m)
                        }
                    }(n), !d && r === j.length - 1)
                        return;
                    r >= j.length - 1 ? r = 0 : r++
                }
            }
        }
        var e = a.MSOHUAD,
            f = e.adTemplate,
            g = e.adDomClassName,
            h = a.Statistics,
            i = e.renderAdAndSendStatis,
            j = a.MSOHU.AD.utils,
            k = a.article_config.channel_long_path[0][0],
            l = j.isNoADMSohu,
            m = (j.isTestEnvironment(), MSOHU.Utils || (MSOHU.Utils = {})),
            n = m.newExposureStatis || (m.newExposureStatis = new a.NewExposureStatis),
            o = a.MSOHU_AD_DATA_CONFIG,
            p = o.getAdData().article[k],
            q = a.article_config.channel_long_path,
            r = 0;
        return "\u4f53\u80b2" == k && q.length > 1 && "2016\u91cc\u7ea6\u5965\u8fd0\u4f1a" == q[1][0] && (p = o.getAdData().article["\u5965\u8fd0"]), {
            renderNormalAd: c,
            insertAd: d
        }
    }();
    ARTICLE.ArticleAd = b
}(window), function() {
    window.ARTICLE = window.ARTICLE || {};
    var a = $("div[data-wscrid]").eq(-1).attr("data-wscrid") || 0;
    template.helper("stringSlice", function(a, b, c) {
        return b = b || 0, c = c || 6, a ? a && a.length > c - b ? a.substr(b, c) + "..." : a.substr(b, c) : ""
    }), template.helper("getWscrid", function(b) {
        return b && (a = Number(a || 0) + 1), a
    });
    var b = {
        newsList: '<% var pullUpTime = data.pullUpTime; %>                   <% for ( var n = 0; n < data.news.length; n++ ) { %>                        <% var item = data.news[n]; %>                        <% if ( item.type === "p" && item.images03.length >= 3) { %>                            <div class="news-item news-item-img-three" data-pull-time="<%=pullUpTime%>" data-wscrid="<%=getWscrid(1)%>">                                <a href="/<%=item.type%>/<%=item.id%>/?_once_=000201_Click_Flow_automated&wscrid=<%=prefixWscrid%><%=getWscrid()%>">                                    <span class="title"><%=item.medium_title%></span>                                    <span class="news-img-list">                                        <span class="news-img-item">                                            <img src="//s8.rr.itc.cn/b<%=item.images03[0].img%>" alt="">                                        </span>                                        <span class="news-img-item">                                            <img src="//s8.rr.itc.cn/b<%=item.images03[1].img%>" alt="">                                        </span>                                        <span class="news-img-item">                                            <img src="//s8.rr.itc.cn/b<%=item.images03[2].img%>" alt="">                                        </span>                                    </span>                                    <span class="news-item-info">                                        <% if (item.media) { %>                                            <span><%=stringSlice(item.media)%></span>                                        <% } %>                                        <% if ( item.participation_count >= 100 ) { %>                                            <% if ( item.participation_count < 10000 ) { %>                                                <span><i class="glyph glyph-icons-comment"></i><%=item.participation_count%></span>                                            <% } else { %>                                                <span><i class="glyph glyph-icons-comment"></i><%= (item.participation_count / 10000).toFixed(1) %>\u4e07</span>                                            <% } %>                                        <% } %>                                    </span>                                    <span class="tag-wp">                                        <% if ( item.hotwords ) { %>                                            <em class="tag"><%=item.hotwords%></em>                                        <% } else if ( item.source && item.source === "\u6df1\u5ea6" ) { %>                                            <em class="tag">\u6df1\u5ea6</em>                                        <% } %>                                    </span>                                </a>                            </div>                        <% } else if (item.type === "n" && item.images03.length > 0 ) { %>                            <div class="news-item news-item-img-sm" data-pull-time="<%=pullUpTime%>" data-wscrid="<%=getWscrid(1)%>">                                <a href="/<%=item.type%>/<%=item.id%>/?_once_=000201_Click_Flow_automated&wscrid=<%=prefixWscrid%><%=getWscrid()%>">                                    <span class="img-wp">                                        <img src="//s8.rr.itc.cn/b<%=item.images03[0].img%>" alt="">                                    </span>                                    <span class="title"><%=item.medium_title%></span>                                    <% if (item.media || item.view_count >= 100) { %>                                    <span class="news-item-info">                                        <% if (item.media) { %>                                            <span><%=stringSlice(item.media)%></span>                                        <% } %>                                        <% if ( item.view_count >= 100 ) { %>                                            <% if ( item.view_count < 10000 ) { %>                                                <span><i class="glyph glyph-icons-view"></i><%=item.view_count%></span>                                            <% } else { %>                                                <span><i class="glyph glyph-icons-view"></i><%= (item.view_count / 10000).toFixed(1) %>\u4e07</span>                                            <% } %>                                        <% } %>                                    </span>                                    <% } %>                                    <span class="tag-wp">                                        <% if ( item.hotwords ) { %>                                            <em class="tag"><%=item.hotwords%></em>                                        <% } else if ( item.source && item.source === "\u6df1\u5ea6" ) { %>                                            <em class="tag">\u6df1\u5ea6</em>                                        <% } %>                                    </span>                                </a>                            </div>                        <% } else if (item.type === "promo") { %>                            <div class="news-item news-item-img-sm" data-pull-time="<%=pullUpTime%>" data-wscrid="<%=getWscrid(1)%>">                                <a href="<%=item.link %>&wscrid=<%=prefixWscrid%><%=getWscrid()%>">                                    <% if (item.images03.length > 0) { %>                                    <span class="img-wp">                                        <img src="//s8.rr.itc.cn/b<%=item.images03[0].img%>" alt="">                                    </span>                                    <% } %>                                    <span class="title"><%=item.medium_title%></span>                                    <span class="tag-wp">                                        <% if ( item.tag ) { %>                                            <em class="tag"><%=item.tag%></em>                                        <% } %>                                    </span>                                </a>                            </div>                        <% } else if (item.type === "v") { %>                            <div class="news-item news-item-img-sm" data-pull-time="<%=pullUpTime%>" data-wscrid="<%=getWscrid(1)%>">                                <a href="<%=item.link%>&wscrid=<%=prefixWscrid%><%=getWscrid()%>">                                    <% if (item.images03.length > 0) { %>                                    <span class="img-wp">                                        <img src="//s8.rr.itc.cn/b<%=item.images03[0].img%>" alt="">                                        <span class="video-time"><%=item.duration%></span>                                    </span>                                    <% } %>                                    <span class="title"><%=item.medium_title%></span>                                    <% if (item.director || item.play_count >= 100) { %>                                        <span class="news-item-info">                                            <% if (item.director) { %>                                                <span><%=stringSlice(item.director)%></span>                                            <% } %>                                            <% if ( item.play_count >= 100 ) { %>                                                <% if ( item.play_count < 10000 ) { %>                                                    <span><i class="glyph glyph-icons-play"></i><%=item.play_count%></span>                                                <% } else { %>                                                    <span><i class="glyph glyph-icons-play"></i><%= (item.play_count / 10000).toFixed(1) %>\u4e07</span>                                                <% } %>                                            <% } %>                                        </span>                                    <% } %>                                    <% if (item.tag) { %>                                        <span class="tag-wp">                                            <em class="tag"><%=item.tag%></em>                                        </span>                                    <% } %>                                </a>                            </div>                        <% } else { %>                            <div class="news-item news-item-img-no" data-pull-time="<%=pullUpTime%>" data-wscrid="<%=getWscrid(1)%>">                                 <% if (item.type === "url") { %>                                    <a href="<%=item.url%>?_once_=000201_Click_Flow_automated&wscrid=<%=prefixWscrid%><%=getWscrid()%>">                                <% } else { %>                                    <a href="/<%=item.type%>/<%=item.id%>/?_once_=000201_Click_Flow_automated&wscrid=<%=prefixWscrid%><%=getWscrid()%>">                                <% } %>                                    <span class="title"><%=item.medium_title%></span>                                    <% if (item.media || item.view_count >= 100) { %>                                    <span class="news-item-info">                                        <% if (item.media) { %>                                            <span><%=stringSlice(item.media)%></span>                                        <% } %>                                        <% if ( item.view_count >= 100 ) { %>                                            <% if ( item.view_count < 10000 ) { %>                                                <span><i class="glyph glyph-icons-view"></i><%=item.view_count%></span>                                            <% } else { %>                                                <span><i class="glyph glyph-icons-view"></i><%= (item.view_count / 10000).toFixed(1) %>\u4e07</span>                                            <% } %>                                        <% } %>                                    </span>                                    <% } %>                                    <span class="tag-wp">                                        <% if ( item.hotwords ) { %>                                            <em class="tag"><%=item.hotwords%></em>                                        <% } else if ( item.source && item.source === "\u6df1\u5ea6" ) { %>                                            <em class="tag">\u6df1\u5ea6</em>                                        <% } %>                                    </span>                                </a>                            </div>                        <% } %>                   <% } %>',
        videoList: '<% var pullUpTime = data.pullUpTime; %>                    <% for ( var n = 0; n < data.videos.length; n++ ) { %>                        <% var item = data.videos[n]; %>                        <div class="news-item news-item-img-sm" data-pull-time="<%=pullUpTime%>" data-id="<%=item.id%>" data-vid="<%=item.vid%>" data-wscrid="<%=getWscrid(1)%>">                            <a href="<%=item.link%>?wscrid=<%=prefixWscrid%><%=getWscrid()%>">                                <span class="img-wp">                                    <img src="<%=item.thumbnail%>" alt="<%=item.name%>">                                    <span class="video-time"><%=item.duration%></span>                                </span>                                <span class="title"><%=item.name%></span>                                <% if (item.director || item.play_count >= 100) { %>                                    <span class="news-item-info">                                        <% if (item.director) { %>                                            <span class="news-author"><%=stringSlice(item.director)%></span>                                        <% } %>                                        <% if ( item.play_count >= 100 ) { %>                                            <% if ( item.play_count < 10000 ) { %>                                                <span class="news-count"><i class="glyph glyph-icons-play"></i><%=item.play_count%></span>                                            <% } else { %>                                                <span class="news-count"><i class="glyph glyph-icons-play"></i><%= (item.play_count / 10000).toFixed(1) %>\u4e07</span>                                            <% } %>                                        <% } %>                                    </span>                                <% } %>                                <% if (item.tag) { %>                                    <span class="tag-wp">                                        <em class="tag"><%=item.tag%></em>                                    </span>                                <% } %>                            </a>                        </div>                    <% } %>',
        loading: '<div class="loading" style="display:none;">                    <i class="sprite-icons-loading"></i>                    <span>\u6b63\u5728\u52a0\u8f7d</span>                  </div>',
        loadErr: '<div class="load-error">\u52a0\u8f7d\u5931\u8d25&nbsp\u70b9\u51fb\u6216\u4e0a\u62c9\u91cd\u8bd5</div>',
        shareFailLayer: '                        <% var mobile = data.mobile; %>                        <% if ( mobile === "others" ) { %>                            <div class="share-fail-layer">                        <% } else { %>                            <div class="share-fail-layer mobile-normal mobile-<%= mobile %>">                        <% } %>                                \u8fde\u63a5\u5fae\u4fe1\u5931\u8d25\u5566\uff01<br/>                                <% if ( mobile === "others" ) { %>                                    \u70b9\u51fb\u6d4f\u89c8\u5668\u5de5\u5177\u680f\u7684\u5206\u4eab                                <% } else if ( mobile === "samsung" ) { %>                                    \u5728\u5730\u5740\u680f\u201c\u66f4\u591a\u201d\u4e2d\uff0c\u70b9\u51fb\u201c\u5206\u4eab\u201d\u6309\u94ae\u3002<br/>                                <% } else { %>                                    \u70b9\u51fb\u4e0b\u65b9"<span class="share share-share-<%= mobile %>"></span>"\uff0c\u9009\u62e9"\u5206\u4eab"\u3002<br/>                                <% } %>                                \u8ba9\u66f4\u591a\u4eba\u770b\u5230\u597d\u6587\u7ae0\u3002                                <span class="closeBtn glyph glyph-icons-close"></span>                                <span class="close-round-bg"></span>                            </div>'
    };
    ARTICLE.fluidTemplates = b, ARTICLE.resetFluidTplWscridStart = function() {
        a = 0
    }
}(), function(a) {
    a.ARTICLE = a.ARTICLE || {};
    var b = function(b) {
        function c(a, b) {
            for (var c, d, e = [], f = /(.*)\/\/([^\/]+)/i, g = 0; g < a.length; g++)
                c = $(a[g]).find("a").attr("href").split("?")[0],
                c = c.replace(f, ""), d = $(a[g]).attr("data-wscrid"), d && (c = d + "_" + c, e.push({
                    dom: a[g],
                    callback: function(a, c) {
                        return function(a, d) {
                            Statistics.addStatistics({
                                _once_: b,
                                path: d || c
                            }, "//zz.m.sohu.com/ex.gif?")
                        }
                    }(a[g], c),
                    path: c,
                    type: "pieceExpose"
                }));
            return e
        }
        function d() {
            var a = $(".select-wrapper .news-item[data-wscrid]");
            v.add(c(a.slice(y.length), z)).once(), y = a
        }
        function e(b) {
            p = b.container || $("body"), apiBaseUrl = b.apiBaseUrl || "", E = void 0 !== b.fluidStart ? b.fluidStart : E, G = b.pullUpNewsLength || G, I = b.fluidTemplates || I, C = b.dataKey || "news", z = b.pieceExposeOnceCode || z, A = b.exposeOnceCode || A, K = b.loadingStatisCodeObj || K, w = b.successCallback || w, t = b.selectWrapper || $(".select-wrapper")[0], s = b.headerHeight || $(".header").height() || 0, u = $(a).height(), q || (q = $(I.loading), p.parent().append(q)), z && (v = new D(c(y, z)))
        }
        function f() {
            return a.pageYOffset + a.innerHeight + 150
        }
        function g() {
            $(a).on("scroll.loadMore", i), A && $(a).on("scroll.screenExpose", j)
        }
        function h() {
            $(a).off("scroll.loadMore"), A && $(a).off("scroll.screenExpose")
        }
        function i() {
            ARTICLE.onOriginalImg || J && f() >= document.body.scrollHeight && (0 === $(".picFin").length || "none" === $(".picFin")[0].style.display) && m()
        }
        function j() {
            var a,
                b,
                c,
                d = t.getBoundingClientRect(),
                e = d.top;
            e > s || (b = Math.floor(Math.abs(e) / u) + 1, a = Math.abs(e) % u, a <= s && B.indexOf(b) < 0 && (B.push(b), c = b <= 20 ? A + "_" + (b < 10 ? "0" : "") + b : A + "_more", Statistics.addStatistics(c)))
        }
        function k(a, b, c) {
            a && (a.prefixWscrid = H);
            var d = template.compile(I.dataList);
            a.data.pullUpTime = b;
            var e = d(a);
            p.append($(e)), c && w && "function" == typeof w && w($('div[data-pull-time="' + b + '"]'), c)
        }
        function l(b) {
            if (a.article_config.firstScreenNews && a.article_config.firstScreenNews.news) {
                p = p || b;
                var c = {
                        data: {}
                    },
                    d = a.article_config.firstScreenNews.news,
                    e = $("#newsListWrapper .news-item").not("div[data-msohu-money=true]").length;
                if (e < 39) {
                    var f = 39 - e,
                        g = d.slice(0, f);
                    c.data[C] = g, E = g.length, x = 0, k(c, x, !1)
                }
            }
        }
        function m() {
            if (J) {
                if (q.show(), r && (r.hide(), r.off("click")), J = !1, 0 === x && a.article_config && a.article_config.firstScreenNews && a.article_config.firstScreenNews.news) {
                    var b = {
                            data: {}
                        },
                        c = a.article_config.firstScreenNews.news,
                        e = c.slice(E, E + 20);
                    return b.data[C] = e, E = F + E + e.length, x++, k(b, x, !0), z && d(), void (J = !0)
                }
                $.ajax({
                    url: apiBaseUrl + "&s=" + E + "&c=" + G + "&dc=1",
                    type: "GET",
                    dataType: "json",
                    timeout: 8e3,
                    success: function(a) {
                        Statistics.addStatistics(K.success), x++;
                        var b = a;
                        b.data && b.data[C] && (E = void 0 !== b.data.start_pos ? b.data.start_pos : E + G, k(b, x, !0), z && d())
                    },
                    error: function(a, b) {
                        switch (b) {
                        case "error":
                            Statistics.addStatistics(K.error);
                            break;
                        case "timeout":
                            Statistics.addStatistics(K.timeout);
                            break;
                        case "abort":
                            Statistics.addStatistics(K.abort);
                            break;
                        default:
                            Statistics.addStatistics(K.others)
                        }
                        r || (r = $(I.loadErr), p.parent().append(r)), r.show(), r.on("click", i)
                    },
                    complete: function() {
                        q.hide(), J = !0
                    }
                })
            }
        }
        function n() {
            g()
        }
        function o() {
            h()
        }
        var p,
            q,
            r,
            s,
            t,
            u,
            v,
            w,
            x = 0,
            y = $(".select-wrapper .news-item[data-wscrid]"),
            z = "",
            A = "",
            B = [],
            C = "news",
            D = a.NewExposureStatis,
            E = 0,
            F = a.article_config && a.article_config.fluidStartPos || 0,
            G = 20,
            H = "95360_",
            I = {
                dataList: "",
                loading: "",
                loadErr: ""
            },
            J = !0,
            K = {
                success: "000201_Load_True",
                error: "000201_Load_False_error",
                timeout: "000201_Load_False_timeout",
                abort: "000201_Load_False_abort",
                others: "000201_Load_False_else"
            };
        return e(b), {
            render: n,
            makeUpFirstScreenADItems: l,
            pullUpAction: m,
            destroy: o
        }
    };
    ARTICLE.ArticleFluid = b
}(window), function(a) {
    var b,
        c = a.MSOHU || (a.MSOHU = {}),
        d = (c.Modules || (c.Modules = {}), c.ImgStatistic),
        e = a.Statistics,
        f = a.ImageLazyLoader,
        g = $("article .media-wrapper .image img").filter(function() {
            return $("#rest_content").has($(this)) === -1
        });
    b = new d({
        srcAttr: "original",
        indexAttr: "data-index",
        chkData: {
            attr: "data-imgchk",
            success: "loaded",
            fail: "failed"
        },
        notFoundCode: "000196_404",
        errorCode: "000196_neterror"
    }), b.listenImgLoad({
        ele: g,
        successCallBack: function(a, b, c, d) {
            var e,
                f;
            a && (e = b || 1, f = a.target, f && d && d._is404DefaultPic(f) && $(f).closest(".media-wrapper").remove(), d._notFoundCallBack && d._notFoundCallBack(a, b, c, d))
        },
        errorCallBack: function(a, b, c, d) {
            var e,
                f;
            a && (e = b || 1, f = a.target, f && $(f).closest(".media-wrapper").remove(), d && d._errorCallBack && d._errorCallBack(a, b, c, d))
        }
    });
    var h = new f({
            realSrcAttribute: "original"
        }),
        i = function(a) {
            return !this instanceof i ? new i(a) : (this.config = a, this.newsId = a.newsId, this.showMoreBtn = $(a.showMoreBtn), this.setFontBtn = $(a.setFontBtn), this.layoutNode = $(a.layoutNode), this.layNode = $(a.layNode), this.originPicNode = $(a.originPicNode), this.originPicNode_img = $(a.originPicNode_img), this.imgNode = $(a.imgNode), this.bigIcon = $(a.bigIcon), this.cnt = $(a.cnt), this.restCnt = $(a.restCnt), void this.init())
        };
    i.prototype = {
        constructor: i,
        init: function() {
            this.bindUI()
        },
        bindUI: function() {
            var a = this;
            a.showMoreBtn.length && a.showMoreBtn.get(0).addEventListener("click", function() {
                a.show_more_content()
            }, !1)
        },
        show_more_content: function() {
            var a = this,
                c = $(".editor"),
                d = a.showMoreBtn.eq(0),
                f = a.restCnt.find("img[original-hidden]"),
                g = a.restCnt.find(".media-wrapper .image img");
            e.addStatistics("000201_Click_expandremaining_true"), d.hide(), a.restCnt.show();
            for (var i = 0, j = f.length; i < j; i++)
                f.eq(i).attr("original", f.eq(i).attr("original-hidden"));
            h.scan(a.restCnt[0]), 0 !== c.length && c.show(), b.listenImgLoad({
                ele: g,
                successCallBack: function(a, b, c, d) {
                    var e,
                        f;
                    a && (e = b || 1, f = a.target, f && d && d._is404DefaultPic(f) && $(f).closest(".media-wrapper").remove(), d._notFoundCallBack && d._notFoundCallBack(a, b, c, d))
                },
                errorCallBack: function(a, b, c, d) {
                    var e,
                        f;
                    a && (e = b || 1, f = a.target, f && $(f).closest(".media-wrapper").remove(), d && d._errorCallBack && d._errorCallBack(a, b, c, d))
                }
            })
        },
        reloadAd: function() {
            var a = $('script[src*="ad.js"]');
            0 !== a.length && ((new Image).src = a[0].src + "?" + Date.now(), new Function(a.next("script").text())())
        }
    }, a.News = i
}(window), $(document).ready(function() {
    !function() {
        var a = article_config,
            b = {
                newsId: a.news_id,
                showMoreBtn: ".expend-wp a",
                imgNode: ".cnt .pic .img img",
                restCnt: "#rest_content"
            };
        new News(b)
    }()
}), function() {
    function a(a) {
        var c,
            d,
            e,
            f = (new Date).getTime();
        return d = f - Number(a), e = b(d), e || (c = new Date(a), e = c.getFullYear() + "\u5e74" + (c.getMonth() + 1) + "\u6708" + c.getDate() + "\u65e5"), e
    }
    function b(a) {
        var b = "";
        return a < 6e4 ? b = "\u521a\u521a" : a < 36e5 ? b = Math.floor(a / 6e4) + "\u5206\u949f\u524d" : a <= 864e5 ? b = Math.floor(a / 36e5) + "\u5c0f\u65f6\u524d" : a <= 1728e5 && (b = "1\u5929\u524d"), b
    }
    function c(a) {
        var b;
        for (var c in h)
            b = new RegExp(c, "g"), b.test(a) && (a = a.replace(b, h[c]));
        return a
    }
    function d(a, b) {
        var c,
            d = a.text || "";
        d && d.replace(/\s+/g, "") && (c = {
            newsId: a.topicId,
            replyId: a.replyId,
            content: f(d)
        }, e(c, b))
    }
    function e(a, b) {
        var c = {
            success: 0,
            fail: 1
        };
        $.ajax({
            url: i.submitComment,
            data: a,
            type: "post",
            dataType: "json",
            success: function(d) {
                var e = d.status;
                1 !== e && 2 !== e && 3 !== e && 0 === e && (a.commentId = d.data.commentId, b(c.success, a))
            },
            error: function() {
                b(c.fail)
            },
            timeout: function() {
                b(c.fail)
            }
        })
    }
    function f(a) {
        var b = /\ud83c[\udc00-\udfff]|\ud83d[\udc00-\udfff]|[\u2600-\u26ff]|[\u2300-\u23ff]|[\u2700-\u27bf]/g;
        return a.replace(b, "")
    }
    var g,
        h = {
            "\\[/?\u594b\u6597\\]": '<i class="i_face i_fendou"></i>',
            "\\[/?\u9f13\u638c\\]": '<i class="i_face i_guzhang"></i>',
            "\\[/?\u53d1\u6012\\]": '<i class="i_face i_fanu"></i>',
            "\\[/?\u8272\\]": '<i class="i_face i_se"></i>',
            "\\[/?\u7ed9\u529b\\]": '<i class="i_face i_geili"></i>',
            "\\[/?\u61a8\u7b11\\]": '<i class="i_face i_hanxiao"></i>',
            "\\[/?\u5927\u54ed\\]": '<i class="i_face i_daku"></i>',
            "\\[/?\u7591\u95ee\\]": '<i class="i_face i_yiwen"></i>',
            "\\[/?\u94b1\\]": '<i class="i_face i_qian"></i>',
            "\\[/?\u53ef\u601c\\]": '<i class="i_face i_kelian"></i>',
            "\\[/?\u53ef\u7231\\]": '<i class="i_face i_keai"></i>',
            "\\[/?\u6293\u72c2\\]": '<i class="i_face i_zhuakuang"></i>',
            "\\[/?\u5f3a\\]": '<i class="i_face i_qiang"></i>',
            "\\[/?\u5f31\\]": '<i class="i_face i_ruo"></i>',
            "\\[/?\u73ab\u7470\\]": '<i class="i_face i_meigui"></i>',
            "\\[/?\u60ca\u8bb6\\]": '<i class="i_face i_jingya"></i>',
            "\\[/?\u6d6e\u4e91\\]": '<i class="i_face i_fuyun"></i>',
            "\\[/?\u6253\u9171\u6cb9\\]": '<i class="i_face i_dajiangyou"></i>',
            "\\[/?\u63e1\u624b\\]": '<i class="i_face i_woshou"></i>',
            "\\[/?\u62f3\u5934\\]": '<i class="i_face i_quantou"></i>',
            "\\[/?\u9152\\]": '<i class="i_face i_jiu"></i>',
            "\\[/?\u7231\u4f60\\]": '<i class="i_face1 i_aini"></i>',
            "\\[/?\u95ed\u5634\\]": '<i class="i_face1 i_bizui"></i>',
            "\\[/?\u5403\u60ca\\]": '<i class="i_face1 i_chijing"></i>',
            "\\[/?\u5927\u7b11\\]": '<i class="i_face1 i_daxiao"></i>',
            "\\[/?\u52a0\u6cb9\\]": '<i class="i_face1 i_jiayou"></i>',
            "\\[/?\u5956\u676f\\]": '<i class="i_face1 i_jiangbei"></i>',
            "\\[/?\u54ed\\]": '<i class="i_face1 i_ku"></i>',
            "\\[/?\u62c9\u82b1\\]": '<i class="i_face1 i_lahua"></i>',
            "\\[/?\u8721\u70db\\]": '<i class="i_face1 i_lazhu"></i>',
            "\\[/?\u6d41\u6c57\\]": '<i class="i_face1 i_liuhan"></i>',
            "\\[/?\u5564\u9152\\]": '<i class="i_face1 i_pijiu"></i>',
            "\\[/?\u4f24\u5fc3\\]": '<i class="i_face1 i_shangxin"></i>',
            "\\[/?\u751f\u6c14\\]": '<i class="i_face1 i_shengqi"></i>',
            "\\[/?\u7761\u89c9\\]": '<i class="i_face1 i_shuijiao"></i>',
            "\\[/?\u5fae\u7b11\\]": '<i class="i_face1 i_weixiao"></i>',
            "\\[/?\u59d4\u5c48\\]": '<i class="i_face1 i_weiqu"></i>',
            "\\[/?\u9c9c\u82b1\\]": '<i class="i_face1 i_xianhua"></i>',
            "\\[/?\u5fc3\\]": '<i class="i_face1 i_xin"></i>',
            "\\[/?\u8d5e\\]": '<i class="i_face1 i_zan"></i>',
            "\\[/?\u8db3\u7403\\]": '<i class="i_face1 i_zuqiu"></i>'
        },
        i = {
            submitComment: "/reply/api/comment/submit"
        };
    g = {
        processCommentTime: a,
        replaceFace: c,
        validateComment: d,
        sendComment: e,
        filterPhoneDefaultFace: f
    }, window.CommentFunc = g
}(), function() {
    function a(a) {
        a = a || {}, this.$wrapper = $(a.wrapper || "body"), this.validate = a.validate, this.onShow = a.onShow, this.onHide = a.onHide, this.onInputFocus = a.onInputFocus, this.onInputBlur = a.onInputBlur, this.afterSuccess = a.afterSuccess, this.afterFail = a.afterFail, this.data = {
            nick: a.nick || "",
            placeholder: a.placeholder || "\u6211\u6765\u8bf4\u4e24\u53e5...",
            topicId: a.topicId,
            replyId: a.replyId || 0
        }, this.maxWords = a.maxWords || 1e3, this.iosTipClass = "", this.windowScrollTop = document.body.scrollTop || window.pageYOffset, this.isShowInPopup = !0, "undefined" != typeof a.isShowInPopup && (this.isShowInPopup = !!a.isShowInPopup), this.init()
    }
    var b = window.MSOHU || {},
        c = window.supporter,
        d = !!c.os.ios,
        e = b.Helpers || {},
        f = window.template,
        g = e.proxy,
        h = {
            SUCCESS: 0,
            FAIL: 1
        },
        i = "active-publish",
        j = "position-relative",
        k = '<div class="comment-input-container">                                    <div class="comment-input-bg"></div>                                    <form class="comment-input-wrapper" action="/cm/touch/" method="post">                                        <div>                                        <textarea class="comment-input" name="content" placeholder="<%=placeholder%>" autofocus></textarea>                                        <p class="comment-input-bottom">                                            <span class="nick-name"><%=nick%></span>                                            <span class="publish" data-topic-id="<%=topicId%>" data-reply-id="<%=replyId%>">\u53d1\u9001</span>                                            <span class="active-close">\u53d6\u6d88</span>                                        </p>                                        </div>                                    </form>                                </div>',
        l = '<div class="article-comment-tip <%=iosTipClass%>">                            <% if (type === "success") { %>                                <i class="article-comment-success"></i>                            <% } %>                            <span><%=text%></span>                       </div>';
    a.prototype = {
        constructor: a,
        init: function() {
            this.show(), this.$textArea.focus(), this.bindEvent()
        },
        bindEvent: function() {
            this.isShowInPopup && (d ? $("body").addClass(j) : this.$bg.on("click", g(this.hide, this))), "function" == typeof this.onInputFocus && this.$textArea.on("focus", this.onInputFocus), "function" == typeof this.onInputBlur && this.$textArea.on("blur", this.onInputBlur), this.$form.on("click", this.preventPropagation), this.$publish.on("click", g(this.publish, this)), this.$textArea.on("keyup", g(this.inputChange, this));
            try {
                this.$textArea.on("input", g(this.inputChange, this))
            } catch (a) {
                console.log(a)
            }
            this.$close.on("click", g(this.hide, this))
        },
        bindTipEvent: function() {
            this.$tip.on("webkitTransitionEnd", g(this.tipDestroy, this)), this.$tip.on("transitionend", g(this.tipDestroy, this))
        },
        preventPropagation: function(a) {
            return a.preventDefault(), a.stopPropagation(), !1
        },
        modifyPlaceholder: function(a) {
            this.data.placeholder = a, this.$textArea.attr("placeholder", a)
        },
        modifyReplyId: function(a) {
            this.data.replyId = a, this.$publish.attr("data-reply-id", a)
        },
        removeTipEvent: function() {
            this.$tip.off("webkitTransitionEnd"), this.$tip.off("transitionend")
        },
        inputChange: function(a) {
            var b = this.$textArea.val().trim();
            !this.$publish.hasClass(i) && b.length > 0 ? this.$publish.addClass(i) : b.length <= 0 && this.$publish.removeClass(i)
        },
        checkPublishState: function(a) {
            var b = this,
                c = a.text || "";
            c && c.length <= this.maxWords ? (this.$textArea.blur(), this.validate(a, g(this.publishCallback, this))) : c.length > this.maxWords && (this.$tip || (this.$tip = $(f.compile(l)({
                iosTipClass: this.iosTipClass,
                text: "\u8bc4\u8bba\u5b57\u6570\u4e0d\u80fd\u8d85\u8fc7" + this.maxWords + "\u5b57"
            })), this.bindTipEvent(), $(document.body).append(this.$tip), setTimeout(function() {
                b.$tip.css({
                    opacity: 0
                }), b.$textArea.focus()
            }, 50)))
        },
        publish: function(a) {
            var b = this.$textArea.val().trim(),
                c = this.$publish.attr("data-reply-id") || 0,
                d = this.$publish.attr("data-topic-id");
            this.$textArea.focus(), this.checkPublishState({
                topicId: d,
                replyId: c,
                text: b
            })
        },
        publishCallback: function(a, b) {
            a === h.SUCCESS && b.commentId ? this.onSuccess(b) : this.onFail(a)
        },
        onSuccess: function(a) {
            var b = this;
            this.$textArea.val(""), this.$publish.removeClass(i), "function" == typeof this.afterSuccess && this.afterSuccess(a), b.$tip || (b.$tip = $(f.compile(l)({
                type: "success",
                text: "\u8bc4\u8bba\u6210\u529f"
            })), b.bindTipEvent(), b.hide(), setTimeout(function() {
                $(document.body).append(b.$tip), setTimeout(function() {
                    b.$tip.css({
                        opacity: 0
                    })
                }, 20)
            }, 200))
        },
        onFail: function(a) {
            var b = this;
            "function" == typeof this.afterFail && this.afterFail(a), this.$tip || (this.$tip = $(f.compile(l)({
                iosTipClass: this.iosTipClass,
                text: "\u7f51\u7edc\u5f02\u5e38\uff0c\u8bf7\u91cd\u8bd5"
            })), this.bindTipEvent(), $(document.body).append(this.$tip), setTimeout(function() {
                b.$tip.css({
                    opacity: 0
                }), b.$textArea.focus()
            }, 50))
        },
        show: function() {
            this.$template ? (this.$template.show(), this.$textArea.focus()) : (this.$template = $(f.compile(k)(this.data)), this.$wrapper.append(this.$template)), "function" == typeof this.onShow && this.onShow(), this.$bg = this.$template.find(".comment-input-bg"), this.$form = this.$template.find("form"), this.$textArea = this.$template.find(".comment-input"), this.$publish = this.$template.find(".publish"), this.$close = this.$template.find(".active-close"), this.isShowInPopup && (d && (this.$bg.addClass("comment-input-bg-ios"), this.$form.addClass("comment-input-wrapper-ios"), this.iosTipClass = "article-comment-tip-ios", window.scrollTo(0, 1)), $("body").on("touchmove.preventScroll", function(a) {
                a.preventDefault()
            }, !1))
        },
        hide: function(a) {
            this.$template.hide(), "function" == typeof this.onHide && this.onHide(), window.scrollTo(0, this.windowScrollTop), this.$textArea.blur(), $("body").removeClass(j).off("touchmove.preventScroll")
        },
        tipDestroy: function() {
            this.removeTipEvent(), this.$tip.remove(), this.$tip = null
        }
    }, window.CommentInput = a
}(), function(a) {
    function b(a) {
        var b = "slice-comment",
            c = a.siblings(".fake-content"),
            d = c.height();
        c.addClass(b);
        var e = c.height();
        d <= e && a.find(".expand-comment").remove()
    }
    function c() {
        return renderCommentListHtml = w({}), r.html(renderCommentListHtml), z(), !1
    }
    function d() {
        var b = i.getQueryArgValue(o, p),
            c = {};
        b && (a.scrollTo(0, $(".comment-wrapper").offset().top), c[p] = b, history.replaceState(null, "", i.removeQueryArgs(o, c)), $(function() {
            $(".comment-publish").click()
        }))
    }
    function e() {
        var b,
            c = !!g.get("ppinf"),
            d = {},
            e = {};
        Statistics.addStatistics("000201_Click_comments_input"), c ? (d.topicId = n, d.nick = j(g.get("nickname")), d.validate = l.validateComment, d.wrapper = ".article-comment-input-wrapper", d.isShowInPopup = !1, d.onShow = function() {
            v.hide(), q.hide()
        }, d.onHide = function() {
            v.show(), q.show()
        }, d.onInputFocus = function(a) {
            q.hide()
        }, d.onInputBlur = function(a) {
            q.show()
        }, u ? u.show() : u = new k(d)) : (e[p] = n, b = "/cy/login/?v=3&_once_=000023_login_page&lastPageUrl=" + encodeURIComponent(i.addQueryArgs(o, e)), a.location.href = b)
    }
    function f() {
        r.on("touchstart.stopPropagation", ".comment-list .like-wrapper", function(b) {
            b = b || a.event, b.stopPropagation()
        }), r.on("click", ".comment-list .like-wrapper", function(a) {
            var b = $(this).find(".sprite-icons-heart");
            if (!b.attr("has-liked")) {
                var c = b.data("topic-id"),
                    d = b.data("comment-id"),
                    e = b.siblings(".like-num"),
                    f = e.text() ? e.text() : 0;
                b.attr("data-liked", 1), b.addClass("sprite-icons-clickheart").removeClass("sprite-icons-heart"), e.html(parseInt(f, 10) + 1), $.ajax({
                    type: "GET",
                    url: m.likeComment,
                    data: {
                        client_id: "cyqemw6s1",
                        topic_id: c,
                        comment_id: d,
                        action_type: 1
                    },
                    dataType: "jsonp",
                    success: function(a) {},
                    error: function() {}
                })
            }
        }), A(), d()
    }
    var g = a.CookieUtil,
        h = a.MSOHU,
        i = h.Helpers,
        j = i.sliceStringByByte,
        k = a.CommentInput,
        l = a.CommentFunc,
        m = {
            getCommentList: "/reply/api/comment/list/cursor",
            likeComment: "//changyan.sohu.com/api/2/comment/action"
        },
        n = a.article_config.news_id,
        o = a.location.href,
        p = "_auto_click_publish_",
        q = $(".header .header-fixed"),
        r = $("#commentContainer"),
        s = ($(".no-message-wp"), "/cm/" + n + "/?_once_=000201_Click_comments"),
        t = '<% var m, j, len; %>                            <div class="comment-list-wp">                                <div class="article-comment-input-wrapper">                                    <div class="comment-content-wrapper">                                        <i class="glyph glyph-icons-comment-publish"></i>                                        <div class="comment-publish"></div>                                        <% if (!cmt_sum || cmt_sum == 0) { %>                                            <input type="text" class="comment-content" placeholder="\u6211\u6765\u8bf4\u4e24\u53e5\uff0c\u6d88\u706d\u96f6\u8bc4\u8bba......">                                        <% } else { %>                                            <input type="text" class="comment-content" placeholder="\u6211\u6765\u8bf4\u4e24\u53e5......">                                        <% } %>                                    </div>                                </div>                                <% if (data) {%>                                    <%len = data.length;%>                                    <ul class="comment-list">                                        <% for ( var m = 0; m < len; m++ ) { %>                                            <li>                                                <div class="comment-info clearfix">                                                    <div class="name-wrapper fl">                                                        <i class="avatar glyph glyph-icons-comment-avator"></i>                                                        <em><%=sliceNick(data[m].nickname)%></em>                                                    </div>                                                    <div class="like-wrapper fr">                                                        <span class="like-num"><%=data[m].support_count%></span>                                                        <i class="sprite-icons-heart" data-topic-id="<%=data[m].top_id%>" data-comment-id="<%=data[m].comment_id%>"></i>                                                    </div>                                                </div>                                                <input type="checkbox" class="expand-comment-check" id="expand-comment-check-<%=m%>" value="" style="display: none;pointer-events:none;"/>                                                <p class="content">                                                    <a class="slice-comment" href="<%=data[m].more_comment_link%>"><%=data[m].content%></a>                                                    <label class="expand-comment" for="expand-comment-check-<%=m%>">\u66f4\u591a<i class="expand-more-icon glyph glyph-icons-expand-arrow"></i></label>                                                </p>                                                <p class="fake-content"><a href="javascript:void(0);"><%=data[m].content%></a></p>                                            </li>                                        <% } %>                                    </ul>                                    <% if (cmt_sum > len) { %>                                    <div class="comment-menus">                                        <a class="comment-menu more-comments">\u67e5\u770b\u5168\u90e8<span class="total-comments"><%cmt_sum%></span>\u6761\u8bc4\u8bba</a>                                    </div>                                    <% } %>                                <% } %>                            </div>';
    template.helper("sliceNick", j);
    var u,
        v,
        w = template.compile(t),
        x = function(a) {
            var b = $(".total-comments");
            a > 9999 && (a = "9999+"), b && b.html(a)
        },
        y = function() {
            $(".h2-title a, .more-comments").attr("href", s)
        },
        z = function() {
            v = $(".comment-content-wrapper"), $(document).on("click", ".comment-publish", e)
        },
        A = function() {
            $.ajax({
                url: m.getCommentList,
                data: {
                    newsId: n,
                    pageSize: 3,
                    preCursor: 0,
                    isLogin: !0
                },
                dataType: "json",
                success: function(a) {
                    var d,
                        e,
                        f,
                        g,
                        h = a,
                        i = {
                            data: []
                        };
                    if (1 === h.status)
                        return void c();
                    if (h = h.data, e = h.comments.length, 0 === h.comments.length)
                        return void c();
                    for (d = 0; d < e; d++) {
                        var j = h.comments[d],
                            k = l.processCommentTime(j.create_time);
                        i.cmt_sum = h.cmt_sum, i.data.push({
                            nickname: j.passport.nickname,
                            create_time: k,
                            support_count: j.support_count > 0 ? j.support_count : "",
                            content: j.content,
                            comment_id: j.comment_id,
                            top_id: n,
                            more_comment_link: s
                        })
                    }
                    f = w(i), r.html(l.replaceFace(f)), x(h.cmt_sum), y(), z(), g = $(".body-text .comment-list .content"), g.each(function(a, c) {
                        b($(c))
                    })
                },
                error: function() {
                    Statistics.addStatistics("000023_ChanFailed"), c()
                }
            })
        };
    f()
}(window), function() {
    function a(a) {
        a && a.article && a.article.newsid && (this.AJAX_TIMEOUT = a.timeout || 6e3, this.article = a.article || {}, this.likeBtn = $(".like"), this.likeNum = $(".like-num"), this.dislikeNum = $(".unlike-num"), this.likeRatioEle = $(".like-ratio"), this.dislikeBtn = $(".unlike"), this.URL = {
            likeNum: "/counter/news_" + this.article.newsid + "_like/total",
            like: "/counter/news_" + this.article.newsid + "_like/total/incr",
            dislikeNum: "/counter/news_" + this.article.newsid + "_dislike/total",
            dislike: "/counter/news_" + this.article.newsid + "_dislike/total/incr"
        }, this.addOneHTML = '<span class="addOne">+1</span>', this.init())
    }
    var b = window.MSOHU || (window.MSOHU = {}),
        c = b.Modules || (b.Modules = {});
    a.prototype = {
        likeTotal: 0,
        dislikeTotal: 0,
        likeRatio: 0,
        init: function() {
            var a = this;
            this.getLikes(), this.likeBtn.on("click", $.proxy(a.like, a)), this.dislikeBtn.on("click", $.proxy(a.dislike, a))
        },
        like: function() {
            var a = this;
            a.likeBtn.attr("data-liked") || (a.likeBtn.attr("data-liked", 1), a.likeBtn.append($(a.addOneHTML)), a.updateLikeNum(1), $.ajax({
                type: "GET",
                timeout: this.AJAX_TIMEOUT,
                url: this.URL.like,
                success: function(a) {
                    0 === parseInt(a, 10) && Statistics.addStatistics("000201_Click_like")
                },
                error: function() {}
            }))
        },
        dislike: function() {
            var a = this;
            a.dislikeBtn.attr("data-liked") || (a.dislikeBtn.attr("data-liked", 1), a.dislikeBtn.append($(a.addOneHTML)), a.updateDislikeNum(1), $.ajax({
                type: "GET",
                timeout: this.AJAX_TIMEOUT,
                url: this.URL.dislike,
                success: function(a) {
                    0 === parseInt(a, 10) && Statistics.addStatistics("000201_Click_dislike")
                },
                error: function() {}
            }))
        },
        getLikes: function() {
            var a = this;
            $.ajax({
                type: "GET",
                timeout: this.AJAX_TIMEOUT,
                url: this.URL.likeNum,
                success: function(b) {
                    b = parseInt(b, 10), a.likeTotal = b > 0 ? b : 0, a.likeNum.html(a.likeTotal), a.getDislikes()
                },
                error: function() {}
            })
        },
        getDislikes: function() {
            var a = this;
            $.ajax({
                type: "GET",
                timeout: this.AJAX_TIMEOUT,
                url: this.URL.dislikeNum,
                success: function(b) {
                    b = parseInt(b, 10), a.dislikeTotal = b > 0 ? b : 0, a.dislikeNum.html(a.dislikeTotal), a.calcRatio()
                },
                error: function() {}
            })
        },
        calcRatio: function() {
            var a;
            this.likeRatio = this.likeTotal / (this.likeTotal + this.dislikeTotal), a = 100 * this.likeRatio + "%", this.likeRatioEle.css({
                width: a
            })
        },
        updateLikeNum: function(a) {
            a = a || 1, this.likeTotal += a, this.likeNum.html(this.likeTotal), this.calcRatio(), this.likeBtn.find(".sprite-icons-like").addClass("sprite-icons-clicklike").removeClass("sprite-icons-like")
        },
        updateDislikeNum: function(a) {
            a = a || 1, this.dislikeTotal += a, this.dislikeNum.html(this.dislikeTotal), this.calcRatio(), this.dislikeBtn.find(".sprite-icons-unlike").addClass("sprite-icons-clickunlike").removeClass("sprite-icons-unlike")
        }
    }, "function" == typeof define && (define.amd || seajs) ? define("Like", [""], function(a) {
        return a
    }) : "undefined" != typeof module && module.exports && (module.exports = a), c.Like = a
}(), function() {
    function a(a, b, c) {
        var d;
        d = /^([tdg][1-9]\.)m\.sohu\.com$/.test(window.location.hostname) ? "//jsdev7.m.sohu.com/getpv/" + a + "/" : "/proxy/pv/?id=" + a + "&type=1", $.ajax({
            url: d,
            type: "GET",
            dataType: "json",
            success: b,
            error: c
        })
    }
    function b(a, b, c) {
        a && a > 0 ? (a > 9999e4 ? a = "9999\u4e07+" : a > 9999 && (a = (a / 1e4).toFixed(1) + "\u4e07"), c.text(a), b.show()) : b.hide()
    }
    function c(c) {
        var d = c && c.nid,
            e = c && c.$PVWrapper,
            f = c && c.$PVElement;
        d && e.length && f.length && a(d, function(a) {
            var c = 0;
            a && a.status && (c = a.data && a.data.pv_all), b(c, e, f)
        }, function() {
            e.hide(), f.text("")
        })
    }
    var d = window.MSOHU || (window.MSOHU = {}),
        e = d.Modules || (d.Modules = {});
    "function" == typeof define && (define.amd || seajs) ? define("renderViews", [""], function(a) {
        return a
    }) : "undefined" != typeof module && module.exports && (module.exports = c), e.renderViews = c
}(), function() {
    var a = window.Zepto || window.jQuery;
    window.ARTICLE = window.ARTICLE || {};
    var b = 200;
    /Android/i.test(window.navigator.userAgent) && (b = 0);
    var c = function() {
        this.id = GALLERY.utils.getId();
        var c = {
                newsPic_n: GALLERY.utils.setApi("/api/n/news/%id%/pic/", this.id),
                newsPic_o: GALLERY.utils.setApi("/api/o/news/%id%/pic/", this.id)
            },
            d = {
                data: c.newsPic_n
            };
        this.bodyScrollTop = 0;
        var e = {
            statHead: "000027",
            defaultShow: !1,
            defaultBackToFin: !0,
            transitionDuration: b,
            titleData: a(".article-wrapper h1")[0].innerHTML,
            backCallBack: {
                fuc: this.resetShow,
                self: this
            }
        };
        window.article_config.images ? (window.article_config.images.data ? (e.datas = {
            data: window.article_config.images.data
        }, "0" != window.article_config.images.status && "ok" != window.article_config.images.status || (this.gallery = new GALLERY.Gallery(e))) : (e.datas = {
            data: {
                images: window.article_config.images
            }
        }, this.gallery = new GALLERY.Gallery(e)), a.ajax({
            url: d.data,
            data: {
                empty: 1
            },
            type: "GET",
            dataType: "json",
            success: function() {}
        })) : (e.urls = d, this.gallery = new GALLERY.Gallery(e)), window.addEventListener("hashchange", a.proxy(this.onHashChange, this), !1)
    };
    c.prototype.onHashChange = function(a) {
        "" === window.location.hash && (this.gallery.visible && this.gallery.hide(), a.preventDefault())
    }, c.prototype.resetShow = function() {
        ARTICLE.onOriginalImg = !1, a(".picRoll").off("click", this.gallery._backCallBack), "#p" === window.location.hash && (GALLERY.Statistics.addStatistics("000027_picsback_v3"), window.history.go(-1))
    }, c.prototype.showPic = function(b) {
        var c = b.target,
            d = !0,
            e = a(c);
        if (e.attr("data-index")) {
            var f = window.CookieUtil.get("_smuid"),
                g = {
                    v: 3,
                    _smuid: f,
                    _smuid_type: f ? 2 : 1,
                    tt: (new Date).getTime()
                };
            Statistics.addStatistics(g, window.https_zz ? "https://zz.m.sohu.com/c.gif?" : "//zz.m.sohu.com/c.gif?"), GALLERY.Statistics.addStatistics("000027_pics_largev3");
            var h = window.location.href;
            window.location.href = (h.indexOf("#") !== -1 ? h.substring(0, h.indexOf("#")) : h) + "#p", this.gallery.show(+e.attr("data-index"), d)
        }
    }, window.GalleryFin = c
}(), function(a) {
    a.ARTICLE = a.ARTICLE || {};
    var b = {
        fluid_blocks: function(a) {
            return [{
                dom: a.eq(5)[0],
                callback: function() {
                    Statistics.addStatistics("000201_Expose_Flow_automated")
                }
            }, {
                dom: a.eq(10)[0],
                callback: function() {
                    Statistics.addStatistics("000201_Expose_Flow_automated")
                }
            }, {
                dom: a.eq(15)[0],
                callback: function() {
                    Statistics.addStatistics("000201_Expose_Flow_automated")
                }
            }, {
                dom: a.eq(20)[0],
                callback: function() {
                    Statistics.addStatistics("000201_Expose_Flow_automated")
                }
            }]
        },
        firstpage_blocks: [{
            dom: document.querySelector("#player_0"),
            callback: function() {
                Statistics.addStatistics("000201_Expose_tv")
            }
        }, {
            dom: document.querySelector(".expend-wp"),
            callback: function() {
                Statistics.addStatistics("000201_Expose_expandremaining")
            }
        }, {
            dom: document.querySelector(".comment-wrapper"),
            callback: function() {
                Statistics.addStatistics("000201_Expose_comment")
            }
        }, {
            dom: document.querySelector(".share-wrapper"),
            callback: function() {
                Statistics.addStatistics("000201_Expose_share")
            }
        }, {
            dom: document.querySelector(".content-related"),
            callback: function() {
                Statistics.addStatistics("000201_Expose_ralatednews")
            }
        }, {
            dom: document.querySelector(".related-news"),
            callback: function() {
                Statistics.addStatistics("000201_Expose_Flow_related")
            }
        }, {
            dom: document.querySelector(".similar-picturegroups"),
            callback: function() {
                Statistics.addStatistics("000201_Expose_Flow_relatedpicture")
            }
        }, {
            dom: document.querySelector(".extend-news"),
            callback: function() {
                Statistics.addStatistics("000201_Expose_Flow_extend")
            }
        }, {
            dom: document.querySelector(".recommand"),
            callback: function() {
                Statistics.addStatistics("000201_Expose_Flow_recommend")
            }
        }, {
            dom: document.querySelector(".video-pgc"),
            callback: function() {
                Statistics.addStatistics("000201_Expose_Flow_Tv_pgc")
            }
        }, {
            dom: document.querySelector(".news-item-novel-list"),
            callback: function() {
                Statistics.addStatistics("000201_Expose_Flow_novel")
            }
        }, {
            dom: document.querySelector(".sogou_hotwords"),
            callback: function() {
                Statistics.addStatistics("000201_Expose_Flow_hotword")
            }
        }, {
            dom: document.querySelector(".video-hot"),
            callback: function() {
                Statistics.addStatistics("000201_Expose_Flow_Tv_hot")
            }
        }, {
            dom: document.querySelector("#cqh5-final"),
            callback: function() {
                Statistics.addStatistics("000133_bg_zwlwj")
            }
        }, {
            dom: document.querySelector(".game"),
            callback: function() {
                Statistics.addStatistics("000201_Expose_Flow_game")
            }
        }]
    };
    ARTICLE.expose_blocks = b
}(window), function(a) {
    function b() {
        if (d.isInstalled) {
            var a = $(".share-fail-layer");
            if (0 !== a.length)
                A && clearTimeout(A), a.show(), A = setTimeout(function() {
                    a.hide()
                }, 5e3);
            else {
                var b = d.isSafari ? "safari" : d.isHuawei ? "huawei" : d.isXiaomi ? "xiaomi" : d.isOppo ? "oppo" : d.isVivo ? "vivo" : d.isSamsung ? "samsung" : "others",
                    c = {
                        data: {
                            mobile: b
                        }
                    },
                    e = template.compile(l.shareFailLayer),
                    f = e(c);
                $("body").append($(f)).on("touchstart", ".share-fail-layer .closeBtn", function(a) {
                    return $(".share-fail-layer").hide(), A && clearTimeout(A), a.stopPropagation(), !1
                }), A = setTimeout(function() {
                    $(".share-fail-layer").hide()
                }, 5e3)
            }
            Statistics.addStatistics("000022_tips")
        }
    }
    var c,
        d = a.supporter || {},
        e = MSOHU.Modules || (MSOHU.Modules = {}),
        f = e.share,
        g = (e.Like, e.renderViews),
        h = "//s8.rr.itc.cn/org/wapChange/20161_5_11/b8v0r29602064149596.jpg",
        i = a.article_config,
        j = $(".media-wrapper .image img"),
        k = a.ARTICLE,
        l = k.fluidTemplates,
        m = MSOHU.Utils || (MSOHU.Utils = {}),
        n = a.MSOHU.AD.utils,
        o = MSOHU.Helpers || (MSOHU.Helpers = {}),
        p = MSOHU.SohuPlayer || (MSOHU.SohuPlayer = {}),
        q = m.newExposureStatis || (m.newExposureStatis = new a.NewExposureStatis),
        r = n.isTestEnvironment(),
        s = {},
        t = a.TimingExpose,
        u = new t({
            timingExposeOnceCode: "000205_N",
            timingExposeTimeArr: [3e3, 1e4, 3e4, 6e4, 18e4, 6e5],
            maxTime: 6e5
        }),
        v = a.SmuidLocalStore,
        w = a.WEBP || {},
        x = w.isSupportWebP || function() {},
        y = (w.setPicToWebP || function() {}, ["\u65b0\u95fb", "\u8d22\u7ecf", "\u5a31\u4e50", "\u4f53\u80b2", "\u519b\u4e8b", "\u65f6\u5c1a", "\u6c7d\u8f66", "\u5386\u53f2", "\u5065\u5eb7", "\u6587\u5316", "\u79d1\u6280", "\u65c5\u6e38", "\u7f8e\u98df", "\u6559\u80b2"]),
        z = a.article_config.channel_long_path[0][0];
    y.indexOf(z) === -1 && (z = "\u65b0\u95fb"), c = r ? "//10.13.83.44:10800/api/newsfeed/?n=" + z : "//api.m.sohu.com/autonews/feed/?n=" + z;
    var A = null;
    v.init(), u.listenTimingExpose();
    var B = o.sliceString,
        C = $(".article-info").find("span:first-child"),
        D = $(".news-item .news-item-info span").not(function() {
            return $(".glyph", this).length >= 1
        }),
        E = new Date;
    E.setTime(E.getTime() + 864e5), "1" != CookieUtil.get("ns") && CookieUtil.set("ns", "1", E), C.text(B(C.text().trim(), 0, 6)), D.each(function(a, b, c) {
        $(b).text(B($(b).text().trim(), 0, 6))
    });
    var F = h;
    j.length > 0 && (F = j.eq(0).not("[original-hidden]").attr("src") || $("[original-hidden]").eq(0).attr("original-hidden"));
    var G = {
        title: i ? i.title : "",
        image: F,
        newsid: i ? i.news_id : "",
        passport: i ? i.passport : "",
        failCallback: b
    };
    new f(G);
    var H = function() {
        GoTop.instance({
            template: '<div data-code="000027_back2top"><a href="javascript:;" class="sprite-icons-top"></a></div>',
            vivo_toHomeIconTemplate: '<div class="toHomeBtn"><a href="/?_once_=000025_hsfzdj_vivo" class="sprite-icons-home"></a></div>',
            toHomeIconTemplate: '<div class="toHomeBtn"><a href="/?_once_=000025_hsfzdj" class="sprite-icons-home"></a></div>',
            templateStyle: {
                display: "block"
            },
            toHomeParentDom: $("body")
        })
    };
    H();
    var I = $(".article-wrapper article"),
        J = $(".font-setting"),
        K = !1;
    if (J.on("click", function() {
        K ? (Statistics.addStatistics("000201_Click_fontsmall"), I.removeClass("largeFont"), J.find("span").html("\u5927"), K = !1, CookieUtil.set("article_font_size", "small")) : (Statistics.addStatistics("000201_Click_fontbig"), I.addClass("largeFont"), J.find("span").html("\u5c0f"), K = !0, CookieUtil.set("article_font_size", "big"))
    }), p.embedPlayers({
        playerContainerClass: "player"
    }), i && i.self_media_id && g({
        nid: i && i.news_id,
        $PVWrapper: $(".pv-wrapper"),
        $PVElement: $(".pv-wrapper .pv-num")
    }), s = k.ArticleFluid({
        container: $("#newsListWrapper"),
        apiBaseUrl: c,
        fluidTemplates: {
            dataList: l.newsList,
            loading: l.loading,
            loadErr: l.loadErr
        },
        pieceExposeOnceCode: "000201_PieceExpose",
        exposeOnceCode: "000201_ScreenExpose",
        successCallback: function(a, b) {
            a.not(function() {
                return !$(this).hasClass("news-item-img-sm")
            }).find(".title").each(function(a, b) {
                $clamp(b, {
                    clamp: 2
                })
            }), b ? k.ArticleAd.insertAd(3, 6, !0, a) : k.ArticleAd.insertAd(3, 3, !1, a), q.add(k.expose_blocks.fluid_blocks(a)).once()
        }
    }), s.render(), s.makeUpFirstScreenADItems($("#newsListWrapper")), d.isSupportLocalStorage) {
        var L = /pawifi/i.test(a.navigator.userAgent);
        L || $(".headerTohome").click(function(b) {
            var c = "000201_Click_toptohomepage";
            b.preventDefault();
            var d = document.createElement("a");
            d.href = document.referrer;
            var e = d.pathname,
                f = d.hostname,
                g = (new Date).getTime(),
                h = a.localStorage.getItem("msohu/main_final/back_timer") || g;
            h > g - 3e5 && /^([tdg][1-9]\.)?m\.sohu\.com$/i.test(f) && ("" === e || "/" === e) ? (Statistics.addStatistics(c), setTimeout(function() {
                a.history.back()
            }, 100)) : a.location.href = "/?_once_=" + c, a.localStorage.setItem("msohu/main_final/back_timer", g), d = null
        })
    }
    k.ArticleAd.renderNormalAd(), k.ArticleAd.insertAd(3, 3, !1), q.add(k.expose_blocks.firstpage_blocks).once(), Statistics.addStatistics("000201_Expose_all");
    var M = CookieUtil.get("article_font_size");
    "big" !== M || K || (I.addClass("largeFont"), J.find("span").html("\u5c0f"), K = !0), J.css("display", "block");
    var N = function() {
        var a = $(".article-wrapper article"),
            b = new GalleryFin;
        a.on("click", ".media-wrapper>.image", function(a) {
            k.onOriginalImg = !0, a.preventDefault(), b.showPic(a)
        })
    };
    k.originalImg = N;
    var O = $(".news-item-img-sm .title, #sogou_hotwords .hotwords-list");
    O.each(function(a, b) {
        $clamp(b, {
            clamp: 2
        })
    }), a.addEventListener("DOMContentLoaded", function() {
        x({
            success: function() {
                Statistics.addStatistics("000186_webp1")
            },
            error: function() {
                Statistics.addStatistics("000186_webp0")
            }
        })
    }, !1), a.addMonitor("000206_perf_page_newcont")
}(window), function() {
    function a(a, b) {
        var c = window.location.href,
            d = b + "://showtip?url=m.sohu.com&pageurl=" + encodeURIComponent(c),
            e = document.createElement("iframe");
        e.src = d, window.document.body.appendChild(e), e.style.width = "0px", e.style.height = "0px", e.style.border = "0px", Statistics.addStatistics(a), window.setTimeout(function() {
            e.remove()
        }, 100)
    }
    var b = window.location.href,
        c = window.navigator.userAgent.toLocaleLowerCase(),
        d = c.match(/(?:MQ)?qqbrowser\/([\d\.]+)/i),
        e = c.match(/ucbrowser(?:\/)?([\d\.\/]+)/i),
        f = c.match(/sogoumobilebrowser(?:\/)?([\d\.\/]+)/i),
        g = c.match(/sogouminimsesdk(?:\/)?([\d\.\/]+)/i),
        h = c.match(/baidubrowser(?:\/)?([\d\.\/]+)/i),
        i = window.supporter,
        j = function() {
            var a = !1;
            return !i.os.android || !/000112_recommend/.test(b) || g || f || d || e || h ? a : a = !0
        }();
    if (i.os.android && /000112_rc_recommend/.test(b) && a("000112_down_rczw", "sogoumsemini"), j && a("000112_pull_mini_icon", "sogoumsemini"), window.article_config.sogou_push && "True" === window.article_config.sogou_push) {
        var k = (new Date).getTime();
        if (CookieUtil.get("sogou_push") && (new Date).getTime() - CookieUtil.get("sogou_push") < 864e5)
            return;
        CookieUtil.set("sogou_push", k), a("000134_zwtc", "sogoumsesdk")
    }
}(), function(a) {
    var b = MSOHU.Modules || (MSOHU.Modules = {}),
        c = MSOHU.Views || (MSOHU.Views = {}),
        d = a.Statistics,
        e = "//s8.rr.itc.cn/org/wapChange/20161_5_11/b8v0r29602064149596.jpg",
        f = a.supporter;
    f.isWeixin && (c.wxShareLayerView = new b.WxShareLayer({
        title: a.article_config.news_title,
        desc: $('meta[name="description"]').attr("content") || "",
        img_url: a.article_config.share_img || e
    })), $(".share-tips").on("click", function() {
        c.wxShareLayerView ? c.wxShareLayerView.show() : (c.wxShareLayerView = new b.WxShareLayer({
            title: a.article_config.news_title,
            desc: $('meta[name="description"]').attr("content") || "",
            img_url: a.article_config.share_img || e
        }), c.wxShareLayerView.show()), d.addStatistics("000022_share_wechat_flow")
    })
}(window), function(a) {
    var b = (a.Zepto || a.jQuery, a.CookieUtil),
        c = a.Statistics,
        d = "_trans_",
        e = {
            url: "//zz.m.sohu.com/pv.gif?",
            isInIframe: function() {
                var a = window.top,
                    b = window.location;
                return b !== a.location
            },
            _getQueryString: function(a) {
                var b = new RegExp("(^|&)" + a + "=([^&]*)(&|$)", "i"),
                    c = window.location.search.substr(1).match(b);
                return null != c ? unescape(c[2]) : null
            },
            getParams: function() {
                var a = b.get(d),
                    c = 1;
                return a || (a = this._getQueryString(d), c = 0), {
                    _trans_: a || "",
                    path: window.location.pathname,
                    _ssId: b.get("_ssId"),
                    _ssOrder: b.get("_ssOrder"),
                    iframe: this.isInIframe() ? 1 : 0,
                    fromCookie: c,
                    refer: encodeURIComponent(document.referrer),
                    url: encodeURIComponent(document.location.href)
                }
            },
            sendStatistic: function() {
                var a = this.getParams();
                c.addStatistics(a, this.url)
            }
        };
    e.sendStatistic()
}(this), function() {
    function a(a) {
        a = a || {}, this.historyUrl = a.historyUrl, this.referrerList = a.referrerList || [], this.addMarkKey = "_addHistory_", this.addMarkVal = "1", this.init()
    }
    var b = window.MSOHU || {},
        c = b.Helpers || {};
    a.prototype = {
        constructor: a,
        init: function() {
            return !(!this.historyUrl || !history.pushState) && void (this.matchReferrer() && (this.isAdded() ? window.addEventListener("popstate", c.proxy(this.popStateCallback, this)) : this.add()))
        },
        isAdded: function() {
            return document.location.href.indexOf(this.addMarkKey + "=" + this.addMarkVal) > 0
        },
        matchReferrer: function() {
            var a = this.referrerList.length,
                b = document.referrer;
            if (!b)
                return !1;
            if (a <= 0)
                return !0;
            for (; a--;)
                if (b.indexOf(this.referrerList[a]) >= 0)
                    return !0;
            return !1
        },
        add: function() {
            var a = document.location.href,
                b = {};
            b[this.addMarkKey] = this.addMarkVal, history.pushState({}, "", c.addQueryArgs(a, b)), window.addEventListener("popstate", c.proxy(this.popStateCallback, this))
        },
        popStateCallback: function(a) {
            document.location.replace(this.historyUrl)
        }
    }, new a({
        historyUrl: "//m.sohu.com/?_once_=000107_sszwy",
        referrerList: ["sogou.com"]
    })
}();

