import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { Message } from "@/model/User"  


export async function POST(request: Request) {
    const {username, content} = await request.json()
    try {
        const user = await UserModel.findOne({username})
        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: "User not found"
                },
                {status: 404}
            )
        }

        // is user accepting the messages
        if (!user.isAcceptingMessage) {
            return Response.json(
                {
                    success: false,
                    message: "User is not accepting the message"
                },
                {status: 403}
            )
        }


        const newMessage = {content, createdAt: new Date()}
        // user.message.push(newMessage as Message)
        await user.save()

        return Response.json(
            {
                success: true,
                message: "message sent successfully"
            },
            {status: 403}
        )
    } catch (error) {
        console.log("Error adding message ", error);
        return Response.json(
            {
                success: false,
                message: "Internal server error"
            },
            {status: 500}
        ) 
    }
}