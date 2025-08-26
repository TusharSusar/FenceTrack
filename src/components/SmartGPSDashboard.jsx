import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
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
  Hamburger,
  Menu,
  XIcon,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

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

// Initial history data for each device
const initialHistory = {
  1: [
    {
      id: 1,
      lat: 40.7128,
      lng: -74.006,
      timestamp: "2024-01-15 08:00:00",
      speed: 25,
      status: "active",
    },
    {
      id: 2,
      lat: 40.713,
      lng: -74.0058,
      timestamp: "2024-01-15 08:15:00",
      speed: 30,
      status: "active",
    },
    {
      id: 3,
      lat: 40.7135,
      lng: -74.0055,
      timestamp: "2024-01-15 08:30:00",
      speed: 35,
      status: "active",
    },
  ],
  2: [
    {
      id: 1,
      lat: 40.7589,
      lng: -73.9851,
      timestamp: "2024-01-15 08:00:00",
      speed: 20,
      status: "active",
    },
    {
      id: 2,
      lat: 40.7585,
      lng: -73.9848,
      timestamp: "2024-01-15 08:20:00",
      speed: 28,
      status: "active",
    },
    {
      id: 3,
      lat: 40.758,
      lng: -73.9845,
      timestamp: "2024-01-15 08:40:00",
      speed: 32,
      status: "active",
    },
  ],
  3: [
    {
      id: 1,
      lat: 40.7282,
      lng: -73.7949,
      timestamp: "2024-01-15 07:30:00",
      speed: 15,
      status: "active",
    },
    {
      id: 2,
      lat: 40.728,
      lng: -73.795,
      timestamp: "2024-01-15 07:45:00",
      speed: 0,
      status: "inactive",
    },
  ],
};

// Tooltip Component for user guidance
const InfoTooltip = ({ children, content }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="hidden sm:block">
      <div
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
      </div>
      {showTooltip && (
        <div className="absolute z-50 px-3 py-2 text-sm bg-gray-800 text-white rounded-lg shadow-lg -top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          {content}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
        </div>
      )}
    </div>
  );
};

const InfoTooltipRes = ({ children, content }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="sm:hidden block">
      <div
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
      </div>
      {showTooltip && (
        <div className="absolute z-50 px-3 py-2 text-sm bg-gray-800 text-white rounded-lg shadow-lg -top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          {content}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
        </div>
      )}
    </div>
  );
};

// Enhanced Map Component with Coordinates Display
const MapComponent = ({
  devices,
  geoFences,
  selectedDevice,
  onDeviceSelect,
  showCoordinates = true,
  historyPoints = [],
}) => {
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.006 });

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-green-50 overflow-hidden border">
      {/* Coordinate Display */}
      {showCoordinates && (
        <div className="absolute top-4 left-4 bg-white bg-opacity-95 backdrop-blur-sm p-3 rounded-lg shadow-lg z-10 min-w-48">
          <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center">
            <Navigation className="w-4 h-4 mr-2" />
            Current Coordinates
          </h4>
          <div className="text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-600">Latitude:</span>
              <span className="font-mono text-gray-800">
                {mapCenter.lat.toFixed(6)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Longitude:</span>
              <span className="font-mono text-gray-800">
                {mapCenter.lng.toFixed(6)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Grid background to simulate map */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-12 grid-rows-8 h-full">
          {Array.from({ length: 96 }).map((_, i) => (
            <div key={i} className="border border-gray-300"></div>
          ))}
        </div>
      </div>

      {/* Map overlay with street-like pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-30">
        <defs>
          <pattern
            id="streets"
            x="0"
            y="0"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0,40 L80,40 M40,0 L40,80"
              stroke="#94a3b8"
              strokeWidth="2"
            />
            <path
              d="M0,20 L80,20 M20,0 L20,80 M0,60 L80,60 M60,0 L60,80"
              stroke="#cbd5e1"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#streets)" />
      </svg>

      {/* History trail for selected device */}
      {historyPoints.length > 1 && (
        <svg className="absolute inset-0 w-full h-full z-5">
          <polyline
            points={historyPoints
              .map((point, index) => {
                const x = 25 + ((index * 15) % 60);
                const y = 40 + ((index * 10) % 40);
                return `${x}%,${y}%`;
              })
              .join(" ")}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2"
            strokeDasharray="5,5"
            className="animate-pulse"
          />
        </svg>
      )}

      {/* Geo-fences */}
      {geoFences.map((fence, index) => (
        <div
          key={fence.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 border-2 border-purple-400 rounded-full bg-purple-100 bg-opacity-30"
          style={{
            left: `${20 + index * 30}%`,
            top: `${30 + index * 25}%`,
            width: "120px",
            height: "120px",
          }}
        >
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-purple-700 bg-white px-2 py-1 rounded shadow">
            {fence.name}
          </div>
          <div className="absolute top-2 left-2 text-xs text-purple-600 bg-white bg-opacity-80 px-1 py-0.5 rounded">
            {fence.lat.toFixed(4)}, {fence.lng.toFixed(4)}
          </div>
        </div>
      ))}

      {/* History points */}
      {historyPoints.map((point, index) => (
        <div
          key={`history-${index}`}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-5"
          style={{
            left: `${25 + ((index * 15) % 60)}%`,
            top: `${40 + ((index * 10) % 40)}%`,
          }}
        >
          <div className="w-2 h-2 bg-blue-400 rounded-full opacity-70"></div>
        </div>
      ))}

      {/* Device markers */}
      {devices.map((device, index) => (
        <div
          key={device.id}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110 z-10 ${
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
          <div
            className={`p-2 rounded-full shadow-lg ${
              device.status === "active" ? "bg-green-500" : "bg-gray-400"
            } relative`}
          >
            <MapPin className="w-6 h-6 text-white" />
            {device.status === "active" && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
            )}
          </div>
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-xs bg-white px-2 py-1 rounded shadow whitespace-nowrap">
            <div className="font-semibold">{device.name}</div>
            <div className="text-gray-600 font-mono">
              {device.lat.toFixed(4)}, {device.lng.toFixed(4)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// History Component
const HistorySection = ({
  deviceHistory,
  selectedDevice,
  onSaveLocation,
  onDeleteLocation,
}) => {
  const [newLocation, setNewLocation] = useState({
    lat: "",
    lng: "",
    name: "",
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleSaveLocation = () => {
    if (newLocation.lat && newLocation.lng && newLocation.name) {
      onSaveLocation({
        ...newLocation,
        lat: parseFloat(newLocation.lat),
        lng: parseFloat(newLocation.lng),
        timestamp: new Date().toLocaleString(),
        speed: Math.floor(Math.random() * 50),
        status: "manual",
      });
      setNewLocation({ lat: "", lng: "", name: "" });
      setShowAddForm(false);
    }
  };

  const currentHistory = selectedDevice
    ? deviceHistory[selectedDevice] || []
    : [];

  return (
    <div className="bg-white rounded-lg shadow-sm border h-full">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <History className="w-5 h-5 mr-2" />
            Location History
            {selectedDevice && (
              <span className="ml-2 text-sm text-gray-500">
                ({mockDevices.find((d) => d.id === selectedDevice)?.name})
              </span>
            )}
          </h3>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Location
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="p-4 border-b bg-gray-50">
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Location name"
              value={newLocation.name}
              onChange={(e) =>
                setNewLocation({ ...newLocation, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                step="any"
                placeholder="Latitude"
                value={newLocation.lat}
                onChange={(e) =>
                  setNewLocation({ ...newLocation, lat: e.target.value })
                }
                className="px-3 py-2 border border-gray-300 rounded text-sm font-mono"
              />
              <input
                type="number"
                step="any"
                placeholder="Longitude"
                value={newLocation.lng}
                onChange={(e) =>
                  setNewLocation({ ...newLocation, lng: e.target.value })
                }
                className="px-3 py-2 border border-gray-300 rounded text-sm font-mono"
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleSaveLocation}
                className="flex items-center px-3 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700"
              >
                <Save className="w-4 h-4 mr-1" />
                Save
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-3 py-2 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
        {!selectedDevice ? (
          <div className="text-center text-gray-500 py-8">
            <History className="w-12 h-12 mx-auto text-gray-300 mb-2" />
            <p>Select a device to view its location history</p>
          </div>
        ) : currentHistory.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <MapPin className="w-12 h-12 mx-auto text-gray-300 mb-2" />
            <p>No location history available</p>
          </div>
        ) : (
          currentHistory
            .slice()
            .reverse()
            .map((location, index) => (
              <div
                key={location.id}
                className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span
                        className={`w-3 h-3 rounded-full ${
                          location.status === "active"
                            ? "bg-green-500"
                            : location.status === "manual"
                            ? "bg-blue-500"
                            : "bg-gray-400"
                        }`}
                      ></span>
                      <span className="text-sm font-medium text-gray-800">
                        {location.name || `Location ${location.id}`}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs text-gray-600">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-gray-500">Latitude:</span>
                          <div className="font-mono font-medium">
                            {location.lat.toFixed(6)}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500">Longitude:</span>
                          <div className="font-mono font-medium">
                            {location.lng.toFixed(6)}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div>
                          <span className="text-gray-500">Speed:</span>
                          <span className="ml-1">{location.speed} mph</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Time:</span>
                          <span className="ml-1">{location.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      onDeleteLocation(selectedDevice, location.id)
                    }
                    className="p-1 text-red-500 hover:bg-red-50 rounded"
                    title="Delete location"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

// const responsiveSidebar = () => {
//   const [sidebaractive, setresSidebar] = useState(false)
//   return(
//     <div className="modal w-[90%] h-[50vh] bg-amber-100">
//       <h1 className="text-black">Sidebar Under Construction</h1>
//     </div>
//   )
// }

// Main Dashboard Component
const SmartGPSDashboard = () => {
  // State management
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isTracking, setIsTracking] = useState(true);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [showNewGeoFenceModal, setShowNewGeoFenceModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [devices, setDevices] = useState(mockDevices);
  const [alerts, setAlerts] = useState(mockAlerts);
  const [deviceHistory, setDeviceHistory] = useState(initialHistory);
  const [sidebarActive, setSidebarActive] = useState(false);

  // Demo mode effect - updates device positions and history
  useEffect(() => {
    if (demoMode) {
      const interval = setInterval(() => {
        setDevices((prev) =>
          prev.map((device) => ({
            ...device,
            lat: device.lat + (Math.random() - 0.5) * 0.001,
            lng: device.lng + (Math.random() - 0.5) * 0.001,
            speed: Math.max(0, device.speed + (Math.random() - 0.5) * 10),
            battery: Math.max(0, device.battery - Math.random() * 0.5),
          }))
        );

        // Add new history points for active devices
        setDeviceHistory((prev) => {
          const newHistory = { ...prev };
          devices
            .filter((d) => d.status === "active")
            .forEach((device) => {
              if (newHistory[device.id]) {
                const lastPoint =
                  newHistory[device.id][newHistory[device.id].length - 1];
                newHistory[device.id] = [
                  ...newHistory[device.id],
                  {
                    id: Date.now() + device.id,
                    lat: device.lat + (Math.random() - 0.5) * 0.002,
                    lng: device.lng + (Math.random() - 0.5) * 0.002,
                    timestamp: new Date().toLocaleString(),
                    speed: Math.max(0, Math.floor(Math.random() * 60)),
                    status: "active",
                  },
                ].slice(-20); // Keep only last 20 points
              }
            });
          return newHistory;
        });
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [demoMode, devices]);

  // Toggle tracking function
  const toggleTracking = () => {
    setIsTracking(!isTracking);
  };

  // Handle device selection
  const handleDeviceSelect = (deviceId) => {
    setSelectedDevice(selectedDevice === deviceId ? null : deviceId);
  };

  // Save new location to history
  const handleSaveLocation = (location) => {
    if (selectedDevice) {
      setDeviceHistory((prev) => ({
        ...prev,
        [selectedDevice]: [
          ...(prev[selectedDevice] || []),
          { ...location, id: Date.now() },
        ],
      }));
    }
  };

  // Delete location from history
  const handleDeleteLocation = (deviceId, locationId) => {
    setDeviceHistory((prev) => ({
      ...prev,
      [deviceId]: prev[deviceId].filter((loc) => loc.id !== locationId),
    }));
  };

  // Sidebar navigation
  const sidebarItems = [
    { id: "dashboard", icon: Activity, label: "Dashboard" },
    { id: "history", icon: History, label: "History" },
    { id: "geofencing", icon: Shield, label: "Geo-Fencing" },
    { id: "alerts", icon: Bell, label: "Alerts" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Resposive Sidebar */}
      {sidebarActive && (
        <div className="resSidebar fixed sm:hidden w-full h-dvh z-50 pt-8 bg-white/90">
          <div className="sidebar-content flex flex-col items-end">
            <span className="mb-4 px-4 cursor-pointer" onClick={() => setSidebarActive(false)}>
              <XIcon size={30} />
            </span>
            {sidebarItems.map((item) => (
              <div key={item.id} className="w-full">
                <InfoTooltipRes
                  content={`Access ${item.label.toLowerCase()} features and settings`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 cursor-pointer transition-colors ${
                      activeTab === item.id
                        ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                        : "text-gray-600"
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </button>
                </InfoTooltipRes>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div className="hidden sm:block sm:w-64 bg-white shadow-lg">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <img className="w-10 h-10 object-cover" src={logo} alt="Logo" />
            FenceTrack
          </h1>
          {/* <p className="text-sm text-gray-600 mt-1">
            Real-time tracking solution
          </p> */}
        </div>

        <nav className="w-full mt-6">
          {sidebarItems.map((item) => (
            <div key={item.id} className="w-full">
              <InfoTooltip
                content={`Access ${item.label.toLowerCase()} features and settings`}
              >
                <button
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 cursor-pointer transition-colors ${
                    activeTab === item.id
                      ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                      : "text-gray-600"
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              </InfoTooltip>
            </div>
          ))}
        </nav>

        {/* Demo Mode Toggle */}
        {/* <div className="absolute bottom-6 left-6 right-6">
          <InfoTooltip content="Enable demo mode to see live data simulation">
            <button
              onClick={() => setDemoMode(!demoMode)}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                demoMode
                  ? "bg-green-100 text-green-800 border border-green-300"
                  : "bg-gray-100 text-gray-600 border border-gray-300"
              }`}
            >
              {demoMode ? "🟢 Demo Active" : "⚫ Enable Demo"}
            </button>
          </InfoTooltip>
        </div> */}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex justify-between items-center">
            <span
              className="inline sm:hidden"
              onClick={() => setSidebarActive(!sidebarActive)}
            >
              <Menu />
            </span>
            <div className="header-txt flex grow items-center justify-around sm:grow-0 sm:space-x-4">
              <h2 className="text-xl font-semibold text-gray-800 capitalize">
                {activeTab}
              </h2>
              {isTracking && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                  Live Tracking
                </span>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <InfoTooltip
                content={
                  isTracking
                    ? "Stop real-time tracking"
                    : "Start real-time tracking"
                }
              >
                <button
                  onClick={toggleTracking}
                  className={`flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors ${
                    isTracking
                      ? "bg-red-100 text-red-700 hover:bg-red-200"
                      : "bg-green-100 text-green-700 hover:bg-green-200"
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
              </InfoTooltip>

              <InfoTooltip content="Send feedback or report issues">
                <button
                  onClick={() => setShowFeedbackModal(true)}
                  className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Info className="w-5 h-5" />
                </button>
              </InfoTooltip>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active Devices</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {devices.filter((d) => d.status === "active").length}
                      </p>
                    </div>
                    <Users className="w-8 h-8 text-blue-500" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Alerts</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {alerts.length}
                      </p>
                    </div>
                    <Bell className="w-8 h-8 text-red-500" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">History Points</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {Object.values(deviceHistory).reduce(
                          (sum, history) => sum + history.length,
                          0
                        )}
                      </p>
                    </div>
                    <History className="w-8 h-8 text-purple-500" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Uptime</p>
                      <p className="text-2xl font-bold text-gray-900">99.9%</p>
                    </div>
                    <Clock className="w-8 h-8 text-green-500" />
                  </div>
                </div>
              </div>

              {/* Map and Device List */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border">
                  <div className="p-4 border-b">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Real-Time Map with Coordinates
                    </h3>
                  </div>
                  <div className="h-96">
                    <MapComponent
                      devices={devices}
                      geoFences={mockGeoFences}
                      selectedDevice={selectedDevice}
                      onDeviceSelect={handleDeviceSelect}
                      showCoordinates={true}
                      historyPoints={
                        selectedDevice
                          ? deviceHistory[selectedDevice] || []
                          : []
                      }
                    />
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border">
                  <div className="p-4 border-b">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Device Status
                    </h3>
                  </div>
                  <div className="p-4 space-y-4">
                    {devices.map((device) => (
                      <div
                        key={device.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          selectedDevice === device.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:bg-gray-50"
                        }`}
                        onClick={() => handleDeviceSelect(device.id)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-800">
                            {device.name}
                          </span>
                          <span
                            className={`w-3 h-3 rounded-full ${
                              device.status === "active"
                                ? "bg-green-500"
                                : "bg-gray-400"
                            }`}
                          ></span>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div className="flex justify-between">
                            <span>Coordinates:</span>
                            <span className="font-mono text-xs">
                              {device.lat.toFixed(4)}, {device.lng.toFixed(4)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Speed:</span>
                            <span>{Math.round(device.speed)} mph</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Battery:</span>
                            <span>{Math.round(device.battery)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>History Points:</span>
                            <span>{deviceHistory[device.id]?.length || 0}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-4 border-b">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Map with History Trail
                  </h3>
                </div>
                <div className="h-96">
                  <MapComponent
                    devices={devices}
                    geoFences={mockGeoFences}
                    selectedDevice={selectedDevice}
                    onDeviceSelect={handleDeviceSelect}
                    showCoordinates={true}
                    historyPoints={
                      selectedDevice ? deviceHistory[selectedDevice] || [] : []
                    }
                  />
                </div>
              </div>

              <HistorySection
                deviceHistory={deviceHistory}
                selectedDevice={selectedDevice}
                onSaveLocation={handleSaveLocation}
                onDeleteLocation={handleDeleteLocation}
              />
            </div>
          )}

          {activeTab === "geofencing" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-800">
                  Geo-Fence Management
                </h3>
                <button
                  onClick={() => setShowNewGeoFenceModal(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Geo-Fence
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockGeoFences.map((fence) => (
                  <div
                    key={fence.id}
                    className="bg-white p-6 rounded-lg shadow-sm border"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-800">
                        {fence.name}
                      </h4>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          fence.active
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {fence.active ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Radius:</span>
                        <span>{fence.radius}m</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Latitude:</span>
                        <span className="font-mono">
                          {fence.lat.toFixed(6)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Longitude:</span>
                        <span className="font-mono">
                          {fence.lng.toFixed(6)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button className="flex-1 py-2 px-3 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors text-sm">
                        Edit
                      </button>
                      <button className="flex-1 py-2 px-3 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors text-sm">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "alerts" && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800">Alert Center</h3>

              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="bg-white p-4 rounded-lg shadow-sm border"
                  >
                    <div className="flex items-start space-x-3">
                      <div
                        className={`p-2 rounded-full ${
                          alert.severity === "danger"
                            ? "bg-red-100"
                            : alert.severity === "warning"
                            ? "bg-yellow-100"
                            : "bg-blue-100"
                        }`}
                      >
                        <AlertTriangle
                          className={`w-5 h-5 ${
                            alert.severity === "danger"
                              ? "text-red-600"
                              : alert.severity === "warning"
                              ? "text-yellow-600"
                              : "text-blue-600"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">
                          {alert.message}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {alert.time}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-1 text-green-600 hover:bg-green-100 rounded">
                          <Check className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-red-600 hover:bg-red-100 rounded">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800">Settings</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    Tracking Settings
                  </h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Real-time updates</span>
                      <button className="w-12 h-6 bg-blue-600 rounded-full relative">
                        <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Alert notifications</span>
                      <button className="w-12 h-6 bg-blue-600 rounded-full relative">
                        <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">
                        Show coordinates on map
                      </span>
                      <button className="w-12 h-6 bg-blue-600 rounded-full relative">
                        <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">
                        History trail visibility
                      </span>
                      <button className="w-12 h-6 bg-blue-600 rounded-full relative">
                        <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    Data Management
                  </h4>
                  <div className="space-y-4">
                    <button className="w-full py-2 px-4 text-left text-gray-700 hover:bg-gray-50 rounded border">
                      Export Location History
                    </button>
                    <button className="w-full py-2 px-4 text-left text-gray-700 hover:bg-gray-50 rounded border">
                      Clear All History
                    </button>
                    <button className="w-full py-2 px-4 text-left text-gray-700 hover:bg-gray-50 rounded border">
                      Backup Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Send Feedback
            </h3>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg resize-none"
              rows="4"
              placeholder="Tell us about your experience or report an issue..."
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
              >
                Send Feedback
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Geo-Fence Modal */}
      {showNewGeoFenceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Create New Geo-Fence
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Geo-fence name"
              />
              <input
                type="number"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Radius (meters)"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  className="p-3 border border-gray-300 rounded-lg font-mono"
                  placeholder="Latitude"
                  step="any"
                />
                <input
                  type="number"
                  className="p-3 border border-gray-300 rounded-lg font-mono"
                  placeholder="Longitude"
                  step="any"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowNewGeoFenceModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowNewGeoFenceModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Geo-Fence
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartGPSDashboard;