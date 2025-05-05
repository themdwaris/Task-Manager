import React from "react";
import { RiFileEditFill } from "react-icons/ri";
import { BsTrash3Fill } from "react-icons/bs";
import { useUserTask } from "@/context/UserTaskContext";
import axios from "axios";
import toast from "react-hot-toast";
import Wrapper from "./Wrapper";
import TaskForm from "./TaskForm";

const TaskCard = ({ task }) => {
  const { user, setEdit, setTaskData, getAllTasks, openForm,setOpenForm } =
    useUserTask();
  const { title, description, dueDate, priority, status, assignedTo } = task;

  const deleteTask = async (userId) => {
    try {
      const res = await axios.delete(`/api/tasks/${userId}`);
      if (res?.data?.success) {
        toast.success(res.data.message);
        getAllTasks();
      }
    } catch (error) {
      console.log("Failed to delete::", error);
    }
  };

  return (
    <>
      <div
        className={`w-full md:max-w-[300px] p-3 rounded-lg cursor-pointer ${
          user && user?._id === task?.userId ? "bg-green-900" : "bg-red-900"
        }`}
      >
        <p className="text-base font-semibold text-ellipsis truncate">
          {title}
        </p>
        <p className="text-sm my-3">{description}</p>
        <div className="text-sm flex flex-col gap-2.5">
          <p className="font-semibold">
            <span className="text-sm font-normal">Due date:</span>&nbsp;
            {new Date(dueDate)?.toLocaleDateString()}
          </p>
          <p className="font-semibold">
            <span className="text-sm font-normal">Priority:</span>&nbsp;
            {priority}
          </p>
          <p className="font-semibold">
            <span className="text-sm font-normal">Status:</span>&nbsp;{status}
          </p>
          <p className="font-semibold">
            {user && user?._id === task?.userId
              ? `Assigned to: ${task?.userId?.name || task?.assignedTo?.name}`
              : `Assigned by: ${task?.userId?.name || task?.assignedTo?.name}`}
          </p>
        </div>
        {user && user?._id === task?.userId && (
          <div className="mt-5 w-full flex justify-end">
            <button
              className="p-2.5 rounded-lg cursor-pointer transition transform active:scale-90"
              title="Edit task"
              onClick={() => {
                const formattedDate = dueDate
                  ? new Date(dueDate).toISOString().split("T")[0]
                  : "";
                setEdit(task?._id);
                setTaskData({
                  title,
                  description,
                  dueDate: formattedDate,
                  priority,
                  status,
                  assignedTo,
                });
                setOpenForm(true);
              }}
            >
              <RiFileEditFill size={22} />
            </button>
            <button
              className="p-2.5 rounded-lg cursor-pointer transition transform active:scale-90"
              title="Delete task"
              onClick={() => deleteTask(task?._id)}
            >
              <BsTrash3Fill size={22} />
            </button>
          </div>
        )}
      </div>
      {openForm && (
        <Wrapper>
          <TaskForm />
        </Wrapper>
      )}
    </>
  );
};

export default TaskCard;
