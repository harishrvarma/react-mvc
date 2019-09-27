
import React from 'react';
import Controller from './../../../core/controller/controller';

import AdminEdit from './../../view/admin/edit';

class Edit extends Controller
{
    constructor(props)
    {
        super(props);
        this.contentView();
	}

	contentView()
    {
        let contents = {
            List : AdminEdit
        };
        this.setViews(contents, 'content');
    }

}

export default Edit;