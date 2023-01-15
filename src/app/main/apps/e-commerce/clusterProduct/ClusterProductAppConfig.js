import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const ClusterProductAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/clusterProduct/label/:labelHandle/:clusterProductId?',
            component: FuseLoadable({
                loader: () => import('./ClusterProductApp')
            })
        },
        {
            path     : '/apps/clusterProduct/filter/:filterHandle/:clusterProductId?',
            component: FuseLoadable({
                loader: () => import('./ClusterProductApp')
            })
        },
        {
            path     : '/apps/clusterProduct/:folderHandle/:clusterProductId?',
            component: FuseLoadable({
                loader: () => import('./ClusterProductApp')
            })
        },
        {
            path     : '/apps/clusterProduct',
            component: () => <Redirect to="/apps/clusterProduct/inbox"/>
        }
    ]
};
