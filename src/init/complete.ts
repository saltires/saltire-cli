import { Context } from './types'

/**
 * 任务创建完成后的提醒
 */
export const fallback = async (ctx: Context): Promise<void> => {
  console.log(`使用\`${ctx.template}\`模板成功创建了项目，项目地址： \`${ctx.project}\`.\n`)
  ctx.files.map(i => i.path).sort((a, b) => a > b ? +1 : -1).forEach(i => console.log('- ' + i))
  console.log('\n现在你可以使用它了)')
}

/**
 * 如果模板项目中有提供关于处理完成后的钩子函数，执行它
 */
export default async (ctx: Context): Promise<void> => {
  if (ctx.config.complete == null) {
    return await fallback(ctx)
  }
  if (typeof ctx.config.complete === 'string') {
    return console.log(ctx.config.complete)
  }
  const result = await ctx.config.complete(ctx)
  if (result == null) return
  console.log(result)
}
