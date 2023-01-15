import React, {Component} from 'react';
import {Icon, MenuItem, TextField} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import { withTranslate } from 'react-redux-multilingual';

class TodoSidebarHeader extends Component {

    state = {
        selectedAccount: 'creapond'
    };

    onAccountChange = (ev) => {
        this.setState({selectedAccount: ev.target.value});
    };

    accounts = {
        'creapond'    : 'johndoe@creapond.com',
        'withinpixels': '09120811016'
    };

    render()
    {
		const {translate} = this.props;
        return (
            <div className="flex flex-col justify-center h-full p-4">

                <div className="flex items-center flex-1">
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <Icon className="text-32 mr-16">check_box</Icon>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                        <span className="text-24">{translate('To_Do')}</span>
                    </FuseAnimate>
                </div>

                <FuseAnimate animation="transition.slideUpIn" delay={300}>
                    <TextField
                        id="account-selection"
                        select
                        label={this.state.selectedAccount}
                        value={this.state.selectedAccount}
                        onChange={this.onAccountChange}
                        placeholder={translate('Select_Account')}
                        margin="normal"
                    >
                        {Object.keys(this.accounts).map((key, value) => (
                            <MenuItem key={key} value={key}>
                                {this.accounts[key]}
                            </MenuItem>
                        ))}
                    </TextField>
                </FuseAnimate>
            </div>
        );
    }
}

export default withTranslate(TodoSidebarHeader);
