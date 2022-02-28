import path from 'path'
import crypto from 'crypto'
import ora from 'ora'
import chalk from 'chalk'
import prompts from 'prompts'
import { file, http, config } from '../core'
import { Context } from './types'

/**
 * @description 获取模板的 url 地址
 * @return { string }
 * @example 
 * 1. 简称, 如. 'ex'
 * 2. 模板的全称，如. 'niocn-copier/ex'
 * 3. 模板的全称并表明分支, 如. 'niocn-copier/ex#develop'
 * 4. 完整的 url, 如. 'https://github.com/niocn-copier/ex/archive/master.zip'
 */
export const getTemplateUrl = async (input: string): Promise<string> => {
    // 如果是 4、完整的url，直接返回即可
    if (/^https?:/.test(input)) return input

    // 处理 2
    input = input.includes('/') ? input : `${config.official}/${input}`
    // 处理 3
    input = input.includes('#') ? input : `${input}#${config.branch}`

    const [owner, name, branch] = input.split(/\/|#/)
    const data: Record<string, string> = { owner, name, branch }

    // 最终返回的格式为 4
    return config.registry.replace(/{(.*?)}/g, (_, key) => data[key])
}

export default async (ctx: Context): Promise<void> => {
    // 解析’~/foo/bar‘这种格式
    if (ctx.template.startsWith('~')) {
        ctx.src = file.untildify(ctx.template)
        return
    }

    // 解析本地的模板文件
    if (/^[./]|^[a-zA-Z]:/.test(ctx.template)) {
        ctx.src = path.resolve(ctx.template)
        return
    }

    // 询问用户是否启用 GitHub 镜像加速
    const { value } = await prompts([
        {
            type: 'confirm',
            name: 'value',
            message: '是否启用 GitHub 镜像加速'
        }
    ])

    if (value) {
        config.registry = 'https://github.91chi.fun/https://github.com/{owner}/{name}/archive/refs/heads/{branch}.zip'
    }

    // 将用户针对模板的输入格式化为完整的url地址
    const url = await getTemplateUrl(ctx.template)

    // 为 url 生成唯一的 16位 hash
    const hash = crypto.createHash('md5').update(url).digest('hex').substr(8, 16)

    // 在系统缓存中生成该以该 hash 命名的文件夹(这里未实际创建，只是拼接处地址)
    ctx.src = path.join(config.paths.cache, hash)

    // 判断系统缓存文件中是否存在这样的文件夹
    const exists = await file.isDirectory(ctx.src)

    // 当用户选择使用缓存中的模板时
    if (ctx.options.offline != null && ctx.options.offline) {
        if (exists) {
            return console.log(`将使用缓存中的模板：${file.tildify(ctx.src)}`)
        }
        console.log(`未发现缓存模板：${file.tildify(ctx.src)}`)
    }

    // 当缓存存在时，清除缓存
    exists && await file.remove(ctx.src)

    // 下载模板通常需要几分钟，这里给出提示
    // console.log(chalk.blue(`\n ## 开始为您下载项目模板[${ctx.template}]，这通常需要几分钟的时间!\n`))

    // 开始转圈...
    const spinner = ora('下载模板中...').start()

    try {
        // 使用http模板下载zip文件，temp是一个zip文件的绝对路径
        const temp = await http.downolad(url)

        spinner.text = '开始解压...'

        // 解压zip文件到目标项目中
        await file.extract(temp, ctx.src, 1)

        // 解压完成后，清除temp
        await file.remove(temp)

        spinner.succeed('模板下载并解压成功~~\n')
    } catch (e) {
        spinner.stop()
        throw new Error(`下载模板文件${ctx.template}失败，原因是：${e.message as string}.`)
    }

}