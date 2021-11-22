export interface MessageBaseDto {
  event: string
  from_user_id: string
  to_user_id?: string
  client_key?: string
  content: { challenge: number }
}