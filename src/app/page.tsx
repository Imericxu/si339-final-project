import React, { ReactElement } from "react";
import TaskList from "@/components/TaskList";
import AddTask from "@/components/AddTask";

export default function Home(): ReactElement {
  return (
    <>
      {/* Extra padding for FAB */}
      <main
        className="flex min-h-screen w-full flex-col bg-blue-500 pb-20 text-white"
        id="main"
      >
        <header>
          <h1 className="m-3 mt-4 text-3xl font-semibold">Tasks</h1>
        </header>

        <AddTask />

        <TaskList />
      </main>
    </>
  );
}
