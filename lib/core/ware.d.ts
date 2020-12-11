export declare type Middleware<S> = (state: S) => Promise<void> | void;
/**
 * @description 自定义中间件的类
 */
export declare class Ware<S> {
    private readonly middlewares;
    /**
     * @description 使用中间件，参数为中间件的名称
     * @return { Ware }
     */
    use(middleware: Middleware<S>): Ware<S>;
    /**
     * @description 依次运行所有的中间件，并返回最终处理结果
     * @return { result }
     */
    run(state: S): Promise<void>;
}
