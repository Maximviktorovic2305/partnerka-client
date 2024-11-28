import { NextRequest, NextResponse } from 'next/server';
// import { REFRESH_TOKEN } from './constants/token.constants';

export async function middleware(req: NextRequest) {
    // const isAuthenticated = req.cookies.get(REFRESH_TOKEN) !== undefined;
    // let refreshToken;
    // if (typeof window !== 'undefined') {
    //     refreshToken = localStorage.getItem(REFRESH_TOKEN);
    // }
    // const isAuthenticated = refreshToken !== undefined;

    // const { pathname } = req.nextUrl;

    // // Если пользователь не авторизован и пытается перейти на любую страницу, кроме "/auth"
    // if (!isAuthenticated && pathname !== '/auth/login') {
    //     return NextResponse.redirect(new URL('/auth/login', req.url));
    // }
    // // Если пользователь не авторизован и пытается перейти на любую страницу, кроме "/auth"
    // if (!isAuthenticated && pathname !== '/auth/register') {
    //     return NextResponse.redirect(new URL('/auth/register', req.url));
    // }

    // // Если пользователь авторизован и пытается перейти на страницу "/auth"
    // if (isAuthenticated && pathname === '/auth/login' || pathname === '/auth/register') {
    //     return NextResponse.redirect(new URL('/', req.url));
    // }

    return NextResponse.next();
}

export const config = {
    matcher: ['/auth/login', '/auth/register', '/((?!_next|api|static|favicon.ico).*)'],
};
