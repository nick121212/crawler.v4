"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const crawler_plugins_common_1 = require("crawler.plugins.common");
const settings_1 = require("./plugins/settings");
exports.container = new inversify_1.Container();
exports.container.bind(crawler_plugins_common_1.Types._plugin).to(settings_1.SettingsPlugin).inSingletonScope().whenAnyAncestorNamed("SettingsPlugin");
//# sourceMappingURL=container.js.map