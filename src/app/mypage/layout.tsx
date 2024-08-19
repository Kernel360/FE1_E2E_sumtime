import { ReactNode } from 'react';

interface MyPageLayoutProps {
  children: ReactNode;
}

function MyPageLayout({ children }: MyPageLayoutProps) {
  return (
    <>
      <div>mui 사이드바 영역</div>
      <div>
        <p>main content 영역</p>
        {children}
      </div>
    </>
  );
}

export default MyPageLayout;
