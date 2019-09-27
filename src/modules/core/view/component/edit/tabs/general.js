
import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import Template from './../../../template';

class General extends Template
{
    constructor(props)
    {
        super(props);

        this.initState();

        this.saveRow = this.saveRow.bind(this);
    }

    initState()
    {
        this.state = {
            row : {},
            isRowSaved : false
        };
    }

    getRow(key = null)
    {
        if(key === null)
        {
            return this.state.row;    
        }

        if(typeof this.state.row[key] === 'undefined')
        {
            return null;
        }
        return this.state.row[key];
    }

    componentDidMount() 
    {
        let id =this.getRequest().getParam('id');
        if(id)
        {
            this.fetchRow();
        }
    }

    fetchRow()
    {
        this.getAjax()
        .setView(this)
        .setMode('url')
        .setUrl(this.loadRowUrl())
        .setMethod('get')
        .load();
    }

    loadRowUrl()
    {
        let id = this.getLayout().getRequest().getParam('id');
        return  'http://localhost:3001/admin/admin/edit?id=' + id ; 
    }    

    saveRowUrl()
    {
        return 'http://localhost:3001/admin/admin/save?id=' + this.getRow().adminId;
    }

    saveRow()
    {
        this.setState({isRowSaved:false});

        this.getAjax()
        .setMode('form')
        .setForm('#admin-form')
        .load();

        this.setState({isRowSaved:true});
    }

    render()
    {
        if (this.state.isRowSaved === true)
        {
            return <Redirect to="/admin/admin/list" />
        }

        return (
            <div className='module-edit'>
                <form id='admin-form' method='post' action={this.saveRowUrl()}>
                    <table width="50%" border="1">
                        <tbody>
                            <tr>
                                <td>Admin Id</td>
                                <td>{this.getRow('adminId')}</td>
                            </tr>
                            <tr>
                                <td>Username</td>
                                <td><input name='row[username]' id='username' type='text' defaultValue={this.getRow('username')} /></td>
                            </tr>
                            <tr>
                                <td>Password</td>
                                <td><input name='row[password]'  type='text' defaultValue={this.getRow('password')} /></td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td><input name='row[name]'  type='text' defaultValue={this.getRow('name')} /></td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td><input name='row[email]'  type='text' defaultValue={this.getRow('email')} /></td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td><input type='button' value='Save' onClick={this.saveRow} /></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}

export default General;