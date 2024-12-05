import {Layout, Menu} from "antd";
import {HomeOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";

const {Sider} = Layout;

const AppSider = () => {

  return (
  <Sider width={60} style={{background: "#fff", height:"60vh", position:"sticky", zIndex:99}}>
      <div style={{flex: 1, overflow: "hidden", background: "#fff"}}>
        <Menu style={{height: "calc(100vh)", overflowX: "hidden", background: "#fff", display: "flex",
            justifyContent:"center"}} mode="inline">
          <Menu.Item key={"/dashboard"} icon={<HomeOutlined style={{color: "#5d64e6", fontSize: "25px",
              marginLeft:"-8px" , marginTop:"10px", fontWeight:"bold"}}/>}>
            <Link to={"/dashboard"} >
              <span style={{color:"#5d64e6", fontSize:"14px", fontWeight:"bold"}}>Dashboard</span>
            </Link>
          </Menu.Item>
        </Menu>
      </div>
  </Sider>
  );
};

export default AppSider;