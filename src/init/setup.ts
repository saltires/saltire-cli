import { Context } from './types'

/**
 * @description 如果模板中配置了setup函数，执行它
 * @return { undefined }
 */
export default async (ctx: Context): Promise<void> => {
    if (ctx.config.setup == null) return
    await ctx.config.setup(ctx)
}