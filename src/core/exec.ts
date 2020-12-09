import { spawn, SpawnOptions } from 'child_process'

/**
 * 利用 Nodejs 子进程执行指定的命令
 * @param 命令的名称
 * @param 参数列表
 * @param 使用 spawn 时传递的选项对象
 */
export default (command: string, args: string[], options: SpawnOptions): Promise<void> => new Promise((resolve, reject) => {
  spawn(command, args, options)
    .on('error', reject)
    .on('exit', code => {
      if (code === 0) return resolve()
      reject(new Error(`Failed to execute ${command} command.`))
    })
})
