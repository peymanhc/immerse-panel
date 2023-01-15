import React, {Component} from 'react';
import {Checkbox, Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Typography} from '@material-ui/core';
import {FuseUtils, FuseAnimate} from '@fuse';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import ReactTable from "react-table";
import * as Actions from '../store/actions';

class RoleList extends Component {

    state = {
        selectedRolesMenu: null
    };
	
	componentDidMount(){
		this.props.getRoles();
	}
	
    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map((id) => entities[id]);
        if ( searchText.length === 0 )
        {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    openSelectedRoleMenu = (event) => {
        this.setState({selectedRolesMenu: event.currentTarget});
    };

    closeSelectedRolesMenu = () => {
        this.setState({selectedRolesMenu: null});
    };

    render()
    { 
        const { roles, searchText, selectedRoleIds, selectAllRoles, deSelectAllRoles, toggleInSelectedRoles, 
			openEditRoleDialog, removeRoles, removeRole} = this.props;
        const data = this.getFilteredArray(roles, searchText);
        const {selectedRolesMenu} = this.state; 
        if ( !data && data.length === 0 )
        {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        There are no roles!
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
                                    openEditRoleDialog(rowInfo.original);
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
                                        event.target.checked ? selectAllRoles() : deSelectAllRoles();
                                    }}
                                    checked={selectedRoleIds.length === Object.keys(roles).length && selectedRoleIds.length > 0}
                                    indeterminate={selectedRoleIds.length !== Object.keys(roles).length && selectedRoleIds.length > 0}
                                />
                            ),
                            accessor : "",
                            Cell     : row => {
                                return (<Checkbox
                                        onClick={(event) => {
                                            event.stopPropagation();
                                        }}
                                        checked={selectedRoleIds.includes(row.value.id)}
                                        onChange={() => toggleInSelectedRoles(row.value.id)}
                                    />
                                )
                            },
                            className: "justify-center",
                            sortable : false,
                            width    : 64
                        },
                        {
                            Header   : () => (
                                selectedRoleIds.length > 0 && (
                                    <React.Fragment>
                                        <IconButton
                                            aria-owns={selectedRolesMenu ? 'selectedRolesMenu' : null}
                                            aria-haspopup="true"
                                            onClick={this.openSelectedRoleMenu}
                                        >
                                            <Icon>more_horiz</Icon>
                                        </IconButton>
                                        <Menu
                                            id="selectedRolesMenu"
                                            anchorEl={selectedRolesMenu}
                                            open={Boolean(selectedRolesMenu)}
                                            onClose={this.closeSelectedRolesMenu}
                                        >
                                            <MenuList>
                                                <MenuItem
                                                    onClick={() => {
                                                        removeRoles(data.filter(({id}) => selectedRoleIds.includes(id)));
                                                        this.closeSelectedRolesMenu();
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
                            className: "justify-center",
                            width    : 64,
                            sortable : false
                        },
                        {
                            Header    : "Role Name",
                            accessor  : "role",
                            filterable: false,
                            className : "font-bold",
                        },		
                        {
                            Header    : "Description",
                            accessor  : "role",
                            filterable: false,
                            className : "font-bold",
                        },						
                        {
                            Header: "",
                            width : 128,
                            Cell  : row => (
                                <div className="flex items-center">
                                    <IconButton
                                        onClick={(ev) => { 
                                            ev.stopPropagation();
                                            removeRole(row.original.id, row.original.role);
                                        }}
                                    >
                                        <Icon>delete</Icon>
                                    </IconButton>
                                </div>
                            )
                        }
                    ]}
                    defaultPageSize={10}
                    noDataText="No roles found"
                />
            </FuseAnimate>
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
		getRoles 			 : Actions.getRoles,		
        toggleInSelectedRoles: Actions.toggleInSelectedRoles,
        selectAllRoles       : Actions.selectAllRoles,
        deSelectAllRoles     : Actions.deSelectAllRoles,
        openEditRoleDialog   : Actions.openEditRoleDialog,
        removeRoles          : Actions.removeRoles,
        removeRole           : Actions.removeRole,
    }, dispatch);
}

function mapStateToProps({UsersApp})
{ 
    return {
		roles		   : UsersApp.roles.entities,	
        selectedRoleIds: UsersApp.roles.selectedRoleIds,
        searchText     : UsersApp.roles.searchText,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RoleList));
