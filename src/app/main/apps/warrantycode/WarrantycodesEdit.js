import React, {Component} from 'react';
import {withStyles, Fab, Icon} from '@material-ui/core';
import {FusePageCarded, FuseAnimate} from '@fuse';
import WarrantycodesSidebarHeader from './WarrantycodesSidebarHeader';
import WarrantycodesHeader from './WarrantycodesHeader';
import WarrantycodesToolbar from './WarrantycodesToolbar';
import WarrantycodesList from './WarrantycodesList';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import WarrantycodesDialog from './WarrantycodesDialog';
import WarrantycodesUploadDialog from './WarrantycodesUploadDialog';
import WarrantycodesSidebarContent from './WarrantycodesSidebarContent';
import {bindActionCreators} from 'redux';
import * as Actions from './store/actions';
import {connect} from 'react-redux';

const styles = theme => ({
    addButton: {
        position: 'absolute',
        right   : 12,
        bottom  : 12,
        zIndex  : 99
    }
});

class WarrantycodesEdit extends Component {
    componentDidMount()
    {
        this.props.getWarrantycodes();
    }
    render()
    {
        const {classes, openWarrantycodesUploadDialog} = this.props;
        return (
			<React.Fragment>
				<FusePageCarded
					classes={{
						root: classes.layoutRoot,
						header: "items-center min-h-72 h-72 sm:h-136 sm:min-h-136"
					}}
					header={<WarrantycodesHeader/>}
					contentToolbar={<WarrantycodesToolbar/>}
					content={<WarrantycodesList/>}
					leftSidebarHeader={<WarrantycodesSidebarHeader/>}
					leftSidebarContent={<WarrantycodesSidebarContent/>}
					innerScroll
					onRef={instance => {
						this.pageLayout = instance;
					}}
				/>
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<Fab
						color="primary"
						aria-label="add"
						className={classes.addButton}
						onClick={openWarrantycodesUploadDialog}
					>
						<Icon>cloud_upload</Icon>
					</Fab>
				</FuseAnimate>					
				<WarrantycodesDialog/>
				<WarrantycodesUploadDialog/>
			</React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getWarrantycodes: Actions.getWarrantycodes,
        openWarrantycodesUploadDialog: Actions.openWarrantycodesUploadDialog,
    }, dispatch);
}


export default withReducer('warrantycodesApp', reducer)(withStyles(styles, {withTheme: true})(connect(null, mapDispatchToProps)(WarrantycodesEdit)));
