"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uri = require("urijs");
var _ = require("lodash");
var pathToRegexp = require("path-to-regexp");
// 正则，用来匹配页面中的地址
var discoverRegex = [
    /\s(?:href|src)\s?=\s?(["']).*?\1/ig,
    /\s(?:href|src)\s?=\s?[^"'\s][^\s>]+/ig,
    /\s?url\((["']).*?\1\)/ig,
    /\s?url\([^"'].*?\)/ig,
    // This could easily duplicate matches above, e.g. in the case of
    // href="http://example.com"
    /http(s)?\:\/\/[^?\s><\'\"]+/ig,
    // This might be a bit of a gamble... but get hard-coded
    // strings out of javacript: URLs. They're often popup-image
    // or preview windows, which would otherwise be unavailable to us.
    // Worst case scenario is we make some junky requests.
    /^javascript\:[a-z0-9\$\_\.]+\(['"][^'"\s]+/ig,
    // Find srcset links
    function (string) {
        var result = /\ssrcset\s*=\s*(["'])(.*)\1/.exec(string);
        return Array.isArray(result) ? String(result[2]).split(",").map(function (string) {
            return string.replace(/\s?\w*$/, "").trim();
        }) : "";
    },
    // Find resources in <meta> redirects. We need to wrap these RegExp's in
    // functions because we only want to return the first capture group, not
    // the entire match. And we need two RegExp's because the necessary
    // attributes on the <meta> tag can appear in any order
    function (string) {
        var match = string.match(/<\s*meta[^>]*http-equiv=["']{0,1}refresh["']{0,1}[^>]*content=["']{0,1}[^"'>]*url=([^"'>]*)["']{0,1}[^>]*>/i);
        return Array.isArray(match) ? [match[1]] : undefined;
    },
    function (string) {
        var match = string.match(/<\s*meta[^>]*content=["']{0,1}[^"'>]*url=([^"'>]*)["']{0,1}[^>]*http-equiv=["']{0,1}refresh["']{0,1}[^>]*>/i);
        return Array.isArray(match) ? [match[1]] : undefined;
    },
    function (string) {
        var match = string.match(/<\s*meta[^>]*content=["']{0,1}[^"'>]*url=([^"'>]*)["']{0,1}[^>]*http-equiv=["']{0,1}refresh["']{0,1}[^>]*>/i);
        return Array.isArray(match) ? [match[1]] : undefined;
    }
], 
// 过滤掉静态资源
suffixs = [
    "ico",
    "png",
    "jpg",
    "jpeg",
    "gif",
    "ttf",
    "css"
], 
// Matching MIME-types will be allowed to fetch further than max depth
whitelistedMimeTypes = [
    /^text\/(css|javascript|ecmascript)/i,
    /^application\/javascript/i,
    /^application\/x-font/i,
    /^application\/font/i,
    /^image\//i,
    /^font\//i
];
var DiscoverLinks = (function () {
    /**
     * 构造函数
     * @param settings  {object}
     *   parseHTMLComments {boolean} 是否需要搜索comments中的url
     *   parseScriptTags   {boolean} 是否需要搜索标签中的url
     *   allowedProtocols  {array} 允许的协议的列表
     *   blackPathList     {array} 不用爬的路径
     *   whitePathList     {array} 路径白名单
     *   userAgent         {string} ua
     *   _robotsTxts       {Object} 机器人应答信息
     *   fetchWhitelistedMimeTypesBelowMaxDepth {Boolean}
     *   maxDepth          {number} 最大深度
     *   ignoreRobots      {boolean} 是否忽略机器人应答
     * @param queue        {Object}
     */
    function DiscoverLinks(settings) {
        if (settings === void 0) { settings = {}; }
        this.parseHTMLComments = false;
        this.parseScriptTags = false;
        this.allowedProtocols = [];
        this.blackPathList = [];
        this.whitePathList = [];
        this.userAgent = "";
        this._robotsTxts = [];
        this.ignoreRobots = false;
        this.maxDepth = 0;
        var parseHTMLComments = settings.parseHTMLComments, parseScriptTags = settings.parseScriptTags, allowedProtocols = settings.allowedProtocols, blackPathList = settings.blackPathList, whitePathList = settings.whitePathList, userAgent = settings.userAgent, fetchWhitelistedMimeTypesBelowMaxDepth = settings.fetchWhitelistedMimeTypesBelowMaxDepth, maxDepth = settings.maxDepth, ignoreRobots = settings.ignoreRobots;
        this.parseHTMLComments = parseHTMLComments || false;
        this.parseScriptTags = parseScriptTags || false;
        this.allowedProtocols = allowedProtocols || ["http"];
        // 弃用这个属性
        this.blackPathList = blackPathList || [];
        this.whitePathList = whitePathList || [];
        // this.whitePathList.push(/^\/$/i);
        this.userAgent = userAgent || "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36";
        this._robotsTxts = [];
        this.fetchWhitelistedMimeTypesBelowMaxDepth = fetchWhitelistedMimeTypesBelowMaxDepth || false;
        this.maxDepth = maxDepth || 0;
        this.ignoreRobots = ignoreRobots || true;
    }
    /**
     * 判断协议是否支持
     * @param URL {string} 链接地址
     * @returns boolean
     */
    DiscoverLinks.prototype.protocolSupported = function (URL) {
        var protocol;
        try {
            protocol = uri(URL).protocol();
            if (!protocol) {
                protocol = "http";
            }
        }
        catch (e) {
            return false;
        }
        return this.allowedProtocols.reduce(function (prev, protocolCheck) {
            return prev || protocolCheck.toLocaleLowerCase() == protocol.toLocaleLowerCase();
        }, true);
    };
    /**
     * 后缀是否支持
     * @param suffix {string} 链接地址前缀
     * @returns boolean
     */
    DiscoverLinks.prototype.extendSupported = function (suffix) {
        return !suffixs.some(function (value) {
            return value === suffix.toLowerCase();
        });
    };
    /**
     * 路径是否支持
     * @param urlPath {string} 链接地址路径
     * @returns boolean
     */
    DiscoverLinks.prototype.pathSupported = function (urlPath) {
        var res = false;
        _.forEach(this.whitePathList, function (_a) {
            var path = _a.path, enable = _a.enable;
            var pathToReg = pathToRegexp(path, []);
            res = pathToReg.test(urlPath);
            if (res) {
                return false;
            }
        });
        return res;
    };
    /**
     * 去掉一些没用的URL
     * @param urlMatch {array} 链接数组
     * @param queueItem {object}
     * @returns {Array}
     */
    DiscoverLinks.prototype.cleanExpandResources = function (urlMatch, queueItem) {
        var _this = this;
        if (urlMatch === void 0) { urlMatch = []; }
        if (queueItem === void 0) { queueItem = {}; }
        return urlMatch
            .map(this.cleanURL.bind(this, queueItem))
            .reduce(function (list, URL) {
            try {
                URL = uri(decodeURIComponent(URL.toString()))
                    .absoluteTo(queueItem.url)
                    .normalize();
            }
            catch (e) {
                return list;
            }
            // url是否为空
            if (!URL.toString().length) {
                return list;
            }
            // 判断协议是否支持
            if (!_this.protocolSupported(URL.toString())) {
                return list;
            }
            // maxDepth是否符合
            if (!_this.depthAllowed(queueItem)) {
                return list;
            }
            // 后缀名是否支持
            if (!_this.extendSupported(URL.suffix())) {
                return list;
            }
            // 路径是否需要爬
            if (!_this.pathSupported(URL.path())) {
                return list;
            }
            // 判断是否在机器人应答的允许列表中
            if (!_this.ignoreRobots && !_this.urlIsAllowed(URL)) {
                return list;
            }
            // url是否已经存在列表中
            if (list.reduce(function (prev, current) {
                return prev || current === URL.toString();
            }, false)) {
                return list;
            }
            return list.concat(URL.toString());
        }, []);
    };
    /**
     * 清理文本中的一些信息
     * @param queueItem {Object}
     * @param URL       {String}
     * @returns {*|string}
     */
    DiscoverLinks.prototype.cleanURL = function (queueItem, URL) {
        var protocol = queueItem.protocol;
        if (!URL) {
            return "";
        }
        return URL
            .replace(/^(?:\s*href|\s*src)\s*=+\s*/i, "")
            .replace(/^\s*/, "")
            .replace(/^(['"])(.*)\1$/, "$2")
            .replace(/^url\((.*)\)/i, "$1")
            .replace(/^javascript\:\s*([a-z0-9]*\(["'](.*)["']\))*.*/i, "$2")
            .replace(/^(['"])(.*)\1$/, "$2")
            .replace(/^\((.*)\)$/, "$1")
            .replace(/^\/\//, protocol + "://")
            .replace(/\&amp;/gi, "&")
            .replace(/\&#38;/gi, "&")
            .replace(/\&#x00026;/gi, "&")
            .split("#")
            .shift()
            .trim();
    };
    /**
     * 深度是否允许爬取
     * @param queueItem
     * @returns {boolean|*}
     */
    DiscoverLinks.prototype.depthAllowed = function (queueItem) {
        var belowMaxDepth = this.fetchWhitelistedMimeTypesBelowMaxDepth;
        if (typeof belowMaxDepth === "boolean") {
            belowMaxDepth = belowMaxDepth === false ? 0 : Infinity;
        }
        var whitelistedDepth = queueItem.depth - belowMaxDepth;
        return this.maxDepth === 0 ||
            queueItem.depth <= this.maxDepth ||
            whitelistedDepth <= this.maxDepth &&
                whitelistedMimeTypes.some(function (mimeCheck) {
                    return mimeCheck.test(queueItem.stateData.contentType);
                });
    };
    /**
     * 判断链接是否合法
     * @param parsedURL {String} 链接
     * @returns {boolean}
     */
    DiscoverLinks.prototype.urlIsAllowed = function (parsedURL) {
        var _this = this;
        if (typeof parsedURL === "object") {
            parsedURL = {
                protocol: parsedURL.protocol(),
                hostname: parsedURL.host(),
                port: parsedURL.port().toString(),
                path: parsedURL.path(),
                query: parsedURL.query()
            };
        }
        var formattedURL = uri(parsedURL).normalize().href(), allowed = false;
        // The punycode module sometimes chokes on really weird domain
        // names. Catching those errors to prevent crawler from crashing
        try {
            allowed = this._robotsTxts.reduce(function (result, robots) {
                var allowed = robots.isAllowed(formattedURL, _this.userAgent);
                return result !== undefined ? result : allowed;
            }, undefined);
        }
        catch (error) {
            // URL will be avoided
        }
        allowed !== undefined && console.log(formattedURL + " is " + (allowed === undefined ? "allow" : "disallow"));
        return allowed === undefined ? true : allowed;
    };
    /**
     * 发现页面中的链接
     * @param queueItem    {Object}
     * @returns {*}
     */
    DiscoverLinks.prototype.discoverResources = function (queueItem) {
        var _this = this;
        if (queueItem === void 0) { queueItem = {}; }
        if (!queueItem) {
            queueItem = {};
        }
        if (!queueItem.protocol) {
            queueItem.protocol = "http";
        }
        var _a = queueItem.responseBody, responseBody = _a === void 0 ? "" : _a;
        if (!this.parseHTMLComments) {
            responseBody = responseBody.replace(/<!--([\s\S]+?)-->/g, "");
        }
        if (!this.parseScriptTags) {
            responseBody = responseBody.replace(/<script(.*?)>([\s\S]*?)<\/script>/gi, "");
        }
        return discoverRegex
            .reduce(function (list, regex) {
            var resources = typeof regex === "function" ?
                regex(responseBody) :
                responseBody.match(regex) || [];
            return list.concat(_this.cleanExpandResources(resources || [], queueItem));
        }, [])
            .reduce(function (list, check) {
            if (list.indexOf(check) < 0) {
                return list.concat([check]);
            }
            return list;
        }, []);
    };
    return DiscoverLinks;
}());
exports.DiscoverLinks = DiscoverLinks;
//# sourceMappingURL=discover.js.map