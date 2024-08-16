import { ConfigProvider } from 'antd';

export default function Theme({ children }) {
  return (
    <ConfigProvider
      theme={{
        // algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#1640D6',
          colorLink: '#1640D6',
          borderRadius: 8,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}


