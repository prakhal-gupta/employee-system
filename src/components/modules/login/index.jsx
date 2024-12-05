import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import { Button, Card, Col, Form, Input, Row, Spin, Typography } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {postAPI} from '../../../utils/apiRequest';
import { USER_LOGIN } from '../../../constants/api';
import { displayMessage } from '../../../utils/common';
import { ERROR_MSG_TYPE, SUCCESS_MSG_TYPE } from '../../../constants/dataKeys';

const formRef = React.createRef();
const { Text } = Typography;

const Login = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [hideNav, setHideNav] = useState(window.innerWidth <= 760); // Set initial state based on window size

    const handleResize = () => {
        setHideNav(window.innerWidth <= 760);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const onFinish = async (values) => {
        setLoading(true);
        const successFn = (result) => {
            displayMessage(SUCCESS_MSG_TYPE, 'User LoggedIn Successfully.');
            setLoading(false);
            localStorage.setItem("token", result.token);
            history.push("/dashboard");
        };

        const errorFn = (error) => {
            Object.values(error).forEach((item) => displayMessage(ERROR_MSG_TYPE, item));
            setLoading(false);
        };

        postAPI(USER_LOGIN, values, successFn, errorFn);
    };

    return (
          <Row className={"authMainLayout"} style={{padding:0,margin:0, userSelect:"none"}} >
              {hideNav ? null :
                  <Col  md={14} lg={14} xl={14} sm={24} xs={24}>
                      <Row style={{marginTop: 10}} justify={'center'}>
                          <Typography.Text style={{fontWeight:'bold',fontSize:'46px'}}>
                              Login To Reqres
                          </Typography.Text>
                      </Row>
                      <Row style={{marginTop: 10}} justify={'center'}>
                          <Typography.Text style={{fontSize:'14px',color:'#8B8B8B',fontFamily:'Poppins',textAlign:'center'}}>
                              Reqres: Online Employee Management System.
                          </Typography.Text>
                      </Row>
                      <Row justify={'center'}>
                          <img style={{width: '350px', height: '350px', top: '365px', left: '176px'}} src='/Telecommuting.png' alt="Login" />
                      </Row>
                      <Row justify={'center'}>
                          <Typography.Text style={{fontSize:'14px',color:'#8B8B8B',fontFamily:'Poppins'}}>Login To View Your User Dashboard !!</Typography.Text>
                      </Row>
                  </Col>}
              <Col md={10} lg={10} xl={10} sm={24} xs={24} style={{width: "100%"}}>
                  <div style={{
                      padding: hideNav ? "1em" : "2em",
                      marginTop: hideNav ? "2em" : "0",
                      backgroundImage:'/background_of_login_page.png',
                      textAlign:"center"
                  }}>
                      {hideNav ? <img style={{width: '15em', height: '200px', marginBottom:"30px", marginTop:"-30px"}} src='/Telecommuting.png' alt="Login"/> : null}
                      <Card style={{
                          background: '../public/background_of_login_page.png',
                          height: hideNav ? '350px' : '600px',
                          boxShadow: '0px 0px 20px 0px #00000040',
                          borderRadius: '20px',
                          border: 'Mixed solid #C0CDD6',
                          backgroundColor: '#F3F8FF'
                      }}>
                          <Row>
                              <Col span={24}>
                                  <div>
                                      <h2
                                          className={'auth-type-title'}
                                          style={{ marginTop: hideNav ? '50px' :'100px', marginBottom: '10px', fontWeight: 'bold', fontFamily: 'Poppins' }}
                                      >
                                          Login To Your Account
                                      </h2>
                                      <Spin spinning={loading} className="custom-spin">
                                          <Form
                                              id={'components-form-demo-normal-login'}
                                              name="normal_login"
                                              size={'large'}
                                              className="login-form"
                                              onFinish={onFinish}
                                              style={{ textAlign: 'start' }}
                                              ref={formRef}
                                          >
                                              <Form.Item
                                                  name="username"
                                                  rules={[{ required: true, message: 'Please input your Username!' }]}
                                              >
                                                  <Input
                                                      className="custom-input-box-f5"
                                                      prefix={<UserOutlined className={'input-icon-color'} />}
                                                      placeholder="Email id"
                                                  />
                                              </Form.Item>
                                              <Form.Item
                                                  name="password"
                                                  rules={[{ required: true, message: 'Please input your Password!' }]}
                                              >
                                                  <Input.Password
                                                      className="custom-input-box-f5"
                                                      prefix={<LockOutlined className={'input-icon-color'} />}
                                                      placeholder="Password"
                                                      style={{ marginTop: '-5%' }}
                                                  />
                                              </Form.Item>
                                              <Form.Item style={{ marginTop: '10px' }}>
                                                  <Button
                                                      type={'primary'}
                                                      size={'large'}
                                                      htmlType="submit"
                                                      style={{ fontWeight: 'bold', borderRadius: '5px' }}
                                                      className="login-form-button primary-btn"
                                                  >
                                                      Log In
                                                  </Button>
                                              </Form.Item>
                                          </Form>
                                      </Spin>
                                  </div>
                              </Col>
                          </Row>
                      </Card>

                      <p style={{textAlign: 'center'}}>
                          Version:{' '}<Text type='secondary'>dev</Text>
                      </p>
                  </div>
              </Col>
          </Row>
    );
};

export default Login;
