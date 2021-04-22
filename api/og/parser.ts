import { IncomingMessage } from "http";
import { parse } from "url";
import { TemplateData } from "../_lib/opengraph/types";

export function parseRequest(req: IncomingMessage) {
  console.log("HTTP " + req.url);
  const { pathname } = parse(req.url || "/", true);

  const arr = (pathname || "/").slice(8).split(".");
  let extension = "";
  let text = "";
  if (arr.length === 0) {
    text = "";
  } else if (arr.length === 1) {
    text = arr[0];
  } else {
    extension = arr.pop() as string;
    text = arr.join(".");
  }

  const parsedRequest: TemplateData = {
    fileType: extension === "jpeg" ? extension : "png",
    text: decodeURIComponent(text),
  };

  return parsedRequest;
}
