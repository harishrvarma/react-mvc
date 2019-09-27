
import React from 'react';
import { Route, Redirect, Switch, Link } from 'react-router-dom';

import Template from './../../template';


import General from './tabs/general';
import Media from './tabs/media';
import Form from './tabs/form';

class Tabs extends Template
{
    constructor(props)
    {
        super(props);
        this.initState().prepareTabs();
    }

    initState()
    {
        this.state = {
            tabs : []
        };
        return this;
    }

    getTabs()
    {
        return this.state.tabs;
    }

    setTabs(tabs)
    {
        this.setState({tabs : tabs});
        return this;
    }

    addTab(tab)
    {
        if(typeof tab.url !== 'string'
            || typeof tab.label !== 'string')
        {
            return false;
        }

        this.state.tabs.push(tab);
        return this;
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

    getCurrentTab()
    {
        return this.getRequest().getParam('tab');
    }

    defaultTab()
    {
        return this.getUrl({tab:'general'});
    }

    render()
    {
        return (
            <div className='module-edit'>
                <div className='module-edit-tabs'>
                    <table width="10%">
                        <tbody>
                            <tr>
                            {this.getTabs().map((tab, index) => {
                                if(tab.key === this.getCurrentTab())
                                {
                                    return (
                                        <td key={index}><Link to={tab.url} > {tab.label}</Link></td>
                                    );                              
                                }
                                else
                                {
                                    return (
                                        <td key={index}><Link to={tab.url} >{tab.label}</Link></td>
                                    );                                  
                                }
                            })}
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='module-edit-content'>
                    <Switch>
                        {this.getTabs().map((tab, index) => {
                            return (
                                <Route key={index} path={tab.url} render={(props) => 
                                {
                                    let Element = tab.component;

                                    return (<Element layout={this.getLayout()}  {...props} />);
                                }} />
                            )
                        })}
                        <Redirect to={this.defaultTab()} />
                    </Switch>
                </div>
    		</div>
    	);
    }
}

export default Tabs;