"use client";

import React, { useEffect, useState } from "react";
import TaskCard from "@/components/TaskCard";
import TaskForm from "@/components/TaskForm";
import Wrapper from "@/components/Wrapper";
import { useUserTask } from "@/context/UserTaskContext";
import { RiAddLargeLine } from "react-icons/ri";
import Loader2 from "@/components/Loader2";
import Notify from "@/components/Notify";


const App = () => {
  const {
    getCurrentUser,
    openForm,
    setOpenForm,
    assignedTasks,
    createdTasks,
    laoding,
    getAllTasks
  } = useUserTask();

  const [allTasks, setAllTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");

  //filter logic filter by title,description,status,priority,date
  const filteredTasks = allTasks?.filter((task) => {
    const titleMatch = task.title.toLowerCase().includes(search.toLowerCase());
    const descMatch = task.description
      .toLowerCase()
      .includes(search.toLowerCase());
    const searchMatch = titleMatch || descMatch;

    const statusMatch = status ? task.status === status : true;
    const priorityMatch = priority ? task.priority === priority : true;
    const dueDateMatch = dueDate
      ? task.dueDate.split("T")[0] === dueDate
      : true;

    return searchMatch && statusMatch && priorityMatch && dueDateMatch;
  });

  useEffect(() => {
    if (createdTasks && assignedTasks) {
      setAllTasks([...createdTasks, ...assignedTasks]);
    }
  }, [createdTasks, assignedTasks]);


  useEffect(() => {
    getAllTasks()
    getCurrentUser();
  }, []);

  return (
    <div className="w-full relative">
      <div className="w-full p-5 grid grid-cols-2 md:grid-cols-4 gap-2.5">
        <>
          <div
            className="px-5 py-4 rounded-lg bg-white/20  flex flex-col gap-2.5 items-center justify-center cursor-pointer transition transform active:scale-90"
            onClick={() => setOpenForm(true)}
            title="Create task"
          >
            <span>
              <RiAddLargeLine size={35} />
            </span>
            <span>Create Task</span>
          </div>
          {openForm && (
            <Wrapper>
              <TaskForm />
            </Wrapper>
          )}
        </>
        <div className="px-5 py-4 rounded-lg bg-white/20  flex flex-col gap-2.5 ">
          <span className="text-3xl font-semibold">
            {[...createdTasks, ...assignedTasks]?.length}
          </span>
          <span>Total Tasks</span>
        </div>
        <div className="px-5 py-4 rounded-lg bg-white/20  flex flex-col gap-2.5 ">
          <span className="text-3xl font-semibold">
            {createdTasks && createdTasks.length}
          </span>
          <span>Total Created Task</span>
        </div>
        <div className="px-5 py-4 rounded-lg bg-white/20  flex flex-col gap-2.5 ">
          <span className="text-3xl font-semibold">
            {assignedTasks && assignedTasks.length}
          </span>
          <span>Total Assigned Task</span>
        </div>
      </div>
      <div className="my-5 px-5">
        <div className="flex flex-wrap gap-4 mb-3">
          <input
            type="text"
            placeholder="Search Title / Description"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white/10 text-white placeholder:text-white/50 border-none"
          />

          <label htmlFor="date" className="relative flex flex-col gap-1.5 ">
            <span className="sm:hidden absolute top-1.5 left-2">
              Select Date
            </span>
            <input
              type="date"
              id="date"
              
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white/10 text-white"
            />
          </label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white/10"
          >
            <option value="" className="text-black">
              All Status
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

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white/10"
          >
            <option value="" className="text-black">
              All Priority
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
          <span
            className="px-3 py-2 rounded-lg bg-red-900 cursor-pointer transition transform active:scale-90"
            onClick={() => {
              setStatus("");
              setSearch("");
              setPriority("");
              setDueDate("");
            }}
          >
            Clear Filter
          </span>
        </div>
      </div>
      <div className="my-8 px-5 w-full">
        <h1 className="text-xl mb-3">All Tasks</h1>
        {laoding && filteredTasks.length === 0 && allTasks.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 />
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center gap-y-5 gap-x-2.5">
            {filteredTasks && filteredTasks?.length > 0 ? (
              filteredTasks?.map((task) => (
                <TaskCard key={task?._id} task={task} />
              ))
            ) : (
              <p className="text-white text-xl text-center w-full">
                No tasks found.
              </p>
            )}
          </div>
        )}
      </div>
      <div className="absolute top-0 left-5/12 ">
        <Notify/>
      </div>
    </div>
  );
};

export default App;
