export declare class SettingsPlugin {
    /**
     * 启动一个任务
     * @param param0
     * @param options
     * @param globalOptions
     */
    private addToTask(config, options?, globalOptions?);
    /**
     * 删除一个任务
     * @param param0
     * @param options
     * @param globalOptions
     */
    private removeFromTask({key, purge}, options, globalOptions);
    /**
     * 列出所有
     * @param param0
     * @param options
     * @param globalOptions
     */
    private listTask({config}, options, globalOptions);
}
