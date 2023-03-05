import React from 'react'
import { Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

function IsLogged(props) {
  const { children, userIsLogged } = props
  if (!userIsLogged) {
    return <Navigate to="/" />
  }

  return children
}

IsLogged.propTypes = {
  children: PropTypes.element,
  userIsLogged: PropTypes.bool.isRequired,
}
IsLogged.defaultProps = {
  children: <div>Element</div>,
}

function mapStateToProps({ Auth: { isLogged } }) {
  return {
    userIsLogged: isLogged,
  }
}

export default connect(mapStateToProps)(IsLogged)
