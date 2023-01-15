import React from 'react';
import {IconButton, TextField, AppBar, Icon, Toolbar, Typography, Avatar} from '@material-ui/core';
import {FuseScrollbars} from '@fuse';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import * as Actions from './store/actions';
import { withTranslate } from 'react-redux-multilingual';

const ContactSidebar = ({contacts, closeContactSidebar, selectedContactId, translate}) => {
    const contact = contacts.find(_contact => (_contact.id === selectedContactId));
    return contact ? (
        <div className="flex flex-col flex-auto h-full">

            <AppBar position="static" color="primary" elevation={1}>

                <Toolbar className="flex justify-between items-center px-16 pr-4">
                    <Typography color="inherit" variant="subtitle1">{translate('Contact_Info')}</Typography>
                    <IconButton onClick={closeContactSidebar} color="inherit">
                        <Icon>close</Icon>
                    </IconButton>
                </Toolbar>

                <Toolbar className="flex flex-col justify-center items-center p-24">
                    <Avatar src={contact.avatar} alt={contact.name} className="w-96 h-96">
                        {!contact.avatar || contact.avatar === '' ? contact.name[0] : ''}
                    </Avatar>
                    <Typography color="inherit" className="mt-16" variant="h6">{contact.name}</Typography>
                </Toolbar>
            </AppBar>

            <FuseScrollbars className="overflow-y-auto flex-1 p-24">
                <TextField
                    label={translate('Mood')}
                    className="w-full"
                    value={contact.mood}
                    margin="normal"
                    disabled
                    multiline
                />
            </FuseScrollbars>
        </div>
    ) : '';
};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        closeContactSidebar: Actions.closeContactSidebar
    }, dispatch);
}

function mapStateToProps({chatApp})
{
    return {
        contacts         : chatApp.contacts.entities,
        selectedContactId: chatApp.contacts.selectedContactId
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslate(ContactSidebar));
