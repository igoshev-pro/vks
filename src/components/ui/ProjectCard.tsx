import { motion } from 'framer-motion'

interface ProjectCardProps {
  title: string
  category: string
  image: string
  index: number
}

export default function ProjectCard({ title, category, image, index }: ProjectCardProps) {
  return (
    <motion.div
      className="relative group cursor-pointer overflow-hidden rounded-xl aspect-[4/3] min-w-[300px] md:min-w-[400px]"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Аналог Next/Image fill */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />

      {/* Градиент */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

      {/* Контент */}
      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <span className="text-primary text-sm font-medium uppercase tracking-wider">{category}</span>
        <h3 className="text-white text-xl md:text-2xl font-semibold mt-2">{title}</h3>
      </div>

      {/* Hover overlay */}
      <motion.div className="absolute inset-0 border-2 border-primary rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  )
}
