
import React    from 'react';
import Layout   from './layout';

import Header   from './section/header';
import Menu     from './section/menu';
import Content  from './section/content';
import Footer   from './section/footer';

class OneColumn extends Layout
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <table border="0" width="100%" cellPadding="4">
                <tbody>
                    <tr>
                        <td><Header layout={this.getLayout()} views={this.getView('header')} /></td>
                    </tr>
                    <tr>
                        <td><Menu layout={this.getLayout()} views={this.getView('menu')}  /></td>
                    </tr>
                    <tr>
                        <td><Content layout={this.getLayout()} views={this.getView('content')}  /></td>
                    </tr>
                    <tr>
                        <td><Footer layout={this.getLayout()} views={this.getView('footer')}  /></td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default OneColumn;