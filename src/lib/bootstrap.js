
import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Front from './../modules/core/controller/front';

class Bootstrap extends React.Component
{
    mvc = null;

    constructor(props)
	{
		super();
        this.mvc = props.mvc;
	}

    getMvc()
    {
        return this.mvc;
    }

	render()
    {
        let routes = this.getMvc().getAutoload().getRoutes();

        return (
        	<Router>
                <Switch>
                    {routes.map((route, index) => {

                        if(typeof route.module === 'undefined')
                        {
                            return (
                                <Route key={index} path={route.route} render={(props) => 
                                {
                                    return (<Front bootstrap={this}  {...props} />);
                                }} />
                            );
                        }
                        else
                        {
                            return (
                                <Route key={index} path={route.route} render={(props) => 
                                {
                                    return (<Front bootstrap={this} module={route.module} controller={route.controller} action={route.action}   {...props} />);
                                }} />
                            );
                        }
                    })}

                    <Redirect to='/admin/dashboard' />
                </Switch>
        	</Router>
        );
    }
}

export default Bootstrap;