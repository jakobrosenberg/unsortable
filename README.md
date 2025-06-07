
# 📦 Unsortable

### Headless drag-and-drop sorting with full state control.

Unsortable enables nested drag-and-drop reordering without reordering the DOM. Built for reactive frameworks like Svelte, Vue and React. Powered by `dnd-kit`.

---

## 🔧 Installation
```bash
pnpm add unsortable
```

## 🚀 Getting Started

```javascript
import { Unsortable } from 'unsortable'
import { items, setItems } from './my-items.js'

const { addDraggable, addDroppable } = new Unsortable()

addDroppable(containerElement, { items, setItems })
addDraggable(draggableElement, { item })
```


## Examples

Need help wiring up `items` and `setItems` in your framework?

Check out these example projects:

- [Svelte](https://github.com/jakobrosenberg/unsortable/blob/main/examples/svelte/src/App.svelte)

- [React](https://github.com/jakobrosenberg/unsortable/blob/main/examples/react/src/main.jsx)

- [Vue](https://github.com/jakobrosenberg/unsortable/blob/main/examples/vue/src/App.vue)

Each demo shows how to manage state and bind it to Unsortable.

#### To run an example locally

```bash
git clone https://github.com/jakobrosenberg/unsortable.git
cd unsortable/examples/<svelte|react|vue>
pnpm install
pnpm run dev
```


## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/jakobrosenberg"><img src="https://avatars.githubusercontent.com/u/4153004?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jakob Rosenberg</b></sub></a><br /><a href="#infra-jakobrosenberg" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/jakobrosenberg/unsortable/commits?author=jakobrosenberg" title="Code">💻</a> <a href="https://github.com/jakobrosenberg/unsortable/commits?author=jakobrosenberg" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!