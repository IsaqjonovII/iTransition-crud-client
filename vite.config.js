import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import jsConfigPaths from "vite-jsconfig-paths";
import vitePluginSvgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), jsConfigPaths(), vitePluginSvgr()],
})
