
const routes = [
    {
        route : '/aboutus',
        module : 'core',
        controller : 'page',
        action : 'aboutus'
    },
    {
        route : '/contact',
        module : 'core',
        controller : 'page',
        action : 'contact'
    },
    {
        route : '/admin/dashboard',
        module : 'admin',
        controller : 'admin',
        action : 'list'
    },

    // basic pattened urls | dont change it.
    {
        route : '/:module/:controller/:action/:id/:tab/:tabId'
    },
    {
        route : '/:module/:controller/:action/:id/:tab'
    },
    {
        route : '/:module/:controller/:action/:id'
    },
    {
    	route : '/:module/:controller/:action'
    }
];

module.exports = routes;