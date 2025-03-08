import { useState } from 'react';
import './NavSection.scss';
import { Link } from "react-router-dom";

interface SecProps {
    id: number;
    name: string;
    isOver: boolean;
}

interface ListProps {
    [key: string]: { title: string, listItems: string[] }[];
}

const NavSection = () => {
    const [sections, setSections] = useState<SecProps[]>([
        { id: 1, name: "woman", isOver: false },
        { id: 2, name: "male", isOver: false },
        { id: 3, name: "child", isOver: false },
        { id: 4, name: "outlet", isOver: false },
    ]);

    const list: ListProps = {
        woman: [
            {
                title: 'New Arrivals',
                listItems: ["See all products"]
            },
            {
                title: 'Top Wear',
                listItems: ['Athlete', 'T-shirt', 'Shirt', 'Blouse', 'Dress', 'Bustier', 'Sweatshirt', 'Jacket']
            },
            {
                title: 'Bottom Wear',
                listItems: ['Jeans', 'Skirt', 'Shorts', 'Trousers']
            },
            {
                title: 'Accessories',
                listItems: ['Bags', 'Jewelry', 'Hats', 'Scarves']
            }
        ],
        male: [
            {
                title: 'New Arrivals',
                listItems: ["See all products"]
            },
            {
                title: 'Top Wear',
                listItems: ['T-shirt', 'Shirt', 'Sweater', 'Jacket']
            },
            {
                title: 'Bottom Wear',
                listItems: ['Jeans', 'Shorts', 'Trousers']
            },
            {
                title: 'Accessories',
                listItems: ['Bags', 'Watches', 'Belts', 'Hats']
            }
        ],
        child: [
            {
                title: 'New Arrivals',
                listItems: ["See all products"]
            },
            {
                title: 'Top Wear',
                listItems: ['T-shirt', 'Sweatshirt', 'Jacket']
            },
            {
                title: 'Bottom Wear',
                listItems: ['Shorts', 'Trousers', 'Skirt']
            },
            {
                title: 'Accessories',
                listItems: ['Bags', 'Hats', 'Gloves']
            }
        ],
        outlet: [
            {
                title: 'New Arrivals',
                listItems: ["See all products"]
            },
            {
                title: 'Top Wear',
                listItems: ['Discounted T-shirts', 'Jackets', 'Sweaters']
            },
            {
                title: 'Bottom Wear',
                listItems: ['Jeans', 'Shorts', 'Trousers']
            },
            {
                title: 'Accessories',
                listItems: ['Bags', 'Jewelry', 'Watches']
            }
        ]
    };
    

    const menuElementOpen = (id: number) => {
        setSections((prevSection) => 
            prevSection.map((item) => (
                item.id === id ? {...item, isOver: true} : item
            ))
        )
    }

    const menuElementClose = (id: number) =>{
        setSections((prevSection) => 
            prevSection.map((item) => item.id === id ? {...item, isOver: false} : item)
        )
    }
  return (
    <div className="nav-section">
        <ul className='section-list'>
            {
                sections?.map((item) => (
                    <li key={item.id} onMouseOver={() => menuElementOpen(item.id)} onMouseOut={() => menuElementClose(item.id)}>
                        <Link to={'#'} >{item.name}</Link>
                        <div className={`dropdown-menu ${item.isOver ? 'show' : ''}`}>
                            {
                                list?.[item.name]?.map((dt, i) => (
                                    <div className='dropdown-menu__list' key={dt.title + i}>
                                        <h4>{dt.title}</h4>
                                        <ul>
                                            {
                                                dt.listItems.map((bt, j) => (
                                                    <li key={bt + j}>
                                                        {bt}
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                ))
                            }
                            <div className='dropdown-menu__img'>
                                <img src="src/assets/deneme.webp" alt="" />
                            </div>
                        </div>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}

export default NavSection