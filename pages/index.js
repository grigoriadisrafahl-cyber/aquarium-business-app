// pages/index.js - Complete version with ALL tabs
import React, { useState, useEffect } from 'react';
import { Calculator, CheckSquare, DollarSign, TrendingUp, Heart, BarChart3, Calendar, Droplet, TrendingDown } from 'lucide-react';

const AquariumBusinessPlanner = () => {
  const [activeTab, setActiveTab] = useState('equipment');

  // Load data from localStorage when app starts
  const loadFromStorage = (key, defaultValue) => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : defaultValue;
      } catch (error) {
        console.error('Error loading data:', error);
        return defaultValue;
      }
    }
    return defaultValue;
  };

  // Save data to localStorage
  const saveToStorage = (key, data) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (error) {
        console.error('Error saving data:', error);
      }
    }
  };

  const [equipment, setEquipment] = useState(() => loadFromStorage('equipment', [
    { name: 'Tanks', quantity: 4, price: 10.50, needed: true },
    { name: 'Heaters 100W', quantity: 4, price: 12.00, needed: true },
    { name: 'Water Test Kit', quantity: 1, price: 20.00, needed: true },
    { name: 'LED Light Strips', quantity: 4, price: 12.00, needed: true },
    { name: 'Fish Food', quantity: 1, price: 50.00, needed: true },
    { name: 'Breeding Fish Stock', quantity: 1, price: 100.00, needed: true }
  ]));

  const [operatingCosts, setOperatingCosts] = useState(() => loadFromStorage('operatingCosts', [
    { name: 'Electricity', costs: Array(12).fill(25.00) },
    { name: 'Fish Food', costs: Array(12).fill(8.00) },
    { name: 'Water Conditioner', costs: Array(12).fill(3.00) },
    { name: 'Transportation', costs: Array(12).fill(12.00) }
  ]));

  const [weeklySales, setWeeklySales] = useState(() => loadFromStorage('weeklySales', 
    Array.from({ length: 52 }, (_, i) => ({
      week: i + 1,
      guppies: { quantity: 0, price: 0.80 },
      plants: { quantity: 0, price: 1.00 },
      shrimp: { quantity: 0, price: 1.00 }
    }))
  ));

  const [customers, setCustomers] = useState(() => loadFromStorage('customers', [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1-555-0123',
      totalPurchases: 245.50,
      visitCount: 8,
      loyaltyTier: 'Silver',
      isActive: true
    }
  ]));

  const [breedingPairs, setBreedingPairs] = useState(() => loadFromStorage('breedingPairs', [
    {
      id: 1,
      pairName: 'Blue Guppy Pair A',
      species: 'Guppy',
      tankNumber: 'Tank 1',
      breedingDate: '2024-09-01',
      expectedBirth: '2024-09-29',
      fryCount: 0,
      status: 'breeding'
    }
  ]));

  const [tasks, setTasks] = useState(() => loadFromStorage('tasks', [
    {
      id: 1,
      title: 'Feed Fish - Morning',
      type: 'feeding',
      frequency: 'daily',
      nextDue: new Date().toISOString().split('T')[0],
      completed: false
    }
  ]));

  const [waterLogs, setWaterLogs] = useState(() => loadFromStorage('waterLogs', [
    {
      id: 1,
      date: '2024-09-28',
      tankNumber: 'Tank 1',
      ph: 7.2,
      temperature: 24.5,
      ammonia: 0.0,
      nitrite: 0.0,
      nitrate: 5.0,
      notes: 'Water quality good'
    }
  ]));

  const [marketPrices, setMarketPrices] = useState(() => loadFromStorage('marketPrices', [
    {
      id: 1,
      species: 'Guppy',
      size: 'Adult',
      currentPrice: 0.80,
      marketPrice: 1.20,
      competitor: 'Local Pet Store'
    }
  ]));

  const [plants, setPlants] = useState(() => loadFromStorage('plants', [
  {
    id: 1,
    name: 'Java Fern',
    species: 'Microsorum pteropus',
    quantity: 15,
    location: 'Tank 1',
    purchasePrice: 3.50,
    sellPrice: 6.00,
    supplier: 'Aqua Plants Co',
    dateAcquired: '2024-09-01',
    condition: 'healthy',
    careLevel: 'easy',
    lightRequirement: 'low',
    propagationType: 'rhizome',
    notes: 'Fast growing, good for beginners'
  },
  {
    id: 2,
    name: 'Amazon Sword',
    species: 'Echinodorus amazonicus',
    quantity: 8,
    location: 'Tank 2',
    purchasePrice: 4.00,
    sellPrice: 8.50,
    supplier: 'Green Aquatics',
    dateAcquired: '2024-09-15',
    condition: 'excellent',
    careLevel: 'moderate',
    lightRequirement: 'medium',
    propagationType: 'runners',
    notes: 'Popular centerpiece plant'
  }
]));

const [plantCareSchedule, setPlantCareSchedule] = useState(() => loadFromStorage('plantCareSchedule', [
  {
    id: 1,
    plantId: 1,
    taskType: 'fertilize',
    frequency: 'weekly',
    lastDone: '2024-09-22',
    nextDue: '2024-09-29',
    completed: false
  },
  {
    id: 2,
    plantId: 2,
    taskType: 'trim',
    frequency: 'monthly',
    lastDone: '2024-09-01',
    nextDue: '2024-10-01',
    completed: false
  }
]));

const [plantPropagation, setPlantPropagation] = useState(() => loadFromStorage('plantPropagation', [
  {
    id: 1,
    parentPlantId: 1,
    method: 'rhizome division',
    dateStarted: '2024-09-20',
    expectedReady: '2024-10-20',
    expectedQuantity: 5,
    actualQuantity: 0,
    status: 'propagating',
    notes: 'Cut rhizome into 3 sections'
  }
]));

  // Auto-save data whenever it changes
  useEffect(() => { saveToStorage('equipment', equipment); }, [equipment]);
  useEffect(() => { saveToStorage('operatingCosts', operatingCosts); }, [operatingCosts]);
  useEffect(() => { saveToStorage('weeklySales', weeklySales); }, [weeklySales]);
  useEffect(() => { saveToStorage('customers', customers); }, [customers]);
  useEffect(() => { saveToStorage('breedingPairs', breedingPairs); }, [breedingPairs]);
  useEffect(() => { saveToStorage('tasks', tasks); }, [tasks]);
  useEffect(() => { saveToStorage('waterLogs', waterLogs); }, [waterLogs]);
  useEffect(() => { saveToStorage('marketPrices', marketPrices); }, [marketPrices]);
  useEffect(() => { saveToStorage('plants', plants); }, [plants]);
  useEffect(() => { saveToStorage('plantCareSchedule', plantCareSchedule); }, [plantCareSchedule]);
  useEffect(() => { saveToStorage('plantPropagation', plantPropagation); }, [plantPropagation]);

  // Export all data as JSON file
  const exportData = () => {
    const allData = {
      equipment,
      operatingCosts,
      weeklySales,
      customers,
      breedingPairs,
      tasks,
      waterLogs,
      marketPrices,
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(allData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `aquarium-business-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Import data from JSON file
  const importData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (data.equipment) setEquipment(data.equipment);
          if (data.operatingCosts) setOperatingCosts(data.operatingCosts);
          if (data.weeklySales) setWeeklySales(data.weeklySales);
          if (data.customers) setCustomers(data.customers);
          if (data.breedingPairs) setBreedingPairs(data.breedingPairs);
          if (data.tasks) setTasks(data.tasks);
          if (data.waterLogs) setWaterLogs(data.waterLogs);
          if (data.marketPrices) setMarketPrices(data.marketPrices);
          alert('Data imported successfully!');
        } catch (error) {
          alert('Error importing data. Please check your file.');
          console.error('Import error:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  const equipmentTotal = equipment
    .filter(item => item.needed)
    .reduce((sum, item) => sum + (item.quantity * item.price), 0);

  const getMonthlyOperatingTotal = (month) => {
    if (month < 0 || month >= 12) return 0;
    return operatingCosts.reduce((sum, cost) => sum + (cost.costs[month] || 0), 0);
  };

  const getWeeklyRevenue = (week) => {
    if (!week || !week.guppies || !week.plants || !week.shrimp) return 0;
    return ((week.guppies.quantity || 0) * (week.guppies.price || 0)) + 
           ((week.plants.quantity || 0) * (week.plants.price || 0)) + 
           ((week.shrimp.quantity || 0) * (week.shrimp.price || 0));
  };

  const getTotalRevenue = () => {
    return weeklySales.reduce((sum, week) => sum + getWeeklyRevenue(week), 0);
  };

  const calculateCashFlow = () => {
    const monthlyRevenue = getTotalRevenue() / 12;
    const monthlyOperatingCost = operatingCosts.reduce((sum, cost) => 
      sum + (cost.costs.reduce((total, monthly) => total + monthly, 0) / 12), 0
    );
    const monthlyProfit = monthlyRevenue - monthlyOperatingCost;
    const breakEvenMonths = equipmentTotal / (monthlyProfit > 0 ? monthlyProfit : 1);
    
    return {
      monthlyRevenue,
      monthlyOperatingCost,
      monthlyProfit,
      breakEvenMonths: Math.ceil(breakEvenMonths)
    };
  };

  const updateEquipment = (index, field, value) => {
    const newEquipment = [...equipment];
    if (field === 'needed') {
      newEquipment[index][field] = value;
    } else {
      newEquipment[index][field] = field === 'name' ? value : parseFloat(value) || 0;
    }
    setEquipment(newEquipment);
  };

  const addEquipmentItem = () => {
    setEquipment([...equipment, { name: 'New Item', quantity: 1, price: 0, needed: true }]);
  };

  const removeEquipmentItem = (index) => {
    setEquipment(equipment.filter((_, i) => i !== index));
  };

  const updateOperatingCost = (costIndex, month, value) => {
    const newCosts = [...operatingCosts];
    newCosts[costIndex].costs[month] = parseFloat(value) || 0;
    setOperatingCosts(newCosts);
  };

  const updateOperatingCostName = (index, value) => {
    const newCosts = [...operatingCosts];
    newCosts[index].name = value;
    setOperatingCosts(newCosts);
  };

  const addOperatingCost = () => {
    setOperatingCosts([...operatingCosts, { name: 'New Cost Item', costs: Array(12).fill(0) }]);
  };

  const removeOperatingCost = (index) => {
    if (operatingCosts.length > 1) {
      setOperatingCosts(operatingCosts.filter((_, i) => i !== index));
    }
  };

  const updateWeeklySales = (weekIndex, product, field, value) => {
    const newSales = [...weeklySales];
    const numValue = parseFloat(value);
    newSales[weekIndex][product][field] = isNaN(numValue) ? 0 : Math.max(0, numValue);
    setWeeklySales(newSales);
  };

  const fillSampleData = () => {
    const sampleSales = weeklySales.map((week, index) => {
      if (index < 8) return { ...week, guppies: { quantity: 0, price: 0.80 }, plants: { quantity: 0, price: 1.00 }, shrimp: { quantity: 0, price: 1.00 }};
      if (index < 12) return { ...week, guppies: { quantity: 5, price: 0.80 }, plants: { quantity: 4, price: 1.00 }, shrimp: { quantity: 2, price: 1.00 }};
      if (index < 16) return { ...week, guppies: { quantity: 12, price: 0.80 }, plants: { quantity: 6, price: 1.00 }, shrimp: { quantity: 4, price: 1.00 }};
      return { ...week, guppies: { quantity: 20, price: 0.80 }, plants: { quantity: 8, price: 1.00 }, shrimp: { quantity: 5, price: 1.00 }};
    });
    setWeeklySales(sampleSales);
  };

  const addCustomer = () => {
    setCustomers([...customers, {
      id: Date.now(),
      name: '',
      email: '',
      phone: '',
      totalPurchases: 0,
      visitCount: 0,
      loyaltyTier: 'Bronze',
      isActive: true
    }]);
  };

  const updateCustomer = (id, field, value) => {
    const newCustomers = customers.map(customer => {
      if (customer.id === id) {
        const updated = { ...customer, [field]: value };
        if (field === 'totalPurchases') {
          updated.loyaltyTier = value >= 500 ? 'Gold' : value >= 200 ? 'Silver' : 'Bronze';
        }
        return updated;
      }
      return customer;
    });
    setCustomers(newCustomers);
  };

  const addBreedingPair = () => {
    setBreedingPairs([...breedingPairs, {
      id: Date.now(),
      pairName: 'New Breeding Pair',
      species: 'Guppy',
      tankNumber: 'Tank 1',
      breedingDate: new Date().toISOString().split('T')[0],
      expectedBirth: '',
      fryCount: 0,
      status: 'planning'
    }]);
  };

  const updateBreedingPair = (id, field, value) => {
    const newPairs = breedingPairs.map(pair => {
      if (pair.id === id) {
        return { ...pair, [field]: value };
      }
      return pair;
    });
    setBreedingPairs(newPairs);
  };

  const addTask = () => {
    setTasks([...tasks, {
      id: Date.now(),
      title: 'New Task',
      type: 'maintenance',
      frequency: 'weekly',
      nextDue: new Date().toISOString().split('T')[0],
      completed: false
    }]);
  };

  const updateTask = (id, field, value) => {
    const newTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, [field]: value };
      }
      return task;
    });
    setTasks(newTasks);
  };

  const addWaterLog = () => {
    setWaterLogs([...waterLogs, {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      tankNumber: 'Tank 1',
      ph: 7.0,
      temperature: 24.0,
      ammonia: 0.0,
      nitrite: 0.0,
      nitrate: 0.0,
      notes: ''
    }]);
  };

  const updateWaterLog = (id, field, value) => {
    const newLogs = waterLogs.map(log => {
      if (log.id === id) {
        return { ...log, [field]: value };
      }
      return log;
    });
    setWaterLogs(newLogs);
  };

  const addMarketPrice = () => {
    setMarketPrices([...marketPrices, {
      id: Date.now(),
      species: 'New Species',
      size: 'Adult',
      currentPrice: 0.00,
      marketPrice: 0.00,
      competitor: ''
    }]);
  };

  const updateMarketPrice = (id, field, value) => {
    const newPrices = marketPrices.map(price => {
      if (price.id === id) {
        return { ...price, [field]: value };
      }
      return price;
    });
    setMarketPrices(newPrices);
  };

  const addPlant = () => {
  setPlants([...plants, {
    id: Date.now(),
    name: 'New Plant',
    species: '',
    quantity: 0,
    location: 'Tank 1',
    purchasePrice: 0,
    sellPrice: 0,
    supplier: '',
    dateAcquired: new Date().toISOString().split('T')[0],
    condition: 'healthy',
    careLevel: 'easy',
    lightRequirement: 'low',
    propagationType: 'cutting',
    notes: ''
  }]);
};

const updatePlant = (id, field, value) => {
  const newPlants = plants.map(plant => {
    if (plant.id === id) {
      return { ...plant, [field]: value };
    }
    return plant;
  });
  setPlants(newPlants);
};

const removePlant = (id) => {
  setPlants(plants.filter(plant => plant.id !== id));
};

const addPlantCareTask = () => {
  setPlantCareSchedule([...plantCareSchedule, {
    id: Date.now(),
    plantId: plants.length > 0 ? plants[0].id : 1,
    taskType: 'fertilize',
    frequency: 'weekly',
    lastDone: new Date().toISOString().split('T')[0],
    nextDue: new Date().toISOString().split('T')[0],
    completed: false
  }]);
};

const updatePlantCareTask = (id, field, value) => {
  const newSchedule = plantCareSchedule.map(task => {
    if (task.id === id) {
      return { ...task, [field]: value };
    }
    return task;
  });
  setPlantCareSchedule(newSchedule);
};

const addPropagationProject = () => {
  setPlantPropagation([...plantPropagation, {
    id: Date.now(),
    parentPlantId: plants.length > 0 ? plants[0].id : 1,
    method: 'cutting',
    dateStarted: new Date().toISOString().split('T')[0],
    expectedReady: new Date().toISOString().split('T')[0],
    expectedQuantity: 1,
    actualQuantity: 0,
    status: 'planning',
    notes: ''
  }]);
};

const updatePropagationProject = (id, field, value) => {
  const newPropagation = plantPropagation.map(project => {
    if (project.id === id) {
      return { ...project, [field]: value };
    }
    return project;
  });
  setPlantPropagation(newPropagation);
};

  const TabButton = ({ id, icon: Icon, label, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
        isActive 
          ? 'bg-blue-600 text-white shadow-md' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      <Icon size={18} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              <Calculator className="text-blue-600" />
              Aquarium Business Management System
            </h1>
            <p className="text-gray-600">Professional business management for your aquarium operation</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={exportData}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              💾 Export Data
            </button>
            <label className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer">
              📁 Import Data
              <input
                type="file"
                accept=".json"
                onChange={importData}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <TabButton id="equipment" icon={CheckSquare} label="Equipment" isActive={activeTab === 'equipment'} onClick={setActiveTab} />
          <TabButton id="operating" icon={DollarSign} label="Operating Costs" isActive={activeTab === 'operating'} onClick={setActiveTab} />
          <TabButton id="sales" icon={TrendingUp} label="Sales Tracking" isActive={activeTab === 'sales'} onClick={setActiveTab} />
          <TabButton id="breeding" icon={Heart} label="Breeding" isActive={activeTab === 'breeding'} onClick={setActiveTab} />
          <TabButton id="financial" icon={BarChart3} label="Financial Analytics" isActive={activeTab === 'financial'} onClick={setActiveTab} />
          <TabButton id="tasks" icon={Calendar} label="Tasks & Maintenance" isActive={activeTab === 'tasks'} onClick={setActiveTab} />
          <TabButton id="market" icon={TrendingDown} label="Market Intelligence" isActive={activeTab === 'market'} onClick={setActiveTab} />
          <TabButton id="customers" icon={Calculator} label="Customer Management" isActive={activeTab === 'customers'} onClick={setActiveTab} />
          <TabButton id="analytics" icon={Droplet} label="Analytics" isActive={activeTab === 'analytics'} onClick={setActiveTab} />
          <TabButton id="reports" icon={BarChart3} label="Sales Analytics" isActive={activeTab === 'reports'} onClick={setActiveTab} />
           <TabButton id="plants" icon={Droplet} label="Plant Management" isActive={activeTab === 'plants'} onClick={setActiveTab} />
        </div>
      </div>

      {activeTab === 'equipment' && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <CheckSquare className="text-green-600" />
              Equipment & Setup Costs
            </h2>
            <button
              onClick={addEquipmentItem}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              + Add Item
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3 text-left">Item</th>
                  <th className="border p-3 text-center">Needed</th>
                  <th className="border p-3 text-center">Quantity</th>
                  <th className="border p-3 text-center">Unit Price (€)</th>
                  <th className="border p-3 text-center">Total (€)</th>
                  <th className="border p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {equipment.map((item, index) => (
                  <tr key={index} className={item.needed ? 'bg-green-50' : 'bg-gray-50'}>
                    <td className="border p-3">
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => updateEquipment(index, 'name', e.target.value)}
                        className="w-full p-2 border rounded font-medium"
                      />
                    </td>
                    <td className="border p-3 text-center">
                      <input
                        type="checkbox"
                        checked={item.needed}
                        onChange={(e) => updateEquipment(index, 'needed', e.target.checked)}
                        className="w-4 h-4"
                      />
                    </td>
                    <td className="border p-3">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateEquipment(index, 'quantity', e.target.value)}
                        className="w-full p-2 border rounded text-center"
                        min="0"
                      />
                    </td>
                    <td className="border p-3">
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) => updateEquipment(index, 'price', e.target.value)}
                        className="w-full p-2 border rounded text-center"
                        min="0"
                        step="0.01"
                      />
                    </td>
                    <td className="border p-3 text-center font-semibold">
                      €{item.needed ? (item.quantity * item.price).toFixed(2) : '0.00'}
                    </td>
                    <td className="border p-3 text-center">
                      <button
                        onClick={() => removeEquipmentItem(index)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-blue-100 font-bold text-lg">
                  <td className="border p-3" colSpan="4">TOTAL INITIAL INVESTMENT</td>
                  <td className="border p-3 text-center">€{equipmentTotal.toFixed(2)}</td>
                  <td className="border p-3"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'operating' && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <DollarSign className="text-red-600" />
              Monthly Operating Costs
            </h2>
            <button
              onClick={addOperatingCost}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              + Add Cost Item
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Cost Item</th>
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => (
                    <th key={month} className="border p-2">{month}</th>
                  ))}
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {operatingCosts.map((cost, costIndex) => (
                  <tr key={costIndex} className="hover:bg-gray-50">
                    <td className="border p-2">
                      <input
                        type="text"
                        value={cost.name}
                        onChange={(e) => updateOperatingCostName(costIndex, e.target.value)}
                        className="font-medium p-1 border rounded w-full"
                        placeholder="Cost item name"
                      />
                    </td>
                    {cost.costs.map((monthCost, monthIndex) => (
                      <td key={monthIndex} className="border p-1">
                        <input
                          type="number"
                          value={monthCost}
                          onChange={(e) => updateOperatingCost(costIndex, monthIndex, e.target.value)}
                          className="w-16 p-1 border rounded text-center text-xs"
                          min="0"
                          step="0.01"
                        />
                      </td>
                    ))}
                    <td className="border p-2 text-center">
                      <button
                        onClick={() => removeOperatingCost(costIndex)}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                        disabled={operatingCosts.length === 1}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
                <tr className="bg-blue-100 font-bold">
                  <td className="border p-2">MONTHLY TOTALS</td>
                  {Array.from({ length: 12 }, (_, monthIndex) => (
                    <td key={monthIndex} className="border p-2 text-center">
                      €{getMonthlyOperatingTotal(monthIndex).toFixed(2)}
                    </td>
                  ))}
                  <td className="border p-2"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'sales' && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <TrendingUp className="text-green-600" />
              Weekly Sales Tracking
            </h2>
            <button
              onClick={fillSampleData}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Fill Sample Data
            </button>
          </div>
          
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="sticky top-0 bg-gray-100">
                <tr>
                  <th className="border p-2">Week</th>
                  <th className="border p-2">Guppies Qty</th>
                  <th className="border p-2">Guppies €</th>
                  <th className="border p-2">Plants Qty</th>
                  <th className="border p-2">Plants €</th>
                  <th className="border p-2">Shrimp Qty</th>
                  <th className="border p-2">Shrimp €</th>
                  <th className="border p-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {weeklySales.map((week, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border p-2 text-center font-semibold">{week.week}</td>
                    <td className="border p-2">
                      <input
                        type="number"
                        value={week.guppies.quantity}
                        onChange={(e) => updateWeeklySales(index, 'guppies', 'quantity', e.target.value)}
                        className="w-full p-1 border rounded text-center"
                        min="0"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="number"
                        value={week.guppies.price}
                        onChange={(e) => updateWeeklySales(index, 'guppies', 'price', e.target.value)}
                        className="w-full p-1 border rounded text-center"
                        min="0"
                        step="0.01"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="number"
                        value={week.plants.quantity}
                        onChange={(e) => updateWeeklySales(index, 'plants', 'quantity', e.target.value)}
                        className="w-full p-1 border rounded text-center"
                        min="0"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="number"
                        value={week.plants.price}
                        onChange={(e) => updateWeeklySales(index, 'plants', 'price', e.target.value)}
                        className="w-full p-1 border rounded text-center"
                        min="0"
                        step="0.01"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="number"
                        value={week.shrimp.quantity}
                        onChange={(e) => updateWeeklySales(index, 'shrimp', 'quantity', e.target.value)}
                        className="w-full p-1 border rounded text-center"
                        min="0"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="number"
                        value={week.shrimp.price}
                        onChange={(e) => updateWeeklySales(index, 'shrimp', 'price', e.target.value)}
                        className="w-full p-1 border rounded text-center"
                        min="0"
                        step="0.01"
                      />
                    </td>
                    <td className="border p-2 text-center font-semibold bg-green-100">
                      €{getWeeklyRevenue(week).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-4 bg-green-100 rounded-lg">
            <div className="text-lg font-semibold text-green-800">Total Annual Revenue</div>
            <div className="text-2xl font-bold text-green-600">€{getTotalRevenue().toFixed(2)}</div>
          </div>
        </div>
      )}

      {activeTab === 'breeding' && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Heart className="text-pink-600" />
              Breeding Management
            </h2>
            <button
              onClick={addBreedingPair}
              className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
            >
              + Add Breeding Pair
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Pair Name</th>
                  <th className="border p-2 text-left">Species</th>
                  <th className="border p-2 text-left">Tank</th>
                  <th className="border p-2 text-center">Breeding Date</th>
                  <th className="border p-2 text-center">Expected Birth</th>
                  <th className="border p-2 text-center">Fry Count</th>
                  <th className="border p-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {breedingPairs.map((pair) => (
                  <tr key={pair.id} className="hover:bg-gray-50">
                    <td className="border p-2">
                      <input
                        type="text"
                        value={pair.pairName}
                        onChange={(e) => updateBreedingPair(pair.id, 'pairName', e.target.value)}
                        className="w-full p-1 border rounded"
                      />
                    </td>
                    <td className="border p-2">
                      <select
                        value={pair.species}
                        onChange={(e) => updateBreedingPair(pair.id, 'species', e.target.value)}
                        className="w-full p-1 border rounded"
                      >
                        <option value="Guppy">Guppy</option>
                        <option value="Molly">Molly</option>
                        <option value="Platy">Platy</option>
                        <option value="Swordtail">Swordtail</option>
                        <option value="Betta">Betta</option>
                        <option value="Shrimp">Shrimp</option>
                      </select>
                    </td>
                    <td className="border p-2">
                      <input
                        type="text"
                        value={pair.tankNumber}
                        onChange={(e) => updateBreedingPair(pair.id, 'tankNumber', e.target.value)}
                        className="w-full p-1 border rounded"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="date"
                        value={pair.breedingDate}
                        onChange={(e) => updateBreedingPair(pair.id, 'breedingDate', e.target.value)}
                        className="p-1 border rounded text-xs"
                      />
                    </td>
                    <td className="border p-2 text-center font-medium">
                      <input
                        type="date"
                        value={pair.expectedBirth}
                        onChange={(e) => updateBreedingPair(pair.id, 'expectedBirth', e.target.value)}
                        className="p-1 border rounded text-xs"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="number"
                        value={pair.fryCount}
                        onChange={(e) => updateBreedingPair(pair.id, 'fryCount', parseInt(e.target.value) || 0)}
                        className="w-16 p-1 border rounded text-center"
                        min="0"
                      />
                    </td>
                    <td className="border p-2">
                      <select
                        value={pair.status}
                        onChange={(e) => updateBreedingPair(pair.id, 'status', e.target.value)}
                        className={`p-1 border rounded text-xs ${
                          pair.status === 'breeding' ? 'bg-blue-100 text-blue-800' :
                          pair.status === 'pregnant' ? 'bg-yellow-100 text-yellow-800' :
                          pair.status === 'born' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <option value="planning">Planning</option>
                        <option value="breeding">Breeding</option>
                        <option value="pregnant">Pregnant</option>
                        <option value="born">Fry Born</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'financial' && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
            <BarChart3 className="text-green-600" />
            Cash Flow Analysis
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {(() => {
              const cashFlow = calculateCashFlow();
              return (
                <>
                  <div className="p-4 bg-blue-100 rounded-lg">
                    <div className="text-sm font-semibold text-blue-800">Monthly Revenue</div>
                    <div className="text-2xl font-bold text-blue-600">€{cashFlow.monthlyRevenue.toFixed(2)}</div>
                  </div>
                  <div className="p-4 bg-red-100 rounded-lg">
                    <div className="text-sm font-semibold text-red-800">Monthly Costs</div>
                    <div className="text-2xl font-bold text-red-600">€{cashFlow.monthlyOperatingCost.toFixed(2)}</div>
                  </div>
                  <div className="p-4 bg-green-100 rounded-lg">
                    <div className="text-sm font-semibold text-green-800">Monthly Profit</div>
                    <div className="text-2xl font-bold text-green-600">€{cashFlow.monthlyProfit.toFixed(2)}</div>
                  </div>
                  <div className="p-4 bg-purple-100 rounded-lg">
                    <div className="text-sm font-semibold text-purple-800">Break-Even</div>
                    <div className="text-2xl font-bold text-purple-600">{cashFlow.breakEvenMonths} months</div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {activeTab === 'tasks' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <Calendar className="text-blue-600" />
                Daily Tasks & Schedules
              </h2>
              <button
                onClick={addTask}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                + Add Task
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {tasks.map((task) => (
                <div key={task.id} className={`p-4 border rounded-lg ${
                  task.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <input
                      type="text"
                      value={task.title}
                      onChange={(e) => updateTask(task.id, 'title', e.target.value)}
                      className="font-semibold bg-transparent border-none outline-none flex-1"
                    />
                    <button
                      onClick={() => updateTask(task.id, 'completed', !task.completed)}
                      className={`px-3 py-1 rounded text-xs ${
                        task.completed 
                          ? 'bg-green-600 text-white' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {task.completed ? 'Completed' : 'Mark Done'}
                    </button>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>Type: {task.type} | Frequency: {task.frequency}</div>
                    <div>Next Due: {task.nextDue}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Droplet className="text-cyan-600" />
                Water Quality Logs
              </h3>
              <button
                onClick={addWaterLog}
                className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700"
              >
                + Add Log Entry
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">Date</th>
                    <th className="border p-2">Tank</th>
                    <th className="border p-2">pH</th>
                    <th className="border p-2">Temp (°C)</th>
                    <th className="border p-2">NH3</th>
                    <th className="border p-2">NO2</th>
                    <th className="border p-2">NO3</th>
                    <th className="border p-2">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {waterLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="border p-2">
                        <input
                          type="date"
                          value={log.date}
                          onChange={(e) => updateWaterLog(log.id, 'date', e.target.value)}
                          className="p-1 border rounded text-xs"
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="text"
                          value={log.tankNumber}
                          onChange={(e) => updateWaterLog(log.id, 'tankNumber', e.target.value)}
                          className="w-full p-1 border rounded"
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="number"
                          value={log.ph}
                          onChange={(e) => updateWaterLog(log.id, 'ph', parseFloat(e.target.value) || 0)}
                          className="w-16 p-1 border rounded text-center"
                          step="0.1"
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="number"
                          value={log.temperature}
                          onChange={(e) => updateWaterLog(log.id, 'temperature', parseFloat(e.target.value) || 0)}
                          className="w-16 p-1 border rounded text-center"
                          step="0.1"
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="number"
                          value={log.ammonia}
                          onChange={(e) => updateWaterLog(log.id, 'ammonia', parseFloat(e.target.value) || 0)}
                          className="w-16 p-1 border rounded text-center"
                          step="0.1"
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="number"
                          value={log.nitrite}
                          onChange={(e) => updateWaterLog(log.id, 'nitrite', parseFloat(e.target.value) || 0)}
                          className="w-16 p-1 border rounded text-center"
                          step="0.1"
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="number"
                          value={log.nitrate}
                          onChange={(e) => updateWaterLog(log.id, 'nitrate', parseFloat(e.target.value) || 0)}
                          className="w-16 p-1 border rounded text-center"
                          step="0.1"
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="text"
                          value={log.notes}
                          onChange={(e) => updateWaterLog(log.id, 'notes', e.target.value)}
                          className="w-full p-1 border rounded"
                          placeholder="Notes"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'market' && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <TrendingDown className="text-orange-600" />
              Market Intelligence & Pricing
            </h2>
            <button
              onClick={addMarketPrice}
              className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
            >
              + Add Market Data
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Species</th>
                  <th className="border p-2 text-left">Size</th>
                  <th className="border p-2 text-center">Your Price</th>
                  <th className="border p-2 text-center">Market Price</th>
                  <th className="border p-2 text-center">Price Gap</th>
                  <th className="border p-2 text-left">Competitor</th>
                </tr>
              </thead>
              <tbody>
                {marketPrices.map((price) => {
                  const gap = price.marketPrice - price.currentPrice;
                  const gapPercent = price.currentPrice > 0 ? ((gap / price.currentPrice) * 100).toFixed(1) : 0;
                  return (
                    <tr key={price.id} className="hover:bg-gray-50">
                      <td className="border p-2">
                        <input
                          type="text"
                          value={price.species}
                          onChange={(e) => updateMarketPrice(price.id, 'species', e.target.value)}
                          className="w-full p-1 border rounded"
                        />
                      </td>
                      <td className="border p-2">
                        <select
                          value={price.size}
                          onChange={(e) => updateMarketPrice(price.id, 'size', e.target.value)}
                          className="w-full p-1 border rounded"
                        >
                          <option value="Juvenile">Juvenile</option>
                          <option value="Adult">Adult</option>
                          <option value="Breeding">Breeding</option>
                          <option value="Large">Large</option>
                        </select>
                      </td>
                      <td className="border p-2">
                        <input
                          type="number"
                          value={price.currentPrice}
                          onChange={(e) => updateMarketPrice(price.id, 'currentPrice', parseFloat(e.target.value) || 0)}
                          className="w-20 p-1 border rounded text-center"
                          min="0"
                          step="0.01"
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="number"
                          value={price.marketPrice}
                          onChange={(e) => updateMarketPrice(price.id, 'marketPrice', parseFloat(e.target.value) || 0)}
                          className="w-20 p-1 border rounded text-center"
                          min="0"
                          step="0.01"
                        />
                      </td>
                      <td className="border p-2 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          gap > 0 ? 'bg-green-100 text-green-800' : 
                          gap < 0 ? 'bg-red-100 text-red-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          €{gap.toFixed(2)} ({gapPercent}%)
                        </span>
                      </td>
                      <td className="border p-2">
                        <input
                          type="text"
                          value={price.competitor}
                          onChange={(e) => updateMarketPrice(price.id, 'competitor', e.target.value)}
                          className="w-full p-1 border rounded"
                          placeholder="Competitor name"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'customers' && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Calculator className="text-blue-600" />
              Customer Management
            </h2>
            <button
              onClick={addCustomer}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              + Add Customer
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Name</th>
                  <th className="border p-2 text-left">Email</th>
                  <th className="border p-2 text-left">Phone</th>
                  <th className="border p-2 text-center">Total Purchases</th>
                  <th className="border p-2 text-center">Visits</th>
                  <th className="border p-2 text-center">Loyalty Tier</th>
                  <th className="border p-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="border p-2">
                      <input
                        type="text"
                        value={customer.name}
                        onChange={(e) => updateCustomer(customer.id, 'name', e.target.value)}
                        className="w-full p-1 border rounded"
                        placeholder="Customer name"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="email"
                        value={customer.email}
                        onChange={(e) => updateCustomer(customer.id, 'email', e.target.value)}
                        className="w-full p-1 border rounded"
                        placeholder="Email"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="tel"
                        value={customer.phone}
                        onChange={(e) => updateCustomer(customer.id, 'phone', e.target.value)}
                        className="w-full p-1 border rounded"
                        placeholder="Phone"
                      />
                    </td>
                    <td className="border p-2 text-center">
                      <input
                        type="number"
                        value={customer.totalPurchases}
                        onChange={(e) => updateCustomer(customer.id, 'totalPurchases', parseFloat(e.target.value) || 0)}
                        className="w-20 p-1 border rounded text-center"
                        min="0"
                        step="0.01"
                      />
                    </td>
                    <td className="border p-2 text-center">
                      <input
                        type="number"
                        value={customer.visitCount}
                        onChange={(e) => updateCustomer(customer.id, 'visitCount', parseInt(e.target.value) || 0)}
                        className="w-16 p-1 border rounded text-center"
                        min="0"
                      />
                    </td>
                    <td className="border p-2 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        customer.loyaltyTier === 'Gold' ? 'bg-yellow-100 text-yellow-800' :
                        customer.loyaltyTier === 'Silver' ? 'bg-gray-100 text-gray-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {customer.loyaltyTier}
                      </span>
                    </td>
                    <td className="border p-2 text-center">
                      <span className={`px-2 py-1 rounded text-xs ${
                        customer.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {customer.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
            <Droplet className="text-purple-600" />
            Business Analytics
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-100 rounded-lg">
              <div className="text-sm font-semibold text-blue-800">Initial Investment</div>
              <div className="text-2xl font-bold text-blue-600">€{equipmentTotal.toFixed(2)}</div>
            </div>
            <div className="p-4 bg-green-100 rounded-lg">
              <div className="text-sm font-semibold text-green-800">Annual Revenue</div>
              <div className="text-2xl font-bold text-green-600">€{getTotalRevenue().toFixed(2)}</div>
            </div>
            <div className="p-4 bg-purple-100 rounded-lg">
              <div className="text-sm font-semibold text-purple-800">Net Profit</div>
              <div className="text-2xl font-bold text-purple-600">
                €{(() => {
                  const totalRevenue = getTotalRevenue();
                  const totalOperatingCosts = operatingCosts.reduce((sum, cost) => 
                    sum + cost.costs.reduce((total, monthly) => total + (monthly || 0), 0), 0
                  );
                  return (totalRevenue - totalOperatingCosts).toFixed(2);
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
{activeTab === 'reports' && (
  <div className="space-y-6">
    {/* Monthly/Quarterly Profit Analysis */}
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
        <BarChart3 className="text-blue-600" />
        Monthly Profit Analysis
      </h2>
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        {(() => {
          const getMonthlyData = () => {
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return months.map((month, index) => {
              const startWeek = Math.floor(index * 4.33);
              const endWeek = Math.floor((index + 1) * 4.33);
              const monthlyRevenue = weeklySales
                .slice(startWeek, endWeek)
                .reduce((sum, week) => sum + getWeeklyRevenue(week), 0);
              const monthlyCosts = getMonthlyOperatingTotal(index);
              const monthlyProfit = monthlyRevenue - monthlyCosts;
              
              return {
                month,
                revenue: monthlyRevenue,
                costs: monthlyCosts,
                profit: monthlyProfit
              };
            });
          };

          const monthlyData = getMonthlyData();
          const currentQuarter = Math.floor(new Date().getMonth() / 3);
          const quarterlyData = [
            monthlyData.slice(0, 3).reduce((sum, m) => sum + m.profit, 0),
            monthlyData.slice(3, 6).reduce((sum, m) => sum + m.profit, 0),
            monthlyData.slice(6, 9).reduce((sum, m) => sum + m.profit, 0),
            monthlyData.slice(9, 12).reduce((sum, m) => sum + m.profit, 0)
          ];

          return (
            <>
              <div className="p-4 bg-green-100 rounded-lg">
                <div className="text-sm font-semibold text-green-800">This Month Profit</div>
                <div className="text-2xl font-bold text-green-600">
                  €{monthlyData[new Date().getMonth()].profit.toFixed(2)}
                </div>
              </div>
              <div className="p-4 bg-blue-100 rounded-lg">
                <div className="text-sm font-semibold text-blue-800">This Quarter</div>
                <div className="text-2xl font-bold text-blue-600">
                  €{quarterlyData[currentQuarter].toFixed(2)}
                </div>
              </div>
              <div className="p-4 bg-purple-100 rounded-lg">
                <div className="text-sm font-semibold text-purple-800">Best Month</div>
                <div className="text-2xl font-bold text-purple-600">
                  {monthlyData.reduce((best, current, index) => 
                    current.profit > monthlyData[best].profit ? index : best, 0) + 1 <= 12 ? 
                    ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][monthlyData.reduce((best, current, index) => 
                    current.profit > monthlyData[best].profit ? index : best, 0)] : 'Jan'}
                </div>
              </div>
              <div className="p-4 bg-orange-100 rounded-lg">
                <div className="text-sm font-semibold text-orange-800">Annual Projection</div>
                <div className="text-2xl font-bold text-orange-600">
                  €{(monthlyData.reduce((sum, m) => sum + m.profit, 0) * 1.1).toFixed(2)}
                </div>
              </div>
            </>
          );
        })()}
      </div>

      <div className="overflow-x-auto">
        <div className="flex items-end gap-2 h-64 p-4 bg-gray-50 rounded-lg min-w-[800px]">
          {(() => {
            const getMonthlyData = () => {
              const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
              return months.map((month, index) => {
                const startWeek = Math.floor(index * 4.33);
                const endWeek = Math.floor((index + 1) * 4.33);
                const monthlyRevenue = weeklySales
                  .slice(startWeek, endWeek)
                  .reduce((sum, week) => sum + getWeeklyRevenue(week), 0);
                const monthlyCosts = getMonthlyOperatingTotal(index);
                const monthlyProfit = monthlyRevenue - monthlyCosts;
                
                return {
                  month,
                  revenue: monthlyRevenue,
                  costs: monthlyCosts,
                  profit: monthlyProfit
                };
              });
            };

            const monthlyData = getMonthlyData();
            const maxProfit = Math.max(...monthlyData.map(m => Math.max(m.revenue, m.costs, Math.abs(m.profit))));
            const scale = maxProfit > 0 ? 200 / maxProfit : 1;

            return monthlyData.map((data, index) => (
              <div key={index} className="flex flex-col items-center gap-2 flex-1">
                <div className="flex flex-col items-center gap-1">
                  <div 
                    className="bg-green-500 rounded-t w-8 min-h-[4px]"
                    style={{ height: `${Math.max(4, data.revenue * scale)}px` }}
                    title={`Revenue: €${data.revenue.toFixed(2)}`}
                  ></div>
                  <div 
                    className="bg-red-500 w-8 min-h-[4px]"
                    style={{ height: `${Math.max(4, data.costs * scale)}px` }}
                    title={`Costs: €${data.costs.toFixed(2)}`}
                  ></div>
                  <div 
                    className={`w-8 min-h-[4px] rounded-b ${data.profit >= 0 ? 'bg-blue-500' : 'bg-orange-500'}`}
                    style={{ height: `${Math.max(4, Math.abs(data.profit) * scale)}px` }}
                    title={`Profit: €${data.profit.toFixed(2)}`}
                  ></div>
                </div>
                <div className="text-xs font-medium text-center">{data.month}</div>
                <div className="text-xs text-gray-600 text-center">€{data.profit.toFixed(0)}</div>
              </div>
            ));
          })()}
        </div>
        <div className="flex justify-center gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span>Costs</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span>Profit</span>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
        <TrendingUp className="text-green-600" />
        Best-Selling Species Analysis
      </h3>
      <div className="grid md:grid-cols-3 gap-6">
        {(() => {
          const speciesData = {
            guppies: {
              name: 'Guppies',
              totalSold: weeklySales.reduce((sum, week) => sum + (week.guppies?.quantity || 0), 0),
              totalRevenue: weeklySales.reduce((sum, week) => sum + ((week.guppies?.quantity || 0) * (week.guppies?.price || 0)), 0),
              avgPrice: weeklySales.reduce((sum, week) => sum + (week.guppies?.price || 0), 0) / weeklySales.length,
              color: 'blue'
            },
            plants: {
              name: 'Plants',
              totalSold: weeklySales.reduce((sum, week) => sum + (week.plants?.quantity || 0), 0),
              totalRevenue: weeklySales.reduce((sum, week) => sum + ((week.plants?.quantity || 0) * (week.plants?.price || 0)), 0),
              avgPrice: weeklySales.reduce((sum, week) => sum + (week.plants?.price || 0), 0) / weeklySales.length,
              color: 'green'
            },
            shrimp: {
              name: 'Shrimp',
              totalSold: weeklySales.reduce((sum, week) => sum + (week.shrimp?.quantity || 0), 0),
              totalRevenue: weeklySales.reduce((sum, week) => sum + ((week.shrimp?.quantity || 0) * (week.shrimp?.price || 0)), 0),
              avgPrice: weeklySales.reduce((sum, week) => sum + (week.shrimp?.price || 0), 0) / weeklySales.length,
              color: 'pink'
            }
          };

          const sortedSpecies = Object.values(speciesData).sort((a, b) => b.totalRevenue - a.totalRevenue);

          return sortedSpecies.map((species, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded-lg border-l-4 border-gray-400">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-800">{species.name}</h4>
                <span className="px-2 py-1 text-xs bg-gray-200 text-gray-800 rounded-full">
                  #{index + 1}
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="text-gray-700">
                  <strong>Total Sold:</strong> {species.totalSold} units
                </div>
                <div className="text-gray-700">
                  <strong>Revenue:</strong> €{species.totalRevenue.toFixed(2)}
                </div>
                <div className="text-gray-700">
                  <strong>Avg Price:</strong> €{species.avgPrice.toFixed(2)}
                </div>
                <div className="text-gray-700">
                  <strong>Weekly Avg:</strong> {(species.totalSold / 52).toFixed(1)} units
                </div>
              </div>
            </div>
          ));
        })()}
      </div>
    </div>

    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
        <Calendar className="text-orange-600" />
        Seasonal Sales Patterns
      </h3>
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        {(() => {
          const seasons = [
            { name: 'Spring', weeks: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], color: 'green' },
            { name: 'Summer', weeks: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34], color: 'yellow' },
            { name: 'Fall', weeks: [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47], color: 'orange' },
            { name: 'Winter', weeks: [48, 49, 50, 51, 0, 1, 2, 3, 4, 5, 6, 7, 8], color: 'blue' }
          ];

          return seasons.map((season) => {
            const seasonRevenue = season.weeks.reduce((sum, weekIndex) => {
              if (weekIndex >= 0 && weekIndex < weeklySales.length) {
                return sum + getWeeklyRevenue(weeklySales[weekIndex]);
              }
              return sum;
            }, 0);

            const seasonAvgWeekly = seasonRevenue / season.weeks.length;

            return (
              <div key={season.name} className="p-4 bg-gray-100 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">{season.name}</h4>
                <div className="space-y-2 text-sm">
                  <div className="text-gray-700">
                    <strong>Total Revenue:</strong> €{seasonRevenue.toFixed(2)}
                  </div>
                  <div className="text-gray-700">
                    <strong>Weekly Avg:</strong> €{seasonAvgWeekly.toFixed(2)}
                  </div>
                  <div className="text-gray-700">
                    <strong>Performance:</strong> {seasonAvgWeekly > getTotalRevenue()/52 ? '📈 Above Avg' : '📉 Below Avg'}
                  </div>
                </div>
              </div>
            );
          });
        })()}
      </div>
    </div>
  </div>
)}
  {activeTab === 'plants' && (
  <div className="space-y-6">
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Droplet className="text-green-600" />
          Plant Inventory Management
        </h2>
        <button
          onClick={addPlant}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          + Add Plant
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Plant Name</th>
              <th className="border p-2 text-left">Species</th>
              <th className="border p-2 text-center">Qty</th>
              <th className="border p-2 text-left">Location</th>
              <th className="border p-2 text-center">Buy Price</th>
              <th className="border p-2 text-center">Sell Price</th>
              <th className="border p-2 text-center">Profit/Unit</th>
              <th className="border p-2 text-center">Condition</th>
              <th className="border p-2 text-center">Care Level</th>
              <th className="border p-2 text-center">Light Need</th>
              <th className="border p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {plants.map((plant) => {
              const profitPerUnit = plant.sellPrice - plant.purchasePrice;
              
              return (
                <tr key={plant.id} className="hover:bg-gray-50">
                  <td className="border p-2">
                    <input
                      type="text"
                      value={plant.name}
                      onChange={(e) => updatePlant(plant.id, 'name', e.target.value)}
                      className="w-full p-1 border rounded font-medium"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="text"
                      value={plant.species}
                      onChange={(e) => updatePlant(plant.id, 'species', e.target.value)}
                      className="w-full p-1 border rounded text-xs"
                      placeholder="Scientific name"
                    />
                  </td>
                  <td className="border p-2 text-center">
                    <input
                      type="number"
                      value={plant.quantity}
                      onChange={(e) => updatePlant(plant.id, 'quantity', parseInt(e.target.value) || 0)}
                      className="w-16 p-1 border rounded text-center"
                      min="0"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="text"
                      value={plant.location}
                      onChange={(e) => updatePlant(plant.id, 'location', e.target.value)}
                      className="w-full p-1 border rounded"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      value={plant.purchasePrice}
                      onChange={(e) => updatePlant(plant.id, 'purchasePrice', parseFloat(e.target.value) || 0)}
                      className="w-20 p-1 border rounded text-center"
                      min="0"
                      step="0.01"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      value={plant.sellPrice}
                      onChange={(e) => updatePlant(plant.id, 'sellPrice', parseFloat(e.target.value) || 0)}
                      className="w-20 p-1 border rounded text-center"
                      min="0"
                      step="0.01"
                    />
                  </td>
                  <td className="border p-2 text-center">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      profitPerUnit > 0 ? 'bg-green-100 text-green-800' : 
                      profitPerUnit < 0 ? 'bg-red-100 text-red-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      €{profitPerUnit.toFixed(2)}
                    </span>
                  </td>
                  <td className="border p-2">
                    <select
                      value={plant.condition}
                      onChange={(e) => updatePlant(plant.id, 'condition', e.target.value)}
                      className={`p-1 border rounded text-xs w-full ${
                        plant.condition === 'excellent' ? 'bg-green-100 text-green-800' :
                        plant.condition === 'healthy' ? 'bg-blue-100 text-blue-800' :
                        plant.condition === 'fair' ? 'bg-yellow-100 text-yellow-800' :
                        plant.condition === 'poor' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <option value="excellent">Excellent</option>
                      <option value="healthy">Healthy</option>
                      <option value="fair">Fair</option>
                      <option value="poor">Poor</option>
                      <option value="dying">Dying</option>
                    </select>
                  </td>
                  <td className="border p-2">
                    <select
                      value={plant.careLevel}
                      onChange={(e) => updatePlant(plant.id, 'careLevel', e.target.value)}
                      className="p-1 border rounded text-xs w-full"
                    >
                      <option value="easy">Easy</option>
                      <option value="moderate">Moderate</option>
                      <option value="hard">Hard</option>
                      <option value="expert">Expert</option>
                    </select>
                  </td>
                  <td className="border p-2">
                    <select
                      value={plant.lightRequirement}
                      onChange={(e) => updatePlant(plant.id, 'lightRequirement', e.target.value)}
                      className="p-1 border rounded text-xs w-full"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </td>
                  <td className="border p-2 text-center">
                    <button
                      onClick={() => removePlant(plant.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
            <div className="grid md:grid-cols-4 gap-4 mt-6">
        <div className="p-4 bg-green-100 rounded-lg">
          <div className="text-sm font-semibold text-green-800">Total Plants</div>
          <div className="text-2xl font-bold text-green-600">
            {plants.reduce((sum, plant) => sum + plant.quantity, 0)}
          </div>
        </div>
        <div className="p-4 bg-blue-100 rounded-lg">
          <div className="text-sm font-semibold text-blue-800">Total Value</div>
          <div className="text-2xl font-bold text-blue-600">
            €{plants.reduce((sum, plant) => sum + (plant.quantity * plant.sellPrice), 0).toFixed(2)}
          </div>
        </div>
        <div className="p-4 bg-purple-100 rounded-lg">
          <div className="text-sm font-semibold text-purple-800">Plant Varieties</div>
          <div className="text-2xl font-bold text-purple-600">{plants.length}</div>
        </div>
        <div className="p-4 bg-orange-100 rounded-lg">
          <div className="text-sm font-semibold text-orange-800">Avg Profit Margin</div>
          <div className="text-2xl font-bold text-orange-600">
            {plants.length > 0 ? 
              ((plants.reduce((sum, plant) => sum + ((plant.sellPrice - plant.purchasePrice) / plant.sellPrice * 100), 0) / plants.length) || 0).toFixed(1) 
              : 0}%
          </div>
        </div>
      </div>
    </div>
<div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Calendar className="text-blue-600" />
          Plant Care Schedule
        </h3>
        <button
          onClick={addPlantCareTask}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add Care Task
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {plantCareSchedule.map((task) => {
          const plant = plants.find(p => p.id === task.plantId);
          const isOverdue = new Date(task.nextDue) < new Date();
          
          return (
            <div key={task.id} className={`p-4 border rounded-lg ${
              task.completed ? 'bg-green-50 border-green-200' : 
              isOverdue ? 'bg-red-50 border-red-200' : 
              'bg-white border-gray-200'
            }`}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">{task.taskType.charAt(0).toUpperCase() + task.taskType.slice(1)}</h4>
                  <div className="text-sm text-gray-600">{plant?.name || 'Unknown Plant'}</div>
                </div>
                <button
                  onClick={() => updatePlantCareTask(task.id, 'completed', !task.completed)}
                  className={`px-3 py-1 rounded text-xs ${
                    task.completed 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {task.completed ? '✓ Done' : 'Mark Done'}
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <label className="text-gray-600">Plant:</label>
                  <select
                    value={task.plantId}
                    onChange={(e) => updatePlantCareTask(task.id, 'plantId', parseInt(e.target.value))}
                    className="w-full p-1 border rounded text-xs"
                  >
                    {plants.map(plant => (
                      <option key={plant.id} value={plant.id}>{plant.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-gray-600">Task:</label>
                  <select
                    value={task.taskType}
                    onChange={(e) => updatePlantCareTask(task.id, 'taskType', e.target.value)}
                    className="w-full p-1 border rounded text-xs"
                  >
                    <option value="fertilize">Fertilize</option>
                    <option value="trim">Trim</option>
                    <option value="water_change">Water Change</option>
                    <option value="inspect">Inspect</option>
                    <option value="relocate">Relocate</option>
                    <option value="propagate">Propagate</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-600">Frequency:</label>
                  <select
                    value={task.frequency}
                    onChange={(e) => updatePlantCareTask(task.id, 'frequency', e.target.value)}
                    className="w-full p-1 border rounded text-xs"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Bi-weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-600">Next Due:</label>
                  <input
                    type="date"
                    value={task.nextDue}
                    onChange={(e) => updatePlantCareTask(task.id, 'nextDue', e.target.value)}
                    className="w-full p-1 border rounded text-xs"
                  />
                </div>
              </div>
              
              {isOverdue && !task.completed && (
                <div className="mt-2 text-xs text-red-600 font-medium">
                  ⚠️ Overdue by {Math.floor((new Date() - new Date(task.nextDue)) / (1000 * 60 * 60 * 24))} days
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
<div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Heart className="text-pink-600" />
          Plant Propagation Projects
        </h3>
        <button
          onClick={addPropagationProject}
          className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
        >
          + Start Propagation
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Parent Plant</th>
              <th className="border p-2 text-left">Method</th>
              <th className="border p-2 text-center">Started</th>
              <th className="border p-2 text-center">Expected Ready</th>
              <th className="border p-2 text-center">Expected Qty</th>
              <th className="border p-2 text-center">Actual Qty</th>
              <th className="border p-2 text-center">Status</th>
              <th className="border p-2 text-left">Notes</th>
            </tr>
          </thead>
          <tbody>
            {plantPropagation.map((project) => {
              const parentPlant = plants.find(p => p.id === project.parentPlantId);
              
              return (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="border p-2">
                    <select
                      value={project.parentPlantId}
                      onChange={(e) => updatePropagationProject(project.id, 'parentPlantId', parseInt(e.target.value))}
                      className="w-full p-1 border rounded"
                    >
                      {plants.map(plant => (
                        <option key={plant.id} value={plant.id}>{plant.name}</option>
                      ))}
                    </select>
                  </td>
                  <td className="border p-2">
                    <select
                      value={project.method}
                      onChange={(e) => updatePropagationProject(project.id, 'method', e.target.value)}
                      className="w-full p-1 border rounded"
                    >
                      <option value="cutting">Cutting</option>
                      <option value="rhizome division">Rhizome Division</option>
                      <option value="runners">Runners</option>
                      <option value="seeds">Seeds</option>
                      <option value="tissue culture">Tissue Culture</option>
                      <option value="splitting">Splitting</option>
                    </select>
                  </td>
                  <td className="border p-2">
                    <input
                      type="date"
                      value={project.dateStarted}
                      onChange={(e) => updatePropagationProject(project.id, 'dateStarted', e.target.value)}
                      className="p-1 border rounded text-xs"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="date"
                      value={project.expectedReady}
                      onChange={(e) => updatePropagationProject(project.id, 'expectedReady', e.target.value)}
                      className="p-1 border rounded text-xs"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      value={project.expectedQuantity}
                      onChange={(e) => updatePropagationProject(project.id, 'expectedQuantity', parseInt(e.target.value) || 0)}
                      className="w-16 p-1 border rounded text-center"
                      min="0"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      value={project.actualQuantity}
                      onChange={(e) => updatePropagationProject(project.id, 'actualQuantity', parseInt(e.target.value) || 0)}
                      className="w-16 p-1 border rounded text-center"
                      min="0"
                    />
                  </td>
                  <td className="border p-2">
                    <select
                      value={project.status}
                      onChange={(e) => updatePropagationProject(project.id, 'status', e.target.value)}
                      className={`p-1 border rounded text-xs ${
                        project.status === 'completed' ? 'bg-green-100 text-green-800' :
                        project.status === 'propagating' ? 'bg-blue-100 text-blue-800' :
                        project.status === 'failed' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <option value="planning">Planning</option>
                      <option value="propagating">Propagating</option>
                      <option value="rooting">Rooting</option>
                      <option value="growing">Growing</option>
                      <option value="ready">Ready</option>
                      <option value="completed">Completed</option>
                      <option value="failed">Failed</option>
                    </select>
                  </td>
                  <td className="border p-2">
                    <input
                      type="text"
                      value={project.notes}
                      onChange={(e) => updatePropagationProject(project.id, 'notes', e.target.value)}
                      className="w-full p-1 border rounded text-xs"
                      placeholder="Progress notes..."
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
<div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
        <TrendingUp className="text-cyan-600" />
        Plant Business Analytics
      </h3>
      <div className="grid md:grid-cols-3 gap-6">
        {(() => {
          const totalInvestment = plants.reduce((sum, plant) => sum + (plant.quantity * plant.purchasePrice), 0);
          const potentialRevenue = plants.reduce((sum, plant) => sum + (plant.quantity * plant.sellPrice), 0);
          const totalProfit = potentialRevenue - totalInvestment;
          const avgProfitMargin = plants.length > 0 ? 
            plants.reduce((sum, plant) => {
              const margin = plant.sellPrice > 0 ? ((plant.sellPrice - plant.purchasePrice) / plant.sellPrice) * 100 : 0;
              return sum + margin;
            }, 0) / plants.length : 0;

          const healthyPlants = plants.filter(p => p.condition === 'excellent' || p.condition === 'healthy').length;
          const healthPercentage = plants.length > 0 ? (healthyPlants / plants.length) * 100 : 0;

          const easyCarePlants = plants.filter(p => p.careLevel === 'easy').length;
          const moderateCarePlants = plants.filter(p => p.careLevel === 'moderate').length;
          const hardCarePlants = plants.filter(p => p.careLevel === 'hard' || p.careLevel === 'expert').length;

          return (
            <>
              <div className="p-4 bg-green-100 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-3">Financial Overview</h4>
                <div className="space-y-2 text-sm">
                  <div className="text-green-700">
                    <strong>Total Investment:</strong> €{totalInvestment.toFixed(2)}
                  </div>
                  <div className="text-green-700">
                    <strong>Potential Revenue:</strong> €{potentialRevenue.toFixed(2)}
                  </div>
                  <div className="text-green-700">
                    <strong>Potential Profit:</strong> €{totalProfit.toFixed(2)}
                  </div>
                  <div className="text-green-700">
                    <strong>Avg Profit Margin:</strong> {avgProfitMargin.toFixed(1)}%
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-100 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-3">Plant Health Status</h4>
                <div className="space-y-2 text-sm">
                  <div className="text-blue-700">
                    <strong>Healthy Plants:</strong> {healthyPlants}/{plants.length}
                  </div>
                  <div className="text-blue-700">
                    <strong>Health Rate:</strong> {healthPercentage.toFixed(1)}%
                  </div>
                  <div className="text-blue-700">
                    <strong>Care Required:</strong> {plantCareSchedule.filter(t => !t.completed).length} tasks
                  </div>
                  <div className="text-blue-700">
                    <strong>Active Projects:</strong> {plantPropagation.filter(p => p.status === 'propagating' || p.status === 'rooting').length}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-purple-100 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-3">Care Complexity</h4>
                <div className="space-y-2 text-sm">
                  <div className="text-purple-700">
                    <strong>Easy Care:</strong> {easyCarePlants} plants
                  </div>
                  <div className="text-purple-700">
                    <strong>Moderate Care:</strong> {moderateCarePlants} plants
                  </div>
                  <div className="text-purple-700">
                    <strong>Advanced Care:</strong> {hardCarePlants} plants
                  </div>
                  <div className="text-purple-700">
                    <strong>Most Common:</strong> {easyCarePlants >= moderateCarePlants && easyCarePlants >= hardCarePlants ? 'Easy' : 
                                                 moderateCarePlants >= hardCarePlants ? 'Moderate' : 'Advanced'}
                  </div>
                </div>
              </div>
            </>
          );
        })()}
      </div>
    </div>

)}


  );
};

export default AquariumBusinessPlanner;
