
import React from 'react';
import Template from './../template';
import Heading from './list/heading';
import Tabs from './edit/tabs';
//import Form from './edit/form';

class Edit extends Template
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <div className='module-container'>
                <Heading layout={this.getLayout()} />
                <Tabs layout={this.getLayout()} />
            </div>
        );
    }
}

export default Edit;