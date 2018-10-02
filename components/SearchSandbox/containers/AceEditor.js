import React, { Component } from 'react';

const Editor = (props) => {
	if (typeof window !== 'undefined') {
		const AceEditor = require('react-ace').default; // eslint-disable-line
		require('brace').default; // eslint-disable-line
		require('brace/mode/json'); // eslint-disable-line
		require('brace/theme/monokai'); // eslint-disable-line
		return <AceEditor {...props} />;
	}
	return null;
};

class Ace extends Component {
	state = {
		mounted: false,
	};

	componentDidMount() {
    // eslint-disable-next-line
		this.setState({ mounted: true });
	}

	render() {
		const { mounted } = this.state;
		return mounted ? (
			<Editor {...this.props} editorProps={{ $blockScrolling: true }} />
		) : null;
	}
}

export default Ace;
