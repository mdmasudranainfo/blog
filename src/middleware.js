import { NextResponse } from "next/server";
import { VerifyToken } from "@/utility/JWTTokenHelper";

export async function middleware(req, res) {
  try {
    let token = req.cookies.get("token");
    let payload = await VerifyToken(token["value"]);

    const requestHeader = new Headers(req.headers);
    requestHeader.set("email", payload["email"]);
    requestHeader.set("id", payload["id"]);

    return NextResponse.next({
      request: {
        headers: requestHeader,
      },
    });
  } catch (e) {
    if (req.url.startsWith("/api/")) {
      // for backend
      return NextResponse.json(
        { status: "fail", data: "Unauthorized" },
        { status: 401 }
      );
    } else {
      // for frontend
      res.redirect("/login");
    }
  }
}

export const config = {
  // where path wark middleware is defined
  matcher: ["/api/post", "/api/user/profile", "/api/user/review"],
};
