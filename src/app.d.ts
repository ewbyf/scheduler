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
	timeRan: number;
}

interface PostProcessor {
	id: number;
	arrivalTime: number;
	completionTime: number;
	tatTime: number;
	waitingTime: number;
}