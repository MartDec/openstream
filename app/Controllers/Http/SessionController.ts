import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequestException from 'App/Exceptions/BadRequestException'
import ForbiddenException from 'App/Exceptions/ForbiddenException'
import User from 'App/Models/User'

export default class SessionController {
  public async register ({ auth, request } :HttpContextContract) {
    const { email, username, password } = request.all()
    if ([email, username, password].includes(undefined)) {
      throw new BadRequestException('Fields are missing')
    }

    try {
      const user = await this.createUser({ email, username, password })
      const token = await auth.attempt(email, password)

      return { ...user.toJSON(), token }
    } catch (error) {
      throw new Exception(error.message, 500)
    }
  }

  public async login ({ auth, request }: HttpContextContract) {
    const { email, password } = request.all()
    if ([email, password].includes(undefined)) {
      throw new BadRequestException('Fields are missing')
    }

    try {
      const user = await User.findByOrFail('email', email)
      const token = await auth.attempt(email, password)

      return { ...user.toJSON(), token }
    } catch (error) {
      console.log(error)
      throw new Exception(error.message)
    }
  }

  private async createUser (
    { email, username, password }: { username: string, email: string, password: string }
  ): Promise<User> {
    const exists = !!(await User.findBy('email', email))
    if (exists) {
      throw new ForbiddenException(`User with email "${email}" already exists`)
    }

    const user = await User.create({ username, email, password })
    return user
  }
}
