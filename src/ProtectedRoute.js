import React from "react";
import PropTypes from 'prop-types'

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const displayName = localStorage.getItem('displayName')
    if (!displayName) {
      return <Navigate to="/login" replace />
    }

    return children
}

export default ProtectedRoute

ProtectedRoute.propTypes = {
  children: PropTypes.any,
}