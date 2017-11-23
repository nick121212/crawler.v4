import React from "react";
import { Dispatch, Action, MiddlewareAPI } from "redux";
import { FluxStandardAction } from "flux-standard-action";
import { ModelProxy } from "modelproxy";

export interface MessageMiddlewareMeta {
    message: string;
    duration?: number;
    status?: string;
    type?: string;
    nextClose?: boolean;
}

export interface MessageAction extends Action, FluxStandardAction<any, MessageMiddlewareMeta> {
    type: string;
}

export default (messageModel: any) => {
    return ({ dispatch }: MiddlewareAPI<any>) => {
        return (next: Dispatch<any>) => {
            return async <A extends Action>(action: A & MessageAction) => {
                // let { message = "", duration = 0, status = "info", type = "" } = action.meta || {};

                // if (message) {
                //     messageModel.actions.push({
                //         content: message,
                //         duration,
                //         type,
                //         status: status || "info"
                //     });

                //     action.meta.nextClose = true;
                //     delete action.meta.message;
                // }

                // if (nextClose) {
                //     messageModel.actions.pop();
                // }

                return next(action);
            };
        };
    };
};
