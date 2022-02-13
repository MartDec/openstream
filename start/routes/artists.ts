import Route from '@ioc:Adonis/Core/Route'

Route.post('/artists', 'ArtistsController.createArtist').middleware('auth')
Route.get('/artists', 'ArtistsController.listArtists').middleware('auth')
Route.get('/artists/:id', 'ArtistsController.findArtist').middleware('auth')
