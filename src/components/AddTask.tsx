"use client";
import React, { ReactElement, useState } from "react";
import IconPlus from "@/components/icons/IconPlus";
import NewTaskModal from "@/components/NewTaskModal";

export default function AddTask(): ReactElement {
  const [newTaskModalOpen, setNewTaskModalOpen] = useState(false);

  return (
    <>
      {/* Add task FAB */}
      {!newTaskModalOpen && (
        <button
          className="fixed bottom-4 right-4 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-pink-300 text-2xl text-pink-900 shadow-xl"
          onClick={() => setNewTaskModalOpen(true)}
        >
          <IconPlus />
        </button>
      )}

      {/* New task modal */}
      {newTaskModalOpen && (
        <NewTaskModal onClose={() => setNewTaskModalOpen(false)} />
      )}
    </>
  );
}
