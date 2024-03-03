import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";

const notionSecret = process.env.NOTION_API_KEY;
const notionDatabaseId = process.env.NOTION_PROJECTS_ID;

const notion = new Client({ auth: notionSecret });

export async function GET(req, res) {
  try {
    if (!notionSecret || !notionDatabaseId)
      throw new Error("Missing notion secret or DB-ID");

    const queryResponse = await notion.databases.query({
      database_id: notionDatabaseId,
    });

    const rows = queryResponse.results.map((result) => result.properties);

    const rowsStructured = rows.map((row) => {
      // Verificar si row.url_projects está definido antes de acceder a la propiedad url
      const url = row.url_projects ? row.url_projects.url : "";

      return {
        titulo_projects: row.titulo_projects.title[0].plain_text,
        etiqueta_projects: row.etiqueta_projects.multi_select[0].name,
        etiqueta_projects_color: row.etiqueta_projects.multi_select[0].color, //agregar un diccionario para cambiar los colores a hexadecimal
        descripcion_projects: row.descripcion_projects.rich_text[0].plain_text,
        imagen_projects: row.imagen_projects.files[0].external.url,
        url_projects: url, // Asignar la URL o una cadena vacía si row.url_projects no está definido
      };
    });
    return NextResponse.json(rowsStructured);
  } catch (error) {
    console.error(error);
    return NextResponse.error({
      status: 500,
      body: { message: "Internal Server Error" },
    });
  }
}
