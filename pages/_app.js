import "../styles/globals.css";
import Layout from "../src/components/layouts";
import Loader from "../src/components/loader";
import Toaster from "../src/components/toaster";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState({
    type: "",
    message: "",
  });

  useEffect(() => {
    setOpen(open);
  }, [open]);

  useEffect(() => {
    setToast(toast);
    if (!!toast.message) {
      setTimeout(() => {
        setToast({ type: "", message: "" });
      }, 5000);
    }
  }, [toast]);

  return (
    <Layout>
      <Loader open={open} />
      <div className="absolute right-5 top-20 min-w-max">
        {!!toast.message && (
          <Toaster type={toast.type} message={toast.message} />
        )}
      </div>
      <Component {...pageProps} loader={setOpen} toaster={setToast} />
    </Layout>
  );
}

export default MyApp;
