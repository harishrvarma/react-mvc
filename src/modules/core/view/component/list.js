
import React from 'react';
import Template from './../template';
import Heading from './list/heading';
import Grid from './list/grid';

class List extends Template
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
                <Grid layout={this.getLayout()} />
            </div>
        );
    }
}

export default List;