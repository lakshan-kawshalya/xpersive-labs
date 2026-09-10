import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../keystatic.config";
import { isKeystaticAuthorized, keystaticAuthChallenge } from "@/lib/auth/keystaticAuth";

const handlers = makeRouteHandler({ config });

function withAuth<Args extends unknown[]>(
  handler: (request: Request, ...args: Args) => Promise<Response>,
) {
  return async (request: Request, ...args: Args): Promise<Response> => {
    if (!isKeystaticAuthorized(request.headers)) return keystaticAuthChallenge();
    return handler(request, ...args);
  };
}

export const GET = withAuth(handlers.GET);
export const POST = withAuth(handlers.POST);
