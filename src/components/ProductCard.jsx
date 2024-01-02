import React  from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import './ProductsPage.css'
import { useNavigate } from 'react-router-dom';


export default function ProductCard ({ product }) {
  const navigate = useNavigate();
  const navigateToProduct = () => {
    navigate('/productDetails', { state: { product } });
  };
    
      return (
        <Card sx={{ maxWidth: 345, height:50}}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt={product.title}
              sx={{height:50}}
              image={product.imageUrl}
              title={product.name}
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
            <Button  onClick={navigateToProduct} size="small" color="primary">
              BUY
            </Button>
          </CardActions>
        </Card>
      );
    
  
}
