import React from 'react';
import {withStyles, Icon, ListItem, ListItemText} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from 'app/store/actions';
import FuseNavBadge from './../FuseNavBadge';
import { withTranslate } from 'react-redux-multilingual'; 

const propTypes = {
    item: PropTypes.shape(
        {
            id    : PropTypes.string.isRequired,
            title : PropTypes.string,
            icon  : PropTypes.string,
            url   : PropTypes.string,
            target: PropTypes.string
        })
};

const defaultProps = {};

const styles = theme => ({
    item: {
        height                     : 40,
        width                      : 'calc(100% - 16px)',
        borderRadius               : '0 20px 20px 0',
        paddingRight               : 12,
        '&.active'                 : {
            backgroundColor            : theme.palette.secondary.main,
            color                      : theme.palette.secondary.contrastText + '!important',
            pointerEvents              : 'none',
            transition                 : 'border-radius .15s cubic-bezier(0.4,0.0,0.2,1)',
            '& .list-item-text-primary': {
                color: 'inherit'
            },
            '& .list-item-icon'        : {
                color: 'inherit'
            }
        },
        '&.square, &.active.square': {
            width       : '100%',
            borderRadius: '0'
        },
        '& .list-item-icon'        : {},
        '& .list-item-text'        : {},
        color                      : 'inherit!important',
        textDecoration             : 'none!important'
    }
});

function FuseNavVerticalLink({item, classes, nestedLevel, userRole, navbarCloseMobile, active, translate})
{
    if ( item.auth && (!item.auth.includes(userRole) || (userRole !== 'guest' && item.auth.length === 1 && item.auth.includes('guest'))) )
    {
        return null;
    }

    let paddingValue = 40 + (nestedLevel * 16);
    const listItemPadding = nestedLevel > 0 ? 'pl-' + (paddingValue > 80 ? 80 : paddingValue) : 'pl-24';

    return (
        <ListItem
            button
            component="a"
            href={item.url}
            target={item.target ? item.target : "_blank"}
            className={classNames(classes.item, listItemPadding, 'list-item', active)}
            onClick={navbarCloseMobile}
        >
            {item.icon && (
                <Icon className="list-item-icon text-16 flex-no-shrink" color="action">{item.icon}</Icon>
            )}
            <ListItemText className="list-item-text" primary={translate(item.title)} classes={{primary: 'text-14 list-item-text-primary'}}/>
            {item.badge && (
                <FuseNavBadge badge={item.badge}/>
            )}
        </ListItem>
    );
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        navbarCloseMobile: Actions.navbarCloseMobile
    }, dispatch);
}

function mapStateToProps({auth, fuse})
{
    return {
        userRole: auth.user.role
    }
}

FuseNavVerticalLink.propTypes = propTypes;
FuseNavVerticalLink.defaultProps = defaultProps;

const NavVerticalLink = withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(FuseNavVerticalLink)));

export default withTranslate(NavVerticalLink);
