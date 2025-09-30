import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import useauth from "../../Hooks/useauth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaSolarPanel } from "react-icons/fa";
import { Checkauth } from "../../utils/Checkauth";
import { FiLogIn } from "react-icons/fi";

const Login = () => {
  const { Apicall } = useauth();
  const navigate = useNavigate();

  // check token on mount
  const checktoken = localStorage.getItem("token");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full  h-2 bg-gradient-to-r from-orange-500 to-green-500"></div>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 to-orange-500"></div>

        <div className="flex flex-col md:flex-row h-screen max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Left Side - Form */}
          <motion.div
            className="w-full md:w-1/2 flex items-center justify-center p-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-max md:w-full xl:w-full 2xl:w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-green-500 p-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <FaSolarPanel className="text-white text-4xl mr-2" />
                  <h2 className="text-2xl font-bold text-nowrap text-white">
                    Hans Solar Dashboard
                  </h2>
                </div>
                <p className="text-white/90">
                  Welcome back! Please sign in to your account
                </p>
              </div>

              <div className="p-8">
                {/* if token is not expired user can login directlt if it expired he shoud signIn  */}
                {checktoken && Checkauth(checktoken) ? (
                  <div className="flex items-center justify-center">
                    <button
                      className="text-2xl flex items-center gap-3  px-8 py-2 font-semibold cursor-pointer  text-white bg-gradient-to-r from-orange-500 to-green-500 p-2 rounded-lg"
                      onClick={() => navigate("/dashboard")}
                    >
                      <span>
                        <FiLogIn className="mt-0.5" size={25} />
                      </span>
                      Login
                    </button>
                  </div>
                ) : (
                  <Formik
                    initialValues={{
                      name: "",
                      email: "",
                      password: "",
                    }}
                    validate={(value) => {
                      let errors = {};
                      if (!value.name) errors.name = "Name is required";
                      if (!value.email) errors.email = "Email is required";
                      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email))
                        errors.email = "Invalid email format";
                      if (!value.password)
                        errors.password = "Password is required";
                      return errors;
                    }}
                    onSubmit={async (value, { resetForm, setSubmitting }) => {
                      try {
                        const user = await Apicall(
                          value.name,
                          value.email,
                          value.password
                        );

                        if (user) {
                          toast.success("Login successful");
                          resetForm();
                          navigate("/dashboard");
                        }
                      } catch (error) {
                        toast.error("Invalid credentials. Please try again.");
                      } finally {
                        setSubmitting(false);
                      }
                    }}
                  >
                    {({
                      errors,
                      touched,
                      values,
                      handleChange,
                      handleBlur,
                      isSubmitting,
                    }) => (
                      <Form className="space-y-6">
                        <motion.div
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                          className="space-y-6"
                        >
                          <motion.div
                            variants={itemVariants}
                            className="relative group"
                          >
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <FaUser className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                            </div>
                            <input
                              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                              type="text"
                              id="name"
                              name="name"
                              value={values.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Enter your name"
                            />
                            {errors.name && touched.name && (
                              <p className="mt-1 text-sm text-red-600">
                                {errors.name}
                              </p>
                            )}
                          </motion.div>

                          <motion.div
                            variants={itemVariants}
                            className="relative group"
                          >
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <FaEnvelope className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                            </div>
                            <input
                              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                              type="email"
                              id="email"
                              name="email"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Enter your email"
                            />
                            {errors.email && touched.email && (
                              <p className="mt-1 text-sm text-red-600">
                                {errors.email}
                              </p>
                            )}
                          </motion.div>

                          <motion.div
                            variants={itemVariants}
                            className="relative group"
                          >
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <FaLock className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                            </div>
                            <input
                              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                              type="password"
                              id="password"
                              name="password"
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Enter your password"
                            />
                            {errors.password && touched.password && (
                              <p className="mt-1 text-sm text-red-600">
                                {errors.password}
                              </p>
                            )}
                          </motion.div>

                          <motion.div variants={itemVariants} className="pt-2">
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              disabled={isSubmitting}
                              className={`w-full flex cursor-pointer justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200 ${
                                isSubmitting
                                  ? "opacity-70 cursor-not-allowed"
                                  : ""
                              }`}
                              type="submit"
                            >
                              {isSubmitting ? (
                                <>
                                  <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    ></circle>
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                  </svg>
                                  Signing in...
                                </>
                              ) : (
                                "Sign In"
                              )}
                            </motion.button>
                          </motion.div>
                        </motion.div>
                      </Form>
                    )}
                  </Formik>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Side (Image) */}
          <motion.div
            className="hidden md:flex w-1/2 relative overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-green-300 opacity-90"></div>

            {/* Animated floating elements */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/20 rounded-full filter blur-3xl animate-float"></div>
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-white/15 rounded-full filter blur-3xl animate-float animation-delay-2000"></div>

            <div className="relative flex flex-col justify-center items-center w-full h-full p-8">
              <motion.div
                className="relative z-10 text-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <img
                  src="LoginBanner.png"
                  alt="Solar Panel Illustration"
                  className="w-full max-w-md mx-auto mb-8 transform transition-transform duration-1000 hover:scale-105"
                />
                <h2 className="text-3xl font-bold text-white mb-4">
                  ☀️Hans Solar Dashboard
                </h2>
                <p className="text-white/90 text-lg">
                  Efficiently manage your solar energy systems
                </p>

                <div className="mt-8 flex justify-center space-x-4">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-3 h-3 bg-white rounded-full"
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-20"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-current text-orange-500/20"
            ></path>
          </svg>
        </div>
      </div>
    </>
  );
};

export default Login;
