// src/context/authContextValue.js
import { createContext } from 'react';

// The context object lives in its own file (no components here) so
// that AuthContext.jsx can export only the AuthProvider component,
// satisfying react-refresh/only-export-components.
export const AuthContext = createContext(null);