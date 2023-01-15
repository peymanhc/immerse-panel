import axios from 'axios';
import {setselectedContactId} from './contacts.actions';
import {closeMobileChatsSidebar} from 'app/main/apps/chat/store/actions/sidebars.actions';
//import {getUserData} from './user.actions';

export const GET_CHAT = '[CHAT PANEL] GET CHAT';
export const REMOVE_CHAT = '[CHAT PANEL] REMOVE CHAT';
export const SEND_MESSAGE = '[CHAT PANEL] SEND MESSAGE';

export function getChat(contactId)
{
    return (dispatch, getState) => {
        const {id: userId} = getState().chatPanel.user;
        const request = axios.get('/immerse/chat/get-chat', {
			params : {
				contactId,
				userId				
			}
        });

        return request.then((response) => {

            dispatch(setselectedContactId(contactId));

            dispatch(closeMobileChatsSidebar());
            //dispatch(getUserData()).finally(() => {
			//	return dispatch({
			//		type        : GET_CHAT,
			//		chat        : response.data.chat,
			//		userChatData: response.data.userChatData
			//	});				
			//});
			
				return dispatch({
					type        : GET_CHAT,
					chat        : response.data.chat,
					userChatData: response.data.userChatData
				});		
			
        });
    }
}

export function removeChat()
{
    return {
        type: REMOVE_CHAT
    };
}

export function sendMessage(messageText, chatId, contactId)
{
    const message = {
        'who'    : null,
        'message': messageText,
        'time'   : new Date().toLocaleString('en-US', {  timeZone: 'Asia/Tehran'})
    };

    const request = axios.post('/immerse/chat/send-message', {
        chatId,
        message,
		contactId
    });

    return (dispatch) =>
        request.then((response) => {
                return dispatch({
                    type        : SEND_MESSAGE,
                    message     : response.data.message,
                    userChatData: response.data.userChatData
                })
            }
        );
}
