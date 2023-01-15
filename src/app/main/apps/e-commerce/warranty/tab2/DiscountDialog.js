import React from 'react';
import {Icon, ListItemText, IconButton, List, ListItem, ListItemAvatar, Avatar, DialogTitle } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';	
class DiscountDialog extends React.Component {
	handleClose = () => {
		this.props.onClose();
	};
	
	handleListItemClick = value => {
		this.props.onClose(value);
	};
	
	render() {
		const {onClose, openAddDiscountDialog,  addedDiscounts, deleteDiscount, ...other} = this.props;
	
		return (
		<Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
			<DialogTitle id="simple-dialog-title">Set discount</DialogTitle>
			<div>
			<List>
				{addedDiscounts.map((item, index) => (
					<ListItem button key={index}>
						<Icon className="list-item-icon text-16" color="action">label</Icon>
						<ListItemText primary={item.discountName} onClick={() => this.handleListItemClick(item)} />
						<IconButton className="w-32 h-32 mx-4 p-0" aria-label="Delete" onClick={() => deleteDiscount(item.id)} >
							<Icon fontSize="small">delete</Icon>						
						</IconButton>
						<IconButton className="w-32 h-32 mx-4 p-0" aria-label="Edit" onClick={() => openAddDiscountDialog(item)} >
							<Icon fontSize="small">edit</Icon>						
						</IconButton>					
					</ListItem>
				))}
				<ListItem button 
					onClick={() => openAddDiscountDialog()}
					dense
				>
					<ListItemAvatar>
						<Avatar>
							<AddIcon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary="Add discount"/>
				</ListItem>
			</List>
			</div>
		</Dialog>
		);
	}
}

export default DiscountDialog;