import React from "react";

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
  const vw = (pixels) => `${(pixels / 4.14).toFixed(1)}vw`;
  const vh = (pixels) => `${(pixels / 9).toFixed(1)}vh`;
  const responsiveText = (pixels) => `${(pixels / 4.14).toFixed(1)}vw`;

  return (
    <div style={{ width: "100%", minHeight: "100vh", position: "relative", paddingBottom: vh(132) }}>
      <BackIconSVG
        onClick={() => handleAction("Back")}
        style={{
          position: "absolute",
          left: vw(12),
          top: vh(73),
          width: vw(24),
          height: vw(24),
          cursor: "pointer",
          zIndex: 3,
          color: "#000000"
        }}
      />

      <p
        style={{
          position: "absolute",
          left: vw(43),
          top: vh(75),
          fontSize: responsiveText(14),
          fontWeight: 600,
          fontFamily: "Poppins, sans-serif",
          color: "#000000",
          lineHeight: responsiveText(21),
          zIndex: 3,
        }}
      >
        Cart
      </p>

      <div
        style={{
          position: "absolute",
          top: vh(115),
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: vw(90), 
          zIndex: 2,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              width: vw(28),
              height: vw(28),
              borderRadius: "50%",
              backgroundColor: "#000000",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#FFFFFF",
              fontWeight: 300,
              fontSize: responsiveText(12),
            }}
          >
            1
          </div>
          <span
            style={{
              marginTop: vw(4),
              fontSize: responsiveText(10),
              color: "#000000",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Menu
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              width: vw(28),
              height: vw(28),
              borderRadius: "50%",
              backgroundColor: "#000000",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#FFFFFF",
              fontWeight: 300,
              fontSize: responsiveText(12),
            }}
          >
            2
          </div>
          <span
            style={{
              marginTop: vw(4),
              fontSize: responsiveText(10),
              color: "#000000",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Cart
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              width: vw(28),
              height: vw(28),
              borderRadius: "50%",
              backgroundColor: "#CCCCCC",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#FFFFFF",
              fontWeight: 300,
              fontSize: responsiveText(12),
            }}
          >
            3
          </div>
          <span
            style={{
              marginTop: vw(4),
              fontSize: responsiveText(10),
              color: "#8C8C8C",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Checkout
          </span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: vh(130), 
          left: 0,
          width: "100%", 
          height: vw(2),
          backgroundColor: "#CECECE",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100%", 
          height: vh(160),
          backgroundColor: "#FFFFFF",
          borderTop: `${vw(0.5)} solid #CECECE`,
          boxShadow: '0 -2px 5px rgba(0,0,0,0.05)',
          zIndex: 5,
        }}
      >
        <p
          style={{
            position: "absolute",
            left: vw(19),
            top: vh(13), 
            fontSize: responsiveText(12),
            fontFamily: "Poppins, sans-serif",
            fontWeight: 400,
            color: "#000000",
            lineHeight: responsiveText(18),
            zIndex: 6,
          }}
        >
          Total
        </p>

        <p
          style={{
            position: "absolute",
            right: vw(19),
            top: vh(13),
            fontSize: responsiveText(12),
            fontFamily: "Poppins, sans-serif",
            fontWeight: 900,
            color: "#36570A",
            lineHeight: responsiveText(18),
            textAlign: "right",
            zIndex: 6,
          }}
        >
          P 719.00
        </p>

        <p
          style={{
            position: "absolute",
            left: vw(19),
            top: vh(36),
            fontSize: responsiveText(12),
            fontFamily: "Poppins, sans-serif",
            fontWeight: 400,
            color: "#8C8C8C",
            textDecoration: "underline",
            cursor: "pointer",
            lineHeight: responsiveText(18),
            zIndex: 6,
          }}
          onClick={() => handleAction("See Summary")}
        >
          See summary
        </p>

        <div
          style={{
            position: "absolute",
            left: vw(18),
            right: vw(18),
            bottom: vw(25),
            width: `calc(100% - ${vw(36)})`, 
            height: vw(42),
            backgroundColor: "#36570A",
            borderRadius: vw(6),
            zIndex: 6,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => handleAction("Review Payment")}
        >
          <span
            style={{
              color: "#FFFFFF",
              fontSize: responsiveText(13),
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
            }}
          >
            Review Payment
          </span>
        </div>
      </div>
    </div>
  );
}
