"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downolad = exports.request = void 0;
const path_1 = require("path");
const stream_1 = require("stream");
const util_1 = require("util");
const fs_1 = require("fs");
const node_fetch_1 = __importDefault(require("node-fetch"));
const config_1 = __importDefault(require("./config"));
const pipe = util_1.promisify(stream_1.pipeline);
/**
 * @description 使用 node-fetch 发起一个网络请求
 * @return { Promise<fetch.Response> }
 */
const request = async (url, init) => {
    const response = await node_fetch_1.default(url, init);
    // res.status >= 200 && res.status < 300
    if (response.ok)
        return response;
    throw Error(`Unexpected response: ${response.statusText}`);
};
exports.request = request;
/**
 * @description 下载指定互联网地址的文件，并在系统中创建临时文件存放，最后返回该临时文件的地址（以流的形式）
 * @return { string }
 */
const downolad = async (url) => {
    const response = await exports.request(url);
    // 创建一个临时目录
    await fs_1.promises.mkdir(config_1.default.paths.temp, { recursive: true });
    const filename = path_1.join(config_1.default.paths.temp, Date.now().toString() + '.tmp');
    // 在管道中将 http 请求返回的内容写入到临时文件中
    await pipe(response.body, fs_1.createWriteStream(filename));
    return filename;
};
exports.downolad = downolad;
