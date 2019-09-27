import React from 'react';
import { Link } from 'react-router-dom';
import Layout from './../layout';

class Menu extends Layout
{
    menu = [];

    constructor(props)
    {
        super(props);
        this.prepareMenu();
    }

    prepareMenu()
	{
        this.menu = [
			{
                label : 'Admin',
                link : '/admin/admin/list',
            },
            {
				label : 'Category',
				link : '/core/category/list',
			}			
		];

		return this;
	}


    getMenu()
    {
        return this.menu;
    }

    render()
    {
        return (
            <div>
                <table cellPadding="4">
                    <tbody>
                    <tr>
                        {this.getMenu().map((link, key) => {
                            return (
                                <td key={key}>
                                    <Link to={link.link}> {link.label} </Link>
                                </td>    
                            );

                        })}
                        
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Menu;