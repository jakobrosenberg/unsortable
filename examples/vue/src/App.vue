<script setup>
import { ref, onMounted } from 'vue'
import { Unsortable } from 'unsortable/vue'

const items = ref([{ name: 'Item 1' }, { name: 'Item 2' }, { name: 'Item 3' }, { name: 'Item 4' }, { name: 'Item 5' }])

const container = ref(null)
const itemRefs = []

const setItemRef = (el) => {
  if (el) itemRefs.push(el)
}

onMounted(() => {
  const { addDraggable, addDroppable } = new Unsortable()

  addDroppable(container.value, { items: items.value })

  itemRefs.forEach((el, i) => {
    addDraggable(el, { item: items.value[i] })
  })
})
</script>

<template>
  <div class="wrapper">
    <p class="description">Vertical list using Vue + Unsortable</p>
    <div class="list" ref="container">
      <div
        v-for="(item, idx) in items"
        :key="item.name"
        class="card"
        :ref="(el) => (itemRefs[idx] = el)"
        style="transition: transform 150ms"
      >
        <h2>{{ item.name }}</h2>
      </div>
    </div>
  </div>
</template>
