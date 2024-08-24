
CREATE TABLE service (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50),
    form TEXT,
    description VARCHAR(512),
    active BOOLEAN DEFAULT TRUE
);

CREATE TABLE sector (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50),
    active BOOLEAN default true
);

CREATE TABLE address (
    id SERIAL PRIMARY KEY,
    address VARCHAR(255),
    postal_code VARCHAR(10),
    city VARCHAR(64),
    instruction TEXT,
    kind VARCHAR(50),
    sector_id INTEGER REFERENCES sector(id)
);

CREATE TABLE benefit (
    id SERIAL PRIMARY KEY,
    people INT NOT NULL,
    diet TEXT,
    caf VARCHAR(255) NOT NULL,
    validated VARCHAR(8) DEFAULT 'wait',
    sector_id integer references sector(id)
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    prenom VARCHAR(25),
    nom VARCHAR(100),
    mail VARCHAR(100) UNIQUE NOT NULL,
    status SMALLINT,
    num VARCHAR(11),
    mdp VARCHAR(255),
    benefit_id INTEGER REFERENCES benefit(id),
    address_id INTEGER REFERENCES address(id)
);

CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    code_barre VARCHAR(24),
    name VARCHAR(128),
    marque VARCHAR(50),
    refused boolean default false,
    expiration_date TIMESTAMP NOT NULL,
    user_id INTEGER REFERENCES users(id)
);

CREATE TABLE distribute (
    user_id INTEGER REFERENCES users(id),
    sector_id INTEGER REFERENCES sector(id),
    PRIMARY KEY (user_id, sector_id)
);

CREATE TABLE candidate(
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  service_id INTEGER REFERENCES service(id),
  answer TEXT,
  validated VARCHAR(8) default 'wait',
  creation_date TIMESTAMP not null,
  validation_date TIMESTAMP,
  last_edited TIMESTAMP not null
);

CREATE TABLE message (
    id SERIAL PRIMARY KEY,
    text VARCHAR(255),
    date_send timestamp,
    sender_id INTEGER not null REFERENCES users(id),
    receiver_id INTEGER REFERENCES users(id),
    candidate_id integer references candidate(id),
    benefit_id integer references benefit(id),
    read boolean default false,
    link varchar(255)
);

ALTER table sector add column address_id INTEGER REFERENCES address(id);