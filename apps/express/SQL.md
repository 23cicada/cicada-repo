## CREATE DATABASE

```sql
CREATE DATABASE [IF NOT EXISTS] database_name
```

## CREATE TABLE

```sql
CREATE TABLE [IF NOT EXISTS] table_name (
    column_name1 data_type,
    column_name2 data_type,
)
```

## DELETE

```sql
DELETE FROM table_name [WHERE condition]
```

## INSERT INTO

```sql
INSERT INTO table_name [(column1, column2, ...)]
VALUES (value1, value2, ...), (value1, value2, ...), ...

INSERT INTO users (name, email) VALUES ('foobar','foo@bar.com');
```

## UPDATE

```sql
UPDATE table_name
SET column1 = value1, column2 = value2, ...
[WHERE condition]

UPDATE users
SET name='barfoo', email='bar@foo.com'
WHERE email='foo@bar.com';
```

## SELECT

```sql
SELECT [DISTINCT] column1, column2, ...
FROM table_name
[WHERE condition]
[GROUP BY column_name(s)]
[HAVING condition]
[ORDER BY column_name [ASC | DESC]]
[LIMIT row_count OFFSET offset_value];
```

GROUP BY: Use aggregate functions with the GROUP BY clause.

WHERE condition

```sql
column_name operator value
column_name BETWEEN value1 AND value2
column_name IN (value1, value2, ...)
column_name LIKE pattern
column_name IS NULL | IS NOT NULL
column_name operator (SELECT statement)
EXISTS (SELECT statement)
condition1 [AND | OR] condition2
NOT condition
```

Case

```sql
CASE
    WHEN condition1 THEN result1
    WHEN condition2 THEN result2
    ...
    [ELSE resultN]
END

CASE column_name
    WHEN value1 THEN result1
    WHEN value2 THEN result2
    ...
    [ELSE resultN]
END

SELECT *,
CASE WHEN species = 'human' THEN 2 ELSE 4 END AS num_legs
FROM friends_of_pickles;

SELECT *,
  CASE species
    WHEN 'human' THEN 'talk'
    WHEN 'dog' THEN 'bark'
    WHEN 'cat' THEN 'meow'
    END AS sound
FROM friends_of_pickles;
```

SUBSTR

```sql
SUBSTRING(string, start_position, length)

SELECT *
FROM robots
WHERE substr(location, -2) LIKE 'NY'
```

COALESCE

返回参数列表中第一个非 NULL 的值。

```sql
COALESCE(value1, value2, ..., valueN)

SELECT name, COALESCE(tank, gun, sword) AS weapon FROM fighters;
```

Like

```sql
'%text%'   -- 包含 "text"
'text%'    -- 以 "text" 开头
'%text'    -- 以 "text" 结尾
'_text_'   -- "_" 代表单个字符
'%te_t%'   -- "_" 代表单个字符，"te_t" 之间任意字符匹配
```

Nested queries

```sql
select * from family_members where num_books_read = (select max(num_books_read) from family_members)
```

Date

```sql
select * from celebs_born where birthdate > '1980-09-01'
```

## JOIN

1. `INNER JOIN` / `JOIN`: Keeps only the rows from both tables where they match up.

```sql
SELECT * FROM users JOIN posts ON users.id = posts.user_id
```

3. `LEFT OUTER JOIN`
4. `RIGHT OUTER JOIN`
5. `FULL OUTER JOIN`
6. Self joins

## Aggregate

1. COUNT

   COUNT(\*): Number of rows

2. SUM

   SUM(column_name): Sum of a given value.

3. AVG

   AVG(column_name): Average of a given value.

4. MIN
5. MAX

HAVING: Which is essentially the WHERE for aggregates.

```sql
SELECT users.id, users.name, COUNT(posts.id) AS posts_written
FROM users
JOIN posts ON users.id = posts.user_id
GROUP BY users.id, users.name
HAVING COUNT(posts.id) >= 10;
```
