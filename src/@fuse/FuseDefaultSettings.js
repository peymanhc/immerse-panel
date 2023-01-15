import {createMuiTheme} from '@material-ui/core';
import {fuseDark} from '@fuse/fuse-colors';
import lightBlue from '@material-ui/core/colors/lightBlue';
import red from '@material-ui/core/colors/red';
import qs from 'qs';
import _ from '@lodash';

/**
 * SETTINGS DEFAULTS
 */
export const defaultSettings = {
    customScrollbars: true,
    theme           : {
        main   : 'default',
        navbar : 'mainThemeDark',
        toolbar: 'mainThemeLight',
        footer : 'mainThemeDark'
    }
};

export function getParsedQuerySettings()
{
    const parsedQueryString = qs.parse(window.location.search, {ignoreQueryPrefix: true});

    if ( parsedQueryString && parsedQueryString.defaultSettings )
    {
        return JSON.parse(parsedQueryString.defaultSettings);
    }
    return {}

    // Generating route params from settings
    /*const settings = qs.stringify({
        defaultSettings: JSON.stringify(defaultSettings, {strictNullHandling: true})
    });
    console.info(settings);*/
}

/**
 * THEME DEFAULTS
 */
export const defaultThemeOptions = {
    typography: {
        fontFamily                 : [
            'IRANSans','IRANYekan',
            'Roboto',
            '"Helvetica"',
            'Arial',
            'sans-serif'
        ].join(','),
        fontWeightLight            : 300,
        fontWeightRegular          : 400,
        fontWeightMedium           : 600,
        useNextVariants            : true,
        suppressDeprecationWarnings: true
    }
};

export const mustHaveThemeOptions = {
    typography: {
        htmlFontSize: 10
    }
};

export const defaultThemes = {
    default    : {
        palette: {
            type     : 'light',
            primary  : fuseDark,
            secondary: {
                light: lightBlue[400],
                main : lightBlue[600],
                dark : lightBlue[700]
            },
            error    : red
        },
        status : {
            danger: 'orange'
        }
    },
    defaultDark: {
        palette: {
            type     : 'dark',
            primary  : fuseDark,
            secondary: {
                light: lightBlue[400],
                main : lightBlue[600],
                dark : lightBlue[700]
            },
            error    : red
        },
        status : {
            danger: 'orange'
        }
    }
};

export function extendThemeWithMixins(obj)
{
    const theme = createMuiTheme(obj);
    return {
        border      : (width = 1) => ({
            borderWidth: width,
            borderStyle: 'solid',
            borderColor: theme.palette.divider
        }),
        borderLeft  : (width = 1) => ({
            borderLeftWidth: width,
            borderStyle    : 'solid',
            borderColor    : theme.palette.divider
        }),
        borderRight : (width = 1) => ({
            borderRightWidth: width,
            borderStyle     : 'solid',
            borderColor     : theme.palette.divider
        }),
        borderTop   : (width = 1) => ({
            borderTopWidth: width,
            borderStyle   : 'solid',
            borderColor   : theme.palette.divider
        }),
        borderBottom: (width = 1) => ({
            borderBottomWidth: width,
            borderStyle      : 'solid',
            borderColor      : theme.palette.divider
        })
    }
}

export function mainThemeVariations(theme)
{
    return {
        mainThemeDark : createMuiTheme(_.merge({}, defaultThemeOptions, theme, {palette: {type: 'dark'}, ...mustHaveThemeOptions})),
        mainThemeLight: createMuiTheme(_.merge({}, defaultThemeOptions, theme, {palette: {type: 'light'}, ...mustHaveThemeOptions}))
    }
}
