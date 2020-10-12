import { useRouter } from 'next/router'

export default function spaceName() {
    const router = useRouter()
    console.log(router.query);
    
    return <h2>{router.query.filters} from Home Page</h2>
}
