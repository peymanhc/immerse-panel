import React, {Component} from 'react';
import {Icon, MenuItem, TextField} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import { withTranslate } from 'react-redux-multilingual';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {selectAds} from './store/actions';

class ClusterProductAppSidebarHeader extends Component {

    onAccountChange = ev => this.props.selectAds(ev.target.value);

    render()
    {
		const {translate, clusterlist, clusterSelected} = this.props; 
        return (
            <div className="flex flex-col justify-center h-full p-4  ">

                <div className="flex items-center flex-1">
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <Icon className="mr-16 text-32">shopping_basket</Icon>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                        <span className="text-24">{translate('Products')}</span>
                    </FuseAnimate>
                </div>

                <FuseAnimate className="mb-14" animation="transition.slideUpIn" delay={300}  >
                    <TextField
                        id="account-selection"
                        select
                        value={clusterSelected}
                        onChange={this.onAccountChange}
                        placeholder={translate('Select_Account')}
                        margin="normal"
                    >
                        {clusterlist.map(cluster => (
                            <MenuItem key={cluster.id} value={cluster.id}>
                                {cluster.name}
                            </MenuItem>
                        ))}
                            <MenuItem value={''}>
                                None
                            </MenuItem>						
                    </TextField>
                </FuseAnimate>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        selectAds
    }, dispatch);
}
function mapStateToProps({clusterProductApp})
{
    return {
        clusterlist     	: clusterProductApp.clusterProducts.clusterlist,
        clusterSelected	: clusterProductApp.clusterProducts.clusterSelected,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslate(ClusterProductAppSidebarHeader));