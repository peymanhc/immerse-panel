import React, {Component} from 'react';
import {AppBar, Toolbar, Icon, IconButton, ClickAwayListener, Paper, Avatar, Typography, withStyles} from '@material-ui/core';
import keycode from 'keycode';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import withReducer from 'app/store/withReducer';
import ContactList from './ContactList';
import Chat from './Chat';
//import _ from '@lodash';
import withSocket from './withSocket';

const socketData = {
	endpoint	: "http://5.63.13.165:4002",
	apiAddress	: "UserChatAPI"
};

const styles = theme => ({
    root : {
         left                          : 0,
        width                         : 70,
        maxWidth                      : 70,
        minWidth                      : 70,
        [theme.breakpoints.down('md')]: {
             left                          : 0,
            width   : 0,
            maxWidth: 0,
            minWidth: 0
        }
    },
    toolbar: {
        direction: 'rtl'
    },
    panel: {
        position                      : 'absolute',
        width                         : 360,
        backgroundColor               : theme.palette.background.paper,
        boxShadow                     : theme.shadows[3],
        top                           : 0,
        height                        : '100%',
        minHeight                     : '100%',
        bottom                        : 0,
        left                          : 0,
        margin                        : 0,
        zIndex                        : 1000,
        transform                     : 'translate3d(-290px,0,0)',
        overflow                      : 'hidden',
        [theme.breakpoints.down('md')]: {
            transform : 'translate3d(-360px,0,0)',
            boxShadow : 'none',
            '&.opened': {
                boxShadow: theme.shadows[5]
            }
        },
        transition                    : theme.transitions.create(['transform'], {
            easing  : theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.standard
        }),
        '&.opened'                    : {
            transform: 'translateX(0)'
        }
    }
});

class ChatPanel extends Component {

    componentDidMount()
    {
        //this.props.getUserData();
        this.props.getContacts();
    }

    componentDidUpdate(prevProps)
    {
        if ( this.props.state !== prevProps.state )
        {
            if ( this.props.state )
            {
                document.addEventListener("keydown", this.handleDocumentKeyDown);
            }
            else
            {
                document.removeEventListener('keydown', this.handleDocumentKeyDown);
            }
        }
    }

	//shouldComponentUpdate(nextProps, nextState) {
	//	if (this.props.selectedContactId !== nextProps.selectedContactId) {
	//		return true;
	//	}
	//	if ( this.props.state !== nextProps.state ){
	//		return true;
	//	}
	//	//if ( !_.isEqual(this.props.classes, nextProps.classes) ) {
	//	//	return true;	
	//	//}			
	//	if ( !_.isEqual(this.props.currentData, nextProps.currentData) ) {
	//		return true;	
	//	}			
	//	return false;
	//}
  
    componentWillUnmount()
    {
        document.removeEventListener('keydown', this.handleDocumentKeyDown);
    }

    handleDocumentKeyDown = event => {
        if ( keycode(event) === 'esc' )
        {
            this.props.closeChatPanel();
        }
    };

    render()
    {
        const {classes, openChatPanel, closeChatPanel, contacts, selectedContactId, state, currentData} = this.props;

        const selectedContact = contacts.find(_contact => _contact.id === selectedContactId);

        return (
            <div className={classes.root}>
                <ClickAwayListener onClickAway={() => state && closeChatPanel()}>
                    <div className={classNames(classes.panel, {'opened': state}, "flex flex-col")}>
                        <AppBar position="static" elevation={1}>
                                <Toolbar className={classNames(classes.toolbar,"pl-12 pr-8")}>
                                <div className="flex flex-1  items-center">
                                    {(!state || !selectedContactId) && (
                                        <React.Fragment>
                                            <IconButton color="inherit" onClick={openChatPanel}>
                                                <Icon className="text-32 mh2">chat</Icon>
                                            </IconButton>
                                            {!selectedContactId && (
                                                <Typography className="ml-16 text-16" color="inherit">Team Chat</Typography>
                                            )}
                                        </React.Fragment>
                                    )}
                                    {state && selectedContact && (
                                        <React.Fragment>
                                            <Avatar className="ml-4" src={selectedContact.avatar}/>
                                            <Typography className="ml-16 text-16" color="inherit">{selectedContact.name}</Typography>
                                        </React.Fragment>
                                    )} 
                                </div>
                                <IconButton onClick={closeChatPanel} color="inherit">
                                    <Icon>close</Icon>
                                </IconButton>
                            </Toolbar>
                        </AppBar> 
                        <Paper className="flex flex-1 flex-row-reverse min-h-px">
                            <ContactList className="flex flex-no-shrink" currentData={currentData}/>
                            <Chat className="flex flex-1 z-10" currentData={currentData}/>
                        </Paper>
                    </div>
                </ClickAwayListener>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getUserData   : Actions.getUserData,
        getContacts   : Actions.getContacts,
        openChatPanel : Actions.openChatPanel,
        closeChatPanel: Actions.closeChatPanel
    }, dispatch);
}

function mapStateToProps({chatPanel})
{
    return {
        contacts         : chatPanel.contacts.entities,
        selectedContactId: chatPanel.contacts.selectedContactId,
        state            : chatPanel.state
    }
}

export default withSocket(socketData)(withReducer('chatPanel', reducer)(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ChatPanel))));
