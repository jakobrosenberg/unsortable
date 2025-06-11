import { TriplitClient, Schema as S } from '@triplit/client'
import { useQuery } from '@triplit/svelte'

export const schema = S.Collections({
  todos: {
    schema: S.Schema({
      id: S.String(),
      id_group: S.String(),
      order: S.Number(),
      title: S.String(),
    }),
  },
  groups: {
    schema: S.Schema({
      id: S.String(),
      order: S.Number(),
      name: S.String(),
    }),
    relationships: {
      todos: S.RelationMany('todos', {
        where: [['id_group', '=', '$id']],
      }),
    },
  },
})

const groups = [
  { id: 'group-1', name: 'Group 1', order: 0 },
  { id: 'group-2', name: 'Group 2', order: 1 },
  { id: 'group-3', name: 'Group 3', order: 2 },
]

const todos = [
  { id: 'todo-1', id_group: 'group-1', title: 'Todo 1', order: 0 },
  { id: 'todo-2', id_group: 'group-1', title: 'Todo 2', order: 1 },
  { id: 'todo-3', id_group: 'group-1', title: 'Todo 3', order: 2 },
  { id: 'todo-4', id_group: 'group-1', title: 'Todo 4', order: 3 },
  { id: 'todo-5', id_group: 'group-1', title: 'Todo 5', order: 4 },
  { id: 'todo-6', id_group: 'group-2', title: 'Todo 6', order: 5 },
  { id: 'todo-7', id_group: 'group-2', title: 'Todo 7', order: 6 },
  { id: 'todo-8', id_group: 'group-2', title: 'Todo 8', order: 7 },
  { id: 'todo-9', id_group: 'group-2', title: 'Todo 9', order: 8 },
  { id: 'todo-10', id_group: 'group-2', title: 'Todo 10', order: 9 },
  { id: 'todo-11', id_group: 'group-2', title: 'Todo 11', order: 10 },
  { id: 'todo-12', id_group: 'group-2', title: 'Todo 12', order: 11 },
  { id: 'todo-13', id_group: 'group-2', title: 'Todo 13', order: 12 },
  { id: 'todo-14', id_group: 'group-2', title: 'Todo 14', order: 13 },
  { id: 'todo-15', id_group: 'group-2', title: 'Todo 15', order: 14 },
  
]

const type = import.meta.env.SSR ? 'memory' : 'indexeddb'
const client = new TriplitClient({ schema, storage: { type, name: 'unsortable' } })

groups.forEach((group) => client.insert('groups', group))
todos.forEach((todo) => client.insert('todos', todo))

const query = client.query
export { client, useQuery, query }
