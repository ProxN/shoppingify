import { ReactNode } from 'react';
import { Size } from '../types';

type Type = 'text' | 'password' | 'email';

interface BaseProps {
  Size?: Size;
  type?: Type;
  borderRadius?: string;
  placeholder?: string;
  icon?: ReactNode;
  id?: string;
  name?: string;
  fullWidth?: boolean;
  defaultValue?: string;
}

export interface InputStylesProps extends BaseProps {
  withIcon?: boolean;
}

export interface InputProps extends BaseProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  value?: string;
}

export interface CompoundedComponent
  extends React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>> {
  TextArea: React.FC<InputProps>;
  Search: React.FC<InputProps>;
}
