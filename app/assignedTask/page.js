'use client'
import React from "react";
import TaskCard from "@/components/TaskCard";
import { useUserTask } from "@/context/UserTaskContext";
import Loader2 from "@/components/Loader2";

const AssignedTaskList = () => {
  const {assignedTasks,loading } = useUserTask();
  // console.log(assignedTasks);
  
  return (
    <div className="my-8 px-5 w-full">
      <h1 className="text-xl mb-3">Tasks assigned to you</h1>
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <Loader2 />
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center gap-y-5 gap-x-2.5">
          {assignedTasks &&
            assignedTasks?.length > 0 &&
            assignedTasks?.map((task) => <TaskCard key={task?._id} task={task}  />)}
        </div>
      )}
    </div>
  );
};

export default AssignedTaskList;
