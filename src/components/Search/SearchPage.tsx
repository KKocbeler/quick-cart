import './SearchPage.scss';
import data from '../../data/data.json';
import { IoIosArrowDown } from 'react-icons/io';
import Star from '../Pieces/Star';
import { FixLinkText } from '../../utility/FixLinkText';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../store/cartSlice';
import { DataProps } from '../../proptypes/DataProps';
import { MdCheck } from 'react-icons/md';

const SearchPage = () => {
    const [checkGreen, setCheckGreen] = useState<number[]>([]);
    const categories = [...new Set(data.map((product) => product.category))];
    const brands = [...new Set(data.map((product) => product.brand))];
    const colors = [...new Set(data.flatMap(product => product.color))];
    const [temporaryCategories, setTemporaryCategories] = useState<string[]>([])
    const [temporaryBrands, setTemporaryBrands] = useState<string[]>([])
    const [temporaryColors, setTemporaryColors] = useState<string[]>([])
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [minPrice, setMinPrice] = useState<number>();
    const [maxPrice, setMaxPrice] = useState<number>();

    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams()

    const handleGreenBackground = (product: DataProps) => {
        dispatch(addItemToCart(product));
        setCheckGreen((prev) => [...prev, product.id]);
        setTimeout(() => {
            setCheckGreen((prev) => prev.filter(id => id !== product.id));
        }, 300);
    };

    useEffect(() => {
        const categoryParams = searchParams.getAll("category");
        const brandParams = searchParams.getAll("brand");
        const colorParams = searchParams.getAll("color");

        setTemporaryCategories(categoryParams);
        setTemporaryBrands(brandParams);
        setTemporaryColors(colorParams);

        setSelectedCategories(categoryParams);
        setSelectedBrands(brandParams);
        setSelectedColors(colorParams);
    }, [searchParams])

    const { name } = useParams();
    const searchTerm = FixLinkText(name) ||"";
    const SearchedProduct = data.filter((item) =>
        item.brand?.toLowerCase().includes(searchTerm) ||
        item.category?.toLowerCase().includes(searchTerm) ||
        item.description?.includes(searchTerm) ||
        item.name?.toLowerCase().includes(searchTerm)
    );

    const handleCategoryChange = (category: string) => {
        setTemporaryCategories(prev =>
            prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        );
    };
    const handleBrandChange = (brand: string) => {
        setTemporaryBrands(prev => 
            prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
        )
    }
    const handleColorChange = (color: string) => {
        setTemporaryColors(prev => 
            prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
        )
    }
    const applyFilters = (e: any) => {
        e.preventDefault();

        setSelectedCategories(temporaryCategories);
        setSelectedBrands(temporaryBrands);
        setSelectedColors(temporaryColors);
      
        const params = new URLSearchParams();
      
        temporaryCategories.forEach(c => params.append("category", c));
        temporaryBrands.forEach(b => params.append("brand", b));
        temporaryColors.forEach(c => params.append("color", c));
      
        setSearchParams(params);
      };

    const baseProduct = SearchedProduct.length > 0 ? SearchedProduct : data
    const filteredProducts = baseProduct.filter(product =>
        (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
        (selectedBrands.length === 0 || selectedBrands.includes(product.brand)) &&
        (selectedColors.length === 0 || product.color.some((c: string) => selectedColors.includes(c))) &&
        product.price >= (minPrice || 0) && product.price <= (maxPrice || 999999999)
    );

    const [openTitles, setOpenTitles] = useState([
        {title: "categories", isOpen: true},
        {title: "brands", isOpen: true},
        {title: "colors", isOpen: false},
    ])
    const toggleSection = (title: string) => {
        setOpenTitles(openTitles.map((item) => 
            item.title === title ? {...item, isOpen: !item.isOpen} : item
        ))
    }



  return (
    <div id='search-page'>
        <div className="left-side">
            <div className="filter-section">
                <div className="title">All Categories 
                    <IoIosArrowDown onClick={() => toggleSection("categories")}/> 
                </div>
                <ul className={`categories-list ${openTitles.find(item => item.title === "categories")?.isOpen ? "" : "hidden"}`}>
                    {
                        categories?.map((category, i) => (
                            <li key={i}>
                                <label htmlFor="">
                                    <input
                                        type="checkbox"
                                        onChange={() => handleCategoryChange(category)}
                                        checked={temporaryCategories.includes(category)}
                                    />
                                    <span> {category} </span>
                                </label>
                            </li>

                        ))
                    }
                </ul>

            </div>
            <div className="filter-section">
                <div className="title">
                    Brands 
                    <IoIosArrowDown onClick={() => toggleSection("brands")} />
                </div>
                <ul className={`categories-list ${openTitles.find(item => item.title === "brands")?.isOpen ? "" : "hidden"}`}>
                    {
                        brands?.map((brand, j) => (
                            <li key={j}>
                                <label htmlFor="">
                                    <input 
                                        type="checkbox"
                                        onChange={() => handleBrandChange(brand)}
                                        checked={temporaryBrands.includes(brand)}
                                     />
                                    <span> {brand} </span>
                                </label>
                            </li>

                        ))
                    }
                </ul>

            </div>
            <div className="filter-section">
                <div className="title">
                    Colors 
                    <IoIosArrowDown onClick={() => toggleSection("colors")} />
                </div>
                <ul className={`categories-list ${openTitles.find(item => item.title === "colors")?.isOpen ? "" : "hidden"}`}>
                    {
                        colors?.map((color, k) => (
                            <li key={k}>
                                <label htmlFor="">
                                    <input
                                        type="checkbox"
                                        onChange={() => handleColorChange(color)}
                                        checked={temporaryColors.includes(color)}
                                    />
                                    <span> {color} </span>
                                </label>
                            </li>

                        ))
                    }
                </ul>
            </div>
            <div className='filter-section'>
                <div className="title">Price</div>
                <div className="price-between">
                    <label htmlFor="min-price">
                        <input type="text" name="minPrice" value={minPrice} id="min-price" placeholder='min' onChange={(e) => setMinPrice(Number(e.target.value.replace(/\D/g, "")))} />
                        <span className='currency'>$</span>
                    </label>
                    <label htmlFor="max-price">
                        <input type="text" name='maxPrice' id='max-price' value={maxPrice} placeholder='max' onChange={(e) => setMaxPrice(Number(e.target.value.replace(/\D/g, "")))}/>
                        <span className='currency'>$</span>
                    </label>
                </div>
            </div>
            <button type='submit' className="filter-button" onClick={applyFilters}>Filter</button>
        </div>
        <div className="right-side">
            {filteredProducts.length > 0 ? (
                <div className="filtered-product-list">
                    {filteredProducts.map((product) => (
                        <div className="product-box" key={product?.id}>
                            <div className="product-img">
                                <Link to={`/${FixLinkText(product?.category)}/${FixLinkText(product?.name)}`}>
                                    <img src={product?.image} alt={product?.name} loading='lazy' />
                                </Link>
                            </div>
                            <div className="product-body">
                                <div className="product-body__star">
                                    <Star count={product?.star} commentCount={product?.commentCount} />
                                </div>
                                <div className="product-body__name">
                                    <Link to={`/${FixLinkText(product?.category)}/${FixLinkText(product?.name)}`}>
                                        <span>{product?.brand}</span> {product?.name}
                                    </Link>
                                </div>
                                <div className="product-body__price">
                                    ${product?.price}
                                </div>
                                <button className={`product-body__add-button ${checkGreen.includes(product.id) ? "green" : ""}`} onClick={() => handleGreenBackground(product)}>
                                    {
                                        checkGreen.includes(product.id) 
                                        ?   <><span>Added</span> <MdCheck /></>
                                        :   <>Add to Cart</>
                                    }
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="not-found-product">
                    No products found. Try changing the filters.
                </div>
            )}
            </div>
    </div>
  )
}

export default SearchPage