import type { KanbanTask } from "@/types/kanban";
import type { DragEndEvent } from "@dnd-kit/core";

export const getStatusFromColumnId = (columnId: string): string => {
  const statusMap: Record<string, string> = {
    "column-new": "new",
    "column-todo": "todo",
    "column-ongoing": "ongoing",
    "column-review": "review",
    "column-completed": "completed",
  };
  return statusMap[columnId] || columnId;
};

export const getColumnIdFromStatus = (status: string): string => {
  const columnMap: Record<string, string> = {
    new: "column-new",
    todo: "column-todo",
    ongoing: "column-ongoing",
    review: "column-review",
    completed: "column-completed",
  };
  return columnMap[status] || status;
};

export const handleDragEnd = (
  event: DragEndEvent,
  tasks: KanbanTask[],
  setTasks: (tasks: KanbanTask[]) => void
) => {
  const { active, over } = event;

  if (!over) return;

  // Extract the task ID and destination column ID
  const taskId = active.id.toString();
  const destinationColumnId = over.id.toString();

  // Find the task that was dragged
  const draggedTask = tasks.find((task) => task.id === taskId);
  if (!draggedTask) return;

  // Get the current status of the task
  const currentStatus = draggedTask.status;
  const currentColumnId = getColumnIdFromStatus(currentStatus);

  // If the task was dropped in the same column, do nothing
  if (destinationColumnId === currentColumnId) return;

  // Create a new array without the dragged task
  const newTasks = tasks.filter((task) => task.id !== taskId);

  // Create a copy of the dragged task with the updated status
  const updatedTask = {
    ...draggedTask,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    status: getStatusFromColumnId(destinationColumnId) as any,
  };

  // Add the updated task to the new tasks array
  newTasks.push(updatedTask);

  // Update the state with the new tasks array
  setTasks(newTasks);
};
