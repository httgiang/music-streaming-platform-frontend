import { Box, styled } from "@mui/material";
import { useState, useRef, useEffect } from "react";

const OTPInput = styled("input")({
  width: 50,
  height: 50,
  border: "1px solid #ccc",
  borderRadius: "5px",
  textAlign: "center",
  fontWeight: 600,
  fontSize: 20,
  outline: "none",
  "&:focus": {
    borderColor: "#1976d2",
    boxShadow: "0 0 5px rgba(5, 7, 8, 0.5)",
  },
});

const OTPInputs = () => {
  const numInputs = 6;
  const [otp, setOtp] = useState(Array(numInputs).fill(""));

  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);
  const handleChange = (element: any, index: number) => {
    if (isNaN(element.value)) return false;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.value && index < numInputs - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOnPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text");
    if (paste.length !== numInputs) return false;
    const newOtp = [...otp];
    newOtp.forEach((val, index) => {
      newOtp[index] = paste[index] || "";
    });
    setOtp(newOtp);
  };

  const handleKeyDown = (event: any, index: number) => {
    if (event.key === "ArrowRight" && index < numInputs - 1) {
      event.target.nextSibling.focus();
    }
    if (event.key === "ArrowLeft" && index > 0) {
      event.target.previousSibling.focus();
    }
    if (event.key === "Backspace" && index > 0) {
      if (event.target.value) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
      event.target.previousSibling.focus();
    }
  };
  return (
    <Box display="flex" gap={1} justifyContent="center">
      {otp.map((value, index) => (
        <OTPInput
          key={index}
          value={value}
          maxLength={1}
          type="text"
          onChange={(event) => handleChange(event.target, index)}
          onKeyDown={(event) => handleKeyDown(event, index)}
          onPaste={handleOnPaste}
          ref={(el) => {
            if (el) inputRefs.current[index] = el;
          }}
        />
      ))}
    </Box>
  );
};

export default OTPInputs;
