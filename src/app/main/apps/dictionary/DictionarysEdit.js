import React, {Component} from 'react';
import {withStyles} from '@material-ui/core';
import {FusePageCarded} from '@fuse';
import DictionarysSidebarHeader from './DictionarysSidebarHeader';
import DictionarysHeader from './DictionarysHeader';
import DictionarysToolbar from './DictionarysToolbar';
import DictionarysList from './DictionarysList';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import DictionarysDialog from './DictionarysDialog';
import DictionarysSidebarContent from './DictionarysSidebarContent';
import {bindActionCreators} from 'redux';
import * as Actions from './store/actions';
import {connect} from 'react-redux';

const styles = theme => ({
    layoutRoot: {}
});

class DictionarysEdit extends Component {
    componentDidMount()
    {
        this.props.getDictionarys();
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
					header={<DictionarysHeader />}
					contentToolbar={<DictionarysToolbar />}
					content={<DictionarysList />}
					leftSidebarHeader={<DictionarysSidebarHeader />}
					leftSidebarContent={<DictionarysSidebarContent />}
					innerScroll
					onRef={instance => {
						this.pageLayout = instance;
					}}
				/>
				<DictionarysDialog />
			</React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
          getDictionarys: Actions.getDictionarys,
    }, dispatch);
}


export default withReducer('dictionarysApp', reducer)(withStyles(styles, {withTheme: true})(connect(null, mapDispatchToProps)(DictionarysEdit)));