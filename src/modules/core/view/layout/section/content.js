import React from 'react';
import Layout from './../layout';

class Content extends Layout
{
	constructor(props)
	{
		super(props);
	}

    render()
    {
        let views = Object.values(this.props.views);
        return (
            <div>
                {views.map((Element, index) => {
                    return (<Element layout={this.getLayout()} key={index} />);
                })}
            </div>
        );
    }
}

export default Content;