
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

