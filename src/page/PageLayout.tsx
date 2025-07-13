import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Layout, Menu, theme, Typography } from "antd";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { setToken } from "../utils";

const { Header, Sider, Content } = Layout;

const PageLayout: React.FC = () => {
  const { logout, user, isLoading, getIdTokenClaims, isAuthenticated } = useAuth0();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getIdTokenClaims();
        setToken(token?.__raw as string);
      } catch (error) {
        console.error("Error fetching token", error);
      }
    };
    if (isAuthenticated && user) {
      fetchToken();
    } else {
      localStorage.clear()
      navigate("/login")
    }

  }, [isAuthenticated, user])
  if (isLoading) return <div>Loading...</div>;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
        <div
          className="logo"
          style={{
            height: 32,
            margin: 16,
            textAlign: 'center'
          }}
        >
          <Typography.Text>
            {user?.name}
          </Typography.Text>
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={[
            {
              key: "/application",
              label: "Application",
              onClick: () => navigate("/application")
            },
            {
              key: "/credit-analyst",
              label: "Credit Analyst",
              onClick: () => navigate("/credit-analyst")
            },
            {
              onClick: () => {
                localStorage.clear();
                logout();
              },
              key: "3",
              icon: <LogoutOutlined />,
              label: "Logout",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            // background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
};
export default PageLayout;
