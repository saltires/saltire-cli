"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fast_glob_1 = __importDefault(require("fast-glob"));
const core_1 = require("../core");
/**
 * @description 读取文件并根据模板中的配置进行过滤
 * @note 模板文件默认存放在模板项目中的template文件夹下，也可以通过source属性配置
 * @note 所有经过过滤后的文件都存储在上下文对象的files数组下
 * @return { null }
 */
exports.default = async (ctx) => {
    var _a;
    const cwd = path_1.default.join(ctx.src, (_a = ctx.config.source) !== null && _a !== void 0 ? _a : 'template');
    const filters = ctx.config.filters;
    const ignore = filters != null ? Object.keys(filters).filter(i => !filters[i](ctx.answers)) : undefined;
    const entries = await fast_glob_1.default('**', { cwd, ignore, dot: true });
    await Promise.all(entries.map(async (entry) => {
        const contents = await core_1.file.read(path_1.default.join(cwd, entry));
        ctx.files.push({ path: entry, contents });
    }));
    if (ctx.config.prepare == null)
        return;
    await ctx.config.prepare(ctx);
};
