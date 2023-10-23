declare module 'js-cookie' {
  export function set(
    name: string,
    value: any,
    options?: {
      expires?: number | Date;
      path?: string;
      domain?: string;
      secure?: boolean;
      sameSite?: 'strict' | 'lax' | 'none';
    },
  ): void;

}
