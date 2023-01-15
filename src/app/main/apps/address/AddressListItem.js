import React from 'react';
import {withStyles, IconButton, Icon, Typography, Checkbox, ListItem} from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import amber from '@material-ui/core/colors/amber';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';
import * as Actions from './store/actions';


const styles = theme => ({
    addressItem: {
        '&.completed': {
            background                    : 'rgba(0,0,0,0.03)',
            '& .address-title, & .address-notes': {
                textDecoration: 'line-through'
            }
        }
    }
});

const AddressListItem = ({address, classes, openEditAddressDialog, toggleImportant, toggleStarred, toggleCompleted}) => {
	 
    return (
        <ListItem
            onClick={(ev) => {
                ev.preventDefault();
                openEditAddressDialog(address);
            }}
            dense
            button
            className={classNames(classes.addressItem, {"completed": address.completed}, "border-solid border-b-1 py-16  px-0 sm:px-8")}
        >

            <Checkbox
                tabIndex={-1}
                disableRipple
                checked={address.completed}
                onChange={() => toggleCompleted(address)}
                onClick={(ev) => ev.stopPropagation()}
            />

            <div className="flex flex-1 flex-col relative overflow-hidden pl-8">

                <Typography
                    variant="subtitle1"
                    className="address-title truncate"
                    color={address.completed ? "textSecondary" : "default"}
                >
                    {address.address}
                </Typography>

                <Typography
                    color="textSecondary"
                    className="todo-notes truncate"
                >
                    {
						address.username || ''
					}
                </Typography>


            </div>

            <div className="px-8">
                <IconButton onClick={(ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    toggleImportant(address)
                }}>
                    {address.important ? (
                        <Icon style={{color: red[500]}}>error</Icon>
                    ) : (
                        <Icon>error_outline</Icon>
                    )}
                </IconButton>
                <IconButton onClick={(ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    toggleStarred(address)
                }}>
                    {address.starred ? (
                        <Icon style={{color: amber[500]}}>star</Icon>
                    ) : (
                        <Icon>star_outline</Icon>
                    )}
                </IconButton>
            </div>
        </ListItem>
    );
};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        toggleCompleted   : Actions.toggleCompleted,
        toggleImportant   : Actions.toggleImportant,
        toggleStarred     : Actions.toggleStarred,
        openEditAddressDialog: Actions.openEditAddressDialog
    }, dispatch);
}

function mapStateToProps({addressApp})
{ 
    return {
 
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(AddressListItem)));
