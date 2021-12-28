"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = __importDefault(require("os"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ini_1 = __importDefault(require("ini"));
const env_paths_1 = __importDefault(require("env-paths"));
const package_json_1 = require("../../package.json");
// console.log('name', name)
// >> name saltire-cli
// console.log('os.homedir()', os.homedir())
// >> /Users/edz
// console.log('envPaths', envPaths(name, { suffix: undefined }))
/** >>
{
    data: '/Users/edz/Library/Application Support/saltire-cli',
    config: '/Users/edz/Library/Preferences/saltire-cli',
    cache: '/Users/edz/Library/Caches/saltire-cli',
    log: '/Users/edz/Library/Logs/saltire-cli',
    temp: '/var/folders/bm/j9px97_d0417mjfm5jk43m100000gn/T/saltire-cli'
}
*/
/**
 * @date 2020-12-01
 * @param { filename }
 * @author saltire
 * @description 使用 ini 模块解析配置文件
 * @return { Object }
 */
const parseIni = (filename) => {
    try {
        return ini_1.default.parse(fs_1.default.readFileSync(filename, 'utf8'));
    }
    catch (_a) { }
};
const defaults = {
    registry: 'https://github.com/{owner}/{name}/archive/refs/heads/{branch}.zip',
    official: 'niocn-copier',
    branch: 'master',
    commitMessage: 'feat: initial commit'
};
// 用户主目录 /Users/edz
const homedir = os_1.default.homedir();
// 如果用户主目录有 .copierrc配置文件 进行解析 并覆盖默认配置
const config = parseIni(path_1.default.join(homedir, `.copierrc`));
exports.default = {
    ...defaults,
    ...config,
    // 读取并返回用户主目录下的 npm 配置文件
    get npm() {
        return parseIni(path_1.default.join(homedir, '.npmrc'));
    },
    // 读取并返回用户主目录下的 git 配置文件
    get git() {
        return parseIni(path_1.default.join(homedir, '.gitconfig'));
    },
    // 获取当前系统下存储数据、配置、缓存等的路径
    get paths() {
        return env_paths_1.default(package_json_1.name, { suffix: undefined });
    },
    ini: parseIni
};
