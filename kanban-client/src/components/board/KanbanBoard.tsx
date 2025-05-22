"use client";

import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";

import {useParams} from "next/navigation";

import { KanbanColumn } from "./KanbanColumn";
import type { KanbanTask,KabanList } from "@/types/kanban";

import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { getColumnIdFromStatus, handleDragEnd } from "@/lib/drag-utils";
import { KanbanCard } from "./KanbanCard";

import { AddMemberModal } from "./AddMemberModal";
import BoardNavbar from "./BoardNavbar";
import {Tooltip,TooltipContent,TooltipTrigger} from '../ui/tooltip';

import { useQuery } from "@apollo/client";
import { GET_BOARD_DETAIL_WITH_TASK } from "@/lib/graphql/actions/board/getBoardDetailwithTask.action";
import LoadingUI from "@/components/ui/LoadingUI";

export function KanbanBoard() {
  const {id:boardId}:{id:string}=useParams();
  const { data, loading, error,refetch } = useQuery(GET_BOARD_DETAIL_WITH_TASK, {
    variables: { id: boardId },
  });
  const [tasks, setTasks] = useState<KanbanTask[]>([]);
  const [lists,setLists]=useState<KabanList[]>([]);
  const [tags,setTags]=useState<{id:string,name:string}[]>([]);
  const [boardMembers, setBoardMembers] = useState<{user:{avatar:{url:string};id:string;name:string}}[]>([]);

  const [activeId, setActiveId] = useState<string | null>(null);



  // Configure sensors for drag detection
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Find the active task
  const activeTask = activeId
    ? tasks.find((task) => task.id === activeId)
    : null;

  useEffect(() => {
    if (data && data.getBoardDetailById && !data.getBoardDetailById.error) {
      setBoardMembers(data.getBoardDetailById.member);
    setLists(data.getBoardDetailById.lists);
      setTags(data.getBoardDetailById.labels)
      const { lists } = data.getBoardDetailById;
      const allTasks = lists.flatMap((list: { tasks: any[]; id: any; }) =>
        list.tasks.map((task: any) => ({
          ...task,
          listId: list.id

        }))
      );
    console.log(allTasks);
      setTasks(allTasks);

    }
  }, [data]);

  useEffect(() => {

    console.log(lists);
  }, [lists]);

  //TODO: add function to move task to another list
 const handleTaskMove=async (taskId:string,sourceListId:string,targetListId:string)=>{

 }
  
  if(!boardId) return <div>Error</div>
  

  return (
    <div className="flex flex-col min-h-screen">
      {boardId && <BoardNavbar boardId={boardId} />}


      <div className="flex flex-col p-6 gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Kanban Board</h1>
          <div className="flex items-center text-sm text-muted-foreground">
            <span>Task</span>
            <span className="mx-2">&gt;</span>
            <span className="font-medium text-foreground">Kanban Board</span>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {boardMembers.map((_, i) => (
                <Tooltip key={_.user.id}>
                  <TooltipTrigger>
                    <Avatar
                      key={_.user.id}
                      className="border-2 border-background"
                    >
                      <AvatarImage
                        src={
                          _.user.avatar
                            ? _.user.avatar.url
                            : "./placeholder.svg"
                        }
                        alt={`User ${i + 1} Avatar`}
                      />
                      <AvatarFallback>{_.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{_.user.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
              {/*<div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500 text-white text-xs font-medium border-2 border-background">*/}
              {/*  +8*/}
              {/*</div>*/}
            </div>
            {boardId &&  <AddMemberModal boardId={boardId} />}

          </div>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={(event) => {
            setActiveId(event.active.id.toString());
          }}
          onDragEnd={(event) => {
            setActiveId(null);
            handleDragEnd(event, tasks, setTasks,setLists,lists);
          }}
          onDragCancel={() => setActiveId(null)}
        >
          <ScrollArea className="w-full">
            <div className="flex gap-2 p-2">
              {lists.map((list) => (
                // eslint-disable-next-line react/jsx-key
                <KanbanColumn
                    tags={tags}
                    boardMembers={boardMembers}
                  key={list.id}
                  columnId={list.id }
                  count={list.tasks.length}
                  title={list.name}
                  tasks={list.tasks}
                    handleRefeshBoard={()=>refetch()}
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="h-1.5 hover:h-2" />
          </ScrollArea>
          <DragOverlay dropAnimation={null}>
            {activeTask ? <KanbanCard task={activeTask} isDragging /> : null}
          </DragOverlay>
        </DndContext>
      </div>
      {loading && <LoadingUI />}
    </div>
  );
}
