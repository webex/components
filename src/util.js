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

export default {
  deepMerge,
};
