import {useState,useEffect} from "react";
import {deleteStudent, getAllStudent} from "./client";
import {
    Layout,
    Menu,
    Breadcrumb,
    Table,
    Spin,
    Empty,
    Button,
    Badge,
    Tag,
    Avatar,
    Popconfirm,
    Radio,
    Divider
} from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined, LoadingOutlined, PlusOutlined,
} from '@ant-design/icons';
import './App.css';
import StudentDrawerForm from "./StudentDrawerForm";
import {errorNotification, successNotification} from "./Notification";
import StudentDrawerForm2 from "./StudentDrawerForm2";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const TheAvatar=({name})=>{
    let trim=name.trim();
    if(trim.length===0){
return <Avatar icon={<UserOutlined/>}/>
    }
    const split=trim.split(" ");
    if(split.length===1){
return <Avatar>{name.charAt(0)}</Avatar>
    }
    return <Avatar>{`${name.charAt(0)}${split[1].charAt(0)}`}</Avatar>
}
const removeStudents=(studentId,callback)=>{
    deleteStudent(studentId).then(() => {
        successNotification("Student deleted",`student with ${studentId} Deleted`);
        callback();
    }).catch(err=>{
        errorNotification("Cant Delete",err.message);
    })
}



const columns=(fetchStudents,showDrawer2,setShowDrawer2)=>[

    {
        title: '',
        dataIndex: 'avatar',
        key: 'avatar',
        render:(text,student)=> <TheAvatar name={student.name}/>
    },
    {
        title:'Id',
        dataIndex:'id',
        key:'id',
    },
    {
        title:'Name',
        dataIndex:'name',
        key:'name',
    },
    {
        title:'Email',
        dataIndex:'email',
        key:'email',
    },
    {
        title:'Gender',
        dataIndex:'gender',
        key:'gender',
    },
    {
        title:'Actions',
        dataIndex:'',
        key:'actions',
        render:(text, student)=>
            <Radio.Group>
            <Popconfirm
                placement='topRight'
            title={`Are you sure to delete ${student.name}`}
                onConfirm={()=>removeStudents(student.id,fetchStudents)}

            okText="Yes"
            cancelText="No"
        >
                <Radio.Button value="small">Delete</Radio.Button>
        </Popconfirm>
                {/*<Popconfirm*/}
                {/*placement='topRight'*/}
                {/*title={`Are you sure to edit ${student.name}`}*/}
                {/*onConfirm={()=>setShowDrawer2(!showDrawer2)}*/}
                {/*okText="Yes"*/}
                {/*cancelText="No"*/}

                {/*>*/}

                <Radio.Button value="small" onClick={()=>setShowDrawer2(!showDrawer2)}>Edit</Radio.Button>
                    <StudentDrawerForm2
                        showDrawer2={showDrawer2}
                        setShowDrawer2={setShowDrawer2}
                        fetchStudents={fetchStudents}
                        students={student}

                    />
                {/*</Popconfirm>*/}
            </Radio.Group>
    },

];
const antIcon=<LoadingOutlined style={{fontsize:24}}spin/>
function App() {
    const [students,setStudents]=useState([]);
    const [collapsed,setCollapsed]=useState(false);
    const [fetching,setFetching]=useState(true);
    const [showDrawer, setShowDrawer] = useState(false);
    const [showDrawer2, setShowDrawer2] = useState(false);

    const fetchStudents = () =>
        getAllStudent().then(
            res => res.json()
        ).then(data => {
            console.log(data);
            setStudents(data)

        }).catch(err=>{
            console.log(err.response)
            err.response.json().then(res=>{
                console.log(res)
                errorNotification("There was an Issue",`${res.message} [${res.status}] [${res.error}]`)
            })
        }).finally(()=>setFetching(false)

        )

    useEffect(()=>{
console.log("component is mounted");
fetchStudents();
    },[]);
const renderStudents=()=>{
    if(fetching){
        return <Spin indicator={antIcon}/>
    }
    if(students.length<=0){
        return<>
            <Button
            onClick={() => setShowDrawer(!showDrawer)}
            type="primary" shape="round" icon={<PlusOutlined />} size="small">
            Add New Student
        </Button>
            <StudentDrawerForm
                showDrawer={showDrawer}
                setShowDrawer={setShowDrawer}
                fetchStudents={fetchStudents}
            />
        <Empty/>
        </>
    }
    return <>
        {/*<StudentDrawerForm2*/}
        {/*    showDrawer2={showDrawer2}*/}
        {/*    setDrawer2={setShowDrawer2}*/}
        {/*    fetchStudents={fetchStudents}*/}

        {/*/>*/}
        <StudentDrawerForm
            showDrawer={showDrawer}
            setShowDrawer={setShowDrawer}
            fetchStudents={fetchStudents}
        />

    <Table dataSource={students}
           columns={columns(fetchStudents,showDrawer2,setShowDrawer2)}
    bordered
                  title={()=>
                      <>
                          <Tag >Number of Students</Tag>
                          <Badge count={students.length} className="site-badge-count-4"/>
                          <br/><br/>
                          <Button
                              onClick={() => setShowDrawer(!showDrawer)}
                              type="primary" shape="round" icon={<PlusOutlined />} size="small">
                              Add New Student
                          </Button>
                      </>}
                  pagination={{pageSize:20}}
                  scroll={{y:1000}}


    /></>
}
    return <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed}
               onCollapse={setCollapsed}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<PieChartOutlined />}>
                    Option 1
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined />}>
                    Option 2
                </Menu.Item>
                <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                    <Menu.Item key="3">Tom</Menu.Item>
                    <Menu.Item key="4">Bill</Menu.Item>
                    <Menu.Item key="5">Alex</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="9" icon={<FileOutlined />}>
                    Files
                </Menu.Item>
            </Menu>
        </Sider>
        <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    {renderStudents()}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>by HMHS ©2022
<Divider>
    <a href="https://systemlk.com">Click Here</a>
</Divider>
            </Footer>
        </Layout>
    </Layout>

}

export default App;
