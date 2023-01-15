import React, {Component} from 'react';
import {Checkbox, Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Typography} from '@material-ui/core';
import {FuseUtils, FuseAnimate} from '@fuse';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import ReactTable from "react-table";
import * as Actions from '../store/actions';

class ProvinceList extends Component {

    state = {
        selectedProvincesMenu: null
    };
	
	componentDidMount(){
		//this.props.getProvinces();
	}
	
    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map((id) => entities[id]);
        if ( searchText.length === 0 )
        {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    openSelectedProvinceMenu = (event) => {
        this.setState({selectedProvincesMenu: event.currentTarget});
    };

    closeSelectedProvincesMenu = () => {
        this.setState({selectedProvincesMenu: null});
    };

    render()
    { 
        const { provinces, searchText, selectedProvinceIds, selectAllProvinces, deSelectAllProvinces, toggleInSelectedProvinces, 
			openEditProvinceDialog, removeProvinces, removeProvince} = this.props;
        const data = this.getFilteredArray(provinces, searchText);
        const {selectedProvincesMenu} = this.state; 
        if ( !data && data.length === 0 )
        {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        There are no provinces!
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
                                    openEditProvinceDialog(rowInfo.original);
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
                                        event.target.checked ? selectAllProvinces() : deSelectAllProvinces();
                                    }}
                                    checked={selectedProvinceIds.length === Object.keys(provinces).length && selectedProvinceIds.length > 0}
                                    indeterminate={selectedProvinceIds.length !== Object.keys(provinces).length && selectedProvinceIds.length > 0}
                                />
                            ),
                            accessor : "",
                            Cell     : row => {
                                return (<Checkbox
                                        onClick={(event) => {
                                            event.stopPropagation();
                                        }}
                                        checked={selectedProvinceIds.includes(row.value.id)}
                                        onChange={() => toggleInSelectedProvinces(row.value.id)}
                                    />
                                )
                            },
                            className: "justify-center",
                            sortable : false,
                            width    : 64
                        },
                        {
                            Header   : () => (
                                selectedProvinceIds.length > 0 ? (
                                    <React.Fragment>
                                        <IconButton
                                            aria-owns={selectedProvincesMenu ? 'selectedProvincesMenu' : null}
                                            aria-haspopup="true"
                                            onClick={this.openSelectedProvinceMenu}
                                        >
                                            <Icon>more_horiz</Icon>
                                        </IconButton>
                                        <Menu
                                            id="selectedProvincesMenu"
                                            anchorEl={selectedProvincesMenu}
                                            open={Boolean(selectedProvincesMenu)}
                                            onClose={this.closeSelectedProvincesMenu}
                                        >
                                            <MenuList>
                                                <MenuItem
                                                    onClick={() => {
                                                        removeProvinces(data.filter(({id}) => selectedProvinceIds.includes(id)).map(({id}) => id));
                                                        this.closeSelectedProvincesMenu();
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
									<div>Province</div>
								)
                            ),
                            className: "justify-center",
                            sortable : false,
							accessor  : "title",
							filterable: true,
                        },
                        {
                            Header    	: "Country",
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
                                            removeProvince(row.original.id);
                                        }}
                                    >
                                        <Icon>delete</Icon>
                                    </IconButton>
                                </div>
                            )
                        }
                    ]}
                    defaultPageSize={10}
                    noDataText="No provinces found"
                />
            </FuseAnimate>
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
		getProvinces 			 : Actions.getProvinces,		
        toggleInSelectedProvinces: Actions.toggleInSelectedProvinces,
        selectAllProvinces       : Actions.selectAllProvinces,
        deSelectAllProvinces     : Actions.deSelectAllProvinces,
        openEditProvinceDialog   : Actions.openEditProvinceDialog,
        removeProvinces          : Actions.removeProvinces,
        removeProvince           : Actions.removeProvince,
    }, dispatch);
}

function mapStateToProps({CountriesApp})
{ 
    return {
		provinces		   : CountriesApp.provinces.entities,	
        selectedProvinceIds: CountriesApp.provinces.selectedProvinceIds,
        searchText     : CountriesApp.provinces.searchText,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProvinceList));
