## SELECT

```sql
SELECT [DISTINCT] column1, column2, ...
FROM table_name
[WHERE condition]
[GROUP BY column_name]
[HAVING condition]
[ORDER BY column_name [ASC | DESC]]
[LIMIT row_count OFFSET offset_value];
```

**WHERE condition**

```sql
column_name operator value
column_name [NOT] BETWEEN value1 AND value2
column_name [NOT] IN (value1, value2, value3, ...)
column_name LIKE 'pattern%'     -- 以 pattern 开头
column_name LIKE '%pattern'     -- 以 pattern 结尾
column_name LIKE '%pattern%'    -- 包含 pattern
column_name LIKE '_pattern_'    -- "_" 代表单个字符
column_name IS [NOT] NULL
column_name operator (SELECT statement)
condition1 [AND | OR] condition2
NOT condition
```

Operator: `!=`, `>`, `>=`, `<`, `<=`, `LIKE`, ...

**JOIN**

```sql
[INNER] JOIN another_table  ON mytable.id = another_table.matching_id

[LEFT | RIGHT | FULL] JOIN another_table ON mytable.id = another_table.matching_id
```

**Aggregate**

COUNT(column): Count the number of rows in the group with non-NULL values in the specified column.

COUNT(\*): Number of rows.

SUM(column) / AVG(column) / MIN(column) / MAX(column)

> GROUP BY:
> The GROUP BY clause works by grouping rows that have the same value in the column specified.
>
> Use aggregate functions with the GROUP BY clause.

> HAVING:
> HAVING 子句专门与 GROUP BY 子句一起使用，使我们能够对分组后的结果集进行筛选。
>
> Which is essentially the WHERE for aggregates.

**Case**

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

**SUBSTR**

```sql
SUBSTRING(string, start_position, length)

SELECT *
FROM robots
WHERE substr(location, -2) LIKE 'NY'
```

**COALESCE**

返回参数列表中第一个非 NULL 的值。

```sql
COALESCE(value1, value2, ..., valueN)

SELECT name, COALESCE(tank, gun, sword) AS weapon FROM fighters;
```

## Query order of execution

1. FROM and JOINs
2. WHERE
3. GROUP BY
4. HAVING
5. SELECT
6. DISTINCT
7. ORDER BY
8. LIMIT / OFFSET

## INSERT INTO

```sql
INSERT INTO table_name (column1, column2, ...)
VALUES (value1, value2, ...);
```

## UPDATE

```sql
UPDATE table_name
SET column1 = value1, column2 = value2
[WHERE condition];
```

## DELETE

```sql
DELETE FROM table_name [WHERE condition];
```

## CREATE TABLE

```sql
CREATE TABLE table_name (
    column_name data_type [NOT NULL] [DEFAULT default_value] [AUTO_INCREMENT] [PRIMARY KEY],
    column_name data_type [NOT NULL] [DEFAULT default_value],
    ...
    [PRIMARY KEY (column_name)],
    [UNIQUE (column_name)],
    [FOREIGN KEY (column_name) REFERENCES other_table(other_column)]
);
```

## DROP

```sql
DROP TABLE table_name;

DROP DATABASE database_name;
```
