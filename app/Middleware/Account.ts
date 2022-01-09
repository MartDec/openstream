import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Account {
  public async handle ({ auth, request }: HttpContextContract, next: () => Promise<void>) {
    const id = Number(request.param('id'))
    await auth.use('api').authenticate()
    const loggedUser = auth.use('api').user?.toJSON()

    if (loggedUser?.id === id) {
      return await next()
    }

    throw new Exception('You can\'t access this route', 401)
  }
}
