import React from 'react';
import Layout from './../layout';

class Left extends Layout
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
                    return (<Element key={index} />);
                })}
            </div>
        );
    }
}

export default Left;
