import Route from '@ioc:Adonis/Core/Route'

Route.post('/songs', 'SongsController.createSong').middleware('auth')
