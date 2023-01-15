import React, {Component} from 'react';
import {FusePageCarded} from '@fuse';
import _ from '@lodash';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom'
import withReducer from 'app/store/withReducer';
import AddressList from './AddressList';
import AddressToolbar from './AddressToolbar';
import AddressHeader from './AddressHeader';
import AddressSidebarHeader from './AddressSidebarHeader';
import AddressSidebarContent from './AddressSidebarContent';
import AddressDialog from './AddressDialog';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import '../RTL.css'; 

class AddressApp extends Component {

    componentDidMount()
    {
        this.props.getData(this.props.match); 
		this.props.getUsers();
		this.props.getCities();
    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.location, prevProps.location) )
        {
            this.props.getAddresses(this.props.match);
        }
    }

    render()
    {
        return (
             <div className="fuse">
            <React.Fragment>
                <FusePageCarded
                    classes={{
                        root  : "w-full",
                        header: "items-center min-h-72 h-72 sm:h-136 sm:min-h-136"
                    }}
                    header={
                        <AddressHeader pageLayout={() => this.pageLayout}/>
                    }
                    contentToolbar={
                        <AddressToolbar/>
                    }
                    content={
                        <AddressList/>
                    }
                    leftSidebarHeader={
                        <AddressSidebarHeader/>
                    }
                    leftSidebarContent={
                        <AddressSidebarContent/>
                    }
                    onRef={instance => {
                        this.pageLayout = instance;
                    }}
                    innerScroll
                />
                <AddressDialog/>
            </React.Fragment>
            </div>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getData 	: Actions.getData,
        getAddresses: Actions.getAddresses,
		getUsers	: Actions.getUsers,
		getCities	: Actions.getCities,
    }, dispatch);
}

function mapStateToProps({addressApp})
{
    return {}
}

export default withReducer('addressApp', reducer)(withRouter(connect(mapStateToProps, mapDispatchToProps)(AddressApp)));
