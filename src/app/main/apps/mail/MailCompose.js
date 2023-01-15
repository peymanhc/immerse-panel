import React, {Component} from 'react';
import {TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar} from '@material-ui/core';
import _ from '@lodash';
import MailAttachment from './MailAttachment';
import { withTranslate } from 'react-redux-multilingual';

class MailCompose extends Component {

    state = {
        composeDialog: false,
        from         : 'johndoe@creapond.com',
        to           : '',
        cc           : '',
        bcc          : '',
        subject      : '',
        message      : ''
    };

    openComposeDialog = () => {
        this.setState({composeDialog: true});
    };

    closeComposeDialog = () => {
        this.setState({composeDialog: false});
    };

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    render()
    {
		const {translate} = this.props;
        return (
            <div className="p-24">

                <Button
                    variant="contained"
                    color="primary"
                    className="w-full"
                    onClick={this.openComposeDialog}
                >
                    {translate('COMPOSE')}
                </Button>

                <Dialog
                    open={this.state.composeDialog}
                    onClose={this.closeComposeDialog}
                    aria-labelledby="form-dialog-title"
                >
                    <AppBar position="static">
                        <Toolbar className="flex w-full">
                            <Typography variant="subtitle1" color="inherit">
                                {translate('New_Message')}
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <DialogContent classes={{root: "p-16 pb-0 sm:p-24 sm:pb-0"}}>

                        <TextField
                            className="mt-8 mb-16"
                            label={translate('From_academy')}
                            id="from"
                            name="from"
                            value={this.state.from}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                            disabled
                        />

                        <TextField
                            className="mt-8 mb-16"
                            label={translate('To')}
                            autoFocus
                            id="to"
                            name="to"
                            value={this.state.to}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                            required
                        />

                        <TextField
                            className="mt-8 mb-16"
                            label={translate('Cc')}
                            id="cc"
                            name="cc"
                            value={this.state.cc}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />

                        <TextField
                            className="mt-8 mb-16"
                            label={translate('Bcc')}
                            id="bcc"
                            name="bcc"
                            value={this.state.bcc}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />

                        <TextField
                            className="mt-8 mb-16"
                            label={translate('Subject')}
                            id="subject"
                            name="subject"
                            value={this.state.subject}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />

                        <TextField
                            className="mt-8 mb-16"
                            id="message"
                            name="message"
                            onChange={this.handleChange}
                            label={translate('Message')}
                            type="text"
                            multiline
                            rows={5}
                            variant="outlined"
                            fullWidth
                        />

                        <div className="pt-8">
                            <MailAttachment fileName="attachment-2.doc" size="12 kb"/>
                            <MailAttachment fileName="attachment-1.jpg" size="350 kb"/>
                        </div>
                    </DialogContent>

                    <DialogActions className="justify-between pl-8 sm:pl-16">
                        <div>
                            <Button variant="contained" color="primary" onClick={this.closeComposeDialog}>
                                {translate('Send')}
                            </Button>
                            <IconButton>
                                <Icon>attach_file</Icon>
                            </IconButton>
                        </div>
                        <IconButton onClick={this.closeComposeDialog}>
                            <Icon>delete</Icon>
                        </IconButton>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withTranslate(MailCompose);
