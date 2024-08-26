import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #1e1e2f;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SidebarItem = styled.div`
  color: #ffffff;
  cursor: pointer;
  font-size: 18px;
  padding: 10px;
  background-color: #29293d;
  border-radius: 5px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #3b3b58;
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarItem>Dashboard</SidebarItem>
      <SidebarItem>Cryptocurrencies</SidebarItem>
      <SidebarItem>Market Events</SidebarItem>
    </SidebarContainer>
  );
};

export default Sidebar;
