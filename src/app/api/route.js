import { NextResponse } from "next/server";
import pool from "@/utils/postgresConnection";

export const GET = async () => {
  const client = await pool.connect();
  try {
    const res = await client.query("select * from usuarios");
    const users = res.rows;

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(error);
  } finally {
    client.release();
  }
};
