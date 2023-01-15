import React from 'react';
import {Icon} from '@material-ui/core';
import {FuseAnimate} from '@fuse';

const PanelsSidebarHeader = () => 
		
    <div className="flex flex-col justify-center h-full p-24">

        <div className="flex items-center flex-1">
            <FuseAnimate animation="transition.expandIn" delay={300}>
                <Icon className="text-32 mr-16">translate</Icon>
            </FuseAnimate>
            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                <span className="text-24">Panel Translation</span>
            </FuseAnimate>
        </div>
    </div>
;
		
export default PanelsSidebarHeader;