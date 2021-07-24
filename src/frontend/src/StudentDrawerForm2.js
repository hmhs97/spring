import {Drawer, Input, Col, Select, Form, Row, Button, Spin} from 'antd';
import {updateStudent} from "./client"
import {LoadingOutlined} from "@ant-design/icons";
import {useState} from "react";
import {errorNotification, successNotification} from "./Notification";

const {Option} = Select;
const antIcon =<LoadingOutlined style={{fontsize:24}} spin/>
function StudentDrawerForm2({showDrawer2, setShowDrawer2,fetchStudents,students}) {
    const onCLose = () => setShowDrawer2(false);
const [submitting2,setSubmitting2]=useState(false);
    const onFinish = student => {
        setSubmitting2(true);
        console.log(JSON.stringify(student, null, 2));
        updateStudent(students.id,student.name,student.gender).then(()=>{
           console.log("Student updated")
onCLose();
           fetchStudents();
           successNotification("Student successfully added",`${student.name} was updated to the system`)

           }

       ).catch(err=>{
           console.log(err.message)

           errorNotification("Student Not Found",err.message);
       }).finally(()=>{
           setSubmitting2(false);
       })
    };

    const onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2));
    };

    return <Drawer
        title="Update student"
        width={720}
        onClose={onCLose}
        visible={showDrawer2}
        bodyStyle={{paddingBottom: 80}}
        footer={
            <div
                style={{
                    textAlign: 'right',
                }}
            >
                <Button onClick={onCLose} style={{marginRight: 8}}>
                    Cancel
                </Button>
            </div>
        }
    >
        <Form layout="vertical"
              onFinishFailed={onFinishFailed}
              onFinish={onFinish}
              hideRequiredMark

              initialValues={{name:students.name,email:students.email,gender:students.gender}}
        >
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="name"
                        label="Name"

                        rules={[{required: true, message: 'Please enter student name'}]}
                    >
                        <Input placeholder="Please enter student name"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item

                        name="email"
                        label="Email"

                        rules={[{required: true, message: 'Please enter student email'}]}
                    >
                        <Input placeholder="Please enter student email"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="gender"
                        label="gender"

                        rules={[{required: true, message: 'Please select a gender'}]}
                    >
                        <Select placeholder="Please select a gender">
                            <Option value="MALE">MALE</Option>
                            <Option value="FEMALE">FEMALE</Option>
                            <Option value="OTHER">OTHER</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
            {submitting2 && <Spin indicator={antIcon}/>}
        </Form>
    </Drawer>
}

export default StudentDrawerForm2;