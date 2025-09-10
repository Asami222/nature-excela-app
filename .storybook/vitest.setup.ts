import { initialize, mswDecorator } from 'msw-storybook-addon';
import * as preview from './preview.js'; // Storybook の preview を読み込む場合

initialize();

export const decorators = [mswDecorator];

// 必要に応じて Storybook のグローバル設定をここで読み込む
Object.assign(globalThis, preview);