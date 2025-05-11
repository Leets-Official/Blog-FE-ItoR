import { WriteContext } from "@/pages/Write";
import WriteHeader from "@/components/layout/header/WriteHeader";
import { useCallback, useMemo } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const handlePublish = useCallback(() => {
    console.log("11");
  }, []);

  const contextValue = useMemo(() => ({
    onPublish: handlePublish
  }), [handlePublish]);

  return (
    <WriteContext.Provider value={contextValue}>
      <WriteHeader />
      {children}
    </WriteContext.Provider>
  );
};

export default Layout; 