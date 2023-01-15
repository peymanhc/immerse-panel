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
import { withTranslate } from 'react-redux-multilingual';  //--maddahi-and addtranslate words--//



const styles = theme => ({
    actionsButtonWrapper: {
        background: theme.palette.background.paper
    }
});

class MastersTableHead extends React.Component {
    state = {
        selectedMastersMenu: null
    };

    createSortHandler = property => event => {

        this.props.onRequestSort(event, property);
    };

    openSelectedMastersMenu = (event) => {
        this.setState({selectedMastersMenu: event.currentTarget});
    };

    closeSelectedMastersMenu = () => {
        this.setState({selectedMastersMenu: null});
    };

    render()
    {
        const {onSelectAllClick, order, orderBy, numSelected, rowCount, classes, translate} = this.props;
        const {selectedMastersMenu} = this.state;
		const rows = [
			{
				id            : 'image',
				align         : 'left',
				disablePadding: true,
				label         : '',
				sort          : false
			},
			{
				id            : 'masterName',
				align         : 'left',
				disablePadding: false,
				label         : translate('Name'),
				sort          : true
			},
			{
				id            : 'masterMobile',
				align         : 'left',
				disablePadding: false,
				label         : translate('Mobile'),
				sort          : true
			},
			{
				id            : 'masterCity',
				align         : 'left',
				disablePadding: false,
				label         : translate('City'),
				sort          : true
			},
			{
				id            : 'masterAddress',
				align         : 'left',
				disablePadding: false,
				label         : translate('Address'),
				sort          : true
			},	
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
                            <div className={classNames("flex items-center justify-center absolute w-64 pin-t pin-l ml-68 h-64 z-10", classes.actionsButtonWrapper)}>
                                <IconButton
                                    aria-owns={selectedMastersMenu ? 'selectedMastersMenu' : null}
                                    aria-haspopup="true"
                                    onClick={this.openSelectedMastersMenu}
                                >
                                    <Icon>more_horiz</Icon>
                                </IconButton>
                                <Menu
                                    id="selectedMastersMenu"
                                    anchorEl={selectedMastersMenu}
                                    open={Boolean(selectedMastersMenu)}
                                    onClose={this.closeSelectedMastersMenu}
                                >
                                    <MenuList>
                                        <MenuItem
                                            onClick={(event) => {
												this.props.onRemoveClick();
                                                this.closeSelectedMastersMenu();
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

export default withStyles(styles, {withTheme: true})(withTranslate(MastersTableHead));
