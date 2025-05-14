// export type KanbanStatus = "new" | "todo" | "ongoing" | "review" | "completed";

export interface KanbanTask {
  id: string;
  taskId:string;
  title: string;
  description: string;
  listId:string;
  // status: string;
  createdAt: string;
  labels: {id:string;name:string}[];
  counts:{
    likes: number;
    discussion:number;
  }
  dueDate?:string;
  assignedTo:{
    user:{
      id:string;
      name:string;
      avatar?:{
        url?:string;
      }
    }
  }[]
}

export interface KabanList{
  id:string;
  name:string;
  tasks:KanbanTask[];
}
