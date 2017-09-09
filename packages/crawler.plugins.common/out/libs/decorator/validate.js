"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../contansts/config");
exports.Validate = function (joi, options) {
    // console.log(joi);
    return function (target, key, index) {
        var metadata = { joi: joi, target: target, key: key, index: index, options: options };
        var metadataList = [];
        if (!Reflect.hasOwnMetadata(config_1.SenecaConfig._validate, target.constructor)) {
            Reflect.defineMetadata(config_1.SenecaConfig._validate, metadataList, target.constructor);
        }
        else {
            metadataList = Reflect.getOwnMetadata(config_1.SenecaConfig._validate, target.constructor);
        }
        metadataList.push(metadata);
    };
};
//# sourceMappingURL=validate.js.map