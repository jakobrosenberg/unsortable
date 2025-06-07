import React, { useState, useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { Unsortable } from 'unsortable'
import './index.css'

const App = () => {
  const initialData = [
    { name: 'Item 1' },
    { name: 'Item 2' },
    { name: 'Item 3' },
    { name: 'Item 4' },
    { name: 'Item 5' },
  ]

  const [items, setItems] = useState(initialData)
  const containerRef = useRef(null)
  const itemRefs = useRef([])

  useEffect(() => {
    const { addDraggable, addDroppable, destroy } = new Unsortable()

    addDroppable(containerRef.current, { items, setItems })

    itemRefs.current.forEach((el, i) => addDraggable(el, { item: items[i] }))
  }, [items])

  return (
    <div className="wrapper">
      <p className="description">Vertical list using React + Unsortable</p>
      <div className="list" ref={containerRef}>
        {items.map((item, idx) => (
          <div
            key={item.name}
            className="card"
            ref={(el) => (itemRefs.current[idx] = el)}
            style={{ transition: 'transform 150ms' }}
          >
            {' '}
            <h2>{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)
