import React from 'react';

class NotFind extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { staticContext } = this.props;
    staticContext && ( staticContext.status = 404 );
    return <div>404</div>
  }
}

export default NotFind