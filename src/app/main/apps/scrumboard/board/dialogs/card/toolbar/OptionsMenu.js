import React, {Component} from 'react';
import {Icon, IconButton, MenuItem} from '@material-ui/core';
import ToolbarMenu from './ToolbarMenu';
import { withTranslate } from 'react-redux-multilingual';

class OptionsMenu extends Component {

    state = {
        anchorEl: null
    };

    handleMenuClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleMenuClose = () => {
        this.setState({anchorEl: null});
    };

    render()
    {
        const {onRemoveCard, translate} = this.props;

        return (
            <div>
                <IconButton color="inherit" onClick={this.handleMenuClick}>
                    <Icon>more_horiz</Icon>
                </IconButton>
                <ToolbarMenu state={this.state.anchorEl} onClose={this.handleMenuClose}>
                    <MenuItem onClick={onRemoveCard}>
                        {translate('Remove_Card')}
                    </MenuItem>
                </ToolbarMenu>
            </div>
        );
    };
}

export default withTranslate(OptionsMenu);
