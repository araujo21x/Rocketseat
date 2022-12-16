import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dynamodbClient";

import { join } from "path";
import { readFileSync } from "fs";
import { compile } from "handlebars";
import dayjs from "dayjs";
import chromium from "chrome-aws-lambda";
import { S3 } from "aws-sdk";
interface ICreateCertificate {
  id: string;
  name: string;
  grade: string;
}

interface ITemplate {
  id: string;
  name: string;
  grade: string;
  medal: string;
  date: string;
}

const compileTemplate = async (data: ITemplate) => {
  const filePath = join(process.cwd(), "src", "templates", "certificate.hbs");

  const html = readFileSync(filePath, "utf-8");

  return compile(html)(data)
}

export const handler: APIGatewayProxyHandler = async (event) => {
  const { id, name, grade } = JSON.parse(event.body as string) as ICreateCertificate;
  const date = dayjs().format("DD/MM/YYYY")
  await document.put({
    TableName: "users_certificate",
    Item: {
      id,
      name,
      grade,
      date,
    }
  }).promise();

  const response = await document.query({
    TableName: "users_certificate",
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: {
      ":id": id
    }
  }).promise()

  if (!response.Items || response.Items.length === 0) {
    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Erro ao encontrar item' })
    }
  }

  const medalPath = join(process.cwd(), "src", "templates", "selo.png");
  const medal = readFileSync(medalPath, "base64");

  const data: ITemplate = {
    id,
    name,
    grade,
    date,
    medal
  }

  const content = await compileTemplate(data);

  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
  });

  const page = await browser.newPage();
  await page.setContent(content);
  const pdf = await page.pdf({
    format: "a4",
    landscape: true,
    printBackground: true,
    preferCSSPageSize: true,
    path: process.env.IS_OFFLINE ? "./certificate.pdf" : undefined,
  });

  await browser.close();

  const s3 = new S3();

  // await s3.createBucket({ Bucket: 'lucas-estudos2' }).promise()

  await s3.putObject({
    Bucket: "lucas-estudos",
    Key: `${id}.pdf`,
    ACL: 'public-read',
    Body: pdf,
    ContentType: "application/pdf",
  }).promise()

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'Certificado gerado com sucesso',
      url: `https://lucas-estudos.s3.amazonaws.com/${id}.pdf`
    })
  }
}