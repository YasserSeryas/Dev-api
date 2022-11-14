import mongoose from "mongoose";
const { Schema } = mongoose

const exempleSchema = new Schema({
    name: {
            type: String,
            required: true
    },
    descriptopn: {
            type: String
            
    },
    colors: {
        type: [String],
        required: true
    },
    price:{
        type: Number,
        required: true

    }
})
const Exemple = mongoose.model('Exemple', exempleSchema)
//Exemple.create({
  //  name: 'Exemple 1',
    //descriptopn: 'lorem ipsum 1',
    //colors: ['red', 'green', 'blue'],
    //price: 100


// })
const findAll = async() =>{
    const exemples   = await Exemple.find({})
    console.log('Find ALL ==== ',exemples);
}
const findById = async() =>{
    const exemple   = await Exemple.findById('637219fc5e861d69a6c03eb7')
    console.log('Find By Id ==== ',exemple._id);
} 
const updateById = async() =>{
    // Methode 1
    const exemple   = await Exemple.findByIdAndUpdate('637219fc5e861d69a6c03eb7', {name : "Premier élément"},{runValidators : true,new:true});
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

    console.log('updated By Id ==== ',exemple);
    findAll();
}
const deleteById = async() =>{
    const exemple   = await Exemple.findByIdAndDelete('637219fc5e861d69a6c03eb7');
    
}


//findAll()
//findById()
//updateById()
//deleteById()
export default Exemple