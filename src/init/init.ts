import { exec, config } from '../core'
import { Context } from './types'

/**
 * @description 执行 `git init && git add && git commit`.
 * @return { NUll }
 */
export default async (ctx: Context): Promise<void> => {
  // 如果模板文件中的init选项没有配置或者模板项目中不存在.gitignore文件，不执行初始化仓库的命令
  if (!(ctx.config.init ?? ctx.files.find(i => i.path === '.gitignore') != null)) return

  // 初始化仓库
  try {
    const options = { cwd: ctx.dest, stdio: 'inherit' as 'inherit' }
    await exec('git', ['init'], options)
    await exec('git', ['add', '--all'], options)
    await exec('git', ['commit', '-m', config.commitMessage], options)
  } catch (e) {
    throw new Error('Initial repository failed.')
  }
}
