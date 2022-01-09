import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'

export default class UsersController {
  public async listAll ({ request }: HttpContextContract) {
    const { page, limit } = request.params()
    const usersPagination = await Database
      .from('users')
      .select('id', 'username', 'email', 'created_at', 'updated_at')
      .paginate(page, limit)

    const users = usersPagination.toJSON()
    if (users.data.length < 1) {
      throw new Exception('No users found', 404)
    }

    return users
  }

  public async find ({ request }: HttpContextContract) {
    const id = request.param('id')
    const user = await User.find(id)
    if (!user) {
      throw new Exception('User not found', 404)
    }

    return user.toJSON()
  }

  public async update ({ request }: HttpContextContract) {
    const userId = request.param('id')
    const { email, password, username } = request.all()
    const user = await User.find(userId)
    if (!user) {
      throw new Exception('User not found', 404)
    }

    await user
      .merge({ email, password, username })
      .save()

    return user.toJSON()
  }
}
