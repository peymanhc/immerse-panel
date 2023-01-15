import React, {Component} from 'react';
import {Checkbox, Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Typography} from '@material-ui/core';
import {FuseUtils, FuseAnimate} from '@fuse';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import ReactTable from "react-table";
import * as Actions from '../store/actions';

class CityList extends Component {

    state = {
        selectedCitiesMenu: null
    };
	
	componentDidMount(){
		//this.props.getCities();
	}
	
    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map((id) => entities[id]);
        if ( searchText.length === 0 )
        {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    openSelectedCityMenu = (event) => {
        this.setState({selectedCitiesMenu: event.currentTarget});
    };

    closeSelectedCitiesMenu = () => {
        this.setState({selectedCitiesMenu: null});
    };

    render()
    { 
        const { cities, searchText, selectedCityIds, selectAllCities, deSelectAllCities, toggleInSelectedCities, 
			openEditCityDialog, removeCities, removeCity} = this.props;
        const data = this.getFilteredArray(cities, searchText);
        const {selectedCitiesMenu} = this.state; 
        if ( !data && data.length === 0 )
        {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        There are no cities!
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
                                    openEditCityDialog(rowInfo.original);
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
                                        event.target.checked ? selectAllCities() : deSelectAllCities();
                                    }}
                                    checked={selectedCityIds.length === Object.keys(cities).length && selectedCityIds.length > 0}
                                    indeterminate={selectedCityIds.length !== Object.keys(cities).length && selectedCityIds.length > 0}
                                />
                            ),
                            accessor : "",
                            Cell     : row => {
                                return (<Checkbox
                                        onClick={(event) => {
                                            event.stopPropagation();
                                        }}
                                        checked={selectedCityIds.includes(row.value.id)}
                                        onChange={() => toggleInSelectedCities(row.value.id)}
                                    />
                                )
                            },
                            className: "justify-center",
                            sortable : false,
                            width    : 64
                        },
                        {
                            Header   : () => (
                                selectedCityIds.length > 0 ? (
                                    <React.Fragment>
                                        <IconButton
                                            aria-owns={selectedCitiesMenu ? 'selectedCitiesMenu' : null}
                                            aria-haspopup="true"
                                            onClick={this.openSelectedCityMenu}
                                        >
                                            <Icon>more_horiz</Icon>
                                        </IconButton>
                                        <Menu
                                            id="selectedCitiesMenu"
                                            anchorEl={selectedCitiesMenu}
                                            open={Boolean(selectedCitiesMenu)}
                                            onClose={this.closeSelectedCitiesMenu}
                                        >
                                            <MenuList>
                                                <MenuItem
                                                    onClick={() => {
                                                        removeCities(data.filter(({id}) => selectedCityIds.includes(id)).map(({id}) => id));
                                                        this.closeSelectedCitiesMenu();
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
                                ):(
									<div> lines </div>
								)
                            ),
                            className: "justify-center",
                            sortable : false,
							accessor  : "title",
							filterable: true,
                        },
                        {
                            Header    	: "gateways service",
                            accessor  	: "country",
                            className	: "justify-center",
							filterable	: true,
                        },		
                        {
                            Header    : "Lat",
                            accessor  : "lat",
                            className: "justify-center",
							filterable: true,
                        },		
                        {
                            Header    : "Long",
                            accessor  : "long",
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
                                            removeCity(row.original.id);
                                        }}
                                    >
                                        <Icon>delete</Icon>
                                    </IconButton>
                                </div>
                            )
                        }
                    ]}
                    defaultPageSize={10}
                    noDataText="No cities found"
                />
            </FuseAnimate>
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
		getCities 			 : Actions.getCities,		
        toggleInSelectedCities: Actions.toggleInSelectedCities,
        selectAllCities       : Actions.selectAllCities,
        deSelectAllCities     : Actions.deSelectAllCities,
        openEditCityDialog   : Actions.openEditCityDialog,
        removeCities          : Actions.removeCities,
        removeCity           : Actions.removeCity,
    }, dispatch);
}

function mapStateToProps({CountriesApp})
{ 
    return {
		cities		   : CountriesApp.cities.entities,	
        selectedCityIds: CountriesApp.cities.selectedCityIds,
        searchText     : CountriesApp.cities.searchText,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CityList));
