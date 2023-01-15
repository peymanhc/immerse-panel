import React from 'react';
import {withStyles, Typography, ListItem} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';
import _ from '@lodash';
import * as Actions from './store/actions';
import {connect} from 'react-redux';
import StoresChip from './StoresChip';

const styles = theme => ({
    storeItem: {
        '&.completed': {
            background                    : 'rgba(0,0,0,0.03)',
            '& .store-title, & .store-notes': {
                textDecoration: 'line-through'
            }
        }
    }
});

const StoresListItem = ({store, labels, classes, openEditStoresDialog}) => {
    return (
        <ListItem
            onClick={(ev) => {
                ev.preventDefault();
                openEditStoresDialog(store);
            }}
            dense
            button
            className={classNames(classes.storeItem, "border-solid border-b-1 py-16  px-0 sm:px-8")}
        >

            <div className="flex flex-1 flex-col relative overflow-hidden pl-8">

                <Typography
                    variant="subtitle1"
                    className="store-title truncate"
                    color={"default"}
                >
                    {store.title && store.title}
                </Typography>

                <Typography
                    color="textSecondary"
                    className="store-notes truncate"
                >
                    {_.truncate(store.text.replace(/<(?:.|\n)*?>/gm, ''), {'length': 180})}
                </Typography>
                <div className={classNames(classes.labels, "flex mt-8")}>
                    {					
						(store.disable && 
							<StoresChip
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
		openEditStoresDialog: Actions.openEditStoresDialog
    }, dispatch);
}

function mapStateToProps({storesApp})
{
    return {
        labels: null
    }
}

export default withStyles(styles, {withTheme: true})((connect(mapStateToProps, mapDispatchToProps))(StoresListItem));
