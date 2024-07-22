import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode, Fragment } from "react";

type NavigateProps = { to: string; replace?: boolean };

function Navigate({ to, replace = false }: NavigateProps): null {
  const router = useRouter();

  useEffect(() => {
    if (replace) {
      router.replace(to);
    } else {
      router.push(to);
    }
  }, [replace, router, to]);

  return null;
}

const IsAuthenticated = ({ children }: { children: ReactNode }) => {
  const { token } = useAppSelector((state) => state.user);
  return <Fragment>{token ? children : <Navigate to="/" replace />}</Fragment>;
};

export default IsAuthenticated;
