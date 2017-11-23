import * as Immutable from "immutable";

const top = [{
    "icon": "bars",
    "key": "partten",
    "name": "当前支持的模式"
}, {
    "icon": "appstore",
    "key": "summary",
    "name": "爬虫总览"
}, {
    "icon": "setting",
    "key": "setting",
    "name": "爬虫配置管理"
}];
const bottom = [{
    "icon": "windows",
    "key": "dashboard",
    "name": "dashboard"
}, {
    "icon": "user",
    "key": "user",
    "name": "用户"
}];

const partten = [{
    "icon": "menu-unfold",
    "key": "partten/list",
    "name": "模式列表"
}, {
    "icon": "code",
    "key": "partten/test",
    "name": "测试节点"
}];

export const $$top: Immutable.List<any> = Immutable.fromJS(top);
export const $$bottom: Immutable.List<any> = Immutable.fromJS(bottom);
export const $$partten: Immutable.List<any> = Immutable.fromJS(partten);
