import { hydrate } from 'svelte'
import App from './App.svelte'
import './style.css'

hydrate(App, {
    target: document.body,
})
