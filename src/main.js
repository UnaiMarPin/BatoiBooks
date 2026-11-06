import './style.css'
import View from './view'
import Controller from './controller'

document.addEventListener('DOMContentLoaded', () => {
  let controller // Lo declaramos antes para poder usarlo en la vista
  
  const view = new View(
    (data) => controller.handleSubmit(data),
    (id) => controller.handleRemove(id)
  )

  controller = new Controller(view)
  controller.init()
})