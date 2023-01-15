import {FuseLoadable} from '@fuse';

export const LocationAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/locations',
            component: FuseLoadable({
                loader: () => import('./locations/Locations')
            })
        },
        {
            path     : '/apps/heatmap',
            component: FuseLoadable({
                loader: () => import('./heatmap/Heatmap')
            })
        }		
    ]
};
