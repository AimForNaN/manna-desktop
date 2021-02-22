import Vue from 'vue';
import xdg from '@folder/xdg';

import Plugins from '../plugins';

if (window.process) {
    const {
        env,
        platform,
    } = window.process;

    const { HOME } = env;

    const xdgPaths = xdg({ platform });
    var {
        config,
        data,
    } = xdgPaths;

    switch (platform) {
        case 'linux': {
            config = HOME + config + '/manna-desktop';
            data   = HOME + data + '/manna-desktop';
            break;
        }
    }

    var Paths = {
        config,
        data,
    };

    const PluginsPath = Paths.data + '/Plugins';
} else {
    var Paths = {};
}


const PluginModule = {
    namespaced: true,
    state: {
        Plugins: [],
    },
    mutations: {
        Install(state, plugin) {
            var {Plugins} = state;
            Plugins.push(new plugin({
                Vue,
                Paths,
            }));
        },
    },
    getters: {
        VerseMenu(state) {
            var {Plugins} = state;
            return Plugins.reduce((ret, plugin) => {
                var {Type} = plugin;
                if (Type.includes('Verse')) {
                    let {VerseMenu} = plugin;
                    ret.push(VerseMenu);
                }
                return ret;
            }, []);
        },
    },
};

Array.from(Object.values(Plugins)).forEach((plugin) => {
    PluginModule.mutations.Install(PluginModule.state, plugin);
});

export default PluginModule;
