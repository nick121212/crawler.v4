import { IQueueItem } from './queueitem';
export declare class Queue {
    private ignoreWWWDomain;
    private scanSubdomains;
    private stripWWWDomain;
    private host;
    private initialProtocol;
    private initialPort;
    private domainWhiteList;
    private _fetchConditions;
    private filterByDomain;
    private stripQuerystring;
    private allowQueryParams;
    private urlEncoding;
    /**
     * 构造函数
     * @param settings {object}
     *   ignoreWWWDomain   boolean       是否忽略www域名
     *   scanSubdomains    boolean       是否需要搜索子域名
     *   stripWWWDomain    boolean       是否严格的www域名
     *   host              string        当前的域名
     *   initialProtocol   string        默认协议
     *   initialPort       string        默认端口
     *   stripQuerystring  boolean       过滤掉参数
     *   fetchConditions   array         过滤地址条件数组
     *   domainWhiteList   array<string> 域名白名单
     *   filterByDomain    boolean       是否开启过滤域名白名单
     */
    constructor(settings: any);
    /**
     * 去掉没用的搜索字符(^)
     * @param url
     * @returns {*}
     */
    removeUselessStr(url: string): string;
    /**
     * 去掉queryString
     * @param url {String} 链接
     * @returns {*}
     */
    removeQuerystring(url: string): string;
    /**
     * 处理链接
     * @param URL  {String}
     * @param context {Object|String}
     * @returns {*}
     */
    processURL(URL: string, context: any): IQueueItem | boolean;
    /**
     * 存储链接到queue
     * @param url   {String}
     * @param queueItem  {Object}
     * @returns {*}
     */
    queueURL(url: string | IQueueItem, queueItem: IQueueItem): boolean | IQueueItem;
    /**
     * 判定域名是否合法
     * @param host    {String}
     * @returns {boolean|*}
     */
    domainValid(host: string): boolean;
}
