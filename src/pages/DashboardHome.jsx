import { useContext, useEffect, useState, useMemo } from "react";
import { TypeAnimation } from "react-type-animation";
import { AuthContext } from "../provider/AuthContext";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import LoadingData from "../Loader/LoadingData";

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"];

const DashboardHome = () => {
  const { user } = useContext(AuthContext);

  const [allProperties, setAllProperties] = useState([]);
  const [myProperties, setMyProperties] = useState([]);
  const [myReviews, setMyReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);

    Promise.all([
      fetch("https://home-nest-api-server-chi.vercel.app/properties?limit=100").then(
        (res) => res.json()
      ),
      fetch(
        `https://home-nest-api-server-chi.vercel.app/properties?userEmail=${user.email}&limit=100`
      ).then((res) => res.json()),
      fetch(
        `https://home-nest-api-server-chi.vercel.app/reviews?email=${user.email}`
      ).then((res) => res.json()),
    ])
      .then(([allPropsData, myPropsData, myReviewsData]) => {
        setAllProperties(allPropsData.data || []);
        setMyProperties(myPropsData.data || []);
        setMyReviews(myReviewsData || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [user?.email]);

  /* ================= CALCULATIONS ================= */
  const totalProperties = allProperties.length;
  const myPropertyCount = myProperties.length;
  const myReviewCount = myReviews.length;
  const myTotalValue = myProperties.reduce(
    (sum, p) => sum + Number(p.price || 0),
    0
  );

  /* ================= PIE DATA (Category-wise properties) ================= */
  const pieData = useMemo(() => {
    const map = {};
    myProperties.forEach((p) => {
      map[p.category] = (map[p.category] || 0) + 1;
    });
    return Object.keys(map).map((key) => ({ name: key, value: map[key] }));
  }, [myProperties]);

  /* ================= BAR DATA (Latest 4 properties) ================= */
  const barData = useMemo(
    () =>
      [...myProperties]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 4)
        .map((p) => ({ name: p.propertyName.slice(0, 12), price: Number(p.price) })),
    [myProperties]
  );

  

  /* ================= EARLY RETURN AFTER HOOKS ================= */
  if (loading) {
    return <LoadingData />;
  }

  return (
    <div className=" space-y-10 w-11/12 mx-auto md:w-full">
      {/* ================= TITLE ================= */}
      <div>
        <h1 className="text-3xl font-bold text-secondary">
          <TypeAnimation
            sequence={[`Hi, ${user?.displayName || "User"}`, 2000]}
            speed={75}
            cursor={true}
            repeat={0}
          />
        </h1>
        <p className="text-secondary/70 text-lg mt-1">
          Welcome to your dashboard
        </p>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="Total Properties" value={totalProperties} />
        <StatCard title="My Properties" value={myPropertyCount} />
        <StatCard title="My Reviews" value={myReviewCount} />
        <StatCard title="My Total Value" value={`$${myTotalValue}`} />
      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="bg-base-100 p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-4">Category Wise Properties</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-base-100 p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-4">Latest Property </h3>
        <ResponsiveContainer width="100%" height={300}>
  <BarChart
    data={barData}
    margin={{ top: 20, right: 30, left: 20, bottom: 20 }} // ← important
  >
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="price" fill="#6366f1" radius={[6, 6, 0, 0]} />
  </BarChart>
</ResponsiveContainer>

        </div>
      </div>

   
    </div>
  );
};

/* ================= STAT CARD ================= */
const StatCard = ({ title, value }) => (
  <div className="bg-base-100 p-6 rounded-xl shadow text-center">
    <p className="text-lg font-semibold text-primary">{title}</p>
    <h3 className="text-2xl font-bold mt-2 text-secondary">{value}</h3>
  </div>
);

export default DashboardHome;
