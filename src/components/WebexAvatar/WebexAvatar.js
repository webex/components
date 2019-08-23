import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Avatar} from '@momentum-ui/react';

const propTypes = {
  personID: PropTypes.string.isRequired,
  adapter: PropTypes.object.isRequired,
};

export default class WebexAvatar extends PureComponent {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      person: {},
    };
  }

  componentDidMount() {
    const onNext = (person) => this.setState({person});
    // eslint-disable-next-line no-console
    const onError = (error) => console.error(error.message);

    this.props.adapter.getPerson(this.props.personID).subscribe(onNext, onError);
  }

  render() {
    const {avatar, displayName, status} = this.state.person;

    return <Avatar src={avatar} title={displayName} type={status} alt={displayName} />;
  }
}

WebexAvatar.propTypes = propTypes;
