import React from 'react';
import {withStyles, Avatar, Typography, Checkbox, ListItem} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';
import _ from '@lodash';
import * as Actions from '../store/actions/index';
import ClusterProductChip from '../ClusterProductChip';

//const pathToRegexp = require('path-to-regexp');

const styles = theme => ({
    clusterProductItem: {
        borderBottom: '1px solid  ' + theme.palette.divider,

        '&.unread'  : {
            background: 'rgba(0,0,0,0.03)'
        },
        '&.selected': {
            '&::after': {
                content        : '""',
                position       : 'absolute',
                left           : 0,
                display        : 'block',
                height         : '100%',
                width          : 3,
                backgroundColor: theme.palette.primary.main
            }
        }
    },
    avatar  : {
        backgroundColor: theme.palette.primary[500]
    }
});

const ClusterProductListItem = ({clusterProduct, labels, classes, match, history, selectedClusterProductIds, toggleInSelectedClusterProducts}) => {

    //const toPath = pathToRegexp.compile(match.path);
  //  clusterProduct.name="@@";
    const checked = selectedClusterProductIds.length > 0 && selectedClusterProductIds.find(id => id === clusterProduct.id) !== undefined;
	
	let image = undefined;
	
	if(clusterProduct.images.length){
		if(clusterProduct.featuredImageId)
			image = clusterProduct.images.find(item => item.id === clusterProduct.featuredImageId);		
		else
			image = clusterProduct.images[0];
	}
	let time = "";
	let clusterProductLabels = [];
	
	
    return (
        <ListItem
            dense
            button
            onClick={() => history.push('/apps/e-commerce/products/' + clusterProduct.id + '/' + clusterProduct.handle)}
            className={classNames(classes.clusterProductItem, checked && "selected", !clusterProduct.read && "unread", "py-16 pl-0 pr-8 sm:pl-8 sm:pr-24")}
		>

            <Checkbox
                tabIndex={-1}
                disableRipple
                checked={checked}
                onChange={() => toggleInSelectedClusterProducts(clusterProduct.id)}
                onClick={(ev) => ev.stopPropagation()}
            />

            <div className="flex flex-1 flex-col relative overflow-hidden">

                <div className="flex items-center justify-between px-16 pb-8">
                    <div className="flex items-center">
                        {image ? (
                            <Avatar className="mr-8" alt={clusterProduct.name} src={image.url}/>
                        ) : (
                            <Avatar className={classNames(classes.avatar, "mr-8")}>
                                {clusterProduct.name[0]}
                            </Avatar>
                        )}
                        <Typography variant="subtitle1">{clusterProduct.name}</Typography>
                    </div>
                    <Typography variant="subtitle1">{time}</Typography>
                </div>

                <div className="flex flex-col px-16 py-0">
                    <Typography className="truncate">{clusterProduct.info}</Typography>
                    <Typography color="textSecondary" className="truncate">{_.truncate(clusterProduct.description.replace(/<(?:.|\n)*?>/gm, ''), {'length': 180})}</Typography>
                </div>

                <div className="flex justify-end">
                    {labels && clusterProductLabels.map(label => (
                        <ClusterProductChip className="mr-4" title={_.find(labels, {id: label}).title} color={_.find(labels, {id: label}).color} key={label}/>
                    ))}
                </div>
            </div>
        </ListItem>
    );
};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        toggleInSelectedClusterProducts: Actions.toggleInSelectedClusterProducts
    }, dispatch);
}

function mapStateToProps({clusterProductApp})
{
    return {
        selectedClusterProductIds: clusterProductApp.clusterProducts.selectedClusterProductIds,
        labels         : clusterProductApp.labels
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(ClusterProductListItem)));
