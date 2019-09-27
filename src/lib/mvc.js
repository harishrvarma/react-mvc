
import React from 'react';

import Bootstrap from './bootstrap';
import Autoload from './autoload';

class Mvc extends React.Component
{
	autoload = null;
	constructor()
	{
		super();
		this.initAutoload();
	}

	getAutoload()
	{
		return this.autoload;
	}

	initAutoload()
	{
		this.autoload = new Autoload();
		this.autoload.init();
		return this;
	}

	render()
    {
    	return (
        	<Bootstrap mvc = {this} />
        );
    }
}

export default Mvc;