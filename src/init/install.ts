import { exec } from '../core'
import { Context } from './types'

/**
 * @description 执行 npm 或者 yarn 命令安装待生成的项目的依赖
 * @return { NUll }
 */
export default async (ctx: Context): Promise<void> => {
    // 不安装就直接退出即可
    if (ctx.config.install === false) return

    if (ctx.config.install == null) {
        // 如果不存在package.json
        if (ctx.files.find(i => i.path === 'package.json') == null) return
        // 如果模板项目中存在package.json 默认的安装工具为npm
        ctx.config.install = 'npm'
    }

    // 安装依赖...

    try {
        const client = ctx.config.install
        const cmd = process.platform === 'win32' ? client + '.cmd' : client
        await exec(cmd, ['install'], { cwd: ctx.dest, stdio: 'inherit' })
    } catch (e) {
        throw new Error('Install dependencies failed.')
    }

}
