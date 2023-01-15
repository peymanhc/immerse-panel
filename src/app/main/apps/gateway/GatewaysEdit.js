import React, {Component} from 'react';
import {withStyles} from '@material-ui/core';
import {FusePageCarded} from '@fuse';
import GatewaysSidebarHeader from './GatewaysSidebarHeader';
import GatewaysHeader from './GatewaysHeader';
import GatewaysToolbar from './GatewaysToolbar';
import GatewaysList from './GatewaysList';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import GatewaysDialog from './GatewaysDialog';
import GatewaysSidebarContent from './GatewaysSidebarContent';
import {bindActionCreators} from 'redux';
import * as Actions from './store/actions';
import {connect} from 'react-redux';

const styles = theme => ({
    layoutRoot: {}
});

class GatewaysEdit extends Component {
    componentDidMount()
    {
        this.props.getGateways();
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
					header={<GatewaysHeader/>}
					contentToolbar={<GatewaysToolbar/>}
					content={<GatewaysList/>}
					leftSidebarHeader={<GatewaysSidebarHeader/>}
					leftSidebarContent={<GatewaysSidebarContent/>}
					innerScroll
					onRef={instance => {
						this.pageLayout = instance;
					}}
				/>
				<GatewaysDialog/>
			</React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getGateways: Actions.getGateways,
    }, dispatch);
}


export default withReducer('gatewaysApp', reducer)(withStyles(styles, {withTheme: true})(connect(null, mapDispatchToProps)(GatewaysEdit)));