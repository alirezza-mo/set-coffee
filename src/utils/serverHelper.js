import { cookies } from "next/headers";
import { verifyAccessToken } from "@/utils/auth";
import UserModel from "@/models/User";

const authAdmin = async () => {
  const token = cookies().get("token");
  let user = null;
  if (token) {
    const tokenPayload = verifyAccessToken(token.value);
    if (tokenPayload) {
      user = await UserModel.findOne({ email: tokenPayload.email });
      if (user.role === "ADMIN"){
        return user
      } else {
        return null;
      }
    } else {
      return null
    }
  } else {
    return null
  }
};

export {authAdmin}
