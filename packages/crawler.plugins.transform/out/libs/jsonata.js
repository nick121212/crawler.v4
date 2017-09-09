"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonata = require("jsonata");
var container_1 = require("../container");
var constants_1 = require("../constants");
exports.default = function (str) {
    var exp = jsonata(str);
    var funcs = container_1.container.getAll(constants_1.Types.FUNC);
    funcs.forEach(function (func) {
        func.init(exp);
    });
    return exp;
};
//# sourceMappingURL=jsonata.js.map