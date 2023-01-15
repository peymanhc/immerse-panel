import React from 'react';
import {withStyles, Typography, ListItem} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';
import _ from '@lodash';
import * as Actions from './store/actions';
import {connect} from 'react-redux';
import ShopsChip from './ShopsChip';

const styles = theme => ({
    shopItem: {
        '&.completed': {
            background                    : 'rgba(0,0,0,0.03)',
            '& .shop-title, & .shop-notes': {
                textDecoration: 'line-through'
            }
        }
    }
});

const ShopsListItem = ({shop, labels, classes, openEditShopsDialog}) => {
    return (
        <ListItem
            onClick={(ev) => {
                ev.preventDefault();
                openEditShopsDialog(shop);
            }}
            dense
            button
            className={classNames(classes.shopItem, "border-solid border-b-1 py-16  px-0 sm:px-8")}
        >

            <div className="flex flex-1 flex-col relative overflow-hidden pl-8">

                <Typography
                    variant="subtitle1"
                    className="shop-title truncate"
                    color={"default"}
                >
                    {shop.title && shop.title}
                </Typography>

                <Typography
                    color="textSecondary"
                    className="shop-notes truncate"
                >
                    {_.truncate(shop.text.replace(/<(?:.|\n)*?>/gm, ''), {'length': 180})}
                </Typography>
                <div className={classNames(classes.labels, "flex mt-8")}>
                    {					
						(shop.disable && 
							<ShopsChip
								className="mr-4"
								title={'disabled'}
								color={'#F44336'}
							/>						
						)
					}
                </div>
            </div>

            <div className="px-8">
            </div>
        </ListItem>
    );
};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
		openEditShopsDialog: Actions.openEditShopsDialog
    }, dispatch);
}

function mapStateToProps({shopsApp})
{
    return {
        labels: null
    }
}

export default withStyles(styles, {withTheme: true})((connect(mapStateToProps, mapDispatchToProps))(ShopsListItem));
