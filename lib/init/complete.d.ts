import { Context } from './types';
/**
 * 任务创建完成后的提醒
 */
export declare const fallback: (ctx: Context) => Promise<void>;
declare const _default: (ctx: Context) => Promise<void>;
/**
 * 如果模板项目中有提供关于处理完成后的钩子函数，执行它
 */
export default _default;
