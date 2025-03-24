import { MediaQuery } from 'svelte/reactivity';

const BREAKPOINTS = {
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280
} as const;

export class IsMobile extends MediaQuery {
	constructor() {
		super(`max-width: ${BREAKPOINTS.md - 1}px`);
	}
}
