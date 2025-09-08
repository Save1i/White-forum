import React from 'react';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

const DropDown = ({ avatar, items }: { avatar: React.ReactNode, items: MenuProps['items'] }) => (
  <Dropdown
    menu={{ items }}
    placement="bottomRight"
    popupRender={(menu) => <div style={{ marginTop: 12 }}>{menu}</div>}
  >
    <span>
      <Space>{avatar}</Space>
    </span>
  </Dropdown>
);

export default DropDown;