-- Remplissage de la table 'service'
INSERT INTO service (nom, description, form) VALUES
    ('Informatique', 'description du service informatique','[{"content":[{"content":[{"name":"address","title":"address.title","type":"text","placeholder":"Enter your address","reg_error":[{"regex":".+","message":"Address is required"}]}]},{"online":true,"content":[{"name":"postal_code","title":"*Postal Code*","type":"text","placeholder":"Enter your postal code","reg_error":[{"regex":"^[0-9]{5}$","message":"Enter a valid postal code (5 digits)"}]},{"name":"kind","title":"*Address Type*","type":"dropdown","choices":["Home","Work"]}]},{"content":[{"name":"instruction","title":"*Delivery Instructions*","type":"longtext","placeholder":"*Any special instructions?*","sclass":"instruction-field"}]}]}]'),
    ('Ressources Humaines', 'description du service RH','[]'),
    ('Marketing', 'description du service marketing','[]'),
    ('Finance', 'description du service finance','[]'),
    ('Support Client', 'description du service support client','[]');

-- Remplissage de la table 'secteur'
INSERT INTO secteur (nom) VALUES
    ('Technologie'),
    ('Commerce'),
    ('Éducation'),
    ('Santé'),
    ('Transport');

-- Remplissage de la table 'address'
INSERT INTO address (address, postal_code, instruction, kind, secteur_id) VALUES
    ('123 Rue Principale', '75001', 'A côté du parc', 'Bureau', 1),
    ('456 Avenue de la République', '75002', 'Deuxième étage', 'Domicile', 2),
    ('789 Boulevard Voltaire', '75003', 'En face du supermarché', 'Magasin', 3),
    ('101 Rue de Paris', '75004', 'Près de la station de métro', 'Entrepôt', 4),
    ('202 Rue du Louvre', '75005', 'À côté du musée', 'Bureau', 5);

-- Remplissage de la table 'product'
INSERT INTO product (code_barre, name, marque, address_id) VALUES
    ('1234567890123', 'Ordinateur Portable', 'Dell', 1),
    ('2345678901234', 'Téléphone Mobile', 'Samsung', 2),
    ('3456789012345', 'Imprimante', 'HP', 3),
    ('4567890123456', 'Clavier', 'Logitech', 4),
    ('5678901234567', 'Souris', 'Microsoft', 5);

-- Remplissage de la table 'users'
INSERT INTO users (prenom, nom, mail, num, status, mdp, address_id) VALUES
    ('system', 'system', 'system@system.com', '0583363945', 5, '5d2217b2d33df736cdc3258b1d3bEF46µ7120958504f7da6437dzdzav153MLf18cd12c321376df28', null),
    ('rh', 'user', 'rh@user.com', '0583363945', 3, '5d2217b2d33df736cdc3258b1d3b7120958504f7da6437d18cd12c321376df28',  1),
    ('admin', 'user', 'admin@user.com', '0583363945', 4, '5d2217b2d33df736cdc3258b1d3b7120958504f7da6437d18cd12c321376df28', 2),
    ('visitor', 'user', 'visitor@user.com', '0583363945', 1, '5d2217b2d33df736cdc3258b1d3b7120958504f7da6437d18cd12c321376df28', 3),
    ('banned', 'user', 'banned@user.com', '0583363945', 0, '5d2217b2d33df736cdc3258b1d3b7120958504f7da6437d18cd12c321376df28', 4),
    ('Eve', 'Moreau', 'eve.moreau@example.com', '0583363945', 1, '5d2217b2d33df736cdc3258b1d3b7120958504f7da6437d18cd12c321376df28', 5);

-- Remplissage de la table 'message'
INSERT INTO message (text, date_send, sender_id, receiver_id) VALUES
    ('Bonjour, comment ça va ?', '2024-08-01 09:15:00', 1, 2),
    ('Merci pour votre aide.', '2024-08-02 14:30:00', 2, 3),
    ('La réunion est à 10h.', '2024-08-03 10:00:00', 3, 4),
    ('Je vous enverrai les documents.', '2024-08-04 16:45:00', 4, 5),
    ('Pouvez-vous confirmer la réception ?', '2024-08-05 11:20:00', 5, 1);

-- Remplissage de la table 'distribute'
INSERT INTO distribute (user_id, secteur_id) VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5);

INSERT INTO candidate (user_id, service_id, creation_date, last_edited) VALUES
    (1, 1, now(), now()),
    (2, 2, now(), now()),
    (3, 3, now(), now()),
    (4, 4, now(), now()),
    (5, 5, now(), now());
