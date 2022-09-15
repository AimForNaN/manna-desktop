import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export function useRoutes() {
    const route  = useRoute();
    const router = useRouter();
    const routes = router.getRoutes();

    return computed(() => {
        return routes.reduce((ret, r) => {
            if (r.name != 'home') {
                let parent = routes.find((p) => {
                    return p.children.find((c) => {
                        return r.name == c.name;
                    });
                });
                if (!parent) {
                    ret.push(r);
                }
            }
            return ret;
        }, []).filter((r) => {
            return r != route;
        });
    });
}
