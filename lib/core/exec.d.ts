import { SpawnOptions } from 'child_process';
declare const _default: (command: string, args: string[], options: SpawnOptions) => Promise<void>;
/**
 * 利用 Nodejs 子进程执行指定的命令
 * @param 命令的名称
 * @param 参数列表
 * @param 使用 spawn 时传递的选项对象
 */
export default _default;
