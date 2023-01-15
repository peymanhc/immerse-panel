import React from 'react';
import {Icon} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import { withTranslate } from 'react-redux-multilingual';

const CategoryLabelsSidebarHeader = ({translate}) => 
		
    <div className="flex flex-col justify-center h-full p-24">

        <div className="flex items-center flex-1">
            <FuseAnimate animation="transition.expandIn" delay={300}>
                <Icon className="text-32 mr-16">category</Icon>
            </FuseAnimate>
            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                <span className="text-24">{translate('Category_Labels')}</span>
            </FuseAnimate>
        </div>
    </div>
;
		
export default withTranslate(CategoryLabelsSidebarHeader);