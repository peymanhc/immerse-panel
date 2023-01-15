import React, {useState} from 'react';
import {Icon,  Typography, Avatar, IconButton, TextField} from '@material-ui/core';
import connect from 'react-redux/es/connect/connect';
import {bindActionCreators} from 'redux';
import * as Actions from '../../store/actions/newWarranty.actions';
import { withTranslate } from 'react-redux-multilingual';  
import {FuseChipSelect} from '@fuse';


const Specification = ({translate, warranty, openAddUserDialog, status, companies, addDataToWarranty }) => {
	
	const [value, setValue] = useState ({
		statusId			: null,
		companyId			: null,
		buyTypeId			: null,
		description			: '',		
	});
	
    const {description, buyTypeId} = value;

	const allStatus 		= status.map(({name: label, id: value}) => ({value, label}));
	let selectedStatus 		= [];
	if(warranty.status.length)
		selectedStatus = allStatus.find(({value:id}) => id === warranty.status[0].id);

	const allCompanies 		= companies.map(({id:value, companyName:label}) => ({value, label}));
	let selectedCompany 	= [];
	if(warranty.companies.length)
		selectedCompany = allCompanies.find(({value:id}) => id === warranty.companies[0].id);	
	
	const buyTypes = [
		{value:'1', label:'نقدی'},
		{value:'2', label:'غیر نقدی'},
	];
	const selectedBuyType = buyTypes.find(({value:id}) => id === buyTypeId);
	
	const selectOnChange = (name, newValue) => {
		setValue({...value, [name] : newValue});
		
		if(name === "companyId"){
			const company = companies.find(({id}) => id === newValue);
			addDataToWarranty({companies:[company]});
		}
		if(name === "statusId"){
			const findStatus = status.find(({id}) => id === newValue);
			addDataToWarranty({status:[findStatus]});
		}		
	};
	
	return (
		<div>
			<div className="pb-16">
		
				<div className="pb-16 flex items-center">
					<Icon className="mr-16" color="action">account_circle</Icon>
					<Typography className="h2" color="textSecondary">{translate('CustomerWarranty')}</Typography>
					<IconButton className="ml-16" onClick={openAddUserDialog}><Icon color="action" fontSize="large">add_circle</Icon></IconButton>
				</div>
		
				<div className="mb-16">
					
					<div className="table-responsive mb-16">
					{
						warranty.customer !== null &&
							<table className="simple">
								<thead>
									<tr>
										<th>{translate('warranty_Name')}</th>
										<th>{translate('warranty_Email')}</th>
										<th>{translate('warranty_Phone')}</th>
										<th>{translate('warranty_Company')}</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>
											<div className="flex items-center">
												<Avatar className="mr-8" src={warranty.customer.avatar}/>
												<Typography className="truncate">
													{warranty.customer.firstName + ' ' + warranty.customer.lastName}
												</Typography>
											</div>
										</td>
										<td>
											<Typography className="truncate">{warranty.customer.email}</Typography>
										</td>
										<td>
											<Typography className="truncate">{warranty.customer.phone}</Typography>
										</td>
										<td>
											<span className="truncate">{warranty.customer.company}</span>
										</td>
									</tr>
								</tbody>
							</table>													
					}
					</div>
				</div>
				
				<div className="pb-16 flex items-center">
					<Icon className="mr-16" color="action">location_on</Icon>												
					<Typography className="h2" color="textSecondary">{translate('Address')}</Typography>
				</div>
				<div className="mb-24">
					{
						warranty.invoiceAddress.length ? warranty.invoiceAddress[0].address : ''
					}											
				</div>
				
				<div className="pb-8 flex items-center">
					<FuseChipSelect
						onChange={(row) => {selectOnChange('companyId', row.value)}}
						className="w-1/3  mb-16 mr-24"
						value={selectedCompany || null}
						placeholder='search a company'
						textFieldProps={{
							label          : 'Companies',
							InputLabelProps: {
								shrink: true
							},
							variant        : 'outlined',
						}}
						options={allCompanies}
					/> 											
					<FuseChipSelect
						onChange={(row) => {selectOnChange('buyTypeId', row.value)}}
						className="w-1/3  mb-16 mr-24"
						value={selectedBuyType || null}
						placeholder={translate("Search_a_buytype")}
						textFieldProps={{
							label          : 'Buy Type',
							InputLabelProps: {
								shrink: true
							},
							variant        : 'outlined',							
						}}
						options={buyTypes}						
					/>	
						<FuseChipSelect
						onChange={(row) => {selectOnChange('statusId', row.value)}}
						className="w-1/3 mb-24 mr-24"
						value={selectedStatus || null}
						placeholder={translate("Search_a_status")}
						textFieldProps={{
							label          : 'Status',
							InputLabelProps: {
								shrink: true
							},
							variant        : 'outlined',							
						}}
						options={allStatus}						
					/>	

				</div>											
				<div className="pb-16 flex items-center">
					<TextField
						className="mt-8 mb-16"
						id="description"
						name="description"
						onChange={(event) => {selectOnChange('description', event.target.value)}}
						label={translate('Description')}
						type="text"
						value={description}
						multiline
						rows={2}
						variant="outlined"
						fullWidth
					/>												
				</div>	
				 	
			</div>
		</div>
	)
};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
		openAddUserDialog	: Actions.openAddUserDialog,
    }, dispatch);
}

function mapStateToProps({eCommerceApp})
{
    return {
		status		: eCommerceApp.newWarranty.status,
		companies	: eCommerceApp.newWarranty.companies,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslate(Specification));