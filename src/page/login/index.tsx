import { useAuth0 } from "@auth0/auth0-react";
import { Button, Card, Flex, Layout, Menu, theme } from 'antd';

const { Content } = Layout;

const LoginPage: React.FC = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Layout style={{ height: "100vh" }}>
      <Content>
        <Flex justify="center" align="center" style={{height:'100vh'}} >
          <Card title="Login to System" style={{ width: 300, textAlign: 'center' }}>
            <Button type="primary" onClick={() => loginWithRedirect()} >Log in</Button>
          </Card>
        </Flex>
      </Content>
    </Layout>
  )
}
export default LoginPage;