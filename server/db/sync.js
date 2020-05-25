const { sync, User, TodoList } = require('./index');

console.log('init db...');

sync()
.then(() => {
  return seeds();
})
.then(() => {
  console.log('db inited.');
  process.exit();
});

function seeds() {
  const users = [
    { id: 1, name: 'admin', password: '123456' },
    { id: 2, name: 'aaa', password: '123456' },
    { id: 3, name: 'bbb', password: '123456' },
    { id: 4, name: 'ccc', password: '123456' }
  ];

  const todoLists = [
    { id: 1, text: 'HTML', user_id: 1, status: 0 },
    { id: 2, text: 'Javascript', user_id: 2, status: 0 },
    { id: 3, text: 'CSS', user_id: 2, status: 1 },
    { id: 4, text: 'Node', user_id: 2, status: 0 },
    { id: 5, text: 'Ruby', user_id: 3, status: 1 },
    { id: 6, text: 'Java', user_id: 3, status: 1 },
    { id: 7, text: 'Python', user_id: 3, status: 0 },
    { id: 8, text: 'Vue', user_id: 4, status: 0 }
  ];

  return Promise.all([ 
    User.bulkCreate(users),
    TodoList.bulkCreate(todoLists)
  ]);
}