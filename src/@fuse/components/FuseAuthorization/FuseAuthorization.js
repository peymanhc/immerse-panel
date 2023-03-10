import React, {Component} from 'react';
import {matchRoutes} from 'react-router-config';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import AppContext from 'app/AppContext';

class FuseAuthorization extends Component {

    constructor(props, context)
    {
        super(props);
        const {routes} = context;
        this.state = {
            accessGranted: true,
            routes
        };
    }

    componentDidMount()
    {
        if ( !this.state.accessGranted )
        {
            this.redirectRoute(this.props);
        }
		
    }

    componentDidUpdate()
    {
        if ( !this.state.accessGranted )
        {
            this.redirectRoute(this.props);
        }
		
    }

    static getDerivedStateFromProps(props, state)
    {
        const {location, user} = props;
        const {pathname} = location;

        const matched = matchRoutes(state.routes, pathname)[0];

        const accessGranted = (matched && matched.route.auth && matched.route.auth.length > 0) ? matched.route.auth.includes(user.role) : true;
		
		const {rolePath} = user;
		if(rolePath && accessGranted){
			const matchPath = rolePath.find(item => pathname.startsWith(item));
			 
			
			if(!matchPath && pathname !== '/' &&  pathname.indexOf('/login') === -1 && pathname.indexOf('access-denied') === -1)
				return {
					accessGranted : false,
				};
		}	
		
        return {
            accessGranted
        };
    }

    shouldComponentUpdate(nextProps, nextState)
    {
        return nextState.accessGranted !== this.state.accessGranted;
    }

    redirectRoute(props)
    {
        const {location, user, history} = props;
        const {pathname, state, search} = location;
        /*
        User is guest
        Redirect to Login Page
        */
        if ( user.role === 'guest' )
        {
            history.push({
                pathname: '/login',
                state   : {redirectUrl: pathname + (search || '')}
            });
        }
        /*
        User is member
        User must be on unAuthorized page or just logged in
        Redirect to dashboard or redirectUrl
        */
        else
        {
			let redirectUrl = state && state.redirectUrl ? state.redirectUrl : '/';
			
			const {rolePath} = user; 
			if(rolePath){
				const matchPath = rolePath.find(item => redirectUrl.startsWith(item));
				if(!matchPath && redirectUrl !== '/' &&  redirectUrl.indexOf('/login') === -1 && pathname.indexOf('access-denied') === -1)
					redirectUrl = '/pages/access-denied';
				const matchPath2 = rolePath.find(item => pathname.startsWith(item));
				if(!matchPath2 && pathname !== '/' &&  pathname.indexOf('/login') === -1 && pathname.indexOf('access-denied') === -1)
					redirectUrl = '/pages/access-denied';
			}			
			
            history.push({
                pathname: redirectUrl
            });
        }
    }

    render()
    {
        const {children} = this.props;
        const {accessGranted} = this.state;
        // console.info('Fuse Authorization rendered', accessGranted);
        return accessGranted ? <React.Fragment>{children}</React.Fragment> : null;
    }
}

function mapStateToProps({fuse, auth})
{ 
    return {
        user: auth.user,
    }
}

FuseAuthorization.contextType = AppContext;

export default withRouter(connect(mapStateToProps)(FuseAuthorization));
