declare module 'msw-storybook-addon' {
  export function initialize(): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function mswDecorator(storyFn: any): any;
}