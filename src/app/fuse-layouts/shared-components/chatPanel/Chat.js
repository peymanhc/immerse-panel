import React, {Component} from 'react';
import {Avatar, Paper, Typography, withStyles, TextField, IconButton, Icon} from '@material-ui/core';
import {FuseScrollbars} from '@fuse';
import classNames from 'classnames';
import moment from 'moment/moment';
import * as Actions from './store/actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from '@lodash';
import jMoment from "moment-jalaali";
jMoment.loadPersian({ dialect: "persian", usePersianDigits: true });

const styles = theme => ({
    messageRow  : {
        position                          : 'relative',
        display                           : 'flex',
        flexDirection                     : 'column',
        alignItems                        : 'flex-start',
        justifyContent                    : 'flex-end',
        padding                           : '0 16px 4px 16px',
        flex                              : '0 0 auto',
        '&.contact'                       : {
            '& $bubble'       : { 
                  direction: 'rtl!important',
                backgroundColor        : theme.palette.primary.main,
                color                  : theme.palette.primary.contrastText,
                borderTopLeftRadius    : 5,
                borderBottomLeftRadius : 5,
                borderTopRightRadius   : 20,
                borderBottomRightRadius: 20,
                '& $time'              : {
                    marginLeft: 12
                }
            },
            '&.first-of-group': {
                '& $bubble': {
                    borderTopLeftRadius: 20
                }
            },
            '&.last-of-group' : {
                '& $bubble': {
                    borderBottomLeftRadius: 20
                }
            }
        },
        '&.me'                            : {
            paddingLeft: 40,

            '& $avatar': {
                order : 2,
                margin: '0 0 0 16px'
            },

            '& $bubble'       : {
                 direction: 'rtl!important',
                marginLeft             : 'auto',
                backgroundColor        : theme.palette.grey[300],
                color                  : theme.palette.getContrastText(theme.palette.grey[300]),
                borderTopLeftRadius    : 20,
                borderBottomLeftRadius : 20,
                borderTopRightRadius   : 5,
                borderBottomRightRadius: 5,
                '& $time'              : {
                    justifyContent: 'flex-end',
                    right         : 0,
                    marginRight   : 12
                }
            },
            '&.first-of-group': {
                '& $bubble': {
                    borderTopRightRadius: 20
                }
            },

            '&.last-of-group': {
                '& $bubble': {
                    borderBottomRightRadius: 20
                }
            }
        },
        '&.contact + .me, &.me + .contact': {
            paddingTop: 20,
            marginTop : 20
        },
        '&.first-of-group'                : {
            '& $bubble': {
                borderTopLeftRadius: 20,
                paddingTop         : 13
            }
        },
        '&.last-of-group'                 : {
            '& $bubble': {
                borderBottomLeftRadius: 20,
                paddingBottom         : 13,
                '& $time'             : {
                    display: 'flex'
                }
            }
        }
    },
    avatar      : {
        position: 'absolute',
        left    : -32,
        margin  : 0
    },
    bubble      : {
        position      : 'relative',
        display       : 'flex',
        alignItems    : 'center',
        justifyContent: 'center',
        padding       : 12,
        maxWidth      : '100%'
    },
    message     : {
        whiteSpace: 'pre-wrap',
        lineHeight: 1.2,
         wordBreak: 'break-all'
    },
    time        : {
        position  : 'absolute',
        display   : 'none',
        width     : '100%',
        fontSize  : 11,
        marginTop : 8,
        top       : '100%',
        left      : 0,
        whiteSpace: 'nowrap'
    },
    bottom      : {
        background: theme.palette.background.default,
        borderTop : '1px solid rgba(0, 0, 0, 0.13)'
    },
    inputWrapper: {
        borderRadius: 24,
        direction: 'rtl!important'
    },
    arrow: {
        transform: 'scaleX(-1)'
    }
});

class Chat extends Component {

    state = {
        messageText: ''
    };

    componentDidUpdate(prevProps)
    {
		const {chat, selectedContactId, currentData, getChat} = this.props; 
        if ( chat && !_.isEqual(prevProps.chat, chat) )
        {
            this.scrollToBottom();
        }
		
		if(chat && selectedContactId && currentData.chatList){
			const findContact = currentData.chatList.find(item => item.contactId === selectedContactId);
			if(findContact && findContact.unread > 0){
				const findContact2 = prevProps.currentData.chatList.find(item => item.contactId === selectedContactId);
				if(findContact2.lastMessageTime !== findContact.lastMessageTime)
					getChat(selectedContactId);
			}
		}
    }

	shouldComponentUpdate(nextProps, nextState) {
		const {chat, currentData, classes} = this.props; 
		if( !_.isEqual(nextProps.chat, chat) ) 
			return true;	 
		if( !_.isEqual(nextProps.currentData, currentData) ) 
			return true;	
		if( !_.isEqual(nextProps.classes, classes) ) 
			return true;		
		if(this.state.messageText !== nextState.messageText)
			return true;
		return false;
	}

    shouldShowContactAvatar = (item, i) => {
        return (
            item.who === this.props.selectedContactId &&
            ((this.props.chat.dialog[i + 1] && this.props.chat.dialog[i + 1].who !== this.props.selectedContactId) || !this.props.chat.dialog[i + 1])
        );
    };

    isFirstMessageOfGroup = (item, i) => {
        return (i === 0 || (this.props.chat.dialog[i - 1] && this.props.chat.dialog[i - 1].who !== item.who));
    };

    isLastMessageOfGroup = (item, i) => {
        return (i === this.props.chat.dialog.length - 1 || (this.props.chat.dialog[i + 1] && this.props.chat.dialog[i + 1].who !== item.who));
    };

    onInputChange = (ev) => {
        this.setState({messageText: ev.target.value});
    };

    onMessageSubmit = (ev) => {
        ev.preventDefault();
        if ( this.state.messageText === '' )
        {
            return;
        }
        this.props.sendMessage(this.state.messageText, this.props.chat.id, this.props.selectedContactId)
            .then(() => {
                this.setState({messageText: ''});
                this.scrollToBottom();
            });
    };

    scrollToBottom = () => {
        this.chatScroll.scrollTop = this.chatScroll.scrollHeight;
    };

    render()
    { 
        const {classes, chat, contacts, currentData:user, className} = this.props;
        const {messageText} = this.state;
        return (
            <Paper elevation={3} className={classNames("flex flex-col", className)}>
                <FuseScrollbars
                    containerRef={(ref) => {
                        this.chatScroll = ref
                    }}
                    className="flex flex-1 flex-col overflow-y-auto"
                >
                    {!chat ?
                        (
                            <div className="flex flex-col flex-1 items-center justify-center p-24">
                                <Icon className="text-128" color="disabled">chat</Icon>
                                <Typography className="px-16 pb-24 mt-24 text-center" color="textSecondary">
                                    Select a contact to start a conversation.
                                </Typography>
                            </div>
                        ) :
                        chat.dialog.length > 0 ?
                            (
                                <div className="flex flex-col pt-16 pl-40 pb-40">
                                    {chat.dialog.map((item, i) => {
                                        const contact = item.who === user.id ? user : contacts.find(_contact => _contact.id === item.who);
                                        return (
                                            <div
                                                key={i}
                                                className={classNames(
                                                    classes.messageRow,
                                                    {'me': item.who === user.id},
                                                    {'contact': item.who !== user.id},
                                                    {'first-of-group': this.isFirstMessageOfGroup(item, i)},
                                                    {'last-of-group': this.isLastMessageOfGroup(item, i)}
                                                )}
                                            >
                                                {this.shouldShowContactAvatar(item, i) && (
                                                    <Avatar className={classes.avatar} src={contact.avatar}/>
                                                )}
                                                <div className={classes.bubble}>
                                                    <div className={classes.message}>{item.message}</div>
                                                    <Typography className={classes.time} color="textSecondary">
                                                      { jMoment( item.time ).format("jYYYY/jMM/jDD hh:mm A")}
                                                       
                                                     </Typography>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            ) : (
                                <div className="flex flex-col flex-1">
                                    <div className="flex flex-col flex-1 items-center justify-center">
                                        <Icon className="text-128" color="disabled">chat</Icon>
                                    </div>
                                    <Typography className="px-16 pb-24 text-center" color="textSecondary">
                                        Start a conversation by typing your message below.
                                    </Typography>
                                </div>
                            )
                    }

                </FuseScrollbars>
                {chat && ( 
                    <form onSubmit={this.onMessageSubmit} className={classNames(classes.bottom, "py-16 px-8")}>
                        <Paper className={classNames(classes.inputWrapper, "flex flex-row-reverse items-center relative")}>
                            <TextField
                                autoFocus={false}
                                id="message-input"
                                className="flex-1"
                                InputProps={{
                                    disableUnderline: true,
                                    classes         : {
                                        root : "flex flex-grow flex-no-shrink ml-16 mr-48 my-8",
                                        input: ""
                                    },
                                    placeholder     : "?????????????? ???? ???????? ????????????..."
                                }}
                                InputLabelProps={{
                                    shrink   : false,
                                    className: classes.bootstrapFormLabel
                                }}
                                onChange={this.onInputChange}
                                value={messageText}
                            />
                            <IconButton className="absolute pin-r pin-t" type="submit">
                                <Icon className="text-24" color="action">send</Icon>
                            </IconButton>
                        </Paper>
                    </form>
                )}
            </Paper>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        sendMessage	: Actions.sendMessage,
		getChat		: Actions.getChat,
    }, dispatch);
}

function mapStateToProps({chatPanel})
{
    return {
        contacts         : chatPanel.contacts.entities,
        selectedContactId: chatPanel.contacts.selectedContactId,
        chat             : chatPanel.chat,
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Chat));