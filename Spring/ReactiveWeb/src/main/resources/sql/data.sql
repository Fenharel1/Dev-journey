DROP TABLE IF EXISTS CUSTOMER;

CREATE TABLE CUSTOMER (
    id int AUTO_INCREMENT primary key,
    name varchar(100),
    email varchar(100)
);

insert into CUSTOMER(name, email) values
    ('Jose','jose@gmail.com'),
    ('Maria','maria@gmail.com'),
    ('Juan','juan@gmail.com'),
    ('Joe','joe@gmail.com'),
    ('Pepe','pepe@gmail.com');
