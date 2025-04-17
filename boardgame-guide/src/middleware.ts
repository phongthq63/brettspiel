import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getTimestampUTC } from './utils'

export function middleware(request: NextRequest) {
    // Kiểm tra nếu đang ở trang chủ
    if (request.nextUrl.pathname === '/') {
        const lastVisit = request.cookies.get('last_visit')?.value
        const now = getTimestampUTC()
        
        if (!lastVisit) {
            // Nếu chưa từng vào trang (không có cookie)
            const response = NextResponse.redirect(new URL('/welcome', request.url))
            response.cookies.set('last_visit', now.toString(), {
                maxAge: 60 * 60 * 24 * 30 // 30 days
            })
            return response
        }

        // Tính số mili giây trong 7 ngày
        const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000
        
        // Tính thời gian đã trôi qua kể từ lần visit cuối
        const timeDiff = now - parseInt(lastVisit)
        
        if (timeDiff > SEVEN_DAYS) {
            // Nếu đã hơn 7 ngày kể từ lần cuối truy cập
            const response = NextResponse.redirect(new URL('/welcome', request.url))
            response.cookies.set('last_visit', now.toString(), {
                maxAge: 60 * 60 * 24 * 30 // 30 days
            })
            return response
        }

        // Nếu trong vòng 7 ngày, cập nhật lại timestamp
        const response = NextResponse.next()
        response.cookies.set('last_visit', now.toString(), {
            maxAge: 60 * 60 * 24 * 30 // 30 days
        })
        return response
    }

    return NextResponse.next()
}

// Chỉ áp dụng middleware cho trang chủ
export const config = {
    matcher: '/'
} 