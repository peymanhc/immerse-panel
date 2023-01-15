﻿import React from 'react';
import {Paper, Button, Input, Icon, Typography, MuiThemeProvider} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import * as Actions from '../store/actions/posts';
import { withTranslate } from 'react-redux-multilingual';

const PostsHeader = ({setSearchText, searchText, mainTheme, translate}) => {

    return (
        <div className="flex flex-1 w-full items-center justify-between">

            <div className="flex items-center">
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <Icon className="text-32 mr-0 sm:mr-12">text_fields</Icon>
                </FuseAnimate>
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography className="hidden sm:flex" variant="h6">Posts</Typography>
                </FuseAnimate>
            </div>

            <div className="flex flex-1 items-center justify-center px-12">

                <MuiThemeProvider theme={mainTheme}>
                    <FuseAnimate animation="transition.slideDownIn" delay={300}>
                        <Paper className="flex items-center w-full max-w-512 px-8 py-4 rounded-8" elevation={1}>

                            <Icon className="mr-8" color="action">search</Icon>

                            <Input
                                placeholder={translate('search')}
                                className="flex flex-1"
                                disableUnderline
                                fullWidth
                                value={searchText}
                                inputProps={{
                                    'aria-label': 'Search'
                                }}
                                onChange={setSearchText}
                            />
                        </Paper>
                    </FuseAnimate>
                </MuiThemeProvider>

            </div>
            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <Button component={Link} to="/apps/idea/posts/new" className="whitespace-no-wrap" variant="contained">
                    <span className="hidden sm:flex">New Post</span>
                    <span className="flex sm:hidden">{translate('new')}</span>
                </Button>
            </FuseAnimate>
        </div>
    );
};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        setSearchText: Actions.setPostsSearchText
    }, dispatch);
}

function mapStateToProps({ideaApp, fuse})
{
    return {
        searchText: ideaApp.posts.searchText,
        mainTheme : fuse.settings.mainTheme
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslate(PostsHeader));