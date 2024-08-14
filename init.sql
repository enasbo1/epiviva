
CREATE TABLE service (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50),
    form TEXT,
    description VARCHAR(512)
);

CREATE TABLE secteur (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50)
);

CREATE TABLE address (
    id SERIAL PRIMARY KEY,
    address VARCHAR(255),
    postal_code VARCHAR(10),
    instruction TEXT,
    kind VARCHAR(50),
    id_secteur INTEGER REFERENCES secteur(id)
);

CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    code_barre VARCHAR(24),
    name VARCHAR(128),
    marque VARCHAR(50),
    id_address INTEGER REFERENCES address(id)
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    prenom VARCHAR(25),
    nom VARCHAR(100),
    mail VARCHAR(100) UNIQUE NOT NULL,
    status SMALLINT,
    num VARCHAR(11),
    mdp VARCHAR(255),
    id_secteur INTEGER REFERENCES secteur(id),
    id_address INTEGER REFERENCES address(id)
);

-- Création de la table 'message'
CREATE TABLE message (
    id SERIAL PRIMARY KEY,
    text VARCHAR(255),
    date_send timestamp,
    sender_id INTEGER REFERENCES users(id),
    receiver_id INTEGER REFERENCES users(id)
);

CREATE TABLE distribute (
    user_id INTEGER REFERENCES users(id),
    secteur_id INTEGER REFERENCES secteur(id),
    PRIMARY KEY (user_id, secteur_id)
);

CREATE TABLE candidate(
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  service_id INTEGER REFERENCES service(id),
  answer TEXT,
  validated BOOLEAN default false,
  creation_date TIMESTAMP not null,
  validation_date TIMESTAMP,
  last_edited TIMESTAMP not null
);