import { collection, query, getDocs, setDoc} from "firebase/firestore";
import { db } from "../firebase-config";
import { doc, updateDoc, deleteDoc  } from "firebase/firestore"; 
import errorMessages from '../mock-data/errorMessages.json';


class DbRequest {
    async queryDb(queryParams){
        const tableRef = collection(db, queryParams.table);
        const tableQuery1 = query(tableRef, queryParams.orderBy, ...queryParams.whereCondition);
        if(queryParams.whereCondition2){
          const tableQuery2 = query(tableRef, queryParams.orderBy, ...queryParams.whereCondition2);
          const table1Snapshot = await getDocs(tableQuery1);
          const table2Snapshot = await getDocs(tableQuery2);
          const filterdData1 = table1Snapshot.docs.map((doc)=>({
            ...doc.data(),
            id: doc.id,
          }))
          const filterdData2 = table2Snapshot.docs.map((doc)=>({
              ...doc.data(),
              id: doc.id,
          }))
          return [filterdData1,filterdData2];
        }else{
          const table1Snapshot = await getDocs(tableQuery1);
          const filterdData1 = table1Snapshot.docs.map((doc)=>({
            ...doc.data(),
            id: doc.id,
          }))
          return filterdData1
        }
  }
  
  async updateDb(id,table,updateParams){
    await updateDoc(doc(db,table,id), updateParams);
  }

  async removeFromDb(id,table){
    await deleteDoc(doc(db,table,id));
  }

  async setDb(id,table,setParams){
    try {
      await setDoc(doc(db, table, id), setParams);
    } catch (error) {
      throw errorMessages[error.code];
    }
  }
}

export default new DbRequest();
