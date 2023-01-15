import React, {Component} from 'react';
import {withStyles, List, Typography} from '@material-ui/core';
import {FuseUtils, FuseAnimate, FuseAnimateGroup} from '@fuse';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from '@lodash';
import * as Actions from '../store/actions';
import ClusterProductListItem from './ClusterProductListItem';
import { withTranslate } from 'react-redux-multilingual';
import '../RTL.css';

const styles = theme => ({
    avatar: {
        backgroundColor: theme.palette.primary[500]
    }
});

class ClusterProductList extends Component {

    componentDidMount()
    {
        this.props.getClusterProducts(this.props.match.params);
    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.location, prevProps.location) )
        {
            this.props.getClusterProducts(this.props.match.params);
        }
    }

    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map((id) => entities[id]);
        if ( searchText.length === 0 )
        {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    render()
    {
        const {clusterProducts, searchText, translate, clusterSelected} = this.props;

        let arr = this.getFilteredArray(clusterProducts, searchText);
		
		if(clusterSelected !== "")
			arr = arr.filter(item => item.clusterId === clusterSelected);

        if ( arr.length === 0 ) 
        {
            return (
                <FuseAnimate delay={100}>
                    <div className="flex flex-1 items-center justify-center h-full">
                        <Typography color="textSecondary" variant="h5">
                            {translate('There_are_no_messages')}
                        </Typography>
                    </div>
                </FuseAnimate>
            );
        }

        return ( 
        <div className="fuse">
            <List className="p-0">
                <FuseAnimateGroup
                    enter={{
                        animation: "transition.slideUpBigIn"
                    }}
                >
                    {
                        arr.map((clusterProduct) => (
                                <ClusterProductListItem clusterProduct={clusterProduct} key={clusterProduct.id}/>
                            )
                        )
                    }
                </FuseAnimateGroup>
            </List>
         </div>   
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getClusterProducts: Actions.getClusterProducts
    }, dispatch);
}

function mapStateToProps({clusterProductApp})
{
    return {
        clusterProducts     : clusterProductApp.clusterProducts.entities,
        searchText		: clusterProductApp.clusterProducts.searchText,
        clusterSelected		: clusterProductApp.clusterProducts.clusterSelected,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(withTranslate(ClusterProductList))));
