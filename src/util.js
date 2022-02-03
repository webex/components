import {Observable} from 'rxjs';

/**
 * Helper function for deep merge on objects.
 *
 * @param {object} dest - The destination object.
 * @param {object} src - The source object.
 */
export function deepMerge(dest, src) {
  const result = dest;

  for (const [key, val] of Object.entries(src)) {
    if (val?.constructor === Object) {
      deepMerge(result[key], val);
    } else {
      result[key] = val;
    }
  }
}

/**
 * Custom rxjs operator for chaining dependent observables.
 * Usage:
  ```js
  obs.pipe(
    chainWith((lastMessage) => createDependentObservable(lastMessage),
  );
  ```
 *
 * @param {function(lastMessage): Observable} createDependentObservable  Function that is passed the last message emitted by the source observable and returns a new observable
 * @returns {Observable} observable
 */
export function chainWith(createDependentObservable) {
  return (source) => new Observable((subscriber) => {
    let lastValue;
    let subscription;

    subscription = source.subscribe(
      (value) => {
        subscriber.next(value);
        lastValue = value;
      },
      (error) => subscriber.error(error),
      () => {
        subscription = createDependentObservable(lastValue).subscribe(
          (value) => subscriber.next(value),
          (error) => subscriber.error(error),
          () => subscriber.complete(),
        );
      },
    );

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  });
}

/**
 * @param {string} url  The Url
 * @param {string[]} acceptedProtocols  Specifies accepted protocols
 * @returns {boolean} True if the url is valid, otherwise false
 */
export function isValidUrl(url, acceptedProtocols) {
  let urlObject;

  try {
    urlObject = new URL(url);
  } catch (_) {
    return false;
  }

  return acceptedProtocols.includes(urlObject.protocol);
}

/**
 * Returns a number whose value is limited to the given range.
 *
 * @param {number} num  Number
 * @param {number} min  The lower boundary of the output range
 * @param {number} max  The upper boundary of the output range
 * @returns {number} A number in the range [min, max]
 */
export function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

/**
 * Returns an array that contains all the numbers in a specified range.
 *
 * @param {number} start  The first number in the interval
 * @param {number} end  The last number in the interval
 * @returns {Array<number>} An array with all the numbers in the range [start, end]
 */
export function range(start, end) {
  return [...Array(end - start + 1).keys()].map((val) => start + val);
}

/**
 * Appends the character '0' to a one-digit number
 *
 * @param {number} value  The given number
 * @returns {string} The result string
 */
export function pad2Zeros(value) {
  return String(value || '').padStart(2, '0');
}

/**
 * A callback that receives a value and a key and returns an updated value.
 *
 * @callback MapperCallback
 * @param {*} value  The value to update.
 * @param {string} key  The key corresponding to the value to update.
 * @returns {*} The updated value
 */

/**
 * Maps the values of an object
 *
 * @param {object} object  The object to modify
 * @param {MapperCallback} mapper  Mapper function
 * @returns {object} Returns an updated object with the same keys and updated object values
 */
export function mapValues(object, mapper) {
  return Object.fromEntries(Object.entries(object).map(([key, value]) => (
    [key, mapper(value, key)]
  )));
}

export default {
  deepMerge,
  chainWith,
  isValidUrl,
  clamp,
  range,
  pad2Zeros,
  mapValues,
};
