import { DateTime } from 'luxon'
import {
  afterFind,
  afterSave,
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  ModelPaginatorContract,
} from '@ioc:Adonis/Lucid/Orm'
import Artist from './Artist'
import Album from './Album'

export default class Song extends BaseModel {
  public static paginate (
    page: number, limit: number
  ): Promise<ModelPaginatorContract<Song>> {
    return Song
      .query()
      .preload('artist')
      .paginate(page, limit)
  }

  @afterSave()
  @afterFind()
  public static async preloadArtist (song: Song): Promise<void> {
    await song.load('artist')
  }

  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public path: string

  @column()
  public thumbnail: string

  @column()
  public artistId: number

  @belongsTo(() => Artist)
  public artist: BelongsTo<typeof Artist>

  @belongsTo(() => Album)
  public album: BelongsTo<typeof Album>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
