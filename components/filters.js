import { useState } from 'react';
import classNames from 'classnames'
import styles from '../styles/Home.module.css'

const labelMap = {
    'launch_year': 'Launch Year',
    'launch_success': 'Successful Launch',
    'land_success': 'Successful Landing'
}
const filterList = {
    'launch_year': [
        '2006', '2007', '2008', '2009', '2010',
        '2011', '2012', '2013', '2014', '2015',
        '2016', '2017', '2018', '2019', '2020',
    ], 
    'launch_success': [
        'true',
        'false'
    ],
    'land_success': [
        'true',
        'false'
    ]
}
export default function Filters({fetchFilterList, filters}) {
    const [selectedFilter, setFilter] = useState(filters)

    const onFilterClick = (key, value) => {
        let tempState = {...selectedFilter}
        if(selectedFilter[key] && selectedFilter[key] == value) {
            delete tempState[key]
        } else {
            tempState = {...selectedFilter, [key]: value}
        }
        setFilter(tempState)
        fetchFilterList(tempState)
    }

    return (
      <div  className={styles.filterContainer}>
        <div className={styles.filterHeading}>Filters</div>
        {Object.keys(filterList).map((key, idx) => {
            const label = labelMap[key]
            return (
                <div className={styles.filterSection} key={`Filter-label-${idx}`}>
                    <div className={styles.filterLabel}>{label}</div>
                    <div className={styles.filterList}>
                        {
                            filterList[key].map((filter, i) => {
                                const filterClasses = classNames({
                                    'activeFilter': selectedFilter[key] === filter 
                                  })

                                return <div
                                    key={`Filter-Button-${i}`}
                                    className={styles.filterAction}>
                                    <div
                                        className={`${styles.filterButton} ${styles[filterClasses]}`}
                                        onClick={() => onFilterClick(key, filter)}>
                                        {filter}
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            )
        })}
      </div>
    )
  }

