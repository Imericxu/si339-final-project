"use client";
import { FormEvent, ReactElement, useState } from "react";
import { db } from "@/lib/dexie";
import IconArrowUp from "@/components/icons/IconArrowUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import ReactDatePicker from "react-datepicker";
import IconX from "@/components/icons/IconX";

export interface NewTaskModalProps {
  onClose: () => void;
}

export default function NewTaskModal({
  onClose,
}: NewTaskModalProps): ReactElement {
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState<Date | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Set time to 11:59:59 PM
    let adjustedDueDate = newTaskDueDate;
    if (adjustedDueDate) {
      adjustedDueDate = new Date(adjustedDueDate);
      adjustedDueDate.setHours(23, 59, 59, 999);
    }
    await db.addTask(newTaskName, adjustedDueDate);
    // Reset form
    setNewTaskName("");
    setNewTaskDueDate(null);
    // Close modal
    onClose();
  }

  return (
    // Overlay
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-40"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      {/* Modal */}
      <div
        className="fixed bottom-0 z-50 flex w-full flex-col bg-white p-3 pb-5 pt-5 text-black shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <form className="flex flex-col gap-3" onSubmit={onSubmit}>
          {/* Wrapper for first row */}
          <div className="flex gap-2">
            {/* Decorative circle */}
            <div className="mr-1 h-6 w-6 rounded-full border-2 border-gray-300"></div>
            {/* Input */}
            <input
              type="text"
              className="flex-grow focus:outline-none"
              placeholder="New task"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              autoFocus
            />
            {/* Add button (up arrow) */}
            <button
              className={`inline-flex h-6 w-6 items-center justify-center rounded-md ${
                newTaskName
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-500"
              }`}
              disabled={!newTaskName}
              aria-label="Add task"
            >
              <IconArrowUp className="h-4 w-4 stroke-2" />
            </button>
          </div>
          {/* Date Picker */}
          <div className="flex w-min items-center rounded-md border p-2 text-gray-600">
            <FontAwesomeIcon className="mr-2" icon={faCalendar} />
            <ReactDatePicker
              selected={newTaskDueDate}
              placeholderText="Set due date"
              icon={<FontAwesomeIcon icon={faCalendar} />}
              onChange={setNewTaskDueDate}
              customInput={
                <input
                  type="text"
                  className="w-min flex-grow focus:outline-none"
                  placeholder="Set due date"
                />
              }
            />
            {/* Disabled if no due date */}
            <button
              className={`inline-flex h-6 w-6 items-center justify-center rounded-md ${
                newTaskDueDate ? "text-blue-600" : "text-gray-500"
              }`}
              type="button"
              onClick={() => setNewTaskDueDate(null)}
              disabled={!newTaskDueDate}
              aria-label="Clear due date"
            >
              <IconX className="h-4 w-4 stroke-2" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
