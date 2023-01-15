import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const UserManagmentAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/users/managment',
            component: FuseLoadable({
                loader: () => import('./UserManagmentApp')
            })
        },	
        {
            path     : '/apps/users',
            component: () => <Redirect to="/apps/users/managment"/>
        }
    ]
};
