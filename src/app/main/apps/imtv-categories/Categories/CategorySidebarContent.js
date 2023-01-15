import React from 'react';
import {withStyles, Icon, List, ListItem, ListItemText, ListSubheader, Button} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import {NavLink, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../store/actions';

const styles = theme => ({
    listItem: {
        color              : 'inherit!important',
        textDecoration     : 'none!important',
        height             : 40,
        width              : 'calc(100% - 16px)',
        borderRadius       : '0 20px 20px 0',
        paddingLeft        : 24,
        paddingRight       : 12,
        '&.active'         : {
            backgroundColor    : theme.palette.secondary.main,
            color              : theme.palette.secondary.contrastText + '!important',
            pointerEvents      : 'none',
            '& .list-item-icon': {
                color: 'inherit'
            }
        },
        '& .list-item-icon': {
            fontSize: 16,
            width   : 16,
            height  : 16
        }
    }
});

function CategorySidebarContent({classes, folders, filters, labels, openNewLabelDialog})
{
	const folder = {
        'id'    : 0,
        'handle': 'all',
        'title' : 'All',
        'icon'  : 'view_headline'
    }
    return (
        <FuseAnimate animation="transition.slideUpIn" delay={400}>

            <div className="flex-auto border-l-1 border-solid">

                <div className="p-24">
                    <Button
                        onClick={() => {
                            openNewLabelDialog();
                        }}
                        variant="contained"
                        color="primary"
                        className="w-full"
                    >
                        ADD Label
                    </Button>
                </div>

                <div className={classes.listWrapper}>
                    <List>
                        <ListItem
                            button
                            component={NavLink}
                            to={'/apps/imtv-categories/' + folder.handle} key={folder.id}
                            activeClassName="active"
                            className={classes.listItem}
                        >
                            <Icon className="list-item-icon" color="action">{folder.icon}</Icon>
                            <ListItemText primary={folder.title} disableTypography={true}/>
                        </ListItem>
                    </List>
                    <List>
                        <ListSubheader className={classes.listSubheader} disableSticky>FILTERS</ListSubheader>

                        {filters.length > 0 && filters.map((filter) => (
                            <ListItem
                                button
                                component={NavLink}
                                to={'/apps/imtv-categories/filter/' + filter.handle}
                                activeClassName="active"
                                className={classes.listItem}
                                key={filter.id}
                            >
                                <Icon className="list-item-icon" color="action">{filter.icon}</Icon>
                                <ListItemText primary={filter.title} disableTypography={true}/>
                            </ListItem>
                        ))}
                    </List>

                    <List>

                        <ListSubheader className="pr-24 pl-24" disableSticky>LABELS</ListSubheader>

                        {labels.length > 0 && labels.map((label) => (
                            <ListItem
                                button
                                component={NavLink}
                                to={'/apps/imtv-categories/label/' + label.handle}
                                key={label.id}
                                className={classes.listItem}
                            >
                                <Icon className="list-item-icon" style={{color: label.color}}
                                      color="action">label</Icon>
                                <ListItemText primary={label.title} disableTypography={true}/>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </div>
        </FuseAnimate>
    );
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        openNewLabelDialog: Actions.openNewLabelDialog
    }, dispatch);
}

function mapStateToProps({imtvCategoryApp})
{
    return {
        folders: imtvCategoryApp.folders,
        labels : imtvCategoryApp.labels,
        filters: imtvCategoryApp.filters
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(CategorySidebarContent)));
