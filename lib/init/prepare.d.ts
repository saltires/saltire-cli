import { Context } from './types';
declare const _default: (ctx: Context) => Promise<void>;
/**
 * @description 读取文件并根据模板中的配置进行过滤
 * @note 模板文件默认存放在模板项目中的template文件夹下，也可以通过source属性配置
 * @note 所有经过过滤后的文件都存储在上下文对象的files数组下
 * @return { null }
 */
export default _default;
