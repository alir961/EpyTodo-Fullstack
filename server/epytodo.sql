CREATE DATABASE epytodo;

USE epytodo;

CREATE TABLE user
(
    id int NOT NULL AUTO_INCREMENT,
    email varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    firstname varchar(255) NOT NULL,
    created_at datetime NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id)
);

CREATE TABLE todo
(
    id int NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    description text NOT NULL,
    created_at datetime NOT NULL DEFAULT NOW(),
    due_time datetime NOT NULL,
    status varchar(255) NOT NULL,
    user_id int UNSIGNED NOT NULL,
    PRIMARY KEY (id)
);