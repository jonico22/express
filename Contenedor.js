const fs = require('fs');

async function leerArchivo(ruta) {
    
    try {
        let resp =  await fs.promises.readFile(ruta, 'utf-8');
        return resp === '' ? [] : JSON.parse(resp)
    } catch (err) {
        console.log(err)
        return []
    }
}

async function grabarArchivo(ruta,newData) {
    try {
        await fs.promises.writeFile(ruta, newData);
    } catch (err) {
        throw new Error('No grabo el archivo');
    }
}

function searchId (file,id){
    let search = file.filter(elm => elm.id === id)[0]
    return search === undefined ? null : search
}


class Contenedor {
    ruta
    constructor(){
        this.ruta = './productos.txt'
    }
    async save(product){
        let file = await leerArchivo(this.ruta)
        let newId = file.length + 1
        let search = searchId(file,newId)
        if ( search === null) {
            product.id = newId
        } else {
            product.id = Math.max(...file.map( item=>item.id)) + 1
        }
        file.push(product)
        await grabarArchivo(this.ruta,JSON.stringify(file))
        console.log('prueba nuevo producto, el id asignado es', newId )
        return newId
    }

    async getById(id){
        let file = await leerArchivo(this.ruta)
        let result =  searchId(file,id)
        console.log('prueba busqueda de id',id, " resultado ", result)
        return result
    }

    async getAll(){
        let file = await leerArchivo(this.ruta)
        console.log('prueba leer archivo',file)
        return file
    }

    async getRandom(){
        let listado = await leerArchivo(this.ruta)
        let aleatorio = Math.floor(Math.random()*(listado.length));
        return listado[aleatorio]
    }

    async deleteById(id){
        let file = await leerArchivo(this.ruta)
        let result =  searchId(file,id)
        if (result === null) {
            console.log('prueba eliminar por id ', id, 'no existe id')
        } else {
            console.log('prueba eliminar por id se elimino el id ', id)
            await grabarArchivo(this.ruta,JSON.stringify(file.filter(elm => elm.id !== id)))
        }
    }

    async deleteAll(){
        await grabarArchivo(this.ruta,'')
    }

}

module.exports = Contenedor;



