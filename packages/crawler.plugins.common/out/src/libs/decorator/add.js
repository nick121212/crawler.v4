"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../contansts/config");
exports.Add = function (partten, options) {
    return function (target, key, value) {
        var metadata = { partten: partten, options: options, target: target, key: key };
        var metadataList = [];
        if (!Reflect.hasOwnMetadata(config_1.SenecaConfig._add, target.constructor)) {
            Reflect.defineMetadata(config_1.SenecaConfig._add, metadataList, target.constructor);
        }
        else {
            metadataList = Reflect.getOwnMetadata(config_1.SenecaConfig._add, target.constructor);
        }
        metadataList.push(metadata);
    };
};
exports.Wrap = function (partten, options) {
    return function (target, key, value) {
        var metadata = { partten: partten, options: options, target: target, key: key };
        var metadataList = [];
        if (!Reflect.hasOwnMetadata(config_1.SenecaConfig._wrap, target.constructor)) {
            Reflect.defineMetadata(config_1.SenecaConfig._wrap, metadataList, target.constructor);
        }
        else {
            metadataList = Reflect.getOwnMetadata(config_1.SenecaConfig._wrap, target.constructor);
        }
        metadataList.push(metadata);
    };
};
//# sourceMappingURL=add.js.map