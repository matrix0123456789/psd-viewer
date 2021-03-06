/* @flow */
import React from 'react';
import PSD from 'psd';
import Highlight from './preview-highlight';
import Layer from './preview-layer';
let T = React.PropTypes;


export default React.createClass({

	propTypes: {
		psd: T.instanceOf(PSD).isRequired,
		highlightedLayer: T.object
	},

	getInitialState() {
		return {};
	},

	getScale() {
		let {maxWidth} = this.state;
		let image = this.props.psd.tree().width;
		if (maxWidth && image > maxWidth) {
			return maxWidth / image;
		} else {
			return 1;
		}
	},

	componentDidMount() {
		let container = this.refs.container.getDOMNode().clientWidth;
		this.setState({ maxWidth: container });
	},

	render() {
		let root = this.props.psd.tree();
		let scale = this.getScale();
		let height = scale * root.height;
		let {highlightedLayer} = this.props;
		return (
			<div className='preview'>
				<div ref="container"
				     className='preview--container'
				     style={{ height }}>

					<div className='preview--layers'>
						<Layer layer={root} scale={scale} />
					</div>

					<Highlight layer={highlightedLayer}
					           scale={scale} />
				</div>
			</div>
		);
	},

});