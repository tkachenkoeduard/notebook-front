export type TypeUser = {
  created_at: string
  email: string
  id: number
  remember_me_token: string
  updated_at: string
}

export type TypeToken = {
  type: string,
  token: string,
}

export type TypeLoginResponse = {
  user: TypeUser,
  token: TypeToken
}