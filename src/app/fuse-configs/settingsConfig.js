const settingsConfig = {
    layout          : {
        style : 'layout1', // layout-1 layout-2 layout-3
        config: {
			navbar: { display: true, folded: false, position: 'right' },
		} // checkout layout configs at app/fuse-configs/layout-1/Layout1Config.js
    },
    customScrollbars: true,
    theme           : {
        main   : 'default',
        navbar : 'mainThemeDark',
        toolbar: 'mainThemeLight',
        footer : 'mainThemeDark'
    }
};

export default settingsConfig;
