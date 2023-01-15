import {FuseLoadable} from '@fuse';

export const AccessDeniedPageConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/pages/access-denied',
            component: FuseLoadable({
                loader: () => import('./AccessDeniedPage')
            })
        }
    ]
};
