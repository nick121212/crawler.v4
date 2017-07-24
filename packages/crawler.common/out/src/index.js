"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var seneca_1 = require("./libs/seneca");
exports.Seneca = seneca_1.Seneca;
var plugin_1 = require("./libs/decorator/plugin");
exports.Plugin = plugin_1.Plugin;
var add_1 = require("./libs/decorator/add");
exports.Add = add_1.Add;
exports.Wrap = add_1.Wrap;
var init_1 = require("./libs/decorator/init");
exports.Init = init_1.Init;
var config_1 = require("./libs/contansts/config");
exports.Types = config_1.Types;
exports.SenecaConfig = config_1.SenecaConfig;
//# sourceMappingURL=index.js.map