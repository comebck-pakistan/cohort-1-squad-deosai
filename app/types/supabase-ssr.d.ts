declare module "@supabase/ssr" {
  import type {
    SupabaseClient,
    SupabaseClientOptions,
  } from "@supabase/supabase-js";

  type CookieOptions = {
    domain?: string;
    expires?: Date;
    httpOnly?: boolean;
    maxAge?: number;
    path?: string;
    sameSite?: boolean | "lax" | "strict" | "none";
    secure?: boolean;
  };

  type CookieEntry = {
    name: string;
    value: string;
    options?: CookieOptions;
  };

  type BrowserClientOptions = SupabaseClientOptions<"public"> & {
    cookies?: {
      getAll?: () => CookieEntry[];
      setAll?: (cookies: CookieEntry[]) => void;
    };
  };

  type ServerClientOptions = SupabaseClientOptions<"public"> & {
    cookies: {
      getAll: () => CookieEntry[] | Promise<CookieEntry[]>;
      setAll: (cookies: CookieEntry[]) => void | Promise<void>;
    };
  };

  export function createBrowserClient(
    supabaseUrl: string,
    supabaseKey: string,
    options?: BrowserClientOptions,
  ): SupabaseClient;

  export function createServerClient(
    supabaseUrl: string,
    supabaseKey: string,
    options: ServerClientOptions,
  ): SupabaseClient;
}
