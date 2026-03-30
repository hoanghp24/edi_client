import { ThemeConfig } from 'antd';

export const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: '#e30613',
    colorInfo: '#e30613',
    borderRadius: 8,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    colorTextBase: '#0f172a',
    colorBgLayout: '#f1f5f9',
  },
  components: {
    Layout: {
      headerBg: '#ffffff',
      headerHeight: 64,
      siderBg: '#0f172a',
    },
    Menu: {
      darkItemBg: '#0f172a',
      darkItemSelectedBg: '#e30613',
      itemBorderRadius: 8,
    },
    Button: {
      borderRadius: 8,
      controlHeight: 36,
      fontWeight: 600,
    },
    Card: {
      borderRadiusLG: 8,
    },
    Input: {
      borderRadius: 8,
      controlHeight: 40,
    },
  },
};
