import React from 'react';
import { SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'My Account',
    disabled: true,
  },
  {
    type: 'divider',
  },
  {
    key: '2',
    label: 'Profile',
  },
  {
    key: '3',
    label: 'Billing',
  },
  {
    key: '4',
    label: 'Settings',
    icon: <SettingOutlined />,
  },
];

const DropDown = ({ avatar }: { avatar: React.ReactNode }) => (
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