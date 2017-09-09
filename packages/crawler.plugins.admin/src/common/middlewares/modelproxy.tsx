import React from "react";
import { Dispatch, Action,  MiddlewareAPI } from "redux";
import {  FluxStandardAction } from "flux-standard-action";
import { ModelProxy } from "modelproxy";

export interface ModelProxyMiddlewareMeta {
    ns: string;
    key: string;
    args?: any[];
    func?: string;
    loaded?: boolean;
    loading?: boolean;
}

export interface ModelProxyAction extends Action, FluxStandardAction<any, ModelProxyMiddlewareMeta> {
    type: string;
}

export default (settings: { proxy: ModelProxy }) => {
    return ({ dispatch }: MiddlewareAPI<any>) => {
        return (next: Dispatch<any>) => {
            return <A extends Action>(action: A & ModelProxyAction) => {
                let { ns, key, func = "", args = [], loading = false, loaded = false } = action.meta || { ns: "", key: "", func: "" };

                if (ns && key && settings.proxy) {
                    let api: any = settings.proxy.getNs(ns).get(key);

                    if (loading) {
                        return next(action);
                    }

                    if (loaded) {
                        return;
                    }

                    action.meta.loading = true;
                    if (api && api[func]) {
                        return dispatch({
                            ...action as Object,
                            payload: new Promise((resolve) => {
                                action.meta.loaded = true;
                                resolve(api[func].apply(api, [...args, action.payload]));
                            })
                        } as any);
                    } else {
                        return dispatch({
                            ...action as Object,
                            payload: settings.proxy.execute(ns, key, action.payload || {}).then((data: any) => {
                                action.meta.loaded = true;
                                return data;
                            }).catch((err: Error) => {
                                action.meta.loaded = true;

                                throw err;
                            })
                        } as any);
                    }
                } else {
                    return next(action);
                }
            };
        };
    };
};
