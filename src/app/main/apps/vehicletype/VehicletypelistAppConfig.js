import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const VehicletypelistAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/vehicletypelist/labels/all',
            component: FuseLoadable({
                loader: () => import('./VehicletypelistEdit')
            })
        },
        {
            path     : '/apps/vehicletypelist/labels/:filterHandle',
            component: FuseLoadable({
                loader: () => import('./VehicletypelistEdit')
            })
        },	
        {
            path     : '/apps/vehicletypelist',
            component: () => <Redirect to="/apps/vehicletypelist/labels/all"/>
        },
    ]
};
