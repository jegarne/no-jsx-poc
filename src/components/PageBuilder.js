import React from 'react';
import NoJSX from 'react-nojsx';

class PageBuilder extends React.Component {
  render() {
    const template = new NoJSX(this.props.json);
    return template.compile();
  }
}

export default PageBuilder;
