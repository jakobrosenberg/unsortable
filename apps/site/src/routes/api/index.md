<!-- routify:meta order=false -->

<div class="prose">
<br/>

🧪 API Reference
----------------

### `new Unsortable(options?)`

Creates an instance of Unsortable.

**Options:**

- `autoAttach` (boolean, default: `true`) --- whether to auto-attach the instance to the manager

- `managerOptions` --- passed to the internal `DragDropManager`

- `manager` --- optional external `DragDropManager` instance to use

* * * * *

### `unsortable.addDraggable(element, options)`

Marks an element as draggable.

**Parameters:**

- `element`: `HTMLElement`

- `options.item`: an item or item accessor (`T | () => T`)

- `options.type` (optional): type string for drag classification

- `options.accept` (optional): accepted drop types

- `options.draggableOptions` and `droppableOptions`: override `dnd-kit` behavior

* * * * *

### `unsortable.addDroppable(element, options)`

Marks an element as a sortable container.

**Parameters:**

- `element`: `HTMLElement`

- `options.items`: an array, accessor, or `{ <code>get</code>, <code>set</code> }` object

- `options.setItems`: optional setter if not included in items

- `options.accept`: accepted types

- `options.droppableOptions`: additional droppable config

* * * * *

### `unsortable.addHandle(element)`

Associates a specific element as a drag handle for the nearest draggable container.

**Notes:** Called in a `requestAnimationFrame` to ensure parent elements are mounted.

* * * * *

### `unsortable.attach()`

Manually binds internal event listeners to the manager (auto-called by default).

* * * * *

### `unsortable.destroy()`

Destroys the drag manager and all listeners.

* * * * *

### 🔄 Internals

- Events: `dragover` is used to determine if an item should be moved or sorted.

- Lists are compared via identity; nested movement is supported.

- Elements are tracked using `WeakMap`s for automatic cleanup.

* * * * *
</div>