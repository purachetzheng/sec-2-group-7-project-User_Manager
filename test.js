// const obj = {
//     name: 'name',
//     email: 'email'
// }
// console.log(obj.name.index);
const arr = [
  {
    id: 1,
    name: 'test1',
    email: 't1@t1.t',
    date: '10/10/2020',
    tableId: 1,
  },
  {
    id: 2,
    name: 'test2',
    email: 't2@t2.t',
    date: '10/10/2020',
    tableId: 2,
  },
  {
    name: 'dasdadad',
    email: '',
    date: '11/11/2020',
    tableId: 1,
    id: 3,
  },
  {
    name: 'dadad',
    email: '',
    date: '11/11/2020',
    tableId: 1,
    id: 4,
  },
  {
    name: 'dawda',
    email: '',
    date: '11/11/2020',
    tableId: 1,
    id: 5,
  },
  {
    name: 'cdvfvsv cs',
    email: '',
    date: '11/11/2020',
    tableId: 1,
    id: 6,
  },
]
// console.log(arr)
arr.sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase()? 1:-1)
console.log(arr)

        