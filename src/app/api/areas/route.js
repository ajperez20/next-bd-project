import { NextResponse } from "next/server";
import { areaService } from "@/services/areaService";

export async function GET() {
  try {
    const areas = await areaService.getAll();
    return NextResponse.json(areas);
  } catch (error) {
    return NextResponse.json(
      { error: { message: error.message } },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const area = await areaService.create(data);
    return NextResponse.json(area, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error.message } },
      { status: 500 },
    );
  }
}
