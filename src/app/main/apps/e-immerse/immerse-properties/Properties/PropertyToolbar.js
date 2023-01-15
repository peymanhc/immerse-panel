import React, {Component} from 'react';
import {Icon, IconButton, MenuItem, FormControl, Select} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../store/actions';

class PropertyToolbar extends Component {

    handleOrderChange = (ev) => {
        this.props.changeOrder(ev.target.value);
    };

    render()
    {
        const {orderBy, orderDescending, toggleOrderDescending} = this.props;

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
                                <em>Order by</em>
                            </MenuItem>
                            <MenuItem value="title">Title</MenuItem>
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

function mapStateToProps({immersePropertyApp})
{
    return {
        orderBy        : immersePropertyApp.propertys.orderBy,
        orderDescending: immersePropertyApp.propertys.orderDescending
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PropertyToolbar));
