import React, {Component} from 'react';
import {FusePageCarded} from '@fuse';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import withReducer from 'app/store/withReducer';
import ClusterProductList from './clusterProducts/ClusterProductList';

import ClusterProductsToolbar from './clusterProducts/ClusterProductsToolbar';

import ClusterProductAppHeader from './ClusterProductAppHeader';
import ClusterProductAppSidebarHeader from './ClusterProductAppSidebarHeader';
import ClusterProductAppSidebarContent from './ClusterProductAppSidebarContent';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import '../RTL.css';

class ClusterProductApp extends Component {

    componentDidMount()
    {
		this.props.getCategories();
		this.props.getClusterlist();
    }

    render()
    {
        //const {match} = this.props;
        //const {params} = match;

        return (
              <div className="fuse">
            <FusePageCarded
                classes={{
                    root   : "w-full",
                    content: "flex flex-col",
                    header : "items-center min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                header={
                    <ClusterProductAppHeader pageLayout={() => this.pageLayout}/>
                }
                     content={<ClusterProductList/>}
                contentToolbar={<ClusterProductsToolbar/>}
           
                leftSidebarHeader={
                    <ClusterProductAppSidebarHeader/>
                }
                leftSidebarContent={
                    <ClusterProductAppSidebarContent/>
                }
                onRef={instance => {
                    this.pageLayout = instance;
                }}
                innerScroll
            />
            </div>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getCategories	: Actions.getCategories,
        getClusterlist 		: Actions.getClusterlist,
    }, dispatch);
}

export default withReducer('clusterProductApp', reducer)(connect(null, mapDispatchToProps)(ClusterProductApp));
