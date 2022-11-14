import postgres from '@infra/db/postgres'

export default async () => {
  await postgres.none(`create table if not exists aboutPages (
    id varchar(100) NOT NULL UNIQUE PRIMARY KEY, 
    title varchar(100) NOT NULL, 
    description text NOT NULL, 
    user_id varchar(100) NOT NULL UNIQUE
    )`)

  return postgres
}
