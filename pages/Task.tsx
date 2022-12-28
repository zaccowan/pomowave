import React from "react";

function Task({
  taskTitle,
  onClick,
}: {
  taskTitle: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="transition duration-300 ease-in-out w-full text-center font-semibold px-2 py-2 border-4 border-white hover:border-red-500 rounded-xl hover:bg-red-500 cursor-pointer"
    >
      {taskTitle}
    </div>
  );
}

export default Task;
