import styles from '../styles/Card.module.css'


export default function Card({ spaceCard }) {
    const { links: {mission_patch}, mission_name, flight_number, mission_id, launch_year, launch_success,
            rocket: {first_stage: {cores}} } = spaceCard

    return (
        <div className={styles.cardContainer}>
            <div className={styles.cardImg}>
                <img src={mission_patch}/>
            </div>
            <div className={styles.cardName}>{mission_name} # {flight_number}</div>
            <div className={styles.cardLabels}>
                Mission IDs:
                {
                    mission_id.length
                    ? <ul>
                        {mission_id.map((id,i) => <li key={`mission-${i}`} className={styles.cardValue}>{id}</li>)}
                    </ul>
                    : null
                }
                
            </div>
            <div className={styles.cardLabels}>
                Launch Year:
                <span className={styles.cardValue}>{launch_year}</span>
            </div>
            <div className={styles.cardLabels}>
                Successful Launch: 
                <span className={styles.cardValue}>{launch_success? 'True' : 'False'} </span>
            </div>
            <div className={styles.cardLabels}>
                Successful Landing: 
                <span className={styles.cardValue}>
                {
                    cores[0].land_success === null
                    ? '' : cores[0].land_success.toString()
                }
                </span>
            </div>
        </div>
    )
}