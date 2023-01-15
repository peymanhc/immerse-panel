import React, {Component} from 'react';
import {withStyles, Avatar, Divider, Icon, List, ListItem, ListItemText, Paper, Typography} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import {NavLink, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const styles = theme => ({
    listItem: {
        color         : 'inherit!important',
        textDecoration: 'none!important',
        height        : 40,
        width         : 'calc(100% - 16px)',
        borderRadius  : '0 20px 20px 0',
        paddingLeft   : 24,
        paddingRight  : 12,
        '&.active'    : {
            backgroundColor    : theme.palette.secondary.main,
            color              : theme.palette.secondary.contrastText + '!important',
            pointerEvents      : 'none',
            '& .list-item-icon': {
                color: 'inherit'
            }
        }
    }
});

class SidebarContent extends Component {

    render()
    {
        const {classes, user} = this.props;

        return (
            <div className="p-16 lg:p-24 lg:pr-4">
                <FuseAnimate animation="transition.slideLeftIn" delay={200}>
                    <Paper elevation={1} className="rounded-8">
						{
							user !== null &&
							<div className="p-24 flex items-center">
								<Avatar className="mr-12" alt={user.name} src={user.avatar}/>
								<Typography>{user.name}</Typography>
							</div>							
						}
                        <Divider/>
                        <List>
                            <ListItem
                                button
                                component={NavLink}
                                to={'/apps/users/managment'}
                                activeClassName="active"
                                className={classes.listItem}
                            >
                                <Icon className="list-item-icon text-16" color="action">people</Icon>
                                <ListItemText className="truncate pr-0" primary="All users" disableTypography={true}/>
                            </ListItem>
                        </List>
                    </Paper>
                </FuseAnimate>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
	}, dispatch);
}

function mapStateToProps({UsersApp})
{
    return {
        //user: {name: 'Mohammad', avatar:'/assets/images/avatars/profile.jpg'},
		user: UsersApp.users.user,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(SidebarContent)));
