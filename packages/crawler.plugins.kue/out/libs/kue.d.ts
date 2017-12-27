/**
 * agenda服务
 */
export declare class KueService {
    queue: any;
    /**
     * 构造函数
     * @param configFactory 配置文件服务类
     */
    constructor(config: any);
    remove(id: any): Promise<any>;
}
