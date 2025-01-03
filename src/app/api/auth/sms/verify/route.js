import connectToDB from "@/configs/db";  
import OtpModel from "@/models/Otp";  
import UserModel from "@/models/User";  
import { generateAccessToken } from "@/utils/auth";  
import { roles } from "@/utils/constants";  
import { NextResponse } from 'next/server'; 

export async function POST(req) {  
  try {  
    await connectToDB(); 
    const body = await req.json();  
    const { phone, code , name } = body;  
    const email = `${phone}@gmail.com`;  

    const otp = await OtpModel.findOne({ phone, code });  

    if (otp) {  
      const date = new Date();  
      const now = date.getTime();  

      if (otp.expTime > now) {  
        const accessToken = generateAccessToken({ email });  

        const users = await UserModel.find({});  

        await UserModel.create({ 
          name, 
          email,  
          phone,  
          role: users.length > 0 ? roles.USER : roles.ADMIN,  
        });  

        
        return NextResponse.json(  
          { message: "Code is correct :))" },  
          {  
            status: 200,  
            headers: {  
              "Set-Cookie": `token=${accessToken};path=/;httpOnly=true`,  
            },  
          }  
        );  
      } else {  
        return NextResponse.json({ message: "Code is expired :))" }, { status: 410 });  
      }  
    } else {  
      return NextResponse.json(  
        { message: "Code is not correct !!" },  
        { status: 409 }  
      );  
    }  
  } catch (err) {   
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 }); // مدیریت خطا  
  }  
}