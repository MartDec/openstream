import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddAlbumJoinToSongTables extends BaseSchema {
  protected tableName = 'songs'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer('album_id')
        .unsigned()
        .references('albums.id')
        .onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('album_id')
    })
  }
}
