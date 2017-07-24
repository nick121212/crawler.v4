import inversify, { injectable } from 'inversify';
import { modelProxy, IProxyCtx, IInterfaceModel, IExecute } from 'modelproxy';
import { Init } from 'crawler.common';

import { Types } from "./constants";
import { container } from './container';

@injectable()
export class Proxy {
    private _proxy: any;

    constructor() {
        this.init();
    }

    public get proxy(): any {
        return this._proxy;
    }

    private init() {
        let engines = container.getAll(Types.engine);

        console.log("init engine");
        this._proxy = new modelProxy.Proxy();
        
        engines.forEach((engine: any) => {
            this._proxy.addEngines({
                [engine.engineName]: engine
            });
        });
    }
}