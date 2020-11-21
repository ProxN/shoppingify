import styled, { css } from 'styled-components';
import { Status } from '../types';
import { Media } from '../../styles';

interface TextProps {
  appearance?: 'default' | 'hint';
  strong?: boolean;
  margin?: string;
  size?: number;
  status?: Status;
}

const StyledText = styled.span<TextProps>`
  ${({ theme, appearance, strong, margin, size, status }) => css`
    color: ${appearance === 'default' ? theme.colors.text.secondary : '#828282'};
    font-size: ${theme.fontSizes[size || 0]}px;
    font-weight: ${strong && 700};
    margin: ${margin && margin};

    color: ${status === 'danger' && theme.colors.danger.main};
  `};
  line-height: 1.5;

  ${Media.thone} {
    font-size: ${({ theme }) => theme.fontSizes[1]}px;
  }
`;

const Text: React.FC<TextProps> = (props) => {
  return <StyledText {...props} />;
};

Text.defaultProps = {
  appearance: 'default',
  strong: false,
  size: 1,
};

export default Text;
