-- Active: 1673961752633@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE TABLE posts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT(0) NOT NULL,
    dislikes INTEGER DEFAULT(0) NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users(id)
);

CREATE TABLE likes_dislikes(
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
    FOREIGN KEY (post_id) REFERENCES posts(id)
);

DROP TABLE users;
DROP TABLE posts;
DROP TABLE likes_dislikes;
DROP TABLE followers;

INSERT INTO users(id, name, email, password, role, created_at, updated_at)
VALUES
("u001","Alexandre Machado","alexandre@email.com","123456aA@","ADMIN","2023-02-05T00:39:08.821Z","2023-02-05T00:39:08.821Z"),
("u002","Andre Ferreira","andre@email.com","123456aA@","USER","2023-02-05T00:39:08.821Z","2023-02-05T00:39:08.821Z"),
("u003","Alex Campolina","alex@email.com","123456aA@","USER","2023-02-05T00:39:08.821Z","2023-02-05T00:39:08.821Z"),
("u004","Camila Machado","camila@email.com","123456aA@","USER","2023-02-05T00:39:08.821Z","2023-02-05T00:39:08.821Z"),
("u005","Alexandre Horta","alexandreHorta@email.com","123456aA@","USER","2023-02-05T00:39:08.821Z","2023-02-05T00:39:08.821Z");

INSERT INTO posts(id,creator_id, content, created_at, updated_at)
VALUES
("p001","u001","Texto de um comentario aleatorio","2023-02-05T00:39:08.821Z","2023-02-05T00:39:08.821Z"),
("p002","u002","Texto de um comentario aleatorio 2","2023-02-05T00:39:08.821Z","2023-02-05T00:39:08.821Z"),
("p003","u001","Texto de um comentario aleatorio 3","2023-02-05T00:39:08.821Z","2023-02-05T00:39:08.821Z"),
("p004","u004","Texto de um comentario aleatorio 4","2023-02-05T00:39:08.821Z","2023-02-05T00:39:08.821Z");
INSERT INTO likes_dislikes(user_id,post_id,like)
VALUES
("u002","p001",0),
("u003","p001",0),
("u004","p001",1),
("u005","p001",0),
("u001","p002",1),
("u003","p002",1);

INSERT INTO followers(followed_id,follow_id)
VALUES
("u001","u002"),
("u001","u003"),
("u003","u002"),
("u004","u002"),
("u005","u002"),
("u002","u003"),
("u002","u004");


SELECT * FROM users;