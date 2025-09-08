import { TreeSelect } from 'antd';

const { SHOW_PARENT } = TreeSelect;

const Chekable = ({addName, allnames, names} : {addName: Function, allnames: Array<object>, names: string[]}) => {

  const onChange = (newValue: string[]) => {
    console.log('onChange ', newValue);
    addName(newValue);
  };

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