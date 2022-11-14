
import Router from '@koa/router'
import * as TasksControllers from '#components/tasks/tasks-controllers.js'
const tasks = new Router()


tasks.get('/', TasksControllers.index)

tasks.get('/:id',TasksControllers.getOne)

tasks.post('/',TasksControllers.create)

tasks.put('/:id',TasksControllers.update)

tasks.delete('/:id',TasksControllers.del)
export default tasks
