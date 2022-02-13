import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'
import Application from '@ioc:Adonis/Core/Application'

const updateFileName = (file: MultipartFileContract): void => {
  const fileName = Math.random().toString(16).substring(2, 16)
  file.clientName = `${fileName}.${file.extname}`
}

export default async (file: MultipartFileContract, type: string): Promise<string> => {
  updateFileName(file)
  file.move(Application.publicPath(type))

  return `${type}/${file.clientName}`
}
