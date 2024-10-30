// src/contexts/TokenContext.js
import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};

TokenProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

export const useToken = () => useContext(TokenContext);
