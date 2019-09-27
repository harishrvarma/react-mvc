
import React from 'react';
import Controller from './../controller';

import CategoryList from './../../view/category/list';

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
            List : CategoryList,
            List1 : CategoryList,
        };
        this.setViews(contents, 'content');
    }
}

export default List;