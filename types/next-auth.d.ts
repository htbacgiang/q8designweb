// Type declarations for next-auth/react
// This ensures TypeScript recognizes the next-auth/react module
// The types are already in node_modules/next-auth/react/index.d.ts

// Declare the module to help TypeScript resolve it
declare module "next-auth/react" {
  export function signIn<P extends string | undefined = undefined>(
    provider?: P,
    options?: any,
    authorizationParams?: any
  ): Promise<any>;

  export function signOut<R extends boolean = true>(
    options?: any
  ): Promise<R extends true ? undefined : any>;

  export function useSession<R extends boolean = false>(
    options?: any
  ): {
    data: any;
    status: "authenticated" | "unauthenticated" | "loading";
    update: (data?: any) => Promise<any>;
  };

  export function getSession(params?: any): Promise<any>;
  export function getCsrfToken(params?: any): Promise<string | undefined>;
  export function getProviders(): Promise<any>;
  export function SessionProvider(props: any): JSX.Element;
}
