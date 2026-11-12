// Minimal ambient types for the jsdom test environment.
//
// jsdom ships no type declarations and @types/jsdom is not a dependency of this
// package, so the two tests that need a real DOM describe exactly the slice of
// the API they touch. Keeping it local avoids pulling a types package in just
// for `new JSDOM(...)`.
declare module 'jsdom' {
	export interface JSDOMOptions {
		pretendToBeVisual?: boolean;
		url?: string;
	}

	export class JSDOM {
		constructor(html?: string, options?: JSDOMOptions);
		readonly window: Window & typeof globalThis;
	}
}
