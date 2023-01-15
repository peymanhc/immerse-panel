import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';

export const GET_MASTER = '[MASTER APP] GET MASTER';
export const SAVE_MASTER = '[MASTER APP] SAVE MASTER';
export const WAIT_MASTER = '[MASTER APP] WAIT MASTER';
export const GET_CITIES = '[MASTER APP] GET MASTER CITIES';
export const GET_ROLES = '[MASTER APP] GET MASTER ROLES';
export const GET_COMPANIES = '[MASTER APP] GET COMPANIES';

export function getMaster(params)
{ 
    const request = axios.get('/api/master', {params});

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_MASTER,
                payload: response.data
            })
        );
}

export function saveMaster(data)
{ 
    return async (dispatch) => {
		dispatch({type: WAIT_MASTER, payload: true});
		const {masterImage , ownerCertificateImg, ownerNationalCardImg, ownerCommercialLicenseImg} = data; 
		if(typeof masterImage === "object"){
			try{
				const img = await uploadImage(masterImage.file, "masterImage", data.id === null ? "post" : "put");
				data["masterImage"] = img.url;				
			}
			catch(err){
				data["masterImage"] = "";
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
		
		let request = axios.put('/api/master/save', data);
		if(data.id === null)
			request = axios.post('/api/master/create', data);	
        return request.then((response) => {
				dispatch({type: WAIT_MASTER, payload: false});
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
                dispatch(showMessage({message: 'Master Saved'}));       
                return dispatch({
                    type   : SAVE_MASTER,
                    payload: response.data
                })
            }
        ).catch(err => {
			dispatch({type: WAIT_MASTER, payload: false});	
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
			axios.post('/api/master/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));
		else
			axios.put('/api/master/upload', formData).then(({data}) => resolve(data)).catch((e) => reject(e));	 			
	});
};

export function newMaster()
{
    const data = {
        id              			: null,
		masterCompanyId				: null,
		masterName					: '',
		masterCode					: '',
		masterPassword				: '',
		masterRePassword			: '',
		masterAddress				: '',
		masterEmail					: '',
		masterMobile				: '',
		masterCity					: '',
		masterDescription			: '',
		ownerFirstName				: '',
		ownerLastName				: '',
		ownerMobile					: '',
		masterImage :'',
		ownerCertificateImg			: '',
		ownerNationalCardImg		: '',		
		ownerCommercialLicenseImg	: '',		
		ownerBankAcountInformation	: '',		
		ownerIsFreelancer			: false,
		ownerRole					: '',
		vehicle_brand : '',         vehicle_model : '',
		vehicle_bime : '',          vehicle_pelak : '', 
		masterRate: '0',            masterCnt :'0',
		status : '',
		masterLocation				: [],
    };

    return {
        type   : GET_MASTER,
        payload: data
    }
}


export function getCities()
{ 
    const request = axios.get('/api/master/cities');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_CITIES,
                payload: response.data
            })
        );
}

export function getRoles() { 
    const request = axios.get('/api/master/roles');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_ROLES,
                payload: response.data
            })
        );
}

export function getCompanies()
{
    const request = axios.get('/api/master/companies');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_COMPANIES,
                payload: response.data
            })
        );
}