import {
	defineStore,
} from 'pinia';
import restiful from 'restiful';

export const useMannaStore = defineStore({
	id: 'manna',
	state: () => ({
		Install: [],
		Respository: 'manna',
		Respositories: new Map(),
	}),
	actions: {
		fetchInstall() {
			this.api('install').get().then((rsp) => {
				this.Install = rsp;
			});
		},
		fetchRepository() {
			this.api.get().then((rsp) => {
				this.Respositories.set(this.Respository, rsp);
			});
		},
		refreshSource(src) {
			var {Source} = src;
			this.api('install').patch({
				Source,
			}).then(() => {
				this.fetchInstall();
			});
		},
	},
	getters: {
		api(state) {
			var {location} = window;
			var {hostname} = location;
			return restiful(`//${hostname}:4815/${state.Respository}/`);
		},
		isMannaDesktop() {
			return window.navigator.userAgent.includes('MannaDesktop');
		},
		Bibles(state) {
			var {Modules} = this;
			var ret = Modules.filter((mod) => {
				return mod.Type == 'Biblical Texts';
			});
			ret.sort((a,b) => {
				if (a.Module > b.Module) {
					return 1;
				} else if (a.Module < b.Module) {
					return -1;
				}
				return 0;
			});
			return ret;
		},
		GenericBooks(state) {
			var {Modules} = this;
			var ret = Modules.filter((mod) => {
				return mod.Type == 'Generic Books';
			});
			ret.sort((a,b) => {
				if (a.Module > b.Module) {
					return 1;
				} else if (a.Module < b.Module) {
					return -1;
				}
				return 0;
			});
			return ret;
		},
		Modules(state) {
			var repo = state.Respositories.get(state.Respository);
			return repo ? repo.Modules : [];
		},
	},
})
