import Route from '@ioc:Adonis/Core/Route'

Route.get('/users', 'UsersController.listAll')
Route.get('/users/:id', 'UsersController.find')
Route.put('/users/:id', 'UsersController.update')
