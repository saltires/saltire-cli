"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extract = exports.untildify = exports.isBinary = exports.tildify = exports.write = exports.read = exports.remove = exports.mkdir = exports.isEmpty = exports.isDirectory = exports.isFile = exports.exists = void 0;
const os_1 = __importDefault(require("os"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// 此模块用于解压缩从 git 仓库下载的 zip 文件
const extract_zip_1 = __importDefault(require("extract-zip"));
/**
 * @date 2020-12-02
 * @param { string } 指定的地址
 * @author saltire
 * @description 判断指定的地址的文件类型
 * @return { Boolean }
 */
const exists = async (input) => {
    try {
        const stat = await fs_1.default.promises.stat(input);
        // 判断指定的文件地址的类型
        if (stat.isDirectory()) {
            return 'dir';
        }
        else if (stat.isFile()) {
            return 'file';
        }
        else {
            return 'other';
        }
    }
    catch (err) {
        if (err.code !== 'ENOENT') {
            throw err;
        }
        return false;
    }
};
exports.exists = exists;
/**
 * @description 判断指定的路径地址是否是文件
 * @return { Boolean }
 */
const isFile = async (input) => {
    const result = await exports.exists(input);
    return result === 'file';
};
exports.isFile = isFile;
/**
 * @description 判断指定的路径地址是否是文件夹
 * @return { Boolean }
 */
const isDirectory = async (input) => {
    const result = await exports.exists(input);
    return result === 'dir';
};
exports.isDirectory = isDirectory;
/**
 * @description 判断指定的文件夹里面是否为空
 * @return { Boolean }
 */
const isEmpty = async (input) => {
    const files = await fs_1.default.promises.readdir(input);
    return files.length === 0;
};
exports.isEmpty = isEmpty;
/**
 * @description 创建文件夹，递归选项默认为 true，可选择覆盖
 * @return { Boolean }
 */
const mkdir = async (input, options) => {
    // node >= 10.12
    await fs_1.default.promises.mkdir(input, { recursive: true, ...options });
};
exports.mkdir = mkdir;
/**
 * @description 删除指定的文件系统地址（如果是目录，递归删除该目录下所有内容）
 * @return { Promise<void> }
 */
const remove = async (input, options) => {
    const result = await exports.exists(input);
    // 当指定地址不存在时
    if (result === false)
        return;
    // 如果是： file | other
    if (result !== 'dir') {
        return await fs_1.default.promises.unlink(input);
    }
    // 最后对目录做处理
    const entries = await fs_1.default.promises.readdir(input);
    // 递归删除目录中所有内容
    await Promise.all(entries.map(async (item) => {
        await exports.remove(path_1.default.join(input, item), options);
    }));
    await fs_1.default.promises.rmdir(input, options);
};
exports.remove = remove;
/**
 * @description 读取一个文件，并以 buufer 的形式返回s
 * @return { Promise<Buffer> }
 */
const read = async (input) => {
    return await fs_1.default.promises.readFile(input);
};
exports.read = read;
/**
 * @description 创建一个文件，如果其目录不存在，递归创建目录，最后创建文件
 * @return { Promise<void> }
 */
const write = async (input, contents) => {
    await exports.mkdir(path_1.default.dirname(input));
    return await fs_1.default.promises.writeFile(input, contents);
};
exports.write = write;
/**
 * @description 转换绝对路径为一种以~开头的相对地址（tilde path），如: /Users/sindresorhus/dev → ~/dev
 * @doc https://www.npmjs.com/package/tildify
 * @return { String }
 */
const tildify = (input) => {
    const home = os_1.default.homedir();
    // https://github.com/sindresorhus/tildify/issues/3
    input = path_1.default.normalize(input) + path_1.default.sep;
    if (input.indexOf(home) === 0) {
        input = input.replace(home + path_1.default.sep, `~${path_1.default.sep}`);
    }
    return input.slice(0, -1);
};
exports.tildify = tildify;
/**
 * @description 判断是否是二进制文件
 * @return { boolean }
 */
const isBinary = (input) => {
    // Detect encoding
    // 65533 is the unknown char
    // 8 and below are control chars (e.g. backspace, null, eof, etc)
    return input.some(item => item === 65533 || item <= 8);
};
exports.isBinary = isBinary;
/**
 * @description 将 tilde path 转换为绝对路径，其实就是将 ~ 替换为 os.homedir()
 * @return { String }
 */
const untildify = (input) => {
    const home = os_1.default.homedir();
    input = input.replace(/^~(?=$|\/|\\)/, home);
    return path_1.default.normalize(input);
};
exports.untildify = untildify;
/**
 * @description 解压缩 zip
 * @return { Promise<void> }
 * @doc https://github.com/shinnn/node-strip-dirs
 */
const extract = async (input, output, strip = 0) => {
    await extract_zip_1.default(input, {
        dir: output,
        onEntry: entry => {
            if (strip === 0)
                return;
            const items = entry.fileName.split(/\/|\\/);
            const start = Math.min(strip, items.length - 1);
            entry.fileName = items.slice(start).join('/');
        }
    });
};
exports.extract = extract;
