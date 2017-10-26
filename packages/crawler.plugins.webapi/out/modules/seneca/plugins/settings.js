"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const crawler_plugins_common_1 = require("crawler.plugins.common");
const constants_1 = require("../constants");
let SettingsPlugin = class SettingsPlugin {
    /**
     * 启动一个任务
     * @param param0
     * @param options
     * @param globalOptions
     */
    addToTask(config, options, globalOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            let task = options.seneca.make$("settings", Object.assign({ id: config.key }, config));
            let instance = yield task.saveAsync();
            return instance;
        });
    }
    /**
     * 删除一个任务
     * @param param0
     * @param options
     * @param globalOptions
     */
    removeFromTask({ key, purge }, options, globalOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            let entity = options.seneca.make$("settings");
            yield entity.removeAsync({ id: key });
        });
    }
    /**
     * 列出所有
     * @param param0
     * @param options
     * @param globalOptions
     */
    listTask({ config = {} }, options, globalOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            let entity = options.seneca.make$("settings");
            return yield entity.listAsync(config);
        });
    }
};
__decorate([
    crawler_plugins_common_1.Add(`role:${constants_1.pluginName},cmd:add`),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], SettingsPlugin.prototype, "addToTask", null);
__decorate([
    crawler_plugins_common_1.Add(`role:${constants_1.pluginName},cmd:remove`),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], SettingsPlugin.prototype, "removeFromTask", null);
__decorate([
    crawler_plugins_common_1.Add(`role:${constants_1.pluginName},cmd:list`),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], SettingsPlugin.prototype, "listTask", null);
SettingsPlugin = __decorate([
    crawler_plugins_common_1.Plugin(constants_1.pluginName),
    inversify_1.injectable()
], SettingsPlugin);
exports.SettingsPlugin = SettingsPlugin;
//# sourceMappingURL=settings.js.map