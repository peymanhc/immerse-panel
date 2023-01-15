import React from 'react';
import {Icon, Typography} from '@material-ui/core';
import { withTranslate } from 'react-redux-multilingual';

const MainSidebarHeader = ({translate}) => {
    return (
        <div className="flex items-center h-full p-12">
            <Icon>folder</Icon>
            <Typography variant="h6" className="ml-12">{translate('File_Manager')}</Typography>
        </div>
    );
};

export default withTranslate(MainSidebarHeader);
