
import React from 'react';
import { Route, Redirect, Switch, Link } from 'react-router-dom';
import CoreTabs from './../../../../core/view/component/edit/tabs';

import General from './tabs/general';
import Media from './tabs/media';
import Form from './tabs/form';

class Tabs extends CoreTabs
{
    constructor(props)
    {
        super(props);
    }

    prepareTabs()
    {
        this.addTab({
            key : 'general',
            label:'GENERAL', 
            url: this.getUrl({tab:'general'}),
            component: General
        });

        this.addTab({
            key : 'media',
            label:'MEDIA', 
            url: this.getUrl({tab:'media'}),
            component: Media
        });

        this.addTab({
            key : 'category',
            label:'CATEGORY', 
            url: this.getUrl({tab:'category'}),
            component: Form
        });
        
        return this;
    }

    defaultTab()
    {
        return this.getUrl({tab:'general'});
    }
}

export default Tabs;