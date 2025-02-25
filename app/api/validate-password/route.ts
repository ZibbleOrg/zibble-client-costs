import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { signJWT } from "@/app/lib/jwt"
import untypedConfig from "@/config.json"

const config = untypedConfig as { [key: string]: {
  "password": string,
  "pagePath": string,
  "notionEmbedUrl": string,
}}

export async function POST(request: Request) {
  const { password, client } = await request.json()

  if (!Object.keys(config).includes(client)) {
    return NextResponse.json({ status: 401 })
  }

  if (password === config[client].password) {
    const token = await signJWT({ authenticated: true, client })
    const response = NextResponse.json({ valid: true });
    (await cookies()).set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600,
      path: "/",
    })
    return response
  } else {
    return NextResponse.json({ valid: false })
  }
}

