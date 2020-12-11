import envPaths from 'env-paths';
declare const _default: {
    npm: AnyObject | undefined;
    git: AnyObject | undefined;
    paths: envPaths.Paths;
    ini: (filename: string) => AnyObject | undefined;
    registry: string;
    official: string;
    branch: string;
    commitMessage: string;
};
export default _default;
