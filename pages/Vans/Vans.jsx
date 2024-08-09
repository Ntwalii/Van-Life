import React from "react"
import { Link,useSearchParams } from "react-router-dom"

export default function Vans() {
    const [searchParams,setSearchParams]=useSearchParams()
    const typeFilter=searchParams.get("type")
    console.log(searchParams.toString())

    const [vans, setVans] = React.useState([])
    React.useEffect(() => {
        fetch("/api/vans")
            .then(res => res.json())
            .then(data => setVans(data.vans))
    }, [])

    const filteredVans=typeFilter?vans
    .filter(van=>van.type===typeFilter):vans
    const vanElements = filteredVans
    .map(van => (
        <div key={van.id} className="van-tile">
            <Link to={`${van.id}`}
             state={{search:searchParams.toString()}}
            >
                <img src={van.imageUrl} />
                <div className="van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}<span>/day</span></p>
                </div>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </Link>
        </div>
    ))

    function handleParamsChange(key, value) {
        setSearchParams(prevParams => {
          if (value === null) {
            prevParams.delete(key)
          } else {
            prevParams.set(key, value)
          }
          return prevParams
        })
      }

    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>
            <div className="van-list-filter-buttons">
            <button onClick={()=>handleParamsChange("type","simple")} className={`van-type simple ${typeFilter==='simple'?"selected":""}`}>simple</button>
            <button onClick={()=>handleParamsChange("type","luxury")} className={`van-type simple ${typeFilter==='luxury'?"selected":""}`}>luxury</button>
            <button onClick={()=>handleParamsChange("type","rugged")} className={`van-type simple ${typeFilter==='rugged'?"selected":""}`}>rugged</button>
            {typeFilter && <button onClick={()=>handleParamsChange("type",null)} className="van-type clear-filters">Clear</button>}
            
            </div>
            <div className="van-list">
                {vanElements}
            </div>
        </div>
    )
}