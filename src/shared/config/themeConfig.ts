import { ThemeConfig } from 'antd';

export const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: '#e30613',
    colorInfo: '#e30613',
    borderRadius: 8,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  components: {
    Layout: {
      headerHeight: 64,
    },
    Menu: {
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
