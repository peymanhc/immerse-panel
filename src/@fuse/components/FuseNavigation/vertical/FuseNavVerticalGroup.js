import React from 'react';
import {ListSubheader, withStyles} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import FuseNavVerticalCollapse from './FuseNavVerticalCollapse';
import FuseNavVerticalItem from './FuseNavVerticalItem';
import FuseNavVerticalLink from './FuseNavVerticalLink';
import { withTranslate } from 'react-redux-multilingual'; 

const propTypes = {
    item: PropTypes.shape(
        {
            id      : PropTypes.string.isRequired,
            title   : PropTypes.string,
            children: PropTypes.array
        })
};

const defaultProps = {};

const styles = theme => ({
    item: {
        height      : 40,
        width       : 'calc(100% - 16px)',
        borderRadius: '0 20px 20px 0',
        paddingRight: 12
    }
});

function FuseNavVerticalGroup({classes, item, nestedLevel, userRole, active, rolePath, translate})
{
    if ( item.auth && (!item.auth.includes(userRole) || (userRole !== 'guest' && item.auth.length === 1 && item.auth.includes('guest'))) )
    {
        return null;
    }
	if(rolePath && item.children){  //ignore group
		const allItemUrls = item.children.filter((child) => child.type === "item").map(({url}) => url);
		const allCollapseUrls = item.children.filter(({type}) => type=== "collapse").map(({children}) => children).flat().map(({url}) => url);
		const match = [...allItemUrls, ...allCollapseUrls].find(url => rolePath.find(route => url.startsWith(route)));
		if(!match)
			return null;		
	}
	
    let paddingValue = 40 + (nestedLevel * 16);
    const listItemPadding = nestedLevel > 0 ? 'pl-' + (paddingValue > 80 ? 80 : paddingValue) : 'pl-24';

    return (
        <React.Fragment>

            <ListSubheader disableSticky={true} className={classNames(classes.item, listItemPadding, "list-subheader flex items-center")}>
                <span className="list-subheader-text uppercase text-12">
                    {translate(item.title)}
                </span>
            </ListSubheader>

            {item.children && (
                <React.Fragment>
                    {
                        item.children.map((item) => (

                            <React.Fragment key={item.id}>

                                {item.type === 'group' && (
                                    <NavVerticalGroup item={item} nestedLevel={nestedLevel} active={active}/>
                                )}

                                {item.type === 'collapse' && (
                                    <FuseNavVerticalCollapse item={item} nestedLevel={nestedLevel} active={active}/>
                                )}

                                {item.type === 'item' && (
                                    <FuseNavVerticalItem item={item} nestedLevel={nestedLevel} active={active}/>
                                )}

                                {item.type === 'link' && (
                                    <FuseNavVerticalLink item={item} nestedLevel={nestedLevel} active={active}/>
                                )}

                            </React.Fragment>
                        ))
                    }
                </React.Fragment>
            )}
        </React.Fragment>
    );
}

function mapStateToProps({auth})
{
    return {
        userRole: auth.user.role,
		rolePath: auth.user.rolePath,
    }
}

FuseNavVerticalGroup.propTypes = propTypes;
FuseNavVerticalGroup.defaultProps = defaultProps;

const NavVerticalGroup = withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps)(FuseNavVerticalGroup)));

export default withTranslate(NavVerticalGroup);
