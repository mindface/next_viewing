import { type } from 'os'

export type StructuralPattern = {
  id: number
  title: string
  disc_content: string
  user_name: string
  structural: string
  structuralArry?: []
  pattern: string
  task_id: number
  category_id: string
  category_group_id: string
  created_at: string
  updated_at: string
}

export type StructuralItem = {
  id: number
  selectId: string
  content: string
}

export type AddStructuralPattern = {
  id?: number | string
  title: string
  disc_content: string
  user_name?: string
  structural: string
  pattern: string
  task_id: number
  category_id?: string
  category_group_id?: string
}

export type UpdateStructuralPattern = {
  id: number | string
  title: string
  disc_content: string
  user_name: string
  structural: string
  pattern: string
  task_id: number
  category_id?: string
  category_group_id?: string
}
