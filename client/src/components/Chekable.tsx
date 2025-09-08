import { useState } from 'react';
import { TreeSelect } from 'antd';

const { SHOW_PARENT } = TreeSelect;

const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-0',
        key: '0-0-0',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
    children: [
      {
        title: 'Child Node3',
        value: '0-1-0',
        key: '0-1-0',
      },
      {
        title: 'Child Node4',
        value: '0-1-1',
        key: '0-1-1',
      },
      {
        title: 'Child Node5',
        value: '0-1-2',
        key: '0-1-2',
      },
    ],
  },
];



const Chekable = ({addName, allnames, names} : {addName: Function, allnames: Array<object>, names: string[]}) => {
  const [value, setValue] = useState(['']);
  

  const onChange = (newValue: string[]) => {
    console.log('onChange ', newValue);
    addName(newValue);
  };

  console.log(names, "nnnnnaaaaaaaammmmmmmeeeeee")

  const tProps = {
    treeData: allnames,
    value: names,
    onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: 'Please select',
    style: {
      width: '100%',
    },
  };

  return <TreeSelect {...tProps} />;
};

export default Chekable;