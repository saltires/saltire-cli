"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description 如果模板中配置了setup函数，执行它
 * @return { undefined }
 */
exports.default = async (ctx) => {
    if (ctx.config.setup == null)
        return;
    await ctx.config.setup(ctx);
};
