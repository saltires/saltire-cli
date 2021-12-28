import os from 'os'
import fs from 'fs'
import path from 'path'
import ini from 'ini'
import envPaths from 'env-paths'
import { name } from '../../package.json'

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
const parseIni = (filename: string): AnyObject | undefined => {
    try {
        return ini.parse(fs.readFileSync(filename, 'utf8'))
    } catch { }
}

const defaults = {
    registry: 'https://github.com/{owner}/{name}/archive/refs/heads/{branch}.zip',
    official: 'niocn-copier',
    branch: 'master',
    commitMessage: 'feat: initial commit'
}

// 用户主目录 /Users/edz
const homedir = os.homedir()

// 如果用户主目录有 .copierrc配置文件 进行解析 并覆盖默认配置
const config = parseIni(path.join(homedir, `.copierrc`))

export default {
    ...defaults,
    ...config,
    // 读取并返回用户主目录下的 npm 配置文件
    get npm() { 
        return parseIni(path.join(homedir, '.npmrc'))
    },
    // 读取并返回用户主目录下的 git 配置文件
    get git() { 
        return parseIni(path.join(homedir, '.gitconfig'))
    },
    // 获取当前系统下存储数据、配置、缓存等的路径
    get paths() { 
        return envPaths(name, { suffix: undefined })
    },
    ini: parseIni
}

