import { site } from "@/lib/site";

export function GET() {
  return Response.json(site);
}
