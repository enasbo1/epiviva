create table "user"
(
    id      SERIAL,
    prenom  varchar(25),
    nom     varchar(100),
    mail    varchar(100),
    mdp     varchar(255)
);

create table message
(
    id serial primary key,
    date_envoie timestamp,
    texte text
);