import {SignJWT, jwtVerify, JWTPayload} from "jose"

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not set in environment variables")
}

export async function signJWT(payload: JWTPayload) {
  const iat = Math.floor(Date.now() / 1000)
  const exp = iat + 60 * 60 // 1 hour expiration

  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(JWT_SECRET))
}

export async function verifyJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET))
    return payload
  } catch (error) {
    console.log(error)
    return null
  }
}

