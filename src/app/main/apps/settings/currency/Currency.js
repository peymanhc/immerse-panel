import React, {useState} from 'react';
import {IconButton, Icon, Checkbox, ListItemIcon, MenuItem, MenuList, ListItemText, Menu, 
	withStyles, Fab, Table, TableBody, TableRow, TableCell, TableHead
} from '@material-ui/core';
import {FuseAnimate} from '@fuse';

const styles = theme => ({
    addButton: {
        position: 'absolute',
        right   : 12,
        bottom  : 12,
        zIndex  : 99
    },
	tableRow:{
		'&:hover':{
			cursor:'pointer',
		}
	},
}); 

const Currency = ({form, currencies, classes, openAddPriceDialog, openEditPriceDialog, removeSliders}) => { 
 	
	const [value, setValue] = useState({
		selected: [],
	});
	
	const [selectedContactsMenu, setSelectedContactsMenu] = useState(null);
	
    const handleSelectAllClick = (event, name = 'selected') => {
        if ( event.target.checked )
			setValue({...value, [name]: currencies.map(n => n.id)});
        else
			setValue({...value, [name]: []});
    };
	
    const openSelectedContactMenu = (event) => {
        setSelectedContactsMenu(event.currentTarget);
    };	
	
    const closeSelectedContactsMenu = () => {
        setSelectedContactsMenu(null);
    };	
	
	const checkboxChange = (id, name = "selected") => {
		const selected = value[name];
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];
        if ( selectedIndex === -1 )
        {
            newSelected = newSelected.concat(selected, id);
        }		
        else if ( selectedIndex === 0 )
        {
            newSelected = newSelected.concat(selected.slice(1));
        }
        else if ( selectedIndex === selected.length - 1 )
        {
            newSelected = newSelected.concat(selected.slice(0, -1));
        }
        else if ( selectedIndex > 0 )
        {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
		setValue({...value, [name]: newSelected});
	};	
	
	const isSelected = (id, name = "selected") => value[name].indexOf(id) !== -1;
	
	return (
		<div>	
			<div className="table-responsive">											
				<Table className="simple">
					<TableHead>
						<TableRow>
							<TableCell>
								<Checkbox 
									onChange={event => handleSelectAllClick(event)}
								/>
							</TableCell>
							<TableCell>
							{
								value.selected.length ? 
									<React.Fragment>
										<IconButton
											aria-owns={selectedContactsMenu ? 'selectedContactsMenu' : null}
											aria-haspopup="true"
											onClick={openSelectedContactMenu}
										>
											<Icon>more_horiz</Icon>
										</IconButton>
										<Menu
											id="selectedContactsMenu"
											anchorEl={selectedContactsMenu}
											open={Boolean(selectedContactsMenu)}
											onClose={closeSelectedContactsMenu}
										>
											<MenuList>
												<MenuItem
												onClick={() => removeSliders(value.selected)}
												>
													<ListItemIcon>
														<Icon>delete</Icon>
													</ListItemIcon>
													<ListItemText inset primary="Remove"/>
												</MenuItem>																		
											</MenuList>
										</Menu>
									</React.Fragment>												
								:
								'ID'
							}
							</TableCell>
							<TableCell>Name</TableCell>
							<TableCell>Symbol</TableCell>
							<TableCell>Code</TableCell>
							<TableCell>Value</TableCell>
							<TableCell>Default</TableCell>
							<TableCell>Status</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{currencies.map(currency => (
							<TableRow key={currency.id} hover className={classes.tableRow} onClick={() => openEditPriceDialog(currency)}>
								<TableCell className="w-50">
									<Checkbox 
										onChange={() => checkboxChange(currency.id)}
										onClick={event => event.stopPropagation()}
										checked={isSelected(currency.id)}
									/>
								</TableCell>
								<TableCell className="w-100">
									{currency.id}
								</TableCell>
								<TableCell className="w-200">
									{currency.name}
								</TableCell>
								<TableCell className="w-50">
									{currency.symbol}
								</TableCell>
								<TableCell className="w-50">
									{currency.code}
								</TableCell>								
								<TableCell className="w-200">
									{currency.value}
								</TableCell>
								<TableCell className="w-200">
									{currency.default ?
										(
											<Icon className="text-pink text-20">check_circle</Icon>
										) :
										(
											null
										)
									}									
								</TableCell>
								<TableCell className="w-200">
									{currency.status ?
										(
											<Icon className="text-green text-20">check_circle</Icon>
										) :
										(
											<Icon className="text-red text-20">remove_circle</Icon>
										)
									}									
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>	
			<FuseAnimate animation="transition.expandIn" delay={300}>
				<Fab
					color="primary"
					aria-label="add"
					className={classes.addButton}
					onClick={() => openAddPriceDialog()}
				>
					<Icon>add</Icon>
				</Fab>
			</FuseAnimate>			
		</div> 
	);	
};

export default (withStyles(styles, {withTheme: true})(Currency));