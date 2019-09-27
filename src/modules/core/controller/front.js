
import React from 'react';
import { Route } from 'react-router-dom';
import qs from 'querystring';

import Request from './../model/request';

class Front extends React.Component
{
    modules = {};
    controllers = {};
    layouts = {};

    request = null;

    constructor(props)
	{
		super(props);
        let autoload = props.bootstrap.getMvc().getAutoload();
        this.modules = autoload.getModules();
        this.controllers = autoload.getControllers();
        this.layouts = autoload.getLayouts();
	}

	setRequest()
	{
		this.request = new Request();
        
        let moduleName      = (typeof this.props.match.params.module === 'undefined') ? this.props.module : this.props.match.params.module;
        let controllerName  = (typeof this.props.match.params.controller === 'undefined') ? this.props.controller : this.props.match.params.controller;
        let actionName      = (typeof this.props.match.params.action === 'undefined') ? this.props.action : this.props.match.params.action;
        let routePath       = this.props.match.path;
        let url             = this.props.match.url;

        this.request.setModuleName(moduleName);
        this.request.setControllerName(controllerName);
        this.request.setActionName(actionName);
        this.request.setRoutePath(routePath);
        this.request.setUrl(url);
        this.request.setParams(this.props.match.params);

        return this;
	}

	getRequest()
	{
		return this.request;
	}

    getLayout(layoutName, moduleName)
    {
        if(typeof this.layouts[moduleName] === 'undefined')
        {
            throw (moduleName + " : module does not found.");
        }

        if(typeof this.layouts[moduleName][layoutName] === 'undefined')
        {
            throw (layoutName + " : layout does not found under " + moduleName + " module.");
        }

        return this.layouts[moduleName][layoutName];
    }

    getLayoutDefault()
    {
        return this.layouts.default;
    }

    getController()
    {
        let moduleName = this.getRequest().getModuleName();
        let controllerName = this.getRequest().getControllerName();
        let actionName = this.getRequest().getActionName();

        if(typeof this.controllers[moduleName] === 'undefined')
        {
            throw (moduleName + " : module does not found.");
        }

        if(typeof this.controllers[moduleName][controllerName] === 'undefined')
        {
            throw (controllerName + " : controller does not found under "+ moduleName +" module.");
        }

        if(typeof this.controllers[moduleName][controllerName][actionName] === 'undefined')
        {
            throw (actionName + " : action does not found.");
        }

        return this.controllers[moduleName][controllerName][actionName];
    }

	render()
    {
        this.setRequest();

        let Controller = this.getController();
        return (
            <Controller front={this} />
        );
    }

    
}

export default Front;