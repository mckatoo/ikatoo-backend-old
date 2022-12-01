import postgres from '@infra/db/postgres'

export default async () => {
  await postgres.none(`create table if not exists users (
    id varchar(100) NOT NULL UNIQUE PRIMARY KEY, 
    name varchar(100) NOT NULL, 
    username varchar(100) NOT NULL UNIQUE, 
    password varchar(100) NOT NULL, 
    email varchar(100) NOT NULL UNIQUE,
    is_admin boolean NOT NULL,
    avatar_url varchar(200),
    avatar_alt varchar(200)
    )`)

  return postgres
}
