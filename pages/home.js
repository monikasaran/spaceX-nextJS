import Card from "./card";
import Filters from './filters';
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import styles from '../styles/Home.module.css'

export default function Home() {
    const router = useRouter()
    const [filteredData, setfilteredData] = useState([])
    const [filters, setFilters] = useState({})
    console.log(router)
    useEffect(() => {
        console.log(router)
    }, [])

    useEffect(() => {
        async function loadData() {
            const { launch_success, land_success, launch_year } = filters
            let query = '?limit=100'
            if(launch_success) {
                query += `&launch_success=${launch_success}`
            }
            if(land_success) {
                query += `&land_success=${land_success}`
            }
            if(launch_year) {
                query += `&launch_year=${launch_year}`
            }
            router.push(`${query}`)
            const response = await fetch(`https://api.spaceXdata.com/v3/launches${query}`)
            const dataList = await response.json()
            setfilteredData(dataList)
        }
        loadData()
    }, [filters])
  
    const fetchFilterList = async(allFilters) => {
        setFilters(allFilters)
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>SpaceX Launch Programs</h2>
            <div className={styles.sectionContainer}>
                <Filters fetchFilterList={fetchFilterList}/>
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
