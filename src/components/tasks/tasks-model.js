import mongoose from "mongoose";
const { Schema } = mongoose

const taskSchema = new Schema({
    name: {
            type: String,
            required: true
    },
    description: {
            type: String
            
    }
})
const Task = mongoose.model('Task', taskSchema)
//Exemple.create({
  //  name: 'Exemple 1',
    //descriptopn: 'lorem ipsum 1',
    //colors: ['red', 'green', 'blue'],
    //price: 100


// })
const findAll = async() =>{
    const tasks   = await Task.find({})
    console.log('Find ALL ==== ',tasks);
}
const findById = async() =>{
    const task   = await Task.findById('637219fc5e861d69a6c03eb7')
    console.log('Find By Id ==== ',Task._id);
} 
const updateById = async() =>{
    // Methode 1
    const task   = await Task.findByIdAndUpdate('637219fc5e861d69a6c03eb7', {name : "Premier élément"},{runValidators : true,new:true});
    // Methode 2
    //const exemple   = await Exemple.findById('637219fc5e861d69a6c03eb7')
    //exemple.name = "modification"
    //exemple.save()
    // Methode 3
    //const exemple   = await Exemple.findById('637219fc5e861d69a6c03eb7')
    //exemple.set({
    //    name : "modification avec le set"

//    })
  //  exemple.save()

    console.log('updated By Id ==== ',task);
    findAll();
}
const deleteById = async() =>{
    const task   = await Task.findByIdAndDelete('637219fc5e861d69a6c03eb7');
    
}


//findAll()
//findById()
//updateById()
//deleteById()
export default Task