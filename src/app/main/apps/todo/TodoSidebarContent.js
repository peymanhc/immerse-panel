import React from 'react';
import {withStyles, Icon, List, ListItem, ListItemText, ListSubheader, Button} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import {NavLink, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from './store/actions';
import { withTranslate } from 'react-redux-multilingual';
import '../RTL.css';
 
const styles = theme => ({
    listItem: {
          direction:'rtl',
        color              : 'inherit!important',
        textDecoration     : 'none!important',
        height             : 40,
        width              : 'calc(100% - 16px)',         
         borderRadius:'20px 0 0px 20px',
            textAlign   : 'right',
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
            height  : 16, 
             paddingLeft: 10
        },
        '& .list-item-text'        : {
           position: 'absolute',
           right: 20
        },
        '& a div span':{
            textAlign   : 'right',
        },
    },
    text : {
        right: 0
    }
});

function TodoSidebarContent({classes, folders, filters, labels, openNewTodoDialog, translate})
{

    return (
        <FuseAnimate animation="transition.slideUpIn" delay={400}>

            <div className="flex-auto border-l-1 border-solid">

                <div className="p-24">
                    <Button
                        onClick={() => {
                            openNewTodoDialog();
                        }}
                        variant="contained"
                        color="primary"
                        className="w-full"
                    >
                        {translate('ADD_TASK')}
                    </Button>
                </div>

                <div className={classes.listWrapper}>

                    <List>
                        {folders.length > 0 && folders.map((folder) => (
                            <ListItem
                                button
                                component={NavLink}
                                to={'/apps/todo/' + folder.handle} key={folder.id}
                                activeClassName="active"
                                className={classes.listItem}
                            >
                                <Icon className="list-item-icon" color="action">{folder.icon}</Icon>
                                <ListItemText primary={folder.title} disableTypography={true}/>
                            </ListItem>
                        ))}
                    </List>

                    <List>
                        <ListSubheader className={classes.listSubheader} disableSticky>{translate('FILTERS')}</ListSubheader>

                        {filters.length > 0 && filters.map((filter) => (
                            <ListItem
                                button
                                component={NavLink}
                                to={'/apps/todo/filter/' + filter.handle}
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

                        <ListSubheader className="flex-wrap-reverse pr-24 pl-24" disableSticky>{translate('LABELS')}</ListSubheader>

                        {labels.length > 0 && labels.map((label) => (
                            <ListItem
                                button
                                component={NavLink}
                                to={'/apps/todo/label/' + label.handle}
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
        openNewTodoDialog: Actions.openNewTodoDialog
    }, dispatch);
}

function mapStateToProps({todoApp})
{
    return {
        folders: todoApp.folders,
        labels : todoApp.labels,
        filters: todoApp.filters
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(withTranslate(TodoSidebarContent))));
