"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Axios_1 = require("./core/Axios");
var util_1 = require("./helpers/util");
var default_1 = require("./default");
var mergeConfig_1 = require("./core/mergeConfig");
var CancelToken_1 = require("./cancel/CancelToken");
var Cancel_1 = require("./cancel/Cancel");
function createInstance(config) {
    var context = new Axios_1.default(config);
    var instance = Axios_1.default.prototype.request.bind(context);
    util_1.extend(instance, context);
    return instance;
}
var axios = createInstance(default_1.default);
axios.create = function (config) {
    return createInstance(mergeConfig_1.default(default_1.default, config));
};
axios.CancelToken = CancelToken_1.default;
axios.Cancel = Cancel_1.default;
axios.isCancel = Cancel_1.isCancel;
exports.default = axios;
//# sourceMappingURL=index.js.map