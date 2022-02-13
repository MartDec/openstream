import { DateTime } from 'luxon'
import {
  afterFind,
  afterSave,
  BaseModel,
  column,
  HasMany,
  hasMany,
  ModelPaginatorContract,
  belongsTo,
  BelongsTo,
} from '@ioc:Adonis/Lucid/Orm'
import Song from './Song'

export default class Artist extends BaseModel {
  public static paginate (
    page: number, limit: number
  ): Promise<ModelPaginatorContract<Artist>> {
    return Artist
      .query()
      .paginate(page, limit)
  }

  @afterSave()
  @afterFind()
  public static async preloadSongs (artist: Artist): Promise<void> {
    await artist.load('songs')
  }

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public thumbnail: string

  @column()
  public artistId: number

  @hasMany(() => Song)
  public songs: HasMany<typeof Song>

  @belongsTo(() => Artist)
  public artist: BelongsTo<typeof Artist>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
