import { Button, Col, Input, Typography } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";

const CustomPagination = ({ page, total_pages, loadData }) => {
    const [newCurrent, setNewCurrent] = useState(page);
    const inputRef = useRef();

    useEffect(() => {
        setNewCurrent(page);
        if (inputRef.current) {
            inputRef.current.input.value = page;
        }
    }, [page]);

    const handleJump = (newPage) => {
        if (newPage > total_pages) {
            loadData(total_pages);
            setNewCurrent(total_pages);
        } else if (newPage < 1) {
            loadData(1);
            setNewCurrent(1);
        } else {
            loadData(newPage);
            setNewCurrent(newPage);
        }
    };

    const handleInputChange = (e) => {
        const value = parseInt(e.target.value, 10) || 1;
        setNewCurrent(value);
    };

    const handleBlur = () => {
        const value = parseInt(newCurrent, 10);
        if (value > total_pages) {
            setNewCurrent(total_pages);
        } else if (value < 1) {
            setNewCurrent(1);
        }
    };

    return (
        <Col span={24} style={{ display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
            <Button disabled={page === 1} style={{borderRadius: "10px", margin: "0.5vh", width: "1vh",
                height: "2.7vh", display: "flex", justifyContent: "center", paddingBottom: "19px"}}
                onClick={() => handleJump(page - 1)}>
                <LeftOutlined />
            </Button>
            <Typography.Text style={{borderRadius: "10px", margin: "0.5vh", backgroundColor: "white", width: "10vh",
                height: "3.5vh", paddingTop: "2px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Input min={1} ref={inputRef} max={total_pages} onBlur={handleBlur} value={newCurrent}
                       onChange={handleInputChange} style={{ display: "none" }}/> {newCurrent} / {total_pages}
            </Typography.Text>
            <Button disabled={page === total_pages} style={{borderRadius: "10px", margin: "0.5vh", width: "1vh",
                height: "2.7vh", display: "flex", justifyContent: "center", paddingBottom: "19px",}}
                onClick={() => handleJump(page + 1)}>
                <RightOutlined />
            </Button>
        </Col>
    );
};

export default CustomPagination;
