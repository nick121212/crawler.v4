"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../contansts/config");
exports.Init = function () {
    return function (target, key, value) {
        var metadata = { target: target, key: key };
        var metadataList = [];
        if (!Reflect.hasOwnMetadata(config_1.SenecaConfig._init, target.constructor)) {
            Reflect.defineMetadata(config_1.SenecaConfig._init, metadataList, target.constructor);
        }
        else {
            metadataList = Reflect.getOwnMetadata(config_1.SenecaConfig._init, target.constructor);
        }
        metadataList.push(metadata);
    };
};
//# sourceMappingURL=init.js.map