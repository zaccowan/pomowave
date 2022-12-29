import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import Task from "./Task";
import { Preahvihear } from "@next/font/google";

function Nav() {
  const [open, setOpen] = useState(false);
  const controls = useAnimationControls();

  const animation = {
    initial: {
      x: -500,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
    },
  };

  useEffect(() => {
    if (open === true) {
      controls.start(animation.visible);
    }
    if (open === false) {
      controls.start(animation.initial);
    }
  }, [open, controls, animation.visible, animation.initial]);

  //Task State
  const [tasks, setTasks] = useState([{ title: "Finish Pomowave" }]);

  const [doAddTask, setDoAddTask] = useState(false);
  const taskRef = useRef<HTMLInputElement | null>(null);

  function removeTask(index: number) {
    tasks.splice(index, 1);
  }
  function addTask(title: string) {
    setDoAddTask(!true);

    tasks.push({ title });
  }

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
      <div
        onClick={() => setOpen(!open)}
        className=" pointer-events-auto absolute right-5 top-5  p-4 rounded-full bg-transparent hover:bg-black cursor-pointer transition-all duration-300 group hover:scale-110"
      >
        <Bars3Icon
          height={40}
          width={40}
          className="text-black
        group-hover:text-white transition-all duration-300"
        />
      </div>

      <motion.div
        className="pointer-event-auto -z-10 bg-black/30 backdrop-blur-lg rounded-br-2xl text-white flex flex-col items-center justify-center gap-4 w-48 px-6 py-4"
        initial={animation.initial}
        animate={controls}
        transition={{ duration: 0.25 }}
      >
        <>
          <h1 className="text-3xl font-bold ">Tasks</h1>
          <div
            onClick={() => setDoAddTask(!doAddTask)}
            className="pointer-events-auto cursor-pointer px-4 py-2 bg-blue-400 hover:bg-blue-500 rounded-xl w-full text-center font-semibold select-none"
          >
            Add Task
          </div>
          {doAddTask && (
            <form
              onSubmit={() => {
                if (taskRef.current?.value !== undefined) {
                  addTask(taskRef.current?.value);
                }
              }}
            >
              <input
                ref={taskRef}
                type=""
                className="pointer pointer-events-auto text-black"
              />
            </form>
          )}
          {tasks.map((task, index) => {
            return (
              <Task
                onClick={() => removeTask(index)}
                key={index}
                taskTitle={task.title}
              />
            );
          })}
        </>
      </motion.div>
    </div>
  );
}

export default Nav;
