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

class PostsTableHead extends React.Component {
    state = {
        selectedPostsMenu: null
    };

    createSortHandler = property => event => {

        this.props.onRequestSort(event, property);
    };

    openSelectedPostsMenu = (event) => {
        this.setState({selectedPostsMenu: event.currentTarget});
    };

    closeSelectedPostsMenu = () => {
        this.setState({selectedPostsMenu: null});
    };

    render()
    {
        const {onSelectAllClick, order, orderBy, numSelected, rowCount, classes, translate} = this.props;
        const {selectedPostsMenu} = this.state;
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
        align         : 'center',
        disablePadding: false,
        label         : translate('Name'),
        sort          : true
    },
    {
        id            : 'categories',
        align         : 'center',
        disablePadding: false,
        label         : translate('Category'),
        sort          : true
    },
    {
        id            : 'description',
        align         : 'center',
        disablePadding: false,
        label         : translate('Description'),
        sort          : true
    },	
    {
        id            : 'date',
        align         : 'center',
        disablePadding: false,
        label         : translate('Date'),
        sort          : true
    },
    {
        id            : 'publish',
        align         : 'right',
        disablePadding: false,
        label         : translate('Publish'),
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
                            <div className={classNames("flex items-center justify-center absolute w-64 pin-t pin-l ml-68 h-64 z-10", classes.actionsButtonWrapper)}>
                                <IconButton
                                    aria-owns={selectedPostsMenu ? 'selectedPostsMenu' : null}
                                    aria-haspopup="true"
                                    onClick={this.openSelectedPostsMenu}
                                >
                                    <Icon>more_horiz</Icon>
                                </IconButton>
                                <Menu
                                    id="selectedPostsMenu"
                                    anchorEl={selectedPostsMenu}
                                    open={Boolean(selectedPostsMenu)}
                                    onClose={this.closeSelectedPostsMenu}
                                >
                                    <MenuList>
                                        <MenuItem
                                            onClick={(event) => {
												this.props.onRemoveClick();
                                                this.closeSelectedPostsMenu();
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

export default withStyles(styles, {withTheme: true})(withTranslate(PostsTableHead));
