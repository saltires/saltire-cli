import path from 'path'
// semver 是一个广泛用于版本比较的库
import semver from 'semver'
import prompts, { PromptObject } from 'prompts'
// 项目的名称必须符合 npm 包名的规则
import validateName from 'validate-npm-package-name'
import { config } from '../core'
import { Context } from './types'

/**
 * @description 验证 Prompt
 * { Record<string, (input: string) => true | string> }
 */
export const validater: Record<string, (input: string) => true | string> = {
    name: input => {
        const result = validateName(input)
        if (result.validForNewPackages) return true
        return result.errors?.join(', ') ?? result.warnings?.join(',') ?? ''
    },
    version: input => {
        const valid = semver.valid(input)
        if (valid != null) return true
        return `版本：${input}不是一个合法的版本号`
    },
    email: input => {
        const valid = /[^\s]+@[^\s]+\.[^\s]+/.test(input)
        return valid || `邮箱：${input}不是一个合法的邮箱地址`
    },
    url: input => {
        const valid = /https?:\/\/[^\s]+/.test(input)
        return valid || `url：${input}不是一个合法的url地址`
    }
}


export const processor = (ctx: Context) => (item: PromptObject) => {
    switch (item.name) {
        case 'name':
            item.validate = item.validate ?? validater.name
            item.initial = item.initial ?? path.basename(ctx.dest)
            break
        case 'version':
            item.validate = item.validate ?? validater.version
            item.initial = item.initial ?? config.npm?.['init-version'] ?? '0.1.0'
            break
        case 'author':
            item.initial = item.initial ?? config.npm?.['init-author-name'] ?? config.git?.user?.name
            break
        case 'email':
            item.validate = item.validate ?? validater.email
            item.initial = item.initial ?? config.npm?.['init-author-email'] ?? config.git?.user?.email
            break
        case 'url':
            item.validate = item.validate ?? validater.url
            item.initial = item.initial ?? config.npm?.['init-author-url'] ?? config.git?.user?.url
            break
    }
}

export default async (ctx: Context): Promise<void> => {
    // console.clear()

    // 当prompts为空时
    if (ctx.config.prompts == null) {
        ctx.config.prompts = { name: 'name', type: 'text', message: 'Project name' }
    }

    // 如果prompts不是数组，将其转为数组
    if (!Array.isArray(ctx.config.prompts)) {
        ctx.config.prompts = [ctx.config.prompts]
    }

    // 遍历prompts配置，并设置验证函数
    ctx.config.prompts.forEach(processor(ctx))

    const onCancel = (): never => {
        throw new Error('成功取消这次任务')
    }

    // 使用prompts模块去处理，并将结果设置到上下文对象中的answers属性下，供下一个中间件处理
    Object.assign(ctx.answers, await prompts(ctx.config.prompts, { onCancel }))
}