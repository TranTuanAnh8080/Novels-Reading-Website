import { motion } from "framer-motion";
import landScapeImage4 from "../assets/landscape4.png";
import landScapeImage5 from "../assets/landscape5.png";
import landScapeImage6 from "../assets/landscape6.png";

function FancyImages2() {
  const images = [landScapeImage4, landScapeImage5, landScapeImage6];

  return (
    <div className="flex w-full h-screen overflow-hidden ">
      {images.map((img, index) => (
        <motion.div
          key={index}
          className="flex-1 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.3, type: "spring" }}
        >
          <motion.img
            src={img}
            alt={`illustration-${index}`}
            className="w-auto h-full object-cover shadow-2xl"
            whileHover={{
              scale: 1.1,
              rotate: index % 2 === 0 ? 3 : -3,
              boxShadow: "0px 0px 25px rgba(255, 105, 180, 0.7)"
            }}
            transition={{ type: "spring", stiffness: 200 }}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default FancyImages2;
