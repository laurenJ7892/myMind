import { createContext, useContext, useState} from 'react';

export const UserContext = createContext({
  user: {},
  session: {},
  setUser: () => {},
  setSession: () => {},
  habits:{},
  setHabits: () => {}
});


// Context Provider
export const UserContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState({})
  const [currentSession, setCurrentSession] = useState({})
  const [currentHabit, setCurrentHabit] = useState({})

  return (
    <UserContext.Provider
      value={{
        user: currentUser,
        session: currentSession,
        habits: currentHabit,
        setUser: setCurrentUser,
        setSession: setCurrentSession,
        setHabits: setCurrentHabit
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