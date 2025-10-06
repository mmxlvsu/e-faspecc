import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import car1 from "../assets/car1.png";
import trash from "../assets/trash.png";

// Checkbox SVG
const CheckIconSVG = ({ isChecked, style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke={isChecked ? "#36570A" : "#CECECE"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ ...style, cursor: "pointer", transition: "all 0.1s" }}
  >
    <rect x="3.5" y="2" width="20" height="20" rx="2" ry="2"></rect>
    {isChecked && <polyline points="9 11 12 14 20 6" stroke="#36570A" fill="none" />}
  </svg>
);

// Back arrow SVG
const BackIconSVG = ({ style, onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ ...style }}
    onClick={onClick}
  >
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const handleAction = (action) => console.log(`${action} clicked`);

export default function WhiteAndGreenRectangle() {
  const navigate = useNavigate();
  const vw = (pixels) => `${(pixels / 4.14).toFixed(1)}vw`;
  const vh = (pixels) => `${(pixels / 9).toFixed(1)}vh`;
  const responsiveText = (pixels) => `${(pixels / 4.14).toFixed(1)}vw`;

  const [isBottomBarVisible, setIsBottomBarVisible] = useState(true);
  const cartContentRef = useRef(null);
  const [specialInstructions, setSpecialInstructions] = useState("");

  // Cart items
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Chicken Adobo", description: "Classic Filipino chicken stew", quantity: 1, price: 150, image: car1 },
    { id: 2, name: "Fried Rice", description: "Stir-fried rice with veggies", quantity: 2, price: 50, image: car1 },
    { id: 3, name: "Soda", description: "Refreshing carbonated drink", quantity: 1, price: 30, image: car1 },
    { id: 4, name: "Spring Rolls", description: "Crispy rolls with veggies", quantity: 2, price: 70, image: car1 },
    { id: 5, name: "Ice Cream", description: "Sweet frozen dessert", quantity: 1, price: 120, image: car1 },
  ]);

  // Add-ons
  const [addOns, setAddOns] = useState([
    { id: 1, name: "Extra Sauce", price: 10, isChecked: false },
    { id: 2, name: "Extra Toppings", price: 49, isChecked: true },
    { id: 3, name: "Disposable Cutlery", price: 0, isChecked: false },
  ]);

  const handleRemove = (id) => setCartItems(prev => prev.filter(item => item.id !== id));

  const handleToggleAddOn = (id) =>
    setAddOns(prev => prev.map(addOn => addOn.id === id ? { ...addOn, isChecked: !addOn.isChecked } : addOn));

  const selectedAddOnsTotal = addOns.reduce((sum, addOn) => sum + (addOn.isChecked ? addOn.price : 0), 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const grandTotal = subtotal + selectedAddOnsTotal;

  // Hide bottom bar when scrolled to bottom
  const handleScroll = () => {
    const el = cartContentRef.current;
    if (!el) return;
    const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight <= 1;
    setIsBottomBarVisible(!isAtBottom);
  };

  return (
    <div style={{ width: "100%", minHeight: "100vh", position: "relative" }}>
      <BackIconSVG onClick={() => navigate("/home")} style={{ position: "absolute", left: vw(12), top: vh(30), width: vw(24), height: vw(24), cursor: "pointer", zIndex: 3, color: "#000" }} />
      <p style={{ position: "absolute", left: vw(43), top: vh(32), fontSize: responsiveText(14), fontWeight: 600, fontFamily: "Poppins, sans-serif", color: "#000", zIndex: 3 }}>Cart</p>

      {/* Steps */}
      <div style={{ position: "absolute", top: vh(90), left: 0, width: "100%", display: "flex", justifyContent: "center", alignItems: "center", gap: vw(90), zIndex: 2 }}>
        {[{num:1,label:"Menu"},{num:2,label:"Cart"},{num:3,label:"Checkout"}].map((step,index)=>(
          <div key={index} style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
            <div style={{ width: vw(28), height: vw(28), borderRadius:"50%", backgroundColor: step.num<3?"#000":"#CCC", display:"flex", justifyContent:"center", alignItems:"center", color:"#fff", fontWeight:300, fontSize:responsiveText(12) }}>{step.num}</div>
            <span style={{ marginTop: vw(4), fontSize: responsiveText(10), color: step.num<3?"#000":"#8C8C8C", fontFamily:"Poppins, sans-serif" }}>{step.label}</span>
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", top: vh(110), left: 0, width: "100%", height: vw(2), backgroundColor: "#CECECE", zIndex: 1 }} />

      {/* Cart items */}
      <div ref={cartContentRef} onScroll={handleScroll} style={{ position: "absolute", top: vh(150), left: 0, width: "100%", maxHeight: `calc(100vh - ${vh(70)})`, overflowY: "auto", zIndex: 4 }}>
        <div style={{ width: "100%", padding: `${vh(20)} ${vw(18)}`, boxSizing: "border-box", backgroundColor: "white", borderBottom: "2px solid #CECECE" }}>
          {cartItems.map(item => (
            <div key={item.id} style={{ display:"flex", alignItems:"center", marginBottom: vh(20), gap: vw(12) }}>
              <img src={item.image} alt={item.name} style={{ width: vw(48), height: vw(48), objectFit:"cover", borderRadius: vw(6), marginTop: vh(-31) }} />
              <div style={{ flex:1, marginLeft: vw(5) }}>
                <p style={{ fontFamily:"Poppins,sans-serif", fontSize:responsiveText(16), fontWeight:700, margin:0, color:"#000" }}>{item.name}</p>
                <p style={{ fontFamily:"Poppins,sans-serif", fontSize:responsiveText(12), fontWeight:400, margin:0, marginTop: vh(4), color:"#555" }}>{item.description}</p>

                {/* Quantity and trash */}
                <div style={{ marginTop: vh(10), width: vw(100), height: vh(32), backgroundColor:"#fff", border:"0.5px solid #CECECE", borderRadius: vw(10), display:"flex", alignItems:"center", justifyContent:"space-between", padding:`0 ${vw(15)}`, gap: vw(10) }}>
                  <img src={trash} alt="Remove" style={{ width: vw(18), height: vw(18), cursor:"pointer" }} onClick={()=>handleRemove(item.id)} />
                  <div style={{ display:"flex", alignItems:"center", gap: vw(8) }}>
                    <button onClick={()=>setCartItems(prev=>prev.map(i=>i.id===item.id && i.quantity>1?{...i,quantity:i.quantity-1}:i))} style={{ border:"none", background:"none", fontSize:responsiveText(16), fontWeight:"bold", cursor:"pointer", color:"#36570A" }}>–</button>
                    <span style={{ fontSize:responsiveText(14), fontFamily:"Poppins,sans-serif", fontWeight:500, color:"#000" }}>{item.quantity}</span>
                    <button onClick={()=>setCartItems(prev=>prev.map(i=>i.id===item.id?{...i,quantity:i.quantity+1}:i))} style={{ border:"none", background:"none", fontSize:responsiveText(16), fontWeight:"bold", cursor:"pointer", color:"#36570A" }}>+</button>
                  </div>
                </div>
              </div>
              <p style={{ fontFamily:"Poppins,sans-serif", fontSize:responsiveText(12), fontWeight:300, marginTop: vh(68), marginBottom:0 }}>P {item.price * item.quantity}.00</p>
            </div>
          ))}

          {/* Add more & subtotal */}
          <div style={{ marginTop: vh(5), padding:`${vh(1)} ${vw(1)}` }}>
            <div style={{ backgroundColor:"#36570A", borderRadius: vw(10), padding:`${vh(5)} ${vw(10)}`, display:"inline-flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }} onClick={()=>handleAction("Add More Items")}>
              <span style={{ fontFamily:"Poppins,sans-serif", fontSize:responsiveText(12), fontWeight:400, color:"white" }}>+ Add more items</span>
            </div>
            <div style={{ marginTop: vh(15), display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontFamily:"Poppins,sans-serif", fontSize:responsiveText(14), fontWeight:400 }}>Subtotal</span>
              <span style={{ fontFamily:"Poppins,sans-serif", fontSize:responsiveText(14), fontWeight:500, color:"#000" }}>P {subtotal}.00</span>
            </div>
          </div>
        </div>

        {/* Add-ons */}
        <div style={{ width:"100%", padding:`${vh(20)} ${vw(18)}`, boxSizing:"border-box", backgroundColor:"white", borderBottom:"2px solid #CECECE" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: vh(25) }}>
            <p style={{ fontFamily:"Poppins,sans-serif", fontSize:responsiveText(16), fontWeight:600, margin:0, color:"#36570A" }}>Add ons</p>
            <div style={{ backgroundColor:"#CECECE", borderRadius: vw(10), padding:`${vh(2)} ${vw(12)}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span style={{ fontFamily:"Poppins,sans-serif", fontSize:responsiveText(10), fontWeight:400, color:"#fff" }}>Optional</span>
            </div>
          </div>
          {addOns.map((addOn,index)=>(
            <div key={addOn.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop: index===0?0:vh(10), marginBottom: vh(10), cursor:"pointer" }} onClick={()=>handleToggleAddOn(addOn.id)}>
              <span style={{ fontFamily:"Poppins,sans-serif", fontSize:responsiveText(12), fontWeight:400, color:"#000", margin:0 }}>{addOn.name}</span>
              <div style={{ display:"flex", alignItems:"center", gap: vw(15) }}>
                <span style={{ fontFamily:"Poppins,sans-serif", fontSize:responsiveText(12), fontWeight:300, color:"#555" }}>{addOn.price>0?`P ${addOn.price}.00`:"FREE"}</span>
                <CheckIconSVG isChecked={addOn.isChecked} style={{ width: vw(18), height: vw(18) }} />
              </div>
            </div>
          ))}
        </div>

        {/* Special instructions */}
        <div style={{ width:"100%", padding:`${vh(20)} ${vw(18)}`, boxSizing:"border-box", backgroundColor:"white", paddingBottom: vh(140) }}>
          <p style={{ fontFamily:"Poppins,sans-serif", fontSize:responsiveText(16), fontWeight:600, margin:`0 0 ${vh(3)} 0`, color:"#36570A" }}>Special instructions</p>
          <p style={{ fontFamily:"Poppins,sans-serif", fontSize:responsiveText(10), fontWeight:300, margin:`0 0 ${vh(10)} 0`, color:"#000" }}>Any special requests for your meal? Let us know if you have any notes for the cafeteria staff regarding your order.</p>
          <div style={{ position:"relative" }}>
            <textarea
              value={specialInstructions}
              maxLength={500}
              onChange={e=>setSpecialInstructions(e.target.value)}
              placeholder="e.g., 'no peanuts'"
              style={{ width:"100%", height: vh(100), padding: vw(10), boxSizing:"border-box", border:"0.5px solid #36570A", borderRadius: vw(10), resize:"none", fontFamily:"Poppins,sans-serif", fontSize:responsiveText(10), fontWeight:400, color:"#000", paddingBottom: vh(25) }}
            />
            <p style={{ position:"absolute", bottom: vh(-10), right: vw(10), fontFamily:"Poppins,sans-serif", fontSize:responsiveText(8), fontWeight:400, color:"#666", margin:0 }}>({specialInstructions.length}/500)</p>
          </div>
        </div>
      </div>

      {/* Bottom total bar */}
      <div style={{ position:"fixed", left:0, bottom:0, width:"100%", height: vh(140), backgroundColor:"#fff", borderTop:"0.5px solid #CECECE", boxShadow:"0 -2px 5px rgba(0,0,0,0.05)", zIndex:5, transform: isBottomBarVisible?'translateY(0)':`translateY(${vh(140)})`, transition:"transform 0.3s ease-out" }}>
        <p style={{ position:"absolute", left: vw(19), top: vh(13), fontSize:responsiveText(14), fontFamily:"Poppins,sans-serif", fontWeight:900, color:"#000", lineHeight:responsiveText(18), zIndex:6 }}>Total</p>
        <p style={{ position:"absolute", right: vw(19), top: vh(13), fontSize:responsiveText(14), fontFamily:"Poppins,sans-serif", fontWeight:900, color:"#36570A", lineHeight:responsiveText(18), textAlign:"right", zIndex:6 }}>P {grandTotal}.00</p>
        <div style={{ position:"absolute", left: vw(18), right: vw(18), bottom: vw(35), width:`calc(100% - ${vw(36)})`, height: vw(42), backgroundColor:"#36570A", borderRadius: vw(6), zIndex:6, display:"flex", justifyContent:"center", alignItems:"center", cursor:"pointer" }} onClick={()=>navigate("/payment")}>
          <span style={{ color:"#fff", fontSize:responsiveText(15), fontFamily:"Poppins,sans-serif", fontWeight:600 }}>Review Payment</span>
        </div>
      </div>
    </div>
  );
}
