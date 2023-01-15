import React from 'react';
import {withStyles, IconButton, Icon, Typography, ListItem} from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import amber from '@material-ui/core/colors/amber';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';
import _ from '@lodash';
import * as Actions from './store/actions';
import {connect} from 'react-redux';
import DictionarysChip from './DictionarysChip';

const styles = theme => ({
    sliderItem: {
        '&.completed': {
            background                    : 'rgba(0,0,0,0.03)',
            '& .slider-title, & .slider-notes': {
                textDecoration: 'line-through'
            }
        }
    }
});

const DictionarysListItem = ({dictionary, labels, classes, openEditDialog, toggleImportant, toggleStarred}) => {
    return (
        <ListItem
            onClick={(ev) => {
                ev.preventDefault();
                openEditDialog(dictionary);
            }}
            dense
            button
            className={classNames(classes.sliderItem, "border-solid border-b-1 py-16  px-0 sm:px-8")}
        >

            <div className="flex flex-1 flex-col relative overflow-hidden pl-8">

                <Typography
                    variant="subtitle1"
                    className="slider-title truncate"
                    color={"default"}
                >
                    {dictionary.title}
                </Typography>

                <Typography
                    color="textSecondary"
                    className="slider-notes truncate"
                >
                    {_.truncate(dictionary.text.replace(/<(?:.|\n)*?>/gm, ''), {'length': 180})}
                </Typography>



<div className={classNames(classes.labels, "flex mt-8")}>
                    {					
						(dictionary.disable && 
							<DictionarysChip
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
                    toggleImportant(dictionary)
                }}>
                    {dictionary.important ? (
                        <Icon style={{color: red[500]}}>error</Icon>
                    ) : (
                        <Icon>error_outline</Icon>
                    )}
                </IconButton>
                <IconButton onClick={(ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    toggleStarred(dictionary)
                }}>
                    {dictionary.starred ? (
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
		toggleImportant   : Actions.toggleDictionarysImportant,
		toggleStarred     : Actions.toggleDictionarysStarred,
		openEditDictionarysDialog: Actions.openEditDictionarysDialog
    }, dispatch);
}

function mapStateToProps({dictionaryApp})
{
    return {
        labels: null
    }
}

export default withStyles(styles, {withTheme: true})((connect(mapStateToProps, mapDispatchToProps))(DictionarysListItem));
