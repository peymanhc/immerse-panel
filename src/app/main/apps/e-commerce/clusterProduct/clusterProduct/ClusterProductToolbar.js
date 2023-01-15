import React from 'react';
import {Icon, IconButton} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as Actions from '../store/actions/index';

const pathToRegexp = require('path-to-regexp');

const ClusterProductToolbar = ({classes, clusterProduct, match, history, toggleStar, toggleImportant}) => {

    const {params} = match;
    const toPath = pathToRegexp.compile(match.path);
    const matchParams = {...params};
    delete matchParams['clusterProductId'];
    const deselectUrl = toPath(matchParams);

    if ( !clusterProduct )
    {
        return null;
    }

    return (
        <div className="flex flex-1 items-center justify-between overflow-hidden sm:px-16">

            <IconButton onClick={() => history.push(deselectUrl)}>
                <Icon>arrow_back</Icon>
            </IconButton>

            <div className="flex items-center justify-start" aria-label="Toggle star">
                <FuseAnimate animation="transition.expandIn" delay={100}>
                    <IconButton onClick={() => toggleStar(clusterProduct)}>
                        {clusterProduct.starred ?
                            (
                                <Icon>star</Icon>
                            )
                            :
                            (
                                <Icon>star_border</Icon>
                            )
                        }
                    </IconButton>
                </FuseAnimate>
                <FuseAnimate animation="transition.expandIn" delay={100}>
                    <IconButton onClick={() => toggleImportant(clusterProduct)}>
                        {clusterProduct.important ?
                            (
                                <Icon>label</Icon>
                            )
                            :
                            (
                                <Icon>label_outline</Icon>
                            )
                        }
                    </IconButton>
                </FuseAnimate>
            </div>
        </div>
    );
};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        toggleStar     : Actions.toggleStar,
        toggleImportant: Actions.toggleImportant
    }, dispatch);
}

function mapStateToProps({clusterProductApp})
{
    return {
        clusterProduct: clusterProductApp.clusterProduct
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ClusterProductToolbar));
