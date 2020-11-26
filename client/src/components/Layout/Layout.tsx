import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import SideBar from './SideBar';

const authPaths = ['/login', '/register', '/forgot_password'];

const Wrapper = styled.div`
  margin-left: 9.4rem;
  margin-right: 39rem;
`;

const Layout: React.FC = ({ children }) => {
  const { pathname } = useRouter();

  if (authPaths.includes(pathname) || pathname.startsWith('/reset')) return <>{children}</>;

  return (
    <main>
      <SideBar />
      <Wrapper>{children}</Wrapper>
    </main>
  );
};

export default Layout;
