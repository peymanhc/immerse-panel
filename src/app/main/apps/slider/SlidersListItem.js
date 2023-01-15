import React from 'react';
import {withStyles, IconButton, Icon, Typography, ListItem} from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import amber from '@material-ui/core/colors/amber';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';
import _ from '@lodash';
import * as Actions from './store/actions';
import {connect} from 'react-redux';
import SlidersChip from './SlidersChip';

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

const SlidersListItem = ({slider, labels, classes, openEditSlidersDialog, toggleImportant, toggleStarred}) => {
    return (
        <ListItem
            onClick={(ev) => {
                ev.preventDefault();
                openEditSlidersDialog(slider);
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
                    {slider.title}
                </Typography>

                <Typography
                    color="textSecondary"
                    className="slider-notes truncate"
                >
                    {_.truncate(slider.text.replace(/<(?:.|\n)*?>/gm, ''), {'length': 180})}
                </Typography>
                <div className={classNames(classes.labels, "flex mt-8")}>
                    {					
						(slider.disable && 
							<SlidersChip
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
                    toggleImportant(slider)
                }}>
                    {slider.important ? (
                        <Icon style={{color: red[500]}}>error</Icon>
                    ) : (
                        <Icon>error_outline</Icon>
                    )}
                </IconButton>
                <IconButton onClick={(ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    toggleStarred(slider)
                }}>
                    {slider.starred ? (
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
		toggleImportant   : Actions.toggleSlidersImportant,
		toggleStarred     : Actions.toggleSlidersStarred,
		openEditSlidersDialog: Actions.openEditSlidersDialog
    }, dispatch);
}

function mapStateToProps({slidersApp})
{
    return {
        labels: null
    }
}

export default withStyles(styles, {withTheme: true})((connect(mapStateToProps, mapDispatchToProps))(SlidersListItem));
