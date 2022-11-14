import '#config/database.js'
import Exemple from '#components/exemple/exemple-model.js'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { API_V1_ROUTER} from '#routes/index.js'
import respond from 'koa-respond'
const app = new Koa()


app
.use(bodyParser())
.use(respond())
.use(API_V1_ROUTER.routes())
.use(API_V1_ROUTER.allowedMethods())
app.listen(process.env.PORT, ()=> console.log(`Server listening to port: ${process.env.PORT}`))