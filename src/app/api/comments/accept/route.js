import connectToDB from "@/configs/db";
import CommentModel from "@/models/Comment";
import { authAdmin } from "@/utils/serverHelper";

export async function PUT(req) {
  try {
    const isAdmin = authAdmin()
    if(!isAdmin){
      throw new Error("this api protected and you can't access it !!")
    }
    connectToDB();
    const body = await req.json();
    const { id } = body;
    await CommentModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          isAccept: true,
        },
      }
    );
    return Response.json({ message: "Comment accepted successfully :))" });
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
