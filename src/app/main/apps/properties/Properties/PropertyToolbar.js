import React, {Component} from 'react';
import {Icon, IconButton, MenuItem, FormControl, Select} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../store/actions';
import { withTranslate } from 'react-redux-multilingual';

class PropertyToolbar extends Component {

    handleOrderChange = (ev) => {
        this.props.changeOrder(ev.target.value);
    };

    render()
    {
        const {orderBy, orderDescending, toggleOrderDescending, translate} = this.props;

        return (
            <div className="flex justify-between w-full">
                <div className="flex"/>
                <div className="flex items-center">
                    <FormControl className="">
                        <Select
                            value={orderBy}
                            onChange={this.handleOrderChange}
                            displayEmpty
                            name="filter"
                            className=""
                        >
                            <MenuItem value="">
                                <em>{translate('Order_by')}</em>
                            </MenuItem>
                            <MenuItem value="title">{translate('Title')}</MenuItem>
                        </Select>
                    </FormControl>
                    <IconButton onClick={toggleOrderDescending}>
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
        changeOrder          : Actions.changeOrder,
        toggleOrderDescending: Actions.toggleOrderDescending
    }, dispatch);
}

function mapStateToProps({PropertyApp})
{
    return {
        orderBy        : PropertyApp.propertys.orderBy,
        orderDescending: PropertyApp.propertys.orderDescending
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withTranslate(PropertyToolbar)));
