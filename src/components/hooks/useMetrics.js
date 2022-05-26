import {useContext} from 'react';

import {AdapterContext} from './contexts';

/**
 * A Webex metric.
 *
 * @external Metric
 * @see {@link https://github.com/webex/component-adapter-interfaces/blob/master/src/MetricsAdapter.js#L6}
 */

/**
 * Custom hook that returns an function for submitting metrics
 *
 * @returns {Function>}  The submit data function that will emit the metrics
 */
export default function useMetrics() {
  const {metricsAdapter} = useContext(AdapterContext);

  return [(metric, loginId) => metricsAdapter.submitMetrics(metric, loginId)];
}
