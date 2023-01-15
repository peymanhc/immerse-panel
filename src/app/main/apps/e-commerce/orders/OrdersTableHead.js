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

class OrdersTableHead extends Component {

    state = {
        selectedOrdersMenu: null
    };

    createSortHandler = property => event => {

        this.props.onRequestSort(event, property);
    };

    openSelectedOrdersMenu = (event) => {
        this.setState({selectedOrdersMenu: event.currentTarget});
    };

    closeSelectedOrdersMenu = () => {
        this.setState({selectedOrdersMenu: null});
    };

    render()
    {
        const {onSelectAllClick, order, orderBy, numSelected, rowCount, classes, translate} = this.props;
        const {selectedOrdersMenu} = this.state;
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
				align         : 'right',
				disablePadding: false,
				label         : translate('Customer'),
				sort          : true
			},
			{
				id            : 'total',
				align         : 'left',
				disablePadding: false,
				label         : translate('Total'),
				sort          : true
			},
			{
				id            : 'payment',
				align         : 'left',
				disablePadding: false,
				label         : translate('Payment'),
				sort          : true
			},
			{
				id            : 'status',
				align         : 'right',
				disablePadding: false,
				label         : translate('Status'),
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
                                    aria-owns={selectedOrdersMenu ? 'selectedOrdersMenu' : null}
                                    aria-haspopup="true"
                                    onClick={this.openSelectedOrdersMenu}
                                >
                                    <Icon>more_horiz</Icon>
                                </IconButton>
                                <Menu
                                    id="selectedOrdersMenu"
                                    anchorEl={selectedOrdersMenu}
                                    open={Boolean(selectedOrdersMenu)}
                                    onClose={this.closeSelectedOrdersMenu}
                                >
                                    <MenuList>
                                        <MenuItem
                                            onClick={() => {
												this.props.onRemoveClick();
                                                this.closeSelectedOrdersMenu();
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

export default withStyles(styles, {withTheme: true})(withTranslate(OrdersTableHead));
