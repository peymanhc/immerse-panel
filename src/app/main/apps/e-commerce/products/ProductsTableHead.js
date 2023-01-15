import React from 'react';
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

class ProductsTableHead extends React.Component {
    state = {
        selectedProductsMenu: null
    };

    createSortHandler = property => event => {

        this.props.onRequestSort(event, property);
    };

    openSelectedProductsMenu = (event) => {
        this.setState({selectedProductsMenu: event.currentTarget});
    };

    closeSelectedProductsMenu = () => {
        this.setState({selectedProductsMenu: null});
    };

    render()
    {
        const {onSelectAllClick, order, orderBy, numSelected, rowCount, classes, translate} = this.props;
        const {selectedProductsMenu} = this.state;
const rows = [
    {
        id            : 'image',
        align         : 'left',
        disablePadding: true,
        label         : '',
        sort          : false
    },
    {
        id            : 'name',
        align         : 'left',
        disablePadding: false,
        label         : translate('Name'),
        sort          : true
    },
    {
        id            : 'categories',
        align         : 'left',
        disablePadding: false,
        label         : translate('Category'),
        sort          : true
    },
    {
        id            : 'priceTaxIncl',
        align         : 'right',
        disablePadding: false,
        label         : translate('Price'),
        sort          : true
    },
    {
        id            : 'quantity',
        align         : 'right',
        disablePadding: false,
        label         : translate('Quantity'),
        sort          : true
    },
    {
        id            : 'active',
        align         : 'right',
        disablePadding: false,
        label         : translate('Active'),
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
                                    aria-owns={selectedProductsMenu ? 'selectedProductsMenu' : null}
                                    aria-haspopup="true"
                                    onClick={this.openSelectedProductsMenu}
                                >
                                    <Icon>more_horiz</Icon>
                                </IconButton>
                                <Menu
                                    id="selectedProductsMenu"
                                    anchorEl={selectedProductsMenu}
                                    open={Boolean(selectedProductsMenu)}
                                    onClose={this.closeSelectedProductsMenu}
                                >
                                    <MenuList>
                                        <MenuItem
                                            onClick={(event) => {
												this.props.onRemoveClick();
                                                this.closeSelectedProductsMenu();
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

export default withStyles(styles, {withTheme: true})(withTranslate(ProductsTableHead));
