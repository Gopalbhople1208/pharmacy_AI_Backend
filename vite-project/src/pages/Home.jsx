import { useEffect, useState } from "react";

import {
  getInventory,
  getLowStock,
  getExpiredMedicines,
  getNearExpiryMedicines,
} from "../services/api";


function Home() {
  const [inventory, setInventory] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [expired, setExpired] = useState([]);
  const [nearExpiry, setNearExpiry] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // ==========================================
  // Load Pharmacy Data
  // ==========================================
  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true);
        setError("");

        const [
          inventoryData,
          lowStockData,
          expiredData,
          nearExpiryData,
        ] = await Promise.all([
          getInventory(),
          getLowStock(),
          getExpiredMedicines(),
          getNearExpiryMedicines(),
        ]);

        console.log("Inventory:", inventoryData);
        console.log("Low Stock:", lowStockData);
        console.log("Expired:", expiredData);
        console.log("Near Expiry:", nearExpiryData);

        setInventory(inventoryData.inventory || []);
        setLowStock(lowStockData || []);
        setExpired(expiredData || []);
        setNearExpiry(nearExpiryData || []);

      } catch (err) {
        console.error("Dashboard error:", err);
        setError("Unable to load pharmacy data.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);


  // ==========================================
  // Loading
  // ==========================================
  if (loading) {
    return (
      <div className="mx-auto max-w-6xl">
        <div className="rounded-xl bg-white p-8 shadow-sm">
          <p className="text-slate-600">
            Loading pharmacy dashboard...
          </p>
        </div>
      </div>
    );
  }


  // ==========================================
  // Error
  // ==========================================
  if (error) {
    return (
      <div className="mx-auto max-w-6xl">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <p className="font-medium text-red-700">
            {error}
          </p>

          <p className="mt-2 text-sm text-red-600">
            Make sure the FastAPI backend is running.
          </p>
        </div>
      </div>
    );
  }


  return (
    <div className="mx-auto max-w-6xl">

      {/* ==================================
          Welcome
      ================================== */}

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">
          Welcome to PharmaAI
        </h2>

        <p className="mt-2 text-slate-500">
          Pharmacy Management & AI Assistant Dashboard
        </p>
      </div>


      {/* ==================================
          Dashboard Cards
      ================================== */}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

        {/* Total Medicines */}
        <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500">
            Total Medicines
          </p>

          <h3 className="mt-2 text-3xl font-bold text-blue-600">
            {inventory.length}
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            Medicines in inventory
          </p>
        </div>


        {/* Low Stock */}
        <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500">
            Low Stock
          </p>

          <h3 className="mt-2 text-3xl font-bold text-orange-500">
            {lowStock.length}
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            Need attention
          </p>
        </div>


        {/* Near Expiry */}
        <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500">
            Near Expiry
          </p>

          <h3 className="mt-2 text-3xl font-bold text-yellow-600">
            {nearExpiry.length}
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            Expiring within 30 days
          </p>
        </div>


        {/* Expired */}
        <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500">
            Expired
          </p>

          <h3 className="mt-2 text-3xl font-bold text-red-600">
            {expired.length}
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            Expired medicines
          </p>
        </div>

      </div>


      {/* ==================================
          Medicine Inventory
      ================================== */}

      <div className="mt-8 rounded-xl bg-white shadow-sm border border-slate-200">

        <div className="border-b border-slate-200 px-6 py-4">
          <h3 className="text-lg font-semibold text-slate-800">
            Medicine Inventory
          </h3>

          <p className="text-sm text-slate-500">
            Current medicine stock
          </p>
        </div>


        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead className="bg-slate-50">

              <tr>
                <th className="px-6 py-3 text-sm font-semibold text-slate-600">
                  Medicine
                </th>

                <th className="px-6 py-3 text-sm font-semibold text-slate-600">
                  Stock
                </th>

                <th className="px-6 py-3 text-sm font-semibold text-slate-600">
                  Reorder Level
                </th>

                <th className="px-6 py-3 text-sm font-semibold text-slate-600">
                  Status
                </th>

                <th className="px-6 py-3 text-sm font-semibold text-slate-600">
                  Expiry
                </th>
              </tr>

            </thead>


            <tbody>

              {inventory.slice(0, 10).map((medicine) => (

                <tr
                  key={medicine.medicine_id}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >

                  <td className="px-6 py-4 font-medium text-slate-800">
                    {medicine.medicine_name}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {medicine.current_stock}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {medicine.reorder_level}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        medicine.status === "AVAILABLE"
                          ? "bg-green-100 text-green-700"
                          : medicine.status === "LOW STOCK"
                          ? "bg-orange-100 text-orange-700"
                          : medicine.status === "NEAR EXPIRY"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {medicine.status}
                    </span>

                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {medicine.expiry_date}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>


      {/* ==================================
          Alerts
      ================================== */}

      <div className="mt-8 grid gap-5 md:grid-cols-2">

        {/* Low Stock Alert */}

        <div className="rounded-xl border border-orange-200 bg-orange-50 p-5">

          <h3 className="font-semibold text-orange-800">
            Low Stock Alert
          </h3>

          <p className="mt-2 text-sm text-orange-700">
            {lowStock.length} medicines are currently
            below their reorder level.
          </p>

        </div>


        {/* Expiry Alert */}

        <div className="rounded-xl border border-red-200 bg-red-50 p-5">

          <h3 className="font-semibold text-red-800">
            Expiry Alert
          </h3>

          <p className="mt-2 text-sm text-red-700">
            {expired.length} medicines have expired and{" "}
            {nearExpiry.length} are near expiry.
          </p>

        </div>

      </div>

    </div>
  );
}

export default Home;