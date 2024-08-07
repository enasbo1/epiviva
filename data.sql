-- Remplissage de la table 'service'
INSERT INTO service (nom) VALUES
    ('Informatique'),
    ('Ressources Humaines'),
    ('Marketing'),
    ('Finance'),
    ('Support Client');

-- Remplissage de la table 'secteur'
INSERT INTO secteur (nom) VALUES
    ('Technologie'),
    ('Commerce'),
    ('Éducation'),
    ('Santé'),
    ('Transport');

-- Remplissage de la table 'address'
INSERT INTO address (address, postal_code, instruction, kind, id_secteur) VALUES
    ('123 Rue Principale', '75001', 'A côté du parc', 'Bureau', 1),
    ('456 Avenue de la République', '75002', 'Deuxième étage', 'Domicile', 2),
    ('789 Boulevard Voltaire', '75003', 'En face du supermarché', 'Magasin', 3),
    ('101 Rue de Paris', '75004', 'Près de la station de métro', 'Entrepôt', 4),
    ('202 Rue du Louvre', '75005', 'À côté du musée', 'Bureau', 5);

-- Remplissage de la table 'product'
INSERT INTO product (code_barre, name, marque, id_address) VALUES
    ('1234567890123', 'Ordinateur Portable', 'Dell', 1),
    ('2345678901234', 'Téléphone Mobile', 'Samsung', 2),
    ('3456789012345', 'Imprimante', 'HP', 3),
    ('4567890123456', 'Clavier', 'Logitech', 4),
    ('5678901234567', 'Souris', 'Microsoft', 5);

-- Remplissage de la table 'users'
INSERT INTO users (prenom, nom, mail, status, mdp, id_service, id_secteur, id_address) VALUES
    ('Alice', 'Dupont', 'alice.dupont@example.com', 1, '5d2217b2d33df736cdc3258b1d3b7120958504f7da6437d18cd12c321376df28', 1, 1, 1),
    ('Bob', 'Martin', 'bob.martin@example.com', 1, '5d2217b2d33df736cdc3258b1d3b7120958504f7da6437d18cd12c321376df28', 2, 2, 2),
    ('Charlie', 'Durand', 'charlie.durand@example.com', 1, '5d2217b2d33df736cdc3258b1d3b7120958504f7da6437d18cd12c321376df28', 3, 3, 3),
    ('David', 'Lefevre', 'david.lefevre@example.com', 1, '5d2217b2d33df736cdc3258b1d3b7120958504f7da6437d18cd12c321376df28', 4, 4, 4),
    ('Eve', 'Moreau', 'eve.moreau@example.com', 1, '5d2217b2d33df736cdc3258b1d3b7120958504f7da6437d18cd12c321376df28', 5, 5, 5);

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
