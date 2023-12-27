import React, { useEffect, useState } from 'react';
import './ProductsPage.css'
import FilterBar from './FilterBar';
import ProductCard from './ProductCard';

const SortDropdown = ({ onSortChange }) => {
  return (
    <select onChange={(e) => onSortChange(e.target.value)} className="customSelect">
      <option value="default" className="customOption">Default</option>
      <option value="priceHighToLow" className="customOption">Price: High to Low</option>
      <option value="priceLowToHigh" className="customOption">Price: Low to High</option>
      <option value="newest" className="customOption">Newest</option>
    </select>
  );
};




const ProductsGrid = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('default');
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(response => {
        setProducts(response);
        // Extract unique categories from products
        const uniqueCategories = [...new Set(response.map((p) => p.category))];
        setCategories(['all', ...uniqueCategories]);
      });
  }, []);
  const handleSortChange = (newSortOption) => {
    setSortOption(newSortOption);
  };

  const sortedProducts = () => {
    switch (sortOption) {
      case 'priceHighToLow':
        return [...products].sort((a, b) => b.price - a.price);
      case 'priceLowToHigh':
        return [...products].sort((a, b) => a.price - b.price);
      case 'newest':
        // Assuming products have a 'dateAdded' or similar field
        return [...products].sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
      default:
        return products;
    }
  };

  const filteredAndSortedProducts =
    selectedCategory === 'all'
      ? sortedProducts()
      : sortedProducts().filter((product) => product.category === selectedCategory);

 
  const handleCategoryChange = (event, newCategory) => {
    setSelectedCategory(newCategory);
  };


      return (
        <div className='body'>
          <div className='filterBarContainer'>
            {/* Sort Dropdown Container */}
            <div className="sortDropdownContainer">
              <label htmlFor="sortDropdown" style={{ display: 'block' }}>Sort by</label>
              <SortDropdown onSortChange={handleSortChange} className="sortDropdown" id="sortDropdown" />
            </div>
    
            {/* Filter Bar */}
            <FilterBar
              categories={categories}
              selectedCategory={selectedCategory}
              handleCategoryChange={handleCategoryChange}
            />
          </div>
          <div className="cardContainer">
            {filteredAndSortedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      );
    };
  

export default ProductsGrid;
