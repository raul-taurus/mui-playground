import Button from "@mui/material/Button";
import { createContext, Fragment, ReactNode, useContext, useEffect, useState } from "react";
import styles from './loader-test.module.css';

const LoadingContextStateInit = {
  loading: false,
  setLoading: (v: boolean) => { },
}
const LoadingContext = createContext(LoadingContextStateInit);

export function LoadingProvider({ children }: { children?: ReactNode }) {
  const [loading, setLoading] = useState(false);
  const value = { loading, setLoading };
  console.log(`LoadingProvider: ${loading}`);
  return <LoadingContext.Provider value={value} > {children} </LoadingContext.Provider>

};

export function useLoading() {
  const context = useContext(LoadingContext);
  console.log(`Using LoadingContextProvider`);
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider');
  }

  return context;
};

function LoadingScreen({ }: any) {

  return (
    <div className={styles.loading} >
      <div className={styles.dot}>*</div>
      <div className={styles.dot}>*</div>
      <div className={styles.dot}>*</div>
      <div className={styles.dot}>*</div>
      <div className={styles.dot}>*</div>
    </div>
  );
}


export function MainPage() {
  const { setLoading } = useLoading();
  const btnClickedAll = async () => {
    setLoading(true);
  };

  return (
    <Fragment>
      <Button sx={{ ml: 2 }} key={'btnAll'} onClick={btnClickedAll} variant="contained" > All </Button>,
    </Fragment>
  );
}


function Loader() {
  const { loading } = useLoading();

  useEffect(() => {
    console.log(`[app.js/#useEffect]: useLoading() value changed to: ${loading}`);
  }, [loading]);

  return loading ? <LoadingScreen loading={true} bgColor='#fff' spinnerColor={'#00A1FF'} textColor='#676767' > </LoadingScreen> : null
};


export function LoaderTest() {

  return (
    <>
      <LoadingProvider>
        <Loader />
        <div style={{ height: 2000 }}>
          <MainPage />
        </div>
      </LoadingProvider>
    </>
  );
};
