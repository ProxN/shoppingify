import { forwardRef } from 'react';
import { InputProps, CompoundedComponent } from './types';
import {
  InputBox,
  SvgIcon,
  StyledInput,
  InputContainer,
  Label,
  TextArea as StyledTextArea,
} from './Input.styles';

const InputWrapper: React.FC<{ label?: string }> = ({ children, label }) => {
  return (
    <InputContainer>
      {label && <Label>{label}</Label>}
      {children}
    </InputContainer>
  );
};

export type Ref = HTMLInputElement;

const Input = forwardRef<Ref, InputProps>(
  (props, ref): React.ReactElement => {
    const { onChange, icon, label, value, ...rest } = props;

    return (
      <InputWrapper label={label}>
        <InputBox>
          {icon && <SvgIcon>{icon}</SvgIcon>}
          <StyledInput ref={ref} onChange={onChange} withIcon={!!icon} {...rest} />
        </InputBox>
      </InputWrapper>
    );
  }
) as CompoundedComponent;

const TextArea: React.FC<InputProps> = (props) => {
  const { onChange, label, ...rest } = props;

  return (
    <InputWrapper label={label}>
      <StyledTextArea {...rest} />
    </InputWrapper>
  );
};

TextArea.defaultProps = {
  Size: 'default',
  borderRadius: '8px',
  type: 'text',
  fullWidth: false,
};

Input.TextArea = TextArea;

Input.defaultProps = {
  Size: 'default',
  borderRadius: '8px',
  type: 'text',
  fullWidth: false,
  value: '',
  defaultValue: '',
};

export default Input;
