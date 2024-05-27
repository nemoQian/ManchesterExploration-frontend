import { mergeConfig } from "vite";
import eslint from 'vite-plugin-eslint';
import * as http from "node:http";
import baseConfig from './vite.config.base';

export default mergeConfig(
  {
    mode: 'development',
    server: {
      open: true,
      fs: {
        strict: true,
      },
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8101',
          changeOrigin: true,
          secure: false, // 如果是https接口，需要配置这个参数
          agent: new http.Agent(),
          rewrite: (path) => path.replace(/^\/api/, '/api'),
        },
      },
    },
    plugins: [
      eslint({
        cache: false,
        include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
        exclude: ['node_modules'],
      }),
    ],
  },
  baseConfig
);