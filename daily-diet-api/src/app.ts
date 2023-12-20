import fastify from 'fastify';
import { userRoutes } from './routes/user';
import { mealsRoutes } from './routes/meals';
import { authenticateRoutes } from './routes/authenticate';

export const app = fastify()

app.register(authenticateRoutes, {
  prefix: 'auth',
})

app.register(userRoutes, {
  prefix: 'user',
})

app.register(mealsRoutes, {
  prefix: 'meals',
})
