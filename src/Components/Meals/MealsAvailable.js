import React, { useEffect, useState } from "react";
import MealItem from "./MealItem/MealItem";
import classes from "./MealsAvailable.module.css";
import Card from "../UI/Card";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

const MealsAvailable = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

   
  //     const fetchData = async () => {
  //       const response = await fetch(
  //         "https://food-order-database-fb5fc-default-rtdb.firebaseio.com/meals"
  //       );
  //       if (!response.ok) {
         
  //         throw new Error("Failed to fetch the list");
  //       }
  //       const data = await response.json();
  //       const loadedMeals = [];

  //       for (const item in data) {
  //         loadedMeals.push({
  //           id: item,
  //           name: data[item].name,
  //           description: data[item].description,
  //           price: data[item].price,
  //         });
  //       }
  //       setMeals(loadedMeals);
  //       setIsLoading(false);
  //       setError(false);
  //     };
  //      try {
  //     fetchData();
  //   } catch (e) {
  //     setError(e.message);
  //     setIsLoading(false);
  //   }
  // }, []);
 useEffect(() => {
   const fetchData = async () => {
     try {
       const response = await fetch(
         "https://food-order-database-fb5fc-default-rtdb.firebaseio.com/meals.json"
       );

       if (!response.ok) {
         throw new Error("Failed to fetch the list");
       }

       const data = await response.json();
       const loadedMeals = [];

       for (const item in data) {
         loadedMeals.push({
           id: item,
           name: data[item].name,
           description: data[item].description,
           price: data[item].price,
         });
       }

       setMeals(loadedMeals);
       setIsLoading(false);
       setError(null); 
     } catch (e) {
       setError(e.message);
      //  console.log(e.message);
       setIsLoading(false);
     }
   };

   fetchData();
 }, []);

  const mealsList = meals.map((meal) => <MealItem meal={meal} key={meal.id} />);

  if(isLoading){
    return <section className={classes.meals}>
      <p className={classes.loading}>Loading....</p>
    </section>;
  }
  if(error){
     return <section className={classes.meals}>
       <p className={classes.error}>*Error occurred! {error}</p>
     </section>;
  }
  
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default MealsAvailable;



//  {
//    /* {error && <p className={classes.error}>*Error occurred! {error}</p>}
//       {isLoading ? (
//         <p className={classes.loading}>Loading....</p>
//         ) : (
//           <Card>
//           <ul>{mealsList}</ul>
//         </Card>
//       )} */
//  }