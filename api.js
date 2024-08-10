export async function getVans(){
    const response = await fetch("/api/vans")
    if(!response.ok){
        throw{
            message:"Failed to fetch vans",
            status:response.status,
            statusText:response.statusText
        }
    }
    const data = await response.json()
    return data.vans
}
