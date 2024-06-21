declare module 'redux-persist/lib/storage/createWebStorage' {
  const createWebStorage: (type: string) => {
    getItem: (key: string) => Promise<any>;
    setItem: (key: string, value: any) => Promise<void>;
    removeItem: (key: string) => Promise<void>;
  };
  export default createWebStorage;
}
