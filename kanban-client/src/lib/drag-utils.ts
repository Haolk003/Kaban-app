import type { KanbanTask,KabanList } from "@/types/kanban";
import type { DragEndEvent } from "@dnd-kit/core";

export const getStatusFromColumnId = (columnId: string) => {
  // Kiểm tra nếu columnId đã là một list ID
  if (columnId.startsWith("list-")) {
    return columnId.replace("list-", "");
  }
}


  export const getColumnIdFromStatus = (listId: string) => {
    // Nếu listId đã là string ID, thêm prefix
    if (listId && !listId.startsWith("column-") && !listId.startsWith("list-")) {
      return `list-${listId}`;
    }
  }


export const handleDragEnd = (
  event: DragEndEvent,
  tasks: KanbanTask[],
  setTasks: (tasks: KanbanTask[]) => void,
  setLists: (list: KabanList[]) => void,
  lists:KabanList[]
) => {
  const { active, over } = event;

  if (!over) return;

  // Extract the task ID and destination column ID
  const taskId = active.id.toString();
  const destinationColumnId = over.id.toString();
  console.log(destinationColumnId)

  // Find the task that was dragged
  const draggedTask = tasks.find((task) => task.id === taskId);
  if (!draggedTask) return;

  // Get the current status of the task
  const currentListId = draggedTask.listId  ;





  // If the task was dropped in the same column, do nothing
  if (destinationColumnId === currentListId) return;

  // Create a new array without the dragged task
  const newTasks = tasks.filter((task) => task.id !== taskId);

  // Create a copy of the dragged task with the updated status
  const updatedTask = {
    ...draggedTask,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    listId: destinationColumnId as any ,
  };
  const currentList=lists.map((list)=>{
    if(list.id===currentListId){

      return {...list,tasks:list.tasks.filter((task)=> task.id!==taskId )}
    }
    else if(list.id===destinationColumnId){
      return {...list,tasks:[...list.tasks,updatedTask]}
    }
    else{
      return list
    }
  })
  // Add the updated task to the new tasks array
  newTasks.push(updatedTask);

  // Update the state with the new tasks array
  setTasks(newTasks);

  setLists(currentList)
}
