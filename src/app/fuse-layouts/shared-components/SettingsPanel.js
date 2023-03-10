import React, {Component} from 'react';
import {Button, Typography, Dialog, Icon, IconButton, Slide, withStyles} from '@material-ui/core';
import {FuseScrollbars, FuseSettings} from '@fuse';
import {red} from '@material-ui/core/colors';
import {withRouter} from 'react-router-dom'
function Transition(props)
{
    return <Slide direction="left" {...props} />;
}

const styles = theme => ({
    button               : {
        position               : 'absolute',
        left                  : 0,
        bottom                    : 7,
        minWidth               : 48,
        width                  : 48,
        height                 : 48,
        opacity                : .9,
        padding                : 0,
        borderBottomLeftRadius: 0,
        borderTopLeftRadius   : 0,
        zIndex                 : 999,
        color                  : theme.palette.getContrastText(red[500]),
        backgroundColor        : red[500],
        '&:hover'              : {
            backgroundColor: red[500],
            opacity        : 1
        }
    },
    '@keyframes rotating': {
        from: {
            transform: 'rotate(0deg)'
        },
        to  : {
            transform: 'rotate(360deg)'
        }
    },
    buttonIcon           : {
        animation: 'rotating 3s linear infinite'
    },
    dialogPaper          : {
        position       : 'fixed',
        width          : 380,
        maxWidth       : '90vw',
        backgroundColor: theme.palette.background.paper,
        boxShadow      : theme.shadows[5],
        top            : 0,
        height         : '100%',
        minHeight      : '100%',
        bottom         : 0,
        right          : 0,
        margin         : 0,
        zIndex         : 1000,
        borderRadius   : 0
    },
});

class SettingsPanel extends Component {

    state = {
        open: false
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render()
    {
        const {classes} = this.props; 
		const path = this.props.location.pathname.toLowerCase();
		if(path.includes('/login') || path.includes('/register'))
			return null;
        return (
            <React.Fragment>
                <Button id="fuse-settings" className={classes.button} variant="contained" onClick={this.handleOpen}>
                    <Icon className={classes.buttonIcon}>settings</Icon>
                </Button>

                <Dialog
                    TransitionComponent={Transition}
                    aria-labelledby="settings-panel"
                    aria-describedby="settings"
                    open={this.state.open}
                    keepMounted
                    onClose={this.handleClose}
                    BackdropProps={{invisible: true}}
                    classes={{
                        paper: classes.dialogPaper
                    }}
                >
                    <FuseScrollbars className="p-24 sm:p-32">
                        <IconButton className="fixed pin-t pin-r z-10" onClick={this.handleClose}>
                            <Icon>close</Icon>
                        </IconButton>

                        <Typography className="mb-32" variant="h6">Theme Settings</Typography>

                        <FuseSettings/>

                    </FuseScrollbars>
                </Dialog>
            </React.Fragment>
        );
    }
}

export default withRouter(withStyles(styles)(SettingsPanel));