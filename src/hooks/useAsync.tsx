import {
    DependencyList,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

type TStatusPromise = "idle" | "loading" | "success" | "error";

export default function useAsync<
    T,
    E = Error,
    Args extends unknown[] = any[]
>(asyncFunction: (...args: Args) => Promise<T>, deps?: DependencyList) {
    const [status, setStatus] = useState<TStatusPromise>("idle");
    const [value, setValue] = useState<T>();
    const [error, setError] = useState<E>();

    const mounted = useRef(true);

    // const functionRef = useTransformToRef(asyncFunction);

    // A função execute contém a asyncFunction e trata os
    // estados de status, valor e error
    // useCallback garante que a função não dispare o useEffect
    // a cada render, apenas quando asyncFunction mudar
    const execute = useCallback(async (...args: Args) => {
        const func = asyncFunction;

        setStatus("loading");
        setError(undefined);
        const promise = func(...args);
        // foi divido assim para poder aplicar then() e catch direto da função principal
        promise
            .then((response) => {
                if (mounted.current) {
                    setValue(response);
                    setStatus("success");
                }
            })
            .catch((error) => {
                if (mounted.current) {
                    setError(error);
                    setStatus("error");
                }
            });

        return promise;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps ?? [asyncFunction]);

    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);

    return { execute, status, value, error, loading: status === "loading" };
}