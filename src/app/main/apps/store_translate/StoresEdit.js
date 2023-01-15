import React, {Component} from 'react';
import {withStyles} from '@material-ui/core';
import {FusePageCarded} from '@fuse';
import StoresSidebarHeader from './StoresSidebarHeader';
import StoresHeader from './StoresHeader';
import StoresToolbar from './StoresToolbar';
import StoresList from './StoresList';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import StoresDialog from './StoresDialog';
import StoresSidebarContent from './StoresSidebarContent';
import {bindActionCreators} from 'redux';
import * as Actions from './store/actions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import _ from '@lodash';

const styles = theme => ({
    layoutRoot: {}
});

class StoresEdit extends Component {
	
    componentDidMount()
    {
        this.props.getData(this.props.match.params);
    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.location, prevProps.location) )
        {
            this.props.getStores1(this.props.match.params);
        }
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
					header={<StoresHeader/>}
					contentToolbar={<StoresToolbar/>}
					content={<StoresList/>}
					leftSidebarHeader={<StoresSidebarHeader/>}
					leftSidebarContent={<StoresSidebarContent/>}
					innerScroll
					onRef={instance => {
						this.pageLayout = instance;
					}}
				/>
				<StoresDialog/>
			</React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getStores1	: Actions.getStores1,
        getData		: Actions.getData,
    }, dispatch);
}


export default withReducer('storesApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(null, mapDispatchToProps)(StoresEdit))));