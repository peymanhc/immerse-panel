import React from 'react';
import {withStyles, FormControlLabel, Icon, Switch, Typography} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import classNames from 'classnames';
import { withTranslate } from 'react-redux-multilingual';

const styles = theme => ({
    table   : {
        '& th': {
            padding: '16px 0'
        }
    },
    typeIcon: {
        '&.folder:before'     : {
            content: "'folder'",
            color  : '#FFB300'
        },
        '&.document:before'   : {
            content: "'insert_drive_file'",
            color  : '#1565C0'
        },
        '&.spreadsheet:before': {
            content: "'insert_chart'",
            color  : '#4CAF50'
        }
    }
});

const DetailSidebarContent = ({classes, files, selectedItem, translate}) => {

    const selected = files[selectedItem];

    if ( !selected )
    {
        return null;
    }

    return (
        <FuseAnimate animation="transition.slideUpIn" delay={200}>

            <div className="file-details p-16 sm:p-24">

                <div className="preview h-128 sm:h-256 file-icon flex items-center justify-center">
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <Icon className={classNames(classes.typeIcon, selected.type, "text-48")}/>
                    </FuseAnimate>
                </div>

                <FormControlLabel
                    className="offline-switch"
                    control={
                        <Switch
                            checked={selected.offline}
                            aria-label="Available Offline"
                        />
                    }
                    label="Available Offline"
                />

                <Typography variant="subtitle1" className="py-16">{translate('Info')}</Typography>

                <table className={classNames(classes.table, "w-full, text-right")}>

                    <tbody>

                        <tr className="type">
                            <th>{translate('Type')}</th>
                            <td>{selected.type}</td>
                        </tr>

                        <tr className="size">
                            <th>{translate('Size')}</th>
                            <td>{selected.size === '' ? '-' : selected.size}</td>
                        </tr>

                        <tr className="location">
                            <th>{translate('Location')}</th>
                            <td>{selected.location}</td>
                        </tr>

                        <tr className="owner">
                            <th>{translate('Owner')}</th>
                            <td>{selected.owner}</td>
                        </tr>

                        <tr className="modified">
                            <th>{translate('Modified')}</th>
                            <td>{selected.modified}</td>
                        </tr>

                        <tr className="opened">
                            <th>{translate('Opened')}</th>
                            <td>{selected.opened}</td>
                        </tr>

                        <tr className="created">
                            <th>{translate('Created')}</th>
                            <td>{selected.created}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </FuseAnimate>
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

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(withTranslate(DetailSidebarContent))));
