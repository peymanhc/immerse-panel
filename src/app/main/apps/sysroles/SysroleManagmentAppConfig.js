import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const SysroleManagmentAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/sysroles/managment',
            component: FuseLoadable({
                loader: () => import('./SysroleManagmentApp')
            })
        },	
        {
            path     : '/apps/sysroles',
            component: () => <Redirect to="/apps/sysroles/managment"/>
        }
    ]
};
