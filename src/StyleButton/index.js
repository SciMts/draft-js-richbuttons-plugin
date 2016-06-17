import React, { Component, PropTypes } from 'react';

class StyleButton extends Component {

  static propTypes = {
    store: PropTypes.object,
    bindToState: PropTypes.func,
    label: PropTypes.string,
    inlineStyle: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
  }

  // register with store updates to ensure rerender
  componentWillMount() {
    this.props.bindToState(this);
  }

  componentWillUnmount() {
    this.props.bindToState(this, true);
  }

  render() {
    const { store, inlineStyle, label, children } = this.props;
    const toggleInlineStyle = store.toggleInlineStyle.bind(store, inlineStyle);
    let isActive = undefined;

    if (store.getEditorState) {
      const currentStyle = store.getEditorState().getCurrentInlineStyle();
      isActive = currentStyle.has(inlineStyle);
    } else {
      // editor not yet available / initialized
      isActive = false;
    }

    if (children && typeof children == 'object') {
      const ChildInput = React.cloneElement(children, {
        toggleInlineStyle,
        isActive,
        label,
        inlineStyle
      });

      return ChildInput;
    }

    const spanStyle = {
      color: isActive ? '#900' : '#999',
      cursor: 'pointer',
      display: 'inline-block',
      marginRight: '1em'
    }

    return (
      <span onClick={ toggleInlineStyle } style={spanStyle}>
        { label }
      </span>
    );
  }
}

export default StyleButton;
