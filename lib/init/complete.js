"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fallback = void 0;
/**
 * 任务创建完成后的提醒
 */
const fallback = async (ctx) => {
    console.log(`使用\`${ctx.template}\`模板成功创建了项目，项目地址： \`${ctx.project}\`.\n`);
    ctx.files.map(i => i.path).sort((a, b) => a > b ? +1 : -1).forEach(i => console.log('- ' + i));
    console.log('\n现在你可以使用它了)');
};
exports.fallback = fallback;
/**
 * 如果模板项目中有提供关于处理完成后的钩子函数，执行它
 */
exports.default = async (ctx) => {
    if (ctx.config.complete == null) {
        return await exports.fallback(ctx);
    }
    if (typeof ctx.config.complete === 'string') {
        return console.log(ctx.config.complete);
    }
    const result = await ctx.config.complete(ctx);
    if (result == null)
        return;
    console.log(result);
};
