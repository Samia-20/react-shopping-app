import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import './ProductsPage.css'
import FilterBar from './FilterBar';
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
const ProductCard = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 345, height:50}}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={product.title}
          sx={{height:50}}
          image={product.image}
          title={product.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {product.title}
          </Typography>
           <Typography variant="body2" color="textSecondary" component="p">
            {product.description}
          </Typography> 
          <Typography variant="h6" component="h3">
            ₹ {product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          BUY
        </Button>
      </CardActions>
    </Card>
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

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((product) => product.category === selectedCategory);
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
  // return (
  //   <div className='body'>
  //     <div className='filterBar'>
  //     <FilterBar
  //       categories={categories}
  //       selectedCategory={selectedCategory}
  //       handleCategoryChange={handleCategoryChange}
  //     />
  //     </div>
  //     <div className="cardContainer">
  //     {filteredProducts.map(product => (
  //     <ProductCard key={product.id} product={product} />
  //   ))}
  //     </div>
  //   </div>
  // ); 

 /*  return (
     <div className="cardContainer">
   {filteredProducts.map(product => (
     <ProductCard key={product.id} product={product} />
   ))}
 </div>
   ); */

// };

export default ProductsGrid;
