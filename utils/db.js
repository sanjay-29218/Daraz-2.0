import mongoose from 'mongoose';

const connection = {};

async function connect() {
  // if (connection.isConnected) {
  //   console.log('already connected');
  //   return;
  // }
  // if (mongoose.connections.length > 0) {
  //   connection.isConnected = mongoose.connections[0].readyState;
  //   console.log(mongoose.connections)
  //   if (connection.isConnected === 1) {
  //     console.log('use previous connection');
  //     return;
  //   }
  //   await mongoose.disconnect();
  // }
  try{
  const db = await mongoose.connect(process.env.MONGODB_URI);
  // connection.isConnected = db.connections[0].readyState;
  console.log('connected');
  // const db =  mongoose.connect(process.env.MONGODB_URI);
  // console.log('new connection');
  // connection.isConnected = db.connections[0].readyState;

  }catch(err){
    console.log('failed to connect', err)
  }
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log('not disconnected');
    }
  }
}
function convertDocToObj(doc) {
  
if(doc._id){
  doc._id = doc._id.toString();
  }
  if(doc.user){
  doc.user = doc.user.toString();
  }
 if(doc.createdAt){
  doc.createdAt = doc.createdAt.toString();
 }
  if(doc.updatedAt){
  doc.updatedAt = doc.updatedAt.toString();
  }
  if(doc.product){
  doc.product = doc.product.toString();
  }

  return doc;
}

const db = { connect, disconnect, convertDocToObj };
export default db;