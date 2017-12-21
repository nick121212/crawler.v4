export default {
    "engine": "fetch",
    "interfaces": [{
        "key": "act",
        "method": "post",
        "path": "/act",
        "title": "调用scehma的插件"
    }],
    "key": "webapi",
    "mockDir": "./mocks/",
    "state": "dev",
    "states": {
        "dev": "http://47.92.126.120:3001",
        "prod": "http://localhost:3001"
    },
    "title": "webapi接口数据"
};
