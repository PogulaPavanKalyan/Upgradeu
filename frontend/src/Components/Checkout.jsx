import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  CreditCard, 
  ShieldCheck, 
  ChevronRight, 
  Layout, 
  ArrowRight,
  ShoppingCart,
  CheckCircle2,
  Lock
} from "lucide-react";
import { useAuth } from "./Authprovider";
import BaseUrl from "./BaseUrl";
import "../Styles/Checkout.css";

const Checkout = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);

    // Check if the user came from a "Buy Now" click on a single course page
    const directBuyCourse = location.state?.directBuyCourse;

    useEffect(() => {
        const fetchCart = async () => {
            try {
                // If direct buying, we use that course as the "cart"
                if (directBuyCourse) {
                    setCart([{
                        id: 'buy-now',
                        course: directBuyCourse
                    }]);
                    return;
                }

                const res = await BaseUrl.get("getcart");
                setCart(res.data);
            } catch (err) {
                console.error("Failed to fetch cart", err);
            }
        };
        if (token) fetchCart();
    }, [token, directBuyCourse]);

    const totalPrice = cart.reduce((total, item) => total + (item.course?.price || 0), 0);

    const handlePayment = async () => {
        if (totalPrice === 0) return;
        setLoading(true);

        try {
            const orderRes = await BaseUrl.post("create-order", { amount: totalPrice });
            const { orderId, amount, currency, keyId } = orderRes.data;

            const options = {
                key: keyId,
                amount: amount,
                currency: currency,
                name: "UpgradeU",
                description: directBuyCourse ? `Purchase of ${directBuyCourse.title}` : "Premium Course Access",
                order_id: orderId,
                handler: async function (response) {
                    try {
                        const verifyRes = await BaseUrl.post("verify-payment", {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            courseId: directBuyCourse ? directBuyCourse.id : null
                        });

                        if (verifyRes.status === 200) {
                            navigate("/Profile");
                        } else {
                            alert("Payment verification failed.");
                        }
                    } catch (err) {
                        console.error("Verification error", err);
                        alert("Error verifying payment.");
                    }
                },
                theme: {
                    color: "#6366f1"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response) {
                alert("Payment Failed: " + response.error.description);
            });
            rzp.open();

        } catch (err) {
            console.error("Order creation failed", err);
            alert("Failed to initiate payment.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="checkout-page-wrapper">
            <div className="checkout-container-premium">
                <div className="checkout-card-premium">
                    <h2>Order Summary</h2>
                    
                    <div className="summary-list-premium">
                        {cart.map((item) => (
                            <div key={item.id} className="summary-item-premium">
                                <div className="item-name-wrap">
                                    <CheckCircle2 size={18} className="security-icon" />
                                    <span>{item.course?.title}</span>
                                </div>
                                <span className="item-price-tag">₹{item.course?.price?.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>

                    <div className="total-display-section">
                        <span className="total-label">Total Amount</span>
                        <span className="total-amount-large">₹{totalPrice.toLocaleString()}</span>
                    </div>

                    <button 
                        className="premium-pay-btn" 
                        onClick={handlePayment} 
                        disabled={loading || totalPrice === 0}
                    >
                        {loading ? (
                            "Initiating..."
                        ) : (
                            <>
                                <CreditCard size={22} /> Pay Securely ₹{totalPrice.toLocaleString()}
                            </>
                        )}
                    </button>

                    <div className="security-badge-checkout">
                        <Lock size={14} className="security-icon" />
                        <span>Secure SSL Encrypted Payment powered by Razorpay</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
