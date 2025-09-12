import z from 'zod'

const zodUserSchema = z.object({
  _id: z.uuid().nonoptional(),
  name: z.string().nonoptional(),
  mail: z.email().nonoptional(),
  password: z.string().minLength(12).nonoptional(),
  userUUID: z.number().int().nonoptional()
})

export async function partialUserValidation ({ data }) {
  if (!z.json(data)) throw new Error('Invalid Data Format!')
  return await zodUserSchema.partial().safeParseAsync(data)
}

export async function UserValidation ({ data }) {
  if (!z.json(data)) throw new Error('Invalid Data Format!')
  return await zodUserSchema.safeParseAsync(data)
}
