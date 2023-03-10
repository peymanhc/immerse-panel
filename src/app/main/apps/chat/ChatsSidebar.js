import {FuseScrollbars, FuseAnimateGroup, FuseUtils} from '@fuse';
import {withStyles, AppBar, Avatar, ListItemIcon, List, ListItem, ListItemText, Menu, MenuItem, Typography, Toolbar, Icon, IconButton, Input, Paper} from '@material-ui/core';
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';
import moment from "moment";
import * as Actions from "./store/actions";
import StatusIcon from "./StatusIcon";
import { withTranslate } from 'react-redux-multilingual';


const styles = theme => ({
    contactListItem: {
        borderBottom: '1px solid ' + theme.palette.divider,
        '&.active'  : {
            backgroundColor: theme.palette.background.paper
        }
    },
    unreadBadge    : {
        backgroundColor: theme.palette.secondary.main,
        color          : theme.palette.secondary.contrastText
    }
});

class ChatsSidebar extends Component {
	

    state = {
        statusSwitchEl : null,
        chatsMoreMenuEl: null,
        searchText     : ''
    };

    handleContactClick = (contactId) => { 
        this.props.getChat(contactId);
    };

    chatsMoreMenuClick = (event) => {
        this.setState({chatsMoreMenuEl: event.currentTarget});
    };

    chatsMoreMenuClose = (event) => {
        this.setState({chatsMoreMenuEl: null});
    };

    statusSwitchClick = (event) => {
        event.preventDefault();
        event.stopPropagation();

        this.setState({statusSwitchEl: event.currentTarget});
    };

    statusSwitchClose = (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.setState({statusSwitchEl: null});
    };


    getFilteredArray = (arr, searchText) => {
        if ( searchText.length === 0 )
        {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    setSearchText = event => {
        this.setState({searchText: event.target.value})
    };

    render()
    {
        const {classes, contacts, user, selectedContactId, openUserSidebar, translate} = this.props;
        const {statusSwitchEl, chatsMoreMenuEl, searchText} = this.state;
		const statusArr = [
			{
				title: this.props.translate('Online'),
				value: 'online'
			},
			{
				title: this.props.translate('Away'),
				value: 'away'
			},
			{
				title: this.props.translate('Do_not_disturb'),
				value: 'do-not-disturb'
			},
			{
				title: this.props.translate('Offline'),
				value: 'offline'
			}
		];
		
		let newContact = [];
		let newUserChatList = [];
		try{ //new filter for just users exist
			if(user.chatList !== undefined){
				newContact = contacts.filter((_contact) => {			 
					const found = user.chatList.find(({contactId}) => contactId === _contact.id);
					if(found)
						return true;
					return false;
				});	
				
				newUserChatList = user.chatList.filter(({contactId}) => {
					const found = newContact.find(_contact => contactId === _contact.id);
					if(found)
						return true;
					return false;				
				});				
			}
		}
		catch(err){
			//console.log(err);
		}	
		
        const chatListContacts = user && user.chatList ? newUserChatList.map((_chat) => {
			const c = newContact.find((_contact) => _contact.id === _chat.contactId);
			if(c)
				return {
					..._chat,
					...c
				}
			else
				return _chat;
		}) : [];

        const chatListArr = this.getFilteredArray([...chatListContacts], searchText);
        const contactsArr = this.getFilteredArray([...newContact], searchText);

        const ContactListItem = ({contact}) => { 
            return (
                <ListItem
                    button
                    className={classNames(classes.contactListItem, "px-16 py-12 min-h-92", {'active': (selectedContactId === contact.id)})}
                    onClick={() => this.handleContactClick(contact.id)}
                >
                    <div className="relative">

                        <div className="absolute pin-r pin-b -m-4 z-10">
                            <StatusIcon status={contact.status}/>
                        </div>

                        <Avatar src={contact.avatar} alt={contact.name}>
                            {!contact.avatar || contact.avatar === '' ? contact.name[0] : ''}
                        </Avatar>
                    </div>

                    <ListItemText
                        classes={{
                            root     : "min-w-px",
                            secondary: "truncate"
                        }}
                        primary={contact.name}
                        secondary={contact.mood}
                    />

                    {contact.chatId && (
                        <div className="flex flex-col justify-center items-end">
                            {contact.lastMessageTime && (
                                <Typography className="whitespace-no-wrap mb-8">
                                    {moment(contact.lastMessageTime).format('ll')}
                                </Typography>
                            )}
                            {contact.unread && (
                                <div
                                    className={classNames(classes.unreadBadge, "flex items-center justify-center min-w-24 h-24 rounded-full text-14 text-center")}>{contact.unread}</div>
                            )}
                        </div>
                    )}
                </ListItem>
            )
        };
		
        return (
            <div className="flex flex-col flex-auto h-full">
                <AppBar
                    className={classes.contentToolbar}
                    position="static"
                    color="default"
                    elevation={1}
                >
                    <Toolbar className="flex justify-between items-center px-16 pr-4">

                        {user && (
                            <div className="relative w-40 h-40 p-0 cursor-pointer" onClick={openUserSidebar}>

                                <Avatar src={user.avatar} alt={user.name} className="w-40 h-40">
                                    {(!user.avatar || user.avatar === '') ? user.name[0] : ''}
                                </Avatar>

                                <div
                                    className="absolute pin-r pin-b -m-4 z-10 cursor-pointer"
                                    aria-owns={statusSwitchEl ? 'switch-menu' : null}
                                    aria-haspopup="true"
                                    onClick={this.statusSwitchClick}
                                >
                                    <StatusIcon status={user.status}/>
                                </div>

                                <Menu
                                    id="status-switch"
                                    anchorEl={statusSwitchEl}
                                    open={Boolean(statusSwitchEl)}
                                    onClose={this.statusSwitchClose}
                                >
                                    {statusArr.map((status) => (
                                        <MenuItem onClick={this.statusSwitchClose} key={status.value}>
                                            <ListItemIcon>
                                                <StatusIcon status={status.value}/>
                                            </ListItemIcon>
                                            <ListItemText primary={status.title}/>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </div>
                        )}

                        <div>
                            <IconButton
                                aria-owns={chatsMoreMenuEl ? 'chats-more-menu' : null}
                                aria-haspopup="true"
                                onClick={this.chatsMoreMenuClick}
                            >
                                <Icon>more_vert</Icon>
                            </IconButton>
                            <Menu
                                id="chats-more-menu"
                                anchorEl={chatsMoreMenuEl}
                                open={Boolean(chatsMoreMenuEl)}
                                onClose={this.chatsMoreMenuClose}
                            >
                                <MenuItem onClick={this.chatsMoreMenuClose}>{translate('Profile')}</MenuItem>
                                <MenuItem onClick={this.chatsMoreMenuClose}>{translate('Logout')}</MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                    <Toolbar className="px-16">
                        <Paper className="flex p-4 items-center w-full px-8 py-4 rounded-8" elevation={1}>

                            <Icon className="mr-8" color="action">search</Icon>

                            <Input
                                placeholder={translate('Search_or_start_new_chat')}
                                className="flex flex-1"
                                disableUnderline
                                fullWidth
                                value={searchText}
                                inputProps={{
                                    'aria-label': 'Search'
                                }}
                                onChange={this.setSearchText}
                            />
                        </Paper>
                    </Toolbar>
                </AppBar>
                <FuseScrollbars className="overflow-y-auto flex-1">
                    <List className="w-full">
                        {newContact.length > 0 && (
                            <React.Fragment>
                                <FuseAnimateGroup
                                    enter={{
                                        animation: "transition.expandIn"
                                    }}
                                    className="flex flex-col flex-no-shrink"
                                >
                                    {chatListArr.length > 0 && (
                                        <Typography
                                            className="font-300 text-20 px-16 py-24"
                                            color="secondary"
                                        >
                                            {translate('Chats')}
                                        </Typography>
                                    )}

                                    {chatListArr.map(contact => (
                                        <ContactListItem key={contact.id} contact={contact}/>
                                    ))}

                                    {contactsArr.length > 0 && (
                                        <Typography
                                            className="font-300 text-20 px-16 py-24"
                                            color="secondary"
                                        >
                                            {translate('Contacts')}
                                        </Typography>
                                    )}

                                    {contactsArr.map(contact => (
                                        <ContactListItem key={contact.id} contact={contact}/>
                                    ))}
                                </FuseAnimateGroup>
                            </React.Fragment>
                        )}
                    </List>
                </FuseScrollbars>
            </div>
        )
    };
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getChat        : Actions.getChat,
        openUserSidebar: Actions.openUserSidebar,
    }, dispatch);
}

function mapStateToProps({chatApp})
{
    return {
        contacts         : chatApp.contacts.entities,
        selectedContactId: chatApp.contacts.selectedContactId,
        user             : chatApp.user
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(withTranslate(ChatsSidebar)));
