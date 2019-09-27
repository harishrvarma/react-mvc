import React from 'react';
import {Redirect} from 'react-router-dom';


import Request from './../model/request';
import Ajax from './../model/process';

class Controller extends React.Component
{
	front = null;
	layout = null;
    ajax = null;

    views = {
        header : {},
        footer : {},
        content : {},
        left : {},
        right : {},
        message : {},
        menu : {},
    };

    request = null;

    constructor(props)
    {
    	super();
        this.front = props.front;
        this.request = props.front.getRequest();
    }

    getAjax()
    {
        return new Ajax();
    }

    getRequest()
    {
    	return this.request;
    }

    getFront()
    {
    	return this.front;
    }    


    addView(component, area = 'content')
    {
        if(typeof component === 'undefined')
        {
            return this;
        }

        let key = component.constructor.name;

        this.views[area][key] = component;
        return this;
    }

    setViews(components, area = 'content')
    {
        this.views[area] = Object.assign(this.views[area], components);
        return this;
    }

    getViews()
    {
        return this.views
    }

    loadLayout(layoutName = null, moduleName = null)
    {
        if(layoutName !== null && moduleName !== null)
        {
            this.layout = this.getFront().getLayout(layoutName, moduleName)    
        }
        return this;
    }

    getLayout()
    {
        if(this.layout === null)
        {
            this.loadLayoutDefault();
        }
        return this.layout;
    }


    loadLayoutDefault()
    {
        this.layout = this.getFront().getLayoutDefault();
        return this;
    }

    render()
    {
        let Layout = this.getLayout();
        return (
            <Layout views={this.getViews()} request={this.getRequest()} />
        );
    }

    redirect(path)
    {
        return (
            <Redirect path={path} />
        );
    }

    url()
    {
        return 1111 ;
    }

    getUrl()
	{
		return this.getFront().props.match.url;

	}

	getPath(className = null)
	{
		return this.getFront().props.match.path;
	}
}

export default Controller;