import React, {Component} from 'react';
import {withStyles} from '@material-ui/core';
import {FusePageCarded} from '@fuse';
import CataloglistSidebarHeader from './CataloglistSidebarHeader';
import CataloglistHeader from './CataloglistHeader';
import CataloglistToolbar from './CataloglistToolbar';
import CataloglistList from './CataloglistList';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import CataloglistDialog from './CataloglistDialog';
import CataloglistSidebarContent from './CataloglistSidebarContent';
import {bindActionCreators} from 'redux';
import * as Actions from './store/actions';
import {connect} from 'react-redux';

const styles = theme => ({
    layoutRoot: {}
});

class CataloglistEdit extends Component {
    componentDidMount()
    {
        this.props.getCataloglist();
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
					header={<CataloglistHeader/>}
					contentToolbar={<CataloglistToolbar/>}
					content={<CataloglistList/>}
					leftSidebarHeader={<CataloglistSidebarHeader/>}
					leftSidebarContent={<CataloglistSidebarContent/>}
					innerScroll
					onRef={instance => {
						this.pageLayout = instance;
					}}
				/>
				<CataloglistDialog/>
			</React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getCataloglist: Actions.getCataloglist,
    }, dispatch);
}


export default withReducer('cataloglistApp', reducer)(withStyles(styles, {withTheme: true})(connect(null, mapDispatchToProps)(CataloglistEdit)));
