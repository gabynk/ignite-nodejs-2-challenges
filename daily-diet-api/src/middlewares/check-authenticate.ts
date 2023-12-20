import { FastifyReply, FastifyRequest } from 'fastify'
import { verify } from 'jsonwebtoken';

export async function checkAuthenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return reply.status(401).send({
      message: "Token missing"
    })
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, process.env.SECRETE_TOKEN as string)

    request.userId = user_id as string
    
  } catch(err) {
    return reply.status(401).send({
      message: "Unauthorized"
    })
  }
}
