import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import './ProductsPage.css';
import { useNavigate } from 'react-router-dom';
import { Edit, Delete } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export default function ProductCard({ product , onDelete, onModify}) {
  const navigate = useNavigate();
  const navigateToProduct = () => {
    navigate('/productDetails', { state: { product } });
  };

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDelete = () => {
    // Call the API to delete the product by passing its ID or necessary data
    onDelete(product.id); // Replace 'product.id' with the actual identifier for the product
  };

  const handleModify = () => {
    // Redirect to the product update page and pass the product data
    onModify(product);
  };

  const cardHeight = isExpanded ? 'auto' : '400px';
  const descriptionMaxHeight = isExpanded ? 'none' : '80px'; // Set the maximum height for the description
  const userRoles = localStorage.getItem('userRole');
  

  return (
    <Card sx={{ maxWidth: 500, minWidth: 400, height: cardHeight, marginLeft: 32, marginRight: 32, marginBottom: 16, position: 'relative', overflow: 'hidden' }}>
      <CardActionArea style={{ height: 'calc(100% - 50px)', flexGrow: 1 }}>
        <CardMedia
          component="img"
          alt={product.title}
          image={product.imageUrl}
          title={product.name}
          style={{ width: '100%', height: 200, objectFit: 'contain', marginBottom: 8 }}
        />
        <CardContent>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: 8 }}>
            <Typography gutterBottom variant="h5" component="h2">
              {product.name}
            </Typography>
            <Typography variant="h6" component="h3">
              ₹{product.price}
            </Typography>
          </div>
          <Typography
            variant="body2"
            color="textSecondary"
            component="div"
            style={{
              maxHeight: descriptionMaxHeight,
              overflowY: 'auto',
              paddingRight: 16, // to account for scrollbar width and avoid content jumping
            }}
          >
            {product.description}
            {!isExpanded && (
              <Button onClick={toggleExpanded} size="small">
                {product.description.length > 100 ? 'Show more' : 'Show less'}
              </Button>
            )}
          </Typography>
        </CardContent>
      </CardActionArea>
     
      <div style={{ position: 'relative', bottom: 8, left: 8, width:5 , display: 'flex', alignItems: 'flex-start'  }}>
        <CardActions style={{ padding: 0 }}>
          <Button onClick={navigateToProduct} variant="contained" size="small" color="primary">
            BUY
          </Button>
          <>
          {userRoles.includes('ADMIN') && (
            <IconButton aria-label="Edit" color="primary" onClick={handleModify}> <EditIcon /> </IconButton>
          )}
          {userRoles.includes('ADMIN') && (
            <IconButton aria-label="Delete" color="secondary" onClick={handleDelete}> <DeleteIcon />  </IconButton>
          )}
          </>
        </CardActions>
        
      </div>
      
    </Card>
  );
}
