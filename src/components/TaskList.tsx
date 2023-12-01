"use client";
import { ReactElement, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/dexie";
import TaskListItem from "@/components/TaskListItem";
import IconChevronRight from "@/components/icons/IconChevronRight";

export default function TaskList(): ReactElement {
  // incompleteTasks is a live query
  // Sort by due date, then by creation date
  // If no due date, sort to bottom
  const incompleteTasks = useLiveQuery(async () => {
    try {
      const tasks = await db.tasks
        .where("completed")
        .equals(0)
        .sortBy("dueDate");
      console.log(tasks);
      return tasks.sort((a, b) => {
        if (a.dueDate && b.dueDate) {
          return a.dueDate.getTime() - b.dueDate.getTime();
        } else if (a.dueDate) {
          return -1;
        } else if (b.dueDate) {
          return 1;
        } else {
          return a.createdDate.getTime() - b.createdDate.getTime();
        }
      });
    } catch (err) {
      console.error(err);
      return [];
    }
  });
  const completedTasks = useLiveQuery(async () => {
    const tasks = await db.tasks.where("completed").equals(1).sortBy("dueDate");
    // Sort by completed date desc
    // If task is completed, there must be a completed date
    return tasks.sort(
      (a, b) => b.completedDate!.getTime() - a.completedDate!.getTime(),
    );
  });
  const [completedTasksOpen, setCompletedTasksOpen] = useState(true);

  return (
    <>
      {/* Wrapper for to-do list */}
      <div className="ml-1.5 mr-1.5 flex-grow">
        {!incompleteTasks && <p className="ml-2 mr-2">Loading...</p>}

        {incompleteTasks && incompleteTasks.length === 0 && (
          <p className="ml-2 mr-2">Nice work! You have no tasks left to do.</p>
        )}

        {/* Incomplete tasks list */}
        <ul className="space-y-0.5">
          {/* Incomplete task items */}
          {incompleteTasks?.map((task) => (
            <TaskListItem key={task.id} task={task} />
          ))}
        </ul>

        {/* Completed tasks accordion */}
        {completedTasks && completedTasks.length > 0 && (
          // Wrapper for accordion
          <div className="flex flex-col">
            {/* Button to toggle accordion */}
            <button
              className="flex items-center justify-start rounded-md p-2"
              onClick={() => setCompletedTasksOpen(!completedTasksOpen)}
              aria-label={`${
                completedTasksOpen ? "Hide" : "Show"
              } completed tasks`}
            >
              <IconChevronRight
                className={`me-2 h-4 w-4 transform stroke-2 transition-transform ${
                  completedTasksOpen ? "rotate-90" : ""
                }`}
              />
              <span className="me-2">Completed</span>
              <span className="text-sm font-semibold">
                {completedTasks.length}
              </span>
            </button>

            {/* Completed tasks list */}
            {completedTasksOpen && (
              <ul className="space-y-0.5">
                {completedTasks.map((task) => (
                  <TaskListItem key={task.id} task={task} />
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </>
  );
}
