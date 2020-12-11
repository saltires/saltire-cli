"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
/**
 * @description 执行 `git init && git add && git commit`.
 * @return { NUll }
 */
exports.default = async (ctx) => {
    var _a;
    // 如果模板文件中的init选项没有配置或者模板项目中不存在.gitignore文件，不执行初始化仓库的命令
    if (!((_a = ctx.config.init) !== null && _a !== void 0 ? _a : ctx.files.find(i => i.path === '.gitignore') != null))
        return;
    // 初始化仓库
    try {
        const options = { cwd: ctx.dest, stdio: 'inherit' };
        await core_1.exec('git', ['init'], options);
        await core_1.exec('git', ['add', '--all'], options);
        await core_1.exec('git', ['commit', '-m', core_1.config.commitMessage], options);
    }
    catch (e) {
        throw new Error('Initial repository failed.');
    }
};
