export default {
    "$async": true,
    "type": "object",
    "description": "配置文件的字段规则",
    "required": ["projectorId", "projectorName", "length", "width"],
    "properties": {
        "projectorId": {
            "type": "number",
            "title": "ProjectorId"
        },
        "projectorName": {
            "type": "string",
            "title": "ProjectorName",
            "minLength": 1,
            "maxLength": 10
        },
        "length": {
            "type": "number",
            "title": "L",
            "description": "Projector的长度"
        },
        "width": {
            "type": "number",
            "title": "W",
            "description": "Projector的宽度"
        },
    }
};
