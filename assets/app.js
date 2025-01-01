(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // vendor/topbar.js
  var require_topbar = __commonJS({
    "vendor/topbar.js"(exports, module) {
      (function(window2, document2) {
        "use strict";
        (function() {
          var lastTime = 0;
          var vendors = ["ms", "moz", "webkit", "o"];
          for (var x = 0; x < vendors.length && !window2.requestAnimationFrame; ++x) {
            window2.requestAnimationFrame = window2[vendors[x] + "RequestAnimationFrame"];
            window2.cancelAnimationFrame = window2[vendors[x] + "CancelAnimationFrame"] || window2[vendors[x] + "CancelRequestAnimationFrame"];
          }
          if (!window2.requestAnimationFrame)
            window2.requestAnimationFrame = function(callback, element) {
              var currTime = new Date().getTime();
              var timeToCall = Math.max(0, 16 - (currTime - lastTime));
              var id = window2.setTimeout(function() {
                callback(currTime + timeToCall);
              }, timeToCall);
              lastTime = currTime + timeToCall;
              return id;
            };
          if (!window2.cancelAnimationFrame)
            window2.cancelAnimationFrame = function(id) {
              clearTimeout(id);
            };
        })();
        var canvas, progressTimerId, fadeTimerId, currentProgress, showing, addEvent = function(elem, type, handler) {
          if (elem.addEventListener)
            elem.addEventListener(type, handler, false);
          else if (elem.attachEvent)
            elem.attachEvent("on" + type, handler);
          else
            elem["on" + type] = handler;
        }, options = {
          autoRun: true,
          barThickness: 3,
          barColors: {
            0: "rgba(26,  188, 156, .9)",
            ".25": "rgba(52,  152, 219, .9)",
            ".50": "rgba(241, 196, 15,  .9)",
            ".75": "rgba(230, 126, 34,  .9)",
            "1.0": "rgba(211, 84,  0,   .9)"
          },
          shadowBlur: 10,
          shadowColor: "rgba(0,   0,   0,   .6)",
          className: null
        }, repaint = function() {
          canvas.width = window2.innerWidth;
          canvas.height = options.barThickness * 5;
          var ctx = canvas.getContext("2d");
          ctx.shadowBlur = options.shadowBlur;
          ctx.shadowColor = options.shadowColor;
          var lineGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
          for (var stop in options.barColors)
            lineGradient.addColorStop(stop, options.barColors[stop]);
          ctx.lineWidth = options.barThickness;
          ctx.beginPath();
          ctx.moveTo(0, options.barThickness / 2);
          ctx.lineTo(Math.ceil(currentProgress * canvas.width), options.barThickness / 2);
          ctx.strokeStyle = lineGradient;
          ctx.stroke();
        }, createCanvas = function() {
          canvas = document2.createElement("canvas");
          var style = canvas.style;
          style.position = "fixed";
          style.top = style.left = style.right = style.margin = style.padding = 0;
          style.zIndex = 100001;
          style.display = "none";
          if (options.className)
            canvas.classList.add(options.className);
          document2.body.appendChild(canvas);
          addEvent(window2, "resize", repaint);
        }, topbar2 = {
          config: function(opts) {
            for (var key in opts)
              if (options.hasOwnProperty(key))
                options[key] = opts[key];
          },
          show: function() {
            if (showing)
              return;
            showing = true;
            if (fadeTimerId !== null)
              window2.cancelAnimationFrame(fadeTimerId);
            if (!canvas)
              createCanvas();
            canvas.style.opacity = 1;
            canvas.style.display = "block";
            topbar2.progress(0);
            if (options.autoRun) {
              (function loop() {
                progressTimerId = window2.requestAnimationFrame(loop);
                topbar2.progress("+" + 0.05 * Math.pow(1 - Math.sqrt(currentProgress), 2));
              })();
            }
          },
          progress: function(to) {
            if (typeof to === "undefined")
              return currentProgress;
            if (typeof to === "string") {
              to = (to.indexOf("+") >= 0 || to.indexOf("-") >= 0 ? currentProgress : 0) + parseFloat(to);
            }
            currentProgress = to > 1 ? 1 : to;
            repaint();
            return currentProgress;
          },
          hide: function() {
            if (!showing)
              return;
            showing = false;
            if (progressTimerId != null) {
              window2.cancelAnimationFrame(progressTimerId);
              progressTimerId = null;
            }
            (function loop() {
              if (topbar2.progress("+.1") >= 1) {
                canvas.style.opacity -= 0.05;
                if (canvas.style.opacity <= 0.05) {
                  canvas.style.display = "none";
                  fadeTimerId = null;
                  return;
                }
              }
              fadeTimerId = window2.requestAnimationFrame(loop);
            })();
          }
        };
        if (typeof module === "object" && typeof module.exports === "object") {
          module.exports = topbar2;
        } else if (typeof define === "function" && define.amd) {
          define(function() {
            return topbar2;
          });
        } else {
          this.topbar = topbar2;
        }
      }).call(exports, window, document);
    }
  });

  // ../deps/phoenix_html/priv/static/phoenix_html.js
  "use strict";
  (function() {
    var PolyfillEvent = eventConstructor();
    function eventConstructor() {
      if (typeof window.CustomEvent === "function")
        return window.CustomEvent;
      function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: void 0 };
        var evt = document.createEvent("CustomEvent");
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
      }
      CustomEvent.prototype = window.Event.prototype;
      return CustomEvent;
    }
    function buildHiddenInput(name, value) {
      var input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      return input;
    }
    function handleClick(element, targetModifierKey) {
      var to = element.getAttribute("data-to"), method = buildHiddenInput("_method", element.getAttribute("data-method")), csrf = buildHiddenInput("_csrf_token", element.getAttribute("data-csrf")), form = document.createElement("form"), target = element.getAttribute("target");
      form.method = element.getAttribute("data-method") === "get" ? "get" : "post";
      form.action = to;
      form.style.display = "hidden";
      if (target)
        form.target = target;
      else if (targetModifierKey)
        form.target = "_blank";
      form.appendChild(csrf);
      form.appendChild(method);
      document.body.appendChild(form);
      form.submit();
    }
    window.addEventListener("click", function(e) {
      var element = e.target;
      if (e.defaultPrevented) {
        return;
      }
      while (element && element.getAttribute) {
        var phoenixLinkEvent = new PolyfillEvent("phoenix.link.click", {
          "bubbles": true,
          "cancelable": true
        });
        if (!element.dispatchEvent(phoenixLinkEvent)) {
          e.preventDefault();
          e.stopImmediatePropagation();
          return false;
        }
        if (element.getAttribute("data-method")) {
          handleClick(element, e.metaKey || e.shiftKey);
          e.preventDefault();
          return false;
        } else {
          element = element.parentNode;
        }
      }
    }, false);
    window.addEventListener("phoenix.link.click", function(e) {
      var message = e.target.getAttribute("data-confirm");
      if (message && !window.confirm(message)) {
        e.preventDefault();
      }
    }, false);
  })();

  // js/anim.js
  (function() {
    var elemStore = new Map();
    let imgs = [
      "balloon_blue",
      "balloon_red",
      "balloon_yellow",
      "bush_0",
      "bush_1",
      "bush_2",
      "bush_3",
      "cloud_0",
      "cloud_1",
      "cloud_2",
      "hills",
      "sun",
      "logo"
    ];
    const loadImage = (id) => new Promise((resolve) => {
      const img = new Image();
      const url = `/images/${id}.webp`;
      img.onload = () => resolve({ url, id, ok: true });
      img.onerror = () => resolve({ url, id, ok: false });
      img.src = url;
    });
    Promise.all(imgs.map((id) => loadImage(id))).then((e) => {
      e.forEach((item) => {
        setDivBackground(item.url, item.id);
      });
      stopLoading();
    });
    function setDivBackground(url, id) {
      elementById(id).style.backgroundImage = `url("${url}")`;
    }
    function stopLoading() {
      elementById("loader").style.display = "none";
      imgs = [];
    }
    var header = elementById("header");
    var headerHeight = header.getBoundingClientRect().height;
    window.document.onscroll = (_) => {
      var scrollY = window.scrollY;
      if (scrollY < 0) {
        scrollY = 0;
      }
      if (scrollY <= headerHeight) {
        adjustBottom(scrollY, ["cloud_0", "cloud_1", "cloud_2", "sun", "logo"], -0.32);
        adjustBottom(scrollY, ["hills"], -0.2);
        adjustBottom(scrollY, ["balloon_red", "balloon_blue", "balloon_yellow"], -0.15);
        adjustBottom(scrollY, ["bush_0", "bush_1", "bush_2", "bush_3"], -0.1);
      }
    };
    function adjustBottom(scrollY, elemIds, speed) {
      const offset = Math.round(speed * scrollY);
      elemIds.forEach((id) => {
        elementById(id).style.bottom = `${offset}px`;
      });
    }
    function elementById(elementId) {
      if (elemStore.has(elementId)) {
        return elemStore.get(elementId);
      }
      let element = document.getElementById(elementId);
      elemStore.set(elementId, element);
      return element;
    }
  })();

  // js/anim_clouds.js
  "use strict";
  (function() {
    const paths = new Map();
    const canvas = document.getElementById("clouds_canvas");
    const parent = canvas.parentElement;
    const cloudPath = new Path2D("M46.876,62.757l0.284,0.448c3.388,5.357 9.182,8.555 15.498,8.555c0.772,0 1.553,-0.05 2.324,-0.147c7.424,-0.942 13.478,-6.222 15.424,-13.451l0.073,-0.272l0.28,0.034c1.405,0.171 2.836,0.168 4.234,-0.01c9.388,-1.189 16.058,-9.794 14.87,-19.182c-0.732,-5.785 -4.308,-10.756 -9.567,-13.298l-0.187,-0.091l0.004,-0.207c0.012,-0.812 -0.031,-1.615 -0.129,-2.386c-1.049,-8.291 -8.133,-14.543 -16.478,-14.543c-0.7,0 -1.41,0.045 -2.109,0.133c-2.155,0.271 -4.209,0.952 -6.103,2.025l-0.276,0.156l-0.164,-0.272c-3.786,-6.322 -10.699,-10.249 -18.041,-10.249c-0.888,0 -1.787,0.057 -2.674,0.17c-9.236,1.169 -16.513,8.111 -18.107,17.276l-0.062,0.355l-0.346,-0.098c-2.571,-0.725 -5.289,-0.925 -7.982,-0.587c-11.035,1.399 -18.877,11.514 -17.481,22.548c1.273,10.054 9.867,17.636 19.991,17.636l0.511,-0.004l0.053,0.572c0.883,6.958 6.839,12.212 13.852,12.212c0.586,0 1.179,-0.037 1.765,-0.111c4.306,-0.546 8.051,-3.008 10.272,-6.756l0.271,-0.456Z");
    window.onresize = (_event) => {
      draw(canvas, parent.clientWidth, parent.clientHeight);
    };
    function main() {
      draw(canvas, parent.clientWidth, parent.clientHeight);
    }
    main();
    function draw(canvas2, clientWidth, clientHeight) {
      updateCanvasSize(canvas2, clientWidth, clientHeight);
      const ctx = canvas2.getContext("2d");
      ctx.clearRect(0, 0, clientWidth, clientHeight);
      let { offsetX, offsetY, ratio } = calcLargestCloud(canvas2);
      drawDeepCloud(ctx, offsetX, offsetY, ratio);
      const cloudsData = [
        { x: 5, y: 22, w: 20.4, h: 14.7, logoPath: "ltm" },
        { x: 59.7, y: 58, w: 15.5, h: 11.1, logoPath: "npg" },
        { x: 22, y: 58, w: 15.5, h: 11.1, logoPath: "theimagegroup" },
        { x: 6, y: 33, w: 38, h: 30, logoPath: "disneycl" },
        { x: 8, y: 6, w: 23.5, h: 18.5, logoPath: "mol" },
        { x: 72, y: 8, w: 23.5, h: 18.5, logoPath: "tate" },
        { x: 54.1, y: 45, w: 20.4, h: 14.7, logoPath: "cunard" },
        { x: 65, y: 30, w: 34, h: 32, logoPath: "nat" },
        { x: 36, y: 52, w: 23.5, h: 18.5, logoPath: "royal" },
        { x: 22, y: 3, w: 59.6, h: 42.8, logoPath: "vam" }
      ];
      cloudsData.reduce(function(sequence, { x, y, w, h, logoPath }) {
        return sequence.then(function() {
          return loadPath(logoPath);
        }).then(function(path) {
          drawWhiteCloud(ctx, x * ratio + offsetX, y * ratio + offsetY, w * ratio, h * ratio, path);
        });
      }, Promise.resolve());
    }
    function updateCanvasSize(canvas2, width, height) {
      canvas2.width = width;
      canvas2.height = height;
    }
    function calcLargestCloud(canvas2) {
      const margin = 24;
      let { width, height, ratio } = fitCloudInto(canvas2.width - margin, canvas2.height - margin);
      let offsetX = canvas2.width - width >> 1;
      let offsetY = canvas2.height - height >> 1;
      return { offsetX, offsetY, ratio };
    }
    function drawDeepCloud(ctx, x, y, ratio) {
      ctx.save();
      const shadowOffScreen = 2e3;
      ctx.setTransform(ratio, 0, 0, ratio, x - shadowOffScreen, y);
      ctx.lineWidth = 4;
      const shadowOffSet = 1 * ratio;
      ctx.shadowOffsetX = shadowOffScreen + shadowOffSet;
      ctx.shadowOffsetY = shadowOffSet;
      ctx.shadowBlur = 3.3 * ratio;
      ctx.shadowColor = "rgba(0,0,0,0.17)";
      ctx.stroke(cloudPath);
      ctx.restore();
      ctx.setTransform(ratio, 0, 0, ratio, x, y);
      ctx.globalCompositeOperation = "destination-in";
      ctx.fill(cloudPath);
      ctx.globalCompositeOperation = "destination-over";
      ctx.fillStyle = deepGradient(ctx);
      ctx.fill(cloudPath);
      ctx.globalCompositeOperation = "source-over";
    }
    function drawWhiteCloud(ctx, x, y, designWidth, designHeight, path) {
      const { width, height, ratio } = fitCloudInto(designWidth, designHeight);
      ctx.save();
      ctx.setTransform(ratio, 0, 0, ratio, x, y);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#FFFFFF";
      whiteCloudShadow(ctx, ratio);
      ctx.fillStyle = whiteGradient(ctx);
      ctx.fill(cloudPath);
      ctx.restore();
      const { logoX, logoY, logoRatio } = logoPosition(x, y, width, height);
      drawLogo(ctx, logoX, logoY, logoRatio, path);
    }
    function logoPosition(parentX, parentY, parentWidth, parentHeight) {
      const logoWidth = 200;
      const logoHeight = 100;
      const { width, height, ratio } = fitInto(logoWidth, logoHeight, parentWidth, parentHeight);
      return {
        logoX: parentX + (parentWidth - width) / 2,
        logoY: parentY + (parentHeight - height * 0.92) / 2,
        logoRatio: ratio
      };
    }
    function drawLogo(ctx, x, y, ratio, path) {
      ctx.setTransform(ratio, 0, 0, ratio, x, y);
      ctx.fillStyle = "#515151";
      ctx.fill(path, "evenodd");
    }
    function loadPath(path) {
      const cachedPath = paths.get(path);
      if (cachedPath) {
        return Promise.resolve(cachedPath);
      }
      return fetch(`/images/${path}.data`).then((response) => {
        if (response.status < 400) {
          return response.text();
        }
      }).then((data) => {
        const path2d = new Path2D(data);
        paths.set(path, path2d);
        return path2d;
      }).catch((err) => {
        console.error({ err });
      });
    }
    function whiteGradient(ctx, width = 100, height = 72) {
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#FFFFFF");
      gradient.addColorStop(1, "#E4E2E3");
      return gradient;
    }
    function deepGradient(ctx, width = 100, height = 72) {
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#5C93AD");
      gradient.addColorStop(1, "#538399");
      return gradient;
    }
    function whiteCloudShadow(ctx, ratio) {
      ctx.shadowOffsetX = ctx.shadowOffsetY = 4 * ratio;
      ctx.shadowBlur = 3.3 * ratio;
      ctx.shadowColor = "rgba(0,0,0,0.17)";
    }
    function fitCloudInto(maxWidth, maxHeight) {
      return fitInto(100, 71.8, maxWidth, maxHeight);
    }
    function fillInCloudSize(maxWidth, maxHeight) {
      return fillIn(100, 71.8, maxWidth, maxHeight);
    }
    function fitInto(width, height, maxWidth, maxHeight) {
      if (height == 0) {
        return { width, height, ratio: 1 };
      }
      const ratio = width / height;
      const maxRatio = maxWidth / maxHeight;
      if (maxRatio <= ratio) {
        return {
          width: maxWidth,
          height: maxWidth / ratio,
          ratio: maxWidth / width
        };
      } else {
        return {
          width: maxHeight * ratio,
          height: maxHeight,
          ratio: maxHeight / height
        };
      }
    }
    function fillIn(width, height, maxWidth, maxHeight) {
      if (height == 0 || maxHeight == 0) {
        return { width, height, ratio: 1 };
      }
      const ratio = width / height;
      const maxRatio = maxWidth / maxHeight;
      if (maxRatio <= ratio) {
        return {
          width: maxHeight * ratio,
          height: maxHeight,
          ratio: maxHeight / height
        };
      } else {
        return {
          width: maxWidth,
          height: maxWidth / ratio,
          ratio: maxWidth / width
        };
      }
    }
  })();

  // js/app.js
  var import_topbar = __toModule(require_topbar());
  import_topbar.default.config({ barColors: { 0: "#29d" }, shadowColor: "rgba(0, 0, 0, .3)" });
})();
/**
 * @license MIT
 * topbar 1.0.0, 2021-01-06
 * http://buunguyen.github.io/topbar
 * Copyright (c) 2021 Buu Nguyen
 */
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vYXNzZXRzL3ZlbmRvci90b3BiYXIuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2h0bWwvcHJpdi9zdGF0aWMvcGhvZW5peF9odG1sLmpzIiwgIi4uLy4uLy4uL2Fzc2V0cy9qcy9hbmltLmpzIiwgIi4uLy4uLy4uL2Fzc2V0cy9qcy9hbmltX2Nsb3Vkcy5qcyIsICIuLi8uLi8uLi9hc3NldHMvanMvYXBwLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKipcbiAqIEBsaWNlbnNlIE1JVFxuICogdG9wYmFyIDEuMC4wLCAyMDIxLTAxLTA2XG4gKiBodHRwOi8vYnV1bmd1eWVuLmdpdGh1Yi5pby90b3BiYXJcbiAqIENvcHlyaWdodCAoYykgMjAyMSBCdXUgTmd1eWVuXG4gKi9cbihmdW5jdGlvbiAod2luZG93LCBkb2N1bWVudCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICAvLyBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9wYXVsaXJpc2gvMTU3OTY3MVxuICAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBsYXN0VGltZSA9IDA7XG4gICAgdmFyIHZlbmRvcnMgPSBbXCJtc1wiLCBcIm1velwiLCBcIndlYmtpdFwiLCBcIm9cIl07XG4gICAgZm9yICh2YXIgeCA9IDA7IHggPCB2ZW5kb3JzLmxlbmd0aCAmJiAhd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZTsgKyt4KSB7XG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID1cbiAgICAgICAgd2luZG93W3ZlbmRvcnNbeF0gKyBcIlJlcXVlc3RBbmltYXRpb25GcmFtZVwiXTtcbiAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9XG4gICAgICAgIHdpbmRvd1t2ZW5kb3JzW3hdICsgXCJDYW5jZWxBbmltYXRpb25GcmFtZVwiXSB8fFxuICAgICAgICB3aW5kb3dbdmVuZG9yc1t4XSArIFwiQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lXCJdO1xuICAgIH1cbiAgICBpZiAoIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpXG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24gKGNhbGxiYWNrLCBlbGVtZW50KSB7XG4gICAgICAgIHZhciBjdXJyVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICB2YXIgdGltZVRvQ2FsbCA9IE1hdGgubWF4KDAsIDE2IC0gKGN1cnJUaW1lIC0gbGFzdFRpbWUpKTtcbiAgICAgICAgdmFyIGlkID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNhbGxiYWNrKGN1cnJUaW1lICsgdGltZVRvQ2FsbCk7XG4gICAgICAgIH0sIHRpbWVUb0NhbGwpO1xuICAgICAgICBsYXN0VGltZSA9IGN1cnJUaW1lICsgdGltZVRvQ2FsbDtcbiAgICAgICAgcmV0dXJuIGlkO1xuICAgICAgfTtcbiAgICBpZiAoIXdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSlcbiAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICBjbGVhclRpbWVvdXQoaWQpO1xuICAgICAgfTtcbiAgfSkoKTtcblxuICB2YXIgY2FudmFzLFxuICAgIHByb2dyZXNzVGltZXJJZCxcbiAgICBmYWRlVGltZXJJZCxcbiAgICBjdXJyZW50UHJvZ3Jlc3MsXG4gICAgc2hvd2luZyxcbiAgICBhZGRFdmVudCA9IGZ1bmN0aW9uIChlbGVtLCB0eXBlLCBoYW5kbGVyKSB7XG4gICAgICBpZiAoZWxlbS5hZGRFdmVudExpc3RlbmVyKSBlbGVtLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciwgZmFsc2UpO1xuICAgICAgZWxzZSBpZiAoZWxlbS5hdHRhY2hFdmVudCkgZWxlbS5hdHRhY2hFdmVudChcIm9uXCIgKyB0eXBlLCBoYW5kbGVyKTtcbiAgICAgIGVsc2UgZWxlbVtcIm9uXCIgKyB0eXBlXSA9IGhhbmRsZXI7XG4gICAgfSxcbiAgICBvcHRpb25zID0ge1xuICAgICAgYXV0b1J1bjogdHJ1ZSxcbiAgICAgIGJhclRoaWNrbmVzczogMyxcbiAgICAgIGJhckNvbG9yczoge1xuICAgICAgICAwOiBcInJnYmEoMjYsICAxODgsIDE1NiwgLjkpXCIsXG4gICAgICAgIFwiLjI1XCI6IFwicmdiYSg1MiwgIDE1MiwgMjE5LCAuOSlcIixcbiAgICAgICAgXCIuNTBcIjogXCJyZ2JhKDI0MSwgMTk2LCAxNSwgIC45KVwiLFxuICAgICAgICBcIi43NVwiOiBcInJnYmEoMjMwLCAxMjYsIDM0LCAgLjkpXCIsXG4gICAgICAgIFwiMS4wXCI6IFwicmdiYSgyMTEsIDg0LCAgMCwgICAuOSlcIixcbiAgICAgIH0sXG4gICAgICBzaGFkb3dCbHVyOiAxMCxcbiAgICAgIHNoYWRvd0NvbG9yOiBcInJnYmEoMCwgICAwLCAgIDAsICAgLjYpXCIsXG4gICAgICBjbGFzc05hbWU6IG51bGwsXG4gICAgfSxcbiAgICByZXBhaW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICBjYW52YXMuaGVpZ2h0ID0gb3B0aW9ucy5iYXJUaGlja25lc3MgKiA1OyAvLyBuZWVkIHNwYWNlIGZvciBzaGFkb3dcblxuICAgICAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICBjdHguc2hhZG93Qmx1ciA9IG9wdGlvbnMuc2hhZG93Qmx1cjtcbiAgICAgIGN0eC5zaGFkb3dDb2xvciA9IG9wdGlvbnMuc2hhZG93Q29sb3I7XG5cbiAgICAgIHZhciBsaW5lR3JhZGllbnQgPSBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQoMCwgMCwgY2FudmFzLndpZHRoLCAwKTtcbiAgICAgIGZvciAodmFyIHN0b3AgaW4gb3B0aW9ucy5iYXJDb2xvcnMpXG4gICAgICAgIGxpbmVHcmFkaWVudC5hZGRDb2xvclN0b3Aoc3RvcCwgb3B0aW9ucy5iYXJDb2xvcnNbc3RvcF0pO1xuICAgICAgY3R4LmxpbmVXaWR0aCA9IG9wdGlvbnMuYmFyVGhpY2tuZXNzO1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbygwLCBvcHRpb25zLmJhclRoaWNrbmVzcyAvIDIpO1xuICAgICAgY3R4LmxpbmVUbyhcbiAgICAgICAgTWF0aC5jZWlsKGN1cnJlbnRQcm9ncmVzcyAqIGNhbnZhcy53aWR0aCksXG4gICAgICAgIG9wdGlvbnMuYmFyVGhpY2tuZXNzIC8gMlxuICAgICAgKTtcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9IGxpbmVHcmFkaWVudDtcbiAgICAgIGN0eC5zdHJva2UoKTtcbiAgICB9LFxuICAgIGNyZWF0ZUNhbnZhcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICB2YXIgc3R5bGUgPSBjYW52YXMuc3R5bGU7XG4gICAgICBzdHlsZS5wb3NpdGlvbiA9IFwiZml4ZWRcIjtcbiAgICAgIHN0eWxlLnRvcCA9IHN0eWxlLmxlZnQgPSBzdHlsZS5yaWdodCA9IHN0eWxlLm1hcmdpbiA9IHN0eWxlLnBhZGRpbmcgPSAwO1xuICAgICAgc3R5bGUuekluZGV4ID0gMTAwMDAxO1xuICAgICAgc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgaWYgKG9wdGlvbnMuY2xhc3NOYW1lKSBjYW52YXMuY2xhc3NMaXN0LmFkZChvcHRpb25zLmNsYXNzTmFtZSk7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyk7XG4gICAgICBhZGRFdmVudCh3aW5kb3csIFwicmVzaXplXCIsIHJlcGFpbnQpO1xuICAgIH0sXG4gICAgdG9wYmFyID0ge1xuICAgICAgY29uZmlnOiBmdW5jdGlvbiAob3B0cykge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb3B0cylcbiAgICAgICAgICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShrZXkpKSBvcHRpb25zW2tleV0gPSBvcHRzW2tleV07XG4gICAgICB9LFxuICAgICAgc2hvdzogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoc2hvd2luZykgcmV0dXJuO1xuICAgICAgICBzaG93aW5nID0gdHJ1ZTtcbiAgICAgICAgaWYgKGZhZGVUaW1lcklkICE9PSBudWxsKSB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoZmFkZVRpbWVySWQpO1xuICAgICAgICBpZiAoIWNhbnZhcykgY3JlYXRlQ2FudmFzKCk7XG4gICAgICAgIGNhbnZhcy5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICAgICAgY2FudmFzLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIHRvcGJhci5wcm9ncmVzcygwKTtcbiAgICAgICAgaWYgKG9wdGlvbnMuYXV0b1J1bikge1xuICAgICAgICAgIChmdW5jdGlvbiBsb29wKCkge1xuICAgICAgICAgICAgcHJvZ3Jlc3NUaW1lcklkID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcbiAgICAgICAgICAgIHRvcGJhci5wcm9ncmVzcyhcbiAgICAgICAgICAgICAgXCIrXCIgKyAwLjA1ICogTWF0aC5wb3coMSAtIE1hdGguc3FydChjdXJyZW50UHJvZ3Jlc3MpLCAyKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcHJvZ3Jlc3M6IGZ1bmN0aW9uICh0bykge1xuICAgICAgICBpZiAodHlwZW9mIHRvID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gY3VycmVudFByb2dyZXNzO1xuICAgICAgICBpZiAodHlwZW9mIHRvID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgdG8gPVxuICAgICAgICAgICAgKHRvLmluZGV4T2YoXCIrXCIpID49IDAgfHwgdG8uaW5kZXhPZihcIi1cIikgPj0gMFxuICAgICAgICAgICAgICA/IGN1cnJlbnRQcm9ncmVzc1xuICAgICAgICAgICAgICA6IDApICsgcGFyc2VGbG9hdCh0byk7XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudFByb2dyZXNzID0gdG8gPiAxID8gMSA6IHRvO1xuICAgICAgICByZXBhaW50KCk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvZ3Jlc3M7XG4gICAgICB9LFxuICAgICAgaGlkZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXNob3dpbmcpIHJldHVybjtcbiAgICAgICAgc2hvd2luZyA9IGZhbHNlO1xuICAgICAgICBpZiAocHJvZ3Jlc3NUaW1lcklkICE9IG51bGwpIHtcbiAgICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUocHJvZ3Jlc3NUaW1lcklkKTtcbiAgICAgICAgICBwcm9ncmVzc1RpbWVySWQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIChmdW5jdGlvbiBsb29wKCkge1xuICAgICAgICAgIGlmICh0b3BiYXIucHJvZ3Jlc3MoXCIrLjFcIikgPj0gMSkge1xuICAgICAgICAgICAgY2FudmFzLnN0eWxlLm9wYWNpdHkgLT0gMC4wNTtcbiAgICAgICAgICAgIGlmIChjYW52YXMuc3R5bGUub3BhY2l0eSA8PSAwLjA1KSB7XG4gICAgICAgICAgICAgIGNhbnZhcy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICAgIGZhZGVUaW1lcklkID0gbnVsbDtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBmYWRlVGltZXJJZCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XG4gICAgICAgIH0pKCk7XG4gICAgICB9LFxuICAgIH07XG5cbiAgaWYgKHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSB0b3BiYXI7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRvcGJhcjtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnRvcGJhciA9IHRvcGJhcjtcbiAgfVxufS5jYWxsKHRoaXMsIHdpbmRvdywgZG9jdW1lbnQpKTtcbiIsICJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uKCkge1xuICB2YXIgUG9seWZpbGxFdmVudCA9IGV2ZW50Q29uc3RydWN0b3IoKTtcblxuICBmdW5jdGlvbiBldmVudENvbnN0cnVjdG9yKCkge1xuICAgIGlmICh0eXBlb2Ygd2luZG93LkN1c3RvbUV2ZW50ID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiB3aW5kb3cuQ3VzdG9tRXZlbnQ7XG4gICAgLy8gSUU8PTkgU3VwcG9ydFxuICAgIGZ1bmN0aW9uIEN1c3RvbUV2ZW50KGV2ZW50LCBwYXJhbXMpIHtcbiAgICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7YnViYmxlczogZmFsc2UsIGNhbmNlbGFibGU6IGZhbHNlLCBkZXRhaWw6IHVuZGVmaW5lZH07XG4gICAgICB2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG4gICAgICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2ZW50LCBwYXJhbXMuYnViYmxlcywgcGFyYW1zLmNhbmNlbGFibGUsIHBhcmFtcy5kZXRhaWwpO1xuICAgICAgcmV0dXJuIGV2dDtcbiAgICB9XG4gICAgQ3VzdG9tRXZlbnQucHJvdG90eXBlID0gd2luZG93LkV2ZW50LnByb3RvdHlwZTtcbiAgICByZXR1cm4gQ3VzdG9tRXZlbnQ7XG4gIH1cblxuICBmdW5jdGlvbiBidWlsZEhpZGRlbklucHV0KG5hbWUsIHZhbHVlKSB7XG4gICAgdmFyIGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGlucHV0LnR5cGUgPSBcImhpZGRlblwiO1xuICAgIGlucHV0Lm5hbWUgPSBuYW1lO1xuICAgIGlucHV0LnZhbHVlID0gdmFsdWU7XG4gICAgcmV0dXJuIGlucHV0O1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlQ2xpY2soZWxlbWVudCwgdGFyZ2V0TW9kaWZpZXJLZXkpIHtcbiAgICB2YXIgdG8gPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtdG9cIiksXG4gICAgICAgIG1ldGhvZCA9IGJ1aWxkSGlkZGVuSW5wdXQoXCJfbWV0aG9kXCIsIGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1tZXRob2RcIikpLFxuICAgICAgICBjc3JmID0gYnVpbGRIaWRkZW5JbnB1dChcIl9jc3JmX3Rva2VuXCIsIGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jc3JmXCIpKSxcbiAgICAgICAgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpLFxuICAgICAgICB0YXJnZXQgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcInRhcmdldFwiKTtcblxuICAgIGZvcm0ubWV0aG9kID0gKGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1tZXRob2RcIikgPT09IFwiZ2V0XCIpID8gXCJnZXRcIiA6IFwicG9zdFwiO1xuICAgIGZvcm0uYWN0aW9uID0gdG87XG4gICAgZm9ybS5zdHlsZS5kaXNwbGF5ID0gXCJoaWRkZW5cIjtcblxuICAgIGlmICh0YXJnZXQpIGZvcm0udGFyZ2V0ID0gdGFyZ2V0O1xuICAgIGVsc2UgaWYgKHRhcmdldE1vZGlmaWVyS2V5KSBmb3JtLnRhcmdldCA9IFwiX2JsYW5rXCI7XG5cbiAgICBmb3JtLmFwcGVuZENoaWxkKGNzcmYpO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQobWV0aG9kKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZvcm0pO1xuICAgIGZvcm0uc3VibWl0KCk7XG4gIH1cblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICB2YXIgZWxlbWVudCA9IGUudGFyZ2V0O1xuXG4gICAgaWYgKGUuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHdoaWxlIChlbGVtZW50ICYmIGVsZW1lbnQuZ2V0QXR0cmlidXRlKSB7XG4gICAgICB2YXIgcGhvZW5peExpbmtFdmVudCA9IG5ldyBQb2x5ZmlsbEV2ZW50KCdwaG9lbml4LmxpbmsuY2xpY2snLCB7XG4gICAgICAgIFwiYnViYmxlc1wiOiB0cnVlLCBcImNhbmNlbGFibGVcIjogdHJ1ZVxuICAgICAgfSk7XG5cbiAgICAgIGlmICghZWxlbWVudC5kaXNwYXRjaEV2ZW50KHBob2VuaXhMaW5rRXZlbnQpKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLW1ldGhvZFwiKSkge1xuICAgICAgICBoYW5kbGVDbGljayhlbGVtZW50LCBlLm1ldGFLZXkgfHwgZS5zaGlmdEtleSk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIGZhbHNlKTtcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncGhvZW5peC5saW5rLmNsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgbWVzc2FnZSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtY29uZmlybVwiKTtcbiAgICBpZihtZXNzYWdlICYmICF3aW5kb3cuY29uZmlybShtZXNzYWdlKSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfSwgZmFsc2UpO1xufSkoKTtcbiIsICIoZnVuY3Rpb24oKSB7XG4gICAgLy8gaW5pdFxuICAgIHZhciBlbGVtU3RvcmUgPSBuZXcgTWFwKCk7XG5cbiAgICAvLyBJTUcgUFJFTE9BRFxuICAgIGxldCBpbWdzID0gW1xuICAgICAgICBcImJhbGxvb25fYmx1ZVwiLFxuICAgICAgICBcImJhbGxvb25fcmVkXCIsXG4gICAgICAgIFwiYmFsbG9vbl95ZWxsb3dcIixcbiAgICAgICAgXCJidXNoXzBcIixcbiAgICAgICAgXCJidXNoXzFcIixcbiAgICAgICAgXCJidXNoXzJcIixcbiAgICAgICAgXCJidXNoXzNcIixcbiAgICAgICAgXCJjbG91ZF8wXCIsXG4gICAgICAgIFwiY2xvdWRfMVwiLFxuICAgICAgICBcImNsb3VkXzJcIixcbiAgICAgICAgXCJoaWxsc1wiLFxuICAgICAgICBcInN1blwiLFxuICAgICAgICBcImxvZ29cIlxuICAgIF07XG5cbiAgICBjb25zdCBsb2FkSW1hZ2UgPSBpZCA9PlxuICAgICAgICBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gYC9pbWFnZXMvJHtpZH0ud2VicGA7XG4gICAgICAgICAgICBpbWcub25sb2FkID0gKCkgPT4gcmVzb2x2ZSh7IHVybCwgaWQsIG9rOiB0cnVlIH0pO1xuICAgICAgICAgICAgaW1nLm9uZXJyb3IgPSAoKSA9PiByZXNvbHZlKHsgdXJsLCBpZCwgb2s6IGZhbHNlIH0pO1xuICAgICAgICAgICAgaW1nLnNyYyA9IHVybDtcbiAgICAgICAgfSk7XG5cbiAgICBQcm9taXNlLmFsbChpbWdzLm1hcChpZCA9PiBsb2FkSW1hZ2UoaWQpKSkudGhlbihlID0+IHtcbiAgICAgICAgZS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgc2V0RGl2QmFja2dyb3VuZChpdGVtLnVybCwgaXRlbS5pZCk7XG4gICAgICAgIH0pO1xuICAgICAgICBzdG9wTG9hZGluZygpO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gc2V0RGl2QmFja2dyb3VuZCh1cmwsIGlkKSB7XG4gICAgICAgIGVsZW1lbnRCeUlkKGlkKS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKFwiJHt1cmx9XCIpYDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdG9wTG9hZGluZygpIHtcbiAgICAgICAgZWxlbWVudEJ5SWQoXCJsb2FkZXJcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBpbWdzID0gW107XG4gICAgfVxuXG4gICAgLy8gUEFSQUxBWFxuICAgIHZhciBoZWFkZXIgPSBlbGVtZW50QnlJZChcImhlYWRlclwiKTtcbiAgICB2YXIgaGVhZGVySGVpZ2h0ID0gaGVhZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcblxuICAgIHdpbmRvdy5kb2N1bWVudC5vbnNjcm9sbCA9IF8gPT4ge1xuICAgICAgICB2YXIgc2Nyb2xsWSA9IHdpbmRvdy5zY3JvbGxZO1xuICAgICAgICAvL2ZpeCBwdWxsIGRvd24gb24gcGhvbmVzXG4gICAgICAgIGlmIChzY3JvbGxZIDwgMCkge1xuICAgICAgICAgICAgc2Nyb2xsWSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgLy9IRUFERVJcbiAgICAgICAgaWYgKHNjcm9sbFkgPD0gaGVhZGVySGVpZ2h0KSB7XG4gICAgICAgICAgICBhZGp1c3RCb3R0b20oXG4gICAgICAgICAgICAgICAgc2Nyb2xsWSxcbiAgICAgICAgICAgICAgICBbXCJjbG91ZF8wXCIsIFwiY2xvdWRfMVwiLCBcImNsb3VkXzJcIiwgXCJzdW5cIiwgXCJsb2dvXCJdLFxuICAgICAgICAgICAgICAgIC0wLjMyXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYWRqdXN0Qm90dG9tKHNjcm9sbFksIFtcImhpbGxzXCJdLCAtMC4yKTtcbiAgICAgICAgICAgIGFkanVzdEJvdHRvbShcbiAgICAgICAgICAgICAgICBzY3JvbGxZLFxuICAgICAgICAgICAgICAgIFtcImJhbGxvb25fcmVkXCIsIFwiYmFsbG9vbl9ibHVlXCIsIFwiYmFsbG9vbl95ZWxsb3dcIl0sXG4gICAgICAgICAgICAgICAgLTAuMTVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBhZGp1c3RCb3R0b20oXG4gICAgICAgICAgICAgICAgc2Nyb2xsWSxcbiAgICAgICAgICAgICAgICBbXCJidXNoXzBcIiwgXCJidXNoXzFcIiwgXCJidXNoXzJcIiwgXCJidXNoXzNcIl0sXG4gICAgICAgICAgICAgICAgLTAuMVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBhZGp1c3RCb3R0b20oc2Nyb2xsWSwgZWxlbUlkcywgc3BlZWQpIHtcbiAgICAgICAgY29uc3Qgb2Zmc2V0ID0gTWF0aC5yb3VuZChzcGVlZCAqIHNjcm9sbFkpO1xuICAgICAgICBlbGVtSWRzLmZvckVhY2goaWQgPT4ge1xuICAgICAgICAgICAgZWxlbWVudEJ5SWQoaWQpLnN0eWxlLmJvdHRvbSA9IGAke29mZnNldH1weGA7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVsZW1lbnRCeUlkKGVsZW1lbnRJZCkge1xuICAgICAgICBpZiAoZWxlbVN0b3JlLmhhcyhlbGVtZW50SWQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbVN0b3JlLmdldChlbGVtZW50SWQpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElkKTtcbiAgICAgICAgZWxlbVN0b3JlLnNldChlbGVtZW50SWQsIGVsZW1lbnQpO1xuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG59KSgpO1xuIiwgIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgcGF0aHMgPSBuZXcgTWFwKCk7XG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbG91ZHNfY2FudmFzXCIpO1xuICAgIGNvbnN0IHBhcmVudCA9IGNhbnZhcy5wYXJlbnRFbGVtZW50O1xuICAgIC8vIHNpemU6IDEwMCB4IDcxLDggcHRcbiAgICBjb25zdCBjbG91ZFBhdGggPSBuZXcgUGF0aDJEKFxuICAgICAgICBcIk00Ni44NzYsNjIuNzU3bDAuMjg0LDAuNDQ4YzMuMzg4LDUuMzU3IDkuMTgyLDguNTU1IDE1LjQ5OCw4LjU1NWMwLjc3MiwwIDEuNTUzLC0wLjA1IDIuMzI0LC0wLjE0N2M3LjQyNCwtMC45NDIgMTMuNDc4LC02LjIyMiAxNS40MjQsLTEzLjQ1MWwwLjA3MywtMC4yNzJsMC4yOCwwLjAzNGMxLjQwNSwwLjE3MSAyLjgzNiwwLjE2OCA0LjIzNCwtMC4wMWM5LjM4OCwtMS4xODkgMTYuMDU4LC05Ljc5NCAxNC44NywtMTkuMTgyYy0wLjczMiwtNS43ODUgLTQuMzA4LC0xMC43NTYgLTkuNTY3LC0xMy4yOThsLTAuMTg3LC0wLjA5MWwwLjAwNCwtMC4yMDdjMC4wMTIsLTAuODEyIC0wLjAzMSwtMS42MTUgLTAuMTI5LC0yLjM4NmMtMS4wNDksLTguMjkxIC04LjEzMywtMTQuNTQzIC0xNi40NzgsLTE0LjU0M2MtMC43LDAgLTEuNDEsMC4wNDUgLTIuMTA5LDAuMTMzYy0yLjE1NSwwLjI3MSAtNC4yMDksMC45NTIgLTYuMTAzLDIuMDI1bC0wLjI3NiwwLjE1NmwtMC4xNjQsLTAuMjcyYy0zLjc4NiwtNi4zMjIgLTEwLjY5OSwtMTAuMjQ5IC0xOC4wNDEsLTEwLjI0OWMtMC44ODgsMCAtMS43ODcsMC4wNTcgLTIuNjc0LDAuMTdjLTkuMjM2LDEuMTY5IC0xNi41MTMsOC4xMTEgLTE4LjEwNywxNy4yNzZsLTAuMDYyLDAuMzU1bC0wLjM0NiwtMC4wOThjLTIuNTcxLC0wLjcyNSAtNS4yODksLTAuOTI1IC03Ljk4MiwtMC41ODdjLTExLjAzNSwxLjM5OSAtMTguODc3LDExLjUxNCAtMTcuNDgxLDIyLjU0OGMxLjI3MywxMC4wNTQgOS44NjcsMTcuNjM2IDE5Ljk5MSwxNy42MzZsMC41MTEsLTAuMDA0bDAuMDUzLDAuNTcyYzAuODgzLDYuOTU4IDYuODM5LDEyLjIxMiAxMy44NTIsMTIuMjEyYzAuNTg2LDAgMS4xNzksLTAuMDM3IDEuNzY1LC0wLjExMWM0LjMwNiwtMC41NDYgOC4wNTEsLTMuMDA4IDEwLjI3MiwtNi43NTZsMC4yNzEsLTAuNDU2WlwiXG4gICAgKTtcblxuICAgIHdpbmRvdy5vbnJlc2l6ZSA9IF9ldmVudCA9PiB7XG4gICAgICAgIGRyYXcoY2FudmFzLCBwYXJlbnQuY2xpZW50V2lkdGgsIHBhcmVudC5jbGllbnRIZWlnaHQpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBtYWluKCkge1xuICAgICAgICBkcmF3KGNhbnZhcywgcGFyZW50LmNsaWVudFdpZHRoLCBwYXJlbnQuY2xpZW50SGVpZ2h0KTtcbiAgICB9XG5cbiAgICBtYWluKCk7XG5cbiAgICBmdW5jdGlvbiBkcmF3KGNhbnZhcywgY2xpZW50V2lkdGgsIGNsaWVudEhlaWdodCkge1xuICAgICAgICB1cGRhdGVDYW52YXNTaXplKGNhbnZhcywgY2xpZW50V2lkdGgsIGNsaWVudEhlaWdodCk7XG4gICAgICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY2xpZW50V2lkdGgsIGNsaWVudEhlaWdodCk7XG4gICAgICAgIGxldCB7IG9mZnNldFgsIG9mZnNldFksIHJhdGlvIH0gPSBjYWxjTGFyZ2VzdENsb3VkKGNhbnZhcyk7XG4gICAgICAgIGRyYXdEZWVwQ2xvdWQoY3R4LCBvZmZzZXRYLCBvZmZzZXRZLCByYXRpbyk7XG5cbiAgICAgICAgLy93aGl0ZSBjbG91ZHM6XG4gICAgICAgIGNvbnN0IGNsb3Vkc0RhdGEgPSBbXG4gICAgICAgICAgICB7IHg6IDUsIHk6IDIyLCB3OiAyMC40LCBoOiAxNC43LCBsb2dvUGF0aDogXCJsdG1cIiB9LCAvL3NtYWxsIEAgbWlkLWxlZnRcbiAgICAgICAgICAgIHsgeDogNTkuNywgeTogNTgsIHc6IDE1LjUsIGg6IDExLjEsIGxvZ29QYXRoOiBcIm5wZ1wiIH0sIC8vc21hbGwgQCBib3R0b20gcmlnaHRcbiAgICAgICAgICAgIHsgeDogMjIsIHk6IDU4LCB3OiAxNS41LCBoOiAxMS4xLCBsb2dvUGF0aDogXCJ0aGVpbWFnZWdyb3VwXCIgfSwgLy9zbWFsbCBAIGJvdHRvbSBsZWZ0XG4gICAgICAgICAgICB7IHg6IDYsIHk6IDMzLCB3OiAzOCwgaDogMzAsIGxvZ29QYXRoOiBcImRpc25leWNsXCIgfSwgLy9tZWRpdW0gQCBsZWZ0XG4gICAgICAgICAgICB7IHg6IDgsIHk6IDYsIHc6IDIzLjUsIGg6IDE4LjUsIGxvZ29QYXRoOiBcIm1vbFwiIH0sIC8vbWVkaXVtIEAgdG9wLXJpZ2h0XG4gICAgICAgICAgICB7IHg6IDcyLCB5OiA4LCB3OiAyMy41LCBoOiAxOC41LCBsb2dvUGF0aDogXCJ0YXRlXCIgfSwgLy9tZWRpdW0gQCB0b3AtcmlnaHRcbiAgICAgICAgICAgIHsgeDogNTQuMSwgeTogNDUsIHc6IDIwLjQsIGg6IDE0LjcsIGxvZ29QYXRoOiBcImN1bmFyZFwiIH0sIC8vc21hbGwgQCBtaWQtYm90dG9tIHJpZ2h0XG4gICAgICAgICAgICB7IHg6IDY1LCB5OiAzMCwgdzogMzQsIGg6IDMyLCBsb2dvUGF0aDogXCJuYXRcIiB9LCAvL21lZGl1bSBAIHJpZ2h0XG4gICAgICAgICAgICB7IHg6IDM2LCB5OiA1MiwgdzogMjMuNSwgaDogMTguNSwgbG9nb1BhdGg6IFwicm95YWxcIiB9LCAvL3NtYWxsIEAgYm90dG9tIGNlbnRlclxuICAgICAgICAgICAgeyB4OiAyMiwgeTogMywgdzogNTkuNiwgaDogNDIuOCwgbG9nb1BhdGg6IFwidmFtXCIgfSAvL2xhcmdlc3QgQCB0b3BcbiAgICAgICAgXTtcblxuICAgICAgICAvLyBmZXRjaCBhbGwgZGF0YSBpbiBwYXJhbGxlbFxuICAgICAgICBjbG91ZHNEYXRhLnJlZHVjZShmdW5jdGlvbihzZXF1ZW5jZSwgeyB4LCB5LCB3LCBoLCBsb2dvUGF0aCB9KSB7XG4gICAgICAgICAgICByZXR1cm4gc2VxdWVuY2VcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxvYWRQYXRoKGxvZ29QYXRoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZHJhd1doaXRlQ2xvdWQoXG4gICAgICAgICAgICAgICAgICAgICAgICBjdHgsXG4gICAgICAgICAgICAgICAgICAgICAgICB4ICogcmF0aW8gKyBvZmZzZXRYLFxuICAgICAgICAgICAgICAgICAgICAgICAgeSAqIHJhdGlvICsgb2Zmc2V0WSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHcgKiByYXRpbyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGggKiByYXRpbyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGhcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgUHJvbWlzZS5yZXNvbHZlKCkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUNhbnZhc1NpemUoY2FudmFzLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhbGNMYXJnZXN0Q2xvdWQoY2FudmFzKSB7XG4gICAgICAgIGNvbnN0IG1hcmdpbiA9IDI0O1xuICAgICAgICBsZXQgeyB3aWR0aCwgaGVpZ2h0LCByYXRpbyB9ID0gZml0Q2xvdWRJbnRvKFxuICAgICAgICAgICAgY2FudmFzLndpZHRoIC0gbWFyZ2luLFxuICAgICAgICAgICAgY2FudmFzLmhlaWdodCAtIG1hcmdpblxuICAgICAgICApO1xuICAgICAgICBsZXQgb2Zmc2V0WCA9IChjYW52YXMud2lkdGggLSB3aWR0aCkgPj4gMTtcbiAgICAgICAgbGV0IG9mZnNldFkgPSAoY2FudmFzLmhlaWdodCAtIGhlaWdodCkgPj4gMTtcbiAgICAgICAgcmV0dXJuIHsgb2Zmc2V0WCwgb2Zmc2V0WSwgcmF0aW8gfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkcmF3RGVlcENsb3VkKGN0eCwgeCwgeSwgcmF0aW8pIHtcbiAgICAgICAgLy9kcmF3IHNoYWRvdywgcmVuZGVyIHdheSBvZmYtc2NyZWVuXG4gICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgIGNvbnN0IHNoYWRvd09mZlNjcmVlbiA9IDIwMDA7XG4gICAgICAgIGN0eC5zZXRUcmFuc2Zvcm0ocmF0aW8sIDAsIDAsIHJhdGlvLCB4IC0gc2hhZG93T2ZmU2NyZWVuLCB5KTtcbiAgICAgICAgLy9icmluZyBvbmx5IHRoZSBzaGFkb3cgYmFjayB0byBzY3JlZW4gd2l0aCBvZmZzZXRYXG4gICAgICAgIGN0eC5saW5lV2lkdGggPSA0O1xuICAgICAgICBjb25zdCBzaGFkb3dPZmZTZXQgPSAxICogcmF0aW87XG4gICAgICAgIGN0eC5zaGFkb3dPZmZzZXRYID0gc2hhZG93T2ZmU2NyZWVuICsgc2hhZG93T2ZmU2V0O1xuICAgICAgICBjdHguc2hhZG93T2Zmc2V0WSA9IHNoYWRvd09mZlNldDtcbiAgICAgICAgY3R4LnNoYWRvd0JsdXIgPSAzLjMgKiByYXRpbztcbiAgICAgICAgY3R4LnNoYWRvd0NvbG9yID0gXCJyZ2JhKDAsMCwwLDAuMTcpXCI7XG4gICAgICAgIGN0eC5zdHJva2UoY2xvdWRQYXRoKTtcbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcblxuICAgICAgICAvL2RyYXcgdGhlIGNsaXBwaW5nIHBhdGhcbiAgICAgICAgY3R4LnNldFRyYW5zZm9ybShyYXRpbywgMCwgMCwgcmF0aW8sIHgsIHkpO1xuICAgICAgICBjdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJkZXN0aW5hdGlvbi1pblwiO1xuICAgICAgICBjdHguZmlsbChjbG91ZFBhdGgpO1xuXG4gICAgICAgIC8vZHJhdyB0aGUgZmlsbFxuICAgICAgICBjdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJkZXN0aW5hdGlvbi1vdmVyXCI7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBkZWVwR3JhZGllbnQoY3R4KTtcbiAgICAgICAgY3R4LmZpbGwoY2xvdWRQYXRoKTtcblxuICAgICAgICAvL2NsZWFuIHVwOlxuICAgICAgICBjdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJzb3VyY2Utb3ZlclwiO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRyYXdXaGl0ZUNsb3VkKGN0eCwgeCwgeSwgZGVzaWduV2lkdGgsIGRlc2lnbkhlaWdodCwgcGF0aCkge1xuICAgICAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQsIHJhdGlvIH0gPSBmaXRDbG91ZEludG8oXG4gICAgICAgICAgICBkZXNpZ25XaWR0aCxcbiAgICAgICAgICAgIGRlc2lnbkhlaWdodFxuICAgICAgICApO1xuICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICBjdHguc2V0VHJhbnNmb3JtKHJhdGlvLCAwLCAwLCByYXRpbywgeCwgeSk7XG4gICAgICAgIGN0eC5saW5lV2lkdGggPSAyO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcIiNGRkZGRkZcIjtcbiAgICAgICAgd2hpdGVDbG91ZFNoYWRvdyhjdHgsIHJhdGlvKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHdoaXRlR3JhZGllbnQoY3R4KTtcbiAgICAgICAgY3R4LmZpbGwoY2xvdWRQYXRoKTtcbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcblxuICAgICAgICBjb25zdCB7IGxvZ29YLCBsb2dvWSwgbG9nb1JhdGlvIH0gPSBsb2dvUG9zaXRpb24oeCwgeSwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgIGRyYXdMb2dvKGN0eCwgbG9nb1gsIGxvZ29ZLCBsb2dvUmF0aW8sIHBhdGgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvZ29Qb3NpdGlvbihwYXJlbnRYLCBwYXJlbnRZLCBwYXJlbnRXaWR0aCwgcGFyZW50SGVpZ2h0KSB7XG4gICAgICAgIC8vIHRoZSBsb2dvcyBzdmcgc2l6ZVxuICAgICAgICBjb25zdCBsb2dvV2lkdGggPSAyMDA7XG4gICAgICAgIGNvbnN0IGxvZ29IZWlnaHQgPSAxMDA7XG5cbiAgICAgICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0LCByYXRpbyB9ID0gZml0SW50byhcbiAgICAgICAgICAgIGxvZ29XaWR0aCxcbiAgICAgICAgICAgIGxvZ29IZWlnaHQsXG4gICAgICAgICAgICBwYXJlbnRXaWR0aCxcbiAgICAgICAgICAgIHBhcmVudEhlaWdodFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbG9nb1g6IHBhcmVudFggKyAocGFyZW50V2lkdGggLSB3aWR0aCkgLyAyLFxuICAgICAgICAgICAgbG9nb1k6IHBhcmVudFkgKyAocGFyZW50SGVpZ2h0IC0gaGVpZ2h0ICogMC45MikgLyAyLCAvL3NsaWdodGx5IGFkanVzdCBjZW50ZXJZXG4gICAgICAgICAgICBsb2dvUmF0aW86IHJhdGlvXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHJhd0xvZ28oY3R4LCB4LCB5LCByYXRpbywgcGF0aCkge1xuICAgICAgICBjdHguc2V0VHJhbnNmb3JtKHJhdGlvLCAwLCAwLCByYXRpbywgeCwgeSk7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiM1MTUxNTFcIjtcbiAgICAgICAgY3R4LmZpbGwocGF0aCwgXCJldmVub2RkXCIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvYWRQYXRoKHBhdGgpIHtcbiAgICAgICAgY29uc3QgY2FjaGVkUGF0aCA9IHBhdGhzLmdldChwYXRoKTtcbiAgICAgICAgaWYgKGNhY2hlZFBhdGgpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY2FjaGVkUGF0aCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZldGNoKGAvaW1hZ2VzLyR7cGF0aH0uZGF0YWApXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA8IDQwMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UudGV4dCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXRoMmQgPSBuZXcgUGF0aDJEKGRhdGEpO1xuICAgICAgICAgICAgICAgIHBhdGhzLnNldChwYXRoLCBwYXRoMmQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXRoMmQ7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcih7IGVyciB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHdoaXRlR3JhZGllbnQoY3R4LCB3aWR0aCA9IDEwMCwgaGVpZ2h0ID0gNzIpIHtcbiAgICAgICAgY29uc3QgZ3JhZGllbnQgPSBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLCBcIiNGRkZGRkZcIik7XG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgxLCBcIiNFNEUyRTNcIik7XG4gICAgICAgIHJldHVybiBncmFkaWVudDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWVwR3JhZGllbnQoY3R4LCB3aWR0aCA9IDEwMCwgaGVpZ2h0ID0gNzIpIHtcbiAgICAgICAgY29uc3QgZ3JhZGllbnQgPSBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLCBcIiM1QzkzQURcIik7XG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgxLCBcIiM1MzgzOTlcIik7XG4gICAgICAgIHJldHVybiBncmFkaWVudDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB3aGl0ZUNsb3VkU2hhZG93KGN0eCwgcmF0aW8pIHtcbiAgICAgICAgY3R4LnNoYWRvd09mZnNldFggPSBjdHguc2hhZG93T2Zmc2V0WSA9IDQgKiByYXRpbztcbiAgICAgICAgY3R4LnNoYWRvd0JsdXIgPSAzLjMgKiByYXRpbztcbiAgICAgICAgY3R4LnNoYWRvd0NvbG9yID0gXCJyZ2JhKDAsMCwwLDAuMTcpXCI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZml0Q2xvdWRJbnRvKG1heFdpZHRoLCBtYXhIZWlnaHQpIHtcbiAgICAgICAgcmV0dXJuIGZpdEludG8oMTAwLCA3MS44LCBtYXhXaWR0aCwgbWF4SGVpZ2h0KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZmlsbEluQ2xvdWRTaXplKG1heFdpZHRoLCBtYXhIZWlnaHQpIHtcbiAgICAgICAgcmV0dXJuIGZpbGxJbigxMDAsIDcxLjgsIG1heFdpZHRoLCBtYXhIZWlnaHQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpdEludG8od2lkdGgsIGhlaWdodCwgbWF4V2lkdGgsIG1heEhlaWdodCkge1xuICAgICAgICBpZiAoaGVpZ2h0ID09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB7IHdpZHRoLCBoZWlnaHQsIHJhdGlvOiAxIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmF0aW8gPSB3aWR0aCAvIGhlaWdodDtcbiAgICAgICAgY29uc3QgbWF4UmF0aW8gPSBtYXhXaWR0aCAvIG1heEhlaWdodDtcbiAgICAgICAgaWYgKG1heFJhdGlvIDw9IHJhdGlvKSB7XG4gICAgICAgICAgICAvL3N1YmplY3QgaXMgaG9yaXpvbnRhbFxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB3aWR0aDogbWF4V2lkdGgsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBtYXhXaWR0aCAvIHJhdGlvLFxuICAgICAgICAgICAgICAgIHJhdGlvOiBtYXhXaWR0aCAvIHdpZHRoXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB3aWR0aDogbWF4SGVpZ2h0ICogcmF0aW8sXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBtYXhIZWlnaHQsXG4gICAgICAgICAgICAgICAgcmF0aW86IG1heEhlaWdodCAvIGhlaWdodFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbGxJbih3aWR0aCwgaGVpZ2h0LCBtYXhXaWR0aCwgbWF4SGVpZ2h0KSB7XG4gICAgICAgIGlmIChoZWlnaHQgPT0gMCB8fCBtYXhIZWlnaHQgPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgd2lkdGgsIGhlaWdodCwgcmF0aW86IDEgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByYXRpbyA9IHdpZHRoIC8gaGVpZ2h0O1xuICAgICAgICBjb25zdCBtYXhSYXRpbyA9IG1heFdpZHRoIC8gbWF4SGVpZ2h0O1xuICAgICAgICBpZiAobWF4UmF0aW8gPD0gcmF0aW8pIHtcbiAgICAgICAgICAgIC8vc3ViamVjdCBpcyBob3Jpem9udGFsXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHdpZHRoOiBtYXhIZWlnaHQgKiByYXRpbyxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IG1heEhlaWdodCxcbiAgICAgICAgICAgICAgICByYXRpbzogbWF4SGVpZ2h0IC8gaGVpZ2h0XG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB3aWR0aDogbWF4V2lkdGgsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBtYXhXaWR0aCAvIHJhdGlvLFxuICAgICAgICAgICAgICAgIHJhdGlvOiBtYXhXaWR0aCAvIHdpZHRoXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxufSkoKTtcbiIsICIvLyBXZSBpbXBvcnQgdGhlIENTUyB3aGljaCBpcyBleHRyYWN0ZWQgdG8gaXRzIG93biBmaWxlIGJ5IGVzYnVpbGQuXG4vLyBSZW1vdmUgdGhpcyBsaW5lIGlmIHlvdSBhZGQgYSB5b3VyIG93biBDU1MgYnVpbGQgcGlwZWxpbmUgKGUuZyBwb3N0Y3NzKS5cbmltcG9ydCBcIi4uL2Nzcy9hcHAuY3NzXCJcblxuLy8gSWYgeW91IHdhbnQgdG8gdXNlIFBob2VuaXggY2hhbm5lbHMsIHJ1biBgbWl4IGhlbHAgcGh4Lmdlbi5jaGFubmVsYFxuLy8gdG8gZ2V0IHN0YXJ0ZWQgYW5kIHRoZW4gdW5jb21tZW50IHRoZSBsaW5lIGJlbG93LlxuLy8gaW1wb3J0IFwiLi91c2VyX3NvY2tldC5qc1wiXG5cbi8vIFlvdSBjYW4gaW5jbHVkZSBkZXBlbmRlbmNpZXMgaW4gdHdvIHdheXMuXG4vL1xuLy8gVGhlIHNpbXBsZXN0IG9wdGlvbiBpcyB0byBwdXQgdGhlbSBpbiBhc3NldHMvdmVuZG9yIGFuZFxuLy8gaW1wb3J0IHRoZW0gdXNpbmcgcmVsYXRpdmUgcGF0aHM6XG4vL1xuLy8gICAgIGltcG9ydCBcIi4vdmVuZG9yL3NvbWUtcGFja2FnZS5qc1wiXG4vL1xuLy8gQWx0ZXJuYXRpdmVseSwgeW91IGNhbiBgbnBtIGluc3RhbGwgc29tZS1wYWNrYWdlYCBhbmQgaW1wb3J0XG4vLyB0aGVtIHVzaW5nIGEgcGF0aCBzdGFydGluZyB3aXRoIHRoZSBwYWNrYWdlIG5hbWU6XG4vL1xuLy8gICAgIGltcG9ydCBcInNvbWUtcGFja2FnZVwiXG4vL1xuXG4vLyBJbmNsdWRlIHBob2VuaXhfaHRtbCB0byBoYW5kbGUgbWV0aG9kPVBVVC9ERUxFVEUgaW4gZm9ybXMgYW5kIGJ1dHRvbnMuXG5pbXBvcnQgXCJwaG9lbml4X2h0bWxcIlxuaW1wb3J0IFwiLi9hbmltLmpzXCJcbmltcG9ydCBcIi4vYW5pbV9jbG91ZHMuanNcIlxuLy8gRXN0YWJsaXNoIFBob2VuaXggU29ja2V0IGFuZCBMaXZlVmlldyBjb25maWd1cmF0aW9uLlxuLy8gaW1wb3J0IHtTb2NrZXR9IGZyb20gXCJwaG9lbml4XCJcbi8vIGltcG9ydCB7TGl2ZVNvY2tldH0gZnJvbSBcInBob2VuaXhfbGl2ZV92aWV3XCJcbmltcG9ydCB0b3BiYXIgZnJvbSBcIi4uL3ZlbmRvci90b3BiYXJcIlxuXG4vLyBsZXQgY3NyZlRva2VuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1ldGFbbmFtZT0nY3NyZi10b2tlbiddXCIpLmdldEF0dHJpYnV0ZShcImNvbnRlbnRcIilcbi8vIGxldCBsaXZlU29ja2V0ID0gbmV3IExpdmVTb2NrZXQoXCIvbGl2ZVwiLCBTb2NrZXQsIHtwYXJhbXM6IHtfY3NyZl90b2tlbjogY3NyZlRva2VufX0pXG5cbi8vIC8vIFNob3cgcHJvZ3Jlc3MgYmFyIG9uIGxpdmUgbmF2aWdhdGlvbiBhbmQgZm9ybSBzdWJtaXRzXG50b3BiYXIuY29uZmlnKHtiYXJDb2xvcnM6IHswOiBcIiMyOWRcIn0sIHNoYWRvd0NvbG9yOiBcInJnYmEoMCwgMCwgMCwgLjMpXCJ9KVxuLy8gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwaHg6cGFnZS1sb2FkaW5nLXN0YXJ0XCIsIGluZm8gPT4gdG9wYmFyLnNob3coKSlcbi8vIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicGh4OnBhZ2UtbG9hZGluZy1zdG9wXCIsIGluZm8gPT4gdG9wYmFyLmhpZGUoKSlcblxuLy8gLy8gY29ubmVjdCBpZiB0aGVyZSBhcmUgYW55IExpdmVWaWV3cyBvbiB0aGUgcGFnZVxuLy8gbGl2ZVNvY2tldC5jb25uZWN0KClcblxuLy8gLy8gZXhwb3NlIGxpdmVTb2NrZXQgb24gd2luZG93IGZvciB3ZWIgY29uc29sZSBkZWJ1ZyBsb2dzIGFuZCBsYXRlbmN5IHNpbXVsYXRpb246XG4vLyAvLyA+PiBsaXZlU29ja2V0LmVuYWJsZURlYnVnKClcbi8vIC8vID4+IGxpdmVTb2NrZXQuZW5hYmxlTGF0ZW5jeVNpbSgxMDAwKSAgLy8gZW5hYmxlZCBmb3IgZHVyYXRpb24gb2YgYnJvd3NlciBzZXNzaW9uXG4vLyAvLyA+PiBsaXZlU29ja2V0LmRpc2FibGVMYXRlbmN5U2ltKClcbi8vIHdpbmRvdy5saXZlU29ja2V0ID0gbGl2ZVNvY2tldFxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQU1BLE1BQUMsVUFBVSxTQUFRLFdBQVU7QUFDM0I7QUFHQSxRQUFDLFlBQVk7QUFDWCxjQUFJLFdBQVc7QUFDZixjQUFJLFVBQVUsQ0FBQyxNQUFNLE9BQU8sVUFBVTtBQUN0QyxtQkFBUyxJQUFJLEdBQUcsSUFBSSxRQUFRLFVBQVUsQ0FBQyxRQUFPLHVCQUF1QixFQUFFLEdBQUc7QUFDeEUsb0JBQU8sd0JBQ0wsUUFBTyxRQUFRLEtBQUs7QUFDdEIsb0JBQU8sdUJBQ0wsUUFBTyxRQUFRLEtBQUssMkJBQ3BCLFFBQU8sUUFBUSxLQUFLO0FBQUE7QUFFeEIsY0FBSSxDQUFDLFFBQU87QUFDVixvQkFBTyx3QkFBd0IsU0FBVSxVQUFVLFNBQVM7QUFDMUQsa0JBQUksV0FBVyxJQUFJLE9BQU87QUFDMUIsa0JBQUksYUFBYSxLQUFLLElBQUksR0FBRyxLQUFNLFlBQVc7QUFDOUMsa0JBQUksS0FBSyxRQUFPLFdBQVcsV0FBWTtBQUNyQyx5QkFBUyxXQUFXO0FBQUEsaUJBQ25CO0FBQ0gseUJBQVcsV0FBVztBQUN0QixxQkFBTztBQUFBO0FBRVgsY0FBSSxDQUFDLFFBQU87QUFDVixvQkFBTyx1QkFBdUIsU0FBVSxJQUFJO0FBQzFDLDJCQUFhO0FBQUE7QUFBQTtBQUluQixZQUFJLFFBQ0YsaUJBQ0EsYUFDQSxpQkFDQSxTQUNBLFdBQVcsU0FBVSxNQUFNLE1BQU0sU0FBUztBQUN4QyxjQUFJLEtBQUs7QUFBa0IsaUJBQUssaUJBQWlCLE1BQU0sU0FBUztBQUFBLG1CQUN2RCxLQUFLO0FBQWEsaUJBQUssWUFBWSxPQUFPLE1BQU07QUFBQTtBQUNwRCxpQkFBSyxPQUFPLFFBQVE7QUFBQSxXQUUzQixV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
