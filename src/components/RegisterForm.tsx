import { useState } from 'react';

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  country: string;
}

export default function RegisterForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
    country: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiNDUzZDE3MDlkZGVjYmNhZmJiZGJkZjIxNDcyOWI3Y2JiYWI2OTRkMjk2MjJhMWJhMGJkNmYyNDU3YWMxYjdhNmNiMWRmZDQzY2UyMThmMGIiLCJpYXQiOjE3NDE0MzkwNzUuNjc1NjU0LCJuYmYiOjE3NDE0MzkwNzUuNjc1NjU2LCJleHAiOjQ4OTcxMTI2NzUuNjcwODQxLCJzdWIiOiIxMzg2MDQ1Iiwic2NvcGVzIjpbXX0.D0CRQQGQwoPuscPOAQkGGU6Vx-ikIxVjBT3E8y3HHfiz2htOz65a6-frEbhoxxU5PIKX-vTaR7KLRkw1pOLF25NFViWAaqzsoZzuBOL_vN3trzDIVnBCVUQBB6YtZIWA8cUUR29yycNe7yCKZO4G8PwOPni07EB9G9WXp_IkiY3-T-IRLkSwU8zqu1iqUKr8DBW1m2eZGIWHEcpelQ6JpsOglWfUZHVSNYgN--ouue0YCy_-IPsxZChWhNHHIsHlnfq4bPPDwTAiHc4v2JcbI-mZjsimigwVxfLGh3yIsycCECb4luqCF6mCmjvk-TNdaIMsIWaVM9S1im2FPP2CGnZ6qlod3DUIX4kFfDKZvONlUcfTztzx-W5Ycrg9CWlSZcqMtCEzZSAbI7XqPlcCBMOVqsGOK3hGX63TXaGprjj5odEWimeSHD16IMKv5OgsWGHQU8Mc3MJqxlwx2w1MspZiqRqjWn2T0mnh4PAAjCvpVyGd31CPUjlpl1wgnR1Quu_zMK6bax3J9j-KWBWuzy2wXX_3iYu7YROVCCXQW84X4DvHOrf3INvCyH8kc3n24Q_WNDtDjBpyfXUyDfDnEEjFwDUMn3otTfrOmvd-1n9ciOnEBc6KrPYTgQ5bjqvU_xdUmzZvG65I2CjByCcZFxHJZYU6Y_ICW7m7QBH_jf4";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      // Using a different format for the Authorization header
      const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // Make sure there's no extra space after "Bearer"
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          email: formData.email,
          fields: {
            name: formData.firstName,
            last_name: formData.lastName,
            country: formData.country
          },
          groups: ['148070787515942245']
        }),
      });
      
      console.log('Response status:', response.status);
      
      // Try to parse the response as JSON
      let responseData;
      try {
        responseData = await response.json();
        console.log('Response data:', responseData);
      } catch (e) {
        console.log('Could not parse response as JSON');
      }
      
      if (!response.ok) {
        const errorMsg = responseData?.message || `API error: ${response.status}`;
        setErrorMessage(errorMsg);
        throw new Error(errorMsg);
      }
      
      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-amber-500">Register Now</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        {submitStatus === 'success' ? (
          <div className="text-green-600 py-4">
            Thank you for registering! Check your email for confirmation.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                Country *
              </label>
              <input
                type="text"
                id="country"
                name="country"
                required
                value={formData.country}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
            
            {submitStatus === 'error' && (
              <div className="text-red-600 mb-4">
                {errorMessage}
              </div>
            )}
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-amber-600 disabled:opacity-50 transition duration-150"
            >
              {isSubmitting ? 'Submitting...' : 'Register'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
} 