import themesMAP from "../../../themes/themes";

export default function Services({ dark }) {
  // const [availbeServiec, setAvailbeServiec] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   async function fetchData() {
  //     const res = await fetch("http://10.215.67.77:5001/api/organizations");
  //     const data = await res.json();
  //     setAvailbeServiec(data.data);
  //     console.log(data.data);
  //     setLoading(false);
  //   }

  //   fetchData();
  // }, []);
  let availbeServiec = [
    {
      service_id: 11,
      //   name_ar: "البنوك",
      org_name: "Banks",
      type: "bank",
      org_image: "/service_images/Banks.webp",
      //   description_ar: "ابحث عن أقرب فرع بنك في منطقتك",
      org_description: "Find the nearest bank branch in your area",
    },
    {
      service_id: 7,
      //   name_ar: "الأحوال المدنية",
      org_name: "Civil Status",
      type: "civil_status",
      org_image: "/service_images/Civil_Registry.jpg",
      //   description_ar: "خدمات الأحوال المدنية والوثائق الرسمية",
      org_description: "Civil status services and official documents",
    },
  ];
  return (
    <div
      className="p-6 w-full lg:max-w-7xl lg:mx-auto px-4 sm:px-6 lg:px-8 "
      style={{
        minHeight: "70vh",
        backgroundColor: dark
          ? themesMAP["light-main-bg"]
          : themesMAP["dark-main-bg"],
      }}
    >
      <div
        className="w-full text-center mb-8"
        style={{
          color: dark ? themesMAP["text-light"] : themesMAP["text-dark"],
        }}
      >
        <h1 className="text-4xl">Available Services</h1>
        <p className="text-xl text-[#64748b]">
          Track crowds across all major service categories and make smarter
          visits.
        </p>
      </div>
      <div className="grid lg:grid-cols-3 gap-4 sm:grid-cols-1 md:grid-cols-2 mt-16">
        {availbeServiec.map((serv, i) => {
          return (
            <Card
              image={serv.org_image}
              key={i}
              id={serv.service_id}
              dark={dark}
              name={serv.org_name}
              desc={serv.org_description}
            />
          );
        })}
      </div>
    </div>
  );
}

// function Card({ image, dark, name, desc, id }) {
//   return (
//     <div
//       className="rounded-xl shadow-xl border-2 flex flex-col h-full"
//       style={{ borderColor: dark ? "white" : "#b1b1b1" }}
//     >
//       <div className="rounded-xl" style={{ minHeight: "10vh" }}>
//         <img
//           src={image}
//           alt="errro"
//           className="rounded-t-lg object-fill w-full"
//         />
//       </div>
//       <div
//         className="w-full p-5 flex-grow"
//         style={{
//           color: dark ? themesMAP["text-light"] : themesMAP["text-dark"],
//         }}
//       >
//         <h1 className="text-2xl font-bold">{name}</h1>
//         <p className="text-md text-[#64748b]  line-clamp-2">{desc}</p>
//         <button
//           className="bg-blue-500 text-white px-4 py-2 mt-auto  mt-5 w-full
//                      rounded hover:bg-blue-600 transition"
//           onClick={() => id} // here were we will use an funcion for set the servies id
//         >
//           Buy Now
//         </button>
//       </div>
//     </div>
//   );
// }

function Card({ image, dark, name, desc, id }) {
  return (
    <div
      className="rounded-xl shadow-xl border-2 flex flex-col h-full"
      style={{
        borderColor: "#b1b1b1",
        backgroundColor: dark ? "#0f172a" : themesMAP["dark-main-bg"],
      }}
    >
      <div className="rounded-xl" style={{ minHeight: "10vh" }}>
        <img
          src={image}
          alt="errro"
          className="rounded-t-lg object-fill w-full"
        />
      </div>

      <div
        className="w-full p-5 flex flex-col flex-grow"
        style={{
          color: dark ? themesMAP["text-light"] : themesMAP["text-dark"],
        }}
      >
        <h1 className="text-2xl font-bold line-clamp-2 min-h-[40px]">{name}</h1>

        <p className="text-md text-[#64748b] line-clamp-2 mb-2 line-clamp-2 min-h-[48px]">
          {desc}
        </p>

        <button
          className="bg-blue-500 text-white px-4 py-2 mt-auto w-full 
                     rounded hover:bg-blue-600 transition"
          onClick={() => id}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
