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

export default function BottomBar() {
  const navigate = useNavigate();
  const [notificationCount] = useState(3);
  const [heartCount] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [showBottomBar, setShowBottomBar] = useState(true);
  const [popupMealIndex, setPopupMealIndex] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedDish, setSelectedDish] = useState(null); // null = nothing selected
  const [selectAllSelected, setSelectAllSelected] = useState([false, false, false]); // three items

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

  const todayItems = [todayPic1, todayPic2, todayPic3, todayPic4, todayPic5, todayPic6];
  const valueMeals = [
    { name: "VM 1", price: "Php 55" },
    { name: "VM 2", price: "Php 70" },
    { name: "VM 3", price: "Php 70" },
    { name: "VM 4", price: "Php 85" },
  ];

  const categories = [
    { label: "Budget\nSnacks", icon: cat1 },
    { label: "Snacks", icon: cat2 },
    { label: "Value\nMeals", icon: cat3 },
    { label: "Packed\nMeals", icon: cat4 },
    { label: "Short\nOrders", icon: cat5 },
    { label: "Buffet", icon: cat6 },
  ];

  // Check if Add to Cart can be clicked
  const canAddToCart = selectedDish !== null && (
    popupMealIndex === 0 ? selectAllSelected.slice(0, 2).every(Boolean) : selectAllSelected.every(Boolean)
  );

  return (
    <div style={{ position: "relative", width: "100%", minHeight: "100vh" }}>
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        `}
      </style>

      {/* Background */}
      <div 
        style={{ 
          position: "absolute", top: 0, left: 0, width: "100%", height: "50vh",
          backgroundImage: `linear-gradient(rgba(54,87,10,0.8), rgba(54,87,10,0.9)), url(${splashBg})`,
          backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", zIndex: 0 
        }} 
      />

      {/* Greeting */}
      <div style={{ position: "fixed", top: "20vh", left: "6%", right: "5%", display: "flex", flexDirection: "column", zIndex: 9999 }}>
        <p style={{ fontSize: "24px", fontFamily: "Poppins, sans-serif", fontWeight: "800", color: "#FFFFFF", marginBottom: "-3px" }}>Hello there, Mariel!</p>
        <p style={{ fontSize: "11px", fontFamily: "Poppins, sans-serif", fontWeight: "600", color: "#FFFFFF", marginTop: "-1px" }}>Let's find a best food match for you</p>
      </div>

      {/* Search Bar */}
      <form onSubmit={(e)=>{e.preventDefault(); alert(`You searched for: ${searchQuery}`);}}
        style={{ position: "fixed", left: "50%", top: "11vh", transform: "translateX(-50%)", width: "90%", maxWidth: "370px", height: "35px", backgroundColor: "#FFF", border: "1px solid #36570A", borderRadius: "20px", display: "flex", alignItems: "center", zIndex: 9999 }}>
        <img src={searchIcon} alt="Search" style={{ marginLeft: "12px", width: "18px", height: "18px", filter: "brightness(0) saturate(100%)", cursor: "pointer" }} onClick={()=>alert(`Search for: ${searchQuery}`)} />
        <input type="text" placeholder="Have an exact order in mind?" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} style={{ marginLeft:"12px", width:"100%", fontSize:"12px", fontFamily:"Poppins, sans-serif", fontWeight:"400", color:"#4A4A4A", border:"none", outline:"none", background:"transparent" }} />
      </form>

      {/* Scrollable White Container */}
      <div ref={scrollRef} className="hide-scrollbar" style={{ position:"absolute", top:"29.5vh", left:0, right:0, bottom:0, backgroundColor:"#FFF", borderTopLeftRadius:"6%", borderTopRightRadius:"6%", padding:"20px", overflowY:"auto", zIndex:2 }}>
        {/* Today's Specials */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"15px" }}>
          <p style={{ fontSize:"16px", fontWeight:"600", color:"#000" }}>What's Available Today</p>
          <p style={{ fontSize:"13px", fontWeight:"400", color:"#36570A", margin:0, cursor:"pointer", textDecoration:"underline" }} onClick={()=>alert("See All Today’s Specials")}>See More</p>
        </div>
        <div style={{ display:"flex", overflowX:"auto", gap:"15px", paddingBottom:"20px" }} className="hide-scrollbar">
          {todayItems.map((img,index)=>(
            <div key={index} style={{ display:"flex", flexDirection:"column", alignItems:"center", flexShrink:0 }}>
              <img src={img} alt={`Today ${index+1}`} style={{ width:"140px", height:"140px", borderRadius:"12px", cursor:"pointer" }} onClick={()=>alert(`Clicked item ${index+1}`)} />
              <p style={{ marginTop:"5px", fontSize:"12px", fontWeight:"500", color:"#000" }}>Food {index+1}</p>
            </div>
          ))}
        </div>

        {/* Value Meals */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"15px", marginTop:"10px" }}>
          <p style={{ fontSize:"16px", fontWeight:"600", color:"#000" }}>Value Meals</p>
        </div>
        <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", marginTop:"8px" }}>
          {valueMeals.map((meal,index)=>(
            <button key={index} onClick={()=>{setPopupMealIndex(index); setQuantity(1); setSelectedDish(null)}} style={{ padding:"15px", borderRadius:"10px", border:"1px solid #36570A", backgroundColor:"#fff", color:"#000", fontWeight:"400", cursor:"pointer", flex:"1 1 40%", textAlign:"center", whiteSpace:"pre-line", lineHeight:"1.2", fontSize:"14px" }}>
              {meal.name + "\n" + meal.price}
            </button>
          ))}
        </div>

        {/* Categories */}
        <div style={{ marginTop: "33px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"15px" }}>
            <p style={{ fontSize:"16px", fontWeight:"600", color:"#000" }}>Categories</p>
            <p style={{ fontSize:"13px", fontWeight:"400", color:"#36570A", margin:0, cursor:"pointer", textDecoration:"underline" }} onClick={()=>alert("See All Categories")}>See More</p>
          </div>
          <div style={{ display:"flex", overflowX:"auto", gap:"13px", paddingBottom:"20px" }} className="hide-scrollbar">
            {categories.map((item,index)=>(
              <div key={index} style={{ display:"flex", flexDirection:"column", alignItems:"center", flexShrink:0 }}>
                <div style={{ width:"90px", height:"90px", backgroundColor:"#F3F3F3", borderRadius:"10px", cursor:"pointer", display:"flex", justifyContent:"center", alignItems:"center" }} onClick={()=>alert(`Clicked ${item.label}`)}>
                  <img src={item.icon} alt={item.label} style={{ width:"40px", height:"40px" }} />
                </div>
                <p style={{ marginTop:"9px", fontSize:"12px", fontWeight:"600", color:"#36570A", textAlign:"center", whiteSpace:"pre-line" }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
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

      {/* Single-select Dish */}
      {popupMealIndex === 0 && (
        <>
          <p style={{ fontSize: "14px", fontWeight: "600", color: "black", margin: "0 0 7px" }}>
            • Choose 1 Dish
          </p>
          <div
            style={{ display: "flex", overflowX: "auto", gap: "15px", paddingBottom: "10px" }}
            className="hide-scrollbar"
          >
            {[
              { name: "Chicken\nCurry", img: dish1 },
              { name: "Chicken\nTeriyaki", img: dish2 },
              { name: "Chicken\nFingers", img: dish3 },
              { name: "Fish Pater", img: dish4 },
              { name: "Minced Pork", img: dish5 },
            ].map((dish, index) => (
              <div
                key={index}
                onClick={() => setSelectedDish(index)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flexShrink: 0,
                  cursor: "pointer",
                  border: selectedDish === index ? "2px solid #36570A" : "2px solid transparent",
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

          {/* Select All Section */}
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

      {/* Quantity + Add to Cart */}
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
              `${quantity} x ${valueMeals[popupMealIndex].name}${
                selectedDish !== null ? ` (Dish ${selectedDish + 1})` : ""
              } added to Cart`
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

      {/* Heart & Notifications */}
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

      {/* Bottom Bar */}
      {showBottomBar && (
        <div style={{ position:"fixed", bottom:"0px", left:"0px", right:"0px", height:"67px", borderTop:"0.5px solid #CECECE", backgroundColor:"#fff", display:"flex", justifyContent:"space-around", alignItems:"center", zIndex:9999 }}>
          {items.map((item,index)=>(
            <img key={index} src={item.icon} alt={`icon-${index}`} onClick={item.onClick} style={{ width:item.iconSize, height:item.iconSize, filter:item.filter, cursor:"pointer" }} />
          ))}
        </div>
      )}
    </div>
  );
}
