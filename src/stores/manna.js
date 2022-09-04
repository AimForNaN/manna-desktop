import {
	defineStore
} from 'pinia';

export const useMannaStore = defineStore({
	state: () => ({
		Respositories: new Set(),
	}),
	getters: {
		isMannaDesktop() {
			return window.navigator.userAgent.includes('MannaDesktop');
		},
	},
})
