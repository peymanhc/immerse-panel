import React, {Component} from 'react';
import {withStyles} from '@material-ui/core';
import {FusePageCarded} from '@fuse';
import WerehouselistSidebarHeader from './WerehouselistSidebarHeader';
import WerehouselistHeader from './WerehouselistHeader';
import WerehouselistToolbar from './WerehouselistToolbar';
import WerehouselistList from './WerehouselistList';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import WerehouselistDialog from './WerehouselistDialog';
import WerehouselistSidebarContent from './WerehouselistSidebarContent';
import {bindActionCreators} from 'redux';
import * as Actions from './store/actions';
import {connect} from 'react-redux';

const styles = theme => ({
    layoutRoot: {}
});

class WerehouselistEdit extends Component {
    componentDidMount()
    {
        this.props.getWerehouselist();
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
					header={<WerehouselistHeader/>}
					contentToolbar={<WerehouselistToolbar/>}
					content={<WerehouselistList/>}
					leftSidebarHeader={<WerehouselistSidebarHeader/>}
					leftSidebarContent={<WerehouselistSidebarContent/>}
					innerScroll
					onRef={instance => {
						this.pageLayout = instance;
					}}
				/>
				<WerehouselistDialog/>
			</React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getWerehouselist: Actions.getWerehouselist,
    }, dispatch);
}


export default withReducer('werehouselistCASEApp', reducer)(withStyles(styles, {withTheme: true})(connect(null, mapDispatchToProps)(WerehouselistEdit)));
