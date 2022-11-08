import Koa from 'koa'
import Router from '@koa/router'
import bodyParser from 'koa-bodyparser'
const app = new Koa()

const router = new Router()
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

router.get('/todos', (ctx, next) => {
    ctx.body =todos
})

router.get('/todos/:id', (ctx) => {
    console.log(ctx.params)
    ctx.body =todos.find(t => parseInt(ctx.params.id) === t.id)

})
router.get('/todos', (ctx, next) => {
    ctx.body =todos
})

router.post('/todos', (ctx) => {
    
    const newTask= {
        id: todos.length+1,
        title: ctx.request.body.title,
    }
    console.log(newTask);
    ctx.body =todos.push(newTask)
    ctx.status=204
})
router.put('/todos/:id', (ctx) => {
    const task =todos.find(t => parseInt(ctx.params.id) === t.id)
    console.log(ctx.request.body)
    task.title = ctx.request.body.title
    ctx.body =todos
})
router.delete('/todos/:id', (ctx, next) => {
    const updatedTodos =todos.filter(t => parseInt(ctx.params.id) !== t.id)
    ctx.body =updatedTodos
})

app
.use(bodyParser())
.use(router.routes())
.use(router.allowedMethods())
app.listen(process.env.PORT, ()=> console.log(`Server listening to port: ${process.env.PORT}`))