import * as React from 'react';

export interface IProps {
  update?: boolean;
}

export class StaticRender extends React.Component<IProps, {}> {
  static defaultProps: IProps = {
    update: false,
  };

  shouldComponentUpdate() {
    return this.props.update || false;
  }

  render() {
    return this.props.children;
  }
}
