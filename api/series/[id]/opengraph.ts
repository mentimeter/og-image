import { VercelRequest, VercelResponse } from "@vercel/node";

import fetch from "node-fetch";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

const getSeries = (id: string) =>
  fetcher(`https://api.stage-mentimeter.com/series/${id}`);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const {
      query: { id },
    } = req;

    const { name } = await getSeries(id as string);
    res.end(name);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Internal Error</h1><p>Sorry, there was a problem</p>");
    console.error(e);
  }
}
