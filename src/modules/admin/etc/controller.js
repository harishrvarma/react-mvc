
import AdminList from './../controller/admin/list';
import AdminEdit from './../controller/admin/edit';
import AdminDelete from './../controller/admin/delete';

const controllers = {
    admin :
    {
    	admin : 
    	{
    		list : AdminList,
    		add  : AdminEdit,
    		edit : AdminEdit,
    		delete : AdminDelete
    	}
    }
};

export default controllers;