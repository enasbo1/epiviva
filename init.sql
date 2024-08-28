
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

CREATE TABLE harvest(
    id serial primary key,
    schedule timestamp,
    sector_id integer references sector(id)
);

CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    code_barre VARCHAR(24),
    name VARCHAR(128),
    marque VARCHAR(50),
    refused boolean default false,
    expiration_date TIMESTAMP NOT NULL,
    user_id INTEGER REFERENCES users(id),
    harvest_id INTEGER REFERENCES harvest(id)
);

CREATE TABLE distribute (
    id serial PRIMARY KEY ,
    user_id INTEGER REFERENCES users(id),
    sector_id INTEGER REFERENCES sector(id)
);

CREATE TABLE candidate(
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  service_id INTEGER REFERENCES service(id),
  answer TEXT default '[]',
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

INSERT INTO users (prenom, nom, mail, num, status, mdp) VALUES
    ('system', 'system', 'system@system.com', '0583363945', 5, '5d2217b2d33df736cdc3258b1d3bEF46µ7120958504f7da6437dzdzav153MLf18cd12c321376df28');

INSERT INTO service (nom, description, form) VALUES
    ('Distribution',
     'La mission consiste à distribuer les produit offert à l''association aux différentes personnes soutenues alimentairement de votre secteur',
     '[{"content":[{"content":[{"type":"num","name":"0","title":"lundi","placeholder":"*0*","default":"1","choices":[""],"step":1,"_value":"1"},{"type":"num","name":"1","title":"mardi","placeholder":"*0*","default":"1","choices":[""],"step":1,"_value":"1"},{"type":"num","name":"2","title":"mercredi","placeholder":"*0*","default":"1","choices":[""],"step":1,"_value":"1"},{"type":"num","name":"3","title":"jeudi","placeholder":"*0*","default":"1","choices":[""],"step":1,"_value":"1"},{"type":"num","name":"4","title":"vendredi","placeholder":"*0*","default":"1","choices":[""],"step":1,"_value":"1"},{"type":"num","name":"5","title":"samedi","placeholder":"*0*","default":"1","choices":[""],"step":1,"_value":"1"},{"type":"num","name":"6","title":"dimanche","placeholder":"*0*","default":"1","choices":[""],"step":1,"_value":"1"}],"title":"*disponibilités*"}]}]'
    );