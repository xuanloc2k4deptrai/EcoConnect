/**
 * EcoConnect Web - Main App Layout
 */

import './globals.css';
import { Inter, Poppins } from 'next/font/google';
import { Metadata } from 'next';
import { Providers } from './providers';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
});

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: 'EcoConnect - Nền tảng Hệ sinh thái Xanh',
  description: 'Kết nối sản phẩm xanh, doanh nghiệp bền vững và người tiêu dùng có trách nhiệm',
  keywords: ['sustainability', 'green products', 'ESG', 'carbon footprint', 'eco-friendly'],
  authors: [{ name: 'EcoConnect Team' }],
  openGraph: {
    title: 'EcoConnect - Nền tảng Hệ sinh thái Xanh',
    description: 'Kết nối sản phẩm xanh, doanh nghiệp bền vững và người tiêu dùng có trách nhiệm',
    type: 'website',
    locale: 'vi_VN',
    alternateLocale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased bg-gray-50">
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </Providers>
      </body>
    </html>
  );
}
