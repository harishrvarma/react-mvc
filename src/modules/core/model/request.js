
class Request
{
    #params = {};
    #moduleName = null;
    #controllerName = null;
    #actionName = null;
    #routePath = null;
    #url = null;

    #paramsSequence = {module:null,controller:null,action:null,id:null,tab:null,tabId:null};

    setParams(params)
    {
        if(typeof params !== 'object')
        {
            throw 'params should be an object';
        }

        this.#params = Object.assign(this.#params, params);
        return this;
    }

    setParam(key, val)
    {
        if(!key)
        {
            throw 'key should not be null';
        }
        this.#params[key] = val;
        return this;
    }

    getParam(key)
    {
        if(typeof this.#params[key] === 'undefined')
        {
            return null;
        }
        return this.#params[key];
    }

    getParams()
    {
        return this.#params;
    }

    getModuleName()
    {
        return this.#moduleName;
    }

    setModuleName(moduleName)
    {
        this.#moduleName = moduleName;
        return this;
    }

    getControllerName()
    {
        return this.#controllerName;
    }

    setControllerName(controllerName)
    {
        this.#controllerName = controllerName;
        return this;
    }

    getActionName()
    {
        return this.#actionName;
    }

    setActionName(actionName)
    {
        this.#actionName = actionName;
        return this;
    }

    setRoutePath(routePath)
    {
        this.#routePath = routePath;
        return this;
    }

    getRoutePath()
    {
        return this.#routePath;
    }

    setUrl(url)
    {
        this.#url = url;
        return this;
    }

    getUrl(params = null)
    {
        if(params !== null)
        {
            return this.buildUrl(params);
        }

        return this.#url;
    }

    buildUrl(params)
    {
        let mixParams = Object.assign(this.#paramsSequence, this.getParams());
        if(typeof params === 'object'){
            mixParams = Object.assign(mixParams, params);    
        }        

        params = [];
        for(let [key, val] of Object.entries(mixParams)){
            if(val === null){
                break;
            }
            params.push(val);
        }
        return '/' + params.join('/');
    }
}

export default Request;