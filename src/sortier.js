import interact from 'interactjs'
const elemMap = new WeakMap()
let draggedItem = null
let lastOptions = null

console.log('interactjs version:', interact)

export const draggable = (el, options = {}) => {
  console.log('draggable called')
  elemMap.set(el, options)

  // setTimeout(() => {
  //   options.items = options.getItems().slice(0, 2)
  //   options.setItems(options.items)
  // }, 3000)

  console.log('item', options.item)

  // setInterval(() => {
  //   console.log('check', draggedElem)
  // },1000)
  const dragged = interact(el)
    .draggable({
      listeners: {
        start(event) {
          draggedItem = options.getItem()
          lastOptions = options
          // console.log('dragged elem1', draggedElem)
          // console.log('drag start', event.target)
          el.classList.add('dragging')
        },
        move(event) {
          const { dx, dy } = event
          const target = event.target
          // target.style.transform = `translate(${dx}px, ${dy}px)`
        },
        end(event) {
          console.log('drag end', event.target)
          el.classList.remove('dragging')
          el.style.transform = ''
        },
      },
    })
    .dropzone({
      ondragenter(event) {
        const { relatedTarget, currentTarget } = event //relatedTarget is the dragged element, currentTarget is the dropzone
        // console.log('relatedTarget', relatedTarget)
        // console.log('dragged elem2', draggedElem)
        // return
        const dragged = elemMap.get(relatedTarget)
        const dropzone = elemMap.get(currentTarget)

        // console.log('DRAGGED', dragged.getItem())


        const lastItems = lastOptions.getItems()
        // const draggedItem = dragged.getItem()

        // remove from old array
        const oldIndex = lastItems.indexOf(draggedItem)
        lastOptions.setItems(lastOptions.getItems().filter((item) => item !== draggedItem))

        // add to new array
        const toItems = dropzone.getItems()
        const toItem = dropzone.getItem()
        let newIndex = toItems.indexOf(toItem)

        if(oldIndex <= newIndex) {
          newIndex += 1
        }

        dropzone.setItems([...toItems.slice(0, newIndex), draggedItem, ...toItems.slice(newIndex)])

        console.log('move from ', oldIndex, newIndex)
        // console.log('drag entered dropzone', event, dragged, dropzone)

        lastOptions = dropzone
      },
    })

  console.log('thing', dragged)
  return {
    destroy: () => {
      console.log('destroyed')
    },
  }
}

export const droppable = (el, options = {}) => {
  // elemMap.set(el, options)
  // interact(el).dropzone({
  //   ondragenter(event) {
  //     console.log('drag entered dropzone', event.relatedTarget)
  //     el.classList.add('dropzone-hover')
  //   },
  // })
  // return {
  //   destroy: () => {
  //     console.log('droppable destroyed')
  //   },
  // }
}
