
import React    from 'react';

import Header   from './section/header';
import Menu     from './section/menu';
import Content  from './section/content';
import Footer   from './section/footer';
import Left     from './section/left';
import Right    from './section/right';

class ThreeColumn extends React.Component
{
    constructor(props)
    {
        super(props);
    }
    
    render()
    {
        return (
            <table width="100%">
                <tbody>
                    <tr>
                        <td colSpan="3">
                            <Header header={this.getView('header')}  />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="3">
                            <Menu menu={this.getView('menu')}  />
                        </td>
                    </tr>
                    <tr>
                        <td width="15%"><Left left={this.getView('left')} /></td>
                        <td width="70%"><Content content={this.getView('content')} /></td>
                        <td width="15%"><Right right={this.getView('right')} /></td>
                    </tr>
                    <tr>
                        <td colSpan="3">
                            <Footer footer={this.getView('footer')} />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default ThreeColumn;