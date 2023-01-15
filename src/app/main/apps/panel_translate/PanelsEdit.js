import React, {Component} from 'react';
import {withStyles} from '@material-ui/core';
import {FusePageCarded} from '@fuse';
import PanelsSidebarHeader from './PanelsSidebarHeader';
import PanelsHeader from './PanelsHeader';
import PanelsToolbar from './PanelsToolbar';
import PanelsList from './PanelsList';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import PanelsDialog from './PanelsDialog';
import PanelsSidebarContent from './PanelsSidebarContent';
import {bindActionCreators} from 'redux';
import * as Actions from './store/actions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import _ from '@lodash';

const styles = theme => ({
    layoutRoot: {}
});

class PanelsEdit extends Component {
	
    componentDidMount()
    {
        this.props.getData(this.props.match.params);
    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.location, prevProps.location) )
        {
            this.props.getPanels(this.props.match.params);
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
					header={<PanelsHeader/>}
					contentToolbar={<PanelsToolbar/>}
					content={<PanelsList/>}
					leftSidebarHeader={<PanelsSidebarHeader/>}
					leftSidebarContent={<PanelsSidebarContent/>}
					innerScroll
					onRef={instance => {
						this.pageLayout = instance;
					}}
				/>
				<PanelsDialog/>
			</React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getPanels	: Actions.getPanels,
        getData		: Actions.getData,
    }, dispatch);
}


export default withReducer('panelsApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(null, mapDispatchToProps)(PanelsEdit))));