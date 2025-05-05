'use client'
import React from "react";
import TaskCard from "@/components/TaskCard";
import { useUserTask } from "@/context/UserTaskContext";
import Loader from "@/components/Loader";
import Loader2 from "@/components/Loader2";

const CreatedTaskList = () => {
  const {createdTasks,loading } = useUserTask();
  
  return (
    <div className="my-8 px-5 w-full">
      <h1 className="text-xl mb-3">Your created tasks</h1>
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <Loader2/>
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center gap-y-5 gap-x-2.5">
          {createdTasks &&
            createdTasks?.length > 0 &&
            createdTasks?.map((task) => <TaskCard key={task?._id} task={task} />)}
        </div>
      )}
    </div>
  );
};

export default CreatedTaskList;
