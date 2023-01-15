import React from 'react';
import {withStyles, Checkbox, FormControlLabel, TextField} from '@material-ui/core';
import {FuseChipSelect} from '@fuse';

const styles = theme => ({
	select:{
		verticalAlign:'middle', 
		fontSize:15,
	},
	label:{
		marginRight:10,
	},
	fuseChipSelectLabel:{
		marginTop:'20px',
		paddingLeft:10,
	},
});

const Application = ({classes, form, languages, languageOnChange, handleChange}) => {
	const allLanguages = languages.map(({lan_id:value, lan_title:label}) => ({value, label}));
	const innerLanguageOnChange = (row) => {
		languageOnChange('applicationLanguageId', row.value);
	};
	const selectedLanguage = allLanguages.find(({value:id}) => id === form.applicationLanguageId);
	return (
		<div>
          <div className="flex" >
            <TextField
                className="mt-8 mb-16"
                label="Service Number"
                id="serviceTel"
                name="serviceTel"
                value={form.serviceTel}
                onChange={handleChange}
                variant="outlined"
                fullWidth
            />		
            <TextField
                className="mt-8 mb-16"
                label="Contact description"
                id="contactDescription"
                name="contactDescription"
                value={form.contactDescription}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                multiline
                rows={3}				
            />	
           </div>  
            <TextField
                className="mt-8 mb-16"
                label="Contact address"
                id="contactAddress"
                name="contactAddress"
                value={form.contactAddress}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                multiline
                rows={3}				
            />	
           <div className="flex" >
            <TextField
                className="mt-8 mb-16"
                label="Contact email"
                id="contactEmail"
                name="contactEmail"
                value={form.contactEmail}
                onChange={handleChange}
                variant="outlined"
                fullWidth
            />
            <TextField
                className="mt-8 mb-16"
                label="Contact phone"
                id="contactPhone"
                name="contactPhone"
                value={form.contactPhone}
                onChange={handleChange}
                variant="outlined"
                fullWidth
            />	
        </div>  <div className="flex" >
            <TextField
                className="mt-8 mb-16"
                label="Contact hourse"
                id="contactHourse"
                name="contactHourse"
                value={form.contactHourse}
                onChange={handleChange}
                variant="outlined"
                fullWidth
            />
            <TextField
                className="mt-8 mb-16"
                label="About content1"
                id="aboutContent1"
                name="aboutContent1"
                value={form.aboutContent1}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                multiline
                rows={3}				
            />
        </div>  
            <TextField
                className="mt-8 mb-16"
                label="About content2"
                id="aboutContent2"
                name="aboutContent2"
                value={form.aboutContent2}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                multiline
                rows={3}				
            />			
			<FuseChipSelect
				onChange={(row) => {innerLanguageOnChange(row)}}
				className="w-full"
				value={selectedLanguage || null}
				placeholder="Search a language"
				textFieldProps={{
					label          : "Default Application Language",
					InputLabelProps: {
						shrink: true
					},
					variant        : 'outlined',
					className:classes.fuseChipSelectLabel,
				}}
				options={allLanguages}
			/>
			<FormControlLabel
				id="applicationLanguageRtl"
                label="Right To Left"										
				control={<Checkbox color="primary" name="applicationLanguageRtl" onChange={handleChange} checked={form.applicationLanguageRtl}/>}
				labelPlacement="start"
			/>	

         <div className="flex" >
            <TextField
                className="mt-8 mb-16 mr-8"
                label="Gateway Callback"
                id="gatewayCallback"
                name="gatewayCallback"
                value={form.gatewayCallback}
                onChange={handleChange}
                variant="outlined"
                fullWidth
            />          
            <TextField
                className="mt-8 mb-16 mr-8"
                label="Gateway Description"
                id="gatewayDescription"
                name="gatewayDescription"
                value={form.gatewayDescription}
                onChange={handleChange}
                variant="outlined"
                fullWidth
            />  
         </div> 



		</div> 
	);	
};

export default withStyles(styles)(Application);
