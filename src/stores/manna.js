import {
	defineStore,
} from 'pinia';
import restiful from 'restiful';

export const useMannaStore = defineStore({
	id: 'manna',
	state: () => ({
		InstallSource: 'CrossWire',
		InstallSources: [],
		Respository: 'manna',
		Respositories: new Map(),
	}),
	actions: {
		fetchInstall() {
			return new Promise((resolve, reject) => {
				this.api('install').get().then((rsp) => {
					this.InstallSources = rsp;
					resolve(rsp);
				}).catch(reject);
			});
		},
		fetchRepository() {
			return new Promise((resolve, reject) => {
				this.api.get().then((rsp) => {
					this.Respositories.set(this.Respository, rsp);
					resolve(rsp);
				}).catch(reject);
			});
		},
		fetchStructure(mod) {
			return this.api(mod)('structure').get();
		},
		fetchText(mod, key) {
			return this.api(mod)('text').get({ key });
		},
		installModule(mod) {
			return this.api('install').post(mod);
		},
		refreshInstallSource(Source) {
			return new Promise((resolve, reject) => {
				this.api('install').patch({
					Source,
				}).then((rsp) => {
					this.fetchInstall();
					resolve(rsp);
				}).catch(reject);
			});
		},
	},
	getters: {
		api(state) {
			var {location} = window;
			var {hostname, protocol} = location;
			return restiful(new URL(`/${state.Respository}/`, `${protocol}//${hostname}:4815/`));
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
		ModulesMapped(state) {
			var {Modules} = this;
			return Modules.reduce((ret, mod) => {
				ret[mod.Module] = mod;
				return ret;
			}, {});
		},
	},
})
