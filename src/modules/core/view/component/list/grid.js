import React from 'react';
import { Link } from 'react-router-dom';
import Template from './../../template';

class Grid extends Template
{
    constructor(props)
    {
        super(props);
        
        
        this.initState().prepareColumns().prepareActions();
    }

    initState()
    {
       this.state = {
            columns : [],
            collection : [],
            actions : []
        };  

        return this;
    }

    componentDidMount()
    {
        this.prepareCollection();
    }

    setCollection(collection)
    {
        this.setState({collection : collection});
        return this;
    }

    prepareCollection()
    {
        this.getAjax()
        .setView(this)
        .setMode('url')
        .setMethod('get')
        .setUrl('http://localhost:3001/admin/admin/list')
        .load();

        /*

        let ajax = this.getAjax()
        //.setView(this)
        .setMode('url')
        .setMethod('get')
        .setUrl('http://localhost:3001/admin/admin/list')
        .load();
        
        let collection = ajax.getState('collection');
        console.log(collection);
        this.setCollection(collection);
        */
        
        return this;
    }

    getCollection()
    {
        return this.state.collection;
    }

    getColumns()
    {
        return this.state.columns;
    }

    setColumns(columns)
    {
        this.setState({columns : columns});
        return this;
    }

    addColumn(column)
    {
        if(typeof column.name !== 'string'
            || typeof column.label !== 'string')
        {
            return false;
        }

        this.state.columns.push(column);
        return this;
    }

    prepareColumns()
    {
        /*this.addColumn({name:'adminId', label:'Admin Id'});
        this.addColumn({name:'password', label:'Password'});
        this.addColumn({name:'name', label:'Name'});
        this.addColumn({name:'email', label:'Email'});
        */
        return this;
    }

    setActions(actions)
    {
        this.setState({actions : actions});
        return this;
    }

    addAction(action)
    {
        if(typeof action.label !== 'string'
            || typeof action.method !== 'string')
        {
            return false;
        }

        this.state.actions.push(action);
        return this;
    }

    prepareActions()
    {
        /*this.addAction({label:'EDIT', method:'getEditUrl'});
        this.addAction({label:'DELETE', method:'getDeleteUrl'});*/

        return this;
    }

    getActions()
    {
        return this.state.actions;
    }

    getDeleteUrl(row)
    {
        return this.getUrl({
            action:'delete',
            id:row['adminId'],
            tab:null
        });
    }

    getEditUrl(row)
    {
        return this.getUrl({
            action:'edit',
            id:row['adminId'],
            tab:'default'
        });
    }    

    render()
    {
        let self = this;
    	return (
    		<div className='module-grid'>
    			<table width="100%" border="1">
                    <tbody>
                        <tr>
                        {this.getColumns().map((column, index) => {
                            return (
                                <th key={index}>{column.label}</th>
                            );
                        })}

                        {this.getActions().map((column, index) => {
                            return (
                                <th key={index}>{column.label}</th>
                            );
                        })}


                        </tr>
                        {this.getCollection().map((row, RowIndex) => {
                            return (
                                <tr key={RowIndex}>
                                {this.getColumns().map((column, index) => {
                                    if(typeof row[column.name] === 'undefined')
                                    {
                                        return (
                                            <td key={index}>missing {column.name}</td>
                                        );    
                                    }
                                    else
                                    {
                                        return (
                                            <td key={index}>{row[column.name]}</td>
                                        );    
                                    }
                                })}

                                {this.getActions().map((column, index) => {

                                    if(typeof self[column.method] === 'undefined')
                                    {
                                        return (
                                            <td key={index}>
                                                missing {column.method}
                                            </td>    
                                        );
                                    }
                                    else
                                    {
                                        let url = self[column.method](row);
                                        return (
                                            <td key={index}>
                                                <Link to={url}>{column.label}</Link>
                                            </td>    
                                        );
                                    }
                                })}
                                </tr>
                            );
                        })}   
                    </tbody>
                </table>    
    		</div>
    	);
    }
}

export default Grid;