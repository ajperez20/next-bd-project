import { NextResponse } from "next/server";
import pool from "@/utils/postgresConnection";

export const GET = async () => {
  try {
    const client = await pool.connect();
    const res = await client.query("select * from usuarios");
    const users = res.rows;

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(error);
  }
};
