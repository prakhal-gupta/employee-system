import React from 'react';
import { Layout } from 'antd';
import AppHeader from './header/AppHeader';
import AppSider from './sider/AppSider';
const { Content } = Layout;

const AppBase = (props) => {
  const childrenWithProps = React.Children.map(props.children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { hello : "hello" });
    }
    return child;
  });


  return (
    <Layout style={{maxHeight: '100vh', overflowY: 'hidden', marginTop:"-1px", marginBottom:"1px", marginLeft:"-1px"}}>
      <AppHeader  />
      <Layout style={{overflowY: 'hidden'}}>
        <AppSider  />
        <Content style={{paddingLeft: props.noSider?0: 10, userSelect:'none',
          height:props.noFooter? `100%`:`calc(100vh - 65px)`,
          overflow: 'hidden', paddingRight:props.noSider?0: 10, paddingTop: 20}}>
          {childrenWithProps}
        </Content>
      </Layout>
    </Layout>
  )
}

export default AppBase