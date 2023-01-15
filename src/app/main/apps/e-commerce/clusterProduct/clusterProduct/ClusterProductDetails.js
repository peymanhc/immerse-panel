import React, {Component} from 'react';
import {Avatar, Divider, Icon, IconButton, Typography} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import _ from '@lodash';
import * as Actions from '../store/actions/index';
import ClusterProductChip from '../ClusterProductChip';
import { withTranslate } from 'react-redux-multilingual';

class ClusterProductDetails extends Component {

    state = {showDetails: false};

    componentDidMount()
    {
        //this.props.getClusterProduct(this.props.match.params);
    }

    render()
    {
        const {clusterProduct, labels, translate} = this.props;

        if ( !clusterProduct )
        {
            return '';
        }

        return (
            <div className="p-16 sm:p-24">
                <div className="flex items-center justify-between overflow-hidden">

                    <div className="flex flex-col">
                        <FuseAnimate delay={100}>
                            <Typography variant="subtitle1" className="flex">{clusterProduct.subject}</Typography>
                        </FuseAnimate>

                        {labels && clusterProduct.labels.length > 0 && (
                            <div className="flex flex-wrap mt-8">
                                {clusterProduct.labels.map(label => (
                                    <ClusterProductChip className="mt-4 mr-4" title={_.find(labels, {id: label}).title} color={_.find(labels, {id: label}).color} key={label}/>
                                ))}
                            </div>
                        )}
                    </div>

                </div>

                <Divider className="my-16"/>

                <FuseAnimate animation="transition.slideUpIn" delay={200}>
                    <div>

                        <div className="flex items-start justify-between">

                            <div className="flex items-center justify-start">
                                {clusterProduct.from.avatar ?
                                    (
                                        <Avatar className="mr-8" alt={clusterProduct.from.name} src={clusterProduct.from.avatar}/>
                                    )
                                    :
                                    (
                                        <Avatar className="mr-8">
                                            {clusterProduct.from.name[0]}
                                        </Avatar>
                                    )
                                }

                                <div className="flex flex-col">
                                    <span>{clusterProduct.from.name}</span>
                                    <Typography component="div" color="textSecondary" variant="body1" className="flex items-center justify-start">
                                        <div>{translate('To')}</div>
                                        <div className="ml-4">{clusterProduct.to[0].name}</div>
                                    </Typography>
                                </div>
                            </div>
                            <IconButton>
                                <Icon>more_vert</Icon>
                            </IconButton>
                        </div>

                        <div className="my-16">
                            <Typography
                                color="primary"
                                className="cursor-pointer underline mb-18"
                                onClick={() => {
                                    this.setState({showDetails: !this.state.showDetails});
                                }}
                            >
                                {this.state.showDetails ?
                                    (
                                        <span>{translate('Hide_Details')}</span>
                                    )
                                    :
                                    (
                                        <span>{translate('Show_Details')}</span>
                                    )
                                }
                            </Typography>

                            {this.state.showDetails && (
                                <div className="flex">
                                    <Typography variant="body2" className="flex flex-col">
                                        <span>{translate('From_academy')}:</span>
                                        <span>{translate('To')}:</span>
                                        <span>{translate('Date')}:</span>
                                    </Typography>

                                    <Typography variant="body2" color="textSecondary" className="pl-4 flex flex-col">
                                        <span>{clusterProduct.from.eclusterProduct}</span>
                                        <span>{clusterProduct.to[0].eclusterProduct}</span>
                                        <span>{clusterProduct.time}</span>
                                    </Typography>
                                </div>
                            )}
                        </div>

                        <Typography variant="body2" dangerouslySetInnerHTML={{__html: clusterProduct.message}}/>

                        <Divider className="my-16"/>

                        {clusterProduct.attachments && (
                            <div>
                                <Typography variant="subtitle1" className="mb-16">
                                    <span>Attachments</span>
                                    <span className="ml-4">({clusterProduct.attachments.length})</span>
                                </Typography>

                                <div className="flex flex-wrap">
                                    {clusterProduct.attachments.map(attachment => (
                                        <div className="w-192 pr-16 pb-16" key={attachment.fileName}>
                                            <img className="w-full rounded-4" src={attachment.preview} alt={attachment.fileName}/>
                                            <div className="flex flex-col">
                                                <Typography color="primary" className="underline cursor-pointer" onClick={event => event.preventDefault()}>{translate('View')}</Typography>
                                                <Typography color="primary" className="underline cursor-pointer" onClick={event => event.preventDefault()}>{translate('Download')}</Typography>
                                                <Typography>({attachment.size})</Typography>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </FuseAnimate>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getClusterProduct: Actions.getClusterProduct
    }, dispatch);
}

function mapStateToProps({clusterProductApp})
{
    return {
        clusterProduct  : clusterProductApp.clusterProduct,
        labels: clusterProductApp.labels
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withTranslate(ClusterProductDetails)));
