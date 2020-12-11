"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description 重命名文件
 * @return { NUll }
 */
exports.default = async (ctx) => {
    const regexp = /{(.*?)}/g;
    ctx.files.forEach(item => {
        if (!regexp.test(item.path))
            return;
        item.path = item.path.replace(regexp, (_, key) => ctx.answers[key]);
    });
};
