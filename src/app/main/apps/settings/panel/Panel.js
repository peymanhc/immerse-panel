import React from 'react'; 
import {withStyles,  TextField} from '@material-ui/core';
import {FuseChipSelect} from '@fuse';
//import classNames from 'classnames';
import { withTranslate } from 'react-redux-multilingual'; 

const styles = theme => ({
	
});

const Panel = ({classes, form, languageOnChange,  handleChange , translate}) => {
	const allLanguages = [
		{
			value:'en',
			label:'English',
		},
		{
			value:'fa',
			label:'Persian',		
		}
	]; 
	const innerLanguageOnChange = (row) => {
		languageOnChange('panelLanguage', row.value);
	};
	const selectedLanguage = allLanguages.find(({value:id}) => id === form.panelLanguage);
	
	return ( 
		<div> 
         <div className="flex" >
            <TextField   maxlength="1" 
                className="mt-8 mb-16 mr-8"
                label={translate('distanceMatrixVal')} 
                id="distanceMatrixVal"
                name="distanceMatrixVal"
                inputProps={{ maxLength: 8  }}	
                value={form.distanceMatrixVal}
                onChange={handleChange}
                variant="outlined"
                 type="number"                
            />          
            <TextField
                className="mt-8 mb-16 mr-8"
                label={translate('CountMaster')} 
                id="CountMaster"
                name="CountMaster"
                value={form.CountMaster}
                onChange={handleChange}
                variant="outlined"
                 type="number"  
                  inputProps={{ maxLength: 3  }}                  
            />   
          <TextField
                className="mt-8 mb-16 mr-8"
                label={translate('TripMaster')} 
                id="TripMaster"
                name="TripMaster"
                value={form.TripMaster}
                onChange={handleChange}
                variant="outlined"
                 type="number"  
                  inputProps={{ maxLength: 2  }}                  
            />  
               <TextField
                className="mt-8 mb-16 mr-8"
                label={translate('surgePrice')} 
                id="surgePrice"
                name="surgePrice"
                value={form.surgePrice}
                onChange={handleChange}
                variant="outlined"
                maxlength="2"
                 type="number"  
                  inputProps={{ maxLength: 2  }}                  
            />  
        </div> 
        <div className="flex" >
            <TextField
                className="mt-8 mb-16 mr-8"
                label={translate('hardLimit')} 
                id="hardLimit"
                name="hardLimit"
                value={form.hardLimit}
                onChange={handleChange}
                variant="outlined"
                 type="number"
                fullWidth
            />          
            <TextField
                className="mt-8 mb-16 mr-8"
                label={translate('newBookingMaxSearchTime')} 
                id="newBookingMaxSearchTime"
                name="newBookingMaxSearchTime"
                value={form.newBookingMaxSearchTime}
                onChange={handleChange}
                variant="outlined"
                type="number"
                fullWidth
            />  
        </div> 

     

         <div className="flex" >
            <TextField
                className="mt-8 mb-16 mr-8"
                label={translate('andCust')} 
                id="andCust"
                name="andCust"
                value={form.andCust}
                onChange={handleChange}
                variant="outlined"
                 type="text"                
            />          
            <TextField
                className="mt-8 mb-16 mr-8"
                label={translate('iosCust')} 
                id="iosCust"
                name="iosCust"
                value={form.iosCust}
                onChange={handleChange}
                variant="outlined"
                type="text"                 
            />    <TextField
                className="mt-8 mb-16 mr-8"
                label={translate('andDriver')} 
                id="andDriver"
                name="andDriver"
                value={form.andDriver}
                onChange={handleChange}
                variant="outlined"
                 type="text"                
            />          
            <TextField
                className="mt-8 mb-16 mr-8"
                label={translate('iosDriver')} 
                id="iosDriver"
                name="iosDriver"
                value={form.iosDriver}
                onChange={handleChange}
                variant="outlined"
                type="text"                 
            />  
        </div> 
        <div className="flex" >
            <TextField
                className="mt-8 mb-16 mr-8"
                label={translate('mandatory')} 
                id="mandatory"
                name="mandatory"
                value={form.mandatory}
                onChange={handleChange}
                variant="outlined"
                 type="number"                
            /> 
              <TextField
                className="mt-8 mb-16 mr-8"
                label={translate('updatelink')} 
                id="updatelink"
                name="updatelink"
                value={form.updatelink}
                onChange={handleChange}
                variant="outlined"
                 type="text"  
                  fullWidth              
            /> 
        </div>  

        <div className="flex" >
			<FuseChipSelect
				onChange={(row) => {innerLanguageOnChange(row)}}
				className="w-1/2"
				value={selectedLanguage || null}
				placeholder={translate('Search a language')} 
				textFieldProps={{
					label          : 'Language',
					InputLabelProps: {
			    			shrink: true
					},
					variant        : 'outlined',
					
				}}
				options={allLanguages}
			/>
		</div> 		
		</div> 
	);	
};

export default withStyles(styles)(withTranslate(Panel));