import React from 'react';
import { Button } from '../Button';
import type { ButtonProps } from 'antd';
import { Plus, Pencil, Trash2, Download, Upload, RefreshCw, Tag, Eye, Copy, X } from 'lucide-react';

type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonVariant = 'primary' | 'default' | 'danger' | 'ghost' | 'link' | 'text';
type EventType = 'add' | 'edit' | 'delete' | 'export' | 'import' | 'refresh' | 'tag' | 'view' | 'copy' | 'cancel';

interface EventPreset {
  icon: React.ReactNode;
  label: string;
  variant: ButtonVariant;
}

const eventPresets: Record<EventType, EventPreset> = {
  add: { icon: <Plus size={14} />, label: 'Add', variant: 'primary' },
  edit: { icon: <Pencil size={14} />, label: 'Edit', variant: 'default' },
  delete: { icon: <Trash2 size={14} />, label: 'Delete', variant: 'danger' },
  export: { icon: <Download size={14} />, label: 'Export', variant: 'default' },
  import: { icon: <Upload size={14} />, label: 'Import', variant: 'default' },
  refresh: { icon: <RefreshCw size={14} />, label: 'Refresh', variant: 'default' },
  tag: { icon: <Tag size={14} />, label: 'Tag', variant: 'default' },
  view: { icon: <Eye size={14} />, label: 'View', variant: 'text' },
  copy: { icon: <Copy size={14} />, label: 'Copy', variant: 'text' },
  cancel: { icon: <X size={14} />, label: 'Cancel', variant: 'default' },
};

const variantProps: Record<ButtonVariant, Partial<ButtonProps>> = {
  primary: { type: 'primary' },
  default: { type: 'default' },
  danger: { type: 'primary', danger: true },
  ghost: { type: 'default', ghost: true },
  link: { type: 'link' },
  text: { type: 'text' },
};

interface EventButtonProps {
  event: EventType;
  label?: string;
  icon?: React.ReactNode;
  variant?: ButtonVariant;
  onClick?: () => void;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

export const EventButton: React.FC<EventButtonProps> = ({
  event,
  label,
  icon,
  variant,
  onClick,
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
}) => {
  const preset = eventPresets[event];
  const resolvedVariant = variant ?? preset.variant;

  return (
    <Button
      {...variantProps[resolvedVariant]}
      icon={icon ?? preset.icon}
      onClick={onClick}
      size={size}
      loading={loading}
      disabled={disabled}
      fullWidth={fullWidth}
    >
      {label ?? preset.label}
    </Button>
  );
};
