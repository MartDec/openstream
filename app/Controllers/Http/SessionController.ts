import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ForbiddenException from 'App/Exceptions/ForbiddenException'
import User from 'App/Models/User'

export default class SessionController {
  public async register ({ request } :HttpContextContract) {
    const { username, email } = request.all()
    const exists = !!(await User.findBy('email', email))

    if (exists) {
      throw new ForbiddenException(`User with email "${email}" already exists`)
    }

    const user = await User.create({ username, email })
    return user.toJSON()
  }
}
