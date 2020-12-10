import path from 'path'
import glob from 'fast-glob'
import { file } from '../core'
import { Context } from './types'

/**
 * @description 读取文件并根据模板中的配置进行过滤
 * @note 模板文件默认存放在模板项目中的template文件夹下，也可以通过source属性配置
 * @note 所有经过过滤后的文件都存储在上下文对象的files数组下
 * @return { null }
 */
export default async (ctx: Context): Promise<void> => {
    const cwd = path.join(ctx.src, ctx.config.source ?? 'template')

    const filters = ctx.config.filters
    const ignore = filters != null ?  Object.keys(filters).filter(i => !filters[i](ctx.answers)) : undefined

    const entries = await glob('**', { cwd, ignore, dot: true })

    await Promise.all(entries.map(async entry => {
        const contents = await file.read(path.join(cwd, entry))
        ctx.files.push({ path: entry, contents })
    }))

    if (ctx.config.prepare == null) return
    await ctx.config.prepare(ctx)
}

