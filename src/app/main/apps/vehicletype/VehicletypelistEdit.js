import React, {Component} from 'react';
import {withStyles} from '@material-ui/core';
import {FusePageCarded} from '@fuse';
import VehicletypelistSidebarHeader from './VehicletypelistSidebarHeader';
import VehicletypelistHeader from './VehicletypelistHeader';
import VehicletypelistToolbar from './VehicletypelistToolbar';
import VehicletypelistList from './VehicletypelistList';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import VehicletypelistDialog from './VehicletypelistDialog';
import VehicletypelistSidebarContent from './VehicletypelistSidebarContent';
import {bindActionCreators} from 'redux';
import * as Actions from './store/actions';
import {connect} from 'react-redux';

const styles = theme => ({
    layoutRoot: {}
});

class VehicletypelistEdit extends Component {
    componentDidMount()
    {
        this.props.getVehicletypelist();
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
					header={<VehicletypelistHeader/>}
					contentToolbar={<VehicletypelistToolbar/>}
					content={<VehicletypelistList/>}
					leftSidebarHeader={<VehicletypelistSidebarHeader/>}
					leftSidebarContent={<VehicletypelistSidebarContent/>}
					innerScroll
					onRef={instance => {
						this.pageLayout = instance;
					}}
				/>
				<VehicletypelistDialog/>
			</React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getVehicletypelist: Actions.getVehicletypelist,
    }, dispatch);
}


export default withReducer('vehicletypelistApp', reducer)(withStyles(styles, {withTheme: true})(connect(null, mapDispatchToProps)(VehicletypelistEdit)));
