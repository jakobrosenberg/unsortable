import { TriplitClient, Schema as S, or } from '@triplit/client'
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
  { id: 'todo-3', id_group: 'group-2', title: 'Todo 3', order: 2 },
  { id: 'todo-4', id_group: 'group-2', title: 'Todo 4', order: 3 },
  { id: 'todo-5', id_group: 'group-2', title: 'Todo 5', order: 4 },
]

const client = new TriplitClient({ schema, storage: { type: 'indexeddb', name: 'unsortable' } })

groups.forEach((group) => client.insert('groups', group))
todos.forEach((todo) => client.insert('todos', todo))

const query = client.query
export { client, useQuery, query }
