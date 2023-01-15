import React, {Component} from 'react';
import {withStyles} from '@material-ui/core';
import {FusePageCarded} from '@fuse';
import TypesSidebarHeader from './TypesSidebarHeader';
import TypesHeader from './TypesHeader';
import TypesToolbar from './TypesToolbar';
import TypesList from './TypesList';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import TypesDialog from './TypesDialog';
import TypesSidebarContent from './TypesSidebarContent';
import {bindActionCreators} from 'redux';
import * as Actions from './store/actions';
import {connect} from 'react-redux';

const styles = theme => ({
    layoutRoot: {}
});

class TypesEdit extends Component {
    componentDidMount()
    {
        this.props.getTypes();
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
					header={<TypesHeader/>}
					contentToolbar={<TypesToolbar/>}
					content={<TypesList/>}
					leftSidebarHeader={<TypesSidebarHeader/>}
					leftSidebarContent={<TypesSidebarContent/>}
					innerScroll
					onRef={instance => {
						this.pageLayout = instance;
					}}
				/>
				<TypesDialog/>
			</React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getTypes: Actions.getTypes,
    }, dispatch);
}


export default withReducer('typesApp', reducer)(withStyles(styles, {withTheme: true})(connect(null, mapDispatchToProps)(TypesEdit)));