import React from 'react';
import {withStyles, Checkbox, FormControlLabel, TextField, Button} from '@material-ui/core';
import {FuseChipSelect} from '@fuse';
import classNames from 'classnames';

const styles = theme => ({
	label:{
		marginRight:10,
	},
	hidden: {
		display: 'none',
	},
    productImageItem        : {
        transitionProperty      : 'box-shadow',
        transitionDuration      : theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover'               : {
            boxShadow                    : theme.shadows[5],
        },
        '&.featured'            : {
            pointerEvents                      : 'none',
            boxShadow                          : theme.shadows[3],
        }
    },	
	uploadBtn:{
		fontSize:12,
	},
	controlLabel:{
		marginLeft:0,
	},
});

const General = ({classes, form, languages, languageOnChange, handleChange, handleChipChange, addFiles}) => {
	const allLanguages = languages.map(({lan_id:value, lan_title:label}) => ({value, label}));
	const innerLanguageOnChange = (row) => {
		languageOnChange('languageId', row.value);
	};
	const selectedLanguage = allLanguages.find(({value:id}) => id === form.languageId);
	

	
	return (
		<div>

		
		  <div className="flex">		
		     <div className=" w-1/2">			
				<FormControlLabel
				id="siteStatus"
                label="Site Status"										
				control={<Checkbox color="primary" onChange={handleChange} checked={form.siteStatus} name="siteStatus" />}
				labelPlacement="start"
				className={classes.controlLabel}
			/>	
				<FormControlLabel
				id="languageRtl"
                label="Right To Left"										
				control={<Checkbox color="primary" name="languageRtl" onChange={handleChange} checked={form.languageRtl}/>}
				labelPlacement="start"
				className={classes.controlLabel}
			/>
		 </div>
		 	<FuseChipSelect
				onChange={(row) => {innerLanguageOnChange(row)}}
				className="  w-1/2"
				value={selectedLanguage || null}
				placeholder="Search a language"
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
         
			
            <TextField
                className="mt-8 mb-16 mr-8"
                label="Site Title"
                id="siteTitle"
                name="siteTitle"
                value={form.siteTitle}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                helperText="Max length is 80"
				inputProps={{ maxLength: 80 }}	
            />				
            <TextField
                className="mt-8 mb-16 mr-8"
                id="siteDescription"
                name="siteDescription"
                onChange={handleChange}
                label="Site Description"
                type="text"
                value={form.siteDescription}
                multiline
                rows={3}
                variant="outlined"
                fullWidth
				helperText="Max length is 190"
				inputProps={{ maxLength: 190 }}
            />
            

            <FuseChipSelect
                className="mt-8 mb-16"
                value={
                    form.siteTags && form.siteTags.map(item => ({
                        value: item,
                        label: item
                    }))
                }
                onChange={(value) => handleChipChange(value, 'siteTags')}
                placeholder="Select multiple tags"
                textFieldProps={{
                    label          : 'Site Tags',
                    InputLabelProps: {
                        shrink: true
                    },
                    variant        : 'outlined'
                }}
                isMulti
            />
			<div className="flex">	
				<div className="mt-8 mb-16 w-1/3">					
					<input accept="image/*" className={classes.hidden} name="siteLogo"  
						id="siteLogo" type="file" onChange={addFiles}
						helperText="ابعاد اتاندارد :   W:215  H:105"
					/>
					<label htmlFor="siteLogo">
						<Button variant="outlined" component="span" className={classes.uploadBtn}>
							Choose Logo
						</Button>
					</label>									
				</div>
				<div className="mt-8 mb-16 w-1/3">					
					<input accept="image/*" className={classes.hidden} name="siteBackground"  
						id="siteBackground" type="file" onChange={addFiles}
					/>
					<label htmlFor="siteBackground">
						<Button variant="outlined" component="span" className={classes.uploadBtn}>
							Choose Background
						</Button>
					</label>									
				</div>				
				<div className="mt-8 mb-16 w-1/3">					
					<input accept="image/*" className={classes.hidden} name="siteFavIco"  
						id="siteFavIco" type="file" onChange={addFiles}
					/>
					<label htmlFor="siteFavIco">
						<Button variant="outlined" component="span" className={classes.uploadBtn}>
							Choose Fav
						</Button>
					</label>									
				</div>					
			</div>
			<div className="flex">	
				<div className="mt-8 mb-16 w-1/3">
				{
					(form.siteLogo && 
						<div
							className={
								classNames(
									classes.productImageItem,
									"flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer")
							}
						>									
							<img className="max-w-none w-auto h-full" 
								src={typeof form.siteLogo === "object" ? form.siteLogo.url : form.siteLogo} 
								alt="Site Logo" 
							/>
						</div>
					)										
				}
				</div>
	
				<div className="mt-8 mb-16 w-1/3">
				{
					(form.siteBackground && 
						<div
							className={
								classNames(
									classes.productImageItem,
									"flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer")
							}
						>									
							<img className="max-w-none w-auto h-full" 
								src={typeof form.siteBackground === "object" ? form.siteBackground.url : form.siteBackground} 
								alt="Site Background" 
							/>
						</div>
					)										
				}
				</div>	
	
				<div className="mt-8 mb-16 w-1/3">
				{
					(form.siteFavIco && 
						<div
							className={
								classNames(
									classes.productImageItem,
									"flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer")
							}
						>									
							<img className="max-w-none w-auto h-full" 
								src={typeof form.siteFavIco === "object" ? form.siteFavIco.url : form.siteFavIco} 
								alt="Site Fav Icon" 
							/>
						</div>
					)										
				}
				</div>			
			</div>
			<div className="flex">
				<div className="mt-8 mb-16 w-1/4">
					<input accept="image/*" className={classes.hidden} name="siteBaner1"  
						id="siteBaner1" type="file" onChange={addFiles}
					/>
					<label htmlFor="siteBaner1">
						<Button variant="outlined" component="span" className={classes.uploadBtn}>
							Choose Banner 1
						</Button>
					</label>									
				</div>	
				<div className="mt-8 mb-16 w-1/4">
					<input accept="image/*" className={classes.hidden} name="siteBaner2"  
						id="siteBaner2" type="file" onChange={addFiles}
					/>
					<label htmlFor="siteBaner2">
						<Button variant="outlined" component="span" className={classes.uploadBtn}>
							Choose Banner 2
						</Button>
					</label>									
				</div>
				<div className="mt-8 mb-16 w-1/4">
					<input accept="image/*" className={classes.hidden} name="siteBaner3"  
						id="siteBaner3" type="file" onChange={addFiles}
					/>
					<label htmlFor="siteBaner3">
						<Button variant="outlined" component="span" className={classes.uploadBtn}>
							Choose Banner 3
						</Button>
					</label>									
				</div>
				<div className="mt-8 mb-16 w-1/4">
					<input accept="image/*" className={classes.hidden} name="siteBaner4"  
						id="siteBaner4" type="file" onChange={addFiles}
					/>
					<label htmlFor="siteBaner4">
						<Button variant="outlined" component="span" className={classes.uploadBtn}>
							Choose Banner 4
						</Button>
					</label>									
				</div>					
			</div>
			<div className="flex">
				<div className="mt-8 mb-16 w-1/4">
				{
					(form.siteBaner1 && 
						<div
							className={
								classNames(
									classes.productImageItem,
									"flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer")
							}
						>									
							<img className="max-w-none w-auto h-full" 
								src={typeof form.siteBaner1 === "object" ? form.siteBaner1.url : form.siteBaner1} 
								alt="Site Banner 1" 
							/>
						</div>
					)										
				}
				</div>	
		
				<div className="mt-8 mb-16 w-1/4">
				{
					(form.siteBaner2 && 
						<div
							className={
								classNames(
									classes.productImageItem,
									"flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer")
							}
						>									
							<img className="max-w-none w-auto h-full" 
								src={typeof form.siteBaner2 === "object" ? form.siteBaner2.url : form.siteBaner2} 
								alt="Site Banner 2" 
							/>
						</div>
					)										
				}
				</div>	
		
				<div className="mt-8 mb-16 w-1/4">
				{
					(form.siteBaner3 && 
						<div
							className={
								classNames(
									classes.productImageItem,
									"flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer")
							}
						>									
							<img className="max-w-none w-auto h-full" 
								src={typeof form.siteBaner3 === "object" ? form.siteBaner3.url : form.siteBaner3} 
								alt="Site Banner 3" 
							/>
						</div>
					)										
				}
				</div>	
	
				<div className="mt-8 mb-16 w-1/4">
				{
					(form.siteBaner4 && 
						<div
							className={
								classNames(
									classes.productImageItem,
									"flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer")
							}
						>									
							<img className="max-w-none w-auto h-full" 
								src={typeof form.siteBaner4 === "object" ? form.siteBaner4.url : form.siteBaner4} 
								alt="Site Banner 4" 
							/>
						</div>
					)										
				}
				</div>				
			</div>			
		
		</div> 
	);	
};

export default withStyles(styles)(General);
//export default language;