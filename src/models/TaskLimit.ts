
export type TaskLimit = {
 id: string | number;
 title: string;
 disc_content: string;
 start_time: string;
 end_time: string;
 task_id: number;
 created_at: string;
 updated_at: string;
}

export type AddTaskLimit = {
 title: string;
 disc_content: string;
 start_time: string;
 end_time: string;
 task_id: number;
}

export type UpdateTaskLimit = {
 id: number | string;
 title: string;
 disc_content: string;
 task_id: number;
}
