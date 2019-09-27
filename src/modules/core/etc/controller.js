
import ProductList from './../controller/product/list';

import CategoryList from './../controller/category/list';
import CategoryEdit from './../controller/category/edit';
import CategoryDelete from './../controller/category/delete';
import CategorySave from './../controller/category/save';

import PageContact from './../controller/page/contact';
import PageAboutus from './../controller/page/aboutus';

const controllers = {
    core : 
    {
    	product :
    	{
    		list : ProductList
    	},
    	
        category : 
    	{
    		list : CategoryList,
            edit : CategoryEdit,
            delete : CategoryDelete,
            save : CategorySave
    	},    	

        page : 
        {
            contact : PageContact,
            aboutus : PageAboutus
        }
    }
};

export default controllers;