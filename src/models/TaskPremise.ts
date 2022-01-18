export type TaskPremise = {
  id: number
  title: string
  disc_content: string
  task_id: number
  created_at: string
  updated_at: string
}

export type AddTaskPremise = {
  title: string
  disc_content: string
  task_id: number
}

export type UpdateTaskPremise = {
  id: number | string
  title: string
  disc_content: string
  task_id: number
}
