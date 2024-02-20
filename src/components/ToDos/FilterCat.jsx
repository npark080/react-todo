import { useState, useEffect } from "react"
import axios from "axios";
import { ImEye, ImEyeBlocked } from 'react-icons/im'

export default function FilterCat({setFilter, showDone, setShowDone}) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`https://localhost:7040/api/Categories`).then(response => {
            console.log(response)
            setCategories(response.data)
    })
    }, []);

  return (
    <div className='text-center'>
    <button className="btn btn-filter m-1" onClick={() => setFilter(0)}>
        All
    </button>
    {categories.map(c => 
        <button key={c.categoryId} className="btn btn-filter m-1" onClick={() => setFilter(+c.categoryId)}>
            {c.categoryName}
        </button>
    )}
    
        {!showDone ?
            <button className="btn btn-filter m-1" onClick={() => setShowDone(!showDone)}>
                Show Complete &ensp;<ImEye />
            </button>:
            <button className="btn btn-filter m-1" onClick={() => setShowDone(!showDone)}>
                Hide Complete &ensp;<ImEyeBlocked/> 
            </button>
        }   
</div>
  )
}