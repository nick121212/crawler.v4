
let interfaceType = ["build", "room", "projector", "panel"];
let interfaces = [];

interfaceType.forEach((type: string) => {
    interfaces = interfaces.concat([{
        "key": `${type}-add`,
        "method": "post",
        "path": `/api/${type}/add`,
        "title": `${type}模块接口-新建${type}`
    }, {
        "key": `${type}-list`,
        "method": "get",
        "path": `/api/${type}/allLists`,
        "title": `${type}模块接口-查看${type}s`
    }, {
        "key": `${type}-remove`,
        "method": "get",
        "path": `/api/${type}/remove`,
        "title": `${type}模块接口-删除${type}`
    }, {
        "key": `${type}-update`,
        "method": "post",
        "path": `/api/${type}/update`,
        "title": `${type}模块接口-更新${type}`
    }, {
        "key": `${type}-query`,
        "method": "get",
        "path": `/api/${type}/query`,
        "title": `${type}模块接口-查询${type}`
    }]);
});

export default {
    "engine": "fetch",
    "interfaces": interfaces,
    "key": "holoauto",
    "mockDir": "./mocks/",
    "state": "dev",
    "states": {
        "dev": "http://192.168.119.84:8809",
        "prod": "http://192.168.119.84:8809"
    },
    "title": "全息项目后台API接口"
};
