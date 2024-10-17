interface CloudMusicResult<T = unknown> {
  data: T;
  code: number;
  message: string;
  msg: string;
}
