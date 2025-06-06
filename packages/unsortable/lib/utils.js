/**
 * Moves an element within an array from one index to another.
 *
 * @template {any[]} T
 * @param {T} arr - The array to modify.
 * @param {number} from - The index of the element to move.
 * @param {number} to - The index to move the element to.
 * @returns {T} The modified array with the element moved.
 */
export const move = (arr, from, to) => {
  arr.splice(to, 0, arr.splice(from, 1)[0])
  return arr
}

/**
 * Checks if a target value exists within an object or its nested structures.
 *
 * @param {any} obj - The object to search within.
 * @param {any} target - The value to search for.
 * @returns {boolean} True if the target value is found, otherwise false.
 */
export const hasValue = (obj, target) => {
  if (obj === target) return true
  if (Array.isArray(obj)) return obj.some((v) => hasValue(v, target))
  if (obj && typeof obj === 'object') return Object.values(obj).some((v) => hasValue(v, target))
  return false
}
