import React, {Component} from 'react';
import {withStyles} from '@material-ui/core';
import {FusePageCarded} from '@fuse';
import PagesSidebarHeader from './PagesSidebarHeader';
import PagesHeader from './PagesHeader';
import PagesToolbar from './PagesToolbar';
import PagesList from './PagesList';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import PagesDialog from './PagesDialog';
import PagesSidebarContent from './PagesSidebarContent';
import {bindActionCreators} from 'redux';
import * as Actions from './store/actions';
import {connect} from 'react-redux';

const styles = theme => ({
    layoutRoot: {}
});

class PagesEdit extends Component {
    componentDidMount()
    {
        this.props.getPages();
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
					header={<PagesHeader/>}
					contentToolbar={<PagesToolbar/>}
					content={<PagesList/>}
					leftSidebarHeader={<PagesSidebarHeader/>}
					leftSidebarContent={<PagesSidebarContent/>}
					innerScroll
					onRef={instance => {
						this.pageLayout = instance;
					}}
				/>
				<PagesDialog/>
			</React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getPages: Actions.getPages,
    }, dispatch);
}


export default withReducer('PagesApp', reducer)(withStyles(styles, {withTheme: true})(connect(null, mapDispatchToProps)(PagesEdit)));