import React from 'react';
import { Link } from 'react-router-dom';
import CoreGrid from './../../../../core/view/component/list/grid';

class Grid extends CoreGrid
{
    constructor(props)
    {
        super(props);
    }

    prepareColumns()
    {
        this.addColumn({name:'adminId', label:'Admin Id'});
        this.addColumn({name:'username', label:'Username'});
        this.addColumn({name:'password', label:'Password'});
        this.addColumn({name:'name', label:'Name'});
        this.addColumn({name:'email', label:'Email'});
        return this;
    }

    prepareActions()
    {
        this.addAction({label:'EDIT', method:'getEditUrl'});
        this.addAction({label:'DELETE', method:'getDeleteUrl'});
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
        return this;
    }
}

export default Grid;