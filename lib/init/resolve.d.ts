import { Context } from './types';
/**
 * @description 获取模板的 url 地址
 * @return { string }
 * @example
 * 1. 简称, 如. 'ex'
 * 2. 模板的全称，如. 'niocn-copier/ex'
 * 3. 模板的全称并表明分支, 如. 'niocn-copier/ex#develop'
 * 4. 完整的 url, 如. 'https://github.com/niocn-copier/ex/archive/master.zip'
 */
export declare const getTemplateUrl: (input: string) => Promise<string>;
declare const _default: (ctx: Context) => Promise<void>;
export default _default;
