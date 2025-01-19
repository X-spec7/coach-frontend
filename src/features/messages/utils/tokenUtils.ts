import { jwtDecode } from "jwt-decode";
import type { IContactUser } from "../types";


const getUserId = (): string => {
  let token = localStorage.getItem('access_token');
  
  if (token) {
    let decodedToken = jwtDecode<any>(token);
    return decodedToken.user_id;
  }
  return "";
};

const getFormatedChatUser = (chatUsers: any, onlineUserList: any) => {
  const userId = getUserId();
  return chatUsers.reduce((acumulator:any, item: any) => {
    if (item.type === "DM" || item.type === "SELF") {
      let newResult: any = {};
      newResult["roomId"] = item.roomId;
      let member = null;
      for (let user of item.member) {
        if (user.id !== userId || item.type === "SELF") {
          member = user;
        }
      }
      if (member) {
        newResult["name"] = member.first_name + " " + member.last_name;
        newResult["image"] = member.image;
        newResult["id"] = member.id;
        newResult["isOnline"] = onlineUserList?.includes(member.id);
      }
      acumulator.push(newResult);
      return acumulator;
    }
    return acumulator;
  }, []);
};



const tokenUtil = {
  getUserId: getUserId,
  getFormatedChatUser: getFormatedChatUser,
};

export default tokenUtil;