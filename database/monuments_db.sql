-- ------------------------------------------------------
-- Database: monuments_db
-- ------------------------------------------------------

DROP DATABASE IF EXISTS monuments_db;
CREATE DATABASE monuments_db;
USE monuments_db;

-- ------------------------------------------------------
-- Table structure for table `monuments`
-- ------------------------------------------------------

DROP TABLE IF EXISTS monuments;

CREATE TABLE monuments (
id INT NOT NULL AUTO_INCREMENT,
monument VARCHAR(255) NOT NULL,
city VARCHAR(255) NOT NULL,
region VARCHAR(255) DEFAULT NULL,
construction_year INT DEFAULT NULL,
abstract TEXT,
image VARCHAR(255) DEFAULT NULL,
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------
-- Data for table `monuments`
-- ------------------------------------------------------

INSERT INTO monuments
(monument, city, region, construction_year, abstract, image)
VALUES
(
    'Colosseo',
    'Roma',
    'Lazio',
    80,
    'Iconico anfiteatro romano e simbolo della capitale italiana.',
    'colosseo.jpg'
),
(
    'Torre di Pisa',
    'Pisa',
    'Toscana',
    1372,
    'Celebre campanile inclinato conosciuto in tutto il mondo.',
    'torre_pisa.jpg'
),
(
    'Duomo di Milano',
    'Milano',
    'Lombardia',
    1965,
    'La più grande chiesa gotica italiana.',
    'duomo_milano.jpg'
),
(
    'Arena di Verona',
    'Verona',
    'Veneto',
    30,
    'Anfiteatro romano ancora utilizzato per concerti e opere.',
    'arena_verona.jpg'
),
(
    'Reggia di Caserta',
    'Caserta',
    'Campania',
    1845,
    'Splendida residenza reale con immensi giardini.',
    'reggia_caserta.jpg'
),
(
    'Basilica di San Marco',
    'Venezia',
    'Veneto',
    1094,
    'Capolavoro dell architettura bizantina.',
    'san_marco.jpg'
),
(
    'Valle dei Templi',
    'Agrigento',
    'Sicilia',
    430,
    'Importante complesso archeologico della Magna Grecia.',
    'valle_templi.jpg'
),
(
    'Castel del Monte',
    'Andria',
    'Puglia',
    1240,
    'Castello ottagonale voluto dall imperatore Federico II.',
    'castel_del_monte.jpg'
),
(
    'Basilica di Santa Maria del Fiore',
    'Firenze',
    'Toscana',
    1436,
    'Celebre cattedrale di Firenze, capolavoro dell architettura gotica italiana e rinascimentale.',
    'santa_maria_del_fiore.jpg'
),
(
    'Mole Antonelliana',
    'Torino',
    'Piemonte',
    1889,
    'Edificio simbolo della città di Torino.',
    'mole_antonelliana.jpg'
);

-- ------------------------------------------------------
-- Table structure for table `reviews`
-- ------------------------------------------------------

DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
    id INT NOT NULL AUTO_INCREMENT,
    monument_id INT NOT NULL,
    reviewer_name VARCHAR(255) NOT NULL,
    vote TINYINT NOT NULL,
    text TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_monument_reviews
        FOREIGN KEY (monument_id)
        REFERENCES monuments(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------
-- Data for table `reviews`
-- ------------------------------------------------------

INSERT INTO reviews
(monument_id, reviewer_name, vote, text)
VALUES
(1, 'Marco Rossi', 5, 'Monumento incredibile e ricco di storia.'),
(1, 'Giulia Bianchi', 5, 'Da visitare almeno una volta nella vita.'),

(2, 'Luca Verdi', 4, 'Molto suggestiva ma affollata.'),
(2, 'Anna Greco', 5, 'Merita pienamente la fama che ha.'),

(3, 'Davide Neri', 5, 'Architettura spettacolare.'),
(3, 'Sara Conti', 4, 'Vista panoramica magnifica dalle terrazze.'),

(4, 'Paolo Ferri', 5, 'Arena perfettamente conservata.'),
(4, 'Elena Romano', 4, 'Bellissima durante gli spettacoli serali.'),

(5, 'Francesca Villa', 5, 'Giardini stupendi e palazzo maestoso.'),
(5, 'Alessandro Ricci', 5, 'Una delle residenze reali più belle d Europa.'),

(6, 'Martina Rizzo', 5, 'Mosaici straordinari.'),
(6, 'Simone Gallo', 4, 'Molto affascinante e ben conservata.'),

(7, 'Chiara Esposito', 5, 'Patrimonio storico eccezionale.'),
(7, 'Matteo Bruno', 5, 'Templi magnificamente conservati.'),

(8, 'Laura Lombardi', 4, 'Castello unico nel suo genere.'),
(8, 'Roberto Serra', 5, 'Architettura affascinante e misteriosa.'),

(9, 'Federica Leone', 5, 'Uno dei simboli più belli di Firenze.'),
(9, 'Giorgio Russo', 5, 'La cupola è spettacolare e l architettura della basilica è davvero affascinante.'),

(10, 'Valentina Costa', 5, 'Splendido punto panoramico sulla città.'),
(10, 'Andrea Fontana', 4, 'Museo interessante e struttura iconica.');

-- ------------------------------------------------------
-- End of file
-- ------------------------------------------------------