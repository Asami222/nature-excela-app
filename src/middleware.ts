export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/profile"],  // /profile ページにだけ適用
};