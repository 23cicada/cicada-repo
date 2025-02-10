1. Create database

```sql
CREATE DATABASE [IF NOT EXISTS] database_name
```

2. Create table

```sql
CREATE TABLE [IF NOT EXISTS] table_name (
    column_name1 data_type,
    column_name2 data_type,
)
```

3. Destroy

```sql
DELETE FROM table_name [WHERE condition]

DELETE FROM users WHERE id > 12 AND name = 'foo'
```

4. Create

```sql
INSERT INTO table_name [(column1, column2, ...)]
VALUES (value1, value2, ...), (value1, value2, ...), ...

INSERT INTO users (name, email) VALUES ('foobar','foo@bar.com');
```

5. Update

```sql
UPDATE table_name
SET column1 = value1, column2 = value2, ...
[WHERE condition]

UPDATE users
SET name='barfoo', email='bar@foo.com'
WHERE email='foo@bar.com';
```

6. Read

```sql
SELECT [DISTINCT] column1, column2, ...
FROM table_name
[WHERE condition]
[GROUP BY column_name(s)]
[HAVING condition]
[ORDER BY column_name [ASC | DESC]]
[LIMIT row_count OFFSET offset_value];
```

## JOIN

1. `INNER JOIN` / `JOIN`: Keeps only the rows from both tables where they match up.

```sql
SELECT * FROM users JOIN posts ON users.id = posts.user_id
```

3. `LEFT OUTER JOIN`
4. `RIGHT OUTER JOIN`
5. `FULL OUTER JOIN`

## Aggregate

1. COUNT
2. SUM
3. MIN
4. MAX

HAVING: Which is essentially the WHERE for aggregates.

```sql
SELECT users.id, users.name, COUNT(posts.id) AS posts_written
FROM users
JOIN posts ON users.id = posts.user_id
GROUP BY users.id, users.name
HAVING COUNT(posts.id) >= 10;
```
