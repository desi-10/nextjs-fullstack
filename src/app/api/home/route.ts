import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

const filePath = "/src/data/data.json";

const fileExists = async (filePath: string): Promise<boolean> => {
  try {
    await fs.access(filePath);
    return true;
  } catch (error) {
    console.log("here");

    return false;
  }
};

export async function GET(request: NextRequest) {
  try {
    const absoluteFilePath = path.resolve(path.join(process.cwd(), filePath));

    if (!(await fileExists(absoluteFilePath))) {
      await fs.writeFile(absoluteFilePath, "[]", { encoding: "utf8" });
    }

    const existingData = await fs.readFile(absoluteFilePath, {
      encoding: "utf8",
    });

    const parsedData = existingData !== "" ? JSON.parse(existingData) : [];

    return NextResponse.json({
      success: true,
      data: parsedData,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
