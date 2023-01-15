import React, {Component} from 'react';
import {
    TableHead,
    TableSortLabel,
    TableCell,
    TableRow,
    Checkbox,
    Tooltip,
    IconButton,
    Icon,
    Menu,
    MenuList,
    MenuItem,
    ListItemIcon,
    ListItemText,
    withStyles
} from '@material-ui/core';
import classNames from 'classnames';
import { withTranslate } from 'react-redux-multilingual';


const styles = theme => ({
    actionsButtonWrapper: {
        background: theme.palette.background.paper
    }
});

class WarrantylistTableHead extends Component {

    state = {
        selectedWarrantylistMenu: null
    };

    createSortHandler = property => event => {

        this.props.onRequestSort(event, property);
    };

    openSelectedWarrantylistMenu = (event) => {
        this.setState({selectedWarrantylistMenu: event.currentTarget});
    };

    closeSelectedWarrantylistMenu = () => {
        this.setState({selectedWarrantylistMenu: null});
    };

    render()
    {
        const {onSelectAllClick, order, orderBy, numSelected, rowCount, classes, translate} = this.props;
        const {selectedWarrantylistMenu} = this.state;
		const rows = [
			{
				id            : 'id',
				align         : 'left',
				disablePadding: false,
				label         : translate('ID'),
				sort          : true
			}, 
			{
				id            : 'customer',
				align         : 'left',
				disablePadding: false,
				label         : translate('CustomerWarranty'),
				sort          : true
			},
			{
				id            : 'products.name',
				align         : 'right',
				disablePadding: false,
				label         : translate('product'),
				sort          : true
			},
		 
			{
				id            : 'status',
				align         : 'left',
				disablePadding: false,
				label         : translate('StatusWarranty'),
				sort          : true
			},
			{
				id            : 'date',
				align         : 'left',
				disablePadding: false,
				label         : translate('LastChangeDate'),
				sort          : true
			}
		];
        return (
            <TableHead>
                <TableRow className="h-64">
                    <TableCell padding="checkbox" className="relative pl-4 sm:pl-12">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                        {numSelected > 0 && (
                            <div className={classNames("flex items-center justify-center absolute w-64 pin-t pin-r mr-68 h-64 z-10", classes.actionsButtonWrapper)}>
                                <IconButton
                                    aria-owns={selectedWarrantylistMenu ? 'selectedWarrantylistMenu' : null}
                                    aria-haspopup="true"
                                    onClick={this.openSelectedWarrantylistMenu}
                                > 
                                    <Icon>more_horiz</Icon>
                                </IconButton>
                                <Menu
                                    id="selectedWarrantylistMenu"
                                    anchorEl={selectedWarrantylistMenu}
                                    open={Boolean(selectedWarrantylistMenu)}
                                    onClose={this.closeSelectedWarrantylistMenu}
                                >
                                    <MenuList>
                                        <MenuItem
                                            onClick={() => {
												this.props.onRemoveClick();
                                                this.closeSelectedWarrantylistMenu();
                                            }}
                                        >
                                            <ListItemIcon className={classes.icon}>
                                                <Icon>delete</Icon>
                                            </ListItemIcon>
                                            <ListItemText inset primary="Remove"/>
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </div>
                        )}
                    </TableCell>
                    {rows.map(row => {
                        return (
                            <TableCell
                                key={row.id}
                                align={row.align}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                {row.sort && (
                                    <Tooltip
                                        title="Sort"
                                        placement={row.align === "right" ? 'bottom-end' : 'bottom-start'}
                                        enterDelay={300}
                                    >
                                        <TableSortLabel
                                            active={orderBy === row.id}
                                            direction={order}
                                            onClick={this.createSortHandler(row.id)}
                                        >
                                            {row.label}
                                        </TableSortLabel>
                                    </Tooltip>
                                )}
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

export default withStyles(styles, {withTheme: true})(withTranslate(WarrantylistTableHead));
