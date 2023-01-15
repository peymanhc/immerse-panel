import React, {Component} from 'react';
import {FusePageCarded} from '@fuse';
import _ from '@lodash';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom'
import withReducer from 'app/store/withReducer';
import CategoryList from './CategoryList';
import CategoryToolbar from './CategoryToolbar';
import CategoryHeader from './CategoryHeader';
import CategorySidebarHeader from './CategorySidebarHeader';
import CategorySidebarContent from './CategorySidebarContent';
import CategoryDialog from './CategoryDialog';
import LabelDialog from './LabelDialog';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';

class CategoryApp extends Component {

    componentDidMount()
    {
        this.props.getData(this.props.match);
        //this.props.getTypesC();
    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.location, prevProps.location) )
        {
            this.props.getCategorys(this.props.match);
        }
    }

    render()
    {
        return (
            <React.Fragment>
                <FusePageCarded
                    classes={{
                        root  : "w-full",
                        header: "items-center min-h-72 h-72 sm:h-136 sm:min-h-136"
                    }}
                    header={
                        <CategoryHeader pageLayout={() => this.pageLayout}/>
                    }
                    contentToolbar={
                        <CategoryToolbar/>
                    }
                    content={
                        <CategoryList/>
                    }
                    leftSidebarHeader={
                        <CategorySidebarHeader/>
                    }
                    leftSidebarContent={
                        <CategorySidebarContent/>
                    }
                    onRef={instance => {
                        this.pageLayout = instance;
                    }}
                    innerScroll
                />
                <CategoryDialog/>
				<LabelDialog/>
            </React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getData 		: Actions.getData,
        getCategorys	: Actions.getCategorys,
		//getTypesC		: Actions.getTypesC,		
    }, dispatch);
}

 

export default withReducer('etelafCategoryApp', reducer)(withRouter(connect(null, mapDispatchToProps)(CategoryApp)));
