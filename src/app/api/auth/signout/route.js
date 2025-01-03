import { cookies } from "next/headers";

export async function POST (req){
  (await cookies()).delete('token')
  return Response.json({message : 'logout is done'} , {status : 200})
}