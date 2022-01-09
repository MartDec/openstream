import Route from '@ioc:Adonis/Core/Route'

Route.post('/register', 'SessionController.register')
Route.post('/login', 'SessionController.login')
