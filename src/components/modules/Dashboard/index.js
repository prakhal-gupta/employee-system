import React, { useState, useEffect } from 'react';
import {Table, Spin, Popconfirm, Divider, Avatar, Row} from 'antd';
import {useHistory} from "react-router-dom";
import {USER_LIST, USER_UPDATE} from '../../../constants/api';
import { SUCCESS_MSG_TYPE, ERROR_MSG_TYPE} from '../../../constants/dataKeys';
import {deleteAPI, getAPI} from '../../../utils/apiRequest/index';
import {displayMessage, interpolate} from "../../../utils/common";
import CustomPagination from "../../common/CustomPagination";
import AppBase from "../../base/AppBase";

const Index = () => {
    const history = useHistory();
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [total_pages, setTotalPages] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const loadUser = (page = 1, pageSize = 10) => {
        setLoading(true);
        const params = { page, pageSize };

        const successFn = (result) => {
            setUserData(result.data);
            setPage(result.page);
            setTotalPages(result.total_pages);
            setCurrentPage(result.current);
            setLoading(false);
        };

        const errorFn = (error) => {
            displayMessage(ERROR_MSG_TYPE, "Error fetching user data. Please try again.");
            setLoading(false);
        };
        getAPI(USER_LIST, successFn, errorFn, params);
    };

    useEffect(() => {
        loadUser(currentPage);
    }, [currentPage]);

    const columns = [
        {
            title: "#",
            dataIndex: "id",
            key: "id",
            width: 40,
            fixed: "left",
        },
        {
            title: "Profile",
            dataIndex: "avatar",
            key: "avatar",
            width: 50,
            render: (avatarUrl) => <Avatar src={avatarUrl} alt="Profile" />,
        },
        {
            title: "Name",
            key: "name",
            render: (text, record) => `${record.first_name} ${record.last_name}`,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Action",
            key: "action",
            width:150,
            render: (_, record) => (
                <span>
                    <button onClick={() => editObject(record)} style={{background: 'none', border: 'none',
                        color: '#5d64e6', cursor: 'pointer'}}> Edit</button>
                    <Divider type="vertical"/>
                    <Popconfirm title="Are you sure to delete this?" onConfirm={() => deleteObject(record)}
                        okText="Yes" cancelText="No" okButtonProps={{style: {backgroundColor: '#5d64e6',
                            color: 'white', border: 'none', cursor: 'pointer',},}}
                            cancelButtonProps={{style: {color: '#5d64e6', cursor: 'pointer',},}}>
                      <button style={{background: 'none', border: 'none', color: 'red', cursor: 'pointer'}}>
                        Delete
                      </button>
                    </Popconfirm>
                </span>
            ),
        }
    ];

    const editObject = record => {
        history.push({
            pathname: "/user/edit",
            state: { record: record },
        });
    };

    const deleteObject = record => {
        setLoading(true);
        let reqData = {
            id: record.id,
        };
        const successFn = () => {
            displayMessage(SUCCESS_MSG_TYPE, "User deleted successfully!!");
            loadUser();
            setLoading(false);
        };
        const errorFn = (error) => {
            displayMessage(ERROR_MSG_TYPE, "Error deleting user. Please try again.");
            setLoading(false);
        };
        deleteAPI(interpolate(USER_UPDATE, [record, "id"]), reqData, successFn, errorFn);
    };

    return (
        <AppBase>
            <div style={{ margin: '20px' }}>
                <Spin spinning={loading}>
                    <div className='container-home' style={{ padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', overflow: 'hidden'}}>
                        <div className='filter-container' style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <h2 style={{ textAlign: 'center', color: '#5d64e6', paddingLeft: '5px'}}>User List</h2>
                        </div>
                        <Table dataSource={userData} columns={columns} pagination={false} bordered size="middle"
                            scroll={{ x: 'max-content' }}/>
                        <Row style={{display: "flex", padding: "8px", marginTop:"10px"}}>
                            <CustomPagination page={page} loadData={loadUser} total_pages={total_pages}/>
                        </Row>
                    </div>
                </Spin>
            </div>
        </AppBase>
    );
};

export default Index;