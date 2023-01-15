import React from 'react';
import { FuseLoadable } from '@fuse';
import { Redirect } from 'react-router-dom';

export const DictionarysAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/dictionarys/labels/all',
            component: FuseLoadable({
                loader: () => import('./DictionarysEdit')
            })
        },
        {
            path     : '/apps/dictionarys/labels/:filterHandle',
            component: FuseLoadable({
                loader: () => import('./DictionarysEdit')
            })
        },	
        {
            path     : '/apps/dictionarys',
            component: () => <Redirect to="/apps/dictionarys/labels/all"/>
        },
    ]
};
