import Card from "./card";
import Filters from './filters';
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import styles from '../styles/Home.module.css'

export default function Home({dataList}) {
    const router = useRouter()
    const [filteredData, setfilteredData] = useState(dataList)
    const [filters, setFilters] = useState(null)
  
    useEffect(() => {
        console.log('useEffect', filters);
        
        if(filters) {
            console.log(filters)
            async function loadData() {
                const { launch_success, land_success, launch_year } = filters
                let query = ''
                if(launch_success) {
                  query += `&launch_success=${launch_success}`
                }
                if(land_success) {
                  query += `&land_success=${land_success}`
                }
                if(launch_year) {
                  query += `&launch_year=${launch_year}`
                }
                // router.push(`filters?${query}`)
                const response = await fetch(`https://api.spaceXdata.com/v3/launches?limit=100${query}`)
                const dataList = await response.json()
                setfilteredData(dataList)
            }
            loadData()
        }
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
