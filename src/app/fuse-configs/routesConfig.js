import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse/index';
import {appsConfigs} from 'app/main/apps/appsConfigs';
import {pagesConfigs} from 'app/main/pages/pagesConfigs';
import {authRoleExamplesConfigs} from 'app/main/auth/authRoleExamplesConfigs';
import {UserInterfaceConfig} from 'app/main/user-interface/UserInterfaceConfig';
import {LoginConfig} from 'app/main/login/LoginConfig';
import {RegisterConfig} from 'app/main/register/RegisterConfig';
import {LogoutConfig} from 'app/main/logout/LogoutConfig';
import {CallbackConfig} from 'app/main/callback/CallbackConfig';
import {authRoles} from 'app/auth';
import _ from 'lodash';
 
function setAdminAuth(configs)
{
    return configs.map(config => _.merge({}, config, {auth: authRoles.admin}))
}

const routeConfigs = [
    ...setAdminAuth([
        ...appsConfigs,
        ...pagesConfigs,
        ...authRoleExamplesConfigs,
        UserInterfaceConfig,
        LogoutConfig
    ]),
    LoginConfig,
    RegisterConfig,
    CallbackConfig
];

const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/',
        exact    : true,
        component: () => <Redirect to="/apps/dashboards/analytics"/>
    },
    {
        component: () => <Redirect to="/pages/errors/error-404"/>
    }
];

export default routes;
