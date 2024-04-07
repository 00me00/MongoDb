import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Items from '../components/Items';

const HomePage = () => {
    const [allItems, setAllItems] = useState([]);
    const [selectedCategory, setSelectedCategory]=useState('fruits')
    const categories=[
        {name:'fruits', imgURL:'https://www.healthyeating.org/images/default-source/home-0.0/nutrition-topics-2.0/general-nutrition-wellness/2-2-2-3foodgroups_fruits_detailfeature.jpg?sfvrsn=64942d53_4'},
        {name:'vegetables', imgURL:'https://www.healthyeating.org/images/default-source/home-0.0/nutrition-topics-2.0/general-nutrition-wellness/2-2-2-2foodgroups_vegetables_detailfeature.jpg?sfvrsn=226f1bc7_6'},
        {name:'meat',imgURL:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ7_8Aoyg1sFsBz_aB_GuunNZBRaVqSXYVnmJW9Nk3AA&s'}
    ]

    const getAllItems = async () => {
        await axios.get('http://localhost:8000/api/items/get-all-items')
            .then(res => {
                console.log('Data', res.data)
                setAllItems(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    }
    useEffect(() => {
        getAllItems()
    }, [])
    return (
        <>
            <div className='d-flex gap-3 my-3'>
                {
                    categories && categories.map((cat,idx)=>(
                        <div
                        onClick={()=>setSelectedCategory(cat.name)} className={`cat-border d-flex justify-contain-centre gap-5 ps-2 ${selectedCategory===cat.name && 'selected-cat-border'}`}> 
                        <h4>{cat.name}</h4>
                        <img src={cat.imgURL} alt='img' height={60} width={80}/>
                        </div>
                    ))
                }
            </div>

                <div className='row'>
                    {
                        allItems && allItems.filter((i)=>i.category===selectedCategory).map((item, idx) => (
                            <Items item={item} key={idx} />
                        ))
                    }
                </div>
           
        </>
    )
}

export default HomePage