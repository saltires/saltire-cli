import fetch from 'node-fetch';
/**
 * @description 使用 node-fetch 发起一个网络请求
 * @return { Promise<fetch.Response> }
 */
export declare const request: (url: fetch.RequestInfo, init?: fetch.RequestInit | undefined) => Promise<fetch.Response>;
/**
 * @description 下载指定互联网地址的文件，并在系统中创建临时文件存放，最后返回该临时文件的地址（以流的形式）
 * @return { string }
 */
export declare const downolad: (url: string) => Promise<string>;
