import React from "react";
import backIcon from "../assets/back.png";

export default function WhiteAndGreenRectangle() {
  return (
    <div style={{ width: "414px", height: "100vh", position: "relative" }}>
      {/* Back Button */}
      <img
        src={backIcon}
        alt="Back"
        onClick={() => alert("Back clicked")}
        style={{
          position: "absolute",
          left: "12px",
          top: "73px",
          width: "24px",
          height: "24px",
          cursor: "pointer",
          zIndex: 3,
        }}
      />

      {/* Cart Text */}
      <p
        style={{
          position: "absolute",
          left: "43px",
          top: "75px",
          width: "32px",
          height: "21px",
          fontSize: "14px",
          fontWeight: 600,
          fontFamily: "Poppins, sans-serif",
          color: "#000000",
          lineHeight: "21px",
          zIndex: 3,
        }}
      >
        Cart
      </p>

      {/* 3-Step Process Tracker */}
      <div
        style={{
          position: "absolute",
          top: "115px",
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "90px", // wider gap
          zIndex: 2,
        }}
      >
        {/* Step 1: Menu */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              backgroundColor: "#000000",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#FFFFFF",
              fontWeight: 300,
              fontSize: "12px",
            }}
          >
            1
          </div>
          <span
            style={{
              marginTop: "4px",
              fontSize: "10px",
              color: "#000000",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Menu
          </span>
        </div>

        {/* Step 2: Cart */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              backgroundColor: "#000000",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#FFFFFF",
              fontWeight: 300,
              fontSize: "12px",
            }}
          >
            2
          </div>
          <span
            style={{
              marginTop: "4px",
              fontSize: "10px",
              color: "#000000",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Cart
          </span>
        </div>

        {/* Step 3: Checkout */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              backgroundColor: "#CCCCCC",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#FFFFFF",
              fontWeight: 300,
              fontSize: "12px",
            }}
          >
            3
          </div>
          <span
            style={{
              marginTop: "4px",
              fontSize: "10px",
              color: "#8C8C8C",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Checkout
          </span>
        </div>
      </div>

      {/* Horizontal Line Under Steps */}
      <div
        style={{
          position: "absolute",
          top: "130px", // slightly below the circles
          left: "0%",
          transform: "translateX(-50%)",
          width: "827px", // line length
          height: "2px",
          backgroundColor: "#CECECE",
          zIndex: 1,
        }}
      />

      {/* White Rectangle with Stroke */}
      <div
        style={{
          position: "absolute",
          left: "-2px",
          top: "802px",
          width: "417px",
          height: "132px",
          backgroundColor: "#FFFFFF",
          border: "0.5px solid #CECECE",
          zIndex: 1,
        }}
      />

      {/* Total Text */}
      <p
        style={{
          position: "absolute",
          left: "19px",
          top: "815px",
          width: "30px",
          height: "18px",
          fontSize: "12px",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 400,
          color: "#000000",
          lineHeight: "18px",
          zIndex: 2,
        }}
      >
        Total
      </p>

      {/* Total Amount */}
      <p
        style={{
          position: "absolute",
          left: "343px",
          top: "815px",
          width: "48px",
          height: "18px",
          fontSize: "12px",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 900,
          color: "#36570A",
          lineHeight: "18px",
          textAlign: "right",
          zIndex: 2,
        }}
      >
        P 719.00
      </p>

      {/* See Summary Text (Clickable, Underlined) */}
      <p
        style={{
          position: "absolute",
          left: "19px",
          top: "832px",
          width: "84px",
          height: "18px",
          fontSize: "12px",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 400,
          color: "#8C8C8C",
          textDecoration: "underline",
          cursor: "pointer",
          lineHeight: "18px",
          zIndex: 2,
        }}
        onClick={() => alert("See Summary clicked")}
      >
        See summary
      </p>

      {/* Green Rectangle with Rounded Corners */}
      <div
        style={{
          position: "absolute",
          left: "18px",
          top: "865px",
          width: "376px",
          height: "42px",
          backgroundColor: "#36570A",
          borderRadius: "6px",
          zIndex: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={() => alert("Review Payment clicked")}
      >
        <span
          style={{
            color: "#FFFFFF",
            fontSize: "13px",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
          }}
        >
          Review Payment
        </span>
      </div>
    </div>
  );
}
