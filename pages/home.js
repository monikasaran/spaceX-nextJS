import Card from "../components/card";
import Filters from '../components/filters';
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import styles from '../styles/Home.module.css'

export default function Home({query, dataList}) {
    const router = useRouter()
    const [filteredData, setfilteredData] = useState([])
    const [filters, setFilters] = useState({...query})

    useEffect(() => {
        if(filteredData.length){
            (async function() {
                const queryString = getQueryString(filters)
                const data = await fetchData(queryString)
                router.push(queryString, undefined, { shallow: true })
                setfilteredData(data)
            })()
        } else {
            setfilteredData(dataList)
        }
    }, [filters])

    const fetchFilterList = async(allFilters) => {
        setFilters(allFilters)
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>SpaceX Launch Programs</h2>
            <div className={styles.sectionContainer}>
                <Filters filters={filters} fetchFilterList={fetchFilterList}/>
                <div className={styles.homeContainer}>
                    {
                        filteredData.map((spaceCard, idx) => <Card key={`Card-${idx}`} spaceCard={spaceCard} />)
                    }
                </div>
            </div>
            <footer>Developed by: Monika Saran</footer>
        </div>
    )
}
Home.getInitialProps = async({query}) => {
    const queryString = getQueryString(query)
    const dataList = await fetchData(queryString)
    return { query, dataList }
}

async function fetchData(query) {
    const response = await fetch(`https://api.spaceXdata.com/v3/launches${query}`)
    const dataList = await response.json()
    return dataList
}

function getQueryString (filters){
    const { limit=100, launch_success, land_success, launch_year } = filters
    let param = `?limit=${limit}`
    if(launch_success) {
        param += `&launch_success=${launch_success}`
    }
    if(land_success) {
        param += `&land_success=${land_success}`
    }
    if(launch_year) {
        param += `&launch_year=${launch_year}`
    }
    return param
}
