/**
 * Util to log a message/trace
 * @param {string} label - Label to append to the message
 * @param {string} message - Message to log
 */
export default (label, message) => {
  // (TODO): Implement aws cloudwatch logs instead of just a console.log
  const now = new Date().toISOString()
  console.log(now, label, message)

  return { now, label, message }
}
