import { SignJWT, jwtVerify } from "jose";
import createError from "http-errors";

interface JwtPayload {
  aud: string;
}

export async function signAccessToken(
  userId: number,
  role: string
): Promise<string> {
  const secretKey: string = process.env.ACCESS_SECRET_KEY!;
  if (!secretKey) {
    throw createError.InternalServerError("Secret key not provided");
  }

  const payload: any = {
    id: userId?.toString(),
    role: role,
  };

  try {
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" }) // Set the algorithm header
      .setAudience(payload)
      .setExpirationTime("1y")
      .sign(new TextEncoder().encode(secretKey));
    return token;
  } catch (err) {
    throw createError.InternalServerError();
  }
}

export async function signRefreshToken(userId: number): Promise<string> {
  const secretKey: string = process.env.ACCESS_REFRESH_KEY!;
  if (!secretKey) {
    throw createError.InternalServerError("Secret key not provided");
  }

  const payload = {};

  try {
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" }) // Set the algorithm header
      .setAudience(userId.toString())
      .setExpirationTime("1y")
      .sign(new TextEncoder().encode(secretKey));
    return token;
  } catch (err) {
    throw createError.InternalServerError();
  }
}

export async function verifyAccessToken(token: string): Promise<string> {
  const secretKey: string = process.env.ACCESS_SECRET_KEY!;
  if (!secretKey) {
    throw createError.InternalServerError("Secret key not provided");
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secretKey)
    );
    return (payload as JwtPayload).aud;
  } catch (err) {
    throw createError.Unauthorized();
  }
}

export async function verifyRefreshToken(token: string): Promise<string> {
  const secretKey: string = process.env.ACCESS_REFRESH_KEY!;
  if (!secretKey) {
    throw createError.InternalServerError("Secret key not provided");
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secretKey)
    );
    return (payload as JwtPayload).aud;
  } catch (err) {
    throw createError.Unauthorized();
  }
}
