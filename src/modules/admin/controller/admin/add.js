
import React from 'react';
import Controller from './../../../core/controller/controller';

import AdminEdit from './../../view/admin/edit';

class Add extends Controller
{
    constructor(props)
    {
        super(props);
        this.contentView();
	}

	contentView()
    {
        let contents = {
            edit : AdminEdit
        };
        this.setViews(contents, 'content');
    }

}

export default Add;