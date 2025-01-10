import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [yearRange, setYearRange] = useState({ start: "", end: "" });
  const [revenueRange, setRevenueRange] = useState({ min: "", max: "" });
  const [netIncomeRange, setNetIncomeRange] = useState({ min: "", max: "" });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const API_URL =`https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=${process.env.REACT_APP_API_KEY}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
        setFilteredData(result); // Initialize filteredData with the full data set
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const applyFilters = () => {
    const filtered = data.filter((item) => {
      const itemYear = new Date(item.date).getFullYear();
      const yearValid =
        (!yearRange.start || itemYear >= yearRange.start) &&
        (!yearRange.end || itemYear <= yearRange.end);
      const revenueValid =
        (!revenueRange.min || item.revenue >= revenueRange.min) &&
        (!revenueRange.max || item.revenue <= revenueRange.max);
      const netIncomeValid =
        (!netIncomeRange.min || item.netIncome >= netIncomeRange.min) &&
        (!netIncomeRange.max || item.netIncome <= netIncomeRange.max);

      return yearValid && revenueValid && netIncomeValid;
    });

    setFilteredData(filtered);
  };

  const sortData = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sorted = [...filteredData].sort((a, b) => {
      const aValue = key === "date" ? new Date(a[key]) : a[key];
      const bValue = key === "date" ? new Date(b[key]) : b[key];

      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredData(sorted);
  };

  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">Financial Data</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
          {/* Filters Section */}
          <div className="filter-section mt-4 mb-4">
            <h2 className="text-xl font-bold mb-2">Filters</h2>
            <div className="flex flex-wrap gap-4">
              {/* Year Range Filter */}
              <div>
                <label className="block font-bold mb-1">Year Range:</label>
                <input
                  type="number"
                  className="border p-2 mr-2"
                  value={yearRange.start}
                  onChange={(e) =>
                    setYearRange({ ...yearRange, start: e.target.value })
                  }
                  placeholder="Start Year"
                />
                <input
                  type="number"
                  className="border p-2"
                  value={yearRange.end}
                  onChange={(e) =>
                    setYearRange({ ...yearRange, end: e.target.value })
                  }
                  placeholder="End Year"
                />
              </div>

              {/* Revenue Range Filter */}
              <div>
                <label className="block font-bold mb-1">Revenue Range:</label>
                <input
                  type="number"
                  className="border p-2 mr-2"
                  value={revenueRange.min}
                  onChange={(e) =>
                    setRevenueRange({ ...revenueRange, min: e.target.value })
                  }
                  placeholder="Min Revenue"
                />
                <input
                  type="number"
                  className="border p-2"
                  value={revenueRange.max}
                  onChange={(e) =>
                    setRevenueRange({ ...revenueRange, max: e.target.value })
                  }
                  placeholder="Max Revenue"
                />
              </div>

              {/* Net Income Range Filter */}
              <div>
                <label className="block font-bold mb-1">Net Income Range:</label>
                <input
                  type="number"
                  className="border p-2 mr-2"
                  value={netIncomeRange.min}
                  onChange={(e) =>
                    setNetIncomeRange({ ...netIncomeRange, min: e.target.value })
                  }
                  placeholder="Min Net Income"
                />
                <input
                  type="number"
                  className="border p-2"
                  value={netIncomeRange.max}
                  onChange={(e) =>
                    setNetIncomeRange({ ...netIncomeRange, max: e.target.value })
                  }
                  placeholder="Max Net Income"
                />
              </div>

              {/* Apply Filters Button */}
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={applyFilters}
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* Table Section */}
          <table className="table-auto border-collapse border border-gray-300 w-full mt-4">
            <thead>
              <tr className="bg-gray-100">
                <th
                  className="border border-gray-300 px-4 py-2 cursor-pointer"
                  onClick={() => sortData("date")}
                >
                  Date {sortConfig.key === "date" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="border border-gray-300 px-4 py-2 cursor-pointer"
                  onClick={() => sortData("revenue")}
                >
                  Revenue {sortConfig.key === "revenue" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="border border-gray-300 px-4 py-2 cursor-pointer"
                  onClick={() => sortData("netIncome")}
                >
                  Net Income {sortConfig.key === "netIncome" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th className="border border-gray-300 px-4 py-2">Gross Profit</th>
                <th className="border border-gray-300 px-4 py-2">EPS</th>
                <th className="border border-gray-300 px-4 py-2">Operating Income</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{item.date}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.revenue}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.netIncome}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.grossProfit}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.eps}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.operatingIncome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default App;
