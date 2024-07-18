// NOTE: Logger:
export class Logger {
	protected prefix: string;
	protected prefix_color: (string: string) => string = prefix => prefix.white;

	private static readonly LEVELS = {
		info: "INFO",
		error: "ERROR",
		success: "SUCCESS",
		warn: "WARNING",
		debug: "DEBUG",
	}

	constructor(prefix: string = "", prefix_color: (string: string) => string = prefix => prefix.white) {
		this.prefix = prefix;
		this.prefix_color = prefix_color;
	}

	protected log(message: string, level: string = "NULL", color: (s:string) => string = s => s.white): void{
		const now = new Date();

		const longest = Object.values(Logger.LEVELS).sort((a, b) => b.length - a.length)[0];
		const spaces = " ".repeat(Math.max(0, longest.length -level.length));
		const timestamp = String(now.getHours()).padStart(2, '0') + ":" + String(now.getMinutes()).padStart(2, '0') + ":" + String(now.getSeconds()).padStart(2, '0');
		console.log(`${"[".gray}${timestamp} | ${this.prefix_color(this.getPrefix())} | ${spaces}${color(color(level))}${"]".gray}: ${(color(message))}`);
	}
	public getPrefix(): string{return this.prefix;}

	public info(message: string) {
		this.log(message, Logger.LEVELS.info);
	}
	public error(message: string|Error, err: null|Error = null) {
		if (message instanceof Error) this.log((message instanceof Error ? message.stack || message.message : message), Logger.LEVELS.error,s=>s.red);
		else {
			this.log(message, Logger.LEVELS.error,s=>s.red);
			if (err) this.log(err.stack || err.message, Logger.LEVELS.error,s=>s.red);
		}
	}
	public success(message: string) {
		this.log(message, Logger.LEVELS.success,s=>s.green);
	}
	public warn(message: string) {
		this.log(message, Logger.LEVELS.warn,s=>s.yellow);
	}
	public debug(message: string) {
		this.log(message, Logger.LEVELS.debug, s=>s.magenta);
	}
}
export class PrefixedLogger extends Logger{
	protected prefixed_prefix_color: (s: string) => string;
	protected parent: Logger|PrefixedLogger;

	constructor(parent: Logger|PrefixedLogger, prefix: string, prefix_color: (s: string) => string = s => s.white, clams: boolean = true) {
		super((clams ? "[".gray : "") + prefix + (clams ? "]".gray : ""));
		this.prefixed_prefix_color = prefix_color;
		this.parent = parent;
	}
	public getPrefix(): string{
		return `${this.parent instanceof PrefixedLogger ? this.parent.getPrefix() : ""}${this.prefixed_prefix_color(this.prefix)}`;
	}
	public setPrefix(prefix: string){
		this.prefix = prefix;
	}
}
