import { writable } from 'svelte/store';

export let quarterfinalists = $state(['', '', '', '', '', '', '', '']);

export let semifinalists = $state(['', '', '', '']);

export let availableSemiSpots = $state([0, 1, 2, 3]);

export let finalists = $state(['', '']);

export const eventBus = writable({});
