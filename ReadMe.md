### 🔰 Main Sequelize Query Methods with Examples:

***

## 1. `findAll()` – Get All Records

```js
const users = await User.findAll();
console.log(users);

```

**With conditions:**

```js
const activeUsers = await User.findAll({
  where: { status: 'active' }
});

```

***

## 2. `findOne()` – Get First Matching Record

```js
const user = await User.findOne({
  where: { email: 'test@example.com' }
});

```

***

## 3. `findByPk()` – Get Record by Primary Key

```js
const user = await User.findByPk(1);

```

***

## 4. `create()` – Insert New Record

```js
const newUser = await User.create({
  name: 'John',
  email: 'john@example.com'
});

```

***

## 5. `bulkCreate()` – Insert Multiple Records

```js
const users = await User.bulkCreate([
  { name: 'Alice' },
  { name: 'Bob' }
]);

```

***

## 6. `update()` – Update Existing Record(s)

```js
const updated = await User.update(
  { status: 'inactive' },
  { where: { id: 1 } }
);

```

***

## 7. `destroy()` – Delete Record(s)

```js
const deleted = await User.destroy({
  where: { id: 1 }
});

```

***

## 8. `count()` – Count Records

```js
const total = await User.count();

```

**With condition:**

```js
const active = await User.count({
  where: { status: 'active' }
});

```

***

## 9. `findOrCreate()` – Find or Insert If Not Exists

```js
const [user, created] = await User.findOrCreate({
  where: { email: 'jane@example.com' },
  defaults: { name: 'Jane' }
});

```

***

## 10. `upsert()` – Insert or Update

```js
await User.upsert({
  id: 1,
  name: 'Updated Name'
});

```

***

## 11. `increment()` / `decrement()` – Math Operations

```js
await Product.increment('views', { by: 1, where: { id: 2 } });

```

```js
await Product.decrement('stock', { by: 1, where: { id: 5 } });

```

***

## 12. `query()` – Raw SQL Query
```js
const [results, metadata] = await sequelize.query(
  "SELECT * FROM Users WHERE status = 'active'"
);
```

***

## 13. `findAndCountAll()` – For Pagination

Returns both rows and count.

```js
const result = await User.findAndCountAll({
  where: { status: 'active' },
  limit: 10,
  offset: 0
});

console.log(result.count); // Total matching rows
console.log(result.rows);  // Actual data

```

***

## 14. `reload()` – Refresh the Instance from DB

```js
const user = await User.findByPk(1);
await user.reload(); // Reloads latest data

```

***

## 15. `save()` – Save Changes to an Instance

```js
const user = await User.findByPk(1);
user.name = 'New Name';
await user.save();

```

***

## 16. `destroy()` on Instance

```js
const user = await User.findByPk(1);
await user.destroy(); // Delete this user

```

***

## 17. `restore()` – Restore Soft-Deleted Record (Paranoid Mode)

```js
await User.restore({ where: { id: 1 } });

```

> ⚠️ Works only if `paranoid: true` is enabled in the model.

***

## 18. `scope()` – Reuse Common Queries

### Model:

```js
User.addScope('active', {
  where: { status: 'active' }
});

```

### Usage:

```js
const users = await User.scope('active').findAll();

```

***

## 19. `include` – Eager Loading (Relationships)

Assuming `User` has many `Posts`:

```js
const users = await User.findAll({
  include: [{
    model: Post,
    where: { published: true }
  }]
});

```

***

## 20. `transaction()` – For Safe DB Operations

```js
const t = await sequelize.transaction();

try {
  await User.create({ name: 'Ram' }, { transaction: t });
  await Post.create({ title: 'Hello' }, { transaction: t });
  await t.commit();
} catch (error) {
  await t.rollback();
}

```

***

## 21. `aggregate()` – Custom Aggregations

```js
const totalSalary = await Employee.aggregate('salary', 'sum', {
  where: { department: 'IT' }
});

```

***

## 22. `min()` / `max()` – Get Min or Max Value

```js
const minSalary = await Employee.min('salary');
const maxSalary = await Employee.max('salary');

```

***

## 23. `findAll({ group })` – Group By

```js
const data = await Order.findAll({
  attributes: ['status', [Sequelize.fn('COUNT', 'status'), 'count']],
  group: 'status'
});

```

***

## 24. `findAll({ order })` – Sorting

```js
const posts = await Post.findAll({
  order: [['createdAt', 'DESC']]
});

```

***

## 25. `destroy({ truncate: true })` – Clear Table

```js
await User.destroy({ truncate: true });

```
***

## SQL data types
List of **SQL data types** (especially used in RAW SQL queries) with **definitions** and **examples**, categorized into **string**, **numeric**, **date/time**, and **others**. This is essential when designing tables manually with raw SQL.

---

## 🔤 1. **String/Text Data Types**

| Data Type    | Description                                  | Example                                  |
| ------------ | -------------------------------------------- | ---------------------------------------- |
| `VARCHAR(n)` | Variable-length string, up to `n` characters | `name VARCHAR(100)`                      |
| `CHAR(n)`    | Fixed-length string, always `n` characters   | `code CHAR(5)`                           |
| `TEXT`       | Long text data (up to \~65,535 characters)   | `description TEXT`                       |
| `TINYTEXT`   | Very short text (max 255 characters)         | `summary TINYTEXT`                       |
| `MEDIUMTEXT` | Medium text (up to \~16 million characters)  | `body MEDIUMTEXT`                        |
| `LONGTEXT`   | Very large text (up to \~4GB)                | `content LONGTEXT`                       |
| `ENUM(...)`  | Restricts values to predefined list          | `role ENUM('admin', 'user', 'guest')`    |
| `SET(...)`   | Allows multiple values from predefined list  | `hobbies SET('music','sports','travel')` |

---

## 🔢 2. **Numeric Data Types**

| Data Type                        | Description                                   | Example                       |
| -------------------------------- | --------------------------------------------- | ----------------------------- |
| `INT` or `INTEGER`               | Integer, usually 4 bytes                      | `id INT PRIMARY KEY`          |
| `TINYINT`                        | Very small integer (1 byte, -128 to 127)      | `is_active TINYINT DEFAULT 1` |
| `SMALLINT`                       | Small integer (2 bytes)                       | `year SMALLINT`               |
| `MEDIUMINT`                      | Medium integer (3 bytes)                      | `quantity MEDIUMINT`          |
| `BIGINT`                         | Large integer (8 bytes)                       | `population BIGINT`           |
| `DECIMAL(m,d)` or `NUMERIC(m,d)` | Exact number with `m` digits and `d` decimals | `price DECIMAL(10,2)`         |
| `FLOAT`                          | Approximate floating-point number             | `weight FLOAT`                |
| `DOUBLE`                         | Double-precision float                        | `rating DOUBLE`               |
| `BOOLEAN` or `BOOL`              | 0 = false, 1 = true                           | `is_verified BOOLEAN`         |

---

## 🕓 3. **Date and Time Data Types**

| Data Type   | Description                                | Example                                          |
| ----------- | ------------------------------------------ | ------------------------------------------------ |
| `DATE`      | Date only (`YYYY-MM-DD`)                   | `birth_date DATE`                                |
| `TIME`      | Time only (`HH:MM:SS`)                     | `login_time TIME`                                |
| `DATETIME`  | Full date and time (`YYYY-MM-DD HH:MM:SS`) | `created_at DATETIME`                            |
| `TIMESTAMP` | Auto-updated date-time (timezone-aware)    | `updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP` |
| `YEAR`      | Year only (`YYYY`)                         | `published_year YEAR`                            |

---

## 🧊 4. **Binary / Miscellaneous Types**

| Data Type                              | Description                         | Example                |
| -------------------------------------- | ----------------------------------- | ---------------------- |
| `BINARY(n)`                            | Fixed-length binary data            | `hash BINARY(32)`      |
| `VARBINARY(n)`                         | Variable-length binary data         | `file VARBINARY(255)`  |
| `BLOB`                                 | Binary Large Object (images, files) | `profile_picture BLOB` |
| `TINYBLOB` / `MEDIUMBLOB` / `LONGBLOB` | Binary versions of `TEXT` sizes     | `video MEDIUMBLOB`     |

---

## 🛠 Extra Examples in Table Creation

```sql
CREATE TABLE employees (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  gender ENUM('male', 'female', 'other') NOT NULL,
  age TINYINT UNSIGNED,
  salary DECIMAL(10, 2),
  is_active BOOLEAN DEFAULT 1,
  joined_at DATE,
  profile_picture BLOB
);
```

---

### 🔐 Some Additional Constraints

| Constraint       | Use                     | Example                               |
| ---------------- | ----------------------- | ------------------------------------- |
| `NOT NULL`       | Prevents null values    | `name VARCHAR(100) NOT NULL`          |
| `DEFAULT`        | Sets default value      | `status VARCHAR(10) DEFAULT 'active'` |
| `AUTO_INCREMENT` | Auto-increases number   | `id INT AUTO_INCREMENT PRIMARY KEY`   |
| `UNIQUE`         | Ensures value is unique | `email VARCHAR(255) UNIQUE`           |

---
