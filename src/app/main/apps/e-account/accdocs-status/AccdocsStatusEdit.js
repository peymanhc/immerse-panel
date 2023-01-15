import React, {Component} from 'react';
import {withStyles} from '@material-ui/core';
import {FusePageCarded} from '@fuse';
import AccdocsStatusSidebarHeader from './AccdocsStatusSidebarHeader';
import AccdocsStatusHeader from './AccdocsStatusHeader';
import AccdocsStatusToolbar from './AccdocsStatusToolbar';
import AccdocsStatusList from './AccdocsStatusList';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import AccdocsStatusDialog from './AccdocsStatusDialog';
import AccdocsStatusSidebarContent from './AccdocsStatusSidebarContent';
import {bindActionCreators} from 'redux';
import * as Actions from '../store/actions';
import {connect} from 'react-redux';

const styles = theme => ({
    layoutRoot: {}
});

class AccdocsStatusEdit extends Component {
    componentDidMount()
    {
        this.props.getAccdocsStatus();
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
					header={<AccdocsStatusHeader/>}
					contentToolbar={<AccdocsStatusToolbar/>}
					content={<AccdocsStatusList/>}
					leftSidebarHeader={<AccdocsStatusSidebarHeader/>}
					leftSidebarContent={<AccdocsStatusSidebarContent/>}
					innerScroll
					onRef={instance => {
						this.pageLayout = instance;
					}}
				/>
				<AccdocsStatusDialog/>
			</React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getAccdocsStatus: Actions.getAccdocsStatus1,
    }, dispatch);
}


export default withReducer('AccdocsStatusApp', reducer)(withStyles(styles, {withTheme: true})(connect(null, mapDispatchToProps)(AccdocsStatusEdit)));