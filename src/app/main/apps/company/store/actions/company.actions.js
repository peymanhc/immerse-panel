import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';

export const GET_COMPANY = '[COMPANY APP] GET COMPANY';
export const SAVE_COMPANY = '[COMPANY APP] SAVE COMPANY';
export const WAIT_COMPANY = '[COMPANY APP] WAIT COMPANY';
export const GET_CITIES = '[COMPANY APP] GET COMPANY CITIES';
export const GET_PROVINCES = '[COMPANY APP] GET COMPANY PROVINCES';

export const GET_ROLES = '[COMPANY APP] GET COMPANY ROLES';

export function getCompany(params)
{ 
    const request = axios.get('/api/company', {params});

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_COMPANY,
                payload: response.data
            })
        );
}

export function saveCompany(data)
{ 
    return async (dispatch) => {
		dispatch({type: WAIT_COMPANY, payload: true});
		const {companyImage , ownerCertificateImg, ownerNationalCardImg, ownerCommercialLicenseImg} = data; 
		if(typeof companyImage === "object"){
			try{
				const img = await uploadImage(companyImage.file, "companyImage", data.id === null ? "post" : "put");
				data["companyImage"] = img.url;				
			}
			catch(err){
				data["companyImage"] = "";
			}
		}
		if(typeof ownerCertificateImg === "object"){
			try{
				const img = await uploadImage(ownerCertificateImg.file, "ownerCertificateImg", data.id === null ? "post" : "put");
				data["ownerCertificateImg"] = img.url;				
			}
			catch(err){
				data["ownerCertificateImg"] = "";
			}
		}
		if(typeof ownerNationalCardImg === "object"){
			try{
				const img = await uploadImage(ownerNationalCardImg.file, "ownerNationalCardImg", data.id === null ? "post" : "put");
				data["ownerNationalCardImg"] = img.url;
			}
			catch(err){
				data["ownerNationalCardImg"] = "";
			}
		}
		if(typeof ownerCommercialLicenseImg === "object"){
			try{
				const img = await uploadImage(ownerCommercialLicenseImg.file, "ownerCommercialLicenseImg", data.id === null ? "post" : "put");
				data["ownerCommercialLicenseImg"] = img.url;
			}
			catch(err){
				data["ownerCommercialLicenseImg"] = "";
			}	
		}
		
		let request = axios.put('/api/company/save', data);
		if(data.id === null)
			request = axios.post('/api/company/create', data);	
        return request.then((response) => {
				dispatch({type: WAIT_COMPANY, payload: false});
				if(data.id === null){
					const error = response.data.error;
					if(error){
						if(error.email)
							return dispatch(showMessage({message: 'The email is already in use', variant:'error'}));  
						else if(error.mobile)
							return dispatch(showMessage({message: 'The mobile is already in use', variant:'error'}));  
						else
							return dispatch(showMessage({message: 'The data is Incorrect', variant:'error'}));
					}
				}
                dispatch(showMessage({message: 'Company Saved'}));       
                return dispatch({
                    type   : SAVE_COMPANY,
                    payload: response.data
                })
            }
        ).catch(err => {
			dispatch({type: WAIT_COMPANY, payload: false});	
			dispatch(showMessage({message: 'Access Denied'}))
		});
	}
}

const uploadImage = (file, id, type) => {	
	return new Promise((resolve, reject) => {
		var formData = new FormData();	
		var fileName = "c_" + FuseUtils.generateGUID() + "_" + id + "_"; 
		formData.append(fileName, file);
		if(type === "post")
			axios.post('/api/company/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));
		else
			axios.put('/api/company/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));	 			
	});
};

export function newCompany()
{
    const data = {
        id              			: null,
		companyName					: '',
		companyPassword				: '',
		companyRePassword			: '',
		companyAddress				: '',
		companyEmail				: '',
		companyMobile				: '',
		codeMelli				    : '',
		codePost				    : '',
		codeSh				        : '',
		fatherName				    : '',
		companyPhone				: '',
		companyCity					: '',
		companyProvince					: '',
		
		companyDescription			: '',
		ownerFirstName				: '',
		ownerLastName				: '',
		ownerMobile					: '',
		companyImage                  : '',
		ownerCertificateImg			: '',
		ownerNationalCardImg		: '',		
		ownerCommercialLicenseImg	: '',		
		ownerBankAcountInformation	: '',		
		ownerIsFreelancer			: false,
		ownerRole					: '',
		companyLocation				: [],
    };

    return {
        type   : GET_COMPANY,
        payload: data
    }
}


export function getCities()
{ 
    const request = axios.get('/api/company/cities');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_CITIES,
                payload: response.data
            })
        );
}
export function getProvinces()
{ 
    const request = axios.get('/api/company/provinces');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_PROVINCES,
                payload: response.data
            })
        );
}

export function getRoles()
{ 
    const request = axios.get('/api/company/roles');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_ROLES,
                payload: response.data
            })
        );
}