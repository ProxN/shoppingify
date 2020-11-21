import styled from 'styled-components';
import Flex from '@components/Flex';
import AuthBox from '@components/AuthBox';
import Input from '@components/Input';
import Button from '@components/Button';
import LockSVG from '@assets/lock.svg';
import MailSVG from '@assets/mail.svg';

const Form = styled.form`
  margin-top: 2rem;
`;

const Login = () => {
  return (
    <Flex justify='center' align='center' fullWidth height='100%'>
      <AuthBox width='40rem' title='login'>
        <Form>
          <Input placeholder='Email' fullWidth icon={<MailSVG />} />
          <Input type='password' placeholder='Password' fullWidth icon={<LockSVG />} />
          <Button fullWidth status='primary'>
            Login
          </Button>
        </Form>
      </AuthBox>
    </Flex>
  );
};

export default Login;
