/**
 * 单个插件的模型
 */
export interface BasePluginModel {
    key: string;
    partten: string;
    title: string;
    jsonata: string[];
    data: any;
    result?: string;
    retry: number;
    timeout: number;
    condition?: string;
    force?: boolean;
}
/**
 * 单个插件的模型
 */
export interface SchedulePluginModel extends BasePluginModel {
    errFlow?: BasePluginModel[];
    successFlow?: BasePluginModel[];
}
