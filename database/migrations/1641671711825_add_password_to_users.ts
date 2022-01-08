import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddPasswordToUsers extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('password', 255)
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('password')
    })
  }
}
