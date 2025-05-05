import { useUserTask } from "@/context/UserTaskContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import Loader from "./Loader";

const TaskForm = () => {
  const { setOpenForm, taskData, setTaskData, edit, getAllTasks, setNotify } =
    useUserTask();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const createTaskHandler = async (e) => {
    e.preventDefault();

    if (edit) {
      try {
        const res = await axios.put(`/api/tasks/${edit}`, taskData);

        if (res?.data?.success) {
          toast.success(res.data.message);
          setOpenForm(false);
          getAllTasks();

          if (taskData?.assignedTo?.length > 0) {
            const notiRes = await axios.post("/api/notification", {
              userId: taskData?.assignedTo, // jisko assign kar rahe ho
              message: `You have been assigned a new task!`,
            });
            setNotify(true);
          } else {
            setNotify(false);
          }

          return;
        }
      } catch (error) {
        setLoading(false);
        setNotify(false);
        toast.error(error);
        console.log("Failed to update task ::", error);
      }
    } else {
      try {
        setLoading(true);
        const res = await axios.post("/api/tasks", taskData);
        if (res?.data?.success) {
          toast.success(res.data.message);
          setOpenForm(false);
          setLoading(false);
          setTaskData({
            title: "",
            description: "",
            dueDate: "",
            priority: "",
            status: "",
            assignedTo: "",
          });

          if (taskData?.assignedTo?.length > 0) {
            await axios.post("/api/notification", {
              userId: taskData?.assignedTo, // jisko assign kar rahe ho
              message: `You have been assigned a new task!`,
            });
            setNotify(true);
          } else {
            setNotify(false);
          }
        }
      } catch (error) {
        setLoading(false);
        setNotify(false)
        console.log("Failed to add task ::", error);
      }
    }
  };
  const taskInputHandler = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axios.get("/api/users");
        if (res?.data?.success) {
          setUsers(res.data.allUsers);
        }
      } catch (error) {
        console.log("Failed to get all users ::", error);
      }
    };
    getAllUsers();
  }, []);

  return (
    <div
      className="w-full max-w-xl mx-auto p-5 rounded-lg bg-green-950 relative overflow-y-auto"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <span
        className="absolute right-5 top-5 cursor-pointer transition transform active:scale-90"
        onClick={() => setOpenForm(false)}
      >
        <IoMdClose size={23} />
      </span>
      <h1 className="text-xl text-center py-4">Create Task</h1>
      <form
        onSubmit={createTaskHandler}
        className="w-full flex flex-col gap-3.5"
      >
        <input
          type="text"
          placeholder="Task Title"
          name="title"
          value={taskData?.title}
          onChange={taskInputHandler}
          className="px-3 py-3 rounded-lg bg-white/10 border-none outline-none w-full "
        />
        <textarea
          type="text"
          placeholder="Task Description"
          name="description"
          value={taskData?.description}
          onChange={taskInputHandler}
          className="px-3 py-3 rounded-lg bg-white/10 border-none outline-none w-full "
          rows={4}
        />
        <div className="flex flex-col gap-2.5">
          <label htmlFor="" className="flex flex-col ">
            <span className="text-white/60 pb-1">Select Due Date</span>
            <input
              type="date"
              name="dueDate"
              value={taskData?.dueDate}
              onChange={taskInputHandler}
              className="px-3 py-3 rounded-lg bg-white/10 border-none outline-none "
            />
          </label>

          <label htmlFor="" className="flex flex-col ">
            <span className="text-white/60 pb-1">Select priority</span>
            <select
              className="px-3 py-3 rounded-lg bg-white/10 border-none outline-none"
              name="priority"
              value={taskData?.priority}
              onChange={taskInputHandler}
            >
              <option value="" className="">
                Select
              </option>
              <option value="Low" className="text-black">
                Low
              </option>
              <option value="Medium" className="text-black">
                Medium
              </option>
              <option value="High" className="text-black">
                High
              </option>
            </select>
          </label>

          <label htmlFor="" className="flex flex-col ">
            <span className=" pb-1 text-white/60">Select status</span>
            <select
              className="px-3 py-3 rounded-lg bg-white/10 border-none outline-none"
              name="status"
              value={taskData?.status}
              onChange={taskInputHandler}
            >
              <option value="" className="">
                Select
              </option>
              <option value="Pending" className="text-black">
                Pending
              </option>
              <option value="In Progress" className="text-black">
                In Progress
              </option>
              <option value="Completed" className="text-black">
                Completed
              </option>
            </select>
          </label>

          <label htmlFor="" className="flex flex-col ">
            <span className=" text-white/60 pb-1">Assigned to user</span>
            <select
              className="px-3 py-3 rounded-lg bg-white/10 border-none outline-none"
              name="assignedTo"
              value={taskData?.assignedTo}
              onChange={taskInputHandler}
            >
              <option value="" className="">
                Select user
              </option>
              {users &&
                users?.length > 0 &&
                users?.map((user) => (
                  <option
                    key={user?._id}
                    value={user?._id}
                    className="text-black"
                  >
                    {user?.name}
                  </option>
                ))}
            </select>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`p-3 rounded-lg bg-slate-700 cursor-pointer transition transform active:scale-90 flex items-center justify-center gap-2.5 ${
            loading && "opacity-65"
          }`}
        >
          <span>{edit ? "Upadte task" : "Create task"}</span>
          {loading && <Loader />}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
