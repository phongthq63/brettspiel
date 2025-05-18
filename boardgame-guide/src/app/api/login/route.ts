import {LoginService} from "@/service/server/gateway.service";
import {cookies} from "next/headers";


export async function POST(request: Request) {
    const formData = await request.formData()
    const username = formData.get('username')?.toString()
    const password = formData.get('password')?.toString()

    if (!username || !password) {
        return Response.json({ code: -1, msg: "Thiếu thông tin đăng nhập" }, { status: 400 });
    }

    const loginResponse = await LoginService.loginByUsernamePassword({
        body: { username, password },
    });

    if (loginResponse.code === 0 && loginResponse.data) {
        const { access_token, refresh_token, expires_in } = loginResponse.data;

        const cookieStore = await cookies();
        const expireDate = new Date(Date.now() + (expires_in ?? 0) * 1000);

        // Gắn cookies bảo mật
        if (access_token) {
            cookieStore.set("access-token", access_token, {
                httpOnly: false,
                secure: true,
                path: "/",
                expires: expireDate,
                sameSite: "lax",
            });
        }
        if (refresh_token) {
            cookieStore.set("refresh-token", refresh_token, {
                httpOnly: false,
                secure: true,
                path: "/",
                expires: expireDate,
                sameSite: "lax",
            });
        }

        return Response.json({
            code: 0,
            msg: "Đăng nhập thành công"
        });
    } else {
        return Response.json({
            code: -1,
            msg: loginResponse.msg || "Đăng nhập thất bại",
        });
    }
}