"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var constants_1 = require("./constants");
var combine_1 = require("./libs/funcs/combine");
var moment_1 = require("./libs/funcs/moment");
exports.container = new inversify_1.Container();
exports.container.bind(constants_1.Types.FUNC).to(combine_1.CombineFunc);
exports.container.bind(constants_1.Types.FUNC).to(moment_1.MomentFunc);
//# sourceMappingURL=container.js.map