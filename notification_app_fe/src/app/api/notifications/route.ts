import { NextResponse } from "next/server";

export async function GET() {
  const url = "http://20.207.122.201/evaluation-service/notifications";
  const token = process.env.NEXT_PUBLIC_API_TOKEN;

  if (!token) {
    return NextResponse.json({ error: "No API token configured" }, { status: 401 });
  }

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Backend returned ${res.status}: ${res.statusText}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
