import React, {Component} from 'react';
import {withStyles} from '@material-ui/core';
import {FusePageCarded} from '@fuse';
import ShopsSidebarHeader from './ShopsSidebarHeader';
import ShopsHeader from './ShopsHeader';
import ShopsToolbar from './ShopsToolbar';
import ShopsList from './ShopsList';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import ShopsDialog from './ShopsDialog';
import ShopsSidebarContent from './ShopsSidebarContent';
import {bindActionCreators} from 'redux';
import * as Actions from './store/actions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import _ from '@lodash';

const styles = theme => ({
    layoutRoot: {}
});

class ShopsEdit extends Component {
	
    componentDidMount()
    {
        this.props.getData(this.props.match.params);
    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.location, prevProps.location) )
        {
            this.props.getShops(this.props.match.params);
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
					header={<ShopsHeader/>}
					contentToolbar={<ShopsToolbar/>}
					content={<ShopsList/>}
					leftSidebarHeader={<ShopsSidebarHeader/>}
					leftSidebarContent={<ShopsSidebarContent/>}
					innerScroll
					onRef={instance => {
						this.pageLayout = instance;
					}}
				/>
				<ShopsDialog/>
			</React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getShops	: Actions.getShops,
        getData		: Actions.getData,
    }, dispatch);
}


export default withReducer('shopsApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(null, mapDispatchToProps)(ShopsEdit))));