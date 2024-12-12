import axios from "axios";
import { BASEURL } from "../screens/HomePage/HomePage";

export async function fetchFriendList() {
   let tempArray = [];
    try{
       
        const res = await axios.get(BASEURL + "/getAllRegUsers");

      
        if (res.status === 200) {
          tempArray = res.data.users;
        }
    }catch(err){
        console.log("errror -----> ", err);

    }
  return tempArray;
}
