import sqlite3 from "sqlite3";
import { open } from "sqlite";

async function getUnlikedPages() {
  const db = await open({
    filename: ":memory:",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE pages (
      page_id INTEGER PRIMARY KEY,
      page_name TEXT
    );

    CREATE TABLE page_likes (
      user_id INTEGER,
      page_id INTEGER,
      liked_date DATETIME
    );

    INSERT INTO pages (page_id, page_name) VALUES
      (20001, 'SQL Solutions'),
      (20045, 'Brain Exercises'),
      (20701, 'Tips for Data Analysts');

    INSERT INTO page_likes (user_id, page_id, liked_date) VALUES
      (111, 20001, '2022-04-08 00:00:00'),
      (121, 20045, '03/12/2022 00:00:00'),
      (156, 20001, '07/25/2022 00:00:00');
    `);

  const result = await db.all(`
        SELECT p.page_id
        FROM pages p
        LEFT JOIN page_likes pl ON p.page_id = pl.page_id
        WHERE pl.page_id IS NULL
        ORDER BY p.page_id ASC;
    `);

  await db.close();

  return result.map((row) => row.page_id);
}

getUnlikedPages()
  .then((pageIds) => {
    console.log(`Pages with zero likes: ${pageIds.join(", ")}`);
  })
  .catch((err) => {
    console.log(`Error fetching pages with zero likes: ${err}`);
  });
