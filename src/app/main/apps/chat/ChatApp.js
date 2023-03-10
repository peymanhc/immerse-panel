import React from 'react';
import {withStyles, Drawer, AppBar, Toolbar, Typography, IconButton, Hidden, Avatar, Icon, Paper, Button} from '@material-ui/core';
import {fade} from '@material-ui/core/styles/colorManipulator';
import classNames from 'classnames';
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import withReducer from 'app/store/withReducer';
import * as Actions from "./store/actions";
import Chat from "./Chat";
import ChatsSidebar from "./ChatsSidebar";
import StatusIcon from "./StatusIcon";
import ContactSidebar from './ContactSidebar';
import UserSidebar from './UserSidebar';
import reducer from './store/reducers';
import { withTranslate } from 'react-redux-multilingual';

const drawerWidth = 400;
const headerHeight = 200;

const styles = theme => ({
    root              : {
        display        : 'flex',
        flexDirection  : 'row',
        minHeight      : '100%',
        position       : 'relative',
        flex           : '1 1 auto',
        height         : 'auto',
        backgroundColor: theme.palette.background.default
    },
    topBg             : {
        position       : 'absolute',
        left           : 0,
        right          : 0,
        top            : 0,
        height         : headerHeight,
        backgroundImage: 'url("../../assets/images/backgrounds/header-bg.png")',
        backgroundColor: theme.palette.primary.dark,
        backgroundSize : 'cover',
        pointerEvents  : 'none'
    },
    contentCardWrapper: {
        position                      : 'relative',
        padding                       : 24,
        maxWidth                      : 1400,
        display                       : 'flex',
        flexDirection                 : 'column',
        flex                          : '1 0 auto',
        width                         : '100%',
        minWidth                      : '0',
        maxHeight                     : '100%',
        margin                        : '0 auto',
        [theme.breakpoints.down('sm')]: {
            padding: 16
        },
        [theme.breakpoints.down('xs')]: {
            padding: 12
        }
    },
    contentCard       : {
        display        : 'flex',
        position       : 'relative',
        flex           : '1 1 100%',
        flexDirection  : 'row',
        backgroundImage: 'url("/assets/images/patterns/rain-grey.png")',
        backgroundColor: theme.palette.background.paper,
        boxShadow      : theme.shadows[1],
        borderRadius   : 8,
        minHeight      : 0,
        overflow       : 'hidden'
    },
    drawerPaper       : {
        width                       : drawerWidth,
        maxWidth                    : '100%',
        overflow                    : 'hidden',
        height                      : '100%',
        [theme.breakpoints.up('md')]: {
            position: 'relative'
        }
    },
    contentWrapper    : {
        display      : 'flex',
        flexDirection: 'column',
        flex         : '1 1 100%',
        zIndex       : 10,
        background   : `linear-gradient(to bottom, ${fade(theme.palette.background.paper, 0.8)} 0,${fade(theme.palette.background.paper, 0.6)} 20%,${fade(theme.palette.background.paper, 0.8)})`
    },
    content           : {
        display  : 'flex',
        flex     : '1 1 100%',
        minHeight: 0
    }
});

class ChatApp extends React.Component {

    componentDidMount()
    {
        this.props.getUserData();
        this.props.getContacts();
    }

    render()
    {
        const {classes, chat, selectedContactId, contacts, mobileChatsSidebarOpen, openMobileChatsSidebar, 
			closeMobileChatsSidebar, userSidebarOpen, closeUserSidebar, contactSidebarOpen, openContactSidebar, closeContactSidebar, translate
		} = this.props;
        const selectedContact = contacts.find(_contact => (_contact.id === selectedContactId));

        return (
            <div className={classNames(classes.root)}>

                <div className={classes.topBg}/>

                <div className={classNames(classes.contentCardWrapper, 'container')}>

                    <div className={classes.contentCard}>

                        <Hidden mdUp>
                            <Drawer
                                className="h-full absolute z-20"
                                variant="temporary"
                                anchor="left"
                                open={mobileChatsSidebarOpen}
                                onClose={closeMobileChatsSidebar}
                                classes={{
                                    paper: classNames(classes.drawerPaper, "absolute pin-l")
                                }}
                                ModalProps={{
                                    keepMounted  : true,
                                    disablePortal: true,
                                    BackdropProps: {
                                        classes: {
                                            root: "absolute"
                                        }
                                    }
                                }}
                            >
                                <ChatsSidebar/>
                            </Drawer>
                        </Hidden>
                        <Hidden smDown>
                            <Drawer
                                className="h-full z-20"
                                variant="permanent"
                                open
                                classes={{
                                    paper: classes.drawerPaper
                                }}
                            >
                                <ChatsSidebar/>
                            </Drawer>
                        </Hidden>
                        <Drawer
                            className="h-full absolute z-30"
                            variant="temporary"
                            anchor="left"
                            open={userSidebarOpen}
                            onClose={closeUserSidebar}
                            classes={{
                                paper: classNames(classes.drawerPaper, "absolute pin-l")
                            }}
                            ModalProps={{
                                keepMounted  : true,
                                disablePortal: true,
                                BackdropProps: {
                                    classes: {
                                        root: "absolute"
                                    }
                                }
                            }}
                        >
                            <UserSidebar/>
                        </Drawer>

                        <main className={classNames(classes.contentWrapper, "z-10")}>
                            {!chat ?
                                (
                                    <div className="flex flex-col flex-1 items-center justify-center p-24">
                                        <Paper className="rounded-full p-48">
                                            <Icon className="block text-64" color="secondary">chat</Icon>
                                        </Paper>
                                        <Typography variant="h6" className="my-24">{translate('Chat_App')}</Typography>
                                        <Typography className="hidden md:flex px-16 pb-24 mt-24 text-center" color="textSecondary">
                                            {translate('Select_a_contact_to')}
                                        </Typography>
                                        <Button variant="outlined" color="primary" className="flex md:hidden normal-case" onClick={openMobileChatsSidebar}>
                                            {translate('Select_a_contact_to')}
                                        </Button>
                                    </div>
                                ) : (selectedContact &&
                                    <React.Fragment>
                                        <AppBar className="w-full" position="static" elevation={1}>
                                            <Toolbar className="px-16">
                                                <IconButton
                                                    color="inherit"
                                                    aria-label="Open drawer"
                                                    onClick={openMobileChatsSidebar}
                                                    className="flex md:hidden"
                                                >
                                                    <Icon>chat</Icon>
                                                </IconButton>
                                                <div className="flex items-center cursor-pointer" onClick={openContactSidebar}>
                                                    <div className="relative ml-8 mr-12">
                                                        <div className="absolute pin-r pin-b -m-4 z-10">
                                                            <StatusIcon status={selectedContact.status}/>
                                                        </div>

                                                        <Avatar src={selectedContact.avatar} alt={selectedContact.name}>
                                                            {!selectedContact.avatar || selectedContact.avatar === '' ? selectedContact.name[0] : ''}
                                                        </Avatar>
                                                    </div>
                                                    <Typography color="inherit" className="text-18 font-600">{selectedContact.name}</Typography>
                                                </div>
                                            </Toolbar>
                                        </AppBar>

                                        <div className={classes.content}>
                                            <Chat className="flex flex-1 z-10"/>
                                        </div>
                                    </React.Fragment>
                                )
                            }
                        </main>

                        <Drawer
                            className="h-full absolute z-30"
                            variant="temporary"
                            anchor="right"
                            open={contactSidebarOpen}
                            onClose={closeContactSidebar}
                            classes={{
                                paper: classNames(classes.drawerPaper, "absolute pin-r")
                            }}
                            ModalProps={{
                                keepMounted  : true,
                                disablePortal: true,
                                BackdropProps: {
                                    classes: {
                                        root: "absolute"
                                    }
                                }
                            }}
                        >
                            <ContactSidebar/>
                        </Drawer>
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getUserData            : Actions.getUserData,
        getContacts            : Actions.getContacts,
        openMobileChatsSidebar : Actions.openMobileChatsSidebar,
        closeMobileChatsSidebar: Actions.closeMobileChatsSidebar,
        openUserSidebar        : Actions.openUserSidebar,
        closeUserSidebar       : Actions.closeUserSidebar,
        openContactSidebar     : Actions.openContactSidebar,
        closeContactSidebar    : Actions.closeContactSidebar
    }, dispatch);
}

function mapStateToProps({chatApp})
{
    return {
        chat                  : chatApp.chat,
        contacts              : chatApp.contacts.entities,
        selectedContactId     : chatApp.contacts.selectedContactId,
        mobileChatsSidebarOpen: chatApp.sidebars.mobileChatsSidebarOpen,
        userSidebarOpen       : chatApp.sidebars.userSidebarOpen,
        contactSidebarOpen    : chatApp.sidebars.contactSidebarOpen
    }
}

export default withReducer('chatApp', reducer)(withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(withTranslate(ChatApp))));
