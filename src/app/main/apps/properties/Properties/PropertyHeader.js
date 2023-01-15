import React from 'react';
import {Hidden, Icon, IconButton, Input, MuiThemeProvider, Paper, Button} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../store/actions';
import { withTranslate } from 'react-redux-multilingual';

const PropertyHeader = ({setSearchText, searchText, pageLayout, mainTheme, openNewPropertyDialog, translate}) => {
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
                        placeholder={translate('search')}
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

                <div className="p-24">
                    <Button
                        onClick={() => {
                            openNewPropertyDialog();
                        }}
                        variant="contained"
                        
                        className="whitespace-no-wrap"
                    >
                        {translate('ADD_Property')}
                    </Button>
                </div>
				
        </MuiThemeProvider>
    );
};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        setSearchText: Actions.setSearchText,
		openNewPropertyDialog: Actions.openNewPropertyDialog
    }, dispatch);
}

function mapStateToProps({PropertyApp, fuse})
{ 
    return {
        searchText: PropertyApp.propertys.searchText,
        mainTheme : fuse.settings.mainTheme
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslate(PropertyHeader));
