import type { Metadata } from 'next';
import './globals.css';
import { getServerSession } from 'next-auth/next';
import SessionProviderWrapper from '@/components/common/SessionProviderWrapper';
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
        <SessionProviderWrapper session={session}>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}
