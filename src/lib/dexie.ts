import Dexie from "dexie";

export interface Task {
  id?: number;
  name: string;
  createdDate: Date;
  dueDate: Date | null;
  // 1 == true. number so it's indexed
  completed: number;
  completedDate: Date | null;
}

export class TaskDatabase extends Dexie {
  tasks!: Dexie.Table<Task, number>;

  constructor() {
    super("TaskDatabase");
    this.version(1).stores({
      tasks: "++id,due_date,completed",
    });
    this.tasks = this.table("tasks");
  }

  /**
   * Adds a task to the to-do list
   *
   * @returns the id of the new task, or null if there was an error
   */
  async addTask(name: string, dueDate: Date | null): Promise<number | null> {
    try {
      return await db.tasks.add({
        name,
        createdDate: new Date(),
        dueDate,
        completed: 0,
        completedDate: null,
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  /**
   * Toggles a task's completion status
   *
   * @returns true if the task was toggled, false if there was an error
   */
  async toggleTask(id: number): Promise<boolean> {
    try {
      const task = await db.tasks.get(id);
      if (task) {
        await db.tasks.update(id, {
          completed: task.completed ? 0 : 1,
          completedDate: task.completed ? null : new Date(),
        });
      }
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  /**
   * Renames a task
   *
   * @returns true if the task was renamed, false if there was an error
   */
  async renameTask(id: number, name: string): Promise<boolean> {
    try {
      await db.tasks.update(id, { name });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  /**
   * Deletes a task from the to-do list
   *
   * @returns true if the task was deleted, false if there was an error
   */
  async deleteTask(id: number): Promise<boolean> {
    try {
      await db.tasks.delete(id);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}

export const db = new TaskDatabase();
