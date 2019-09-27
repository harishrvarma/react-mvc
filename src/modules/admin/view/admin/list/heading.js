
import React from 'react';
import { Link } from 'react-router-dom';
import CoreHeading from './../../../../core/view/component/list/heading';


class Heading extends CoreHeading
{
    constructor(props)
    {
        super(props);
    }

    setTitle()
    {
        return super.setTitle('Manage Admins');
    }
    
    prepareButtons()
    {
         this.addButton({label : 'Add Admin', url : '/admin/admin/add'});
         this.addButton({label : 'Manage Admins', url : '/admin/admin/list'});
         return this;
    }
}

export default Heading;