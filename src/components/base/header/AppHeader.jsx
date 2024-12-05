import {useState} from "react";
import { LogoutOutlined, UserOutlined, DownOutlined } from "@ant-design/icons";
import {Avatar, Col, Dropdown, Menu, Row, Space, Spin, Typography} from 'antd';
import {logOut, postAPI} from "../../../utils/apiRequest";
import {USER_LOGOUT} from "../../../constants/api";
import {Link, useHistory} from "react-router-dom";
import {displayMessage} from "../../../utils/common";
import {SUCCESS_MSG_TYPE} from "../../../constants/dataKeys";

const {Text} = Typography;

const AppHeader = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const logOutUser = async () => {
      setLoading(true);
    let successFn = function () {
      logOut();
      displayMessage(SUCCESS_MSG_TYPE, 'User LoggedOut Successfully.');
      history.push("/login");
      setLoading(false);
    };
    let errorFn = function () {
        setLoading(false);
    };
    await postAPI(USER_LOGOUT, {}, successFn, errorFn);
  };

  const onHandleLink = async (event) => {
    if (event.key === "logout") {
      await logOutUser().then(r => r);
    }
  };

  let userMenu = (
    <Menu onClick={onHandleLink}>
      <Menu.Item icon={<LogoutOutlined/>} key={"logout"}>
        <Link to={"/"}>Log Out</Link>
      </Menu.Item>
    </Menu>
  );
  return (
      <Spin spinning={loading} className="custom-spin">
            <Row  style={{height: 60, width:"100%", background:"#5d64e6", userSelect:"none"}} >
              <Col xl={20} lg={20} md={20} sm={20} xs={20}
                   style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Text className="text-16 font-semi-bold">
                  <Typography.Text style={{ fontSize: '20px', fontWeight: 'bold', color:"#fff" }}>Reqres</Typography.Text>
                </Text>
              </Col>
              <Col xl={4} lg={4} md={4} sm={4} xs={4}
                   style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingRight: '15px' }}>
                <Space>
                  <Avatar icon={<UserOutlined/>} className='cursor-pointer'/>
                   <Dropdown overlay={userMenu}>
                      <Typography.Text style={{fontSize:"16px", paddingLeft:"5px", fontWeight:"bold", color:"#fff"}}>
                          <DownOutlined style={{fontWeight:"bolder", color:"#fff"}}/>
                      </Typography.Text>
                    </Dropdown>
                  </Space>
              </Col>
            </Row>
      </Spin>
  );
};

export default AppHeader;