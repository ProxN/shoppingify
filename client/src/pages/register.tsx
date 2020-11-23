import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ErrorMessage } from '@hookform/error-message';
import styled from 'styled-components';
import Flex from '@components/Flex';
import AuthBox from '@components/AuthBox';
import Input from '@components/Input';
import Button from '@components/Button';
import Text from '@components/Text';
import LockSVG from '@assets/lock.svg';
import MailSVG from '@assets/mail.svg';
import { useRegister } from '@hooks/useAuth';
import { PasswordEmailInput } from '../types';

const Form = styled.form`
  margin-top: 2rem;
  button {
    margin-top: 1rem;
  }
`;

const Register = () => {
  const router = useRouter();
  const { handleSubmit, errors, control } = useForm<PasswordEmailInput>({
    reValidateMode: 'onSubmit',
  });
  const [mutate, { data, isLoading }] = useRegister();

  const onSubmit = (inputs: PasswordEmailInput): void => {
    mutate(inputs);
  };

  useEffect(() => {
    if (!isLoading) {
      if (data && data.register.user) {
        router.push('/');
      }
    }
  }, [isLoading]);

  return (
    <Flex justify='center' align='center' fullWidth height='100%'>
      <AuthBox page='register' width='40rem' title='sign up'>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            render={(props) => (
              <Input placeholder='Email' type='email' icon={<MailSVG />} fullWidth {...props} />
            )}
            name='email'
            control={control}
            rules={{
              required: 'Email is required',
            }}
            defaultValue=''
          />
          <Controller
            render={(props) => (
              <Input
                placeholder='Password'
                type='password'
                icon={<LockSVG />}
                fullWidth
                {...props}
              />
            )}
            name='password'
            control={control}
            rules={{
              required: 'Password is required',
            }}
            defaultValue=''
          />
          <ErrorMessage
            errors={errors}
            name={errors.email ? 'email' : 'password'}
            as={<Text status='danger' />}
          />
          {data && data.register.error && (
            <Text status='danger'>{data.register.error.message}</Text>
          )}
          <Button type='submit' fullWidth status='primary'>
            {isLoading ? 'signing' : 'Sign up'}
          </Button>

          <Link href='/'>
            <span>go home</span>
          </Link>
        </Form>
      </AuthBox>
    </Flex>
  );
};

export default Register;
