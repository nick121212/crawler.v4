export default {
    "$async": true,
    "type": "object",
    "description": "配置文件的字段规则",
    "required": ["buildName", "buildId"],
    "properties": {
        "buildId": {
            "type": "number",
            "title": "BuildingId"
        },
        "buildName": {
            "type": "string",
            "title": "BuindingName",
            "minLength": 1,
            "maxLength": 10
        }
    }
};
