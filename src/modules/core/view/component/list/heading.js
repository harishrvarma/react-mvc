
import React from 'react';
import { Link } from 'react-router-dom';
import Template from './../../template';

class Heading extends Template
{
    constructor(props)
    {
        super(props);
        this.initState().prepareButtons();
    }

    initState()
    {
        this.state = {
            title : 'Manage Module',
            buttons : []
        };
        return this;
    }

    setTitle(title = null)
    {
        if(title === null)
        {
            title = 'Manage Admins';
        }
        this.setState({
            title : title
        });
        return this;
    }

    getTitle()
    {
        return this.state.title;
    }

    getButtons()
    {
        return this.state.buttons;
    }

    addButton(button)
    {
        if(typeof button.label !== 'string'
            || typeof button.url !== 'string')
        {
            return false;
        }
        this.state.buttons.push(button);
        return this;
    }

    prepareButtons()
    {
        //this.addButton({label : 'Add Admin', url : '/admin/admin/add'});
        return this;
    }
    
    render()
    {
    	return (
    		<div className='module-heading'>
    			<table width="100%">
    				<tbody>
    					<tr>
    						<td><h3>{this.getTitle()}</h3></td>
    						<td>
    						{this.getButtons().map((button, index) => {
    							return (
    								<Link key={index} to={button.url} >{button.label}</Link>
    							);    							
    						})}
    						</td>
    					</tr>
    				</tbody>
    			</table>
    			
    		</div>
    	);
    }
}

export default Heading;