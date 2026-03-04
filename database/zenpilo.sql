create database zenpilo;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE about (
    id SERIAL PRIMARY KEY,
    idUsers INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    edad INT NOT NULL,
    CONSTRAINT fk_user
        FOREIGN KEY (idUsers)
        REFERENCES users(id)
        ON DELETE CASCADE
);
CREATE TABLE medical_information (
    id SERIAL PRIMARY KEY,
    idUser INT NOT NULL,
    doctor_nombre VARCHAR(100) NOT NULL,
    medicina VARCHAR(50) NOT NULL,
    altura DECIMAL NOT NULL,   -- altura en metros, ejemplo 1.75
    peso INT NOT NULL,              -- peso en kg
    CONSTRAINT fk_user
        FOREIGN KEY (idUser)
        REFERENCES users(id)
        ON DELETE CASCADE
);