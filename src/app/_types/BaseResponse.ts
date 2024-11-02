export default interface BaseResponse<T> {
  ok: boolean;
  object: string;
  statusCode: number;
  error: string | null;
  message: string;
  data: T;
  ts: string;
  request: string;
} 