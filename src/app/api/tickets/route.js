import connectToDB from "@/configs/db";
import TicketModel from "@/models/Ticket";
import { cookies } from 'next/headers'
import { verifyAccessToken } from '@/utils/auth'
import UserModel from '@/models/User'



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
  
    const reqBody = await req.json();
    const { title, body, department, subDepartment, priority } = reqBody;

    // Validation (You)

    await TicketModel.create({
      title,
      body,
      department,
      subDepartment,
      priority,
      user: user._id,
    });

    return Response.json(
      { message: "Ticket saved successfully :))" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
