import React from 'react';
import { Button as AntButton } from 'antd';
import type { ButtonProps } from 'antd';
import { Plus, Pencil, Trash2, Download, Upload, RefreshCw, Tag, Eye, Copy, X } from 'lucide-react';

type ButtonSize = 'sm' | 'md' | 'lg';
export type EventType =
  | 'add'
  | 'edit'
  | 'delete'
  | 'export'
  | 'import'
  | 'refresh'
  | 'tag'
  | 'view'
  | 'copy'
  | 'cancel';

const sizeMap: Record<ButtonSize, ButtonProps['size']> = {
  sm: 'small',
  md: 'middle',
  lg: 'large',
};

interface EventPreset {
  icon: React.ReactNode;
  label: string;
  type: ButtonProps['type'];
  danger?: boolean;
}

const eventPresets: Record<EventType, EventPreset> = {
  add: { icon: <Plus size={14} />, label: 'Add', type: 'primary' },
  edit: { icon: <Pencil size={14} />, label: 'Edit', type: 'default' },
  delete: { icon: <Trash2 size={14} />, label: 'Delete', type: 'primary', danger: true },
  export: { icon: <Download size={14} />, label: 'Export', type: 'default' },
  import: { icon: <Upload size={14} />, label: 'Import', type: 'default' },
  refresh: { icon: <RefreshCw size={14} />, label: 'Refresh', type: 'default' },
  tag: { icon: <Tag size={14} />, label: 'Tag', type: 'default' },
  view: { icon: <Eye size={14} />, label: 'View', type: 'text' },
  copy: { icon: <Copy size={14} />, label: 'Copy', type: 'text' },
  cancel: { icon: <X size={14} />, label: 'Cancel', type: 'default' },
};

interface Props extends Omit<ButtonProps, 'size'> {
  size?: ButtonSize;
  fullWidth?: boolean;
  event?: EventType;
}

export const Button: React.FC<Props> = ({
  event,
  size = 'md',
  fullWidth = false,
  style,
  children,
  icon,
  type,
  danger,
  ...rest
}) => {
  const preset = event ? eventPresets[event] : undefined;

  return (
    <AntButton
      type={type ?? preset?.type}
      danger={danger ?? preset?.danger}
      icon={icon ?? preset?.icon}
      size={sizeMap[size]}
      block={fullWidth}
      style={style}
      {...rest}
    >
      {children ?? preset?.label}
    </AntButton>
  );
};
