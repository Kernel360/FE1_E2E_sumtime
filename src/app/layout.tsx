import type { Metadata } from 'next';
import './globals.css';
import { getServerSession } from 'next-auth/next';
import AuthProvider from '@/components/common/AuthProvider';
import { authOptions } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'SumTime',
  description: 'kernel FE E2E project',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="kr">
      <body>
        <AuthProvider session={session}>{children}</AuthProvider>
      </body>
    </html>
  );
}
