
import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import Template from './../../../../../core/view/template';

class Media extends Template
{
    constructor(props)
    {
        super(props);
    }
   
    render()
    {
        return (
            <div>
                media
            </div>
        );
    }
}

export default Media;