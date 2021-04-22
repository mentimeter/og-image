import { VercelRequest, VercelResponse } from "@vercel/node";

import fetch from "node-fetch";
import { getScreenshot } from "../../_lib/opengraph/chromium";
import { getHtml } from "../../_lib/opengraph/template";
import { TemplateData } from "../../_lib/opengraph/types";

const isDev = !process.env.AWS_REGION;
const isHtmlDebug = process.env.OG_HTML_DEBUG === "1";
const CORE_API_URL =
  process.env.CORE_API_URL || "https://api.stage-mentimeter.com";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

const getSeries = (id: string) => fetcher(`${CORE_API_URL}/series/${id}`);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const {
      query: { id },
    } = req;

    const { name } = await getSeries(id as string);
    const args: TemplateData = {
      fileType: "png",
      text: name,
    };
    const html = getHtml(args);
    if (isHtmlDebug) {
      res.setHeader("Content-Type", "text/html");
      res.end(html);
      return;
    }
    const fileType = "png";
    const file = await getScreenshot(html, fileType, isDev);
    res.statusCode = 200;
    res.setHeader("Content-Type", `image/${fileType}`);
    res.setHeader(
      "Cache-Control",
      `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
    );
    res.end(file);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Internal Error</h1><p>Sorry, there was a problem</p>");
    console.error(e);
  }
}
