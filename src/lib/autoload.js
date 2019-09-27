class Autoload
{
	#modules = [];
    #controllers = [];
    #layouts = [];
    #routes = [];

	init()
	{
		this.loadModules();
        this.loadControllers();
        this.loadLayouts();
        this.loadRoutes();
	}

    getModules()
    {
        return this.#modules;
    }

    getControllers()
    {
        return this.#controllers;
    }

    getLayouts()
    {
        return this.#layouts;
    }

    getRoutes()
    {
        return this.#routes;
    }

    loadRoutes()
    {
        this.#routes = require('./../etc/routes');
        return this;   
    }

	loadModules()
    {
        this.#modules = require('./../etc/modules');
        return this;
    }

    loadControllers()
    {
        for (var i = this.getModules().length - 1; i >= 0; i--)
        {
            let module = this.#modules[i];
            let controllers = require('./../modules/' + module.name + '/etc/controller');
            this.#controllers = Object.assign(this.#controllers, controllers.default);
        }

        return this;
    }

    loadLayouts()
    {
        for (var i = this.getModules().length - 1; i >= 0; i--) 
        {
            let module = this.#modules[i];
            let layouts = require('./../modules/' + module.name + '/etc/layout');
            this.#layouts = Object.assign(this.#layouts, layouts.default);
        }
        return this;
    }
}

export default Autoload;