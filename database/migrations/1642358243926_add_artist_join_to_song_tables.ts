import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddArtistJoinToSongTables extends BaseSchema {
  protected tableName = 'songs'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer('artist_id')
        .unsigned()
        .references('artists.id')
        .onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('artist_id')
    })
  }
}
