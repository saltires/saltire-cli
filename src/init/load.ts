import { Context } from './types'

export default async (ctx: Context): Promise<void> => {
    // 初始化项目的名称（如果模板文件里有定义，会覆盖它）
    ctx.config.name = ctx.template

    try {
        const mod = require(ctx.src)

        if (Object.prototype.toString.call(mod) !== '[object Object]') {
            throw new TypeError('！！！模板项目必须以CommonJS方式导出一个对象')
        }

        // 将模板文件里导出的配置合并到上下文对象中
        Object.assign(ctx.config, mod)
    } catch (e) {
        if (e.code === 'MODULE_NOT_FOUND') return
        e.message = `无效的模板: ${e.message as string}`
        throw e
    }
}