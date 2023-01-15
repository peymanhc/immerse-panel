import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const VehicletypelistAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/vehicletypelistCASE/labels/all',
            component: FuseLoadable({
                loader: () => import('./VehicletypelistEdit')
            })
        },
        {
            path     : '/apps/vehicletypelistCASE/labels/:filterHandle',
            component: FuseLoadable({
                loader: () => import('./VehicletypelistEdit')
            })
        },	
        {
            path     : '/apps/vehicletypelistCASE',
            component: () => <Redirect to="/apps/vehicletypelistCASE/labels/all"/>
        },
    ]
};
