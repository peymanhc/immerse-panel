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
        id            : 'companyName',
        align         : 'left',
        disablePadding: false,
        label         : 'Name',
        sort          : true
    },
    {
        id            : 'companyMobile',
        align         : 'left',
        disablePadding: false,
        label         : 'Mobile',
        sort          : true
    },
    {
        id            : 'companyCity',
        align         : 'left',
        disablePadding: false,
        label         : 'City',
        sort          : true
    },
    {
        id            : 'companyAddress',
        align         : 'left',
        disablePadding: false,
        label         : 'Address',
        sort          : true
    },	
];

const styles = theme => ({
    actionsButtonWrapper: {
        background: theme.palette.background.paper
    }
});

class CompaniesTableHead extends React.Component {
    state = {
        selectedCompaniesMenu: null
    };

    createSortHandler = property => event => {

        this.props.onRequestSort(event, property);
    };

    openSelectedCompaniesMenu = (event) => {
        this.setState({selectedCompaniesMenu: event.currentTarget});
    };

    closeSelectedCompaniesMenu = () => {
        this.setState({selectedCompaniesMenu: null});
    };

    render()
    {
        const {onSelectAllClick, order, orderBy, numSelected, rowCount, classes} = this.props;
        const {selectedCompaniesMenu} = this.state;

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
                                    aria-owns={selectedCompaniesMenu ? 'selectedCompaniesMenu' : null}
                                    aria-haspopup="true"
                                    onClick={this.openSelectedCompaniesMenu}
                                >
                                    <Icon>more_horiz</Icon>
                                </IconButton>
                                <Menu
                                    id="selectedCompaniesMenu"
                                    anchorEl={selectedCompaniesMenu}
                                    open={Boolean(selectedCompaniesMenu)}
                                    onClose={this.closeSelectedCompaniesMenu}
                                >
                                    <MenuList>
                                        <MenuItem
                                            onClick={(event) => {
												this.props.onRemoveClick();
                                                this.closeSelectedCompaniesMenu();
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

export default withStyles(styles, {withTheme: true})(CompaniesTableHead);
