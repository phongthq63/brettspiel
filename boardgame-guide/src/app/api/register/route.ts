import {RegisterService} from "@/service/server/gateway.service";


export async function POST(request: Request) {
    const formData = await request.formData()
    const email = formData.get('email')?.toString()
    const password = formData.get('password')?.toString()
    const confirmPassword = formData.get('confirmPassword')?.toString()

    if (!email || !password || !confirmPassword) {
        return Response.json({ code: -1, msg: "Thiếu thông tin đăng kí" }, { status: 400 });
    }

    const registerResponse = await RegisterService
        .register({
            body: {
                email: email,
                password: password,
                confirm_password: confirmPassword,
            }
        })

    if (registerResponse.code === 0) {
        return Response.json({
            code: 0,
            msg: "Đăng kí thành công"
        });
    } else {
        return Response.json({
            code: -1,
            msg: registerResponse.msg || "Đăng kí thất bại",
        });
    }
}