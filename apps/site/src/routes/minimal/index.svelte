<script>
  import { data } from './data.js'
  import { Unsortable } from 'unsortable/svelte'

  let items = $state(data)
  const { addDraggable } = new Unsortable()
</script>

<div class="container">
  {#each items as item, index (item)}
    <div
      class="item"
      use:addDraggable={{ getItem: () => item, getItems: () => items, setItems: (_items) => (items = _items), index }}
    >
      <h2>{item.name}</h2>
    </div>
  {/each}
</div>

<pre>
  {JSON.stringify(items, null, 2)}
</pre>

<style>
  .container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .item {
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    padding: 20px;
    width: 150px;
    text-align: center;
    cursor: grab;
    /* text should not be selectable */
    user-select: none;
  }

  .children {
    background: white;
    display: flex;
    flex-direction: column;
    /* gap: 10px; */
    /* margin-top: 10px; */
    padding: 4px;
    min-height: 112px;
  }
  .child-item {
    background-color: #e0e0e0;
    border: 1px solid #bbb;
    padding: 10px;
    width: 100px;
    text-align: center;
    cursor: grab;
    user-select: none;
  }

  .item:active {
    cursor: grabbing;
  }
</style>
