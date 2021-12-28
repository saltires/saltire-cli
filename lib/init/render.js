"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const core_1 = require("../core");
/**
 * @description 渲染模板文件
 * @return { NUll }
 */
exports.default = async (ctx) => {
    const regexp = /<%([\s\S]+?)%>/;
    const imports = {
        ...ctx.config.metadata,
        ...ctx.config.helpers
    };
    ctx.files.forEach(item => {
        var _a, _b;
        // 忽略二进制文件
        if (core_1.file.isBinary(item.contents))
            return;
        const text = item.contents.toString();
        // 如果文件中没有模板语法，就无需调用渲染函数
        if (!regexp.test(text) || ((_b = (_a = ctx.config) === null || _a === void 0 ? void 0 : _a.ignoreRender) === null || _b === void 0 ? void 0 : _b.includes(item.path)))
            return;
        const compiled = lodash_1.default.template(text, { imports });
        const newContents = compiled(ctx.answers);
        // 对于最终的渲染结果，将其转为buffer
        item.contents = Buffer.from(newContents);
    });
};
