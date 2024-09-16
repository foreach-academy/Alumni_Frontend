    
const { createContext } = require("react");

    const AuthContext = createContext({
        isAuthenticated: false,
        setIsAuthenticated: () => {},
        token: null,
        setToken: () => {}
    })

export default AuthContext;