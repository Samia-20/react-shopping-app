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




const ProductsGrid = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('default');
  
  useEffect(() => {
    fetch('http://localhost:8080/api/products')
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

  // Filter based on searchTerm
  const filteredProducts = filteredAndSortedProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCategoryChange = (event, newCategory) => {
    setSelectedCategory(newCategory);
  };

  const handleDelete = async(productId) => {
    // Call your API to delete the product using productId
    // Make the necessary API call here
    console.log(`Deleting product with ID: ${productId}`);
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:8080/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': `${token}`,
        },
        // Optionally, you can include a request body if the API endpoint expects it
        // body: JSON.stringify({ /* ... */ }),
      });
  
      if (response.ok) {
        console.log(`Product with ID ${productId} deleted successfully`);
        // Handle any success actions or state updates
        const updatedProducts = products.filter((product) => product.id !== productId);
        setProducts(updatedProducts);
      } else {
        // Handle error scenarios
        const errorData = await response.json(); // If the API returns error details
        console.error('Failed to delete product:', errorData);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      // Handle other potential errors such as network issues
    }
  };

  const handleModify = (product) => {
    // Redirect to the product update page with the product data
    console.log('Modifying product:', product);
    // Implement your logic to navigate to the product update page and pass the product data
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
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onDelete={handleDelete} onModify={handleModify}/>
            ))}
          </div>
        </div>
      );
    };
  

export default ProductsGrid;
