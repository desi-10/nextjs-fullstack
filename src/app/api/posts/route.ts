import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
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

export const POST = async (request: NextRequest) => {
  try {
    const { name, post } = await request.json();

    const absoluteFilePath = path.resolve(path.join(process.cwd(), filePath));

    if (!(await fileExists(absoluteFilePath))) {
      await fs.writeFile(absoluteFilePath, "[]", { encoding: "utf8" });
    }

    const existingData = await fs.readFile(absoluteFilePath, {
      encoding: "utf8",
    });

    const parsedData = existingData !== "" ? JSON.parse(existingData) : [];

    const data = {
      id: new Date().getTime(),
      name,
      post,
    };

    await fs.writeFile(absoluteFilePath, JSON.stringify([...parsedData, data]));

    return NextResponse.json({ success: true, data });
  } catch (error) {
    // console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "An error occurred while processing the request.",
      },
      {
        status: 500, // Internal Server Error
      }
    );
  }
};
