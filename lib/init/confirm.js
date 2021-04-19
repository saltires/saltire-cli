"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const prompts_1 = __importDefault(require("prompts"));
const crypto_1 = __importDefault(require("crypto"));
const core_1 = require("../core");
exports.default = async (ctx) => {
    // 密码验证 qishi666
    const { value } = await prompts_1.default([
        {
            type: 'password',
            name: 'value',
            message: '使用模板之前，请先输入密码进行验证：'
        }
    ]);
    if (crypto_1.default.createHash("md5").update(value).digest('hex') !== 'd021eea5e6f61ddd8b879ed33499b4de')
        throw new Error('密码错误，已取消任务');
    // 为目标项目生成绝对路径
    ctx.dest = path_1.default.resolve(ctx.project);
    // 判断项目是否已经存在
    const exists = await core_1.file.exists(ctx.dest);
    // 当项目不存在
    if (exists === false)
        return;
    // 当运行 cli 时使用了 --force 选项，删除目标项目及其内部所有文件
    if (ctx.options.force != null && ctx.options.force) {
        return await core_1.file.remove(ctx.dest);
    }
    // 当项目不是一个文件夹时，抛出错误
    if (exists !== 'dir')
        throw new Error(`Cannot create ${ctx.project}: File exists.`);
    // 当目标项目是空的文件夹时,不用做处理
    if (await core_1.file.isEmpty(ctx.dest))
        return;
    // 判断目标项目是否是 cli 执行的目录
    const isCurrent = ctx.dest === process.cwd();
    // 如果用户没有使用 --force 选项，并且创建项目时发现项目(且是文件夹)已经存在。将是否覆盖的选择交给用户
    const { choose } = await prompts_1.default([
        {
            name: 'sure',
            type: 'confirm',
            message: isCurrent ? '是否在当前文件夹创建项目？' : '项目已经存在，是否继续？'
        },
        {
            name: 'choose',
            type: (prev, boolean) => prev ? 'select' : null,
            message: `${isCurrent ? '当前' : '目标'} 文件夹不为空，是否继续？`,
            hint: '',
            choices: [
                { title: '合并', value: 'merge' },
                { title: '覆盖', value: 'overwrite' },
                { title: '取消', value: 'cancel' },
            ]
        }
    ]);
    // 当用户选择取消
    if (choose == null || choose === 'cancel')
        throw new Error('已取消任务');
    // 当用户选择覆盖，直接删除目标项目及其文件夹下的所有文件 == --force
    if (choose === 'overwrite')
        await core_1.file.remove(ctx.dest);
};
