import React from 'react';
import {withStyles, IconButton, Icon, Typography, ListItem} from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import amber from '@material-ui/core/colors/amber';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';
import _ from '@lodash';
import * as Actions from './store/actions';
import {connect} from 'react-redux';
import CataloglistChip from './CataloglistChip';

const styles = theme => ({
    catalogItem: {
        '&.completed': {
            background                    : 'rgba(0,0,0,0.03)',
            '& .catalog-title, & .catalog-notes': {
                textDecoration: 'line-through'
            }
        }
    }
});

const CataloglistListItem = ({catalog, labels, classes, openEditCataloglistDialog, toggleImportant, toggleStarred}) => {
    return (
        <ListItem
            onClick={(ev) => {
                ev.preventDefault();
                openEditCataloglistDialog(catalog);
            }}
            dense
            button
            className={classNames(classes.catalogItem, "border-solid border-b-1 py-16  px-0 sm:px-8")}
        >

            <div className="flex flex-1 flex-col relative overflow-hidden pl-8">

                <Typography
                    variant="subtitle1"
                    className="catalog-title truncate"
                    color={"default"}
                >
                    {catalog.title}
                </Typography>

                <Typography
                    color="textSecondary"
                    className="catalog-notes truncate"
                >
                    {_.truncate(catalog.text.replace(/<(?:.|\n)*?>/gm, ''), {'length': 180})}
                </Typography>
                <div className={classNames(classes.labels, "flex mt-8")}>
                    {					
						(catalog.disable && 
							<CataloglistChip
								className="mr-4"
								title={'disabled'}
								color={'#F44336'}
							/>						
						)
					}
                </div>
            </div>

            <div className="px-8">
                <IconButton onClick={(ev) => { 
                    ev.preventDefault();
                    ev.stopPropagation();
                    toggleImportant(catalog)
                }}>
                    {catalog.important ? (
                        <Icon style={{color: red[500]}}>error</Icon>
                    ) : (
                        <Icon>error_outline</Icon>
                    )}
                </IconButton>
                <IconButton onClick={(ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    toggleStarred(catalog)
                }}>
                    {catalog.starred ? (
                        <Icon style={{color: amber[500]}}>star</Icon>
                    ) : (
                        <Icon>star_outline</Icon>
                    )}
                </IconButton>
            </div>
        </ListItem>
    );
};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
		toggleImportant   : Actions.toggleCataloglistImportant,
		toggleStarred     : Actions.toggleCataloglistStarred,
		openEditCataloglistDialog: Actions.openEditCataloglistDialog
    }, dispatch);
}

function mapStateToProps({cataloglistApp})
{
    return {
        labels: null
    }
}

export default withStyles(styles, {withTheme: true})((connect(mapStateToProps, mapDispatchToProps))(CataloglistListItem));
