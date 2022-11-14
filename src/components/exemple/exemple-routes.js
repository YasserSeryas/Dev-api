
import Router from '@koa/router'
import * as ExempleControllers from '#components/exemple/exemple-controllers.js'
const exemples = new Router()


exemples.get('/', ExempleControllers.index)

exemples.get('/:id', (ctx) => {
    console.log(ctx.params)
    ctx.body =todos.find(t => parseInt(ctx.params.id) === t.id)

})

exemples.post('/',ExempleControllers.create )

exemples.put('/:id', (ctx) => {
    const task =todos.find(t => parseInt(ctx.params.id) === t.id)
    console.log(ctx.request.body)
    task.title = ctx.request.body.title
    ctx.body =todos
})
exemples.delete('/:id', (ctx) => {
    const updatedTodos =todos.filter(t => parseInt(ctx.params.id) !== t.id)
    ctx.body =updatedTodos
})
export default exemples
