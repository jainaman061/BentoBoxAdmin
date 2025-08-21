import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { useAppContext } from '../utils/AppProvider';
import { ErrorMessage, Field, Formik ,Form} from 'formik';
import * as Yup from "yup";
const Login = () => {


    const navigate = useNavigate();

  

 
    const [step,setStep]=useState("enter_number");
    const [phone,setPhone]=useState("");
    const [requestResponse,setrequestResponse]=useState({
        message:"",
        alertClassname:""
    });
      useEffect(() => {
    if (localStorage.getItem("bentoAdmin")) {
      navigate(`/`);
    }
  },[] );

   const sendOtp=(values)=>{
    const {number} = values;
    axios
    .post("https://bento-backend-849680057939.asia-south2.run.app/api/otp/send",{
        number:number,
        role:"admin"
    })
    .then((res)=>{
        setPhone(number)
         setrequestResponse({ message: "OTP sent successfully", className: "bg-green-100 text-green-800 px-4 py-2 rounded-md shadow" });
    setStep("enter_otp");
    })
    .catch((err)=>{
        console.log(err)
        setrequestResponse({message:"Failed To send OTP",className:"bg-red-100 text-red-800 px-4 py-2 rounded-md shadow"});
    })

   };
   
   const verifyOtp=(values)=>{
    const {otp} = values;
    axios.post("https://bento-backend-849680057939.asia-south2.run.app/api/otp/verify",{
        number: phone,
        otp:otp,
        role:"admin"
    })
    .then((res)=>{
        localStorage.setItem("bentoAdmin",res.data);
        const now=new Date();
    
        localStorage.setItem("bentoAdminExpiry",now.getTime());
        
        setrequestResponse({ message: "Logged in successfully", className: "bg-green-100 text-green-800 px-4 py-2 rounded-md shadow" });
        navigate(`/`);

    })
    .catch((err)=>{
                setrequestResponse({ message: "Invalid OTP", className: "bg-red-100 text-red-800 px-4 py-2 rounded-md shadow" });

    })
   }
   
    const firstOtpRef = React.useRef(null);
   useEffect(() => {
  if (step === "enter_otp") {
    // Wait a tick to ensure input is mounted
    setTimeout(() => {
      if (firstOtpRef.current) {
        firstOtpRef.current.focus();
      }
    }, 0);
  }
}, [step]);

  return (
<div className='h-screen bg-gradient-to-b from-white to-[#875B89] flex flex-col'>

  {/* Top heading */}
  <div className='text-center mt-8'>
      <h1 className='text-2xl font-bold text-ita mt-12'><i>Verify You Number</i></h1>
  </div>

  <div className="flex-auto flex items-center justify-center">
    <div className="w-fit max-w-md  bg-[rgba(238,236,238,0.4)]
  rounded-lg shadow-md p-8">
            {requestResponse.message && (
                <div className={`mb-4 px-4 py-2 rounded text-sm ${requestResponse.alertClassname}`}>
                    {requestResponse.message}
                </div>
            )}
             <h2 className="text-xl font-bold mb-4 text-center">Login via Mobile</h2>
             <hr className="mb-6  border-black" />
             {step==="enter_number" ? (
                <Formik 
                    key="enter_number"
                initialValues={{number:""}}
                    onSubmit={sendOtp}
                    validationSchema={Yup.object({
                        number:Yup.string()
                        .required("Mobile number is Required")
                        .matches(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number"),

                    })}>
                        {(formik)=>(
                            <Form>
                                <div className="mb-4">
                  <label className="block mb-1 text-gray-700">Enter your Mobile Number</label>
                  <Field
                    type="text"
                    name="number"
                    className={`w-full  px-7 py-2 border border-black rounded-3xl  bg-transparent ${
                      formik.errors.number && formik.touched.number
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  <ErrorMessage
                    name="number"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                  Send OTP
                </button>
                            </Form>
                        )}

                </Formik>
             ):(
                <Formik
  key="enter_otp"
  initialValues={{ otp: ['', '', '', ''] }}
  onSubmit={(values) => {
    // Join the digits to form OTP string
    const otpString = values.otp.join('');
    verifyOtp({otp:otpString});
  }}
  validationSchema={Yup.object({
    otp: Yup.array()
      .of(
        Yup.string()
          .matches(/^[0-9]$/, "Must be a digit")
          .required("Required")
      )
      .length(4, "OTP must be exactly 4 digits"),
  })}
>
  {(formik) => (
    <Form>
      <div className="mb-4">
        <label className="block mb-1 text-gray-700">Enter OTP</label>
        <div className="flex space-x-4">
          {[0, 1, 2, 3].map((index) => (
            <div key={index} className="flex flex-col items-center">
              <Field
                innerRef={index === 0 ? firstOtpRef : null}                 type="text"
                name={`otp[${index}]`}
                maxLength={1}
                  inputMode="numeric"  
                    pattern="[0-9]*" 
                className={`w-14 h-14 text-center text-xl text-purple-700 bg-purple-50 border rounded-2xl focus:outline-none ${
                  formik.errors.otp &&
                  formik.errors.otp[index] &&
                  formik.touched.otp &&
                  formik.touched.otp[index]
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                onInput={(e) => {
              
                  if (e.target.value.length === 1 && index < 3) {
                    const nextInput = document.querySelector(`input[name="otp[${index + 1}]"]`);
                    nextInput?.focus();
                  }
                }}
              />
              <ErrorMessage
                name={`otp[${index}]`}
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-[#875B89] text-white py-2 px-4 rounded hover:bg-green-700 transition"
      >
        Let's Begin
      </button>
    </Form>
  )}
</Formik>

             )}

          </div>
    </div>
    </div>
   
  )
}

export default Login