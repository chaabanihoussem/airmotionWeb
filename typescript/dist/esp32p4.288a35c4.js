// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"lHAq9":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "2e9489a7288a35c4";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && ![
        "localhost",
        "127.0.0.1",
        "0.0.0.0"
    ].includes(hostname) ? "wss" : "ws";
    var ws;
    if (HMR_USE_SSE) ws = new EventSource("/__parcel_hmr");
    else try {
        ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === "undefined" ? typeof chrome === "undefined" ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    if (ws instanceof WebSocket) {
        ws.onerror = function(e) {
            if (e.message) console.error(e.message);
        };
        ws.onclose = function() {
            console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
        };
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"RsFvw":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ESP32P4ROM", ()=>ESP32P4ROM);
var _esp32Js = require("./esp32.js");
var _stubFlasher32P4Json = require("./stub_flasher/stub_flasher_32p4.json");
var _stubFlasher32P4JsonDefault = parcelHelpers.interopDefault(_stubFlasher32P4Json);
class ESP32P4ROM extends (0, _esp32Js.ESP32ROM) {
    constructor(){
        super(...arguments);
        this.CHIP_NAME = "ESP32-P4";
        this.IMAGE_CHIP_ID = 18;
        this.IROM_MAP_START = 0x40000000;
        this.IROM_MAP_END = 0x4c000000;
        this.DROM_MAP_START = 0x40000000;
        this.DROM_MAP_END = 0x4c000000;
        this.BOOTLOADER_FLASH_OFFSET = 0x2000; // First 2 sectors are reserved for FE purposes
        this.CHIP_DETECT_MAGIC_VALUE = [
            0x0,
            0x0addbad0
        ];
        this.UART_DATE_REG_ADDR = 1343004812;
        this.EFUSE_BASE = 0x5012d000;
        this.EFUSE_BLOCK1_ADDR = this.EFUSE_BASE + 0x044;
        this.MAC_EFUSE_REG = this.EFUSE_BASE + 0x044;
        this.SPI_REG_BASE = 0x5008d000; // SPIMEM1
        this.SPI_USR_OFFS = 0x18;
        this.SPI_USR1_OFFS = 0x1c;
        this.SPI_USR2_OFFS = 0x20;
        this.SPI_MOSI_DLEN_OFFS = 0x24;
        this.SPI_MISO_DLEN_OFFS = 0x28;
        this.SPI_W0_OFFS = 0x58;
        this.EFUSE_RD_REG_BASE = this.EFUSE_BASE + 0x030; // BLOCK0 read base address
        this.EFUSE_PURPOSE_KEY0_REG = this.EFUSE_BASE + 0x34;
        this.EFUSE_PURPOSE_KEY0_SHIFT = 24;
        this.EFUSE_PURPOSE_KEY1_REG = this.EFUSE_BASE + 0x34;
        this.EFUSE_PURPOSE_KEY1_SHIFT = 28;
        this.EFUSE_PURPOSE_KEY2_REG = this.EFUSE_BASE + 0x38;
        this.EFUSE_PURPOSE_KEY2_SHIFT = 0;
        this.EFUSE_PURPOSE_KEY3_REG = this.EFUSE_BASE + 0x38;
        this.EFUSE_PURPOSE_KEY3_SHIFT = 4;
        this.EFUSE_PURPOSE_KEY4_REG = this.EFUSE_BASE + 0x38;
        this.EFUSE_PURPOSE_KEY4_SHIFT = 8;
        this.EFUSE_PURPOSE_KEY5_REG = this.EFUSE_BASE + 0x38;
        this.EFUSE_PURPOSE_KEY5_SHIFT = 12;
        this.EFUSE_DIS_DOWNLOAD_MANUAL_ENCRYPT_REG = this.EFUSE_RD_REG_BASE;
        this.EFUSE_DIS_DOWNLOAD_MANUAL_ENCRYPT = 1048576;
        this.EFUSE_SPI_BOOT_CRYPT_CNT_REG = this.EFUSE_BASE + 0x034;
        this.EFUSE_SPI_BOOT_CRYPT_CNT_MASK = 1835008;
        this.EFUSE_SECURE_BOOT_EN_REG = this.EFUSE_BASE + 0x038;
        this.EFUSE_SECURE_BOOT_EN_MASK = 1048576;
        this.PURPOSE_VAL_XTS_AES256_KEY_1 = 2;
        this.PURPOSE_VAL_XTS_AES256_KEY_2 = 3;
        this.PURPOSE_VAL_XTS_AES128_KEY = 4;
        this.SUPPORTS_ENCRYPTED_FLASH = true;
        this.FLASH_ENCRYPTED_WRITE_ALIGN = 16;
        this.MEMORY_MAP = [
            [
                0x00000000,
                0x00010000,
                "PADDING"
            ],
            [
                0x40000000,
                0x4c000000,
                "DROM"
            ],
            [
                0x4ff00000,
                0x4ffa0000,
                "DRAM"
            ],
            [
                0x4ff00000,
                0x4ffa0000,
                "BYTE_ACCESSIBLE"
            ],
            [
                0x4fc00000,
                0x4fc20000,
                "DROM_MASK"
            ],
            [
                0x4fc00000,
                0x4fc20000,
                "IROM_MASK"
            ],
            [
                0x40000000,
                0x4c000000,
                "IROM"
            ],
            [
                0x4ff00000,
                0x4ffa0000,
                "IRAM"
            ],
            [
                0x50108000,
                0x50110000,
                "RTC_IRAM"
            ],
            [
                0x50108000,
                0x50110000,
                "RTC_DRAM"
            ],
            [
                0x600fe000,
                0x60100000,
                "MEM_INTERNAL2"
            ]
        ];
        this.UF2_FAMILY_ID = 0x3d308e94;
        this.EFUSE_MAX_KEY = 5;
        this.KEY_PURPOSES = {
            0: "USER/EMPTY",
            1: "ECDSA_KEY",
            2: "XTS_AES_256_KEY_1",
            3: "XTS_AES_256_KEY_2",
            4: "XTS_AES_128_KEY",
            5: "HMAC_DOWN_ALL",
            6: "HMAC_DOWN_JTAG",
            7: "HMAC_DOWN_DIGITAL_SIGNATURE",
            8: "HMAC_UP",
            9: "SECURE_BOOT_DIGEST0",
            10: "SECURE_BOOT_DIGEST1",
            11: "SECURE_BOOT_DIGEST2",
            12: "KM_INIT_KEY"
        };
        this.TEXT_START = (0, _stubFlasher32P4JsonDefault.default).text_start;
        this.ENTRY = (0, _stubFlasher32P4JsonDefault.default).entry;
        this.DATA_START = (0, _stubFlasher32P4JsonDefault.default).data_start;
        this.ROM_DATA = (0, _stubFlasher32P4JsonDefault.default).data;
        this.ROM_TEXT = (0, _stubFlasher32P4JsonDefault.default).text;
    }
    async getPkgVersion(loader) {
        const numWord = 2;
        const addr = this.EFUSE_BLOCK1_ADDR + 4 * numWord;
        const registerValue = await loader.readReg(addr);
        return registerValue >> 27 & 0x07;
    }
    async getMinorChipVersion(loader) {
        const numWord = 2;
        const addr = this.EFUSE_BLOCK1_ADDR + 4 * numWord;
        const registerValue = await loader.readReg(addr);
        return registerValue >> 0 & 0x0f;
    }
    async getMajorChipVersion(loader) {
        const numWord = 2;
        const addr = this.EFUSE_BLOCK1_ADDR + 4 * numWord;
        const registerValue = await loader.readReg(addr);
        return registerValue >> 4 & 0x03;
    }
    async getChipDescription(loader) {
        const pkgVersion = await this.getPkgVersion(loader);
        const chipName = pkgVersion === 0 ? "ESP32-P4" : "unknown ESP32-P4";
        const majorRev = await this.getMajorChipVersion(loader);
        const minorRev = await this.getMinorChipVersion(loader);
        return `${chipName} (revision v${majorRev}.${minorRev})`;
    }
    async getChipFeatures(loader) {
        return [
            "High-Performance MCU"
        ];
    }
    async getCrystalFreq(loader) {
        return 40; // ESP32P4 XTAL is fixed to 40MHz
    }
    async getFlashVoltage(loader) {
        return;
    }
    async overrideVddsdio(loader) {
        loader.debug("VDD_SDIO overrides are not supported for ESP32-P4");
    }
    async readMac(loader) {
        let mac0 = await loader.readReg(this.MAC_EFUSE_REG);
        mac0 = mac0 >>> 0;
        let mac1 = await loader.readReg(this.MAC_EFUSE_REG + 4);
        mac1 = mac1 >>> 0 & 0x0000ffff;
        const mac = new Uint8Array(6);
        mac[0] = mac1 >> 8 & 0xff;
        mac[1] = mac1 & 0xff;
        mac[2] = mac0 >> 24 & 0xff;
        mac[3] = mac0 >> 16 & 0xff;
        mac[4] = mac0 >> 8 & 0xff;
        mac[5] = mac0 & 0xff;
        return this._d2h(mac[0]) + ":" + this._d2h(mac[1]) + ":" + this._d2h(mac[2]) + ":" + this._d2h(mac[3]) + ":" + this._d2h(mac[4]) + ":" + this._d2h(mac[5]);
    }
    async getFlashCryptConfig(loader) {
        return; // doesn't exist on ESP32-P4
    }
    async getSecureBootEnabled(laoder) {
        const registerValue = await laoder.readReg(this.EFUSE_SECURE_BOOT_EN_REG);
        return registerValue & this.EFUSE_SECURE_BOOT_EN_MASK;
    }
    async getKeyBlockPurpose(loader, keyBlock) {
        if (keyBlock < 0 || keyBlock > this.EFUSE_MAX_KEY) {
            loader.debug(`Valid key block numbers must be in range 0-${this.EFUSE_MAX_KEY}`);
            return;
        }
        const regShiftDictionary = [
            [
                this.EFUSE_PURPOSE_KEY0_REG,
                this.EFUSE_PURPOSE_KEY0_SHIFT
            ],
            [
                this.EFUSE_PURPOSE_KEY1_REG,
                this.EFUSE_PURPOSE_KEY1_SHIFT
            ],
            [
                this.EFUSE_PURPOSE_KEY2_REG,
                this.EFUSE_PURPOSE_KEY2_SHIFT
            ],
            [
                this.EFUSE_PURPOSE_KEY3_REG,
                this.EFUSE_PURPOSE_KEY3_SHIFT
            ],
            [
                this.EFUSE_PURPOSE_KEY4_REG,
                this.EFUSE_PURPOSE_KEY4_SHIFT
            ],
            [
                this.EFUSE_PURPOSE_KEY5_REG,
                this.EFUSE_PURPOSE_KEY5_SHIFT
            ]
        ];
        const [reg, shift] = regShiftDictionary[keyBlock];
        const registerValue = await loader.readReg(reg);
        return registerValue >> shift & 0xf;
    }
    async isFlashEncryptionKeyValid(loader) {
        const purposes = [];
        for(let i = 0; i <= this.EFUSE_MAX_KEY; i++){
            const purpose = await this.getKeyBlockPurpose(loader, i);
            purposes.push(purpose);
        }
        const isXtsAes128Key = purposes.find((p)=>p === this.PURPOSE_VAL_XTS_AES128_KEY);
        return true;
    }
}

},{"./esp32.js":"dligm","./stub_flasher/stub_flasher_32p4.json":"fs2cA","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fs2cA":[function(require,module,exports) {
module.exports = JSON.parse('{"entry":1341195918,"text":"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","text_start":1341194240,"data":"EAD1TwYK8U9WCvFPrgrxT4QL8U/wC/FPngvxT9QI8U9AC/FPgAvxT8IK8U+ECPFP9grxT4QI8U/gCfFPJgrxT1YK8U+uCvFP8gnxTzgJ8U9oCfFP7gnxT0AO8U9WCvFPCA3xTwAO8U/EB/FPJA7xT8QH8U/EB/FPxAfxT8QH8U/EB/FPxAfxT8QH8U/EB/FPpAzxT8QH8U8mDfFPAA7xTw==","data_start":1341533100,"bss_start":1341456384}');

},{}]},["lHAq9"], null, "parcelRequire477f")

//# sourceMappingURL=esp32p4.288a35c4.js.map
