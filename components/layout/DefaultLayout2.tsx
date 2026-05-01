import { FC, ReactNode } from 'react';
import dynamic from 'next/dynamic';
import Navigation2 from '../q8design/Navigation2';  
import MessengerButton from '../button/MessengerButton';
import Footer from '../q8design/Footer';
const GoogleAnalytics = dynamic(() => import('../fontend/common/GoogleAnalytics'), { ssr: false });

interface Props {
  title?: string;
  desc?: string;
  thumbnail?: string;
  meta?: any;
  children: ReactNode;
}

const DefaultLayout: FC<Props> = ({ title, desc, thumbnail, meta, children }): JSX.Element => {
  return (
    <>
      <div className="min-h-screen bg-white transition">
        <Navigation2 />
        <GoogleAnalytics />
        <div className="mx-auto max-w-full q8-main-content">{children}</div>
        <MessengerButton />
        <Footer />
      </div>
    </>
  );
};

export default DefaultLayout;