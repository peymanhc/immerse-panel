import React, {Component} from 'react';
import {withStyles} from '@material-ui/core';
import {FusePageCarded} from '@fuse';
import SlidersSidebarHeader from './SlidersSidebarHeader';
import SlidersHeader from './SlidersHeader';
import SlidersToolbar from './SlidersToolbar';
import SlidersList from './SlidersList';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import SlidersDialog from './SlidersDialog';
import SlidersSidebarContent from './SlidersSidebarContent';
import {bindActionCreators} from 'redux';
import * as Actions from './store/actions';
import {connect} from 'react-redux';

const styles = theme => ({
    layoutRoot: {}
});

class SlidersEdit extends Component {
    componentDidMount()
    {
        this.props.getSliders();
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
					header={<SlidersHeader/>}
					contentToolbar={<SlidersToolbar/>}
					content={<SlidersList/>}
					leftSidebarHeader={<SlidersSidebarHeader/>}
					leftSidebarContent={<SlidersSidebarContent/>}
					innerScroll
					onRef={instance => {
						this.pageLayout = instance;
					}}
				/>
				<SlidersDialog/>
			</React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getSliders: Actions.getSliders,
    }, dispatch);
}


export default withReducer('slidersApp', reducer)(withStyles(styles, {withTheme: true})(connect(null, mapDispatchToProps)(SlidersEdit)));