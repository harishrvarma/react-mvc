import React from 'react';

class Right extends React.Component
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

export default Right;