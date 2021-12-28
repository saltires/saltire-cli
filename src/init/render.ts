import _ from 'lodash'
import { file } from '../core'
import { Context } from './types'

/**
 * @description 渲染模板文件
 * @return { NUll }
 */
export default async (ctx: Context): Promise<void> => {
    const regexp = /<%([\s\S]+?)%>/

    const imports = {
        ...ctx.config.metadata,
        ...ctx.config.helpers
    }

    ctx.files.forEach(item => {
        // 忽略二进制文件
        if (file.isBinary(item.contents)) return

        const text = item.contents.toString()

        // 如果文件中没有模板语法，就无需调用渲染函数
        if (!regexp.test(text) || ctx.config?.ignoreRender?.includes(item.path)) return

        const compiled = _.template(text, { imports })
        const newContents = compiled(ctx.answers)
        // 对于最终的渲染结果，将其转为buffer
        item.contents = Buffer.from(newContents)
    })
}