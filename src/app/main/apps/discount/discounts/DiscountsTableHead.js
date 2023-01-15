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

const rows = [
    {
        id            : 'image',
        align         : 'left',
        disablePadding: true,
        label         : '',
        sort          : false
    },
    {
        id            : 'discountName',
        align         : 'left',
        disablePadding: false,
        label         : 'Name',
        sort          : true
    },
    {
        id            : 'discountCode',
        align         : 'left',
        disablePadding: false,
        label         : 'Code',
        sort          : true
    },
    {
        id            : 'discountCity',
        align         : 'left',
        disablePadding: false,
        label         : 'City',
        sort          : true
    },
];

const styles = theme => ({
    actionsButtonWrapper: {
        background: theme.palette.background.paper
    }
});

class DiscountsTableHead extends React.Component {
    state = {
        selectedDiscountsMenu: null
    };

    createSortHandler = property => event => {

        this.props.onRequestSort(event, property);
    };

    openSelectedDiscountsMenu = (event) => {
        this.setState({selectedDiscountsMenu: event.currentTarget});
    };

    closeSelectedDiscountsMenu = () => {
        this.setState({selectedDiscountsMenu: null});
    };

    render()
    {
        const {onSelectAllClick, order, orderBy, numSelected, rowCount, classes} = this.props;
        const {selectedDiscountsMenu} = this.state;

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
                            <div className={classNames("flex items-center justify-center absolute w-64 pin-t pin-l ml-68 h-64 z-10", classes.actionsButtonWrapper)}>
                                <IconButton
                                    aria-owns={selectedDiscountsMenu ? 'selectedDiscountsMenu' : null}
                                    aria-haspopup="true"
                                    onClick={this.openSelectedDiscountsMenu}
                                >
                                    <Icon>more_horiz</Icon>
                                </IconButton>
                                <Menu
                                    id="selectedDiscountsMenu"
                                    anchorEl={selectedDiscountsMenu}
                                    open={Boolean(selectedDiscountsMenu)}
                                    onClose={this.closeSelectedDiscountsMenu}
                                >
                                    <MenuList>
                                        <MenuItem
                                            onClick={(event) => {
												this.props.onRemoveClick();
                                                this.closeSelectedDiscountsMenu();
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

export default withStyles(styles, {withTheme: true})(DiscountsTableHead);
