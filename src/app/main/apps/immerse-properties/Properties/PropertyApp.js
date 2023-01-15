import React, {Component} from 'react';
import {FusePageCarded} from '@fuse';
import _ from '@lodash';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom'
import withReducer from 'app/store/withReducer';
import PropertyList from './PropertyList';
import PropertyToolbar from './PropertyToolbar';
import PropertyHeader from './PropertyHeader';
import PropertySidebarHeader from './PropertySidebarHeader';
import PropertySidebarContent from './PropertySidebarContent';
import PropertyDialog from './PropertyDialog';
import LabelDialog from './LabelDialog';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';

class PropertyApp extends Component {

    componentDidMount()
    {
        this.props.getData(this.props.match);
    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.location, prevProps.location) )
        {
            this.props.getPropertys(this.props.match);
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
                        <PropertyHeader pageLayout={() => this.pageLayout}/>
                    }
                    contentToolbar={
                        <PropertyToolbar/>
                    }
                    content={
                        <PropertyList/>
                    }
                    leftSidebarHeader={
                        <PropertySidebarHeader/>
                    }
                    leftSidebarContent={
                        <PropertySidebarContent/>
                    }
                    onRef={instance => {
                        this.pageLayout = instance;
                    }}
                    innerScroll
                />
                <PropertyDialog/>
				<LabelDialog/>
            </React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getData : Actions.getData,
        getPropertys: Actions.getPropertys
    }, dispatch);
}


export default withReducer('immersePropertyApp', reducer)(withRouter(connect(null, mapDispatchToProps)(PropertyApp)));
