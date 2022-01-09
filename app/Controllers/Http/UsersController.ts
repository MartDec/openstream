import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
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
