import React from 'react';
import {Hidden, Icon, IconButton, Input, MuiThemeProvider, Paper} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from './store/actions';

const DictionarysLabelHeader = ({setSearchText, searchText, pageLayout, mainTheme, openNewDictionarysDialog}) => {
    return (
        <MuiThemeProvider theme={mainTheme}>
            <div className="flex flex-1">
                <Paper className="flex items-center w-full h-48 sm:h-56 p-16 pl-4 md:pl-16 rounded-8 " elevation={1}>
                    <Hidden lgUp>
                        <IconButton
                            onClick={(ev) => pageLayout().toggleLeftSidebar()}
                            aria-label="open left sidebar"
                        >
                            <Icon>menu</Icon>
                        </IconButton>
                    </Hidden>

                    <Icon color="action">search</Icon>

                    <Input
                        placeholder="Search"
                        className="pl-16"
                        disableUnderline
                        fullWidth
                        value={searchText}
                        inputProps={{
                            'aria-label': 'Search'
                        }}
                        onChange={setSearchText}
                    />
                </Paper>
            </div>		
        </MuiThemeProvider>
    );
};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
         setSearchText: Actions.setDictionarysSearchText,
		 openNewDictionarydDialog: Actions.openNewDictionarysDialog
    }, dispatch);
}

function mapStateToProps({dictionarysApp, fuse})
{ 
    return {
        searchText: dictionarysApp.dictionarys.searchText,
        mainTheme : fuse.settings.mainTheme
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DictionarysLabelHeader);
