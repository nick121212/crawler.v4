export declare class WpPlugin {
    private wpApi;
    blog(config: {
        esIndex: string;
        esType: string;
        _id: any;
    }, options: any): Promise<any>;
    html(config: {
        esIndex: string;
        esType: string;
        _id: any;
    }, options: any): Promise<void>;
    init(msg: any, options: any, globalOptions: any): Promise<void>;
}
