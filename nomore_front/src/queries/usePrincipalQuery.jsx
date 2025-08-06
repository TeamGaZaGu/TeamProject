import { useQuery } from '@tanstack/react-query';
import { reqPrincipal } from '../api/authApi';

function usePrincipalQuery(props) {
    return useQuery({
        queryKey: ["principal"],
        queryFn: async () => await reqPrincipal(),
    })
}

export default usePrincipalQuery;