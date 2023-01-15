import React, {Component} from 'react';
import {withStyles} from '@material-ui/core';
import {FusePageCarded} from '@fuse';
import PropertyLabelsSidebarHeader from './PropertyLabelsSidebarHeader';
import PropertyLabelHeader from './PropertyLabelHeader';
import PropertyLabelToolbar from './PropertyLabelToolbar';
import PropertyLabelsList from './PropertyLabelsList';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import PropertyLabelsDialog from './PropertyLabelsDialog';
import PropertyLabelsSidebarContent from './PropertyLabelsSidebarContent';

const styles = theme => ({
    layoutRoot: {}
});

class PropertyLabelsEdit extends Component {

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
					header={<PropertyLabelHeader/>}
					contentToolbar={<PropertyLabelToolbar/>}
					content={<PropertyLabelsList/>}
					leftSidebarHeader={<PropertyLabelsSidebarHeader/>}
					leftSidebarContent={<PropertyLabelsSidebarContent/>}
					innerScroll
					onRef={instance => {
						this.pageLayout = instance;
					}}
				/>
				<PropertyLabelsDialog/>
			</React.Fragment>
        )
    };
}

export default withReducer('immersePropertyApp', reducer)(withStyles(styles, {withTheme: true})(PropertyLabelsEdit));