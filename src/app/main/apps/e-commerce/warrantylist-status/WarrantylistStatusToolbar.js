import React, {Component} from 'react';
import {Icon, IconButton, MenuItem, FormControl, Select} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../store/actions';
import { withTranslate } from 'react-redux-multilingual';

class WarrantylistStatusLabelToolbar extends Component {

    handleWarrantyChange = (ev) => {
        this.props.changeWarranty(ev.target.value);
    };

    render()
    {
        const {orderBy, orderDescending, toggleWarrantyDescending, translate} = this.props;

        return (
            <div className="flex justify-between w-full">
                <div className="flex"/>
                <div className="flex items-center">
                    <FormControl className="">
                        <Select
                            value={orderBy}
                            onChange={this.handleWarrantyChange}
                            displayEmpty
                            name="filter"
                            className=""
                        >
                            <MenuItem value="">
                                <em>{translate('Warranty_by')}</em>
                            </MenuItem>
                            <MenuItem value="title">{translate('Title')}</MenuItem>
                        </Select>
                    </FormControl>
                    <IconButton onClick={toggleWarrantyDescending}>
                        <Icon style={{transform: orderDescending ? 'scaleY(-1)' : 'scaleY(1)'}}>
                            sort
                        </Icon>
                    </IconButton>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        changeWarranty          : Actions.changeWarrantylistStatusWarranty,
        toggleWarrantyDescending: Actions.toggleWarrantylistStatusWarrantyDescending
    }, dispatch);
}

function mapStateToProps({WarrantylistStatusApp})
{ 
    return {
        orderBy        : WarrantylistStatusApp.warrantylistStatus.orderBy,
        orderDescending: WarrantylistStatusApp.warrantylistStatus.orderDescending
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslate(WarrantylistStatusLabelToolbar));
