import { useMutation } from 'react-query';
import { PasswordEmailInput, IUser } from '../types/index';
import graphqlClient, { gql } from '../utils/graphqlClient';

type QueryType = 'login' | 'register';

const getQuery = (query: QueryType) => ` 
${query}(email: $email, password: $password) {
    user {
        id
        email
    }
    error {
        field
        message
    }
}`;

interface IError {
  error?: {
    field: string;
    message: string;
  };
}

interface AuthResponse extends IError {
  user: IUser;
}

interface ForgotPassword extends IError {
  emailSent?: boolean;
}

export const useLogin = () => {
  return useMutation(async (data: PasswordEmailInput) => {
    const res = await graphqlClient.request<{ login: AuthResponse }>(
      gql`
         mutation logUser($email: String!, $password: String!) {
          ${getQuery('login')}
         }`,
      data
    );

    return res;
  });
};

export const useRegister = () => {
  return useMutation(async (data: PasswordEmailInput) => {
    const res = await graphqlClient.request<{ register: AuthResponse }>(
      gql`
         mutation logUser($email: String!, $password: String!) {
          ${getQuery('register')}
         }`,
      data
    );

    return res;
  });
};

export const useForgotPassword = () => {
  return useMutation(async (data: { email: string }) => {
    const res = await graphqlClient.request<{ forgotPassword: ForgotPassword }>(
      gql`
        mutation getResetToken($email: String!) {
          forgotPassword(email: $email) {
            emailSent
            error {
              field
              message
            }
          }
        }
      `,
      data
    );
    return res;
  });
};

export const useResetPassword = () => {
  return useMutation(async (data: { password: string; token: string }) => {
    const res = await graphqlClient.request<{ resetPassword: AuthResponse }>(
      gql`
        mutation resetPassword($token: String!, $password: String!) {
          resetPassword(resetToken: $token, password: $password) {
            user {
              id
              email
            }
            error {
              field
              message
            }
          }
        }
      `,
      data
    );
    return res;
  });
};
