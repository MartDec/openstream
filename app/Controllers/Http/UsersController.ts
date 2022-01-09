import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'

export default class UsersController {
  public async listAll ({ request }: HttpContextContract) {
    try {
      const { page, limit } = request.params()
      const users = await Database
        .from('users')
        .select('id', 'username', 'email', 'created_at', 'updated_at')
        .paginate(page, limit)

      return users.toJSON()
    } catch (error) {
      throw new Exception(error.message)
    }
  }

  public async update ({ request }: HttpContextContract) {
    const userId = request.param('id')
    const { email, password, username } = request.all()
    try {
      const user = await User.findOrFail(userId)
      await user
        .merge({ email, password, username })
        .save()

      return user.toJSON()
    } catch (error) {
      throw new Exception(error.message)
    }
  }
}
