import './style.css'
import View from './view'
import Controller from './controller'

document.addEventListener('DOMContentLoaded', () => {
  let controller 
  
  // Pasamos un objeto con todos los "handlers" del controlador a la vista
  const view = new View({
    onSubmit: (data) => controller.handleSubmit(data),
    onReset: () => controller.handleReset(),
    onEditClick: (id) => controller.handleEditClick(id),
    onDeleteClick: (id, moduleName) => controller.handleDeleteClick(id, moduleName),
    onAddToCartClick: (id) => controller.handleAddToCartClick(id),
    onHashChange: (hash) => controller.handleRoute(hash)
  })

  controller = new Controller(view)
  controller.init()
})