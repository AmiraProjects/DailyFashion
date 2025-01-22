import Realm, {Configuration} from 'realm'
import { ProductSchema } from './ProductSchema'

//define schema configuration w/ type annotations
const config: Configuration = {
    schema: [ProductSchema],
    schemaVersion: 2, //increment the schema version
    onMigration: (oldRealm: Realm, newRealm: Realm) => {
        const oldObjects = oldRealm.objects("Product");
        const newObjects = newRealm.objects("Product");

        //update each existing object to comply w/ new schema
        for (let i = 0; i < oldObjects.length; i++){
            if(oldObjects[i].price === undefined){
                newObjects[i].price = null //or use 0 for default value
            }
        }
    }
}

const realm = new Realm(config);

export default realm