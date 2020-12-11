"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ware = void 0;
/**
 * @description 自定义中间件的类
 */
class Ware {
    constructor() {
        this.middlewares = [];
    }
    /**
     * @description 使用中间件，参数为中间件的名称
     * @return { Ware }
     */
    use(middleware) {
        this.middlewares.push(middleware);
        return this;
    }
    /**
     * @description 依次运行所有的中间件，并返回最终处理结果
     * @return { result }
     */
    run(state) {
        return this.middlewares.reduce((prev, current) => prev.then(() => current(state)), Promise.resolve());
    }
}
exports.Ware = Ware;
