export interface IPlugin {
    pre: {
        [key: string]: any;
    };
    after: {
        [key: string]: any;
    };
}
export interface IConfig {
    plugins: IPlugin;
}
