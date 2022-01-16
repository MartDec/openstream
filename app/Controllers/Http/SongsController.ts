import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'
import { Exception } from '@adonisjs/core/build/standalone'
import Application from '@ioc:Adonis/Core/Application'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Song from 'App/Models/Song'

export default class SongsController {
  public async createSong ({ request }: HttpContextContract) {
    const { title } = request.all()
    const songFile = request.file('song')
    const thumbnailFile = request.file('thumbnail')

    if (!songFile) {
      throw new Exception('Missing song file to upload', 400)
    }

    const songPath = await this.uploadFile(songFile, 'song')
    const song = new Song()
    song.title = title
    song.path = songPath
    if (thumbnailFile) {
      const thumbnailPath = await this.uploadFile(thumbnailFile, 'thumbnail')
      song.thumbnail = thumbnailPath
    }

    await song.save()
    return song.toJSON()
  }

  private async uploadFile (file: MultipartFileContract, type: string): Promise<string> {
    this.updateFileName(file)
    file.move(Application.publicPath(type))

    return `${type}/${file.clientName}`
  }

  private updateFileName (file: MultipartFileContract): void {
    const fileName = Math.random().toString(16).substr(2, 16)
    file.clientName = `${fileName}.${file.extname}`
  }
}
