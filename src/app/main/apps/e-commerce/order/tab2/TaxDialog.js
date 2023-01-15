import React from 'react';
import {Icon, ListItemText, IconButton, List, ListItem, ListItemAvatar, Avatar, DialogTitle } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';	
class TaxDialog extends React.Component {
	handleClose = () => {
		this.props.onClose();
	};
	
	handleListItemClick = value => {
		this.props.onClose(value);
	};
	
	render() {
		const {onClose, openAddTaxDialog,  addedTax, deleteTax, ...other} = this.props;
	
		return (
		<Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
			<DialogTitle id="simple-dialog-title">Set tax</DialogTitle>
			<div>
			<List>
				{addedTax.map((item, index) => (
					<ListItem button key={index}>
						<Icon className="list-item-icon text-16" color="action">label</Icon>
						<ListItemText primary={item.taxName} onClick={() => this.handleListItemClick(item)} />
						<IconButton className="w-32 h-32 mx-4 p-0" aria-label="Delete" onClick={() => deleteTax(item.id)} >
							<Icon fontSize="small">delete</Icon>						
						</IconButton>
						<IconButton className="w-32 h-32 mx-4 p-0" aria-label="Edit" onClick={() => openAddTaxDialog(item)} >
							<Icon fontSize="small">edit</Icon>						
						</IconButton>					
					</ListItem>
				))}
				<ListItem button 
					onClick={() => openAddTaxDialog()}
					dense
				>
					<ListItemAvatar>
						<Avatar>
							<AddIcon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary="Add tax"/>
				</ListItem>
			</List>
			</div>
		</Dialog>
		);
	}
}

export default TaxDialog;