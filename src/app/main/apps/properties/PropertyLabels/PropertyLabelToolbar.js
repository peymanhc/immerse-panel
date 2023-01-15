import React, {Component} from 'react';
import {Icon, IconButton, MenuItem, FormControl, Select} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../store/actions';
import { withTranslate } from 'react-redux-multilingual';

class PropertyLabelToolbar extends Component {

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
        changeOrder          : Actions.changePropertyLabelsOrder,
        toggleOrderDescending: Actions.togglePropertyLabelsOrderDescending
    }, dispatch);
}

function mapStateToProps({PropertyApp})
{ 
    return {
        orderBy        : PropertyApp.propertylabels.orderBy,
        orderDescending: PropertyApp.propertylabels.orderDescending
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslate(PropertyLabelToolbar));
