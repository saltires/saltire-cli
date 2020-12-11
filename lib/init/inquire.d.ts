import { PromptObject } from 'prompts';
import { Context } from './types';
/**
 * @description 验证 Prompt
 * { Record<string, (input: string) => true | string> }
 */
export declare const validater: Record<string, (input: string) => true | string>;
export declare const processor: (ctx: Context) => (item: PromptObject) => void;
declare const _default: (ctx: Context) => Promise<void>;
export default _default;
