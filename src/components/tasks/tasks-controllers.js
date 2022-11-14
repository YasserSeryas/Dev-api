import Task from "#components/tasks/tasks-model.js";
import Joi from "joi";
export async function index(ctx){
    try {
        ctx.body =await Task.find({})
    } catch(e){
        ctx.badRequest({message : e.message})
    }
}
export async function create(ctx){
    try {
        const exempleValidationSchema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required()
            
        })
       
     // destructured object & array 
    //const objTest = { name: 'test', value: 123, nested: { color: 'black' } }
    //const arrTest = ['value1', 'value2']
    //const { name, nested: { color } } = objTest
    //const [val1] = arrTest
    const {error} =exempleValidationSchema.validate(ctx.request.body)
    if(error) throw new Error(error)
    
    await Task.create(ctx.request.body);
    ctx.response.status = 201;
    ctx.body = "Hello"
    

}catch(e){
    ctx.badRequest({message : e.message})


} 

}
export async function update(ctx) {
    try {
        const exempleValidationSchema = Joi.object({
            name: Joi.string(),
            description: Joi.string().max(255)
        });

        const { error } = exempleValidationSchema.validate(ctx.request.body);
        if(error) throw new Error(error);

        await Task.updateOne({_id: ctx.params.id}, {$set: ctx.request.body});
        ctx.response.status = 200;
    } catch (e) {
        ctx.badRequest({message: e.message})
    }
}

export async function del(ctx) {
    try {
        await Task.findOneAndRemove({_id: ctx.params.id});
        ctx.response.status = 200;
    } catch (e) {
        ctx.badRequest({message: e.message})
    }
}
export async function getOne(ctx) {
    try {
        ctx.body = await Task.find({_id: ctx.params.id});
    } catch (e) {
        ctx.badRequest({message: e.message})
    }
}

