import fs from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export type TParams = {
  params: {
    id: string;
  };
};

const DATA_FILE_PATH = "/src/data/data.json";

const fileExists = async (filePath: string): Promise<boolean> => {
  try {
    await fs.access(filePath);
    return true;
  } catch (error) {
    console.log("here");

    return false;
  }
};

type TPost = {
  id: number;
  name: string;
  post: string;
};

export const GET = async (_: NextRequest, { params: { id } }: TParams) => {
  const absoluteFilePath = path.resolve(
    path.join(process.cwd(), DATA_FILE_PATH)
  );

  // Check if the file exists, create it if not
  if (!(await fileExists(absoluteFilePath))) {
    await fs.writeFile(absoluteFilePath, "[]", { encoding: "utf8" });
  }

  const existingData = await fs.readFile(absoluteFilePath, {
    encoding: "utf8",
  });

  const parsedData: TPost[] =
    existingData !== "" ? JSON.parse(existingData) : [];

  if (parsedData.length === 0) {
    return NextResponse.json({ success: true, data: [] });
  }

  const findById = parsedData.find((item) => item.id === parseInt(id));

  console.log(findById);

  return NextResponse.json({ success: true, data: findById });
};
