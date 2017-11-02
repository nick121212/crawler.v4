
export default {
    "$async": true,
    "id": "patten-test",
    "type": "object",
    "description": "用于测试模式",
    "title": "测试模式配置",
    "required": ["partten", "title"],
    "properties": {
        "parttern": {
            "type": "string",
            "title": "需要调用的模式",
            "minLength": 1,
            "maxLength": 30
        },
        "config": {
            "type": "string",
            "title": "需要添加到result的属性"
        }
    }
};
