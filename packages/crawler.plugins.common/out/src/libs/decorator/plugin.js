"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../contansts/config");
exports.Plugin = function (name, options) {
    return function (target) {
        var metadata = { name: name, options: options, target: target };
        Reflect.defineMetadata(config_1.SenecaConfig._plugin, metadata, target);
    };
};
//# sourceMappingURL=plugin.js.map