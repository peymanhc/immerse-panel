import {green, purple, red, blue, yellow, grey} from '@material-ui/core/colors';

const styles = theme => ({
	root: {
		flexGrow: 1,
	},	
	greenRadio: {
		color: green[600],
		'&$checked': {
		color: green[500],
		}
	},
	primaryRadio: {
		color: blue[600],
		'&$checked': {
		color: blue[500],
		},
	},	
	accentRadio: {
		color: purple[600],
		'&$checked': {
		color: purple[500],
		},
	},	
	redRadio: {
		color: red[600],
		'&$checked': {
		color: red[500],
		},
	},
	yellowRadio: {
		color: yellow[600],
		'&$checked': {
		color: yellow[500],
		},
	},	
	greyRadio: {
		color: grey[600],
		'&$checked': {
		color: grey[500],
		},
	},	
	checked: {},	
});

export default styles;