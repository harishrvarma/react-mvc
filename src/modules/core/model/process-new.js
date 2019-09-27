import jQuery from 'jquery';


jQuery.ajaxSetup({
	data: {
		ajax: "1"
	}
});

var Core = {};

Core.Ajax = function() {};
Core.Ajax.prototype = {

	formId: null,
	requestUrl: null,
	requestType: null,
	requestTypeDefault: 'post',
	data: {},
	useType: null,
	useTypeOption: {
		form: "form",
		url: "url"
	},
	responseType: {
		success: "success",
		failure: "failure"
	},
	redirectType: {
		ajax: 'ajax',
		location: 'location'
	},

	messageType: {
		alert: 'alert',
		confirm: 'confirm', 
		prompt:'prompt'
	},

	loaderCount:0,
    isHideLoader:true,
    loaderElementId :'loader-core',

    promptValue: null,
    storageProtoType : null,
    messageProtoType : null,
    messages:{"element":[]},
    response : null,

	getStoragePrototype :  function()
	{
		if(this.storageProtoType == null)
		{
			this.storageProtoType = new Core.Storage();
		}
		return this.storageProtoType;
	},

	getMessagePrototype :  function()
    {
        if(this.messageProtoType == null)
        {
            this.messageProtoType = new Core.Message();
        }
        return this.messageProtoType;
    },

    setResponse: function(response) 
    {
        this.response = response;
        return this;
    },

    getResponse: function() 
    {
        return this.response;
    },

    setPromptValue : function(promptValue)
    {
    	this.promptValue = promptValue;
    	return this;
    },

    getPromptValue : function()
    {
    	return this.promptValue;
    },

	addMessage: function(messageJson)
	{
		this.messages.element.push(messageJson);
		return this;
	},

	hasMessage: function()
	{
		if(this.messages.element.length)
		{
			return this;
		}
		return false;
	},

	showMessage: function()
	{
		console.log(this.messages);
		this.manageHtml(this.messages);
	},

	clearMessage: function()
	{
		this.messages.element = [];
		return this;
	},

	setUseType: function(useType) {
		this.useType = useType;
		this.resetParams();
		return this;
	},

	getUseType: function() {
		return this.useType;
	},

	setFormId: function(formId) {
		this.formId = formId;
		if (!this.prepareRequestData()) {
			alert("Form element is not valid");
			return false;
		}
		return this;
	},

	getFormId: function() {
		return this.formId;
	},

	getForm: function() {
		var element = jQuery("#" + this.getFormId());
		return element;
	},

	setUrl: function(requestUrl) {
		this.requestUrl = requestUrl;
		return this;
	},

	getUrl: function() {
		return this.requestUrl;
	},

	setRequestType: function(requestType) {
		this.requestType = requestType;
		return this;
	},

	getRequestType: function() {
		if (this.requestType != null) {
			return this.requestType;
		}
		return this.requestTypeDefault;
	},

	setData: function(data) {
		this.data = data;
		return this;
	},

	getData: function() {
		return this.data;
	},

	load: function(options) 
	{
		var current = this;
		if(typeof options != "object")
		{
			options = {};
		}

		current.increaseLoaderCount(); 
		
		if (!this.validateRequestdata()) 
		{
			alert("Form Url is not valid.");
			current.decreaseLoaderCount();		
			return false;
		}

        let data = null;

		jQuery.ajax({
			type: current.getRequestType(),
			url: current.getUrl(),
			data: current.getData(),
			dataType: 'json',
            async : false,
			success: function(rs) 
			{
                this.data = rs;
                /*
				current.setResponse(rs);
				current.decreaseLoaderCount();
                current.getMessagePrototype().setAjaxPrototype(current).execute();
                //current.getStoragePrototype().setAjaxPrototype(current).execute();
                current.manageHtml(rs);
                current.manageAction(rs);
                */
			}
		});

        return data;
	},

	callback : function(callbackFunction)
	{
		if(typeof callbackFunction != "object")
		{
			return false;
		}

		if(typeof callbackFunction.method != "function")
		{
			return false;
		}

		if(typeof callbackFunction.options != "object")
		{
			callbackFunction.options = {};
		}

		var callFunction = callbackFunction.method;

		return callFunction(this, callbackFunction.options);
	},

	
	resetParams: function() {
		this.setFormId(null);
		this.setRequestType(null);
		this.setUrl(null);
		
		if(this.getPromptValue())
		{
			this.setData({value:this.getPromptValue()});
			this.setPromptValue(null);
		}
		else
		{
			this.setData({});
		}

		return this;
	},

	prepareRequestData: function() {
		if (this.getUseType() == this.useTypeOption.form) {
			var element = null;
			if (element = this.getForm()) {
				if (element != 'undefined') {
					var action = element.attr('action');

					this.setUrl(action);
					this.setRequestType(element.attr('method'));
					this.setData(element.serialize());
					return this;
				}
			}
			return false;
		}
		return true;
	},

	validateRequestdata: function() {
		if (typeof this.getRequestType() == 'undefined' || typeof this.getUrl() == 'undefined') {
			return false;
		}
		return true;
	},

	manageAction: function(response) 
	{
		var current = this;
		if (typeof response.action == 'object') 
		{
			if (typeof response.action.url == 'string') {
				if (response.action.redirectType == current.redirectType.location) {
					window.location = response.action.url;
					current.decreaseLoaderCount();
				} else {
					current.setUseType(current.useTypeOption.url).setUrl(response.action.url).load();
				}
			} else {
				jQuery(response.action).each(function(index, object) {
					current.setUseType(current.useTypeOption.url).setUrl(object.url).load();
				});
			}
		}
	},

	/* Manage element html */
	manageHtml: function(response) {
		var current = this;
		
		if (typeof response.element == 'object') {
			if (typeof response.element.elementId == 'string') {
				current.manageElementFeatures(response.element);
			} else {
				jQuery(response.element).each(function(index, object) {
					current.manageElementFeatures(object);
				});
			}
		}
	},

	/* Manage element html at proper position */
	manageElementFeatures: function(object) {
		var current = this;
		var currentElement = jQuery('#' + object.elementId);

		if (currentElement.length != 1) {
			return this;
		}

		if (typeof object.html != 'undefined') {
			if (typeof object.position == 'string' && object.position == 'prepend') {
				currentElement.prepend(object.html);
			} else if (typeof object.position == 'string' && object.position == 'append') {
				currentElement.append(object.html);
			} else {
				currentElement.html(object.html);
			}
		}

		/* specific method that used for calling action after html inserted into element. */
		if (typeof object.action == 'object') {
			current.manageAction(object);
		}

		/* element : add and remove class */
		if (typeof object.class == 'object') {
			current.manageElementClass(object, currentElement);
		}

		/* element : show hide feature*/
		if ((typeof object.display == 'undefined') || (object.display == 1)) {
			currentElement.show();
		} else if (object.display == 0) {
			currentElement.hide();
		}

		/* element : element remove */
		if ((typeof object.remove != 'undefined') && (object.remove == 1)) {
			currentElement.remove();
		}
	},

	manageElementClass: function(object, currentElement) {
		if (typeof object.class != 'object') {
			return this;
		}

		if (typeof object.class.add == 'string') {
			if (object.class.add != "") {
				currentElement.addClass(object.class.add);
			}
		} else if (typeof object.class.add == 'object') {
			jQuery(object.class.add).each(function(index, className) {
				if (typeof className == 'string' && className != "") {
					currentElement.addClass(className);
				}
			});
		}

		if (typeof object.class.remove == 'string') {
			if (object.class.remove != "") {
				currentElement.removeClass(object.class.remove);
			}
		} else if (typeof object.class.remove == 'object') {
			jQuery(object.class.remove).each(function(index, className) {
				if (typeof className == 'string' && className != "") {
					currentElement.removeClass(className);
				}
			});
		}
	},

	/* Loader function start   */
    setIsHideLoader: function(value)
    {
        return this;
    },
    
    setIsShowLoader: function(value)
    {
        return this;
    },
    
    setLoaderElementId: function(value)
    {
        this.loaderElementId = value;
        return this;        
    },
    
    increaseLoaderCount : function()
    {   
        if(this.loaderCount == 0)
        {
             this.showLoader();
        }
        this.loaderCount++;
    },
    
    decreaseLoaderCount : function()
    {   
        if(this.loaderCount > 0)
        {
            this.loaderCount--;    
        }

        if(this.loaderCount == 0)
        { 
            this.hideLoader();
        }
    },
    
    showLoader  : function()
    {  
        if(jQuery('#'+this.loaderElementId).length == 0)
        {
            var loaderElement = '<div id="'+ this.loaderElementId +'">LOADING.....</div>';        
            jQuery("body").append(loaderElement);
        }
         
        jQuery('#'+this.loaderElementId).show();  
        return this;
    },
    
    hideLoader  : function()
    {
        if(jQuery('#'+this.loaderElementId).length != 0)
        {
            jQuery('#'+this.loaderElementId).hide();
        }
        
        return this;
    },
    /* Loader function end   */

	test: function()
	{
		alert(1);
	}
};

Core.Message = function(){};
Core.Message.prototype = 
{
	ajaxPrototype : null,

    setAjaxPrototype : function(ajaxPrototype)
    {
    	
        this.ajaxPrototype = ajaxPrototype;
        return this;
    },

    getAjaxPrototype : function()
    {
        return this.ajaxPrototype;
    },

    execute: function()
    {
        var ajaxPrototype = this.getAjaxPrototype();
        var response = this.getAjaxPrototype().getResponse();

        if (typeof response.message == 'undefined' || response.message == '') 
        {
            return false;
        }

        if (response.responseType == ajaxPrototype.responseType.success) 
        {
            if(typeof response.messageType != 'undefined' && response.messageType != '')
            {
                if(response.messageType == ajaxPrototype.messageType.alert)
                {
                    alert(response.message);
                }
                else if(response.messageType == ajaxPrototype.messageType.confirm)
                {
                    /* eslint no-restricted-globals:0 */
                    
                    let result = confirm(response.message);
                    if(result)
                    {
                        if(typeof response.confirmOption != 'object'){
                            return false;
                        }

                        if(typeof response.confirmOption.ok != 'object'){
                            return false;
                        }

                        if(typeof response.confirmOption.ok.element != 'undefined')
                        {
                            ajaxPrototype.manageHtml(response.confirmOption.ok);
                        }

                        if(typeof response.confirmOption.ok.action != 'undefined'){
                            ajaxPrototype.manageAction(response.confirmOption.ok);
                        }
                    }
                    else
                    {
                        if(typeof response.confirmOption != 'object'){
                            return false;
                        }

                        if(typeof response.confirmOption.cancel != 'object'){
                            return false;
                        }

                        if(typeof response.confirmOption.cancel.element != 'undefined'){
                            ajaxPrototype.manageHtml(response.confirmOption.cancel);
                        }

                        if(typeof response.confirmOption.cancel.action != 'undefined'){
                            ajaxPrototype.manageAction(response.confirmOption.cancel);
                        }
                    }
                }
                else if(response.messageType == ajaxPrototype.messageType.prompt)
                {
                    ajaxPrototype.setPromptValue(prompt(response.message));

                    if(ajaxPrototype.getPromptValue() == null)
                    {
                        if(typeof response.promptOption != 'object'){
                            return false;
                        }

                        if(typeof response.promptOption.cancel != 'object'){
                            return false;
                        }

                        if(typeof response.promptOption.cancel.element != 'undefined')
                        {
                            ajaxPrototype.manageHtml(response.promptOption.cancel);
                        }

                        if(typeof response.promptOption.cancel.action != 'undefined'){
                            ajaxPrototype.manageAction(response.promptOption.cancel);
                        }
                    }
                    else
                    {                       
                        if(typeof response.promptOption != 'object'){
                            return false;
                        }

                        if(typeof response.promptOption.ok != 'object'){
                            return false;
                        }

                        if(typeof response.promptOption.ok.action != 'undefined')
                        {
                            ajaxPrototype.manageAction(response.promptOption.ok);
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
        else if (response.responseType == ajaxPrototype.responseType.failure) 
        {
            if (typeof response.message != 'undefined' && response.message != '')
            {
                alert(response.message);
            }
        }
    },
};

export default Core;