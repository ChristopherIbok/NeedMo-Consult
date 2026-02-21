import { Montserrat, DM_Sans } from 'next/font/google';
import './globals.css';
import ClientInit from '@/components/ClientInit';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-head',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata = {
  title: 'NeedMo Consult — Your Brand Deserves More',
  description:
    'NEEDMO CONSULT is a strategic social media agency helping businesses, creators, and brands grow with content that performs and strategies that convert.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${dmSans.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body>
        {/* Custom cursor */}
        <div id="cursor-dot" />
        <div id="cursor-ring" />
        {/* Scroll progress bar */}
        <div id="scroll-bar" />

        {children}

        {/* All global client-side behaviour (cursor, theme, scroll reveal, parallax, back-to-top) */}
        <ClientInit />
      </body>
    </html>
  );
}
