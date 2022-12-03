import pkg from 'pg';
const { Pool } = pkg;
const pool = new Pool({
    user: "admin",
    password: "aICCD1jWLeSCZZo4PxhovGrJTWxdRRAq",
    host: "dpg-cdog3dta499b1lleofu0-a.frankfurt-postgres.render.com",
    port: 5432,
    database: "messenger",
    ssl: true
});

export default pool;