export declare class Logger {
    protected prefix: string;
    protected prefix_color: (string: string) => string;
    private static readonly LEVELS;
    constructor(prefix?: string, prefix_color?: (string: string) => string);
    protected log(message: string, level?: string, color?: (s: string) => string): void;
    getPrefix(): string;
    info(message: string): void;
    error(message: string | Error, err?: null | Error): void;
    success(message: string): void;
    warn(message: string): void;
    debug(message: string): void;
}
export declare class PrefixedLogger extends Logger {
    protected prefixed_prefix_color: (s: string) => string;
    protected parent: Logger | PrefixedLogger;
    constructor(parent: Logger | PrefixedLogger, prefix: string, prefix_color?: (s: string) => string, clams?: boolean);
    getPrefix(): string;
    setPrefix(prefix: string): void;
}
