const {
    SERVE_PORT,
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_NAME
} = process.env;

const quit = message => {
    console.error(message);
    process.exit(1);
};

// SERVE_PORT
if (SERVE_PORT === null || SERVE_PORT === undefined) {
    quit('Variable SERVE_PORT missing');
}

const servePort = Number(SERVE_PORT);

if (Number.isNaN(servePort)) {
    quit('Invalid variable SERVE_PORT');
}

// DB_HOST
if (DB_HOST === null || DB_HOST === undefined || DB_HOST === '') {
    quit('Invalid variable DB_HOST');
}

// DB_PORT
if (DB_PORT === null || DB_PORT === undefined) {
    quit('Variable DB_PORT missing');
}

const dbPort = Number(DB_PORT);

if (Number.isNaN(dbPort)) {
    quit('Invalid variable DB_PORT');
}

// DB_USER
if (DB_USER === null || DB_USER === undefined) {
    quit('Variable DB_USER missing');
}

// DB_PASSWORD
if (DB_PASSWORD === null || DB_PASSWORD === undefined) {
    quit('Variable DB_PASSWORD missing');
}

// DB_NAME
if (DB_NAME === null || DB_NAME === undefined) {
    quit('Variable DB_NAME missing');
}

export const env = {
    SERVE_PORT: servePort,
    DB_HOST,
    DB_PORT: dbPort,
    DB_USER,
    DB_PASSWORD,
    DB_NAME
};
