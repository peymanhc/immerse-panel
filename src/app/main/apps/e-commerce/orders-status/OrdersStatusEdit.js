import React, {Component} from 'react';
import {withStyles} from '@material-ui/core';
import {FusePageCarded} from '@fuse';
import OrdersStatusSidebarHeader from './OrdersStatusSidebarHeader';
import OrdersStatusHeader from './OrdersStatusHeader';
import OrdersStatusToolbar from './OrdersStatusToolbar';
import OrdersStatusList from './OrdersStatusList';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import OrdersStatusDialog from './OrdersStatusDialog';
import OrdersStatusSidebarContent from './OrdersStatusSidebarContent';
import {bindActionCreators} from 'redux';
import * as Actions from '../store/actions';
import {connect} from 'react-redux';

const styles = theme => ({
    layoutRoot: {}
});

class OrdersStatusEdit extends Component {
    componentDidMount()
    {
        this.props.getOrdersStatus();
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
					header={<OrdersStatusHeader/>}
					contentToolbar={<OrdersStatusToolbar/>}
					content={<OrdersStatusList/>}
					leftSidebarHeader={<OrdersStatusSidebarHeader/>}
					leftSidebarContent={<OrdersStatusSidebarContent/>}
					innerScroll
					onRef={instance => {
						this.pageLayout = instance;
					}}
				/>
				<OrdersStatusDialog/>
			</React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getOrdersStatus: Actions.getOrdersStatus1,
    }, dispatch);
}


export default withReducer('OrdersStatusApp', reducer)(withStyles(styles, {withTheme: true})(connect(null, mapDispatchToProps)(OrdersStatusEdit)));