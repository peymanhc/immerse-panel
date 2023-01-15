import React, {Component} from 'react';
import {withStyles} from '@material-ui/core';
import {FusePageCarded} from '@fuse';
import WarrantylistStatusSidebarHeader from './WarrantylistStatusSidebarHeader';
import WarrantylistStatusHeader from './WarrantylistStatusHeader';
import WarrantylistStatusToolbar from './WarrantylistStatusToolbar';
import WarrantylistStatusList from './WarrantylistStatusList';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import WarrantylistStatusDialog from './WarrantylistStatusDialog';
import WarrantylistStatusSidebarContent from './WarrantylistStatusSidebarContent';
import {bindActionCreators} from 'redux';
import * as Actions from '../store/actions';
import {connect} from 'react-redux';

const styles = theme => ({
    layoutRoot: {}
});

class WarrantylistStatusEdit extends Component {
    componentDidMount()
    {
        this.props.getWarrantylistStatus();
    }
    render()
    {
        const {classes} = this.props;
        return (
			<React.Fragment>
				<FusePageCarded
					classes={{
						root: classes.layoutRoot,
						header: "items-center min-h-72 h-72 sm:h-136 sm:min-h-136"
					}}
					header={<WarrantylistStatusHeader/>}
					contentToolbar={<WarrantylistStatusToolbar/>}
					content={<WarrantylistStatusList/>}
					leftSidebarHeader={<WarrantylistStatusSidebarHeader/>}
					leftSidebarContent={<WarrantylistStatusSidebarContent/>}
					innerScroll
					onRef={instance => {
						this.pageLayout = instance;
					}}
				/>
				<WarrantylistStatusDialog/>
			</React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getWarrantylistStatus: Actions.getWarrantylistStatus1,
    }, dispatch);
}


export default withReducer('WarrantylistStatusApp', reducer)(withStyles(styles, {withTheme: true})(connect(null, mapDispatchToProps)(WarrantylistStatusEdit)));