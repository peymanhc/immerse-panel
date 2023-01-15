import React, {Component} from 'react';
import {Avatar, Checkbox, Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Typography} from '@material-ui/core';
import {FuseUtils, FuseAnimate} from '@fuse';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import ReactTable from "react-table";
import * as Actions from '../store/actions';
import { withTranslate } from 'react-redux-multilingual';  //--maddahi-and addtranslate words--//


class UserList extends Component {

    state = {
        selectedUsersMenu: null
    };
	
	componentDidMount(){
		this.props.getUsers();
	}
	
    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map((id) => entities[id]);
        if ( searchText.length === 0 )
        {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    openSelectedUserMenu = (event) => {
        this.setState({selectedUsersMenu: event.currentTarget});
    };

    closeSelectedUsersMenu = () => {
        this.setState({selectedUsersMenu: null});
    };

    render()
    {
        const { users, searchText, selectedUserIds, selectAllUsers, deSelectAllUsers, toggleInSelectedUsers, 
			openEditUserDialog, removeUsers, removeUser, translate} = this.props;
        const data = this.getFilteredArray(users, searchText);
        const {selectedUsersMenu} = this.state;

        if ( !data && data.length === 0 )
        {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        {translate('There_are_no_users')}
                    </Typography>
                </div>
            );
        }

        return (
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <ReactTable
                    className="-striped -highlight border-0"
                    getTrProps={(state, rowInfo, column) => {
                        return {
                            className: "cursor-pointer",
                            onClick  : (e, handleOriginal) => {
                                if ( rowInfo )
                                {
                                    openEditUserDialog(rowInfo.original);
                                }
                            }
                        }
                    }}
                    data={data}
                    columns={[
                        {
                            Header   : () => (
                                <Checkbox
                                    onClick={(event) => {
                                        event.stopPropagation();
                                    }}
                                    onChange={(event) => {
                                        event.target.checked ? selectAllUsers() : deSelectAllUsers();
                                    }}
                                    checked={selectedUserIds.length === Object.keys(users).length && selectedUserIds.length > 0}
                                    indeterminate={selectedUserIds.length !== Object.keys(users).length && selectedUserIds.length > 0}
                                />
                            ),
                            accessor : "",
                            Cell     : row => {
                                return (<Checkbox
                                        onClick={(event) => {
                                            event.stopPropagation();
                                        }}
                                        checked={selectedUserIds.includes(row.value.id)}
                                        onChange={() => toggleInSelectedUsers(row.value.id)}
                                    />
                                )
                            },
                            className: "justify-center",
                            sortable : false,
                            width    : 64
                        },
                        {
                            Header   : () => (
                                selectedUserIds.length > 0 && (
                                    <React.Fragment>
                                        <IconButton
                                            aria-owns={selectedUsersMenu ? 'selectedUsersMenu' : null}
                                            aria-haspopup="true"
                                            onClick={this.openSelectedUserMenu}
                                        >
                                            <Icon>more_horiz</Icon>
                                        </IconButton>
                                        <Menu
                                            id="selectedUsersMenu"
                                            anchorEl={selectedUsersMenu}
                                            open={Boolean(selectedUsersMenu)}
                                            onClose={this.closeSelectedUsersMenu}
                                        >
                                            <MenuList>
                                                <MenuItem
                                                    onClick={() => {
                                                        removeUsers(selectedUserIds);
                                                        this.closeSelectedUsersMenu();
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Icon>delete</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Remove"/>
                                                </MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </React.Fragment>
                                )
                            ),
                            accessor : "avatar",
                            Cell     : row => (
                                <Avatar className="mr-8" alt={row.original.name} src={row.value}/>
                            ),
                            className: "justify-center",
                            width    : 64,
                            sortable : false
                        },
                        {
                            Header    : translate('User_Name'),
                            accessor  : "displayName",
                            filterable: true,
                            className : "font-bold"
                        },
                        {
                            Header    : translate('Role'),
                            accessor  : "role",
                            filterable: true,
                            className : "font-bold"
                        },
                        {
                            Header    : translate('Email'),
                            accessor  : "email",
                            filterable: true
                        },
                        {
                            Header    : translate('Mobile'),
                            accessor  : "mobile",
                            filterable: true
                        },						
                        {
                            Header: "",
                            width : 128,
                            Cell  : row => (
                                <div className="flex items-center">
                                    <IconButton
                                        onClick={(ev) => {
                                            ev.stopPropagation();
                                            removeUser(row.original.id);
                                        }}
                                    >
                                        <Icon>delete</Icon>
                                    </IconButton>
                                </div>
                            )
                        }
                    ]}
                    defaultPageSize={10}
                    noDataText="No users found"
                />
            </FuseAnimate>
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
		getUsers 			 : Actions.getUsers,		      
        toggleInSelectedUsers: Actions.toggleInSelectedUsers,
        selectAllUsers       : Actions.selectAllUsers,
        deSelectAllUsers     : Actions.deSelectAllUsers,
        openEditUserDialog   : Actions.openEditUserDialog,
        removeUsers          : Actions.removeUsers,
        removeUser           : Actions.removeUser,
        toggleStarredUser    : Actions.toggleStarredUser,
        toggleStarredUsers   : Actions.toggleStarredUsers,
        setUsersStarred      : Actions.setUsersStarred,
        setUsersUnstarred    : Actions.setUsersUnstarred,
    }, dispatch);
}

function mapStateToProps({UsersApp})
{
    return {
		users		   : UsersApp.users.entities,	
        selectedUserIds: UsersApp.users.selectedUserIds,
        searchText     : UsersApp.users.searchText,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withTranslate(UserList)));
