import React from 'react';
import CoreEdit from './../../../core/view/component/edit';

import Heading from './list/heading';
import Tabs from './edit/tabs';

class Edit extends CoreEdit
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