import {
	defineStore,
} from 'pinia';
import restiful from 'restiful';

export const useMannaStore = defineStore({
	id: 'manna',
	state: () => ({
		Respository: 'default',
		Respositories: new Map(),
	}),
	actions: {
		fetchRepository() {
			var {location} = window;
			var {hostname} = location;
			restiful(`//${hostname}:4815/${this.Respository}/`).get().then((rsp) => {
				this.Respositories.set(this.Respository, rsp);
			});
		},
	},
	getters: {
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
