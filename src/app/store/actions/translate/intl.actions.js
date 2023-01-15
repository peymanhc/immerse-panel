
export const SET_LOCALE = '[PANEL] SET LOCALE';

export function setPanelLocale(locale)
{ 
	return {
            type   : SET_LOCALE,
            payload: locale
        }
}