-- Remplissage de la table 'service'
INSERT INTO service (nom, description, form) VALUES
    ('Informatique', 'description du service informatique','[{"content":[{"content":[{"name":"address","title":"address.title","type":"text","placeholder":"Enter your address","reg_error":[{"regex":".+","message":"Address is required"}]}]},{"online":true,"content":[{"name":"postal_code","title":"*Postal Code*","type":"text","placeholder":"Enter your postal code","reg_error":[{"regex":"^[0-9]{5}$","message":"Enter a valid postal code (5 digits)"}]},{"name":"kind","title":"*Address Type*","type":"dropdown","choices":["Home","Work"]}]},{"content":[{"name":"instruction","title":"*Delivery Instructions*","type":"longtext","placeholder":"*Any special instructions?*","sclass":"instruction-field"}]}]}]'),
    ('Ressources Humaines', 'description du service RH','[]'),
    ('Marketing', 'description du service marketing','[]'),
    ('Finance', 'description du service finance','[]'),
    ('Support Client', 'description du service support client','[]');


INSERT INTO address (address, postal_code, instruction, kind, city) VALUES
   ('303 Avenue des Champs-Élysées', '75008', 'Au 5ème étage', 'Bureau', 'PARIS'),
   ('404 Rue Saint-Honoré', '75001', 'Au fond du couloir', 'Magasin', 'PARIS'),
   ('505 Place de la Concorde', '75008', 'Entrée côté jardin', 'Domicile', 'PARIS'),
   ('606 Quai de la Seine', '75019', 'Porte bleue, deuxième étage', 'Entrepôt', 'PARIS'),
   ('707 Rue du Faubourg Saint-Antoine', '75011', 'Au rez-de-chaussée', 'Magasin', 'PARIS');

-- Remplissage de la table 'sector'
INSERT INTO sector (nom, address_id) VALUES
    ('Technologie', 1),
    ('Commerce',2),
    ('Éducation',3),
    ('Santé',4),
    ('Transport',5);

-- Remplissage de la table 'address'
INSERT INTO address (address, postal_code, instruction, kind, city, sector_id) VALUES
    ('123 Rue Principale', '75001', 'A côté du parc', 'Bureau','PARIS', 1),
    ('456 Avenue de la République', '75002', 'Deuxième étage', 'Domicile','PARIS', 2),
    ('789 Boulevard Voltaire', '75003', 'En face du supermarché', 'Magasin', 'PARIS', 3),
    ('101 Rue de Paris', '75004', 'Près de la station de métro', 'Entrepôt', 'PARIS', 4),
    ('202 Rue du Louvre', '75005', 'À côté du musée', 'Bureau', 'PARIS', 5);

-- Remplissage de la table 'users'
INSERT INTO users (prenom, nom, mail, num, status, mdp, address_id) VALUES
    ('rh', 'user', 'rh@user.com', '0583363945', 3, '5d2217b2d33df736cdc3258b1d3b7120958504f7da6437d18cd12c321376df28',  6),
    ('admin', 'user', 'admin@user.com', '0583363945', 4, '5d2217b2d33df736cdc3258b1d3b7120958504f7da6437d18cd12c321376df28', 7),
    ('visitor', 'user', 'visitor@user.com', '0583363945', 1, '5d2217b2d33df736cdc3258b1d3b7120958504f7da6437d18cd12c321376df28', 8),
    ('banned', 'user', 'banned@user.com', '0583363945', 0, '5d2217b2d33df736cdc3258b1d3b7120958504f7da6437d18cd12c321376df28', 9),
    ('Eve', 'Moreau', 'eve.moreau@example.com', '0583363945', 1, '5d2217b2d33df736cdc3258b1d3b7120958504f7da6437d18cd12c321376df28', 10);

-- Remplissage de la table 'product'
INSERT INTO product (code_barre, name, marque, user_id, expiration_date) VALUES
    ('1234567890123', 'Ordinateur Portable', 'Dell', 1, '2024-09-05'),
    ('2345678901234', 'Téléphone Mobile', 'Samsung', 2,'2024-09-05'),
    ('3456789012345', 'Imprimante', 'HP', 3, '2024-09-05'),
    ('4567890123456', 'Clavier', 'Logitech', 4,'2024-09-05'),
    ('5678901234567', 'Souris', 'Microsoft', 5, '2024-09-05');

-- Remplissage de la table 'message'
INSERT INTO message (text, date_send, sender_id, receiver_id) VALUES
    ('Bonjour, comment ça va ?', '2024-08-01 09:15:00', 1, 2),
    ('Merci pour votre aide.', '2024-08-02 14:30:00', 2, 3),
    ('La réunion est à 10h.', '2024-08-03 10:00:00', 3, 4),
    ('Je vous enverrai les documents.', '2024-08-04 16:45:00', 4, 5),
    ('Pouvez-vous confirmer la réception ?', '2024-08-05 11:20:00', 5, 1);

-- Remplissage de la table 'distribute'
INSERT INTO distribute (user_id, sector_id) VALUES
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

INSERT INTO harvest (schedule, sector_id) VALUES
    ('2024-09-10 09:15:00',  1),
    ('2024-09-10 09:16:00',  2);