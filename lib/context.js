import { createContext, useContext, useState} from 'react';

export const UserContext = createContext({
  user: {},
  session: {},
  setUser: () => {},
  setSession: () => {},
  habits:{},
  setHabits: () => {},
  allHabits: [],
  setAllHabits: () => {},
  successModal: false,
  setSuccessModal: () => {},
  goal: [],
  setGoal: () => {},
  achievedGoals: [],
  setAchievedGoals: () => {},
});


// Context Provider
export const UserContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState({})
  const [currentSession, setCurrentSession] = useState({})
  const [currentHabit, setCurrentHabit] = useState({})
  const [allHabits, setAllHabits] = useState([])
  const [successModal, setSuccessModal] = useState(false)
  const [goal, setGoal] = useState({})
  const [achievedGoals, setAchievedGoals] = useState([])


  return (
    <UserContext.Provider
      value={{
        user: currentUser,
        session: currentSession,
        habits: currentHabit,
        allHabits: allHabits,
        successModal: successModal,
        goal: goal,
        achievedGoals: achievedGoals,
        setUser: setCurrentUser,
        setSession: setCurrentSession,
        setHabits: setCurrentHabit,
        setAllHabits, setAllHabits,
        setSuccessModal: setSuccessModal,
        setGoal: setGoal,
        setAchievedGoals: setAchievedGoals
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