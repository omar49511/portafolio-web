import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";

const notionSecret = process.env.NOTION_API_KEY;
const notionDatabaseId = process.env.NOTION_DATABASE_ID;

const notion = new Client({ auth: notionSecret });

export async function GET(req, res) {
  try {
    if (!notionSecret || !notionDatabaseId)
      throw new Error("Missing notion secret or DB-ID");

    const queryResponse = await notion.databases.query({
      database_id: notionDatabaseId,
    });

    const rows = queryResponse.results.map((result) => result.properties);

    const rowsStructured = rows.map((row) => ({
      number_contact: row.number_contact.title[0].plain_text,
      email_contact: row.email_contact.email,
      text_description: row.text_description.rich_text[0].plain_text,
      curriculum: row.curriculum.files[0].file.url,
    }));

    return NextResponse.json(rowsStructured);
  } catch (error) {
    console.error(error);
    return NextResponse.error({
      status: 500,
      body: { message: "Internal Server Error" },
    });
  }
}
