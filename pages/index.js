import Home from './home'

export default function Index({dataList}) {
    return (
      <Home dataList={dataList}/>
    )
}
Index.getInitialProps = async() => {
    const response = await fetch('https://api.spaceXdata.com/v3/launches?limit=100')
    const dataList = await response.json()
    return { dataList }
}

