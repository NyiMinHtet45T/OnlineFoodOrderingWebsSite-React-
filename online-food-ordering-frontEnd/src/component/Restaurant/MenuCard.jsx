
import ExpandMore from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../State/Cart/Thunk';
import { reciveMessageSuccess } from '../State/MessageReducer';

export default function MenuCard() {

  const foodList = useSelector(state => state.food.foodList);

  const [ingredient, setIngredient] = useState([]);

  const userId = useSelector(state => state.auth.user?.id);

  const dispatch = useDispatch();

  const handleCheckBoxChange = (value) => {
    if (!ingredient.includes(value)) {
      setIngredient((pre) => [...pre, value])
    } else {
      setIngredient(pre => {
        const filterArr = pre.filter(item => item !== value);
        return [...filterArr];
      });
    }
  }

  const handleAddToCart = (foodId, price) => {
    if (userId) {
      const cartItem = { "quantity": 1, "totalPrice": price, "ingredients": ingredient, "foodId": foodId };
      dispatch(addToCart(userId, cartItem));
    }else {
      dispatch(reciveMessageSuccess("Login First Pls!"))
    }
  }

  return (
    <div>
      {
        foodList.map(food => (
          <>
            <Accordion key={food.id} className='mt-4'>
              <AccordionSummary expandIcon={<ExpandMore />}
                aria-controls='panel1-content'
                id="panel1-header">
                <div className="lg:flex items-center justify-between">
                  <div className='lg:flex items-center lg:gap-5'>
                    <img src={`/imgae/dishes/${food.images}`} className='w-[7rem] h-[7rem] object-cover' alt="" />
                    <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
                      <p className="font-semibold text-xl">{food.name}</p>
                      <p className='text-green-600 font-extrabold'>{food.price}Ks</p>
                      <p className="text-gray-400 text-sm">{food.description}</p>
                    </div>
                  </div>
                </div>

              </AccordionSummary>
              <AccordionDetails>
                <form action="" className=''>
                  <div className="flex gap-5 flex-wrap">
                    {
                      food.ingredientCategoryAndItemName.map(category => (
                        <div key={category.id}>
                          <p>{category.categoryName}</p>
                          <FormGroup>
                            {
                              category.ingredientsItemDtoList.map(item => (
                                <FormControlLabel disabled={item.inStoke ? false : true} control={<Checkbox />} onChange={() => handleCheckBoxChange(item.name)} label={item.name} />
                              ))
                            }
                          </FormGroup>
                        </div>
                      ))
                    }
                  </div>
                  <div className='mt-2 pt-5'>
                    <Button variant={food.available ? "contained" : "outlined"}
                      color={food.available ? "success" : "error"}
                      disabled={food.available ? false : true} onClick={() => food.available ? handleAddToCart(food.id, food.price) : ""}>
                      {food.available ? "Add To Cart" : "Out Of Stock"}
                    </Button>
                  </div>
                </form>
              </AccordionDetails>
            </Accordion>
          </>
        ))
      }
    </div>
  )
}
