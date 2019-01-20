import { Project } from './types/project'

export const data: Project = {
  id: 'sklasdfs-asdfwer-awerwerwer',
  name: 'kissa',
  objects: [
    {
      id: '1',
      kind: 'Circle',
      r: 20,
      x: 100,
      y: 100,
      children: [
        {
          id: '2',
          kind: 'Circle',
          r: 10,
          x: 100,
          y: 100
        },
        {
          id: '3',
          kind: 'Circle',
          r: 10,
          x: 200,
          y: 100
        },
        {
          id: '4',
          kind: 'Circle',
          r: 10,
          x: 100,
          y: 200
        }
      ]
    },
    {
      id: '21',
      kind: 'Circle',
      r: 20,
      x: 0,
      y: 300,
      children: [
        {
          id: '22',
          kind: 'Circle',
          r: 10,
          x: 100,
          y: 100,
          children: [
            {
              id: '222',
              kind: 'Circle',
              r: 10,
              x: 100,
              y: 100,
            },
            {
              id: '223',
              kind: 'Circle',
              r: 10,
              x: 150,
              y: 100,
            }
          ]
        },
        {
          id: '23',
          kind: 'Circle',
          r: 10,
          x: 200,
          y: 100
        },
        {
          id: '24',
          kind: 'Circle',
          r: 10,
          x: 100,
          y: 200
        }
      ]
    }
  ]
}