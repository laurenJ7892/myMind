import { createContext, useContext, useState} from 'react';

export const UserContext = createContext({
  user: {},
  session: {},
  setUser: () => {},
  setSession: () => {}
});


// Context Provider
export const UserContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState({})
  const [currentSession, setCurrentSession] = useState({})

  return (
    <UserContext.Provider
      value={{
        user: currentUser,
        sessoin: currentSession,
        setUser: setCurrentUser,
        setSession: setCurrentSession,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}


//Custom Hook
export const useUser = () => {
  return useContext(UserContext)
}