import Route from '@ioc:Adonis/Core/Route'

Route.post('/songs', 'SongsController.createSong').middleware('auth')
Route.get('/songs', 'SongsController.listSongs').middleware('auth')
Route.get('/songs/:id', 'SongsController.findSong').middleware('auth')
