import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Song from 'App/Models/Song'
import { uploadFile } from 'App/Helpers'
import Artist from 'App/Models/Artist'

export default class SongsController {
  public async createSong ({ request }: HttpContextContract) {
    const { title, artistId } = request.all()
    const songFile = request.file('song')
    const thumbnailFile = request.file('thumbnail')
    const artist = await Artist.find(artistId)

    if (!songFile) {
      throw new Exception('Missing song file to upload', 400)
    }

    if (!artist) {
      throw new Exception('Missing artist to link song', 400)
    }

    const songPath = await uploadFile(songFile, 'song')
    const song = new Song()
    song.title = title
    song.path = songPath
    song.artistId = artistId
    if (thumbnailFile) {
      const thumbnailPath = await uploadFile(thumbnailFile, 'thumbnail')
      song.thumbnail = thumbnailPath
    }

    await song.save()
    return song.toJSON()
  }

  public async listSongs ({ request }: HttpContextContract) {
    const { page, limit } = request.params()
    const songsPagination = await Song.paginate(page, limit)
    const songs = songsPagination.toJSON()

    if (songs.data.length < 1) {
      throw new Exception('No songs found', 404)
    }

    return songs
  }

  public async findSong ({ request }: HttpContextContract) {
    const id = request.param('id')
    const song = await Song.find(id)
    if (!song) {
      throw new Exception('Song not found', 404)
    }

    return song.toJSON()
  }
}
