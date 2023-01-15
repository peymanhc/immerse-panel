import React, {Component} from 'react';
import {Icon, IconButton, InputAdornment, MenuItem, TextField} from '@material-ui/core';
import ToolbarMenu from 'app/main/apps/scrumboard/board/dialogs/card/toolbar/ToolbarMenu';
import moment from 'moment';
import { withTranslate } from 'react-redux-multilingual';

class DueMenu extends Component {

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
        const {due, onRemoveDue, onDueChange, translate} = this.props;
        const dueDate = due ? moment(due).format(moment.HTML5_FMT.DATE) : "";

        return (
            <div>
                <IconButton color="inherit" onClick={this.handleMenuClick}>
                    <Icon>today</Icon>
                </IconButton>
                <ToolbarMenu state={this.state.anchorEl} onClose={this.handleMenuClose}>
                    {due ? (
                        <MenuItem
                            onClick={(ev) => {
                                onRemoveDue();
                                this.handleMenuClose(ev);
                            }}
                        >
                            {translate('Remove_Due_Date')}
                        </MenuItem>
                    ) : (
                        <div className="p-16">
                            <TextField
                                label={translate('Due_date')}
                                type="date"
                                name="card.due"
                                value={dueDate}
                                onChange={(ev) => {
                                    onDueChange(ev);
                                    this.handleMenuClose(ev)
                                }}
                                placeholder={translate('Choose_a_due_date')}
                                className=""
                                InputLabelProps={{
                                    shrink: true
                                }}
                                variant="outlined"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Icon color="action">today</Icon>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </div>
                    )}
                </ToolbarMenu>
            </div>
        );
    };
}

export default withTranslate(DueMenu);
