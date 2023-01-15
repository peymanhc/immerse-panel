import React, {Component} from 'react';
import {Checkbox, Icon, IconButton} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as Actions from '../store/actions/index';
import { withTranslate } from 'react-redux-multilingual';

class ClusterProductToolbar extends Component {

    state = {
    };

    handleChange = () => event => {
        event.target.checked ? this.props.selectAllClusterProducts() : this.props.deselectAllClusterProducts();
    };

    render()
    {
        const {clusterProducts, removeProducts, selectedClusterProductIds} = this.props;

        return (
            <div className="flex flex-1 items-center sm:px-8">

                <Checkbox
                    onChange={this.handleChange()}
                    checked={selectedClusterProductIds.length === Object.keys(clusterProducts).length && selectedClusterProductIds.length > 0}
                    indeterminate={selectedClusterProductIds.length !== Object.keys(clusterProducts).length && selectedClusterProductIds.length > 0}
                />

                {selectedClusterProductIds.length > 0 && (
                    <React.Fragment>
                        <IconButton
                            onClick={(ev) => removeProducts(selectedClusterProductIds)}
                            aria-label="Delete"
                        >
                            <Icon>delete</Icon>
                        </IconButton>
                    </React.Fragment>
                )}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        selectAllClusterProducts            : Actions.selectAllClusterProducts,
        deselectAllClusterProducts          : Actions.deselectAllClusterProducts,
        removeProducts          		: Actions.removeProducts,

    }, dispatch);
}

function mapStateToProps({clusterProductApp})
{
    return {
        clusterProducts          	: clusterProductApp.clusterProducts.entities,
        selectedClusterProductIds	: clusterProductApp.clusterProducts.selectedClusterProductIds,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withTranslate(ClusterProductToolbar)));
