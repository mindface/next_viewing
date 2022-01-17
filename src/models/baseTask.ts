
export type BaseTask = {
 id: string | number;
 title: string;
 disc_content: string;
 user_name: string;
 play_item: number;
 clear_item: number;
 created_at: string;
 updated_at: string;
}

export type AddBaseTask = {
 title: string;
 disc_content: string;
 user_name: string;
 play_item: number | string;
 clear_item: number | string;
}
