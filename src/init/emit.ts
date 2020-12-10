import path from 'path'
import { file } from '../core'
import { Context } from './types'

/**
 * @description 生成文件到目标位置
 * @return { NUll }
 */
export default async (ctx: Context): Promise<void> => {
  await Promise.all(ctx.files.map(async item => {
    const target = path.join(ctx.dest, item.path)
    await file.write(target, item.contents)
  }))

  // 如果模板文件中配置了emit函数，运行它
  if (ctx.config.emit == null) return
  await ctx.config.emit(ctx)
}
