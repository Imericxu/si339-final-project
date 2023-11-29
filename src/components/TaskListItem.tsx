"use client";
import { ReactElement } from "react";
import { db, Task } from "@/lib/dexie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import IconCheckmark from "@/components/icons/IconCheckmark";

export interface TaskListItemProps {
  task: Task;
}

export default function TaskListItem(props: TaskListItemProps): ReactElement {
  return (
    <li
      key={props.task.id}
      className="flex items-center rounded-md bg-neutral-50 pb-4 pl-3 pr-3 pt-4 text-black"
    >
      {/* Different buttons for completed vs incomplete */}
      {props.task.completed ? (
        <button
          className="mr-3 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white"
          onClick={() => db.toggleTask(props.task.id!)}
          aria-label="Mark task as incomplete"
        >
          <IconCheckmark className="h-4 w-4 stroke-2" />
        </button>
      ) : (
        <button
          className="mr-3 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-500"
          onClick={() => db.toggleTask(props.task.id!)}
        >
          {/* SR-only text */}
          <span className="sr-only">Mark task as complete</span>
        </button>
      )}
      {/* Task name and due date wrapper */}
      <div className="grow">
        {/* Task name */}
        <span className="block">{props.task.name}</span>
        {/* Due date */}
        {props.task.dueDate && (
          // Gray if completed. Otherwise, red if overdue and gray default
          <span
            className={`block text-sm ${
              props.task.completed
                ? "text-gray-500"
                : props.task.dueDate < new Date()
                  ? "text-red-500"
                  : "text-gray-500"
            }`}
          >
            <FontAwesomeIcon icon={faCalendar} />{" "}
            {props.task.dueDate.toLocaleDateString()}
          </span>
        )}
      </div>
    </li>
  );
}
