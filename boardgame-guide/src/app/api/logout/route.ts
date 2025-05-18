import {cookies} from "next/headers";
import {LogoutService} from "@/service/server/gateway.service";


export async function POST() {
    await LogoutService.logout();
    const cookieStore = await cookies();

    // Xóa cookies bảo mật
    cookieStore.delete("access-token");
    cookieStore.delete("refresh-token");

    return Response.json({
        code: 0,
        msg: "Đăng xuất thành công"
    });
}