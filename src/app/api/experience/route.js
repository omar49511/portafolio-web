import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";

const notionSecret = process.env.NOTION_API_KEY;
const notionDatabaseId = process.env.NOTION_EXPERIENCE_ID;

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
      const fechaInicio = row.fecha_experience.date.start; // Suponiendo que esto es una cadena de fecha en formato 'YYYY-MM-DD'
      const fechaFin = row.fecha_experience.date.end; // Suponiendo que esto es una cadena de fecha en formato 'YYYY-MM-DD'

      // Función para formatear la fecha a 'DD/MM/YYYY'
      const formatDate = (dateString) => {
        const [year, month, day] = dateString.split("-");
        return `${day}/${month}/${year}`;
      };

      return {
        rol_experience: row.rol_experience.title[0].plain_text,
        fecha_inicio_experience: formatDate(fechaInicio),
        fecha_fin_experience: formatDate(fechaFin),
        empresa_experience: row.empresa_experience.rich_text[0].plain_text,
        descripcion_experience:
          row.descripcion_experience.rich_text[0].plain_text,
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
