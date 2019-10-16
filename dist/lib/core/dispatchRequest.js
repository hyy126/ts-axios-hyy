"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xhr_1 = require("./xhr");
var url_1 = require("../helpers/url");
var data_1 = require("../helpers/data");
var headers_1 = require("../helpers/headers");
var transform_1 = require("./transform");
function dispatchRequest(config) {
    throwIfCancellationRequested(config);
    processConfig(config);
    return xhr_1.default(config).then(function (res) {
        return transformResponseData(res);
    }, function (e) {
        if (e && e.response) {
            e.response = transformResponseData(e.response);
        }
        return Promise.reject(e);
    });
}
exports.default = dispatchRequest;
function processConfig(config) {
    config.url = transformUrl(config);
    config.data = transform_1.default(config.data, config.headers, config.transformRequest);
    config.headers = headers_1.flattenHeaders(config.headers, config.method);
}
function transformUrl(config) {
    var baseURL = config.baseURL, params = config.params, paramsSerializer = config.paramsSerializer, url = config.url;
    if (baseURL && !url_1.isAbsoluteURL(url)) {
        url = url_1.combineURL(baseURL, url);
    }
    return url_1.bulidURL(url, params, paramsSerializer);
}
exports.transformUrl = transformUrl;
function transformRequestData(config) {
    return data_1.transformRequest(config.data);
}
function transformHeaders(config) {
    var _a = config.headers, headers = _a === void 0 ? {} : _a, data = config.data;
    return headers_1.processHeaders(headers, data);
}
function transformResponseData(res) {
    res.data = transform_1.default(res.data, res.headers, res.config.transformResponse);
    return res;
}
function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
    }
}
//# sourceMappingURL=dispatchRequest.js.map