
import React from 'react';

import Ajax from './../model/process';

class Template extends React.Component
{
    layout = null;
    controller = null;
    request = null;
    
    ajax = null;
    ajaxes = [];

    constructor(props)
    {
        super();

        if(typeof props.layout !== 'undefined')
        {
            this.setLayout(props.layout);
        }
        else
        {
            this.setLayout(this);
        }

        if(typeof props.request !== 'undefined')
        {
            this.setRequest(props.request);
        }
        else
        {
            this.setRequest(this.getLayout().getRequest());
        }

        //console.log(props.request);

        if(typeof props.views !== 'undefined')     
        {
            this.setViews(props.views);    
        }

        this.setAjax();
    }

    setAjax(ajax = null)
    {
        if(ajax === null)
        {
            ajax = new Ajax();
        }

        this.ajax = ajax;
        this.ajaxes.push(ajax);
        return this;
    }

    getAjax()
    {
        if(this.ajax === null)
        {
            this.setAjax();
        }

        return this.ajax;
    }

    setRequest(request)
    {
        this.request = request;
        return this;
    }

    getRequest()
    {
        return this.request;
    }

    setLayout(layout)
    {
        this.layout = layout;
        return this;
    }

    getLayout()
    {
        return this.layout;
    }

    setViews(views)
    {
        this.views = views;
        return this;
    }

    getViews()
    {
        return this.views;
    }

    setView(key, view)
    {
        this.views[key] = view;
        return this;
    }

    getView(key)
    {
        if(typeof this.views[key] === null)
        {
            return {};
        }
        return this.views[key];
    }

    getUrl(params)
    {
        return this.getLayout().getRequest().getUrl(params);
    }

    render()
    {
        return (
            <div>In Master Layout </div>
        );
    }
}

export default Template;