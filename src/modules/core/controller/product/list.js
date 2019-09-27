
import React from 'react';
import Controller from './../controller';

class List extends Controller
{
   constructor(props)
    {
        super(props);
        this.register(this);
	}
}

export default List;