import { Context } from "@deepseek-ai/cordis";
declare const name = "dsh-agy-link";
declare const inject: string[];
declare function apply(ctx: Context, entryConfig?: Record<string, unknown>): void;
export { apply, inject, name };