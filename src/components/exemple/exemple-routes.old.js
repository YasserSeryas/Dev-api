
import Router from '@koa/router'

const exemples = new Router()
const todos =[
    {
    id: 1,
    title: 'Acheter des patates',
},
{
    id: 2,
    title: 'Acheter des pommes',
},
{
    id: 3,
    title: 'Acheter des oranges',
}
]

exemples.get('/', (ctx, next) => {
    ctx.body =todos
})

exemples.get('/:id', (ctx) => {
    console.log(ctx.params)
    ctx.body =todos.find(t => parseInt(ctx.params.id) === t.id)

})

exemples.post('', (ctx) => {
    
    const newTask= {
        id: todos.length+1,
        title: ctx.request.body.title,
    }
    console.log(newTask);
    ctx.body =todos.push(newTask)
    ctx.status=204
})
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
