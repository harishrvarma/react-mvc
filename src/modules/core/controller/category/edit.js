
import React from 'react';
import Controller from './../controller';

import CategoryEdit from './../../view/category/edit';

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
            Edit : CategoryEdit
        };

        this.setViews(contents, 'content');
    }
}

export default Edit;