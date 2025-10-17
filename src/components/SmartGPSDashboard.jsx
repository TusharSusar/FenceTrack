import React, { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Shield,
  Settings,
  Play,
  Pause,
  Plus,
  Bell,
  Activity,
  Users,
  Clock,
  AlertTriangle,
  Check,
  X,
  Info,
  History,
  Navigation,
  Save,
  Trash2,
  Menu,
  XIcon,
  Eye,
  ArrowRight,
  TrendingUp,
  Battery,
  Wifi,
  Zap
} from "lucide-react";

// Custom Hook for Intersection Observer (Scroll Animations)
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

// Mock data for demonstration
const mockDevices = [
  {
    id: 1,
    name: "Vehicle Alpha",
    lat: 40.7128,
    lng: -74.006,
    status: "active",
    battery: 85,
    speed: 45,
  },
  {
    id: 2,
    name: "Delivery Truck B",
    lat: 40.7589,
    lng: -73.9851,
    status: "active",
    battery: 72,
    speed: 32,
  },
  {
    id: 3,
    name: "Service Van C",
    lat: 40.7282,
    lng: -73.7949,
    status: "inactive",
    battery: 45,
    speed: 0,
  },
];

const mockGeoFences = [
  {
    id: 1,
    name: "Downtown Zone",
    lat: 40.7128,
    lng: -74.006,
    radius: 500,
    active: true,
  },
  {
    id: 2,
    name: "Warehouse Area",
    lat: 40.7589,
    lng: -73.9851,
    radius: 300,
    active: true,
  },
];

const mockAlerts = [
  {
    id: 1,
    type: "geofence",
    message: "Vehicle Alpha exited Downtown Zone",
    time: "2 min ago",
    severity: "warning",
  },
  {
    id: 2,
    type: "speed",
    message: "Delivery Truck B exceeded speed limit",
    time: "5 min ago",
    severity: "danger",
  },
  {
    id: 3,
    type: "battery",
    message: "Service Van C low battery warning",
    time: "10 min ago",
    severity: "info",
  },
];

// Enhanced Map Component with Modern Design
const MapComponent = ({
  devices,
  geoFences,
  selectedDevice,
  onDeviceSelect,
  showCoordinates = true,
  historyPoints = [],
}) => {
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.006 });
  const [ref, isInView] = useInView(0.1);

  return (
    <div 
      ref={ref}
      className={`relative w-full h-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden rounded-xl border border-white/20 backdrop-blur-sm transform transition-all duration-1000 ${
        isInView ? "scale-100 opacity-100" : "scale-95 opacity-0"
      }`}
    >
      {/* Coordinate Display with Glass Morphism */}
      {showCoordinates && (
        <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md border border-white/30 p-4 rounded-2xl shadow-lg z-10 min-w-52 transform transition-all duration-500 hover:bg-white/30">
          <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-2">
              <Navigation className="w-4 h-4 text-white" />
            </div>
            Live Coordinates
          </h4>
          <div className="text-xs space-y-2">
            <div className="flex justify-between items-center p-2 bg-white/30 rounded-lg">
              <span className="text-gray-600 font-medium">Latitude:</span>
              <span className="font-mono text-gray-800 bg-white/40 px-2 py-1 rounded">
                {mapCenter.lat.toFixed(6)}
              </span>
            </div>
            <div className="flex justify-between items-center p-2 bg-white/30 rounded-lg">
              <span className="text-gray-600 font-medium">Longitude:</span>
              <span className="font-mono text-gray-800 bg-white/40 px-2 py-1 rounded">
                {mapCenter.lng.toFixed(6)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 grid-rows-8 h-full">
          {Array.from({ length: 96 }).map((_, i) => (
            <div key={i} className="border border-blue-300 animate-pulse" style={{
              animationDelay: `${i * 0.1}s`,
              animationDuration: '3s'
            }}></div>
          ))}
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Geo-fences with Modern Styling */}
      {geoFences.map((fence, index) => (
        <div
          key={fence.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 border-2 border-purple-400/50 rounded-full bg-gradient-to-br from-purple-200/30 to-pink-200/30 backdrop-blur-sm animate-pulse"
          style={{
            left: `${20 + index * 30}%`,
            top: `${30 + index * 25}%`,
            width: "150px",
            height: "150px",
            animationDuration: '2s'
          }}
        >
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-purple-700 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg border border-white/30">
            {fence.name}
          </div>
          <div className="absolute top-3 left-3 text-xs text-purple-600 bg-white/70 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/30">
            {fence.lat.toFixed(4)}, {fence.lng.toFixed(4)}
          </div>
        </div>
      ))}

      {/* Device markers with enhanced animations */}
      {devices.map((device, index) => (
        <div
          key={device.id}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500 hover:scale-125 z-10 ${
            selectedDevice === device.id ? "scale-125" : ""
          }`}
          style={{
            left: `${25 + index * 25}%`,
            top: `${40 + index * 20}%`,
          }}
          onClick={() => {
            onDeviceSelect(device.id);
            setMapCenter({ lat: device.lat, lng: device.lng });
          }}
        >
          <div className="relative">
            <div
              className={`p-3 rounded-2xl shadow-2xl backdrop-blur-sm border-2 ${
                device.status === "active" 
                  ? "bg-gradient-to-r from-green-400 to-emerald-500 border-green-300/50 shadow-green-500/30" 
                  : "bg-gradient-to-r from-gray-400 to-gray-500 border-gray-300/50 shadow-gray-500/30"
              }`}
            >
              <MapPin className="w-6 h-6 text-white drop-shadow-lg" />
              {device.status === "active" && (
                <>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-ping"></div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full"></div>
                </>
              )}
            </div>
            
            {/* Enhanced Device Info Card */}
            <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-lg border border-white/30 px-4 py-3 rounded-xl shadow-2xl whitespace-nowrap">
              <div className="font-semibold text-gray-800 text-sm mb-2 flex items-center">
                <div className={`w-2 h-2 rounded-full mr-2 ${device.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                {device.name}
              </div>
              <div className="text-gray-600 font-mono text-xs space-y-1">
                <div className="flex justify-between gap-4">
                  <span>Coords:</span>
                  <span>{device.lat.toFixed(4)}, {device.lng.toFixed(4)}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Speed:</span>
                  <span>{device.speed} mph</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Battery:</span>
                  <span className={`${device.battery > 50 ? 'text-green-600' : 'text-red-600'}`}>
                    {device.battery}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Modern Stats Card Component
const StatsCard = ({ icon: Icon, title, value, color, delay = 0 }) => {
  const [ref, isInView] = useInView(0.1);
  
  return (
    <div 
      ref={ref}
      className={`bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-102 hover:bg-white/20 ${
        isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-300 font-medium mb-2">{title}</p>
          <p className="text-3xl font-bold text-white bg-gradient-to-r from-white to-gray-100 bg-clip-text">
            {/*text-transparent*/}
            {value}
          </p>
        </div>
        <div className={`w-14 h-14 bg-gradient-to-r ${color} rounded-2xl flex items-center justify-center shadow-lg transform hover:rotate-12 transition-transform duration-300`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>
      
      <div className="mt-4 flex items-center">
        <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
        <span className="text-sm text-green-400 font-medium">+12% from last week</span>
      </div>
    </div>
  );
};

// Modern Device Card Component
const DeviceCard = ({ device, isSelected, onSelect, delay = 0 }) => {
  const [ref, isInView] = useInView(0.1);
  
  return (
    <div 
      ref={ref}
      className={`bg-white/10 backdrop-blur-md border rounded-2xl cursor-pointer transition-all duration-500 hover:scale-105 transform ${
        isSelected 
          ? "border-blue-400/60 bg-gradient-to-r from-blue-500/20 to-purple-500/20 shadow-2xl scale-105" 
          : "border-white/20 hover:border-white/40 hover:bg-white/20"
      } ${isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
      style={{ transitionDelay: `${delay}ms` }}
      onClick={() => onSelect(device.id)}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
              device.status === 'active' 
                ? 'bg-gradient-to-r from-green-400 to-emerald-500' 
                : 'bg-gradient-to-r from-gray-400 to-gray-500'
            }`}>
              <span className="text-white font-bold text-lg">
                {device.name.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="text-white font-semibold">{device.name}</h3>
              <p className="text-gray-300 text-sm">ID: {device.id}</p>
            </div>
          </div>
          <div className={`w-4 h-4 rounded-full ${
            device.status === 'active' ? 'bg-green-400 animate-pulse' : 'bg-gray-400'
          }`}></div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <Navigation className="w-4 h-4 text-blue-400" />
              <span className="text-gray-300 text-sm">Location</span>
            </div>
            <span className="font-mono text-white text-xs bg-white/20 px-2 py-1 rounded">
              {device.lat.toFixed(4)}, {device.lng.toFixed(4)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300 text-sm">Speed</span>
              </div>
              <span className="text-white font-semibold">{device.speed} mph</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <Battery className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 text-sm">Battery</span>
              </div>
              <span className={`font-semibold ${device.battery > 50 ? 'text-green-400' : 'text-red-400'}`}>
                {device.battery}%
              </span>
            </div>
          </div>

          <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r transition-all duration-1000 ${
                device.battery > 50 
                  ? 'from-green-400 to-emerald-500' 
                  : 'from-red-400 to-red-500'
              }`}
              style={{ width: `${device.battery}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Modern Alert Card Component
const AlertCard = ({ alert, delay = 0 }) => {
  const [ref, isInView] = useInView(0.1);
  
  const severityConfig = {
    danger: {
      bg: 'from-red-500/20 to-red-600/20',
      border: 'border-red-400/40',
      icon: 'text-red-400',
      accent: 'bg-red-500'
    },
    warning: {
      bg: 'from-yellow-500/20 to-yellow-600/20',
      border: 'border-yellow-400/40',
      icon: 'text-yellow-400',
      accent: 'bg-yellow-500'
    },
    info: {
      bg: 'from-blue-500/20 to-blue-600/20',
      border: 'border-blue-400/40',
      icon: 'text-blue-400',
      accent: 'bg-blue-500'
    }
  };

  const config = severityConfig[alert.severity];

  return (
    <div 
      ref={ref}
      className={`bg-gradient-to-r ${config.bg} backdrop-blur-md border ${config.border} p-6 rounded-2xl shadow-xl transform transition-all duration-700 hover:scale-[1.02] ${
        isInView ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-start space-x-4">
        <div className={`p-3 bg-white/20 backdrop-blur-sm rounded-2xl`}>
          <AlertTriangle className={`w-6 h-6 ${config.icon}`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-white capitalize">{alert.type} Alert</h4>
            <div className={`w-2 h-2 rounded-full ${config.accent} animate-pulse`}></div>
          </div>
          <p className="text-gray-200 mb-3 leading-relaxed">{alert.message}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300 flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {alert.time}
            </span>
            <div className="flex space-x-2">
              <button className="p-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-lg transition-colors duration-200">
                <Check className="w-4 h-4" />
              </button>
              <button className="p-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-lg transition-colors duration-200">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const SmartGPSDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isTracking, setIsTracking] = useState(true);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [sidebarActive, setSidebarActive] = useState(false);
  const [devices] = useState(mockDevices);
  const [alerts] = useState(mockAlerts);

  // Sidebar navigation
  const sidebarItems = [
    { id: "dashboard", icon: Activity, label: "Dashboard", gradient: "from-blue-500 to-purple-600" },
    { id: "history", icon: History, label: "History", gradient: "from-green-500 to-teal-600" },
    { id: "geofencing", icon: Shield, label: "Geo-Fencing", gradient: "from-purple-500 to-pink-600" },
    { id: "alerts", icon: Bell, label: "Alerts", gradient: "from-red-500 to-orange-600" },
    { id: "settings", icon: Settings, label: "Settings", gradient: "from-gray-500 to-gray-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 overflow-x-hidden">
      {/* Animated Background Pattern */}
      <div className="fixed inset-0 opacity-10">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarActive && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarActive(false)}>
          <div className="w-80 h-full bg-white/10 backdrop-blur-xl border-r border-white/20 p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold text-white flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                FenceTrack
              </h1>
              <button onClick={() => setSidebarActive(false)} className="text-white hover:text-gray-300">
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="space-y-3">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarActive(false);
                  }}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-2xl transition-all duration-300 ${
                    activeTab === item.id
                      ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg scale-105`
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-80 lg:flex-col">
        <div className="flex-1 flex flex-col min-h-0 bg-white/10 backdrop-blur-xl border-r border-white/20">
          <div className="p-6 border-b border-white/20">
            <h1 className="text-2xl font-bold text-white flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              FenceTrack
            </h1>
            <p className="text-gray-300 text-sm mt-2">Real-time GPS tracking dashboard</p>
          </div>

          <nav className="flex-1 px-6 py-6 space-y-3">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-4 py-3 text-left rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                  activeTab === item.id
                    ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg scale-105`
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-80 flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white/10 backdrop-blur-md border-b border-white/20 px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarActive(true)}
                className="lg:hidden p-2 text-white hover:bg-white/10 rounded-xl transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
              
              <div>
                <h2 className="text-2xl font-bold text-white capitalize bg-gradient-to-r from-white to-gray-200 bg-clip-text"> {/*text-transparent*/}
                  {activeTab}
                </h2>
                {isTracking && (
                  <div className="flex items-center mt-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                    <span className="text-sm text-green-400 font-medium">Live Tracking Active</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsTracking(!isTracking)}
                className={`flex items-center justify-center px-4 py-2 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 ${
                  isTracking
                    ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg"
                    : "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                }`}
              >
                {isTracking ? (
                  <Pause className="w-4 h-4 sm:mr-2" />
                ) : (
                  <Play className="w-4 h-4 sm:mr-2" />
                )}
                <span className="hidden sm:inline">
                  {isTracking ? "Stop" : "Start"} Tracking
                </span>
              </button>

              <button className="p-2 text-white hover:bg-white/10 rounded-xl transition-colors">
                <Bell className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                  icon={Users}
                  title="Active Devices"
                  value={devices.filter((d) => d.status === "active").length}
                  color="from-blue-500 to-blue-600"
                  delay={0}
                />
                <StatsCard
                  icon={Bell}
                  title="Total Alerts"
                  value={alerts.length}
                  color="from-red-500 to-red-600"
                  delay={100}
                />
                <StatsCard
                  icon={History}
                  title="History Points"
                  value="1,247"
                  color="from-purple-500 to-purple-600"
                  delay={200}
                />
                <StatsCard
                  icon={Wifi}
                  title="System Uptime"
                  value="99.9%"
                  color="from-green-500 to-green-600"
                  delay={300}
                />
              </div>

              {/* Map and Device List */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl">
                  <div className="p-6 border-b border-white/20">
                    <h3 className="text-xl font-semibold text-white flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      Live GPS Tracking Map
                    </h3>
                    <p className="text-gray-300 text-sm mt-1">Real-time device locations with coordinates</p>
                  </div>
                  <div className="h-96 p-6">
                    <MapComponent
                      devices={devices}
                      geoFences={mockGeoFences}
                      selectedDevice={selectedDevice}
                      onDeviceSelect={setSelectedDevice}
                      showCoordinates={true}
                      historyPoints={[]}
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl">
                    <div className="p-6 border-b border-white/20">
                      <h3 className="text-xl font-semibold text-white flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                          <Activity className="w-5 h-5 text-white" />
                        </div>
                        Device Status
                      </h3>
                    </div>
                    <div className="p-6 space-y-4">
                      {devices.map((device, index) => (
                        <DeviceCard
                          key={device.id}
                          device={device}
                          isSelected={selectedDevice === device.id}
                          onSelect={setSelectedDevice}
                          delay={index * 100}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Alerts Section */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl">
                <div className="p-6 border-b border-white/20">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-600 rounded-lg flex items-center justify-center mr-3">
                        <AlertTriangle className="w-5 h-5 text-white" />
                      </div>
                      Recent Alerts
                    </h3>
                    <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-sm font-medium">
                      View All
                    </button>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  {alerts.map((alert, index) => (
                    <AlertCard key={alert.id} alert={alert} delay={index * 100} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-white to-gray-200 bg-clip-text"> 
                  Location History
                </h2>
                <p className="text-gray-300">Track and analyze device movement patterns over time</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-6">
                <div className="text-center py-20">
                  <History className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">History Feature</h3>
                  <p className="text-gray-300">Select a device to view its detailed location history and movement patterns.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "geofencing" && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-white bg-gradient-to-r from-white to-gray-200 bg-clip-text">
                    {/*text-transparent*/}
                    Geo-Fence Management
                  </h2>
                  <p className="text-gray-300 mt-2">Create and manage virtual boundaries for your devices</p>
                </div>
                <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium flex items-center shadow-lg transform hover:scale-105">
                  <Plus className="w-5 h-5 mr-2" />
                  New Geo-Fence
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {mockGeoFences.map((fence, index) => (
                  <div key={fence.id} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-6 transform transition-all duration-300 hover:scale-102">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-xl font-semibold text-white">{fence.name}</h4>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        fence.active 
                          ? "bg-green-500/20 text-green-400 border border-green-400/30" 
                          : "bg-gray-500/20 text-gray-400 border border-gray-400/30"
                      }`}>
                        {fence.active ? "Active" : "Inactive"}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                          <div className="text-gray-300 text-sm mb-1">Radius</div>
                          <div className="text-white font-semibold text-lg">{fence.radius}m</div>
                        </div>
                        <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                          <div className="text-gray-300 text-sm mb-1">Status</div>
                          <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-2 ${fence.active ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                            <span className="text-white font-semibold">{fence.active ? 'Monitoring' : 'Disabled'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                        <div className="text-gray-300 text-sm mb-2">Coordinates</div>
                        <div className="font-mono text-white text-sm">
                          <div>Lat: {fence.lat.toFixed(6)}</div>
                          <div>Lng: {fence.lng.toFixed(6)}</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex space-x-3">
                      <button className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-medium">
                        Edit
                      </button>
                      <button className="flex-1 py-3 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 font-medium">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "alerts" && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-white to-gray-200 bg-clip-text">
                  {/*text-transparent*/}
                  Alert Center
                </h2>
                <p className="text-gray-300">Monitor and manage all system alerts and notifications</p>
              </div>

              <div className="grid gap-6">
                {alerts.map((alert, index) => (
                  <AlertCard key={alert.id} alert={alert} delay={index * 150} />
                ))}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-white to-gray-200 bg-clip-text">
                  {/*text-transparent*/}
                  System Settings
                </h2>
                <p className="text-gray-300">Configure your tracking preferences and system options</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-6">
                  <h4 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <Settings className="w-6 h-6 mr-3" />
                    Tracking Settings
                  </h4>
                  <div className="space-y-6">
                    {[
                      { label: "Real-time updates", enabled: true },
                      { label: "Alert notifications", enabled: true },
                      { label: "Show coordinates on map", enabled: true },
                      { label: "History trail visibility", enabled: false },
                    ].map((setting, index) => (
                      <div key={index} className="flex justify-between items-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                        <span className="text-gray-200 font-medium">{setting.label}</span>
                        <button className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                          setting.enabled ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gray-600'
                        }`}>
                          <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform duration-300 ${
                            setting.enabled ? 'translate-x-8' : 'translate-x-1'
                          }`}></div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-6">
                  <h4 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <Shield className="w-6 h-6 mr-3" />
                    Data Management
                  </h4>
                  <div className="space-y-4">
                    {[
                      { label: "Export Location History", icon: ArrowRight },
                      { label: "Clear All History", icon: Trash2 },
                      { label: "Backup Settings", icon: Save },
                      { label: "Privacy Settings", icon: Eye },
                    ].map((action, index) => (
                      <button key={index} className="w-full flex items-center justify-between p-4 text-left text-gray-200 hover:text-white bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 backdrop-blur-sm">
                        <span className="font-medium">{action.label}</span>
                        <action.icon className="w-5 h-5" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SmartGPSDashboard;