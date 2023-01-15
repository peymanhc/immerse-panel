import React, {Component} from 'react';
import {Checkbox, Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Typography} from '@material-ui/core';
import {FuseUtils, FuseAnimate} from '@fuse';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import ReactTable from "react-table";
import * as Actions from '../store/actions';

class CountryList extends Component {

    state = {
        selectedCountriesMenu: null
    };
	
	componentDidMount(){
		//this.props.getCountries();
	}
	
    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map((id) => entities[id]);
        if ( searchText.length === 0 )
        {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    openSelectedCountryMenu = (event) => {
        this.setState({selectedCountriesMenu: event.currentTarget});
    };

    closeSelectedCountriesMenu = () => {
        this.setState({selectedCountriesMenu: null});
    };

    render()
    {
        const { countries, searchText, selectedCountryIds, selectAllCountries, deSelectAllCountries, toggleInSelectedCountries, 
			openEditCountryDialog, removeCountries, removeCountry} = this.props;
        const data = this.getFilteredArray(countries, searchText);
        const {selectedCountriesMenu} = this.state;

        if ( !data && data.length === 0 )
        {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        There are no countries!
                    </Typography>
                </div>
            );
        }

        return (
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <ReactTable
                    className="-striped -highlight border-0"
                    getTrProps={(state, rowInfo, column) => {
                        return {
                            className: "cursor-pointer",
                            onClick  : (e, handleOriginal) => {
                                if ( rowInfo )
                                {
                                    openEditCountryDialog(rowInfo.original);
                                }
                            }
                        }
                    }}
                    data={data}
                    columns={[
                        {
                            Header   : () => (
                                <Checkbox
                                    onClick={(event) => {
                                        event.stopPropagation();
                                    }}
                                    onChange={(event) => {
                                        event.target.checked ? selectAllCountries() : deSelectAllCountries();
                                    }}
                                    checked={selectedCountryIds.length === Object.keys(countries).length && selectedCountryIds.length > 0}
                                    indeterminate={selectedCountryIds.length !== Object.keys(countries).length && selectedCountryIds.length > 0}
                                />
                            ),
                            accessor : "",
                            Cell     : row => {
                                return (<Checkbox
                                        onClick={(event) => {
                                            event.stopPropagation();
                                        }}
                                        checked={selectedCountryIds.includes(row.value.id)}
                                        onChange={() => toggleInSelectedCountries(row.value.id)}
                                    />
                                )
                            },
                            className: "justify-center",
                            sortable : false,
                            width    : 64
                        },
                        {
                            Header   : () => (
                                selectedCountryIds.length > 0 ? (
                                    <React.Fragment>
                                        <IconButton
                                            aria-owns={selectedCountriesMenu ? 'selectedCountriesMenu' : null}
                                            aria-haspopup="true"
                                            onClick={this.openSelectedCountryMenu}
                                        >
                                            <Icon>more_horiz</Icon>
                                        </IconButton>
                                        <Menu
                                            id="selectedCountriesMenu"
                                            anchorEl={selectedCountriesMenu}
                                            open={Boolean(selectedCountriesMenu)}
                                            onClose={this.closeSelectedCountriesMenu}
                                        >
                                            <MenuList>
                                                <MenuItem
                                                    onClick={() => {
                                                        removeCountries(selectedCountryIds);
                                                        this.closeSelectedCountriesMenu();
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Icon>delete</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText inset primary="Remove"/>
                                                </MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </React.Fragment>
                                ): (
									<div> gateway title </div>
								)
                            ),
							accessor  : "title",
                            filterable: true,
                            className: "justify-center",						
                        },
                        {
                            Header    : "des",
                            accessor  : "des",
                            filterable: true,
                            className: "justify-center",
                        },
                         					
                        {
                            Header: "",
                            width : 128,
                            Cell  : row => (
                                <div className="flex items-center">
                                    <IconButton
                                        onClick={(ev) => {
                                            ev.stopPropagation();
                                            removeCountry(row.original.id);
                                        }}
                                    >
                                        <Icon>delete</Icon>
                                    </IconButton>
                                </div>
                            )
                        }
                    ]}
                    defaultPageSize={10}
                    noDataText="No countries found"
                />
            </FuseAnimate>
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
		getCountries 			 : Actions.getCountries,		      
        toggleInSelectedCountries: Actions.toggleInSelectedCountries,
        selectAllCountries       : Actions.selectAllCountries,
        deSelectAllCountries     : Actions.deSelectAllCountries,
        openEditCountryDialog    : Actions.openEditCountryDialog,
        removeCountries          : Actions.removeCountries,
        removeCountry            : Actions.removeCountry,
        toggleStarredCountry     : Actions.toggleStarredCountry,
        toggleStarredCountries   : Actions.toggleStarredCountries,
        setCountriesStarred      : Actions.setCountriesStarred,
        setCountriesUnstarred    : Actions.setCountriesUnstarred,
    }, dispatch);
}

function mapStateToProps({CountriesApp})
{
    return {
		countries			: CountriesApp.countries.entities,	
        selectedCountryIds	: CountriesApp.countries.selectedCountryIds,
        searchText     		: CountriesApp.countries.searchText,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CountryList));
