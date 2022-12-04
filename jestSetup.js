const pgPromise = require('pg-promise')
const dotenv = require('dotenv')

const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')

module.exports = async () => {
  dotenv.config({
    path: `.env.${process.env.NODE_ENV ?? ''}`
  })

  /*
    POSTGRES SETUP
  */

  const pgp = pgPromise({})

  const postgres = pgp({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    database: process.env.POSTGRES_DB,
    idleTimeoutMillis: 100,
    noWarnings: true
  })

  // create table users if not exists
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

  // clear table users
  await postgres.none('TRUNCATE users RESTART IDENTITY')

  // create admin user with user test and password test
  await postgres.none(
    'insert into users values($1, $2, $3, $4, $5, $6, $7, $8)', [
      'testId',
      'user.name',
      'test',
      '$2a$10$WkzuGQ5/3BzgyhrkGmX87.9xhxUaQRhxCK/y9MudrPVxQyh7BKNFC',
      'user.email',
      true,
      'user.avatar_url',
      'user.avatar_alt'
    ]
  )

  /*
    SQLITE SETUP
  */
  const sqliteDb = await sqlite.open({
    filename: 'sqlite.db',
    driver: sqlite3.Database
  })

  // drop table users
  await sqliteDb.exec('drop table if exists users')

  // create table users if not exists
  await sqliteDb.exec(`create table if not exists users (
    id text NOT NULL UNIQUE PRIMARY KEY, 
    name text NOT NULL, 
    username text NOT NULL UNIQUE, 
    password text NOT NULL, 
    email text NOT NULL UNIQUE,
    is_admin boolean NOT NULL,
    avatar_url text,
    avatar_alt text
  )`)

  // create admin user with user test and password test
  await sqliteDb.run(
    `insert into users values(
      'testId',
      'user.name',
      'test',
      '$2a$10$WkzuGQ5/3BzgyhrkGmX87.9xhxUaQRhxCK/y9MudrPVxQyh7BKNFC',
      'user.email',
      true,
      'user.avatar_url',
      'user.avatar_alt'
    )`
  )

  await sqliteDb.close()
}
