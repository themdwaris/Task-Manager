"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const UserTaskContext = createContext();

export const UserTaskContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "",
    status: "",
    assignedTo: "",
  });
  const [createdTasks, setCreatedTasks] = useState([]);
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [edit, setEdit] = useState("");
  const [notify,setNotify]=useState(false)
  

  const getAllTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/tasks");
      if (res?.data?.success) {
        setCreatedTasks(res.data.createdTasks);
        setAssignedTasks(res.data.assignedTasks);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("Failed to get all tasks::", error);
    }
  };

  const getCurrentUser = async () => {
    try {
      const res = await axios.get("/api/currentUser");

      if (res?.data?.success) {
        setUser(res?.data?.user);
      }
    } catch (error) {
      console.log("failed to get current user data::", error);
    }
  };

  useEffect(()=>{
    getAllTasks()
  },[])

  useEffect(() => {
    getCurrentUser();
    
  }, []);

  return (
    <UserTaskContext.Provider
      value={{
        user,
        router,
        setUser,
        getCurrentUser,
        loading,
        setLoading,
        openMenu,
        setOpenMenu,
        openForm,
        setOpenForm,
        taskData,
        setTaskData,
        createdTasks,
        setCreatedTasks,
        assignedTasks,
        setAssignedTasks,
        edit,
        setEdit,
        getAllTasks,
        notify,setNotify
        
      }}
    >
      {children}
    </UserTaskContext.Provider>
  );
};

export const useUserTask = () => useContext(UserTaskContext);
