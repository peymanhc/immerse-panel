import React from 'react';
import {Icon, IconButton, Typography} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';

const DetailSidebarHeader = ({files, selectedItem, translate}) => {

    const selected = files[selectedItem];

    if ( !selected )
    {
        return null;
    }

    return (
        <div className="flex flex-col justify-between h-full p-4 sm:p-12">

            <div className="toolbar flex align-center justify-end">
                <FuseAnimate animation="transition.expandIn" delay={200}>
                    <IconButton>
                        <Icon>delete</Icon>
                    </IconButton>
                </FuseAnimate>
                <FuseAnimate animation="transition.expandIn" delay={200}>
                    <IconButton>
                        <Icon>cloud_download</Icon>
                    </IconButton>
                </FuseAnimate>
                <IconButton>
                    <Icon>more_vert</Icon>
                </IconButton>
            </div>

            <div className="p-12">
                <FuseAnimate delay={200}>
                    <Typography variant="subtitle1" className="mb-8">{selected.name}</Typography>
                </FuseAnimate>
                <FuseAnimate delay={300}>
                    <Typography variant="caption" className="">
                        <span>{translate('Edited')}</span>
                        <span>: {selected.modified}</span>
                    </Typography>
                </FuseAnimate>
            </div>
        </div>
    );
};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({}, dispatch);
}

function mapStateToProps({fileManagerApp})
{
    return {
        files       : fileManagerApp.files,
        selectedItem: fileManagerApp.selectedItem
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withTranslate(DetailSidebarHeader)));
