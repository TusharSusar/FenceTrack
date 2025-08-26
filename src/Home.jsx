import React, { useState, useEffect, useRef, useContext } from "react";
import {
  MapPin,
  Shield,
  Users,
  Clock,
  AlertTriangle,
  Menu,
  X,
  Star,
  CheckCircle,
  Phone,
  Mail,
  ArrowRight,
  Play,
  Zap,
  Heart,
} from "lucide-react";
// import logo from "./assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { LoginContext } from "./context/LoginContext";

// Typewriter Effect Hook
const useTypewriter = (text, speed = 100) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return displayText;
};

// Intersection Observer Hook for Scroll Animations
const useInView = (threshold = 0.1) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isInView];
};

// Navigation Component
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);


  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            {/* <img src={logo} alt="Logo" className='w-5 h-5' /> */}
            <span
              className={`text-xl font-bold ${
                isScrolled ? "text-gray-800" : "text-white"
              }`}
            >
              FenceTrack
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {["Features", "How It Works", "Product", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className={`font-medium transition-colors hover:text-blue-500 ${
                  isScrolled ? "text-gray-700" : "text-white"
                }`}
              >
                {item}
              </a>
            ))}
            <NavLink
              to={`${isLoggedIn ? '/dashboard' : '/login'}`}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              Dashboard
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden ${
              isScrolled ? "text-gray-800" : "text-white"
            }`}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-lg">
            {["Features", "How It Works", "Pricing", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <div className="px-4 pt-2">
              <button className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition-colors">
                Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Hero Section with Carousel and Typewriter Effect
const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const typewriterText = useTypewriter("Loved Child and Parents.", 150);
  const {isLoggedIn} = useContext(LoginContext)
  const navigate =  useNavigate()

  const slides = [
    {
      title: "Real-Time GPS Tracking",
      subtitle: "Monitor locations instantly with precision accuracy",
      bg: "from-blue-600 via-purple-600 to-blue-800",
      icon: <MapPin className="w-16 h-16 text-white/80" />,
    },
    {
      title: "Smart Geo-Fencing",
      subtitle: "Set safe zones with instant alerts and notifications",
      bg: "from-green-500 via-blue-500 to-purple-600",
      icon: <Shield className="w-16 h-16 text-white/80" />,
    },
    {
      title: "24/7 Safety Monitoring",
      subtitle: "Peace of mind with continuous protection",
      bg: "from-purple-500 via-pink-500 to-red-500",
      icon: <Heart className="w-16 h-16 text-white/80" />,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
      {/* <div className="absolute top-0 left-0 w-400 h-full bg-gradient-to-r from-black via-black/70 to-transparent z-10 pointer-events-none"></div> */}

      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-gradient-to-br ${
            slide.bg
          } transition-all duration-1000 ${
            index === currentSlide
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          }`}
        >
          <div className="flex items-center justify-center h-full text-white text-center px-4">
            <div className="max-w-5xl">
              {/* Animated icon */}
              {/* <div className="mb-8 transform transition-all duration-1000 hover:scale-110">
                {slide.icon}
              </div> */}

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Ensure Safety of your{" "}
                <span className="relative">
                  <span className="text-yellow-300 inline-block min-w-[300px] text-left">
                    {typewriterText}
                    <span className="animate-pulse text-yellow-400">|</span>
                  </span>
                </span>
              </h1>

              <div className="transform transition-all duration-700 hover:scale-105">
                <h2 className="text-2xl md:text-4xl font-semibold mb-4 text-white/90">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl opacity-80 mb-8 max-w-2xl mx-auto">
                  {slide.subtitle}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button onClick={()=> isLoggedIn ? navigate('/dashboard') : navigate('/login')} className="group bg-white text-gray-800 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2 transform hover:scale-105 cursor-pointer">
                  <span>Start Tracking Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="group border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-gray-800 transition-all duration-300 flex items-center space-x-2 cursor-pointer">
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white scale-110"
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full p-1">
          <div className="w-1 h-3 bg-white/70 rounded-full mx-auto animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

// Features Section
const FeaturesSection = () => {
  const [ref, isInView] = useInView(0.2);

  const features = [
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Real-Time Location Tracking",
      description:
        "Get precise GPS coordinates updated every few seconds with battery-efficient technology.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Smart Geo-Fencing",
      description:
        "Create virtual boundaries and receive instant alerts when devices enter or exit safe zones.",
      color: "from-green-500 to-green-600",
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "Emergency Alerts",
      description:
        "Immediate notifications for panic button activation or unusual movement patterns.",
      color: "from-red-500 to-red-600",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Location History",
      description:
        "Access detailed movement history with timestamps and route visualization.",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Family Sharing",
      description:
        "Connect multiple family members and share location data securely.",
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Long Battery Life",
      description:
        "Advanced power management ensures weeks of tracking on a single charge.",
      color: "from-yellow-500 to-yellow-600",
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-gray-50" id="features">
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Powerful Features for Complete Peace of Mind
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our advanced GPS tracking technology combines precision,
            reliability, and ease of use to keep your loved ones safe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform ${
                isInView
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              } hover:-translate-y-2 group`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div
                className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// How It Works Section
const HowItWorksSection = () => {
  const [ref, isInView] = useInView(0.2);

  const steps = [
    {
      step: "01",
      title: "Setup Device",
      description:
        "Simply attach our compact GPS tracker to any item or give it to your loved one.",
      icon: <MapPin className="w-8 h-8" />,
    },
    {
      step: "02",
      title: "Configure Home",
      description:
        "Download our mobile Home and set up geofences, contacts, and preferences.",
      icon: <Shield className="w-8 h-8" />,
    },
    {
      step: "03",
      title: "Stay Connected",
      description:
        "Monitor real-time locations, receive alerts, and maintain peace of mind.",
      icon: <Heart className="w-8 h-8" />,
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-white" id="how-it-works">
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started in minutes with our simple three-step process
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row items-center mb-16 last:mb-0 transform transition-all duration-1000 ${
                isInView
                  ? "translate-x-0 opacity-100"
                  : index % 2 === 0
                  ? "-translate-x-10 opacity-0"
                  : "translate-x-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div
                className={`flex-1 justify-between ${
                  index % 2 === 0 ? "lg:order-1" : "lg:order-2"
                } mb-8 lg:mb-0`}
              >
                <div className="text-center lg:text-left">
                  <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white text-2xl font-bold px-6 py-3 rounded-full mb-6">
                    {step.step}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0">
                    {step.description}
                  </p>
                </div>
              </div>

              <div
                className={`flex-1 ${
                  index % 2 === 0 ? "lg:order-2" : "lg:order-1"
                } flex justify-center`}
              >
                <div className="w-64 h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center hover:scale-105 transition-transform duration-300">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white">
                    {step.icon}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// // Testimonials Section
// const TestimonialsSection = () => {
//   const [ref, isInView] = useInView(0.2);

//   const testimonials = [
//     {
//       name: 'Sarah Johnson',
//       role: 'Mother of 2',
//       content: 'SafeTrack Pro gave me the peace of mind I needed. I always know where my children are, and the geofence alerts help me ensure they\'re safe.',
//       rating: 5,
//       avatar: '👩‍💼'
//     },
//     {
//       name: 'Michael Chen',
//       role: 'Caregiver',
//       content: 'Taking care of my elderly father became so much easier. The device is comfortable for him to wear, and I get instant alerts if anything unusual hHomeens.',
//       rating: 5,
//       avatar: '👨‍💻'
//     },
//     {
//       name: 'Emily Davis',
//       role: 'Pet Owner',
//       content: 'My dog loves to explore, but now I never worry about losing him. The real-time tracking is incredibly accurate and the battery lasts for weeks.',
//       rating: 5,
//       avatar: '👩‍🎓'
//     }
//   ];

//   return (
//     <section ref={ref} className="py-20 bg-gray-50">
//       <div className="container mx-auto px-4">
//         <div className={`text-center mb-16 transform transition-all duration-1000 ${
//           isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
//         }`}>
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
//             What Our Customers Say
//           </h2>
//           <p className="text-xl text-gray-600">
//             Join thousands of families who trust SafeTrack Pro
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           {testimonials.map((testimonial, index) => (
//             <div
//               key={index}
//               className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform ${
//                 isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
//               } hover:-translate-y-2`}
//               style={{ transitionDelay: `${index * 100}ms` }}
//             >
//               <div className="flex items-center mb-6">
//                 <div className="text-4xl mr-4">{testimonial.avatar}</div>
//                 <div>
//                   <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
//                   <p className="text-gray-600 text-sm">{testimonial.role}</p>
//                 </div>
//               </div>

//               <div className="flex mb-4">
//                 {[...Array(testimonial.rating)].map((_, i) => (
//                   <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
//                 ))}
//               </div>

//               <p className="text-gray-600 italic leading-relaxed">
//                 "{testimonial.content}"
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// Pricing Section

// Testimonials Section - Infinite Carousel
const TestimonialsSection = () => {
  const [ref, isInView] = useInView(0.1);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Mother of 2",
      content:
        "SafeTrack Pro gave me the peace of mind I needed. I always know where my children are, and the geofence alerts help me ensure they're safe.",
      rating: 5,
      avatar: "👩‍💼",
    },
    {
      name: "Michael Chen",
      role: "Caregiver",
      content:
        "Taking care of my elderly father became so much easier. The device is comfortable for him to wear, and I get instant alerts if anything unusual happens.",
      rating: 5,
      avatar: "👨‍💻",
    },
    {
      name: "Emily Davis",
      role: "Pet Owner",
      content:
        "My dog loves to explore, but now I never worry about losing him. The real-time tracking is incredibly accurate and the battery lasts for weeks.",
      rating: 5,
      avatar: "👩‍🎓",
    },
    {
      name: "James Wilson",
      role: "Father of 3",
      content:
        "The family sharing feature is amazing. We can all stay connected and know everyone is safe. The app is so easy to use!",
      rating: 5,
      avatar: "👨‍👩‍👧‍👦",
    },
    {
      name: "Lisa Martinez",
      role: "Senior Care",
      content:
        "My mom has dementia, and this device has been a lifesaver. The emergency alerts work perfectly and give our whole family peace of mind.",
      rating: 5,
      avatar: "👵",
    },
    {
      name: "David Thompson",
      role: "Business Owner",
      content:
        "We use SafeTrack Pro for our delivery fleet. The real-time tracking and geofencing features have improved our efficiency dramatically.",
      rating: 5,
      avatar: "👨‍💼",
    },
    {
      name: "Amanda Rodriguez",
      role: "College Student",
      content:
        "As a student living alone, this gives my parents peace of mind. The panic button feature makes me feel so much safer on campus.",
      rating: 5,
      avatar: "👩‍🎓",
    },
    {
      name: "Robert Kim",
      role: "Outdoor Enthusiast",
      content:
        "Perfect for hiking and camping trips. The long battery life and accurate GPS tracking have kept me safe on remote adventures.",
      rating: 5,
      avatar: "🏔️",
    },
  ];

  // Double the testimonials array for seamless infinite loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section ref={ref} className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600">
            Join thousands of families who trust SafeTrack Pro
          </p>
          <div className="flex items-center justify-center mt-6 space-x-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 text-yellow-400 fill-current"
                />
              ))}
            </div>
            <span className="text-lg font-semibold text-gray-700">4.9/5</span>
            <span className="text-gray-500">from 2,847 reviews</span>
          </div>
        </div>

        {/* Infinite Carousel Container */}
        <div className="relative overflow-hidden">
          {/* First Row - Left to Right */}
          <div className="flex space-x-6 animate-scroll-left mb-8 cursor-pointer">
            {duplicatedTestimonials.map((testimonial, index) => (
              <div
                key={`row1-${index}`}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex-shrink-0 w-80 group"
              >
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 text-xs">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                  "{testimonial.content}"
                </p>
              </div>
            ))}
          </div>

          {/* Second Row - Right to Left */}
          <div className="flex space-x-6 animate-scroll-right">
            {duplicatedTestimonials
              .slice()
              .reverse()
              .map((testimonial, index) => (
                <div
                  key={`row2-${index}`}
                  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex-shrink-0 w-80 group cursor-pointer"
                >
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-3">{testimonial.avatar}</div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-600 text-xs">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                    "{testimonial.content}"
                  </p>
                </div>
              ))}
          </div>

          {/* Gradient Overlays for fade effect */}
          <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none overflow-x-hidden"></div>
          {/* <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div> */}
        </div>

        {/* Trust Indicators */}
        <div
          className={`text-center mt-16 transform transition-all duration-1000 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Trusted by 50K+ families</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-blue-500" />
              <span>Military-grade security</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-purple-500" />
              <span>99.9% uptime guaranteed</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 15s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 20s linear infinite;
        }

        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Pause animation on hover */
        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

const PricingSection = () => {
  const [ref, isInView] = useInView(0.2);

  const plans = [
    {
      name: "Basic",
      price: "$9.99",
      period: "/month",
      features: [
        "Real-time GPS tracking",
        "2 geofence zones",
        "Basic alerts",
        "Mobile Home access",
        "Email support",
      ],
      popular: false,
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "Family",
      price: "$19.99",
      period: "/month",
      features: [
        "Up to 5 devices",
        "Unlimited geofences",
        "Advanced alerts",
        "Location history",
        "Priority support",
        "Family sharing",
      ],
      popular: true,
      color: "from-purple-500 to-purple-600",
    },
    {
      name: "Enterprise",
      price: "$39.99",
      period: "/month",
      features: [
        "Unlimited devices",
        "Custom geofences",
        "API access",
        "Advanced analytics",
        "24/7 phone support",
        "Custom integrations",
      ],
      popular: false,
      color: "from-green-500 to-green-600",
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-white" id="pricing">
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-600">
            Flexible pricing options to fit your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform ${
                isInView
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              } hover:-translate-y-2 ${
                plan.popular ? "scale-105 ring-4 ring-purple-200" : ""
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold">
                  Most Popular
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-800">
                    {plan.price}
                  </span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:shadow-lg transform hover:scale-105"
                      : "border-2 border-gray-300 text-gray-700 hover:border-purple-500 hover:text-purple-600"
                  }`}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const [ref, isInView] = useInView(0.2);

  return (
    <section ref={ref} className="py-20 bg-gray-50" id="contact">
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600">
            Have questions? We're here to help you keep your loved ones safe.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div
            className={`transform transition-all duration-1000 ${
              isInView
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Contact Information
            </h3>

            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Phone</h4>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mr-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Email</h4>
                  <p className="text-gray-600">support@safetrackpro.com</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h4 className="font-bold text-gray-800 mb-4">
                Why Choose SafeTrack Pro?
              </h4>
              <ul className="space-y-2">
                {[
                  "99.9% uptime guarantee",
                  "Military-grade security",
                  "24/7 customer support",
                  "30-day money-back guarantee",
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className={`bg-white p-8 rounded-2xl shadow-lg transform transition-all duration-1000 ${
              isInView
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Send us a message
            </h3>

            <form className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                />
              </div>

              <div>
                <textarea
                  placeholder="Your Message"
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Send Message</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">SafeTrack Pro</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Keeping your loved ones safe with advanced GPS tracking technology
              and real-time monitoring solutions.
            </p>
            <div className="flex space-x-4">
              {["📘", "🐦", "📷", "💼"].map((social, index) => (
                <button
                  key={index}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300 text-lg"
                >
                  {social}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Product</h3>
            <ul className="space-y-3">
              {[
                "Features",
                "Pricing",
                "Device Specs",
                "Mobile Home",
                "API Documentation",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Support</h3>
            <ul className="space-y-3">
              {[
                "Help Center",
                "Contact Us",
                "Device Setup",
                "Troubleshooting",
                "User Guide",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Company</h3>
            <ul className="space-y-3">
              {[
                "About Us",
                "Careers",
                "Press",
                "Privacy Policy",
                "Terms of Service",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © 2025 SafeTrack Pro. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <span className="text-gray-400">🔒 Secure & Private</span>
              <span className="text-gray-400">⚡ 99.9% Uptime</span>
              <span className="text-gray-400">🏆 Award Winning</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main Home Component
const Home = () => {
  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleSmoothScroll = (e) => {
      const href = e.currentTarget.getAttribute("href");
      if (href?.startsWith("#")) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => link.addEventListener("click", handleSmoothScroll));

    return () => {
      links.forEach((link) =>
        link.removeEventListener("click", handleSmoothScroll)
      );
    };
  }, []);

  return (
    <div className="w-full min-h-screen overflow-hidden bg-white">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section with Carousel and Typewriter */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Floating Action Button */}
      {/* <button className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center z-40">
        <ArrowRight className="w-6 h-6" />
      </button> */}
    </div>
  );
};

export default Home;
