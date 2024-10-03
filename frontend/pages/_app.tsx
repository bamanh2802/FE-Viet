import type { AppProps } from "next/app";

import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Provider } from "react-redux";
import { store } from "@/src/store";

import { fontSans, fontMono } from "@/config/fonts";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // useEffect(() => {
  //   const token = localStorage.getItem('access_token');
  //   const isAuthenticated = !!token;

  //   // Danh sách các route không yêu cầu đăng nhập (chỉ có '/')
  //   const publicRoutes = ['/'];

  //   // Nếu người dùng chưa đăng nhập và đang truy cập trang không công khai, chuyển hướng đến trang đăng nhập
  //   if (!isAuthenticated && !publicRoutes.includes(router.pathname)) {
  //     router.push('/login');
  //   } else {
  //     setIsLoading(false);
  //   }
  // }, [router]);

  return (
    <Provider store={store} >
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <Component {...pageProps} />
      </NextThemesProvider>
    </NextUIProvider>
    </Provider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
