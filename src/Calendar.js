import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import classnames from 'classnames';
import { getModsByCompType, getComponentMod } from './util';

import Month from './Month';

export default class Calendar extends Component {
  static propTypes = {
    startDate: PropTypes.object.isRequired,
    endDate: PropTypes.object.isRequired,
    weekNumbers: PropTypes.bool,
    locale: PropTypes.string,
    month: PropTypes.array,
    yearHeaderFormat: PropTypes.string
  };

  static defaultProps = {
    locale: 'en',
    yearHeaderFormat: 'YYYY'
  };

  constructor (props, context) {
    super(props, context);
  }

  moment () {
    const localMoment = moment.apply(null, arguments);

    localMoment.locale(this.props.locale);

    return localMoment;
  }

  renderHeader () {
    return (
      <header key="header"
              className={classnames('rc-Calendar-header')}>
        { this.moment(this.props.date).format(this.props.yearHeaderFormat) }
      </header>
    );
  }

  getMonthRange () {
    const focus = this.moment(this.props.date).startOf('month');
    const start = this.moment(this.props.startDate);
    const end = this.moment(this.props.endDate);
    const size = end.diff(start, 'month') + 1;

    return Array(size).fill(0).map((n, i) => focus.clone().add(n + i, 'months'));
  }

  render () {
    const { mods } = this.props;
    const monthMods = getModsByCompType('month', mods);
    const weekMods = getModsByCompType('week', mods);
    const dayMods = getModsByCompType('day', mods);

    return (
      <div>
        { this.renderHeader() }
        {
          this.getMonthRange().map((date, i) =>
            <Month key={ `month-${i}` }
                   date={ date }
                   weekNumbers={ true }
                   mods={ monthMods }
                   week={ weekMods }
                   day={ dayMods } />
          )
        }
      </div>
    );
  }
}
