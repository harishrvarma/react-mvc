
import React from 'react';
import CoreList from './../../../core/view/component/list';

import Heading from './list/heading';
import Grid from './list/grid';

class List extends CoreList
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