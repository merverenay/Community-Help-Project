// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const BagisButton = ({ post }) => {
//   const [donationAmount, setDonationAmount] = useState("");
//   const [totalAmount, setTotalAmount] = useState(post.totalAmount || 0);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     console.log("BagisButton post:", post); // Log the post to ensure it is received correctly
//     setTotalAmount(post.totalAmount || 0); // Initialize total amount from post prop
//   }, [post]);

//   const handleDonationChange = (e) => {
//     setDonationAmount(e.target.value);
//   };

//   const handleDonationClick = async () => {
//     const email = sessionStorage.getItem("userEmail");
//     const postId = post.id;
//     const amount = parseFloat(donationAmount);

//     if (isNaN(amount) || amount <= 0) {
//       console.error("Invalid donation amount");
//       return;
//     }

//     // Optimistically update the total amount
//     const optimisticTotal = totalAmount + amount;
//     setTotalAmount(optimisticTotal);
//     setDonationAmount(""); // Clear the donation input field
//     setIsSubmitting(true);

//     try {
//       const response = await axios.post(
//         "http://localhost:8081/api/posts/donate",
//         {
//           email,
//           postId,
//           donateAmount: amount,
//         }
//       );
//       console.log("Donation successful", response.data);
//       // Ensure the total amount is updated correctly from the backend response
//       if (response.data.totalAmount !== undefined) {
//         setTotalAmount(response.data.totalAmount);
//       }
//     } catch (error) {
//       console.error("Error making donation:", error);
//       // Revert to previous total amount if the request fails
//       setTotalAmount((prevTotal) => prevTotal - amount);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="acildurum-button-container">
//       <input
//         type="text"
//         value={donationAmount}
//         onChange={handleDonationChange}
//         placeholder="Bağış Miktarı (TL)"
//         style={{
//           marginRight: "10px",
//           padding: "10px",
//           borderRadius: "5px",
//           border: "1px solid gray",
//         }}
//       />
//       <button
//         onClick={handleDonationClick}
//         disabled={isSubmitting}
//         style={{
//           backgroundColor: "green",
//           color: "white",
//           padding: "10px",
//           border: "none",
//           borderRadius: "5px",
//           cursor: "pointer",
//         }}
//       >
//         Bağış Yap
//       </button>
//       <div>
//         <p>Total Amount: {totalAmount} TL</p>
//       </div>
//     </div>
//   );
// };

// export default BagisButton;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BagisButton = ({ post }) => {
    const [donationAmount, setDonationAmount] = useState('');
    const [totalAmount, setTotalAmount] = useState(post.totalAmount || 0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        console.log('BagisButton post:', post); // Log the post to ensure it is received correctly
        setTotalAmount(post.totalAmount || 0); // Initialize total amount from post prop
    }, [post]);

    const handleDonationChange = (e) => {
        setDonationAmount(e.target.value);
    };

    const handleDonationClick = async () => {
        const email = sessionStorage.getItem('userEmail');
        const postId = post.id;
        const amount = parseFloat(donationAmount);

        if (isNaN(amount) || amount <= 0) {
            console.error('Invalid donation amount');
            return;
        }

        // Optimistically update the total amount
        const optimisticTotal = totalAmount + amount;
        setTotalAmount(optimisticTotal);
        setDonationAmount(''); // Clear the donation input field
        setIsSubmitting(true);

        try {
            const response = await axios.post('http://localhost:4444/api/posts/donate', {
                email,
                postId,
                donateAmount: amount
            });
            console.log('Donation successful', response.data);
            // Ensure the total amount is updated correctly from the backend response
            if (response.data.totalAmount !== undefined) {
                setTotalAmount(response.data.totalAmount);
            }
        } catch (error) {
            console.error('Error making donation:', error);
            // Revert to previous total amount if the request fails
            setTotalAmount(prevTotal => prevTotal - amount);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="acildurum-button-container">
            <input
                type="text"
                value={donationAmount}
                onChange={handleDonationChange}
                placeholder="Bağış Miktarı (TL)"
                style={{
                    marginRight: "10px",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid gray",
                }}
            />
            <button
                id="buttonDonation"
                onClick={handleDonationClick}
                disabled={isSubmitting}
                style={{
                    backgroundColor: "green",
                    color: "white",
                    padding: "10px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                Bağış Yap
            </button>
            <div>
                <p>Total Amount: {totalAmount} TL</p>
            </div>
        </div>
    );
};

export default BagisButton;