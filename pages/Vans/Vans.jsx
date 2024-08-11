import React from "react"
import { Link,useSearchParams,useLoaderData } from "react-router-dom"
import { getVans } from "../../api"

export async function loader (){
    return getVans()

         }
       

export default function Vans() {
    const [searchParams,setSearchParams]=useSearchParams()
    const typeFilter=searchParams.get("type")
    console.log(searchParams.toString())
    const data=useLoaderData()
    // console.log(data)


    const filteredVans=typeFilter?data
    .filter(van=>van.type===typeFilter):data
    const vanElements = filteredVans
    .map(van => (
        <div key={van.id} className="van-tile">
            <Link
             to={`${van.id}`}
             state={{ 
             search: `?${searchParams.toString()}`, 
             type: typeFilter 
             }}
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