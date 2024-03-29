import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export function useRoutes() {
    const route  = useRoute();
    const router = useRouter();
    const routes = router.getRoutes();

    return computed(() => {
        return routes.filter((r) => {
            return r.meta.nav == 'main';
        }).filter((r) => {
            return r != route;
        });
    });
}
