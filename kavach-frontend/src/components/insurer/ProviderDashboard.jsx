import React, { useState } from 'react';

// Simulated base costs for each plan
const planBaseCosts = {
    Silver: 50,
    Gold: 100,
    Platinum: 150,
};

// Base margin adjustments based on plan risk/value
const planBaseMarginAdjustments = {
    Silver: -0.03,
    Gold: -0.01,
    Platinum: 0.05,
};

function ProviderDashboard() {
    const [plan, setPlan] = useState('Silver');
    const [margin, setMargin] = useState('');
    const [dataMonitoring, setDataMonitoring] = useState(false);
    const [userCapacity, setUserCapacity] = useState('');
    const [submittedBids, setSubmittedBids] = useState([
        { insurerId: 'Insurer Alpha', plan: 'Silver', margin: 0.10, dataMonitoring: true, userCapacity: 1000 },
        { insurerId: 'Insurer Beta', plan: 'Gold', margin: 0.15, dataMonitoring: false, userCapacity: 500 },
        { insurerId: 'Insurer Gamma', plan: 'Platinum', margin: 0.20, dataMonitoring: true, userCapacity: 200 },
    ]);
    const [allotmentOrder, setAllotmentOrder] = useState([]);

    // Calculate bid score
    const calculateBidScore = (bid) => {
        const baseCost = planBaseCosts[bid.plan] || 0;
        const baseMarginAdjustment = planBaseMarginAdjustments[bid.plan] || 0;
        const effectiveMargin = bid.margin + baseMarginAdjustment;
        const absoluteMargin = baseCost * effectiveMargin;
        return absoluteMargin * bid.userCapacity;
    };

    // Handle bid submission
    const handleBidSubmit = (event) => {
        event.preventDefault();
        const newBid = {
            insurerId: 'You (Simulated)',
            plan: plan,
            margin: parseFloat(margin) / 100,
            dataMonitoring: dataMonitoring,
            userCapacity: parseInt(userCapacity, 10),
        };
        setSubmittedBids([...submittedBids, newBid]);

        const sortedBids = [...submittedBids, newBid].sort((a, b) => {
            const scoreA = calculateBidScore(a);
            const scoreB = calculateBidScore(b);
            return scoreB - scoreA;
        });
        setAllotmentOrder(sortedBids);

        // Reset the form fields
        setPlan('Silver');
        setMargin('');
        setDataMonitoring(false);
        setUserCapacity('');
    };

    return (
        <div className="max-w-screen-md mx-auto bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-semibold text-[#0B3D91] mb-6 text-center">Provider Dashboard</h2>

            {/* Existing Bids */}
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Existing Bids (Simulated)</h3>
            <div className="space-y-3 mb-6">
                {submittedBids.map((bid, index) => (
                    <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                        <p className="text-gray-700">
                            <span className="font-semibold">Insurer:</span> {bid.insurerId},
                            <span className="font-semibold"> Plan:</span> {bid.plan},
                            <span className="font-semibold"> Margin:</span> {((bid.margin + (planBaseMarginAdjustments[bid.plan] || 0)) * 100).toFixed(2)}% (Adjusted),
                            <span className="font-semibold"> Data Monitoring:</span> {bid.dataMonitoring ? 'Yes' : 'No'},
                            <span className="font-semibold"> Capacity:</span> {bid.userCapacity}
                        </p>
                    </div>
                ))}
            </div>

            {/* Submit New Bid */}
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Submit New Bid</h3>
            <form onSubmit={handleBidSubmit} className="space-y-4">
                <div className="flex items-center gap-4">
                    <label htmlFor="plan" className="font-semibold">Plan:</label>
                    <select
                        id="plan"
                        value={plan}
                        onChange={(e) => setPlan(e.target.value)}
                        className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D91]"
                    >
                        <option value="Silver">Silver</option>
                        <option value="Gold">Gold</option>
                        <option value="Platinum">Platinum</option>
                    </select>
                </div>

                <div className="flex items-center gap-4">
                    <label htmlFor="margin" className="font-semibold">Margin (%):</label>
                    <input
                        type="number"
                        id="margin"
                        value={margin}
                        onChange={(e) => setMargin(e.target.value)}
                        placeholder="e.g., 10.5"
                        step="0.01"
                        required
                        className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D91]"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <label htmlFor="userCapacity" className="font-semibold">Users to Cover:</label>
                    <input
                        type="number"
                        id="userCapacity"
                        value={userCapacity}
                        onChange={(e) => setUserCapacity(e.target.value)}
                        placeholder="e.g., 1000"
                        min="1"
                        required
                        className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D91]"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <label htmlFor="dataMonitoring" className="font-semibold">Data Monitoring Service:</label>
                    <input
                        type="checkbox"
                        id="dataMonitoring"
                        checked={dataMonitoring}
                        onChange={(e) => setDataMonitoring(e.target.checked)}
                        className="h-5 w-5 text-[#0B3D91] focus:ring-[#0B3D91]"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-md shadow-md hover:scale-105 transition-transform duration-200 ease-in-out font-semibold"
                >
                    Submit Bid
                </button>
            </form>

            {/* Simulated Allotment Order */}
            <h3 className="text-xl font-semibold text-gray-800 mt-6">Simulated Allotment Order (Revenue Focused)</h3>
            <div className="space-y-3">
                {allotmentOrder.map((bid, index) => (
                    <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                        <p className="text-gray-700">
                            <span className="font-semibold">Rank {index + 1}:</span> 
                            Insurer: {bid.insurerId}, Plan: {bid.plan},
                            Margin: {((bid.margin + (planBaseMarginAdjustments[bid.plan] || 0)) * 100).toFixed(2)}% (Adjusted),
                            Capacity: {bid.userCapacity}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProviderDashboard;
