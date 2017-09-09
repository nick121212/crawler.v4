export declare class TransformExexutePlugin {
    /**
     * 启动一个任务
     * @param param0
     * @param options
     * @param globalOptions
     */
    single({expression, data}: {
        expression: string;
        data: any;
    }, options?: any, globalOptions?: any): Promise<{
        result: any;
    }>;
    /**
     * 启动一个任务
     * @param param0
     * @param options
     * @param globalOptions
     */
    muti({expressions, data}: {
        expressions: Array<string>;
        data: any;
    }, options?: any, globalOptions?: any): Promise<{
        result: any[];
    }>;
}
