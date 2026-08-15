import { menu } from "@/lib/menu";

export function GET() {
  return Response.json(menu);
}
