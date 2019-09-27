
import React from 'react';
import Controller from './../../../core/controller/controller';

import AdminList from './../../view/admin/list';

class List extends Controller
{
    constructor(props)
    {
        super(props);
        this.contentView();
	}

	contentView()
    {
        let contents = {
            List : AdminList
        };
        this.setViews(contents, 'content');
    }

}

export default List;