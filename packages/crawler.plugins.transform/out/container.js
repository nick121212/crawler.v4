"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var crawler_plugins_common_1 = require("crawler.plugins.common");
var constants_1 = require("./constants");
var combine_1 = require("./libs/funcs/combine");
var moment_1 = require("./libs/funcs/moment");
var jparse_1 = require("./libs/funcs/jparse");
var execute_1 = require("./plugins/execute");
exports.container = new inversify_1.Container();
exports.container.bind(constants_1.Types.FUNC).to(combine_1.CombineFunc);
exports.container.bind(constants_1.Types.FUNC).to(moment_1.MomentFunc);
exports.container.bind(constants_1.Types.FUNC).to(jparse_1.JparseFunc);
exports.container.bind(crawler_plugins_common_1.Types._plugin).to(execute_1.TransformExexutePlugin).inSingletonScope().whenAnyAncestorNamed("TransformExexutePlugin");
//# sourceMappingURL=container.js.map