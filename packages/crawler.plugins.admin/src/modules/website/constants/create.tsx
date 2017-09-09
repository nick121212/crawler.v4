import { History } from "history";

import { CrudFormReducer, ICrudFormState } from "../../../common/reducers/form";
import { IModelProxyState } from "../../../common/reducers/modelproxy";

import * as constant from "./";

export const routerPath = `${constant.routerPath}/create`;

export interface IProps {
    history?: History;

    form: ICrudFormState;
    formData: IModelProxyState<any>;
}

export const initialState: IProps = {
    form: {
        formData: {},
        globalOptions: {
            "formItem": {
                "labelCol": {
                    "sm": { "span": 6 },
                    "xs": { "span": 24 },
                },
                "wrapperCol": {
                    "sm": { "span": 14 },
                    "xs": { "span": 24 },
                }
            },
            "ui:temp": "formitem"
        },
        schema: {
            "type": "object",
            "required": ["name", "rollback_flow", "trigger_time", "trigger_day", "trigger_mode"],
            "properties": {
                "trigger_day": {
                    "title": "触发日期",
                    "type": "number",
                },
                "trigger_time": {
                    "title": "触发时间",
                    "type": "string",
                },
                "name": {
                    "title": "策略名称",
                    "type": "string",
                },
                "trigger_mode": {
                    "enum": [0, 1, 2, 3, 4],
                    "title": "触发模式",
                    "type": "number",
                }
            }
        },
        uiSchema: ["name", {
            "key": "trigger_mode",
            "ui:widget": "radios",
            "titleMap": [
                { label: "立即执行", value: 0 },
                { label: "定时执行", value: 1 },
                { label: "每天执行", value: 2 },
                { label: "每周执行", value: 3 },
                { label: "每月执行", value: 4 }
            ],

        }, {
                "key": "trigger_day",
                "ui:widget": "number",
                "ui:condition": {
                    "key": "/trigger_mode",
                    "opt": "eq",
                    "value": 3
                },
                "ui:options": {
                    "widget": {
                        "inputnumber": {
                            "min": 1,
                            "max": 7
                        }
                    }
                }
            }, {
                "key": "trigger_day",
                "ui:condition": {
                    "key": "/trigger_mode",
                    "opt": "eq",
                    "value": 4
                },
                "ui:options": {
                    "widget": {
                        "inputnumber": {
                            "min": 1,
                            "max": 28
                        }
                    }
                }
            }, {
                "key": "trigger_time",
                "ui:widget": "datepicker",
                "ui:condition": {
                    "key": "/trigger_mode",
                    "opt": "gt",
                    "value": 0
                },
                "ui:options": {
                    "widget": {
                        "datepicker": {
                            "format": "HH:mm:ss"
                        }
                    }
                }
            }],
    },
    formData: {
        data: {},
        error: null,
        loaded: false,
        loading: false,
    }
};
