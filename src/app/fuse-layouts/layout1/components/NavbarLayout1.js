import React from 'react';
import {AppBar, Hidden, Icon, withStyles} from '@material-ui/core';
import {FuseScrollbars} from '@fuse';
import classNames from 'classnames';
import UserNavbarHeader from 'app/fuse-layouts/shared-components/UserNavbarHeader';
import Logo from 'app/fuse-layouts/shared-components/Logo';
import NavbarFoldedToggleButton from 'app/fuse-layouts/shared-components/NavbarFoldedToggleButton';
import NavbarMobileToggleButton from 'app/fuse-layouts/shared-components/NavbarMobileToggleButton';
import Navigation from 'app/fuse-layouts/shared-components/Navigation';

const styles = theme => ({
    content: {
        overflowX                   : 'hidden',
        overflowY                   : 'auto',
 
        '-webkit-overflow-scrolling': 'touch',
        background                  : 'linear-gradient(rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0) 30%), linear-gradient(rgba(0, 0, 0, 0.25) 0, rgba(0, 0, 0, 0) 40%)',
        backgroundRepeat            : 'no-repeat',
        backgroundSize              : '100% 40px, 100% 10px',
        backgroundAttachment        : 'local, scroll'
       },
    rtlDir:{
        direction:'rtl',
        '& a .material-icons':{
            color: theme.palette.secondary.main,   paddingRight: 10
        },
        '& a div span':{
            textAlign   : 'right',
        },
        '& > a  > div  > span':{
            fontWeight  : 500,
        },
        '& a':{
            borderRadius:'20px 0 0px 20px',
        },
        '& > ul > div':{
            borderRadius:'20px 0 0px 20px',
            textAlign   : 'right',
        },  
        '& > ul > div > div > span':{
            fontWeight  : 500,
        },          
        '& > ul > div > .material-icons':{
            color: theme.palette.secondary.main,  paddingRight: 10
        },      
        '& > ul > div:nth-child(2) > div > div > a':{
            paddingRight:24,
        },      
    },
});

const NavbarLayout1 = ({classes, navigation, className}) => {
    return (
        <div className={classNames("flex  flex-reverse flex-col overflow-hidden h-full", className)}>
            <AppBar
                color="primary"
                position="static"
                elevation={0}
                className="flex flex-row items-center flex-shrink h-64 min-h-64 pl-20 pr-12"
            >
                <div className="flex flex-1 pr-8">
                    <Logo/>
                </div>

                <Hidden mdDown>
                    <NavbarFoldedToggleButton className="w-40 h-40 p-0"/>
                </Hidden>

                <Hidden lgUp>
                    <NavbarMobileToggleButton className="w-40 h-40 p-0">
                       <Icon className={classes.arrow}>arrow_back</Icon>
                    </NavbarMobileToggleButton>
                </Hidden>
            </AppBar>

            <FuseScrollbars className={classNames(classes.content)}>

                <UserNavbarHeader/>

                <Navigation layout="vertical" className={classes.rtlDir}/>

            </FuseScrollbars>
        </div>
    );
};

export default withStyles(styles, {withTheme: true})(NavbarLayout1);


