import React, { useState } from "react";
import { Form, Input, Button, Card, Row, Col } from "antd";
import {putAPI} from '../../../utils/apiRequest';
import {displayMessage, interpolate} from '../../../utils/common';
import { ERROR_MSG_TYPE, SUCCESS_MSG_TYPE } from '../../../constants/dataKeys';
import {USER_UPDATE} from '../../../constants/api';
import AppBase from '../../base/AppBase';
import { useHistory } from 'react-router-dom';

const EditUser = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (values) => {
    setLoading(true);
    const successFn = (result) => {
      displayMessage(SUCCESS_MSG_TYPE, "User Edited successfully!");
      setLoading(false);
      form.resetFields();
      history.push("/");
    };

    const errorFn = (error) => {
      displayMessage(ERROR_MSG_TYPE, "Error editing user. Please try again.");
      setLoading(false);
    };
    const id = history?.location?.state?.record?.id;
    putAPI(interpolate(USER_UPDATE, [id]),values,successFn, errorFn);
  };



  return (
    <AppBase>
      <Card style={{ padding: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ marginBottom: "40px" }}>Edit User</h2>
        </div>
        <Form form={form} onFinish={handleSubmit} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} initialValues={{
              ...history?.location?.state?.record }}>
          <Row gutter={24}>
            <Col xl={12} lg={12} md={24} sm={24}>
              <Form.Item label="First Name" name="first_name" rules={[{ required: true }]}>
                <Input placeholder="First Name" className="custom-input-box-f5" />
              </Form.Item>
            </Col>
            <Col xl={12} lg={12} md={24} sm={24}>
              <Form.Item label="Last Name" name="last_name" rules={[{ required: true }]}>
                <Input placeholder="Last Name" className="custom-input-box-f5" />
              </Form.Item>
            </Col>
            <Col xl={12} lg={12} md={24} sm={24}>
              <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' },
                { type: 'email', message: 'The input is not a valid email!'}]}>
                <Input placeholder="email" className="custom-input-box-f5" />
              </Form.Item>
            </Col>
            <Col span={24} style={{ display: 'flex', justifyContent: 'center'}}>
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ paddingLeft: 25, paddingRight: 25 ,
                  backgroundColor: "#5d64e6",borderColor: "#5d64e6",borderRadius:'10px' }} loading={loading}>
                  {loading ? "Editing User..." : "Edit User"}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </AppBase>
  );
};

export default EditUser;