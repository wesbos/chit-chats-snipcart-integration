export interface ObjectLiteral {
  [key: string]: any;
}
export interface ArcRequest {
  version: string;
  routeKey: string;
  rawPath: string;
  pathParameters?: ObjectLiteral;
  rawQueryString: string;
  queryStringParameters?: Object;
  cookies?: string[];
  headers: ObjectLiteral;
  requestContext: ObjectLiteral;
  body?: string;
  isBase64Encoded: boolean;
}

// https://arc.codes/primitives/http#res
export interface Response {
  statusCode: number;
  headers?: ObjectLiteral;
  body?: string | Buffer;
  isBase64Encoded?: boolean;
}
