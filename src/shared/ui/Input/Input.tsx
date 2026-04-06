import React from 'react';
import { Input as AntInput } from 'antd';
import type { InputProps, InputRef } from 'antd';
import type { TextAreaProps } from 'antd/es/input';
import type { PasswordProps } from 'antd/es/input/Password';
import { Search } from 'lucide-react';

type InputSize = 'sm' | 'md' | 'lg';

const sizeMap: Record<InputSize, InputProps['size']> = {
  sm: 'small',
  md: 'middle',
  lg: 'large',
};

type InputVariantProps =
  | ({ type?: 'text' | 'number' } & Omit<InputProps, 'size' | 'type'>)
  | ({ type: 'password' } & Omit<PasswordProps, 'size'>)
  | ({ type: 'search' } & Omit<InputProps, 'size' | 'type'>)
  | ({ type: 'textarea' } & Omit<TextAreaProps, 'size'>);

type Props = InputVariantProps & {
  size?: InputSize;
  fullWidth?: boolean;
};

export const Input = React.forwardRef<InputRef, Props>(
  ({ type = 'text', size = 'md', fullWidth = false, style, ...rest }, ref) => {
    const antSize = sizeMap[size as InputSize];
    const widthStyle = { width: fullWidth ? '100%' : undefined, ...style };

    if (type === 'password') {
      return (
        <AntInput.Password ref={ref} size={antSize} style={widthStyle} {...(rest as Omit<PasswordProps, 'size'>)} />
      );
    }

    if (type === 'search') {
      const searchRest = rest as Omit<InputProps, 'size' | 'type'>;
      return (
        <AntInput
          ref={ref}
          size={antSize}
          style={widthStyle}
          prefix={<Search size={18} style={{ color: '#94a3b8' }} />}
          allowClear
          {...searchRest}
        />
      );
    }

    if (type === 'textarea') {
      return <AntInput.TextArea size={antSize} style={widthStyle} {...(rest as Omit<TextAreaProps, 'size'>)} />;
    }

    return (
      <AntInput
        ref={ref}
        type={type}
        size={antSize}
        style={widthStyle}
        {...(rest as Omit<InputProps, 'size' | 'type'>)}
      />
    );
  }
);

Input.displayName = 'Input';
