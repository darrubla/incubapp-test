import logMessage from './logUtils'

const DEFAULT_ERROR = 'Unknown error'
const EMPTY_RESPONSE_ERROR = 'Response from server is empty'
const NO_DATA_RECEIVED = 'Response from server does not have data'

export const handleActionCatch = (
  error,
  dispatch,
  action,
  actionName = 'action'
) => {
  let errorMessage

  // Javascript error (run time)
  if (error instanceof Error) errorMessage = `${error.name} - ${error.message}`

  // Axios error
  if (error.response) errorMessage = error.response.data.error

  // Unknown error
  if (!errorMessage) errorMessage = DEFAULT_ERROR

  // Send error to redux
  if (dispatch && action) dispatch(action(errorMessage))

  return logMessage(`Error executing ${actionName}`, errorMessage)
}

/**
 * Checks that the response from the server is not empty and is successful
 * @param {ServerResponse} response - Raw response from the server
 */
export const validateServerResponse = (response) => {
  if (!response) throw new Error(EMPTY_RESPONSE_ERROR)

  if (!response.data) throw new Error(NO_DATA_RECEIVED)
}
