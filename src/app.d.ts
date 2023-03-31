// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

interface Processor {
    id: number;
    arrivalTime: number;
	serviceTime: number;
	priority: number;
}