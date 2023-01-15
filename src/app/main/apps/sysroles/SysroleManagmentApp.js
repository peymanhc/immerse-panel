import React, {Component} from 'react';
import {withStyles, Fab, Icon} from '@material-ui/core';
import {FusePageSimple, FuseAnimate} from '@fuse';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import * as Actions from './store/actions';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Tab, Tabs} from '@material-ui/core';
import UserList from './users/UserList';
import UserDialog from './users/UserDialog';
import RoleList from './roles/RoleList';
import RoleDialog from './roles/RoleDialog';
// import SidebarContent from './SidebarContent';
import SysroleManagmentHeader from './SysroleManagmentHeader';


const styles = theme => ({
    addButton: {
        position: 'absolute',
        right   : 12,
        bottom  : 12,
        zIndex  : 99
    }
});

class sysroleManagmentApp extends Component {
	
    state = {
        value: 0
    };

    handleChange = (event, value) => {
        this.setState({value});
    };
	
    componentDidMount()
    {
		this.props.getRoles();
		this.props.getRoutes();
		this.props.getUserData();
    }	
    render()
    {	
		const {classes, openNewUserDialog, openNewRoleDialog, roles, routes} = this.props;
		const {value} = this.state;
        return (
			<div>
				<FusePageSimple
					classes={{
						contentCardWrapper: "  pb-80",
						leftSidebar       : "w-256 border-0",
						header            : "min-h-72 h-72 sm:h-136 sm:min-h-136"
					}}
					header={
						<SysroleManagmentHeader/>
					}
					contentToolbar={
						<Tabs
							value={value}
							onChange={this.handleChange}
							indicatorColor="primary"
							textColor="primary"
							variant="scrollable"
							scrollButtons="off"
							className="w-full h-64 border-b-1"
						>
						 
							<Tab className="h-64" label="Roles"/>
						</Tabs>
					}					
					content={
						<div className="p-24">
							{value === 0 &&
							(
								<div>
									<RoleList />
								</div>
							)}
							 	
						</div>						
					}				
					// leftSidebarContent={<SidebarContent />}				
					// sidebarInner	
				/>
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <Fab
                        color="primary"
                        aria-label="add"
                        className={classes.addButton}
						onClick={() => {value === 0 ? openNewRoleDialog() : openNewUserDialog()}}
                    >
					{
						(value === 0 ? <Icon>person_add</Icon> : <Icon>group_add</Icon>)
					}
                        
                    </Fab>
                </FuseAnimate>				
				
				<RoleDialog routes={routes}/>
				 
				
			</div>
        )
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
		openNewUserDialog: Actions.openNewUserDialog,
		openNewRoleDialog: Actions.openNewRoleDialog,
		getRoles 		 : Actions.getRoles,
		getRoutes        : Actions.getRoutes,
		getUserData		 : Actions.getUserData,
    }, dispatch);
}

function mapStateToProps({UsersApp})
{ 
    return {
		roles   : UsersApp.roles.roles,
		routes  : UsersApp.roles.routes,
    }
}

export default withReducer('UsersApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(sysroleManagmentApp))));