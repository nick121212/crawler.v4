export default {
    "$async": true,
    "type": "object",
    "description": "配置文件的字段规则",
    "properties": {
        "key": {
            "type": "string",
            "title": "配置文件标志",
            "minLength": 1,
            "maxLength": 10
        }
    }
};
