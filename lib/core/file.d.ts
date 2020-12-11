/// <reference types="node" />
import fs from 'fs';
/**
 * @date 2020-12-02
 * @param { string } 指定的地址
 * @author saltire
 * @description 判断指定的地址的文件类型
 * @return { Boolean }
 */
export declare const exists: (input: string) => Promise<false | 'file' | 'dir' | 'other'>;
/**
 * @description 判断指定的路径地址是否是文件
 * @return { Boolean }
 */
export declare const isFile: (input: string) => Promise<boolean>;
/**
 * @description 判断指定的路径地址是否是文件夹
 * @return { Boolean }
 */
export declare const isDirectory: (input: string) => Promise<boolean>;
/**
 * @description 判断指定的文件夹里面是否为空
 * @return { Boolean }
 */
export declare const isEmpty: (input: string) => Promise<boolean>;
/**
 * @description 创建文件夹，递归选项默认为 true，可选择覆盖
 * @return { Boolean }
 */
export declare const mkdir: (input: string, options?: fs.MakeDirectoryOptions | undefined) => Promise<void>;
/**
 * @description 删除指定的文件系统地址（如果是目录，递归删除该目录下所有内容）
 * @return { Promise<void> }
 */
export declare const remove: (input: string, options?: fs.RmDirOptions | undefined) => Promise<void>;
/**
 * @description 读取一个文件，并以 buufer 的形式返回s
 * @return { Promise<Buffer> }
 */
export declare const read: (input: string) => Promise<Buffer>;
/**
 * @description 创建一个文件，如果其目录不存在，递归创建目录，最后创建文件
 * @return { Promise<void> }
 */
export declare const write: (input: string, contents: string | Uint8Array) => Promise<void>;
/**
 * @description 转换绝对路径为一种以~开头的相对地址（tilde path），如: /Users/sindresorhus/dev → ~/dev
 * @doc https://www.npmjs.com/package/tildify
 * @return { String }
 */
export declare const tildify: (input: string) => string;
/**
 * @description 判断是否是二进制文件
 * @return { boolean }
 */
export declare const isBinary: (input: Uint8Array) => boolean;
/**
 * @description 将 tilde path 转换为绝对路径，其实就是将 ~ 替换为 os.homedir()
 * @return { String }
 */
export declare const untildify: (input: string) => string;
/**
 * @description 解压缩 zip
 * @return { Promise<void> }
 * @doc https://github.com/shinnn/node-strip-dirs
 */
export declare const extract: (input: string, output: string, strip?: number) => Promise<void>;
