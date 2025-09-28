// pages/index.js - This is your main app file for Vercel
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

  // Auto-save data whenever it changes
  useEffect(() => { saveToStorage('equipment', equipment); }, [equipment]);
  useEffect(() => { saveToStorage('operatingCosts', operatingCosts); }, [operatingCosts]);
  useEffect(() => { saveToStorage('weeklySales', weeklySales); }, [weeklySales]);
  useEffect(() => { saveToStorage('customers', customers); }, [customers]);
  useEffect(() => { saveToStorage('breedingPairs', breedingPairs); }, [breedingPairs]);
  useEffect(() => { saveToStorage('tasks', tasks); }, [tasks]);
  useEffect(() => { saveToStorage('waterLogs', waterLogs); }, [waterLogs]);
  useEffect(() => { saveToStorage('marketPrices', marketPrices); }, [marketPrices]);

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
        </div>
      </div>

      {/* Rest of your app content stays the same... */}
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

      {/* Add all other tab content here - keeping it short for space */}
    </div>
  );
};

export default AquariumBusinessPlanner;
