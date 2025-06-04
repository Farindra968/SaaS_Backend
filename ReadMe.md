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