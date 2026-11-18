import './style.css'
import View from './view'
import Controller from './controller'

document.addEventListener('DOMContentLoaded', () => {
  let controller 
  
   const view = new View({
    onSubmit: (data) => controller.handleSubmit(data),
    onReset: () => controller.handleReset(),
    onEditClick: (id) => controller.handleEditClick(id),
    onDeleteClick: (id, moduleName) => controller.handleDeleteClick(id, moduleName),
    onAddToCartClick: (id) => controller.handleAddToCartClick(id),
    onHashChange: (hash) => controller.handleRoute(hash),
    onModuleChange: (moduleCode) => controller.handleModuleChange(moduleCode) // <--- AÑADIDO
  })

  controller = new Controller(view)
  controller.init()
})