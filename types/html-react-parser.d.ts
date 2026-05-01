declare module 'html-react-parser' {
  import { ReactElement, ReactNode } from 'react';

  interface Options {
    replace?: (domNode: any) => ReactNode;
    library?: {
      parse: (html: string) => any;
    };
    trim?: boolean;
  }

  function parse(html: string, options?: Options): ReactElement | ReactElement[] | string;

  export default parse;
}
