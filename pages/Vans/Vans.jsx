import React from "react"
import { Link,useSearchParams } from "react-router-dom"
import { getVans } from "../../api"
export default function Vans() {
    const [searchParams,setSearchParams]=useSearchParams()
    const [loading, setLoading]=React.useState(false)
    const [error, setError]=React.useState(null)
    const typeFilter=searchParams.get("type")
    console.log(searchParams.toString())

    const [vans, setVans] = React.useState([])
    React.useEffect(() => {
       async function loadVans(){
        try{
        setLoading(true)
        const data = await getVans()
        setVans(data)}
        catch(err){
            console.log("hello") 
            setError(err)
        }
        finally{
        setLoading(false)
        }
         }
       
       loadVans()
    }, [])

    const filteredVans=typeFilter?vans
    .filter(van=>van.type===typeFilter):vans
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
      
    const loadingPage=<h1>Loading...</h1>
    if(error){
        return <h1>{error.message}</h1>
    }
    return loading?loadingPage: (
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