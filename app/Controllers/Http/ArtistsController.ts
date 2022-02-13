import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { uploadFile } from 'App/Helpers'
import Artist from 'App/Models/Artist'

export default class ArtistsController {
  public async createArtist ({ request }: HttpContextContract) {
    const { name } = request.all()
    const thumbnail = request.file('thumbnail')
    const artist = new Artist()
    artist.name = name

    if (thumbnail) {
      const thumbnailPath = await uploadFile(thumbnail, 'thumbnail')
      artist.thumbnail = thumbnailPath
    }

    await artist.save()
    return artist.toJSON()
  }

  public async listArtists ({ request }: HttpContextContract) {
    const { page, limit } = request.params()
    const artistsPagination = await Artist.paginate(page, limit)
    const artists = artistsPagination.toJSON()

    if (artists.data.length < 1) {
      throw new Exception('No artists found', 404)
    }

    return artists
  }

  public async findArtist ({ request }: HttpContextContract) {
    const id = request.param('id')
    const artist = await Artist.find(id)

    if (!artist) {
      throw new Exception('Artist not found', 404)
    }

    return artist
  }
}
