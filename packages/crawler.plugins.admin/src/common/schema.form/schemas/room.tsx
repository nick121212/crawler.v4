export default {
    "$async": true,
    "type": "object",
    "description": "配置文件的字段规则",
    "required": ["roomName", "roomId", "wallIds", "length", "width", "height"],
    "properties": {
        "roomId": {
            "type": "number",
            "title": "RoomId"
        },
        "roomName": {
            "type": "string",
            "title": "Showroom information",
            "minLength": 1,
            "maxLength": 10
        },
        "wallIds": {
            "type": "string",
            "title": "墙面信息",
            "minLength": 1
        },
        "length": {
            "type": "number",
            "title": "L",
            "description": "Room的长度"
        },
        "width": {
            "type": "number",
            "title": "W",
            "description": "Room的宽度"
        },
        "height": {
            "type": "number",
            "title": "H",
            "description": "Room的高度"
        }
    }
};
