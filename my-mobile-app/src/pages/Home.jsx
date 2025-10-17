import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import homeIcon from "../assets/home.png";
import menuIcon from "../assets/menu.png";
import cartIcon from "../assets/cart.png";
import orderIcon from "../assets/order.png";
import personIcon from "../assets/profile.png";
import notiIcon from "../assets/not.png";
import heartIcon from "../assets/heart.png";
import searchIcon from "../assets/search.png";
import todayPic1 from "../assets/t1.png";
import todayPic2 from "../assets/t2.png";
import todayPic3 from "../assets/t3.png";
import todayPic4 from "../assets/t4.png";
import todayPic5 from "../assets/t5.png";
import todayPic6 from "../assets/car1.png";
import splashBg from "../assets/splash.png";
import cat1 from "../assets/cat1.png";
import cat2 from "../assets/cat2.png";
import cat3 from "../assets/cat3.png";
import cat4 from "../assets/cat4.png";
import cat5 from "../assets/cat5.png";
import cat6 from "../assets/cat6.png";
import reco1 from "../assets/reco.png";
import dish1 from "../assets/dish1.png";
import dish2 from "../assets/dish2.png";
import dish3 from "../assets/dish3.png";
import dish4 from "../assets/dish4.png";
import dish5 from "../assets/dish5.png";
import rice from "../assets/rice.png";
import vegetable from "../assets/vegetable.png";
import drink from "../assets/drink.png";
import axios from "axios";
import { menuAPI, authAPI, storage } from "../lib/api";


export default function BottomBar() {

  const [firstName, setFirstName] = useState("Guest");

    useEffect(() => {
      const fetchUser = async () => {
        try {
          // Try local user first
          const localUser = storage.getUser();
          if (localUser?.fullName) {
            const first = localUser.fullName.split(" ")[0];
            setFirstName(first);
          }

          // Then try fetching the most recent user data from backend
          const user = await authAPI.getCurrentUser();
          if (user?.fullName) {
            const first = user.fullName.split(" ")[0];
            setFirstName(first);
            storage.setUser(user); // refresh stored user data
          }
        } catch (err) {
          console.warn("Failed to fetch user info:", err);
        }
      };

      fetchUser();
    }, []);

  const navigate = useNavigate();
  const [notificationCount] = useState(3);
  const [heartCount] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [showBottomBar, setShowBottomBar] = useState(true);
  const [popupMealIndex, setPopupMealIndex] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedDishes, setSelectedDishes] = useState([]); 
  const [selectAllSelected, setSelectAllSelected] = useState([false, false, false]);
  const scrollRef = useRef(null);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const st = scrollRef.current.scrollTop;
      setShowBottomBar(st <= lastScrollTop.current);
      lastScrollTop.current = st <= 0 ? 0 : st;
    };
    const scrollEl = scrollRef.current;
    scrollEl.addEventListener("scroll", handleScroll);
    return () => scrollEl.removeEventListener("scroll", handleScroll);
  }, []);

  const items = [
    { icon: homeIcon, onClick: () => navigate("/home"), filter: "brightness(0) saturate(100%) invert(35%) sepia(72%) saturate(454%) hue-rotate(53deg) brightness(95%) contrast(93%)", iconSize: "6vw" },
    { icon: menuIcon, onClick: () => navigate("/home"), filter: "invert(0%)", iconSize: "6vw" },
    { icon: cartIcon, onClick: () => navigate("/cart"), filter: "invert(0%) brightness(0%)", iconSize: "6vw" },
    { icon: orderIcon, onClick: () => navigate("/home"), filter: "invert(0%)", iconSize: "6vw" },
    { icon: personIcon, onClick: () => navigate("/profile"), filter: "invert(0%) brightness(0%)", iconSize: "6vw" },
  ];

  const [todayItems, setTodayItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const items = await menuAPI.getAllItems();
        setTodayItems(items);
      } catch (err) {
        console.error("Failed to fetch menu items:", err);
      }
    };
    fetchItems();
  }, []);

  const valueMeals = [
    { name: "VM 1", price: "Php 55" },
    { name: "VM 2", price: "Php 70" },
    { name: "VM 3", price: "Php 70" },
    { name: "VM 4", price: "Php 85" },
  ];
  const [dbCategories, setDbCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesFromDB = await menuAPI.getCategories();
        setDbCategories(categoriesFromDB);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const iconCategories = [
    { label: "Budget Snacks", icon: cat1 },
    { label: "Snacks", icon: cat2 },
    { label: "Value Meals", icon: cat3 },
    { label: "Packed Meals", icon: cat4 },
    { label: "Short Orders", icon: cat5 },
    { label: "Buffet", icon: cat6 },
  ];

  // Merge icons with backend data (matching by name or index)
  const mergedCategories = dbCategories.map((cat, idx) => ({
    ...cat,
    icon: iconCategories[idx]?.icon || "/default-icon.png",
  }));

  const toggleDishSelection = (dishIndex) => {
    if (popupMealIndex === 0 || popupMealIndex === 1) {
      setSelectedDishes(selectedDishes[0] === dishIndex ? [] : [dishIndex]);
    } 
    else if (popupMealIndex === 2 || popupMealIndex === 3) { 
      if (selectedDishes.includes(dishIndex)) {
        setSelectedDishes(selectedDishes.filter(i => i !== dishIndex));
      } else if (selectedDishes.length < 2) {
        setSelectedDishes([...selectedDishes, dishIndex]);
      }
    }
  };

  const dishList = [
    { name: "Chicken\nCurry", img: dish1 },
    { name: "Chicken\nTeriyaki", img: dish2 },
    { name: "Chicken\nFingers", img: dish3 },
    { name: "Fish Pater", img: dish4 },
    { name: "Minced Pork", img: dish5 },
  ];

  let isDishSelectionValid = false;
  if (popupMealIndex === 0 || popupMealIndex === 1) {
      isDishSelectionValid = selectedDishes.length === 1;
  } else if (popupMealIndex === 2 || popupMealIndex === 3) {
      isDishSelectionValid = selectedDishes.length === 2;
  }

  const canAddToCart = isDishSelectionValid && (
    popupMealIndex === 0 || popupMealIndex === 2 
    ? selectAllSelected.slice(0, 2).every(Boolean) 
    : selectAllSelected.every(Boolean)
  );

  const [selectedItem, setSelectedItem] = useState(null); // 🔹 for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const items = await menuAPI.getAllItems();
        setTodayItems(items);
      } catch (err) {
        console.error("Failed to fetch menu items:", err);
      }
    };
    fetchItems();
  }, []);

  // 🔹 Add to cart (stored in localStorage for now)
  const handleAddToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Normalize ID and image field
    const itemId = item.id || item._id;
    const image = item.image || item.imageUrl || "";

    // Check if item already exists in cart
    const existingItem = cart.find(
      (i) => i.id === itemId || i._id === itemId
    );

    if (existingItem) {
      existingItem.quantity += item.quantity || 1;
    } else {
      cart.push({
        ...item,
        id: itemId, // ensure consistent key
        image,      // ensure correct image field
        quantity: item.quantity || 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setIsModalOpen(false);
    alert(`${item.name} has been added to your cart!`);
  };

  return (
    <div style={{ position: "relative", width: "100%", minHeight: "100vh" }}>
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        `}
      </style>

      {/* Background and Headers (unchanged) */}
      <div 
        style={{ 
          position: "absolute", top: 0, left: 0, width: "100%", height: "50vh",
          backgroundImage: `linear-gradient(rgba(54,87,10,0.8), rgba(54,87,10,0.9)), url(${splashBg})`,
          backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", zIndex: 0 
        }} 
      />

      <div style={{ position: "fixed", top: "20vh", left: "6%", right: "5%", display: "flex", flexDirection: "column", zIndex: 9999 }}>
        <p style={{ fontSize: "24px", fontFamily: "Poppins, sans-serif", fontWeight: "800", color: "#FFFFFF", marginBottom: "-3px" }}>Hello there, {firstName}!</p>
        <p style={{ fontSize: "11px", fontFamily: "Poppins, sans-serif", fontWeight: "600", color: "#FFFFFF", marginTop: "-1px" }}>Let's find a best food match for you</p>
      </div>

      <form onSubmit={(e)=>{e.preventDefault(); alert(`You searched for: ${searchQuery}`);}}
        style={{ position: "fixed", left: "50%", top: "11vh", transform: "translateX(-50%)", width: "90%", maxWidth: "370px", height: "35px", backgroundColor: "#FFF", border: "1px solid #36570A", borderRadius: "20px", display: "flex", alignItems: "center", zIndex: 9999 }}>
        <img src={searchIcon} alt="Search" style={{ marginLeft: "12px", width: "18px", height: "18px", filter: "brightness(0) saturate(100%)", cursor: "pointer" }} onClick={()=>alert(`Search for: ${searchQuery}`)} />
        <input type="text" placeholder="Have an exact order in mind?" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} style={{ marginLeft:"12px", width:"100%", fontSize:"12px", fontFamily:"Poppins, sans-serif", fontWeight:"400", color:"#4A4A4A", border:"none", outline:"none", background:"transparent" }} />
      </form>

      {/* Scrollable White Container (unchanged) */}
      <div ref={scrollRef} className="hide-scrollbar" style={{ position:"absolute", top:"29.5vh", left:0, right:0, bottom:0, backgroundColor:"#FFF", borderTopLeftRadius:"3%", borderTopRightRadius:"3%", padding:"20px", overflowY:"auto", zIndex:2 }}>
        {/* Today's Specials */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"15px" }}>
          <p style={{ fontSize:"16px", fontWeight:"600", color:"#000" }}>What's Available Today</p>
          <p style={{ fontSize:"13px", fontWeight:"400", color:"#36570A", margin:0, cursor:"pointer", textDecoration:"underline" }} onClick={()=>alert("See All Today’s Specials")}>See More</p>
        </div>
        <div style={{ display:"flex", overflowX:"auto", gap:"15px", paddingBottom:"20px" }} className="hide-scrollbar">
          {todayItems.length > 0 ? ( todayItems.map((item) => (
              <div key={item.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, }}>
                <img src={item.photoUrl || "/placeholder-food.png"} // fallback if no photo
                  alt={item.name} style={{ width: "140px", height: "140px", borderRadius: "12px", objectFit: "cover", cursor: "pointer", }} onClick={() => { setSelectedItem(item); setIsModalOpen(true); }} />
                <p style={{ marginTop: "5px", fontSize: "12px", fontWeight: "500", color: "#000", }}> {item.name} </p>
                <p style={{ fontSize: "11px", color: "#555" }}> ₱{Number(item.price)} </p>
              </div>
            ))) : ( <p style={{ color: "#999" }}>No items available today.</p> )}
        </div>

        {isModalOpen && selectedItem && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 99999,
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                width: "80%",
                maxWidth: "350px",
                padding: "20px",
                textAlign: "center",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              }}
            >
              <img
                src={selectedItem.photoUrl || "/placeholder-food.png"}
                alt={selectedItem.name}
                style={{
                  width: "100%",
                  height: "180px",
                  borderRadius: "8px",
                  objectFit: "cover",
                  marginBottom: "15px",
                }}
              />
              <h3 style={{ fontSize: "18px", marginBottom: "5px" }}>
                {selectedItem.name}
              </h3>
              <p style={{ fontSize: "14px", color: "#666", marginBottom: "10px" }}>
                ₱{Number(selectedItem.price).toFixed(2)}
              </p>
              {/* Quantity Selector */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "15px",
                }}
              >
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    border: "1px solid #36570A",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  −
                </button>
                <span
                  style={{
                    margin: "0 12px",
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    border: "1px solid #36570A",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  +
                </button>
              </div>
              {/* Modal Buttons */}
              <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                <button
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    flex: 1,
                    padding: "8px",
                    backgroundColor: "#ccc",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleAddToCart({ ...selectedItem, quantity })}
                  style={{
                    flex: 1,
                    padding: "8px",
                    backgroundColor: "#36570A",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Value Meals */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"15px", marginTop:"10px" }}>
          <p style={{ fontSize:"16px", fontWeight:"600", color:"#000" }}>Value Meals</p>
        </div>
        <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", marginTop:"8px" }}>
          {valueMeals.map((meal,index)=>(
            <button 
                key={index} 
                onClick={()=>{
                    setPopupMealIndex(index); 
                    setQuantity(1); 
                    setSelectedDishes([]);
                    setSelectAllSelected([false, false, false]);
                }} 
                style={{ padding:"15px", borderRadius:"10px", border:"1px solid #36570A", backgroundColor:"#fff", color:"#000", fontWeight:"400", cursor:"pointer", flex:"1 1 40%", textAlign:"center", whiteSpace:"pre-line", lineHeight:"1.2", fontSize:"14px" }}
            >
              {meal.name + "\n" + meal.price}
            </button>
          ))}
        </div>

        {/* Categories, Recommendations, etc. (unchanged) */}
        <div style={{ marginTop: "33px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"15px" }}>
            <p style={{ fontSize:"16px", fontWeight:"600", color:"#000" }}>Categories</p>
            <p style={{ fontSize:"13px", fontWeight:"400", color:"#36570A", margin:0, cursor:"pointer", textDecoration:"underline" }} onClick={()=>alert("See All Categories")}>See More</p>
          </div>
          <div style={{ display:"flex", overflowX:"auto", gap:"13px", paddingBottom:"20px" }} className="hide-scrollbar">
            {mergedCategories.map((item, index) => (
              <div key={index} style={{ display:"flex", flexDirection:"column", alignItems:"center", flexShrink:0 }}>
                <div style={{ width:"90px", height:"90px", backgroundColor:"#F3F3F3", borderRadius:"10px", cursor:"pointer", display:"flex", justifyContent:"center", alignItems:"center" }} onClick={()=>alert(`Clicked ${item.label}`)}>
                  <img src={item.icon} alt={item.label} style={{ width:"40px", height:"40px" }} />
                </div>
                <p style={{ marginTop:"9px", fontSize:"12px", fontWeight:"600", color:"#36570A", textAlign:"center", whiteSpace:"pre-line" }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "20px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"15px" }}>
            <p style={{ fontSize:"16px", fontWeight:"600", color:"#000" }}>Our Recommendations</p>
          </div>
          <div style={{ display:"flex", overflowX:"auto", gap:"10px" }} className="hide-scrollbar">
            <img src={reco1} alt="Recommendation 1" style={{ width:"100%", maxWidth:"366px", height:"134px", borderRadius:"12px", cursor:"pointer" }} onClick={()=>alert("Clicked Recommendation")} />
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:"12px", marginTop:"15px" }}>
            {[1,2,3,4,5].map((i)=>(
              <img key={i} src={reco1} alt={`Recommendation ${i}`} style={{ width:"100%", maxWidth:"366px", height:"134px", borderRadius:"12px", cursor:"pointer" }} onClick={()=>alert(`Clicked Recommendation ${i}`)} />
            ))}
          </div>
        </div>
      </div>

      {/* Popup */}
      {popupMealIndex !== null && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 10000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "15px",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "400px",
              maxHeight: "90%",
              backgroundColor: "#FFF",
              borderRadius: "12px",
              padding: "20px",
              position: "relative",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
            className="hide-scrollbar" 
          >
            {/* Close Button */}
            <button
              onClick={() => setPopupMealIndex(null)}
              style={{
                position: "absolute",
                top: "15px",
                right: "10px",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "none",
                fontWeight: "900",
                fontSize: "18px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ×
            </button>

            {/* Meal Name & Price */}
            <p
              style={{
                fontSize: "20px",
                fontWeight: "600",
                textAlign: "center",
                color: "#36570A",
                margin: "40px 0 10px",
              }}
            >
              {valueMeals[popupMealIndex].name}: {valueMeals[popupMealIndex].price}
            </p>


            {/* VALUE MEAL 1 POPUP (Choose 1 Dish) - unchanged */}
            {popupMealIndex === 0 && (
              <>
                <p style={{ fontSize: "14px", fontWeight: "600", color: "black", margin: "0 0 7px" }}>
                  • Choose 1 Dish
                </p>
                <div
                  style={{ display: "flex", overflowX: "auto", gap: "15px", paddingBottom: "10px" }}
                  className="hide-scrollbar"
                >
                  {dishList.map((dish, index) => (
                    <div
                      key={index}
                      onClick={() => toggleDishSelection(index)}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        flexShrink: 0,
                        cursor: "pointer",
                        border: selectedDishes.includes(index) ? "2px solid #36570A" : "2px solid transparent",
                        borderRadius: "5px",
                        padding: "2px",
                      }}
                    >
                      <div
                        style={{
                          width: "72px",
                          height: "80px",
                          backgroundColor: "white",
                          borderRadius: "5px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img src={dish.img} alt={dish.name} style={{ width: "67px", height: "75px" }} />
                      </div>
                      <p
                        style={{
                          marginTop: "5px",
                          fontSize: "12px",
                          fontWeight: "500",
                          textAlign: "center",
                          whiteSpace: "pre-line",
                        }}
                      >
                        {dish.name}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Select All Section (VM 1 - Rice and Veg) */}
                <p style={{ fontSize: "14px", fontWeight: "600", color: "black", margin: "15px 0 7px" }}>
                  • Select All
                </p>
                <div style={{ display: "flex", gap: "15px", paddingBottom: "10px" }}>
                  {[{ name: "Rice", img: rice }, { name: "Vegetable", img: vegetable }].map(
                    (item, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          const newSelection = [...selectAllSelected];
                          newSelection[index] = !newSelection[index];
                          setSelectAllSelected(newSelection);
                        }}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          flexShrink: 0,
                          cursor: "pointer",
                          border: selectAllSelected[index]
                            ? "2px solid #36570A"
                            : "2px solid transparent",
                          borderRadius: "5px",
                          padding: "2px",
                        }}
                      >
                        <div
                          style={{
                            width: "72px",
                            height: "80px",
                            backgroundColor: "white",
                            borderRadius: "5px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <img src={item.img} alt={item.name} style={{ width: "67px", height: "75px" }} />
                        </div>
                        <p
                          style={{
                            marginTop: "5px",
                            fontSize: "12px",
                            fontWeight: "500",
                            textAlign: "center",
                          }}
                        >
                          {item.name}
                        </p>
                      
                      </div>
                    )
                  )}
                </div>
              </>
            )}


            {/* VALUE MEAL 2 POPUP (Choose 1 Dish + Drink) - unchanged */}
            {popupMealIndex === 1 && (
              <>
                <p style={{ fontSize: "14px", fontWeight: "600", color: "black", margin: "0 0 7px" }}>
                  • Choose 1 Dish
                </p>
                <div
                  style={{ display: "flex", overflowX: "auto", gap: "15px", paddingBottom: "10px" }}
                  className="hide-scrollbar"
                >
                  {dishList.map((dish, index) => (
                    <div
                      key={index}
                      onClick={() => toggleDishSelection(index)}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        flexShrink: 0,
                        cursor: "pointer",
                        border: selectedDishes.includes(index) ? "2px solid #36570A" : "2px solid transparent",
                        borderRadius: "5px",
                        padding: "2px",
                      }}
                    >
                      <div
                        style={{
                          width: "72px",
                          height: "80px",
                          backgroundColor: "white",
                          borderRadius: "5px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img src={dish.img} alt={dish.name} style={{ width: "67px", height: "75px" }} />
                      </div>
                      <p
                        style={{
                          marginTop: "5px",
                          fontSize: "12px",
                          fontWeight: "500",
                          textAlign: "center",
                          whiteSpace: "pre-line",
                        }}
                      >
                        {dish.name}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Select All Section (VM 2 - Rice, Veg, and Drink) */}
                <p style={{ fontSize: "14px", fontWeight: "600", color: "black", margin: "15px 0 7px" }}>
                  • Select All
                </p>
                <div style={{ display: "flex", gap: "15px", paddingBottom: "10px" }}>
                  {/* This includes the Drink item (index 2) */}
                  {[{ name: "Rice", img: rice }, { name: "Vegetable", img: vegetable }, { name: "Drink", img: drink }].map(
                    (item, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          const newSelection = [...selectAllSelected];
                          newSelection[index] = !newSelection[index];
                          setSelectAllSelected(newSelection);
                        }}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          flexShrink: 0,
                          cursor: "pointer",
                          border: selectAllSelected[index]
                            ? "2px solid #36570A"
                            : "2px solid transparent",
                          borderRadius: "5px",
                          padding: "2px",
                        }}
                      >
                        <div
                          style={{
                            width: "72px",
                            height: "80px",
                            backgroundColor: "white",
                            borderRadius: "5px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <img src={item.img} alt={item.name} style={{ width: "67px", height: "75px" }} />
                        </div>
                        <p
                          style={{
                            marginTop: "5px",
                            fontSize: "12px",
                            fontWeight: "500",
                            textAlign: "center",
                          }}
                        >
                          {item.name}
                        </p>
                      
                      </div>
                    )
                  )}
                </div>
              </>
            )}

            {/* VALUE MEAL 3 POPUP (index == 2, Choose 2 Dishes, Rice & Veg) - unchanged */}
            {popupMealIndex === 2 && (
              <>
                <p style={{ fontSize: "14px", fontWeight: "600", color: "black", margin: "0 0 7px" }}>
                  • Choose 2 Dishes
                </p>
                <div
                  style={{ display: "flex", overflowX: "auto", gap: "15px", paddingBottom: "10px" }}
                  className="hide-scrollbar"
                >
                  {dishList.map((dish, index) => (
                    <div
                      key={index}
                      onClick={() => toggleDishSelection(index)}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        flexShrink: 0,
                        cursor: "pointer",
                        border: selectedDishes.includes(index) ? "2px solid #36570A" : "2px solid transparent",
                        borderRadius: "5px",
                        padding: "2px",
                      }}
                    >
                      <div
                        style={{
                          width: "72px",
                          height: "80px",
                          backgroundColor: "white",
                          borderRadius: "5px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img src={dish.img} alt={dish.name} style={{ width: "67px", height: "75px" }} />
                      </div>
                      <p
                        style={{
                          marginTop: "5px",
                          fontSize: "12px",
                          fontWeight: "500",
                          textAlign: "center",
                          whiteSpace: "pre-line",
                        }}
                      >
                        {dish.name}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Select All Section (VM 3 - Rice and Veg) */}
                <p style={{ fontSize: "14px", fontWeight: "600", color: "black", margin: "15px 0 7px" }}>
                  • Select All
                </p>
                <div style={{ display: "flex", gap: "15px", paddingBottom: "10px" }}>
                  {[{ name: "Rice", img: rice }, { name: "Vegetable", img: vegetable }].map(
                    (item, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          const newSelection = [...selectAllSelected];
                          newSelection[index] = !newSelection[index];
                          setSelectAllSelected(newSelection);
                        }}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          flexShrink: 0,
                          cursor: "pointer",
                          border: selectAllSelected[index]
                            ? "2px solid #36570A"
                            : "2px solid transparent",
                          borderRadius: "5px",
                          padding: "2px",
                        }}
                      >
                        <div
                          style={{
                            width: "72px",
                            height: "80px",
                            backgroundColor: "white",
                            borderRadius: "5px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <img src={item.img} alt={item.name} style={{ width: "67px", height: "75px" }} />
                        </div>
                        <p
                          style={{
                            marginTop: "5px",
                            fontSize: "12px",
                            fontWeight: "500",
                            textAlign: "center",
                          }}
                        >
                          {item.name}
                        </p>
                      
                      </div>
                    )
                  )}
                </div>
              </>
            )}
            
            {/* VALUE MEAL 4 POPUP (index == 3, Choose 2 Dishes, Rice, Veg, & Drink) */}
            {popupMealIndex === 3 && (
              <>
                <p style={{ fontSize: "14px", fontWeight: "600", color: "black", margin: "0 0 7px" }}>
                  • Choose 2 Dishes
                </p>
                <div
                  style={{ display: "flex", overflowX: "auto", gap: "15px", paddingBottom: "10px" }}
                  className="hide-scrollbar"
                >
                  {dishList.map((dish, index) => (
                    <div
                      key={index}
                      onClick={() => toggleDishSelection(index)}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        flexShrink: 0,
                        cursor: "pointer",
                        border: selectedDishes.includes(index) ? "2px solid #36570A" : "2px solid transparent",
                        borderRadius: "5px",
                        padding: "2px",
                      }}
                    >
                      <div
                        style={{
                          width: "72px",
                          height: "80px",
                          backgroundColor: "white",
                          borderRadius: "5px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img src={dish.img} alt={dish.name} style={{ width: "67px", height: "75px" }} />
                      </div>
                      <p
                        style={{
                          marginTop: "5px",
                          fontSize: "12px",
                          fontWeight: "500",
                          textAlign: "center",
                          whiteSpace: "pre-line",
                        }}
                      >
                        {dish.name}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Select All Section (VM 4 - Rice, Veg, and Drink - same as VM 2) */}
                <p style={{ fontSize: "14px", fontWeight: "600", color: "black", margin: "15px 0 7px" }}>
                  • Select All
                </p>
                <div style={{ display: "flex", gap: "15px", paddingBottom: "10px" }}>
                  {/* This includes the Drink item (index 2) */}
                  {[{ name: "Rice", img: rice }, { name: "Vegetable", img: vegetable }, { name: "Drink", img: drink }].map(
                    (item, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          const newSelection = [...selectAllSelected];
                          newSelection[index] = !newSelection[index];
                          setSelectAllSelected(newSelection);
                        }}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          flexShrink: 0,
                          cursor: "pointer",
                          border: selectAllSelected[index]
                            ? "2px solid #36570A"
                            : "2px solid transparent",
                          borderRadius: "5px",
                          padding: "2px",
                        }}
                      >
                        <div
                          style={{
                            width: "72px",
                            height: "80px",
                            backgroundColor: "white",
                            borderRadius: "5px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <img src={item.img} alt={item.name} style={{ width: "67px", height: "75px" }} />
                        </div>
                        <p
                          style={{
                            marginTop: "5px",
                            fontSize: "12px",
                            fontWeight: "500",
                            textAlign: "center",
                          }}
                        >
                          {item.name}
                        </p>
                      
                      </div>
                    )
                  )}
                </div>
              </>
            )}


            {/* Quantity + Add to Cart (unchanged) */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                marginTop: "auto",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button
                  onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
                  style={{ border: "none", background: "transparent", cursor: "pointer", fontSize: "18px" }}
                >
                  –
                </button>
                <span style={{ fontWeight: "600", fontSize: "14px", minWidth: "20px", textAlign: "center" }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  style={{ border: "none", background: "transparent", cursor: "pointer", fontSize: "18px" }}
                >
                  +
                </button>
              </div>
              <button
                onClick={() =>
                  alert(
                    `${quantity} x ${valueMeals[popupMealIndex].name} added to Cart`
                  )
                }
                disabled={!canAddToCart}
                style={{
                  flex: 1,
                  height: "35px",
                  borderRadius: "5px",
                  backgroundColor: canAddToCart ? "#36570A" : "#ccc",
                  color: "white",
                  fontWeight: "600",
                  fontSize: "12px",
                  cursor: canAddToCart ? "pointer" : "not-allowed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Heart & Notifications, Bottom Bar (unchanged) */}
      <div style={{ position:"fixed", top:"5vh", right:"5%", display:"flex", alignItems:"center", zIndex:9999 }}>
        <div style={{ position:"relative", width:"26px", height:"26px", marginRight:"15px", cursor:"pointer" }} onClick={()=>alert("Go to Favorites")}>
          <img src={heartIcon} alt="Heart" style={{ width:"23px", height:"23px", filter:"invert(100%) brightness(150%)" }} />
          <div style={{ position:"absolute", top:"-6px", right:"-3px", width:"16px", height:"16px", borderRadius:"50%", backgroundColor:"#FFFFFF", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"10px", fontWeight:"bold", color:"#000000" }}>{heartCount}</div>
        </div>

        <div style={{ position:"relative", width:"26px", height:"26px", cursor:"pointer" }} onClick={()=>alert("Go to Notifications")}>
          <img src={notiIcon} alt="Notifications" style={{ width:"24px", height:"24px", filter:"invert(100%) brightness(150%)" }} />
          <div style={{ position:"absolute", top:"-6px", right:"-3px", width:"16px", height:"16px", borderRadius:"50%", backgroundColor:"#FFFFFF", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"10px", fontWeight:"bold", color:"#000000" }}>{notificationCount}</div>
        </div>
      </div>

      {showBottomBar && (
        <div style={{ position:"fixed", bottom:"0px", left:"0px", right:"0px", height:"67px", borderTop:"0.8px solid #CECECE", backgroundColor:"#fff", display:"flex", justifyContent:"space-around", alignItems:"center", zIndex:9999 }}>
          {items.map((item,index)=>(
            <img key={index} src={item.icon} alt={`icon-${index}`} onClick={item.onClick} style={{ width:item.iconSize, height:item.iconSize, filter:item.filter, cursor:"pointer" }} />
          ))}
        </div>
      )}
    </div>

    
  );
}