import connectToDB from "@/configs/db";
import { cookies } from 'next/headers'
import { verifyAccessToken } from '@/utils/auth'
import UserModel from "@/models/User"



export async function POST(req) {
  try {
    connectToDB();
    const token = cookies().get("token");
    let user = null;
  
    if (token) {
      const tokenPayload = verifyAccessToken(token.value);
      if (tokenPayload) {
        user = await UserModel.findOne({ email: tokenPayload.email });
      }
    }
  
    const body = await req.json();
    const { name, email, phone } = body;

    // Validation (You)

    await UserModel.findOneAndUpdate(
      { _id: user._id },
      {
        $set: {
          name,
          email,
          phone,
        },
      }
    );

    return Response.json(
      { message: "User updated successfully :))" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
export async function DELETE(req){
  try{
    connectToDB()
  const body = await req.json()
  const {id} = body
  await UserModel.findByIdAndDelete({_id:id})
  return Response.json({message : "user removed"})
  } catch(err){
    return Response.json({message : err} , {status : 500})
  }
}
