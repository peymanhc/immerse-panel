import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const MasterAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/master/masters',
            component: FuseLoadable({
                loader: () => import('./masters/Masters')
            })
        },
        {
            path     : '/apps/master/:masterId/:masterName?',
            component: FuseLoadable({
                loader: () => import('./master/master')
            })
        },
        {
            path     : '/apps/master',
            component: () => <Redirect to="/apps/master/masters"/>
        }
    ]
};
