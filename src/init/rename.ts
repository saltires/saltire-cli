import { Context } from './types'

/**
 * @description 重命名文件
 * @return { NUll }
 */
export default async (ctx: Context): Promise<void> => {
    const regexp = /{(.*?)}/g

    ctx.files.forEach(item => {
        if (!regexp.test(item.path)) return

        item.path = item.path.replace(regexp, (_, key) => ctx.answers[key])
    })
}