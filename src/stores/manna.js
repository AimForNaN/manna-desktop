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
			this.api('install').get().then((rsp) => {
				this.InstallSources = rsp;
			});
		},
		fetchRepository() {
			this.api.get().then((rsp) => {
				this.Respositories.set(this.Respository, rsp);
			});
		},
		fetchStructure(mod) {
			return this.api(mod)('structure').get();
		},
		fetchText(mod, key) {
			console.log(String(this.api(mod)('text')));
			return this.api(mod)('text').get({ key });
		},
		installModule(mod) {
			return this.api('install').post(mod);
		},
		refreshInstallSource(Source) {
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
			var {hostname, protocol} = location;
			return restiful(new URL(`/${state.Respository}`, `${protocol}//${hostname}:4815/`));
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
