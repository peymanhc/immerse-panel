import React, {Component} from 'react';
import {withStyles} from '@material-ui/core';
import {FusePageCarded} from '@fuse';
import CategoryLabelsSidebarHeader from './CategoryLabelsSidebarHeader';
import CategoryLabelHeader from './CategoryLabelHeader';
import CategoryLabelToolbar from './CategoryLabelToolbar';
import CategoryLabelsList from './CategoryLabelsList';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import CategoryLabelsDialog from './CategoryLabelsDialog';
import CategoryLabelsSidebarContent from './CategoryLabelsSidebarContent';
import {bindActionCreators} from 'redux';
import * as Actions from '../store/actions';
import {connect} from 'react-redux';

const styles = theme => ({
    layoutRoot: {}
});

class CategoryLabelsEdit extends Component {
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
					header={<CategoryLabelHeader/>}
					contentToolbar={<CategoryLabelToolbar/>}
					content={<CategoryLabelsList/>}
					leftSidebarHeader={<CategoryLabelsSidebarHeader/>}
					leftSidebarContent={<CategoryLabelsSidebarContent/>}
					innerScroll
					onRef={instance => {
						this.pageLayout = instance;
					}}
				/>
				<CategoryLabelsDialog/>
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

 

export default withReducer('immerseCategoryApp', reducer)(withStyles(styles, {withTheme: true})(connect(null, mapDispatchToProps)(CategoryLabelsEdit)));