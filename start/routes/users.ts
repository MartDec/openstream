import Route from '@ioc:Adonis/Core/Route'

Route.get('/users', 'UsersController.listAll')
Route.put('/users/:id', 'UsersController.update')
