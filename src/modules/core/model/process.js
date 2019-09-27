import jQuery from 'jquery';

class Process
{
    view = null;
    response  =  null;
    form = null;
    url = null;
    method = null;
    methodDefault = 'post';
    params = {};
    useType = null;
    modeOptions = {
        form : "form",
        url : "url"
    };
    statusTypes = {
        success : "success",
        failure : "failure"
    };
    redirectType = {
        ajax : 'ajax',
        location : 'location'
    };

    loaderCount = 0;
    isHideLoader = true;
    loaderElementId  = 'loader-core';

    
     messageType = {
        alert : 'alert',
        confirm : 'confirm', 
        prompt : 'prompt'
    };

    promptValue =  null;
    message  =  null;
    
    messages = {"element" : []};
    storageProtoType  =  null;

    getMessageProtoType()
    {
        if(this.message === null)
        {
            this.message = new Message();
        }
        return this.message;
    }

    addMessage(messageJson)
    {
        this.messages.element.push(messageJson);
        return this;
    }

    hasMessage()
    {
        if(this.messages.element.length)
        {
            return this;
        }
        return false;
    }

    showMessage()
    {
        this.manageHtml(this.messages);
    }

    setView(view)
    {
        this.view = view;
        return this;
    }

    getView()
    {
        return this.view;
    }

    setPromptValue (promptValue)
    {
        this.promptValue = promptValue;
        return this;
    }

    getPromptValue ()
    {
        return this.promptValue;
    }    

    clearMessage()
    {
        this.messages.element = [];
        return this;
    }

    setResponse(response) 
    {
        this.response = response;
        return this;
    }

    getResponse() 
    {
        return this.response;
    }

    setMode(useType) 
    {
        this.useType = useType;
        this.resetAjaxParams();
        return this;
    }

    getMode() {
        return this.useType;
    }

    setForm(element)
    {
        element = jQuery(element);

        if(element.length === 0)
        {
            throw new Error("form element is not set.");
        }
        this.form = element;
        this.prepareAjaxParams();
        return this;
    }

    getForm() 
    {
        return this.form;
    }

    setUrl(url) 
    {
        this.url = url;
        return this;
    }

    getUrl() {
        return this.url;
    }

    setMethod(method) {
        this.method = method;
        return this;
    }

    getMethod() {
        if (this.method !== null) {
            return this.method;
        }
        return this.methodDefault;
    }

    resetParams() {
        this.params = {};
        return this;
    }

    setParams(params) {
        this.params = params;
        return this;
    }

    getParams() {
        return this.params;
    }

    addParam(key, val)
    {
        this.params[key] = val;
        return this;
    }

    removeParam(key)
    {
        if(typeof this.params[key] !== 'undefined')
        {
            delete this.params[key];   
        }
        return this;
    }

    load(options = null) 
    {
        if(options === null)
        {
            options = {};
        }

        this.increaseLoaderCount(); 
        
        if (!this.validateAjaxParams()) 
        {
            alert("Form Url is not valid.");
            this.decreaseLoaderCount();      
            return false;
        }
        
        jQuery.ajax({
            type: this.getMethod(),
            url: this.getUrl(),
            data: this.getParams(),
            dataType: 'json',
            async : false
        })
        .done((response) => {
            
            this.setResponse(response);
            this.decreaseLoaderCount();
            this.manageView(response);
            this.getMessageProtoType().setAjax(this).execute();

            //this.manageHtml(response);
            //this.manageAction(response);
        })
        .fail((response) => {

        });

        return this;
    }

    getState(key = null)
    {
        if(typeof this.getResponse().states !== 'object'){
            return null;
        }

        if(key === null)
        {
            return this.getResponse().states;
        }

        if(typeof this.getResponse().states[key] !== 'undefined')
        {
            return this.getResponse().states[key];
        }

        return null;        
    }

    manageView(response)
    {
        if(typeof response.states !== 'object')
        {
            return false;
        }

        if(this.getView() === null || typeof this.getView().state !== 'object')
        {
            return false;
        }

        this.getView().setState(response.states);
    }

    /* Manage element action */
    manageAction(response) 
    {
        if (typeof response.action === 'object') 
        {
            if (typeof response.action.url === 'string') {
                if (response.action.redirectType === this.redirectType.location) {
                    window.location = response.action.url;
                    this.decreaseLoaderCount();
                } else {
                    this.setMode(this.modeOptions.url).setUrl(response.action.url).load();
                }
            } else {
                jQuery(response.action).each(function(index, object) {
                    this.setMode(this.modeOptions.url).setUrl(object.url).load();
                });
            }
        }
    }

    /* Manage element html */
    manageHtml(response) 
    {
        
        if (typeof response.element === 'object') 
        {
            if (typeof response.element.elementId === 'string') 
            {
                this.manageElementFeatures(response.element);
            } else 
            {
                jQuery(response.element).each(function(index, object) 
                {
                    this.manageElementFeatures(object);
                });
            }
        }
    }

    /* Manage element html at proper position */
    manageElementFeatures(object) 
    {
        var currentElement = jQuery('#' + object.elementId);

        if (currentElement.length !== 1) {
            return this;
        }

        if (typeof object.html !== 'undefined') 
        {
            if (typeof object.position === 'string' && object.position === 'prepend') {
                currentElement.prepend(object.html);
            } 
            else if (typeof object.position === 'string' && object.position === 'append') {
                currentElement.append(object.html);
            } else {
                currentElement.html(object.html);
            }
        }

        /* specific method that used for calling action after html inserted into element. */
        if (typeof object.action === 'object') {
            this.manageAction(object);
        }

        /* element : add and remove class */
        if (typeof object.class === 'object') {
            this.manageElementClass(object, currentElement);
        }

        /* element : show hide feature*/
        if ((typeof object.display === 'undefined') || (object.display === 1)) {
            currentElement.show();
        } else if (object.display === 0) {
            currentElement.hide();
        }

        /* element : element remove */
        if ((typeof object.remove !== 'undefined') && (object.remove === 1)) {
            currentElement.remove();
        }
    }

    manageElementClass(object, currentElement) {
        if (typeof object.class !== 'object') {
            return this;
        }

        if (typeof object.class.add === 'string') {
            if (object.class.add !== "") {
                currentElement.addClass(object.class.add);
            }
        } else if (typeof object.class.add === 'object') {
            jQuery(object.class.add).each(function(index, className) {
                if (typeof className === 'string' && className !== "") {
                    currentElement.addClass(className);
                }
            });
        }

        if (typeof object.class.remove === 'string') {
            if (object.class.remove !== "") {
                currentElement.removeClass(object.class.remove);
            }
        } else if (typeof object.class.remove === 'object') {
            jQuery(object.class.remove).each(function(index, className) {
                if (typeof className === 'string' && className !== "") {
                    currentElement.removeClass(className);
                }
            });
        }
    }

    resetAjaxParams() 
    {
        this.setMethod(null);
        this.setUrl(null);
        
        if(this.getPromptValue())
        {
            this.setParams({value:this.getPromptValue()});
            this.setPromptValue(null);
        }
        else
        {
            this.setParams({});
        }
        return this;
    }

    prepareAjaxParams() 
    {
        if (this.getMode() !== this.modeOptions.form) 
        {
            return false;
        }
        this.setUrl(this.getForm().attr('action'));
        this.setMethod(this.getForm().attr('method'));
        this.setParams(this.getForm().serialize());
        return true;
    }

    validateAjaxParams() 
    {
        if (typeof this.getMethod() === 'undefined' || typeof this.getUrl() === 'undefined') {
            return false;
        }
        return true;
    }

    setLoaderElementId(value)
    {
        this.loaderElementId = value;
        return this;        
    }
    
    increaseLoaderCount()
    {   
        if(this.loaderCount === 0)
        {
             this.showLoader();
        }
        this.loaderCount++;
    }
    
    decreaseLoaderCount()
    {   
        if(this.loaderCount > 0)
        {
            this.loaderCount--;    
        }

        if(this.loaderCount === 0)
        { 
            this.hideLoader();
        }
    }
    
    showLoader()
    {  
        if(jQuery('#'+this.loaderElementId).length === 0)
        {
            var loaderElement = '<div id="'+ this.loaderElementId +'">LOADING.....</div>';        
            jQuery("body").append(loaderElement);
        }
         
        jQuery('#'+this.loaderElementId).show();  
        return this;
    }
    
    hideLoader()
    {
        if(jQuery('#'+this.loaderElementId).length !== 0)
        {
            jQuery('#'+this.loaderElementId).hide();
        }
        
        return this;
    }
}

class Message
{
    ajax = null;
    setAjax(ajax)
    {
        
        this.ajax = ajax;
        return this;
    }

    getAjax()
    {
        return this.ajax;
    }

    execute()
    {
        let ajax = this.getAjax();
        let response = this.getAjax().getResponse();

        if (typeof response.message === 'undefined' || response.message === '') 
        {
            return false;
        }

        if (response.status === ajax.statusTypes.success)
        {
            if(typeof response.messageType !== 'undefined' && response.messageType !== '')
            {
                if(response.messageType === ajax.messageType.alert)
                {
                    alert(response.message);
                }
                else if(response.messageType === ajax.messageType.confirm)
                {
                    /* eslint no-restricted-globals:0 */
                    
                    let result = confirm(response.message);
                    if(result)
                    {
                        if(typeof response.confirmOption !== 'object'){
                            return false;
                        }

                        if(typeof response.confirmOption.ok !== 'object'){
                            return false;
                        }

                        if(typeof response.confirmOption.ok.element !== 'undefined')
                        {
                            ajax.manageHtml(response.confirmOption.ok);
                        }

                        if(typeof response.confirmOption.ok.action !== 'undefined'){
                            ajax.manageAction(response.confirmOption.ok);
                        }
                    }
                    else
                    {
                        if(typeof response.confirmOption !== 'object'){
                            return false;
                        }

                        if(typeof response.confirmOption.cancel !== 'object'){
                            return false;
                        }

                        if(typeof response.confirmOption.cancel.element !== 'undefined'){
                            ajax.manageHtml(response.confirmOption.cancel);
                        }

                        if(typeof response.confirmOption.cancel.action !== 'undefined'){
                            ajax.manageAction(response.confirmOption.cancel);
                        }
                    }
                }
                else if(response.messageType === ajax.messageType.prompt)
                {
                    ajax.setPromptValue(prompt(response.message));

                    if(ajax.getPromptValue() === null)
                    {
                        if(typeof response.promptOption !== 'object'){
                            return false;
                        }

                        if(typeof response.promptOption.cancel !== 'object'){
                            return false;
                        }

                        if(typeof response.promptOption.cancel.element !== 'undefined')
                        {
                            ajax.manageHtml(response.promptOption.cancel);
                        }

                        if(typeof response.promptOption.cancel.action !== 'undefined'){
                            ajax.manageAction(response.promptOption.cancel);
                        }
                    }
                    else
                    {                       
                        if(typeof response.promptOption !== 'object'){
                            return false;
                        }

                        if(typeof response.promptOption.ok !== 'object'){
                            return false;
                        }

                        if(typeof response.promptOption.ok.action !== 'undefined')
                        {
                            ajax.manageAction(response.promptOption.ok);
                        }
                    }
                }
            }
            else
            {
                //when message type is not defined.
                alert(response.message);
            }
        } 
        else if (response.status === ajax.statusTypes.failure) 
        {
            if (typeof response.message !== 'undefined' && response.message !== '')
            {
                alert(response.message);
            }
        }
    }
};

export default Process;