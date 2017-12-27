export declare class KuePlugin {
    private kue;
    /**
     * 启动一个任务
     * @param param0 数据
     */
    private create(config, options?, globalOptions?);
    /**
    * 启动一个任务
    * @param param0 数据
    */
    private remove(config, options?, globalOptions?);
    /**
     * 启动未正常停止的队列
     * @param msg
     * @param options
     * @param globalOptions
     */
    private init(msg, options, globalOptions);
}
