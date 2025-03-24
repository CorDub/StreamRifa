import { writable } from 'svelte/store';

export let finalists = $state(['', '', '', '', '', '', '', '']);

export const eventBus = writable({});
