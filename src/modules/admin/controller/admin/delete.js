
import React from 'react';
import { Redirect } from 'react-router-dom';

import Controller from './../../../core/controller/controller';

class Delete extends Controller
{
    constructor(props)
    {
        super(props);
        
        this.state = {
            deleteRow : false
        };
	}

    componentDidMount()
    {
        this.deleteRow();
    }

	deleteRow()
    {
        let id = this.getRequest().getParam('id');
        
        this.getAjax()
        .setView(this)
        .setMode('url')
        .setUrl('http://localhost:3001/admin/admin/delete?id='+id)
        .setMethod('get')
        .load();

        this.setState({deleteRow : true});
    }

    render()
    {
        if(this.state.deleteRow)
        {
            return (
                <Redirect to='/admin/admin/list' />
            );    
        }
        return (
            <div>deleting</div>
        );
        
    }

}

export default Delete;